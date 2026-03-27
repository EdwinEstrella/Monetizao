/**
 * API Route optimizada para login según mejores prácticas de InsForge
 * Maneja autenticación con email/contraseña y OAuth correctamente
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createInsForgeServerClient, setAuthCookies, handleAuthError } from '@/lib/insforge-server'

// Esquemas de validación optimizados
const LoginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const RegisterSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
})

/**
 * POST /api/auth/login - Iniciar sesión con email y contraseña
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    // Crear cliente en modo servidor
    const insforge = createInsForgeServerClient()

    // Autenticar con InsForge
    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.accessToken) {
      const authError = handleAuthError(error)
      return NextResponse.json(
        {
          error: authError.message || 'Credenciales inválidas',
          code: authError.code,
        },
        { status: authError.statusCode || 401 }
      )
    }

    // Guardar tokens en cookies httpOnly según mejores prácticas
    await setAuthCookies(data.accessToken, data.refreshToken)

    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: data.user.id,
        name: data.user.profile?.name || '',
        email: data.user.email,
        emailVerified: data.user.emailVerified,
        providers: data.user.providers || [],
        avatar: data.user.profile?.avatar_url || null,
        createdAt: data.user.createdAt,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Datos inválidos',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/auth/login - Iniciar flujo OAuth
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const provider = searchParams.get('provider')

    if (!provider || !['github', 'google'].includes(provider)) {
      return NextResponse.json(
        { error: 'Provider inválido. Debe ser github o google' },
        { status: 400 }
      )
    }

    // Crear cliente normal para OAuth según documentación de InsForge
    // Nota: Para OAuth usamos el cliente normal, no el de servidor
    const { createClient } = await import('@insforge/sdk')

    const insforge = createClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
    })

    // Iniciar OAuth según documentación de InsForge
    const { data, error } = await insforge.auth.signInWithOAuth({
      provider,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
      skipBrowserRedirect: false, // El SDK maneja la redirección automáticamente
    })

    if (error || !data?.url) {
      const authError = handleAuthError(error)
      return NextResponse.json(
        {
          error: authError.message || 'Error al iniciar OAuth',
          code: authError.code,
        },
        { status: authError.statusCode || 500 }
      )
    }

    // El SDK redirige automáticamente al proveedor OAuth
    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}