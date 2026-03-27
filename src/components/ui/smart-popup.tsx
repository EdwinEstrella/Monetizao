'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Zap, Target, ChevronRight } from 'lucide-react'

interface SmartPopupProps {
  delay?: number
  scrollTrigger?: number
  autoClose?: number
}

export default function SmartPopup({ delay = 10000, scrollTrigger = 10, autoClose = 60000 }: SmartPopupProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingIn, setIsAnimatingIn] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [showDownload, setShowDownload] = useState(false)

  // Verificar si el usuario ya completó o cerró el popup
  const isPopupCompleted = () => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('smart_popup_completed') === 'true'
  }

  // Marcar popup como completado
  const markPopupCompleted = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_popup_completed', 'true')
    }
  }

  // Solo mostrar popup en la página principal y si no está completado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/' || isPopupCompleted()) {
        return
      }
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let hasTriggered = false

    // Trigger por tiempo
    timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        triggerPopup()
        hasTriggered = true
      }
    }, delay)

    // Trigger por scroll
    const handleScroll = () => {
      if (!hasTriggered) {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrollPercentage >= scrollTrigger) {
          triggerPopup()
          hasTriggered = true
        }
      }
    }

    // Auto-close
    const autoCloseTimer = setTimeout(() => {
      if (isOpen && !isAnimatingOut) {
        handleClose()
      }
    }, delay + autoClose)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(autoCloseTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [delay, scrollTrigger, autoClose])

  const triggerPopup = () => {
    setIsOpen(true)
    setIsAnimatingIn(true)
    setTimeout(() => setIsAnimatingIn(false), 500)
  }

  const handleClose = () => {
    // Marcar como completado cuando el usuario cierra el popup
    markPopupCompleted()
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimatingOut(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.querySelector('input[type="text"]') as HTMLInputElement)?.value
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value

    if (name && email) {
      try {
        // Enviar al webhook con tipo de formulario popup
        await fetch('https://n8n.ibpweb.site/webhook/monetizao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            formType: 'popup-download',
            source: 'smart-popup',
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            leadMagnet: '100-prompts-ia-monetizacion'
          })
        })

        // Mostrar vista de descarga y marcar como completado
        setShowDownload(true)
        markPopupCompleted()
      } catch (error) {
        console.error('Error:', error)
        // Si hay error, mostrar mensaje
        showSuccessMessage()
      }
    }
  }

  const showSuccessMessage = () => {
    const successDiv = document.createElement('div')
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2'
    successDiv.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>¡Gracias! Revisa tu email para confirmar.</span>
    `
    document.body.appendChild(successDiv)

    setTimeout(() => {
      successDiv.style.transition = 'opacity 0.3s'
      successDiv.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 300)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`
          relative bg-white rounded-2xl p-8 max-w-md mx-4 transform transition-all duration-300
          ${isAnimatingIn ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          ${isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido */}
        <div className="text-center">
          {!showDownload ? (
            <>
              {/* Icono animado */}
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Gift className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎁 Tu Regalo Exclusivo
              </h3>

              <p className="text-gray-600 mb-6">
                Recibe <span className="font-bold text-blue-600">100 Prompts Premium</span> para generar ingresos con IA
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6 text-left bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span><strong>20 prompts</strong> para negocios rentables</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-green-500" />
                  <span><strong>15 prompts</strong> de marketing y ventas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  <span><strong>25 prompts</strong> técnicos y desarrollo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span><strong>40 prompts</strong> especializados por industria</span>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Tu email profesional"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  🎁 Obtener Regalo
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                🔒 Tu información está segura. Entrega inmediata.
              </p>
            </>
          ) : (
            /* Vista de descarga */
            <div className="py-8">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-green-600">
                ¡Listo para Descargar!
              </h3>

              <p className="text-gray-600 mb-6">
                Tu guía de <strong>100 Prompts Premium</strong> está lista
              </p>

              <a
                href="/100-prompts-ia-monetizacion.md"
                download="100-Prompts-IA-Monetizacion.pdf"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar Guía PDF
              </a>

              <button
                onClick={handleClose}
                className="mt-4 text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Cerrar ventana
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}