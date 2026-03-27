/**
 * Utilidad para obtener la URL base de la aplicación dinámicamente
 * Funciona tanto en el cliente como en el servidor
 */

/**
 * Obtiene la URL base de la aplicación (protocolo + host)
 * Detecta automáticamente la URL actual, sin necesidad de variables de entorno
 */
export function getAppUrl(): string {
  // En el servidor, usar headers de Next.js
  if (typeof window === 'undefined') {
    try {
      const headers = require('next/headers').headers()
      const host = headers.get('host') || 'localhost:3000'
      const protocol = headers.get('x-forwarded-proto') || 'http'

      return `${protocol}://${host}`
    } catch (error) {
      // Fallback si no estamos en un contexto de Next.js
      return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
  }

  // En el cliente, usar window.location
  return `${window.location.protocol}//${window.location.host}`
}

/**
 * Obtiene la URL completa para una ruta específica
 */
export function getUrlForPath(path: string): string {
  const baseUrl = getAppUrl()
  // Asegurar que la ruta empieza con /
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}
