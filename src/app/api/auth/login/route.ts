import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import insforge from '@/lib/insforge'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    // Autenticar con InsForge
    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Crear response con cookie
    const response = NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: data.user.id,
        name: data.user.profile?.name || '',
        email: data.user.email,
        role: data.user.metadata?.role || 'user',
        is_verified: data.user.emailVerified,
        avatar: data.user.profile?.avatar_url || null,
        providers: data.user.providers || [],
      },
    })

    // Guardar access token en cookie HTTP-only
    response.cookies.set('auth-token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// OAuth - Iniciar flujo con GitHub o Google
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

    // Iniciar OAuth con InsForge
    const { data, error } = await insforge.auth.signInWithOAuth({
      provider,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    })

    if (error || !data?.url) {
      return NextResponse.json(
        { error: 'Error al iniciar OAuth' },
        { status: 500 }
      )
    }

    // Redirigir al proveedor OAuth
    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
