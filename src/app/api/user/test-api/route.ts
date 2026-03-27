import { NextRequest, NextResponse } from 'next/server'
import { UsageMiddleware } from '@/lib/tools/middleware'
import AIService from '@/lib/ai/services'

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

    // Verificar token y obtener userId
    const jwt = require('jsonwebtoken')
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    } catch (error) {
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

    // Crear una instancia del servicio de IA con la configuración proporcionada
    const testConfig = {
      provider,
      apiKey,
      modelName: modelName || null,
      maxTokens: maxTokens || 100,
      temperature: temperature || 0.7
    }

    const aiService = new AIService(testConfig)

    // Probar la API con un prompt simple
    const testPrompt = "Responde con 'API funcionando correctamente' en español."
    const testResponse = await aiService.generateContent({
      prompt: testPrompt,
      maxTokens: 50,
      temperature: 0.1
    })

    return NextResponse.json({
      success: true,
      data: {
        response: testResponse,
        provider,
        model: modelName || 'default'
      }
    })

  } catch (error) {
    console.error('Error testing API:', error)
    return NextResponse.json(
      {
        error: 'Error al probar la API',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}