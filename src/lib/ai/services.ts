interface AIServiceConfig {
  provider: 'openai' | 'deepseek' | 'gemini'
  apiKey: string
  modelName: string
  maxTokens: number
  temperature: number
}

interface AIServiceResponse {
  success: boolean
  content?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  error?: string
}

class AIService {
  private config: AIServiceConfig

  constructor(config: AIServiceConfig) {
    this.config = config
  }

  async generateContent(prompt: string): Promise<AIServiceResponse> {
    try {
      switch (this.config.provider) {
        case 'deepseek':
          return await this.callDeepSeek(prompt)
        case 'openai':
          return await this.callOpenAI(prompt)
        case 'gemini':
          return await this.callGemini(prompt)
        default:
          throw new Error(`Proveedor no soportado: ${this.config.provider}`)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  private async callDeepSeek(prompt: string): Promise<AIServiceResponse> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.modelName || 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`DeepSeek API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()

    return {
      success: true,
      content: data.choices[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    }
  }

  private async callOpenAI(prompt: string): Promise<AIServiceResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.modelName || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()

    return {
      success: true,
      content: data.choices[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    }
  }

  private async callGemini(prompt: string): Promise<AIServiceResponse> {
    // Gemini API implementation
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.modelName || 'gemini-pro'}:generateContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: this.config.maxTokens,
          temperature: this.config.temperature,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()

    return {
      success: true,
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount || 0,
        completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: data.usageMetadata?.totalTokenCount || 0,
      },
    }
  }

  // Configurar actualización de API para un usuario
  static async updateAPIConfig(userId: string, config: Partial<AIServiceConfig>): Promise<boolean> {
    try {
      const { prisma } = await import('@/lib/prisma')

      if (config.apiKey && config.provider) {
        // Crear o actualizar configuración
        await prisma.api_configs.upsert({
          where: { userId },
          create: {
            userId,
            provider: config.provider,
            apiKey: config.apiKey,
            modelName: config.modelName || this.getDefaultModel(config.provider),
            isActive: true,
            maxTokens: config.maxTokens || 4000,
            temperature: config.temperature || 0.7,
          },
          update: {
            provider: config.provider,
            apiKey: config.apiKey,
            modelName: config.modelName,
            isActive: true,
            maxTokens: config.maxTokens,
            temperature: config.temperature,
          },
        })
      }

      return true
    } catch (error) {
      console.error('Error updating API config:', error)
      return false
    }
  }

  // Obtener configuración de API de un usuario
  static async getUserAPIConfig(userId: string): Promise<AIServiceConfig | null> {
    try {
      const { prisma } = await import('@/lib/prisma')

      const config = await prisma.apiConfigs.findFirst({
        where: {
          userId,
          isActive: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      })

      if (!config) {
        return null
      }

      return {
        provider: config.provider as 'openai' | 'deepseek' | 'gemini',
        apiKey: config.apiKey,
        modelName: config.modelName || '',
        maxTokens: config.maxTokens,
        temperature: config.temperature,
      }
    } catch (error) {
      console.error('Error getting user API config:', error)
      return null
    }
  }

  // Obtener configuración de API para usuarios no logueados (API del proyecto)
  static getProjectAPIConfig(): AIServiceConfig | null {
    try {
      const apiKey = process.env.DEEPSEEK_PROJECT_API_KEY

      if (!apiKey) {
        console.warn('No se encontró DEEPSEEK_PROJECT_API_KEY en las variables de entorno')
        return null
      }

      return {
        provider: 'deepseek',
        apiKey: apiKey,
        modelName: 'deepseek-chat',
        maxTokens: 4000,
        temperature: 0.7,
      }
    } catch (error) {
      console.error('Error getting project API config:', error)
      return null
    }
  }

  // Método para crear servicio con configuración automática
  static async createService(userId?: string): Promise<AIService | null> {
    try {
      // Si hay userId, intentar obtener API del usuario
      if (userId) {
        const userConfig = await this.getUserAPIConfig(userId)
        if (userConfig) {
          return new AIService(userConfig)
        }
      }

      // Si no hay API de usuario o no está logueado, usar API del proyecto
      const projectConfig = this.getProjectAPIConfig()
      if (projectConfig) {
        return new AIService(projectConfig)
      }

      console.error('No hay configuración de API disponible')
      return null
    } catch (error) {
      console.error('Error creating AI service:', error)
      return null
    }
  }

  // Obtener modelo por defecto para cada proveedor
  private static getDefaultModel(provider: string): string {
    switch (provider) {
      case 'openai':
        return 'gpt-3.5-turbo'
      case 'deepseek':
        return 'deepseek-chat'
      case 'gemini':
        return 'gemini-pro'
      default:
        return 'deepseek-chat'
    }
  }

  // Validar configuración de API
  static async validateAPIConfig(config: AIServiceConfig): Promise<boolean> {
    try {
      const testPrompt = "Responde con 'OK' si puedes leer esto."
      const service = new AIService(config)
      const response = await service.generateContent(testPrompt)
      return response.success && response.content?.includes('OK')
    } catch (error) {
      console.error('API validation error:', error)
      return false
    }
  }

  // Obtener lista de proveedores soportados
  static getSupportedProviders(): Array<{
    value: string
    label: string
    models: string[]
    description: string
  }> {
    return [
      {
        value: 'deepseek',
        label: 'DeepSeek',
        models: ['deepseek-chat', 'deepseek-coder'],
        description: 'Potente modelo de IA chino, económico y eficiente',
      },
      {
        value: 'openai',
        label: 'OpenAI',
        models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'],
        description: 'Modelos de IA de alta calidad de OpenAI',
      },
      {
        value: 'gemini',
        label: 'Google Gemini',
        models: ['gemini-pro', 'gemini-pro-vision'],
        description: 'Modelos avanzados de Google con capacidades multimodales',
      },
    ]
  }
}

export default AIService