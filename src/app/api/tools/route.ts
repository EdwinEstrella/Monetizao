import { NextRequest, NextResponse } from 'next/server'
import { ToolsService, PromptGeneratorService, ROICalculatorService } from '@/lib/tools/services'
import { z } from 'zod'

// Inicialización dinámica de Prisma para evitar problemas en build
let prismaClient: any = null

const getPrismaClient = async () => {
  if (!prismaClient) {
    try {
      const { PrismaClient } = await import('@/lib/prisma')
      prismaClient = new PrismaClient()
    } catch (error) {
      console.error('Error loading Prisma Client:', error)
      return null
    }
  }
  return prismaClient
}

const GeneratePromptSchema = z.object({
  action: z.literal('generate-prompt'),
  templateId: z.string().uuid(),
  variables: z.record(z.string()),
})

const CalculateROISchema = z.object({
  action: z.literal('calculate-roi'),
  serviceType: z.string(),
  initialInvestment: z.number().positive(),
  monthlyCost: z.number().positive(),
  expectedRevenue: z.number().positive(),
  timeHorizon: z.number().int().positive(),
  efficiencyGain: z.number().min(0).max(100),
})

const GetToolsSchema = z.object({
  action: z.literal('get-tools'),
  category: z.string().optional(),
  isPremium: z.boolean().optional(),
})

const RateToolSchema = z.object({
  action: z.literal('rate-tool'),
  toolId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now()
    const body = await request.json()
    const ipAddress = request.ip || 'unknown'
    const userAgent = request.headers.get('user-agent') || undefined

    // Validar que tenga acción
    if (!body.action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    let result
    let toolId = null

    switch (body.action) {
      case 'generate-prompt': {
        const validated = GeneratePromptSchema.parse(body)

        try {
          const prompt = await PromptGeneratorService.generatePrompt(validated)

          // Registrar uso
          await ToolsService.recordUsage(
            'generador-prompts-lucrativos', // Este sería el ID real de la herramienta
            null, // userId - se obtendría de la sesión
            validated,
            { prompt },
            true,
            Date.now() - startTime,
            ipAddress,
            userAgent
          )

          result = {
            success: true,
            data: { prompt },
            message: 'Prompt generado exitosamente'
          }
        } catch (error) {
          result = {
            success: false,
            error: error instanceof Error ? error.message : 'Error generando prompt'
          }
        }
        break
      }

      case 'calculate-roi': {
        const validated = CalculateROISchema.parse(body)

        try {
          const roiCalculation = await ROICalculatorService.calculateROI(validated)

          // Registrar uso
          await ToolsService.recordUsage(
            'calculadora-roi-servicios-ia',
            null,
            validated,
            roiCalculation,
            true,
            Date.now() - startTime,
            ipAddress,
            userAgent
          )

          result = {
            success: true,
            data: roiCalculation,
            message: 'ROI calculado exitosamente'
          }
        } catch (error) {
          result = {
            success: false,
            error: error instanceof Error ? error.message : 'Error calculando ROI'
          }
        }
        break
      }

      case 'get-tools': {
        const validated = GetToolsSchema.parse(body)

        try {
          const tools = await ToolsService.getAllTools(
            validated.category,
            validated.isPremium
          )

          result = {
            success: true,
            data: tools,
            message: 'Herramientas obtenidas exitosamente'
          }
        } catch (error) {
          result = {
            success: false,
            error: error instanceof Error ? error.message : 'Error obteniendo herramientas'
          }
        }
        break
      }

      case 'rate-tool': {
        const validated = RateToolSchema.parse(body)

        try {
          const rating = await ToolsService.rateTool(
            validated.toolId,
            null, // userId - se obtendría de la sesión
            validated.rating,
            validated.comment,
            ipAddress,
            userAgent
          )

          result = {
            success: true,
            data: rating,
            message: 'Calificación registrada exitosamente'
          }
        } catch (error) {
          result = {
            success: false,
            error: error instanceof Error ? error.message : 'Error registrando calificación'
          }
        }
        break
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isPremium = searchParams.get('isPremium') === 'true'

    const tools = await ToolsService.getAllTools(
      category || undefined,
      isPremium !== undefined ? isPremium : undefined
    )

    return NextResponse.json({
      success: true,
      data: tools,
      message: 'Herramientas obtenidas exitosamente'
    })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}