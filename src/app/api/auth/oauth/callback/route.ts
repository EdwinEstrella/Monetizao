/**
 * API Route para procesar callback de OAuth
 * Este endpoint recibe el código OAuth del cliente y lo procesa en el servidor
 */

import { createInsForgeServerClient, setAuthCookies } from '@/lib/insforge-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'Código OAuth no proporcionado'
      }, { status: 400 })
    }

    // Crear cliente InsForge en modo servidor
    const insforge = createInsForgeServerClient()

    // Usar el SDK para procesar el callback de OAuth
    // El SDK tiene un método interno para manejar esto
    const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com'
    const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''

    // Hacer request directa al backend de InsForge para intercambiar el código
    const response = await fetch(`${baseUrl}/auth/v1/oauth/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify({ code })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }))
      return NextResponse.json({
        success: false,
        error: errorData.message || 'Error al procesar OAuth callback'
      }, { status: response.status })
    }

    const result = await response.json()

    if (result.error || !result.data?.accessToken) {
      return NextResponse.json({
        success: false,
        error: result.error?.message || 'Error al intercambiar código OAuth'
      }, { status: 400 })
    }

    // Guardar tokens en cookies httpOnly
    await setAuthCookies(result.data.accessToken, result.data.refreshToken)

    return NextResponse.json({
      success: true,
      user: result.data.user
    })
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json({
      success: false,
      error: 'Error de conexión al procesar OAuth'
    }, { status: 500 })
  }
}
