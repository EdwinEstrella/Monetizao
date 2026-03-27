/**
 * Server Actions para autenticación - Patrón SSR
 * Implementa mejores prácticas de InsForge y Next.js 16
 */

'use server'

import { createInsForgeServerClient, setAuthCookies, clearAuthCookies, getAuthCookies } from '@/lib/insforge-server'
import { redirect } from 'next/navigation'

export interface AuthResult {
  success: boolean
  error?: string
  user?: any
  requireEmailVerification?: boolean
}

/**
 * Iniciar sesión con email y contraseña (Server Action)
 */
export async function signInAction(email: string, password: string): Promise<AuthResult> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.user) {
      return {
        success: false,
        error: error?.message || 'Error al iniciar sesión'
      }
    }

    // Guardar tokens en cookies httpOnly
    await setAuthCookies(data.accessToken, data.refreshToken)

    return {
      success: true,
      user: data.user
    }
  } catch (err) {
    console.error('Sign in error:', err)
    return {
      success: false,
      error: 'Error de conexión. Inténtalo de nuevo.'
    }
  }
}

/**
 * Registrarse con email y contraseña (Server Action)
 */
export async function signUpAction(email: string, password: string, name?: string): Promise<AuthResult> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.signUp({
      email,
      password,
      name,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth`,
    })

    if (error) {
      return {
        success: false,
        error: error.message || 'Error al registrarse'
      }
    }

    // Manejar verificación de email
    if (data?.requireEmailVerification) {
      return {
        success: true,
        requireEmailVerification: true
      }
    }

    // Si no requiere verificación, el usuario ya está autenticado
    if (data?.user && data?.accessToken) {
      await setAuthCookies(data.accessToken, data.refreshToken)

      return {
        success: true,
        user: data.user
      }
    }

    return {
      success: false,
      error: 'Error desconocido'
    }
  } catch (err) {
    console.error('Sign up error:', err)
    return {
      success: false,
      error: 'Error de conexión. Inténtalo de nuevo.'
    }
  }
}

/**
 * Iniciar OAuth (Server Action)
 * Devuelve la URL para redirección
 */
export async function signInWithOAuthAction(provider: 'google' | 'github'): Promise<{
  success: boolean
  url?: string
  error?: string
}> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.signInWithOAuth({
      provider,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
      skipBrowserRedirect: true,
    })

    if (error || !data?.url) {
      return {
        success: false,
        error: 'Error al iniciar OAuth'
      }
    }

    return {
      success: true,
      url: data.url
    }
  } catch (err) {
    console.error('OAuth error:', err)
    return {
      success: false,
      error: 'Error de conexión'
    }
  }
}

/**
 * Cerrar sesión (Server Action)
 */
export async function signOutAction(): Promise<{ success: boolean; error?: string }> {
  try {
    const { accessToken } = await getAuthCookies()

    if (accessToken) {
      const insforge = createInsForgeServerClient(accessToken)
      await insforge.auth.signOut()
    }

    await clearAuthCookies()

    return { success: true }
  } catch (err) {
    console.error('Sign out error:', err)
    // Even if there's an error, clear cookies
    await clearAuthCookies()
    return { success: true }
  }
}

/**
 * Obtener usuario actual (Server Action)
 */
export async function getCurrentUserAction() {
  try {
    const { accessToken } = await getAuthCookies()

    if (!accessToken) {
      return null
    }

    const insforge = createInsForgeServerClient(accessToken)

    const { data, error } = await insforge.auth.getCurrentUser()

    if (error || !data?.user) {
      return null
    }

    return data.user
  } catch (err) {
    console.error('Get current user error:', err)
    return null
  }
}

/**
 * Verificar email con código (Server Action)
 */
export async function verifyEmailAction(email: string, otp: string): Promise<AuthResult> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.verifyEmail({
      email,
      otp,
    })

    if (error || !data?.accessToken) {
      return {
        success: false,
        error: error?.message || 'Código inválido'
      }
    }

    await setAuthCookies(data.accessToken, data.refreshToken)

    return {
      success: true,
      user: data.user
    }
  } catch (err) {
    console.error('Verify email error:', err)
    return {
      success: false,
      error: 'Error de conexión'
    }
  }
}

/**
 * Reenviar email de verificación (Server Action)
 */
export async function resendVerificationEmailAction(email: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.resendVerificationEmail({
      email,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth`,
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Resend verification email error:', err)
    return {
      success: false,
      error: 'Error al enviar email de verificación'
    }
  }
}

/**
 * Enviar email de reset de contraseña (Server Action)
 */
export async function sendResetPasswordEmailAction(email: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.sendResetPasswordEmail({
      email,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password`,
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Send reset password email error:', err)
    return {
      success: false,
      error: 'Error al enviar email de restablecimiento'
    }
  }
}

/**
 * Restablecer contraseña (Server Action)
 */
export async function resetPasswordAction(newPassword: string, otp: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const insforge = createInsForgeServerClient()

    const { data, error } = await insforge.auth.resetPassword({
      newPassword,
      otp,
    })

    if (error) {
      return {
        success: false,
        error: error.message || 'Error al restablecer contraseña'
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Reset password error:', err)
    return {
      success: false,
      error: 'Error de conexión'
    }
  }
}

/**
 * Actualizar perfil de usuario (Server Action)
 */
export async function updateProfileAction(profile: Record<string, any>): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const { accessToken } = await getAuthCookies()

    if (!accessToken) {
      return {
        success: false,
        error: 'No autenticado'
      }
    }

    const insforge = createInsForgeServerClient(accessToken)

    const { data, error } = await insforge.auth.setProfile(profile)

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Update profile error:', err)
    return {
      success: false,
      error: 'Error al actualizar perfil'
    }
  }
}

/**
 * Procesar callback de OAuth (Server Action)
 * Intercambia el código OAuth por tokens de acceso
 */
export async function processOAuthCallbackAction(code: string): Promise<AuthResult> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com'
    const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''

    console.log('Processing OAuth callback with code:', code.substring(0, 10) + '...')

    // Usar el endpoint correcto de InsForge para OAuth callback
    const response = await fetch(`${baseUrl}/auth/v1/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify({ code })
    })

    console.log('OAuth callback response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OAuth callback error response:', errorText)
      return {
        success: false,
        error: `Error ${response.status}: ${errorText || 'Error al procesar OAuth callback'}`
      }
    }

    const result = await response.json()
    console.log('OAuth callback result:', {
      hasData: !!result.data,
      hasAccessToken: !!result.data?.accessToken,
      hasUser: !!result.data?.user,
      hasError: !!result.error
    })

    if (result.error || !result.data?.accessToken) {
      return {
        success: false,
        error: result.error?.message || result.error || 'Error al intercambiar código OAuth'
      }
    }

    // Guardar tokens en cookies httpOnly
    await setAuthCookies(result.data.accessToken, result.data.refreshToken)

    return {
      success: true,
      user: result.data.user
    }
  } catch (err) {
    console.error('OAuth callback error:', err)
    return {
      success: false,
      error: 'Error de conexión al procesar OAuth'
    }
  }
}
