import { NextRequest, NextResponse } from 'next/server'
import insforge from '@/lib/insforge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // InsForge automáticamente detecta el callback y maneja el token
    // Verificar si hay parámetros de error de OAuth
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      // Redirigir a la página de login con el error
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('oauth_error', error)
      loginUrl.searchParams.set('error_description', errorDescription || 'Error en autenticación OAuth')
      return NextResponse.redirect(loginUrl)
    }

    // El SDK de InsForge maneja automáticamente el intercambio del código
    // Después del OAuth redirect, verificamos si el usuario está autenticado
    const { data: userData, error: userError } = await insforge.auth.getCurrentUser()

    if (userError || !userData?.user) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('oauth_error', 'session_failed')
      loginUrl.searchParams.set('error_description', 'No se pudo establecer la sesión')
      return NextResponse.redirect(loginUrl)
    }

    // Obtener perfil completo
    const { data: profile } = await insforge.auth.getProfile(userData.user.id)

    // Verificar si el usuario ya tiene configuración de API
    const { data: apiConfig } = await insforge.database
      .from('api_configs')
      .select('*')
      .eq('user_id', userData.user.id)
      .maybeSingle()

    // Si no tiene configuración de API, crear una por defecto
    if (!apiConfig) {
      try {
        await insforge.database.from('api_configs').insert({
          user_id: userData.user.id,
          provider: 'deepseek',
          api_key: 'sk-d9da8c580ae540e2b398bcdb97f69224',
          model_name: 'deepseek-chat',
          is_active: true,
          max_tokens: 4000,
          temperature: 0.7,
        })
      } catch (error) {
        console.log('Error creating default API config:', error)
      }
    }

    // Crear response y redirigir al dashboard
    const response = NextResponse.redirect(new URL('/dashboard', request.url))

    // El access token ya está guardado por el SDK automáticamente
    // No necesitamos hacer nada adicional aquí

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)

    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('oauth_error', 'internal_error')
    loginUrl.searchParams.set('error_description', 'Error interno del servidor')

    return NextResponse.redirect(loginUrl)
  }
}
