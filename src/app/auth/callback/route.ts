import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@insforge/sdk'
import { setAuthCookies } from '@/lib/insforge-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Verificar si hay parámetros de error de OAuth
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      console.error('OAuth error from provider:', error, errorDescription)
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('oauth_error', error)
      loginUrl.searchParams.set('error_description', errorDescription || 'Error en autenticación OAuth')
      return NextResponse.redirect(loginUrl)
    }

    // El código de OAuth viene en el parámetro 'insforge_code'
    const code = searchParams.get('insforge_code')

    if (!code) {
      console.error('Missing OAuth code')
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('oauth_error', 'missing_code')
      loginUrl.searchParams.set('error_description', 'Código OAuth no proporcionado')
      return NextResponse.redirect(loginUrl)
    }

    console.log('OAuth callback received code:', code.substring(0, 10) + '...')

    // IMPORTANTE: Para el callback de OAuth, usamos el cliente NORMAL (no servidor)
    // porque el SDK necesita manejar cookies automáticamente para el intercambio OAuth
    const insforge = createClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
      // NO usar isServerMode para OAuth callback
    })

    console.log('Attempting getCurrentUser with normal client...')

    // Intentar obtener usuario después del OAuth
    const { data: userData, error: userError } = await insforge.auth.getCurrentUser()

    console.log('getCurrentUser result:', {
      hasData: !!userData,
      hasUser: !!userData?.user,
      hasToken: !!userData?.accessToken,
      hasRefreshToken: !!userData?.refreshToken,
      error: userError?.message
    })

    if (userError) {
      console.error('getCurrentUser failed:', userError)
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('oauth_error', 'session_failed')
      loginUrl.searchParams.set('error_description', userError.message || 'No se pudo establecer la sesión')
      return NextResponse.redirect(loginUrl)
    }

    if (!userData?.user) {
      console.error('No user in getCurrentUser response')
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('oauth_error', 'no_user')
      loginUrl.searchParams.set('error_description', 'No se pudo obtener el usuario')
      return NextResponse.redirect(loginUrl)
    }

    const user = userData.user
    console.log('✅ User authenticated:', user.email, 'ID:', user.id)

    // Guardar tokens en cookies httpOnly manualmente
    if (userData.accessToken) {
      console.log('Setting auth cookies...')
      await setAuthCookies(userData.accessToken, userData.refreshToken)
    } else {
      console.error('⚠️ No accessToken in response')
    }

    // Redirigir al dashboard
    console.log('Redirecting to dashboard...')
    return NextResponse.redirect(new URL('/dashboard', request.url))

  } catch (error) {
    console.error('OAuth callback error:', error)

    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('oauth_error', 'internal_error')
    loginUrl.searchParams.set('error_description', 'Error interno del servidor')

    return NextResponse.redirect(loginUrl)
  }
}
