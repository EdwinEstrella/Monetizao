import { NextRequest, NextResponse } from 'next/server'
import insforge from '@/lib/insforge'

export async function POST(request: NextRequest) {
  try {
    // Cerrar sesión con InsForge
    const { error } = await insforge.auth.signOut()

    if (error) {
      console.error('InsForge logout error:', error)
      // Continuar aunque haya error en InsForge, limpiar cookies locales
    }

    // Crear response que elimina la cookie
    const response = NextResponse.json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    })

    // Eliminar la cookie de autenticación
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Eliminar inmediatamente
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)

    // Aún limpiar cookies si hay error
    const response = NextResponse.json({
      success: true,
      message: 'Sesión cerrada',
    })

    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  }
}
