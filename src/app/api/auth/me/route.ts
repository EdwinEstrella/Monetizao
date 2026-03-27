import { NextRequest, NextResponse } from 'next/server'
import insforge from '@/lib/insforge'

export async function GET(request: NextRequest) {
  try {
    // Obtener sesión actual de InsForge
    const { data: sessionData, error: sessionError } = await insforge.auth.getCurrentSession()

    if (sessionError || !sessionData?.session) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      )
    }

    const user = sessionData.session.user

    // Obtener perfil completo del usuario
    const { data: profile } = await insforge.auth.getProfile(user.id)

    // Verificar si profile tiene error (usuario puede no tener perfil todavía)
    const profileData = profile?.error ? null : profile

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
        name: user.profile?.name || profile?.name || '',
        email: user.email,
        role: user.metadata?.role || profile?.role || 'user',
        is_verified: user.emailVerified,
        avatar: user.profile?.avatar_url || profile?.avatar_url || null,
        bio: profile?.bio || null,
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
