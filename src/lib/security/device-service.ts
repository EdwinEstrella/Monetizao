import { NextRequest } from 'next/server'
import { SecurityMiddleware } from './middleware'

interface DeviceInfo {
  fingerprint: string
  userAgent: string
  ip: string
  platform?: string
  browser?: string
  browserVersion?: string
  os?: string
  osVersion?: string
  screenResolution?: string
  colorDepth?: number
  timezone?: string
  language?: string
  hardwareConcurrency?: number
  deviceMemory?: number
}

interface RegistrationResult {
  allowed: boolean
  reason?: string
  device?: any
  existingUser?: boolean
}

export class DeviceService {
  // Extraer información del dispositivo del request
  static extractDeviceInfo(request: NextRequest): DeviceInfo {
    const userAgent = request.headers.get('user-agent') || ''
    const ip = SecurityMiddleware.getClientIP(request)
    const fingerprint = SecurityMiddleware.generateDeviceFingerprint(request)

    // Parse User-Agent para extraer más información
    const uaData = this.parseUserAgent(userAgent)

    return {
      fingerprint,
      userAgent,
      ip,
      platform: uaData.platform,
      browser: uaData.browser,
      browserVersion: uaData.browserVersion,
      os: uaData.os,
      osVersion: uaData.osVersion,
      language: request.headers.get('accept-language')?.split(',')[0] || undefined,
      timezone: request.headers.get('x-timezone') || undefined,
    }
  }

  // Parse User-Agent para extraer información del navegador
  private static parseUserAgent(userAgent: string): {
    platform?: string
    browser?: string
    browserVersion?: string
    os?: string
    osVersion?: string
  } {
    const result: any = {}

    // Detectar plataforma
    if (userAgent.includes('Windows')) {
      result.platform = 'Windows'
      const match = userAgent.match(/Windows NT ([0-9.]+)/)
      if (match) result.osVersion = match[1]
    } else if (userAgent.includes('Mac')) {
      result.platform = 'macOS'
      const match = userAgent.match(/Mac OS X ([0-9._]+)/)
      if (match) result.osVersion = match[1].replace(/_/g, '.')
    } else if (userAgent.includes('Linux')) {
      result.platform = 'Linux'
    } else if (userAgent.includes('Android')) {
      result.platform = 'Android'
      const match = userAgent.match(/Android ([0-9.]+)/)
      if (match) result.osVersion = match[1]
    } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      result.platform = 'iOS'
      const match = userAgent.match(/OS ([0-9_]+)/)
      if (match) result.osVersion = match[1].replace(/_/g, '.')
    }

    result.os = result.platform

    // Detectar navegador
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      result.browser = 'Chrome'
      const match = userAgent.match(/Chrome\/([0-9.]+)/)
      if (match) result.browserVersion = match[1]
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      result.browser = 'Safari'
      const match = userAgent.match(/Safari\/([0-9.]+)/)
      if (match) result.browserVersion = match[1]
    } else if (userAgent.includes('Firefox')) {
      result.browser = 'Firefox'
      const match = userAgent.match(/Firefox\/([0-9.]+)/)
      if (match) result.browserVersion = match[1]
    } else if (userAgent.includes('Edg')) {
      result.browser = 'Edge'
      const match = userAgent.match(/Edg\/([0-9.]+)/)
      if (match) result.browserVersion = match[1]
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      result.browser = 'Opera'
      const match = userAgent.match(/(?:Opera|OPR)\/([0-9.]+)/)
      if (match) result.browserVersion = match[1]
    }

    return result
  }

  // Verificar si un dispositivo ya está registrado
  static async checkDeviceExists(fingerprint: string): Promise<any> {
    try {
      const { prisma } = await import('@/lib/prisma')

      return await prisma.devices.findUnique({
        where: { fingerprint },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              is_active: true,
              is_banned: true
            }
          }
        }
      })
    } catch (error) {
      console.error('Error checking device existence:', error)
      return null
    }
  }

  // Verificar si un IP tiene múltiples dispositivos asociados (posible abuso)
  static async checkIPAbuse(ip: string, maxDevices: number = 5): Promise<boolean> {
    try {
      // En desarrollo, ser mucho más permisivo con IPs locales
      if (process.env.NODE_ENV === 'development') {
        const localPatterns = [
          /^127\./,    // IPv4 localhost
          /^::1$/,     // IPv6 localhost
          /^10\./,     // Private networks
          /^192\.168\./, // Private networks
          /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // Private networks
        ]

        const isLocal = localPatterns.some(pattern => pattern.test(ip))
        if (isLocal) {
          return false // Permitir múltiples dispositivos locales en desarrollo
        }

        // Aumentar el límite para desarrollo
        maxDevices = 20
      }

      const { prisma } = await import('@/lib/prisma')

      const deviceCount = await prisma.devices.count({
        where: {
          ip,
          isActive: true,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Últimas 24 horas
          }
        }
      })

      return deviceCount >= maxDevices
    } catch (error) {
      console.error('Error checking IP abuse:', error)
      return true // En caso de error, bloquear por seguridad
    }
  }

  // Registrar un nuevo dispositivo
  static async registerDevice(deviceInfo: DeviceInfo, userId?: string): Promise<any> {
    try {
      const { prisma } = await import('@/lib/prisma')

      return await prisma.devices.create({
        data: {
          userId,
          fingerprint: deviceInfo.fingerprint,
          userAgent: deviceInfo.userAgent,
          ip: deviceInfo.ip,
          platform: deviceInfo.platform,
          browser: deviceInfo.browser,
          browserVersion: deviceInfo.browserVersion,
          os: deviceInfo.os,
          osVersion: deviceInfo.osVersion,
          screenResolution: deviceInfo.screenResolution,
          colorDepth: deviceInfo.colorDepth,
          timezone: deviceInfo.timezone,
          language: deviceInfo.language,
          hardwareConcurrency: deviceInfo.hardwareConcurrency,
          deviceMemory: deviceInfo.deviceMemory,
          isActive: true,
        }
      })
    } catch (error) {
      console.error('Error registering device:', error)
      throw error
    }
  }

  // Actualizar dispositivo existente
  static async updateDevice(fingerprint: string, userId?: string, lastSeen?: boolean): Promise<void> {
    try {
      const { prisma } = await import('@/lib/prisma')

      const updateData: any = {
        lastSeen: new Date(),
      }

      if (userId) {
        updateData.userId = userId
      }

      await prisma.devices.update({
        where: { fingerprint },
        data: updateData
      })
    } catch (error) {
      console.error('Error updating device:', error)
    }
  }

  // Desactivar dispositivo
  static async deactivateDevice(fingerprint: string): Promise<void> {
    try {
      const { prisma } = await import('@/lib/prisma')

      await prisma.devices.update({
        where: { fingerprint },
        data: {
          isActive: false,
          lastSeen: new Date()
        }
      })
    } catch (error) {
      console.error('Error deactivating device:', error)
    }
  }

  // Obtener dispositivos de un usuario
  static async getUserDevices(userId: string): Promise<any[]> {
    try {
      const { prisma } = await import('@/lib/prisma')

      return await prisma.devices.findMany({
        where: {
          userId,
          isActive: true
        },
        orderBy: {
          lastSeen: 'desc'
        }
      })
    } catch (error) {
      console.error('Error getting user devices:', error)
      return []
    }
  }

  // Verificar si el usuario puede registrar este dispositivo
  static async canRegisterDevice(deviceInfo: DeviceInfo): Promise<RegistrationResult> {
    // 1. Verificar si el dispositivo ya existe
    const existingDevice = await this.checkDeviceExists(deviceInfo.fingerprint)

    if (existingDevice) {
      // Si el dispositivo existe pero está asociado a un usuario baneado
      if (existingDevice.user?.is_banned) {
        return {
          allowed: false,
          reason: 'Este dispositivo está asociado a una cuenta suspendida',
          existingUser: true
        }
      }

      // Si el dispositivo existe y está activo
      if (existingDevice.isActive) {
        return {
          allowed: true,
          device: existingDevice,
          existingUser: true
        }
      }
    }

    // 2. Verificar abuso de IP
    const isIPAbuse = await this.checkIPAbuse(deviceInfo.ip)
    if (isIPAbuse) {
      return {
        allowed: false,
        reason: 'Demasiados dispositivos registrados desde esta dirección IP. Por seguridad, temporalmente limitamos el registro.'
      }
    }

    // 3. Verificar si hay patrones sospechosos
    const suspiciousPatterns = await this.detectSuspiciousPatterns(deviceInfo)
    if (suspiciousPatterns.length > 0) {
      return {
        allowed: false,
        reason: `Patrones sospechosos detectados: ${suspiciousPatterns.join(', ')}`
      }
    }

    return { allowed: true }
  }

  // Detectar patrones sospechosos
  private static async detectSuspiciousPatterns(deviceInfo: DeviceInfo): Promise<string[]> {
    const patterns: string[] = []

    // Verificar User-Agent genérico o sospechoso
    if (!deviceInfo.userAgent || deviceInfo.userAgent.length < 10) {
      patterns.push('User-Agent inválido o muy corto')
    }

    // Verificar si hay caracteres extraños en el User-Agent
    if (deviceInfo.userAgent && /[^\x20-\x7E]/.test(deviceInfo.userAgent)) {
      patterns.push('User-Agent contiene caracteres no estándar')
    }

    // Verificar timezone sospechoso
    if (deviceInfo.timezone && deviceInfo.timezone.length > 50) {
      patterns.push('Timezone inválido')
    }

    return patterns
  }

  // Limpiar dispositivos antiguos
  static async cleanupOldDevices(days: number = 30): Promise<number> {
    try {
      const { prisma } = await import('@/lib/prisma')

      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

      const result = await prisma.devices.deleteMany({
        where: {
          lastSeen: {
            lt: cutoffDate
          },
          userId: null // Solo eliminar dispositivos sin usuario
        }
      })

      return result.count
    } catch (error) {
      console.error('Error cleaning up old devices:', error)
      return 0
    }
  }

  // Bloquear IP
  static async blockIP(ip: string, reason: string): Promise<void> {
    try {
      // Desactivar todos los dispositivos de esta IP
      const { prisma } = await import('@/lib/prisma')

      await prisma.devices.updateMany({
        where: {
          ip,
          isActive: true
        },
        data: {
          isActive: false
        }
      })

      // Agregar IP a lista negra del middleware de seguridad
      SecurityMiddleware.blacklistIP(ip)

      console.log(`IP ${ip} bloqueada. Razón: ${reason}`)
    } catch (error) {
      console.error('Error blocking IP:', error)
    }
  }

  // Generar reporte de seguridad
  static async generateSecurityReport(): Promise<any> {
    try {
      const { prisma } = await import('@/lib/prisma')

      const [
        totalDevices,
        activeDevices,
        devicesWithoutUsers,
        uniqueIPs,
        recentDevices
      ] = await Promise.all([
        prisma.devices.count(),
        prisma.devices.count({ where: { isActive: true } }),
        prisma.devices.count({ where: { userId: null } }),
        prisma.devices.groupBy({
          by: ['ip'],
          _count: { ip: true }
        }),
        prisma.devices.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
          }
        })
      ])

      return {
        totalDevices,
        activeDevices,
        devicesWithoutUsers,
        uniqueIPs: uniqueIPs.length,
        devicesLast24h: recentDevices,
        avgDevicesPerIP: uniqueIPs.length > 0 ? activeDevices / uniqueIPs.length : 0
      }
    } catch (error) {
      console.error('Error generating security report:', error)
      return null
    }
  }
}