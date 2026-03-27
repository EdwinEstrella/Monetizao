'use client'

import { useState, useEffect, memo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X, Cookie, Shield, Eye, ChevronDown, ChevronUp } from 'lucide-react'

// Type declarations for Google Analytics and AdSense
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    adsbygoogle: any[]
    gaLoaded: boolean
    adsLoaded: boolean
  }
}

interface CookieBannerProps {
  onAccept?: () => void
  onReject?: () => void
  onCustomize?: () => void
}

// Google Analytics Loader - Optimized for better performance
const loadGoogleAnalytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  if (!GA_ID) {
    console.log('Google Analytics: ID no configurado en variables de entorno')
    return
  }

  if (typeof window !== 'undefined' && !window.gaLoaded) {
    window.gaLoaded = true
    window.dataLayer = window.dataLayer || []

    // Use requestIdleCallback for better performance
    const loadScript = () => {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

      script.onload = () => {
        window.gtag = function() { window.dataLayer.push(arguments) }
        window.gtag('js', new Date())
        window.gtag('config', GA_ID, {
          anonymize_ip: true,
          cookie_domain: 'none', // Use first-party only
          page_title: document.title,
          page_location: window.location.href,
          cookie_flags: 'SameSite=None;Secure' // Security improvements
        })
        console.log('✅ Google Analytics cargado correctamente')
      }

      script.onerror = () => {
        console.error('❌ Error al cargar Google Analytics')
      }

      document.head.appendChild(script)
    }

    // Use requestIdleCallback if available, otherwise load immediately
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadScript, { timeout: 2000 })
    } else {
      loadScript()
    }
  }
}

// Google AdSense Loader
const loadGoogleAdSense = () => {
  console.log('AdSense ya está configurado en layout.tsx')
  // AdSense ya se carga automáticamente desde layout.tsx
  return
}

export const CookieBanner = memo(function CookieBanner({ 
  onAccept, 
  onReject, 
  onCustomize 
}: CookieBannerProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleAccept = useCallback(() => {
    try {
      localStorage.setItem('cookie-consent', 'accepted')
      localStorage.setItem('cookie-consent-date', new Date().toISOString())
    } catch (error) {
      console.error('localStorage not available:', error)
    }
    
    setIsVisible(false)
    onAccept?.()

    // Load analytics and ads
    loadGoogleAnalytics()
    loadGoogleAdSense()

    console.log('✅ Cookies aceptadas - Analytics y Ads cargados')
  }, [onAccept])

  const handleReject = useCallback(() => {
    try {
      localStorage.setItem('cookie-consent', 'rejected')
      localStorage.setItem('cookie-consent-date', new Date().toISOString())
    } catch (error) {
      console.error('localStorage not available:', error)
    }
    
    setIsVisible(false)
    onReject?.()
    
    console.log('❌ Cookies rechazadas - Solo cookies esenciales')
  }, [onReject])

  const handleCustomize = useCallback(() => {
    setShowDetails(prev => !prev)
    onCustomize?.()
  }, [onCustomize])

  useEffect(() => {
    setIsMounted(true)
    
    try {
      const cookieConsent = localStorage.getItem('cookie-consent')
      if (!cookieConsent) {
        setIsVisible(true)
      } else {
        // Si ya aceptó, cargar scripts
        if (cookieConsent === 'accepted') {
          loadGoogleAnalytics()
          loadGoogleAdSense()
        }
      }
    } catch (error) {
      console.error('localStorage not available:', error)
      setIsVisible(true)
    }
  }, [])

  // Prevent hydration issues
  if (!isMounted) return null
  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Cookie Icon and Message */}
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                Cookies y Privacidad
                <button
                  onClick={() => setIsVisible(false)}
                  className="ml-auto p-1 rounded-full hover:bg-muted transition-colors md:hidden"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </h3>
              
              <p className="text-muted-foreground mb-3">
                Usamos cookies esenciales, de análisis y{' '}
                <strong className="text-primary">de publicidad personalizada</strong> para 
                mantener nuestro contenido gratuito.{' '}
                <a 
                  href="/cookies" 
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leer más →
                </a>
              </p>

              {showDetails && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">Cookies Esenciales</h4>
                      <p className="text-sm text-muted-foreground">
                        Necesarias para el funcionamiento del sitio. <strong>Siempre activas</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">Cookies de Análisis</h4>
                      <p className="text-sm text-muted-foreground">
                        Google Analytics para entender cómo usas el sitio y mejorarlo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Cookie className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">Cookies de Publicidad</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-primary">Google AdSense</strong> para mostrarte 
                        anuncios relevantes y financiar el contenido gratuito.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t text-sm text-muted-foreground">
                    💡 Puedes cambiar tus preferencias en cualquier momento desde el pie de página.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Button
              onClick={handleAccept}
              className="w-full"
              size="default"
            >
              ✓ Aceptar Todas
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleReject}
                className="flex-1"
                size="sm"
              >
                Rechazar
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleCustomize}
                className="flex-1 gap-1"
                size="sm"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Detalles
                  </>
                )}
              </Button>
            </div>

            {/* Close button for desktop */}
            <button
              onClick={() => setIsVisible(false)}
              className="hidden md:flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})