import { z } from 'zod'
import AIService from '@/lib/ai/services'
import insforge from '@/lib/insforge'

// Schemas de validación
export const PromptGeneratorSchema = z.object({
  templateId: z.string().uuid(),
  variables: z.record(z.string()),
})

export const ROICalculatorSchema = z.object({
  serviceType: z.string(),
  initialInvestment: z.number().positive(),
  monthlyCost: z.number().positive(),
  expectedRevenue: z.number().positive(),
  timeHorizon: z.number().int().positive(),
  efficiencyGain: z.number().min(0).max(100),
})

export const ProposalGeneratorSchema = z.object({
  clientName: z.string(),
  clientIndustry: z.string(),
  serviceDescription: z.string(),
  budget: z.number().positive(),
  timeline: z.string(),
  painPoints: z.array(z.string()),
  solutions: z.array(z.string()),
})

export const CompetitionAnalysisSchema = z.object({
  niche: z.string(),
  competitors: z.array(z.string()),
  analysisDepth: z.enum(['basic', 'detailed', 'comprehensive']),
  focusAreas: z.array(z.string()),
})

export const ContentOptimizerSchema = z.object({
  content: z.string().min(100),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  contentType: z.string(),
  targetAudience: z.string(),
})

// Tipos
export type PromptGeneratorInput = z.infer<typeof PromptGeneratorSchema>
export type ROICalculatorInput = z.infer<typeof ROICalculatorSchema>
export type ProposalGeneratorInput = z.infer<typeof ProposalGeneratorSchema>
export type CompetitionAnalysisInput = z.infer<typeof CompetitionAnalysisSchema>
export type ContentOptimizerInput = z.infer<typeof ContentOptimizerSchema>

// Datos mock para herramientas (temporal hasta que Prisma funcione)
const mockTools = [
  {
    id: '1',
    name: 'Generador de Prompts Lucrativos',
    slug: 'generador-prompts-lucrativos',
    description: 'Herramienta IA que genera prompts optimizados para generar ingresos en diferentes nichos.',
    category: 'Generación',
    isPremium: false,
    icon: 'Zap',
    rating: 4.9,
    usersCount: 25000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Calculadora de ROI para Servicios IA',
    slug: 'calculadora-roi-servicios-ia',
    description: 'Calcula el retorno de inversión para diferentes servicios de IA y optimiza tu pricing.',
    category: 'Analytics',
    isPremium: false,
    icon: 'BarChart3',
    rating: 4.7,
    usersCount: 12000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

// Servicios
export class ToolsService {
  static async recordUsage(toolId: string, userId: string | null, input: any, output: any, success: boolean, duration: number, ipAddress: string, userAgent?: string) {
    try {
      // Registrar uso en InsForge
      await insforge.database.from('tool_usages').insert({
        tool_id: toolId,
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent,
        input,
        output,
        success,
        duration,
      })

      // Obtener herramienta actual
      const { data: tool } = await insforge.database
        .from('tools')
        .select('users_count')
        .eq('id', toolId)
        .single()

      if (tool) {
        // Actualizar contador de usuarios
        await insforge.database
          .from('tools')
          .update({ users_count: (tool.users_count || 0) + 1 })
          .eq('id', toolId)
      }
    } catch (error) {
      console.error('Error recording usage:', error)
    }
  }

  static async getToolBySlug(slug: string) {
    const { data: tools, error } = await insforge.database
      .from('tools')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !tools) {
      return mockTools.find(tool => tool.slug === slug) || null
    }

    return tools
  }

  static async getAllTools(category?: string, isPremium?: boolean) {
    let query = insforge.database
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .order('users_count', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (isPremium !== undefined) {
      query = query.eq('is_premium', isPremium)
    }

    const { data: tools, error } = await query

    if (error || !tools) {
      let filteredTools = mockTools
      if (category) {
        filteredTools = filteredTools.filter(tool => tool.category === category)
      }
      if (isPremium !== undefined) {
        filteredTools = filteredTools.filter(tool => tool.isPremium === isPremium)
      }
      return filteredTools
    }

    return tools
  }

  static async getUserPremiumAccess(userId: string): Promise<boolean> {
    const { data: subscriptions } = await insforge.database
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gt('end_date', new Date().toISOString())
      .limit(1)

    return !!subscriptions && subscriptions.length > 0
  }

  static async rateTool(toolId: string, userId: string | null, rating: number, comment?: string, ipAddress?: string, userAgent?: string) {
    // Verificar si ya ha calificado
    const { data: existing } = await insforge.database
      .from('tool_ratings')
      .select('*')
      .eq('tool_id', toolId)
      .eq('user_id', userId)
      .eq('ip_address', ipAddress || '')
      .maybeSingle()

    if (existing) {
      // Actualizar rating existente
      const { data: updated } = await insforge.database
        .from('tool_ratings')
        .update({ rating, comment })
        .eq('id', existing.id)
        .select()
        .single()

      // Recalcular rating promedio de la herramienta
      await this.recalculateToolRating(toolId)
      return updated
    } else {
      // Crear nuevo rating
      const { data: created } = await insforge.database
        .from('tool_ratings')
        .insert({
          tool_id: toolId,
          user_id: userId,
          rating,
          comment,
          ip_address: ipAddress || '',
          user_agent: userAgent,
        })
        .select()
        .single()

      // Recalcular rating promedio de la herramienta
      await this.recalculateToolRating(toolId)
      return created
    }
  }

  private static async recalculateToolRating(toolId: string) {
    const { data: ratings } = await insforge.database
      .from('tool_ratings')
      .select('rating')
      .eq('tool_id', toolId)

    if (ratings && ratings.length > 0) {
      const averageRating = ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length

      await insforge.database
        .from('tools')
        .update({ rating: averageRating })
        .eq('id', toolId)
    }
  }
}

// Generador de Prompts
export class PromptGeneratorService {
  static async generatePrompt(input: PromptGeneratorInput): Promise<string> {
    // Obtener template de InsForge
    const { data: template } = await insforge.database
      .from('prompt_templates')
      .select('*')
      .eq('id', input.templateId)
      .single()

    if (!template) {
      throw new Error('Template not found')
    }

    let prompt = template.prompt

    // Reemplazar variables
    for (const [key, value] of Object.entries(input.variables)) {
      const regex = new RegExp(`{${key}}`, 'g')
      prompt = prompt.replace(regex, value as string)
    }

    // Incrementar contador de uso
    await insforge.database
      .from('prompt_templates')
      .update({ usage_count: (template.usage_count || 0) + 1 })
      .eq('id', template.id)

    return prompt
  }

  static async getTemplates(category?: string, isPremium?: boolean) {
    let query = insforge.database
      .from('prompt_templates')
      .select('*')
      .eq('is_active', true)
      .order('usage_count', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (isPremium !== undefined) {
      query = query.eq('is_premium', isPremium)
    }

    const { data: templates, error } = await query

    if (error) {
      console.error('Error fetching templates:', error)
      return []
    }

    return templates || []
  }
}

// Calculadora de ROI
export class ROICalculatorService {
  static async calculateROI(input: ROICalculatorInput): Promise<any> {
    const {
      serviceType,
      initialInvestment,
      monthlyCost,
      expectedRevenue,
      timeHorizon,
      efficiencyGain
    } = input

    // Calcular métricas
    const totalCost = initialInvestment + (monthlyCost * timeHorizon)
    const totalRevenue = expectedRevenue * timeHorizon
    const netProfit = totalRevenue - totalCost
    const roiPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0

    // Calcular break-even point
    const monthlyNet = expectedRevenue - monthlyCost
    const breakEvenMonths = initialInvestment > 0 && monthlyNet > 0
      ? Math.ceil(initialInvestment / monthlyNet)
      : 0

    // Calcular ROI ajustado por eficiencia
    const efficiencyMultiplier = 1 + (efficiencyGain / 100)
    const adjustedRevenue = expectedRevenue * efficiencyMultiplier
    const adjustedROI = totalCost > 0
      ? ((adjustedRevenue * timeHorizon - totalCost) / totalCost) * 100
      : 0

    // Proyecciones mensuales
    const monthlyProjections = []
    let cumulativeRevenue = 0
    let cumulativeCost = initialInvestment

    for (let month = 1; month <= timeHorizon; month++) {
      cumulativeRevenue += adjustedRevenue
      cumulativeCost += monthlyCost

      monthlyProjections.push({
        month,
        revenue: adjustedRevenue,
        cost: monthlyCost + (month === 1 ? initialInvestment : 0),
        cumulative: {
          revenue: cumulativeRevenue,
          cost: cumulativeCost,
          profit: cumulativeRevenue - cumulativeCost,
        },
      })
    }

    return {
      summary: {
        initialInvestment,
        monthlyCost,
        expectedRevenue: adjustedRevenue,
        timeHorizon,
        totalCost,
        totalRevenue: adjustedRevenue * timeHorizon,
        netProfit: (adjustedRevenue * timeHorizon) - totalCost,
        roiPercentage: adjustedROI,
        breakEvenMonths,
        efficiencyGain,
      },
      projections: monthlyProjections,
      insights: this.generateInsights(adjustedROI, breakEvenMonths, efficiencyGain),
      recommendations: this.generateRecommendations(serviceType, adjustedROI, efficiencyGain),
    }
  }

  private static generateInsights(roi: number, breakEven: number, efficiency: number) {
    const insights = []

    if (roi > 100) {
      insights.push('Excelente retorno de inversión esperado')
    } else if (roi > 50) {
      insights.push('Buen retorno de inversión esperado')
    } else if (roi > 0) {
      insights.push('Retorno de inversión positivo pero moderado')
    } else {
      insights.push('Se necesita revisar la viabilidad del proyecto')
    }

    if (breakEven <= 6) {
      insights.push('Recuperación rápida de la inversión inicial')
    } else if (breakEven <= 12) {
      insights.push('Recuperación de inversión en plazo razonable')
    } else {
      insights.push('La recuperación de la inversión tomará más tiempo')
    }

    if (efficiency > 50) {
      insights.push('Mejoras significativas en eficiencia esperadas')
    } else if (efficiency > 20) {
      insights.push('Mejoras moderadas en eficiencia')
    }

    return insights
  }

  private static generateRecommendations(serviceType: string, roi: number, efficiency: number) {
    const recommendations = []

    if (roi < 50) {
      recommendations.push('Considera optimizar costos o aumentar ingresos esperados')
      recommendations.push('Evalúa alternativas de servicios con mejor ROI')
    }

    if (efficiency < 30) {
      recommendations.push('Busca soluciones que ofrezcan mayor ganancia de eficiencia')
      recommendations.push('Considera capacitación adicional para maximizar beneficios')
    }

    if (serviceType.includes('automation')) {
      recommendations.push('Implementa gradualmente para minimizar riesgos')
      recommendations.push('Mide KPIs específicos para validar ganancias de eficiencia')
    }

    return recommendations
  }
}

export default ToolsService