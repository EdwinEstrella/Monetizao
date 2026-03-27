import { NextResponse } from 'next/server'
import { createInsForgeServerClient, clearAuthCookies, handleAuthError } from '@/lib/insforge-server'

/**
 * POST /api/auth/logout - Cerrar sesión según mejores prácticas de InsForge
 */
export async function POST() {
  try {
    // Crear cliente en modo servidor
    const insforge = createInsForgeServerClient()

    // Cerrar sesión con InsForge
    const { error } = await insforge.auth.signOut()

    if (error) {
      console.error('InsForge logout error:', error)
      // Continuar aunque haya error en InsForge, limpiar cookies locales
    }

    // Limpiar cookies de autenticación según mejores prácticas
    await clearAuthCookies()

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    })
  } catch (error) {
    console.error('Logout error:', error)

    // Aún limpiar cookies si hay error
    await clearAuthCookies()

    // Retornar éxito de todas formas para mejor UX
    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada',
    })
  }
}
