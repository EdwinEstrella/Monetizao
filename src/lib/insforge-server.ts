import { createClient } from '@insforge/sdk'
import { cookies } from 'next/headers'

const accessCookie = 'insforge_access_token'
const refreshCookie = 'insforge_refresh_token'

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

/**
 * Crear cliente de InsForge para modo servidor
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
 * Obtener tokens de las cookies - intenta múltiples nombres posibles
 */
export async function getAuthCookies() {
  const cookieStore = await cookies()

  // El SDK normal puede usar diferentes nombres de cookies
  const possibleNames = [
    'insforge_access_token',
    'access_token',
    'auth-token',
    'token'
  ]

  const possibleRefreshNames = [
    'insforge_refresh_token',
    'refresh_token',
    'refresh-token'
  ]

  let accessToken = null
  let refreshToken = null

  // Buscar access token
  for (const name of possibleNames) {
    const cookie = cookieStore.get(name)
    if (cookie?.value) {
      accessToken = cookie.value
      console.log(`Found access token cookie: ${name}`)
      break
    }
  }

  // Buscar refresh token
  for (const name of possibleRefreshNames) {
    const cookie = cookieStore.get(name)
    if (cookie?.value) {
      refreshToken = cookie.value
      console.log(`Found refresh token cookie: ${name}`)
      break
    }
  }

  return { accessToken, refreshToken }
}

/**
 * Guardar tokens en cookies httpOnly
 */
export async function setAuthCookies(accessToken: string, refreshToken?: string) {
  const cookieStore = await cookies()

  // Access token: 15 minutos
  cookieStore.set(accessCookie, accessToken, {
    ...authCookieOptions,
    maxAge: 60 * 15,
    expires: new Date(Date.now() + 60 * 15 * 1000)
  })

  // Refresh token: 7 días
  if (refreshToken) {
    cookieStore.set(refreshCookie, refreshToken, {
      ...authCookieOptions,
      maxAge: 60 * 60 * 24 * 7,
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
    })
  }
}

/**
 * Eliminar cookies de autenticación
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies()

  // Eliminar todos los posibles nombres de cookies
  const allCookieNames = [
    'insforge_access_token',
    'insforge_refresh_token',
    'access_token',
    'refresh_token',
    'auth-token',
    'token'
  ]

  for (const name of allCookieNames) {
    cookieStore.delete(name)
  }
}

/**
 * Obtener usuario actual desde el servidor
 */
export async function getCurrentUser() {
  const { accessToken } = await getAuthCookies()

  if (!accessToken) return null

  const insforge = createInsForgeServerClient(accessToken)
  const { data, error } = await insforge.auth.getCurrentUser()

  if (error || !data?.user) return null

  return data.user
}

/**
 * Refrescar la sesión usando refresh token
 */
export async function refreshSession() {
  const { refreshToken } = await getAuthCookies()

  if (!refreshToken) return null

  const insforge = createInsForgeServerClient()

  // Intentar refrescar usando refresh token
  const { data, error } = await insforge.auth.refreshSession({ refreshToken })

  if (error || !data?.accessToken) return null

  // Actualizar cookies con nuevos tokens
  await setAuthCookies(data.accessToken, data.refreshToken)

  return data
}
