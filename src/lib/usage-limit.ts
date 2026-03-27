import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

interface UsageLimit {
  limit: number
  period: 'daily' | 'weekly' | 'monthly'
}

// Configuración de límites según tipo de usuario
const USAGE_LIMITS = {
  guest: {
    limit: 5, // 5 usos por semana para usuarios no logueados
    period: 'weekly' as const
  },
  free: {
    limit: 10, // 10 usos por semana para usuarios gratuitos
    period: 'weekly' as const
  },
  premium: {
    limit: Infinity, // Ilimitado para usuarios premium
    period: 'weekly' as const
  }
}

export interface UsageStats {
  currentUsage: number
  limit: number
  remaining: number
  resetDate: Date
  isExceeded: boolean
}

// Obtener clave de cache para el límite de uso
function getUsageCacheKey(request: NextRequest, userId?: string): string {
  if (userId) {
    return `usage:${userId}`
  }

  // Para usuarios no logueados, usar fingerprint o IP
  const fingerprint = request.headers.get('x-user-fingerprint') ||
                     request.ip ||
                     'unknown'
  return `usage:guest:${fingerprint}`
}

// Obtener fecha de reset según el período
function getResetDate(period: 'daily' | 'weekly' | 'monthly'): Date {
  const now = new Date()

  switch (period) {
    case 'daily':
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      return tomorrow

    case 'weekly':
      const startOfWeek = new Date(now)
      const dayOfWeek = startOfWeek.getDay()
      const daysUntilMonday = dayOfWeek === 0 ? 7 : dayOfWeek
      startOfWeek.setDate(startOfWeek.getDate() - daysUntilMonday + 1)
      startOfWeek.setHours(0, 0, 0, 0)

      const nextWeek = new Date(startOfWeek)
      nextWeek.setDate(nextWeek.getDate() + 7)
      return nextWeek

    case 'monthly':
      const nextMonth = new Date(now)
      nextMonth.setMonth(nextMonth.getMonth() + 1, 1)
      nextMonth.setHours(0, 0, 0, 0)
      return nextMonth

    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000)
  }
}

// Verificar límite de uso
export async function checkUsageLimit(
  request: NextRequest,
  userType: 'guest' | 'free' | 'premium' = 'guest',
  userId?: string
): Promise<UsageStats> {
  const config = USAGE_LIMITS[userType]
  const cacheKey = getUsageCacheKey(request, userId)
  const resetDate = getResetDate(config.period)

  // Si es premium, no hay límite
  if (config.limit === Infinity) {
    return {
      currentUsage: 0,
      limit: Infinity,
      remaining: Infinity,
      resetDate,
      isExceeded: false
    }
  }

  try {
    // Para usuarios logueados, verificar en base de datos
    if (userId && userType !== 'guest') {
      const usage = await prisma.userUsage.findUnique({
        where: { userId }
      })

      if (!usage || usage.resetAt <= new Date()) {
        // Resetear contadores si el período ha terminado
        await prisma.userUsage.upsert({
          where: { userId },
          update: {
            weeklyCount: 0,
            resetAt: resetDate
          },
          create: {
            userId,
            weeklyCount: 0,
            resetAt: resetDate
          }
        })

        return {
          currentUsage: 0,
          limit: config.limit,
          remaining: config.limit,
          resetDate,
          isExceeded: false
        }
      }

      const currentUsage = usage.weeklyCount
      const remaining = Math.max(0, config.limit - currentUsage)

      return {
        currentUsage,
        limit: config.limit,
        remaining,
        resetDate,
        isExceeded: currentUsage >= config.limit
      }
    }

    // Para usuarios no logueados, usar un sistema simple con memoria (en producción usar Redis)
    // Por ahora, vamos a implementar un sistema básico con IP
    const usageData = await getGuestUsage(request.ip || 'unknown')

    return {
      currentUsage: usageData.count,
      limit: config.limit,
      remaining: Math.max(0, config.limit - usageData.count),
      resetDate,
      isExceeded: usageData.count >= config.limit
    }

  } catch (error) {
    console.error('Error checking usage limit:', error)
    // En caso de error, permitir acceso (fail-safe)
    return {
      currentUsage: 0,
      limit: config.limit,
      remaining: config.limit,
      resetDate,
      isExceeded: false
    }
  }
}

// Incrementar contador de uso
export async function incrementUsage(
  request: NextRequest,
  userType: 'guest' | 'free' | 'premium' = 'guest',
  userId?: string
): Promise<void> {
  const config = USAGE_LIMITS[userType]

  // No incrementar para usuarios premium
  if (config.limit === Infinity) {
    return
  }

  try {
    if (userId && userType !== 'guest') {
      // Incrementar en base de datos para usuarios logueados
      await prisma.userUsage.upsert({
        where: { userId },
        update: {
          weeklyCount: {
            increment: 1
          }
        },
        create: {
          userId,
          weeklyCount: 1,
          resetAt: getResetDate('weekly')
        }
      })
    } else {
      // Incrementar para usuarios no logueados (usando IP)
      await incrementGuestUsage(request.ip || 'unknown')
    }
  } catch (error) {
    console.error('Error incrementing usage:', error)
    // No fallar si no se puede incrementar
  }
}

// Sistema básico para usuarios no logueados (en producción usar Redis)
interface GuestUsage {
  count: number
  lastReset: string
}

const guestUsageMap = new Map<string, GuestUsage>()

async function getGuestUsage(ip: string): Promise<GuestUsage> {
  const key = `guest_${ip}`
  const now = new Date()
  const resetDate = getResetDate('weekly')

  let usage = guestUsageMap.get(key)

  // Resetear si es necesario
  if (!usage || new Date(usage.lastReset) > resetDate) {
    usage = { count: 0, lastReset: now.toISOString() }
    guestUsageMap.set(key, usage)
  }

  return usage
}

async function incrementGuestUsage(ip: string): Promise<void> {
  const key = `guest_${ip}`
  const usage = await getGuestUsage(ip)

  usage.count++
  guestUsageMap.set(key, usage)
}

// Middleware para proteger rutas con límite de uso
export function createUsageLimitMiddleware(userType: 'guest' | 'free' | 'premium' = 'guest') {
  return async function(request: NextRequest) {
    const usage = await checkUsageLimit(request, userType)

    if (usage.isExceeded) {
      return NextResponse.json(
        {
          error: 'Límite de uso excedido',
          message: `Has alcanzado tu límite de ${usage.limit} usos por semana.`,
          resetDate: usage.resetDate,
          currentUsage: usage.currentUsage,
          limit: usage.limit
        },
        { status: 429 }
      )
    }

    // Continuar con la solicitud
    return null
  }
}

// Obtener estadísticas de uso para el dashboard
export async function getUserUsageStats(userId: string): Promise<UsageStats> {
  try {
    const usage = await prisma.userUsage.findUnique({
      where: { userId }
    })

    if (!usage) {
      const resetDate = getResetDate('weekly')
      return {
        currentUsage: 0,
        limit: USAGE_LIMITS.free.limit,
        remaining: USAGE_LIMITS.free.limit,
        resetDate,
        isExceeded: false
      }
    }

    const config = USAGE_LIMITS.free // Asumimos free por defecto, ajustar según tipo de usuario
    const resetDate = getResetDate(config.period)

    // Resetear si es necesario
    if (usage.resetAt <= new Date()) {
      await prisma.userUsage.update({
        where: { userId },
        data: {
          weeklyCount: 0,
          resetAt: resetDate
        }
      })

      return {
        currentUsage: 0,
        limit: config.limit,
        remaining: config.limit,
        resetDate,
        isExceeded: false
      }
    }

    const currentUsage = usage.weeklyCount
    const remaining = Math.max(0, config.limit - currentUsage)

    return {
      currentUsage,
      limit: config.limit,
      remaining,
      resetDate: usage.resetAt,
      isExceeded: currentUsage >= config.limit
    }

  } catch (error) {
    console.error('Error getting user usage stats:', error)
    throw error
  }
}