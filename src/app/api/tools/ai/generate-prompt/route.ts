import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { UsageMiddleware } from '@/lib/tools/middleware'
import AIService from '@/lib/ai/services'

// Schema de validación para el request
const GeneratePromptSchema = z.object({
  prompt: z.string().min(10, 'El prompt debe tener al menos 10 caracteres'),
  templateId: z.string().optional(),
  variables: z.record(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Obtener el token de la cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado - Inicia sesión para usar esta herramienta' },
        { status: 401 }
      )
    }

    // Verificar token y obtener userId
    const { prisma } = await import('@/lib/prisma')
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

    // Validar el body del request
    const body = await request.json()
    const validatedData = GeneratePromptSchema.parse(body)

    // Verificar límites de uso
    const usageCheck = await UsageMiddleware.checkUsageLimit(decoded.userId, 'generador-prompts-lucrativos')

    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          error: usageCheck.reason,
          remainingUses: usageCheck.remainingUses,
          isPremium: usageCheck.isPremium
        },
        { status: 403 }
      )
    }

    // Obtener configuración de API del usuario
    const apiConfig = await UsageMiddleware.getUserAPIConfig(decoded.userId)

    // Inicializar el servicio de IA con la configuración del usuario
    const aiService = new AIService(apiConfig)

    // Generar el prompt usando la IA
    const startTime = Date.now()

    try {
      const generatedContent = await aiService.generateContent({
        prompt: validatedData.prompt,
        maxTokens: apiConfig.maxTokens || 2000,
        temperature: apiConfig.temperature || 0.7,
      })

      const duration = Date.now() - startTime

      // Registrar el uso exitoso
      await UsageMiddleware.recordUsage(
        decoded.userId,
        'generador-prompts-lucrativos', // ID o slug de la herramienta
        validatedData,
        { content: generatedContent, usageType: 'prompt_generation' },
        duration,
        request.ip || 'unknown',
        request.headers.get('user-agent') || undefined
      )

      return NextResponse.json({
        success: true,
        data: {
          content: generatedContent,
          metadata: {
            provider: apiConfig.provider,
            model: apiConfig.modelName,
            tokens: Math.ceil(generatedContent.length / 4), // Estimación aproximada
            duration,
            remainingUses: usageCheck.remainingUses
          }
        }
      })

    } catch (aiError) {
      console.error('Error en generación de IA:', aiError)

      // Si hay error en la IA pero el usuario tiene configuración personalizada,
      // intentar con la API por defecto
      if (apiConfig.provider !== 'deepseek') {
        try {
          const defaultConfig = {
            provider: 'deepseek',
            apiKey: 'sk-d9da8c580ae540e2b398bcdb97f69224',
            modelName: 'deepseek-chat',
            maxTokens: 4000,
            temperature: 0.7,
          }

          const fallbackService = new AIService(defaultConfig)
          const fallbackContent = await fallbackService.generateContent({
            prompt: validatedData.prompt,
            maxTokens: defaultConfig.maxTokens,
            temperature: defaultConfig.temperature,
          })

          const duration = Date.now() - startTime

          // Registrar el uso con fallback
          await UsageMiddleware.recordUsage(
            decoded.userId,
            'generador-prompts-lucrativos',
            validatedData,
            { content: fallbackContent, usageType: 'prompt_generation', fallback: true },
            duration,
            request.ip || 'unknown',
            request.headers.get('user-agent') || undefined
          )

          return NextResponse.json({
            success: true,
            data: {
              content: fallbackContent,
              metadata: {
                provider: 'deepseek (fallback)',
                model: 'deepseek-chat',
                tokens: Math.ceil(fallbackContent.length / 4),
                duration,
                remainingUses: usageCheck.remainingUses,
                note: 'Se usó la API por defecto debido a un error con la configuración personalizada'
              }
            }
          })

        } catch (fallbackError) {
          console.error('Error también en fallback:', fallbackError)
          throw fallbackError
        }
      }

      throw aiError
    }

  } catch (error) {
    console.error('Error en generate-prompt:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Error al generar el prompt',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}

// Endpoint para obtener el estado del servicio y configuración
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { prisma } = await import('@/lib/prisma')
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

    // Verificar límites de uso
    const usageCheck = await UsageMiddleware.checkUsageLimit(decoded.userId, 'generador-prompts-lucrativos')

    // Obtener configuración de API
    const apiConfig = await UsageMiddleware.getUserAPIConfig(decoded.userId)

    return NextResponse.json({
      success: true,
      data: {
        serviceStatus: 'active',
        apiConfig: {
          provider: apiConfig.provider,
          modelName: apiConfig.modelName,
          hasCustomKey: !!apiConfig.apiKey && apiConfig.apiKey !== 'sk-d9da8c580ae540e2b398bcdb97f69224'
        },
        usage: {
          allowed: usageCheck.allowed,
          remainingUses: usageCheck.remainingUses,
          isPremium: usageCheck.isPremium,
          reason: usageCheck.reason
        }
      }
    })

  } catch (error) {
    console.error('Error en generate-prompt GET:', error)
    return NextResponse.json(
      { error: 'Error al obtener estado del servicio' },
      { status: 500 }
    )
  }
}