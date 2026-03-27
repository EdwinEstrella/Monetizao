import { NextRequest, NextResponse } from 'next/server'
import insforge from '@/lib/insforge'

export async function GET(request: NextRequest) {
  try {
    // Obtener usuario actual de InsForge
    const { data: userData, error: userError } = await insforge.auth.getCurrentUser()

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      )
    }

    // Obtener perfil completo del usuario
    const { data: profile } = await insforge.auth.getProfile(userData.user.id)

    // Obtener configuraciones de API
    const { data: apiConfigs } = await insforge.database
      .from('api_configs')
      .select('*')
      .eq('user_id', userData.user.id)
      .maybeSingle()

    // Obtener suscripciones activas
    const { data: subscriptions } = await insforge.database
      .from('subscriptions')
      .select('*')
      .eq('user_id', userData.user.id)
      .eq('status', 'active')
      .gt('end_date', new Date().toISOString())
      .order('end_date', { ascending: false })
      .limit(1)

    // Obtener usage del usuario
    const { data: userUsage } = await insforge.database
      .from('user_usage')
      .select('*')
      .eq('user_id', userData.user.id)
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
        id: userData.user.id,
        name: userData.user.profile?.name || profile?.name || '',
        email: userData.user.email,
        role: userData.user.metadata?.role || profile?.role || 'user',
        is_verified: userData.user.emailVerified,
        avatar: userData.user.profile?.avatar_url || profile?.avatar_url || null,
        bio: profile?.bio || null,
        providers: userData.user.providers || [],
        dailyUsageCount,
        lastUsageDate: userUsage?.reset_at || null,
        created_at: userData.user.createdAt,
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
