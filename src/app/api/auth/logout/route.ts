import { NextResponse } from 'next/server'
import { createInsForgeServerClient, clearAuthCookies } from '@/lib/insforge-server'

export async function POST() {
  try {
    // Crear cliente en modo servidor (no necesita token para signOut)
    const insforge = createInsForgeServerClient()

    // Cerrar sesión con InsForge
    const { error } = await insforge.auth.signOut()

    if (error) {
      console.error('InsForge logout error:', error)
      // Continuar aunque haya error en InsForge, limpiar cookies locales
    }

    // Limpiar cookies de autenticación
    await clearAuthCookies()

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    })
  } catch (error) {
    console.error('Logout error:', error)

    // Aún limpiar cookies si hay error
    await clearAuthCookies()

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada',
    })
  }
}
