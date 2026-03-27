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
 * Obtener tokens de las cookies
 */
export async function getAuthCookies() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(accessCookie)?.value
  const refreshToken = cookieStore.get(refreshCookie)?.value

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
  cookieStore.delete(accessCookie)
  cookieStore.delete(refreshCookie)
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
  const { data, error } = await insforge.auth.refreshSession({ refreshToken })

  if (error || !data?.accessToken) return null

  // Actualizar cookies con nuevos tokens
  await setAuthCookies(data.accessToken, data.refreshToken)

  return data
}
