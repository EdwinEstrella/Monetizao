import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import insforge from '@/lib/insforge'
import { DeviceService } from '@/lib/security/device-service'
import { SecurityMiddleware } from '@/lib/security/middleware'

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  deviceFingerprint: z.string().optional(),
  deviceData: z.object({
    screenResolution: z.string().optional(),
    colorDepth: z.number().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
    hardwareConcurrency: z.number().optional(),
    deviceMemory: z.number().optional(),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Verificación de seguridad básica
    const securityCheck = await SecurityMiddleware.performSecurityCheck(request)
    if (!securityCheck.allowed) {
      return NextResponse.json(
        { error: 'Request bloqueado por seguridad', reason: securityCheck.reason },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email, password, deviceFingerprint, deviceData } = RegisterSchema.parse(body)

    // Verificación de dispositivo
    const deviceInfo = DeviceService.extractDeviceInfo(request)

    // Si se proporcionó fingerprint del cliente, usarlo
    const finalFingerprint = deviceFingerprint || deviceInfo.fingerprint

    // Combinar datos del dispositivo
    const fullDeviceInfo = {
      ...deviceInfo,
      ...deviceData
    }

    // Verificar si el dispositivo puede ser registrado
    const deviceCheck = await DeviceService.canRegisterDevice(fullDeviceInfo)
    if (!deviceCheck.allowed) {
      return NextResponse.json(
        { error: deviceCheck.reason, blocked: true },
        { status: 403 }
      )
    }

    // Registrar usuario con InsForge
    const { data, error } = await insforge.auth.signUp({
      email,
      password,
      name,
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/login`,
    })

    if (error) {
      // Verificar si es error de usuario ya existe
      if (error.message?.includes('already') || error.error === 'USER_EXISTS') {
        return NextResponse.json(
          { error: 'El correo electrónico ya está registrado' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Error al registrar usuario' },
        { status: 400 }
      )
    }

    // Si se requiere verificación de email
    if (data?.requireEmailVerification) {
      return NextResponse.json({
        success: true,
        message: 'Usuario registrado. Por favor verifica tu email.',
        requireVerification: true,
      })
    }

    if (!data?.user || !data?.accessToken) {
      return NextResponse.json(
        { error: 'Error al registrar usuario' },
        { status: 500 }
      )
    }

    // Actualizar perfil con metadata adicional
    await insforge.auth.setProfile({
      name,
      bio: null,
    })

    // Registrar o actualizar dispositivo
    try {
      if (deviceCheck.device) {
        // Si el dispositivo ya existe, asociarlo al usuario
        await DeviceService.updateDevice(finalFingerprint, data.user.id)
      } else {
        // Registrar nuevo dispositivo asociado al usuario
        await DeviceService.registerDevice(fullDeviceInfo, data.user.id)
      }
    } catch (error) {
      console.error('Error registering device for new user:', error)
      // No fallar el registro si hay error con el dispositivo
    }

    // Crear configuración de API por defecto
    try {
      await insforge.database.from('api_configs').insert({
        user_id: data.user.id,
        provider: 'deepseek',
        api_key: 'sk-d9da8c580ae540e2b398bcdb97f69224',
        model_name: 'deepseek-chat',
        is_active: true,
        max_tokens: 4000,
        temperature: 0.7,
      })
    } catch (error) {
      console.log('Error creating default API config:', error)
      // No fallar si no se puede crear la configuración
    }

    // Crear response con cookie
    const response = NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: data.user.id,
        name: data.user.profile?.name || name,
        email: data.user.email,
        role: data.user.metadata?.role || 'user',
        is_verified: data.user.emailVerified,
        avatar: data.user.profile?.avatar_url || null,
        providers: data.user.providers || [],
      },
    })

    // Setear cookie HTTP-only
    response.cookies.set('auth-token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Register error:', error)

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
