import { NextRequest, NextResponse } from 'next/server'
import insforge from '@/lib/insforge'

interface UsageCheckResult {
  allowed: boolean
  reason?: string
  remainingUses?: number
  isPremium?: boolean
}

export class UsageMiddleware {
  static async checkUsageLimit(userId: string, toolSlug: string): Promise<UsageCheckResult> {
    try {
      // Obtener usuario y suscripción
      const { data: userSubscriptions } = await insforge.database
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gt('end_date', new Date().toISOString())
        .order('end_date', { ascending: false })

      // Obtener configuración de API
      const { data: apiConfigs } = await insforge.database
        .from('api_configs')
        .select('provider')
        .eq('user_id', userId)
        .eq('is_active', true)

      // Obtener información de usage del usuario
      const { data: userUsage } = await insforge.database
        .from('user_usage')
        .select('*')
        .eq('user_id', userId)
        .single()

      // Si tiene suscripción premium, puede usar herramientas sin límite
      const hasActiveSubscription = userSubscriptions && userSubscriptions.length > 0
      if (hasActiveSubscription) {
        return { allowed: true, isPremium: true }
      }

      // Para usuarios gratuitos, verificar límite diario
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const lastUsageDate = userUsage?.reset_at ? new Date(userUsage.reset_at) : null
      const isToday = lastUsageDate && lastUsageDate >= today
      const dailyUsage = isToday ? (userUsage?.weekly_count || 0) : 0
      const maxDailyUsage = 5

      // Verificar si la herramienta es premium
      const isToolPremium = await this.isToolPremium(toolSlug)
      if (isToolPremium) {
        return {
          allowed: false,
          reason: 'Esta herramienta requiere una suscripción Premium',
          remainingUses: maxDailyUsage - dailyUsage,
          isPremium: false
        }
      }

      // Verificar límite diario
      if (dailyUsage >= maxDailyUsage) {
        return {
          allowed: false,
          reason: 'Has alcanzado tu límite diario de uso (5 usos por día)',
          remainingUses: 0,
          isPremium: false,
        }
      }

      return {
        allowed: true,
        remainingUses: maxDailyUsage - dailyUsage - 1,
        isPremium: false,
      }
    } catch (error) {
      console.error('Error checking usage limit:', error)
      return { allowed: false, reason: 'Error interno' }
    }
  }

  static async recordUsage(userId: string, toolSlug: string, input: any, output: any, duration: number, ipAddress: string, userAgent?: string) {
    try {
      // Incrementar contador diario
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { data: userUsage } = await insforge.database
        .from('user_usage')
        .select('*')
        .eq('user_id', userId)
        .single()

      const lastUsageDate = userUsage?.reset_at ? new Date(userUsage.reset_at) : null
      const isToday = lastUsageDate && lastUsageDate >= today
      const newDailyCount = isToday ? (userUsage?.weekly_count || 0) + 1 : 1

      if (userUsage) {
        await insforge.database
          .from('user_usage')
          .update({
            weekly_count: newDailyCount,
            reset_at: new Date().toISOString(),
          })
          .eq('user_id', userId)
      } else {
        await insforge.database
          .from('user_usage')
          .insert({
            user_id: userId,
            weekly_count: newDailyCount,
            monthly_count: 0,
            reset_at: new Date().toISOString(),
          })
      }

      // Obtener la herramienta por slug para obtener el ID
      const { data: tool } = await insforge.database
        .from('tools')
        .select('id')
        .eq('slug', toolSlug)
        .single()

      if (!tool) {
        console.error('Tool not found for slug:', toolSlug)
        return false
      }

      // Registrar uso en la base de datos
      await insforge.database
        .from('tool_usages')
        .insert({
          tool_id: tool.id,
          user_id: userId,
          ip_address: ipAddress,
          user_agent: userAgent,
          input,
          output,
          success: true,
          duration,
        })

      // Actualizar contador de usos de la herramienta
      const { data: currentTool } = await insforge.database
        .from('tools')
        .select('users_count')
        .eq('id', tool.id)
        .single()

      if (currentTool) {
        await insforge.database
          .from('tools')
          .update({ users_count: (currentTool.users_count || 0) + 1 })
          .eq('id', tool.id)
      }

      return true
    } catch (error) {
      console.error('Error recording usage:', error)
      return false
    }
  }

  private static async isToolPremium(toolSlug: string): Promise<boolean> {
    try {
      const { data: tool } = await insforge.database
        .from('tools')
        .select('is_premium')
        .eq('slug', toolSlug)
        .single()

      return tool?.is_premium || false
    } catch (error) {
      console.error('Error checking tool premium status:', error)
      return false
    }
  }

  static async checkAPIConfig(userId: string): Promise<boolean> {
    try {
      const { data: apiConfig } = await insforge.database
        .from('api_configs')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle()

      if (!apiConfig) {
        // Si no tiene configuración personalizada, usar la API por defecto
        return true // API por defecto de la app
      }

      // Validar que tenga los campos necesarios
      return !!(apiConfig.api_key.trim() === '')
    } catch (error) {
      console.error('Error checking API config:', error)
      return true // Por defecto permitir acceso
    }
  }

  static async getUserAPIConfig(userId: string) {
    try {
      const { data: apiConfig } = await insforge.database
        .from('api_configs')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle()

      if (!apiConfig) {
        // Configuración por defecto
        return {
          provider: 'deepseek',
          apiKey: 'sk-d9da8c580ae540e2b398bcdb97f69224',
          modelName: 'deepseek-chat',
          maxTokens: 4000,
          temperature: 0.7,
        }
      }

      return {
        provider: apiConfig.provider,
        apiKey: apiConfig.api_key,
        modelName: apiConfig.model_name,
        maxTokens: apiConfig.max_tokens,
        temperature: apiConfig.temperature,
      }
    } catch (error) {
      console.error('Error getting user API config:', error)
      // Retornar configuración por defecto en caso de error
      return {
        provider: 'deepseek',
        apiKey: 'sk-d9da8c580ae540e2b398bcdb97f69224',
        modelName: 'deepseek-chat',
        maxTokens: 4000,
        temperature: 0.7,
      }
    }
  }
}

export default UsageMiddleware
