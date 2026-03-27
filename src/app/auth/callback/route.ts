import { NextRequest, NextResponse } from 'next/server'
import { createInsForgeServerClient, setAuthCookies } from '@/lib/insforge-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Verificar si hay parámetros de error de OAuth
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      // Redirigir a la página de login con el error
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('oauth_error', error)
      loginUrl.searchParams.set('error_description', errorDescription || 'Error en autenticación OAuth')
      return NextResponse.redirect(loginUrl)
    }

    // Crear cliente en modo servidor para verificar la sesión OAuth
    const insforge = createInsForgeServerClient()

    // Verificar si se estableció la sesión después del OAuth
    const { data: userData, error: userError } = await insforge.auth.getCurrentUser()

    if (userError || !userData?.user) {
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('oauth_error', 'session_failed')
      loginUrl.searchParams.set('error_description', 'No se pudo establecer la sesión')
      return NextResponse.redirect(loginUrl)
    }

    const user = userData.user

    // Guardar tokens en cookies httpOnly
    // InsForge maneja automáticamente el intercambio del código OAuth
    // y devuelve los tokens en la respuesta de getCurrentUser después del callback
    if (userData.accessToken) {
      await setAuthCookies(userData.accessToken, userData.refreshToken)
    }

    // Crear configuración de API por defecto si no existe
    try {
      const { data: apiConfig } = await insforge.database
        .from('api_configs')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!apiConfig) {
        await insforge.database.from('api_configs').insert([{
          user_id: user.id,
          provider: 'deepseek',
          api_key: 'sk-d9da8c580ae540e2b398bcdb97f69224',
          model_name: 'deepseek-chat',
          is_active: true,
          max_tokens: 4000,
          temperature: 0.7,
        }])
      }
    } catch (error) {
      console.log('Error creating default API config:', error)
    }

    // Redirigir al dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('OAuth callback error:', error)

    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('oauth_error', 'internal_error')
    loginUrl.searchParams.set('error_description', 'Error interno del servidor')

    return NextResponse.redirect(loginUrl)
  }
}
