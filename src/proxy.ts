import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SecurityMiddleware } from '@/lib/security/middleware'

export async function proxy(request: NextRequest) {
  // Ignorar archivos estáticos y recursos
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/auth') || // Permitir auth endpoints sin seguridad estricta
    request.nextUrl.pathname.includes('.') || // Archivos estáticos
    request.nextUrl.pathname.startsWith('/favicon') ||
    request.nextUrl.pathname.startsWith('/robots.txt')
  ) {
    return NextResponse.next()
  }

  // Add performance and caching headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // Caching headers for static content
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Caching for API responses
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
  }

  // Caching for pages
  if (!request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/auth')) {
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  }

  // En desarrollo, ser más permisivo
  if (process.env.NODE_ENV === 'development') {
    // Solo aplicar seguridad a endpoints sensibles en desarrollo
    if (
      !request.nextUrl.pathname.startsWith('/auth') &&
      !request.nextUrl.pathname.startsWith('/api/user') &&
      !request.nextUrl.pathname.startsWith('/api/tools')
    ) {
      return NextResponse.next()
    }
  }

  // Permitir acceso al endpoint principal de tools (GET) en desarrollo
  if (
    request.nextUrl.pathname === '/api/tools' &&
    request.method === 'GET' &&
    process.env.NODE_ENV === 'development'
  ) {
    return NextResponse.next()
  }

  // Realizar verificación de seguridad
  const securityCheck = await SecurityMiddleware.performSecurityCheck(request)

  // Si no está permitido, bloquear el request
  if (!securityCheck.allowed) {
    console.warn('Request bloqueado por seguridad:', {
      ip: SecurityMiddleware.getClientIP(request),
      userAgent: request.headers.get('user-agent'),
      pathname: request.nextUrl.pathname,
      reason: securityCheck.reason,
      riskScore: securityCheck.riskScore
    })

    return new NextResponse(
      JSON.stringify({
        error: 'Access Denied',
        message: 'Your request has been blocked for security reasons',
        code: 'SECURITY_BLOCK'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'X-Reason': securityCheck.reason || 'Unknown',
          'X-Risk-Score': securityCheck.riskScore.toString()
        }
      }
    )
  }

  // Registrar fingerprint para requests de autenticación y herramientas
  if (
    request.nextUrl.pathname.startsWith('/auth') ||
    request.nextUrl.pathname.startsWith('/api/user') ||
    request.nextUrl.pathname.startsWith('/api/tools')
  ) {
    const fingerprint = SecurityMiddleware.generateDeviceFingerprint(request)
    SecurityMiddleware.registerDeviceFingerprint(fingerprint)

    // Agregar fingerprint a los headers para uso posterior
    const response = NextResponse.next()
    response.headers.set('x-device-fingerprint', fingerprint)
    return response
  }

  return NextResponse.next()
}

export const proxyConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}