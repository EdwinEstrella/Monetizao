import { NextRequest, NextResponse } from 'next/server'
import { UsageMiddleware } from '@/lib/tools/middleware'
import AIService from '@/lib/ai/services'
import insforge from '@/lib/insforge'

export async function GET(request: NextRequest) {
  try {
    // Obtener el token de la cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Verificar token con InsForge
    const { data: userData, error: userError } = await insforge.auth.getCurrentUser()

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    // Obtener configuración de API del usuario
    const apiConfig = await UsageMiddleware.getUserAPIConfig(userData.user.id)

    // Obtener providers soportados (sin Prisma)
    const supportedProviders = AIService.getSupportedProviders()

    return NextResponse.json({
      success: true,
      data: {
        apiConfig,
        supportedProviders
      }
    })

  } catch (error) {
    console.error('Error getting API config:', error)
    return NextResponse.json(
      { error: 'Error al obtener configuración' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Obtener el token de la cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Verificar token con InsForge
    const { data: userData, error: userError } = await insforge.auth.getCurrentUser()

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { provider, apiKey, modelName, maxTokens, temperature } = body

    // Validar datos
    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: 'Provider y API Key son requeridos' },
        { status: 400 }
      )
    }

    // Desactivar configuraciones anteriores
    await insforge.database
      .from('api_configs')
      .update({ is_active: false })
      .eq('user_id', userData.user.id)

    // Verificar si existe configuración para este provider
    const { data: existingConfig } = await insforge.database
      .from('api_configs')
      .select('*')
      .eq('user_id', userData.user.id)
      .eq('provider', provider)
      .maybeSingle()

    let apiConfig

    if (existingConfig) {
      // Actualizar configuración existente
      const { data } = await insforge.database
        .from('api_configs')
        .update({
          api_key: apiKey,
          model_name: modelName || null,
          max_tokens: maxTokens || 4000,
          temperature: temperature || 0.7,
          is_active: true,
        })
        .eq('id', existingConfig.id)
        .select()
        .single()

      apiConfig = data
    } else {
      // Crear nueva configuración
      const { data } = await insforge.database
        .from('api_configs')
        .insert({
          user_id: userData.user.id,
          provider,
          api_key: apiKey,
          model_name: modelName || null,
          max_tokens: maxTokens || 4000,
          temperature: temperature || 0.7,
          is_active: true,
        })
        .select()
        .single()

      apiConfig = data
    }

    return NextResponse.json({
      success: true,
      data: {
        id: apiConfig.id,
        provider: apiConfig.provider,
        modelName: apiConfig.model_name,
        maxTokens: apiConfig.max_tokens,
        temperature: apiConfig.temperature
      }
    })

  } catch (error) {
    console.error('Error saving API config:', error)
    return NextResponse.json(
      { error: 'Error al guardar configuración' },
      { status: 500 }
    )
  }
}
