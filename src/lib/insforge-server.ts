/**
 * Cliente de InsForge para modo servidor optimizado
 * Implementa mejores prácticas de Next.js 14 y InsForge SDK
 */

import { createClient } from '@insforge/sdk'
import { cookies } from 'next/headers'

const accessCookie = 'insforge_access_token'
const refreshCookie = 'insforge_refresh_token'

/**
 * Opciones de cookies optimizadas para seguridad
 */
const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

/**
 * Crear cliente de InsForge para modo servidor
 * @param accessToken - Token opcional para edge functions
 */
export function createInsForgeServerClient(accessToken?: string) {
  return createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
    isServerMode: true,
    edgeFunctionToken: accessToken
  })
}

/**
 * Crear cliente de InsForge para uso en cliente (browser)
 * Úsalo en componentes del lado del cliente
 */
export function createInsForgeClient() {
  return createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
  })
}

/**
 * Obtener tokens de las cookies
 */
export async function getAuthCookies() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(accessCookie)?.value || null
  const refreshToken = cookieStore.get(refreshCookie)?.value || null

  return { accessToken, refreshToken }
}

/**
 * Guardar tokens en cookies httpOnly según mejores prácticas
 */
export async function setAuthCookies(accessToken: string, refreshToken?: string) {
  const cookieStore = await cookies()

  // Access token: 15 minutos (short-lived)
  cookieStore.set(accessCookie, accessToken, {
    ...authCookieOptions,
    maxAge: 60 * 15, // 15 minutos
    expires: new Date(Date.now() + 60 * 15 * 1000)
  })

  // Refresh token: 7 días (long-lived)
  if (refreshToken) {
    cookieStore.set(refreshCookie, refreshToken, {
      ...authCookieOptions,
      maxAge: 60 * 60 * 24 * 7, // 7 días
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
    })
  }
}

/**
 * Eliminar cookies de autenticación de forma segura
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies()

  cookieStore.delete(accessCookie)
  cookieStore.delete(refreshCookie)
}

/**
 * Obtener usuario actual desde el servidor con auto-refresh
 */
export async function getCurrentUser() {
  const { accessToken } = await getAuthCookies()

  if (!accessToken) {
    return null
  }

  const insforge = createInsForgeServerClient(accessToken)

  try {
    const { data, error } = await insforge.auth.getCurrentUser()

    if (error || !data?.user) {
      // Si el token expiró, intentar refrescar
      const refreshResult = await refreshSession()
      if (refreshResult?.user) {
        return refreshResult.user
      }
      return null
    }

    return data.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Refrescar la sesión usando refresh token
 */
export async function refreshSession() {
  const { refreshToken } = await getAuthCookies()

  if (!refreshToken) {
    return null
  }

  const insforge = createInsForgeServerClient()

  try {
    const { data, error } = await insforge.auth.refreshSession({ refreshToken })

    if (error || !data?.accessToken) {
      // Clear invalid cookies
      await clearAuthCookies()
      return null
    }

    // Actualizar cookies con nuevos tokens
    await setAuthCookies(data.accessToken, data.refreshToken)

    return data
  } catch (error) {
    console.error('Error refreshing session:', error)
    await clearAuthCookies()
    return null
  }
}

/**
 * Verificar si el usuario tiene una sesión activa
 */
export async function verifySession() {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Manejo estructurado de errores de autenticación según InsForge
 */
export function handleAuthError(error: any) {
  if (!error) {
    return {
      message: 'Error desconocido',
      code: 'UNKNOWN_ERROR',
      statusCode: 500
    }
  }

  // Errores estructurados de InsForge
  if (error.error && error.message) {
    return {
      message: error.message,
      code: error.error,
      statusCode: error.statusCode || 500,
      nextActions: error.nextActions
    }
  }

  // Errores genéricos
  return {
    message: error.message || 'Error de autenticación',
    code: error.code || 'AUTH_ERROR',
    statusCode: error.statusCode || 500
  }
}