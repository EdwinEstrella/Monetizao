import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@insforge/sdk'
import { createInsForgeServerClient, setAuthCookies } from '@/lib/insforge-server'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

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
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Guardar tokens en cookies httpOnly
    await setAuthCookies(data.accessToken, data.refreshToken)

    return NextResponse.json({
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

    // Crear cliente NORMAL (no servidor) para OAuth
    // El SDK maneja PKCE, cookies y redirecciones automáticamente
    const insforge = createClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
    })

    // Iniciar OAuth - el SDK maneja todo automáticamente
    // 1. Redirige al proveedor (Google/GitHub)
    // 2. El proveedor redirige de vuelta con el código
    // 3. El SDK intercambia el código por tokens
    // 4. El SDK guarda las cookies httpOnly
    // 5. Redirige a la URL final
    const { data, error } = await insforge.auth.signInWithOAuth({
      provider,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
    })

    if (error || !data?.url) {
      return NextResponse.json(
        { error: 'Error al iniciar OAuth' },
        { status: 500 }
      )
    }

    // Redirigir al proveedor OAuth (Google/GitHub)
    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
