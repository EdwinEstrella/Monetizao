import { NextResponse } from 'next/server'
import { createInsForgeServerClient, getAuthCookies } from '@/lib/insforge-server'

export async function GET() {
  try {
    // Obtener tokens de cookies
    const { accessToken } = await getAuthCookies()

    if (!accessToken) {
      // Retornar 200 con user null en lugar de 401 para evitar errores en consola
      return NextResponse.json({
        success: false,
        user: null
      })
    }

    // Crear cliente con el token
    const insforge = createInsForgeServerClient(accessToken)

    // Intentar obtener usuario actual SIN intentar refrescar automáticamente
    // El refresh solo debería ocurrir explícitamente cuando el cliente lo solicita
    const { data, error } = await insforge.auth.getCurrentUser()

    if (error || !data?.user) {
      // Retornar 200 con user null en lugar de 401
      // NO intentar refrescar aquí para evitar loops
      return NextResponse.json({
        success: false,
        user: null
      })
    }

    const user = data.user

    // Intentar obtener perfil completo del usuario (puede no existir)
    let profileData = null
    try {
      const { data: profile } = await insforge.auth.getProfile(user.id)
      profileData = profile?.error ? null : profile
    } catch (error) {
      // Usuario no tiene perfil todavía, continuar sin él
    }

    // Obtener configuraciones de API
    const { data: apiConfigs } = await insforge.database
      .from('api_configs')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    // Obtener suscripciones activas
    const { data: subscriptions } = await insforge.database
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .gt('end_date', new Date().toISOString())
      .order('end_date', { ascending: false })
      .limit(1)

    // Obtener usage del usuario
    const { data: userUsage } = await insforge.database
      .from('user_usage')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    // Verificar si el usuario ha excedido su límite diario (plan gratuito)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const hasActiveSubscription = (subscriptions?.length || 0) > 0
    const lastUsageDate = userUsage?.reset_at ? new Date(userUsage.reset_at) : null
    const isToday = lastUsageDate && lastUsageDate >= today
    const dailyUsageCount = userUsage?.weekly_count || 0
    const canUseTools = hasActiveSubscription || (!isToday || dailyUsageCount < 5)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.profile?.name || profileData?.name || '',
        email: user.email,
        role: user.metadata?.role || profileData?.role || 'user',
        is_verified: user.emailVerified,
        avatar: user.profile?.avatar_url || profileData?.avatar_url || null,
        bio: profileData?.bio || null,
        providers: user.providers || [],
        dailyUsageCount,
        lastUsageDate: userUsage?.reset_at || null,
        created_at: user.createdAt,
        apiConfig: apiConfigs || null,
        subscription: subscriptions?.[0] || null,
        hasActiveSubscription,
        canUseTools,
      },
    })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
