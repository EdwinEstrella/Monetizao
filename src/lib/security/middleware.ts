import { NextRequest, NextResponse } from 'next/server'

interface SecurityCheck {
  allowed: boolean
  reason?: string
  riskScore: number
  threats: string[]
}

interface DeviceFingerprint {
  userAgent: string
  acceptLanguage: string
  acceptEncoding: string
  ip: string
  timezone: string
  screenResolution?: string
  colorDepth?: number
  hardwareConcurrency?: number
  deviceMemory?: number
  platform?: string
}

export class SecurityMiddleware {
  private static readonly suspiciousIPs = new Set<string>()
  private static readonly rateLimitMap = new Map<string, { count: number; resetTime: number }>()
  private static readonly deviceFingerprints = new Map<string, { userId?: string; lastSeen: number }>()

  // Generar fingerprint del dispositivo (compatible con Edge Runtime)
  static generateDeviceFingerprint(request: NextRequest): string {
    const userAgent = request.headers.get('user-agent') || ''
    const acceptLanguage = request.headers.get('accept-language') || ''
    const acceptEncoding = request.headers.get('accept-encoding') || ''
    const ip = this.getClientIP(request)

    const fingerprintData = `${userAgent}|${acceptLanguage}|${acceptEncoding}|${ip}`

    // Usar fallback síncrono simple compatible con Edge Runtime
    return this.fingerprintFallback(fingerprintData)
  }

  // Función de hashing asíncrona (para uso futuro si se necesita)
  static async hashStringAsync(str: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  // Función de hashing compatible con Edge Runtime
  private static async hashString(str: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  // Función síncrona para fingerprint (fallback simple)
  static fingerprintFallback(str: string): string {
    // Simple hash function compatible con Edge Runtime
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(32, '0')
  }

  // Obtener IP real del cliente (considerando proxies)
  static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const clientIP = request.ip || request.headers.get('x-client-ip')

    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    if (realIP) {
      return realIP
    }
    if (clientIP) {
      return clientIP
    }

    // Fallback a IP de conexión
    return request.nextUrl.hostname || 'unknown'
  }

  // Verificar si es un bot basado en User-Agent y patrones
  static detectBot(request: NextRequest): { isBot: boolean; botType?: string } {
    const userAgent = request.headers.get('user-agent') || ''

    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
      /go-http/,
      /postman/i,
      /insomnia/i,
      /httpie/i,
      /axios/i,
      /fetch/i,
      /node/i,
      /ruby/i,
      /php/i,
      /perl/i,
      /ua_debug/i,
      /monitor/i,
      /headless/i,
      /phantom/i,
      /selenium/i,
      /playwright/i,
      /puppeteer/i
    ]

    for (const pattern of botPatterns) {
      if (pattern.test(userAgent)) {
        return {
          isBot: true,
          botType: pattern.toString().replace(/[\/\\]/gi, '').replace(/i/g, '').replace(/\^|\$/g, '')
        }
      }
    }

    // Verificar headers sospechosos
    const suspiciousHeaders = [
      'x-amzn-trace-id',  // AWS Lambda
      'x-cloud-trace-context', // Google Cloud
      'cf-ray', // Cloudflare
      'x-vercel-id', // Vercel
    ]

    const hasSuspiciousHeaders = suspiciousHeaders.some(header =>
      request.headers.get(header) !== null
    )

    if (hasSuspiciousHeaders && userAgent.length < 20) {
      return { isBot: true, botType: 'cloud_service' }
    }

    return { isBot: false }
  }

  // Verificar límite de tasa por IP
  static checkRateLimit(request: NextRequest, maxRequests: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
    const ip = this.getClientIP(request)
    const now = Date.now()

    const existing = this.rateLimitMap.get(ip)

    if (!existing || now > existing.resetTime) {
      this.rateLimitMap.set(ip, {
        count: 1,
        resetTime: now + windowMs
      })
      return true
    }

    if (existing.count >= maxRequests) {
      return false
    }

    existing.count++
    return true
  }

  // Verificar IP sospechosa (ajustado para desarrollo)
  static checkSuspiciousIP(ip: string): boolean {
    // Patrones de IPs legítimas (no sospechosas)
    const legitimatePatterns = [
      /^127\./,    // IPv4 localhost
      /^::1$/,     // IPv6 localhost
      /^10\./,     // Private networks (comunes en desarrollo)
      /^192\.168\./, // Private networks (casas, oficinas)
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // Private networks
      /^169\.254\./, // Link-local (development)
      /^fc00:/,   // IPv6 private
      /^fe80:/,   // IPv6 link-local
    ]

    const isLegitimate = legitimatePatterns.some(pattern => pattern.test(ip))

    // Si es IP legítima (local/desarrollo), no es sospechosa
    if (isLegitimate) {
      return false
    }

    // Solo verificar seguridad para IPs públicas
    const suspiciousPublicPatterns = [
      /^0\./,      // Reserved
    ]

    const isReserved = suspiciousPublicPatterns.some(pattern => pattern.test(ip))

    // Verificar si está en la lista negra (solo para IPs públicas)
    const isBlacklisted = this.suspiciousIPs.has(ip)

    // Verificar geolocalización (ejemplo: bloquear redes Tor conocidas)
    const isKnownTorExit = this.checkTorExitNode(ip)

    return isReserved || isBlacklisted || isKnownTorExit
  }

  // Verificar nodos de salida Tor (simplificado)
  private static checkTorExitNode(ip: string): boolean {
    // En una implementación real, esto consultaría una lista actualizada de nodos Tor
    return false
  }

  // Validar referer para CSRF
  static validateReferer(request: NextRequest): boolean {
    const referer = request.headers.get('referer')
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')

    if (!referer && !origin) {
      return true // Permitir requests directos (API calls)
    }

    const refererURL = referer ? new URL(referer) : null
    const originURL = origin ? new URL(origin) : null

    if (refererURL && !refererURL.hostname.includes(host || '')) {
      return false
    }

    if (originURL && !originURL.hostname.includes(host || '')) {
      return false
    }

    return true
  }

  // Score de riesgo (0-100, más alto es más riesgoso)
  static calculateRiskScore(request: NextRequest): number {
    let score = 0

    // Detección de bots (+30)
    const { isBot } = this.detectBot(request)
    if (isBot) score += 30

    // IP sospechosa (+25)
    const ip = this.getClientIP(request)
    if (this.checkSuspiciousIP(ip)) score += 25

    // Sin headers necesarios (+15)
    const userAgent = request.headers.get('user-agent')
    const acceptLanguage = request.headers.get('accept-language')
    if (!userAgent || !acceptLanguage) score += 15

    // User-Agent muy corto o genérico (+10)
    if (userAgent && userAgent.length < 20) score += 10

    // Request velocity (+20)
    if (!this.checkRateLimit(request, 50, 60000)) score += 20

    return Math.min(score, 100)
  }

  // Verificación de seguridad completa
  static async performSecurityCheck(request: NextRequest): Promise<SecurityCheck> {
    const threats: string[] = []
    let allowed = true

    // 1. Detección de bots
    const { isBot, botType } = this.detectBot(request)
    if (isBot) {
      threats.push(`Bot detectado: ${botType}`)
      // Permitir algunos bots (como Google), pero marcarlos
      if (botType === 'googlebot' || botType === 'bingbot') {
        // Permitir bots de motores de búsqueda
      } else {
        allowed = false
      }
    }

    // 2. Verificación de IP
    const ip = this.getClientIP(request)
    if (this.checkSuspiciousIP(ip)) {
      threats.push(`IP sospechosa: ${ip}`)
      allowed = false
    }

    // 3. Rate limiting
    if (!this.checkRateLimit(request)) {
      threats.push('Límite de tasa excedido')
      allowed = false
    }

    // 4. Validación de referer (solo para requests que no sean API)
    if (request.nextUrl.pathname.startsWith('/api/') && !this.validateReferer(request)) {
      threats.push('Referer inválido (posible CSRF)')
      allowed = false
    }

    // 5. Calcular score de riesgo
    const riskScore = this.calculateRiskScore(request)

    // 6. Bloquear si el score de riesgo es muy alto (>80)
    if (riskScore > 80) {
      threats.push(`Score de riesgo muy alto: ${riskScore}`)
      allowed = false
    }

    const reason = threats.length > 0 ? threats.join('; ') : undefined

    return {
      allowed,
      reason,
      riskScore,
      threats
    }
  }

  // Registrar fingerprint de dispositivo
  static registerDeviceFingerprint(fingerprint: string, userId?: string): void {
    this.deviceFingerprints.set(fingerprint, {
      userId,
      lastSeen: Date.now()
    })
  }

  // Verificar si un dispositivo ya está registrado
  static getDeviceFingerprint(fingerprint: string): { userId?: string; lastSeen: number } | undefined {
    return this.deviceFingerprints.get(fingerprint)
  }

  // Limpiar datos antiguos (ejecutar periódicamente)
  static cleanup(): void {
    const now = Date.now()
    const oneWeek = 7 * 24 * 60 * 60 * 1000

    // Limpiar fingerprints antiguos
    for (const [key, value] of this.deviceFingerprints.entries()) {
      if (now - value.lastSeen > oneWeek) {
        this.deviceFingerprints.delete(key)
      }
    }

    // Limpiar rate limits expirados
    for (const [key, value] of this.rateLimitMap.entries()) {
      if (now > value.resetTime) {
        this.rateLimitMap.delete(key)
      }
    }
  }

  // Agregar IP a lista negra
  static blacklistIP(ip: string): void {
    this.suspiciousIPs.add(ip)
  }

  // Remover IP de lista negra
  static whitelistIP(ip: string): void {
    this.suspiciousIPs.delete(ip)
  }
}

// Ejecutar limpieza periódicamente
if (typeof window === 'undefined') {
  // Solo en el servidor
  setInterval(() => {
    SecurityMiddleware.cleanup()
  }, 60 * 60 * 1000) // Cada hora
}