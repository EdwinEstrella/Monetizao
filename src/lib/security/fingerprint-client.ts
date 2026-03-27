'use client'

interface FingerprintData {
  screenResolution: string
  colorDepth: number
  timezone: string
  language: string
  hardwareConcurrency: number
  deviceMemory: number
}

class FingerprintClient {
  private static instance: FingerprintClient
  private fingerprint: string | null = null
  private deviceData: FingerprintData | null = null

  private constructor() {}

  static getInstance(): FingerprintClient {
    if (!FingerprintClient.instance) {
      FingerprintClient.instance = new FingerprintClient()
    }
    return FingerprintClient.instance
  }

  // Generar fingerprint en el cliente
  generateClientFingerprint(): string {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'no-canvas'

    // Dibujar texto y patrón para fingerprint
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Fingerprint for security 🛡️', 2, 2)
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)

    // Obtener datos del canvas
    const canvasFingerprint = canvas.toDataURL()

    // Recopilar información del navegador
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      screen: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
    }

    // Información de hardware (si está disponible)
    const hardwareInfo = {
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory || 0,
      maxTouchPoints: navigator.maxTouchPoints || 0,
    }

    // Información de WebGL
    let webglFingerprint = 'no-webgl'
    try {
      const gl = document.createElement('canvas').getContext('webgl')
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          webglFingerprint = `${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)}|${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}`
        }
      }
    } catch (e) {
      webglFingerprint = 'webgl-error'
    }

    // Información de audio (AudioContext fingerprint)
    let audioFingerprint = 'no-audio'
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContext) {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const analyser = audioContext.createAnalyser()
        const gainNode = audioContext.createGain()
        const scriptProcessor = audioContext.createScriptProcessor(256, 1, 1)

        oscillator.connect(analyser)
        analyser.connect(scriptProcessor)
        scriptProcessor.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.start(0)

        setTimeout(() => {
          oscillator.stop()
          audioContext.close()
        }, 100)

        audioFingerprint = 'audio-available'
      }
    } catch (e) {
      audioFingerprint = 'audio-error'
    }

    // Combinar toda la información
    const fingerprintString = [
      canvasFingerprint,
      JSON.stringify(browserInfo),
      JSON.stringify(hardwareInfo),
      webglFingerprint,
      audioFingerprint,
      // Fuente system fonts
      this.getSystemFonts(),
      // Número de plugins
      navigator.plugins.length,
      // MIME types
      navigator.mimeTypes.length,
    ].join('|')

    // Generar hash
    const hash = this.simpleHash(fingerprintString)
    this.fingerprint = hash

    return hash
  }

  // Obtener fuentes del sistema (simplificado)
  private getSystemFonts(): string {
    try {
      const testString = 'mmmmmmmmmmlli'
      const testSize = '72px'
      const fontFamily = 'monospace'

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return 'no-context'

      context.font = `${testSize} ${fontFamily}`
      const baselineWidth = context.measureText(testString).width

      const fonts = [
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
        'Helvetica', 'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana'
      ]

      const detectedFonts = fonts.filter(font => {
        context.font = `${testSize} '${font}', ${fontFamily}`
        return context.measureText(testString).width !== baselineWidth
      })

      return detectedFonts.join(',')
    } catch (e) {
      return 'font-error'
    }
  }

  // Hash simple (en producción usar crypto API)
  private simpleHash(str: string): string {
    let hash = 0
    if (str.length === 0) return hash.toString()

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(16)
  }

  // Recopilar datos del dispositivo
  collectDeviceData(): FingerprintData {
    const data = {
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      hardwareConcurrency: navigator.hardwareConcurrency || 1,
      deviceMemory: (navigator as any).deviceMemory || 0,
    }

    this.deviceData = data
    return data
  }

  // Enviar fingerprint al servidor
  async sendFingerprintToServer(): Promise<{success: boolean, data?: any, error?: string}> {
    try {
      // Generar fingerprint del cliente
      const clientFingerprint = this.generateClientFingerprint()

      // Recopilar datos del dispositivo
      const deviceData = this.collectDeviceData()

      // Enviar al servidor
      const response = await fetch('/api/security/fingerprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: errorData.error || 'Error al enviar fingerprint'
        }
      }

      const result = await response.json()

      if (result.success) {
        this.fingerprint = result.data.fingerprint
        return { success: true, data: result.data }
      } else {
        return {
          success: false,
          error: result.error || 'Error desconocido'
        }
      }

    } catch (error) {
      console.error('Error sending fingerprint:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error de conexión'
      }
    }
  }

  // Obtener fingerprint actual
  getFingerprint(): string | null {
    return this.fingerprint
  }

  // Obtener datos del dispositivo
  getDeviceData(): FingerprintData | null {
    return this.deviceData
  }

  // Verificar si es incógnito (detección básica)
  isIncognito(): boolean {
    try {
      // Método 1: Verificar uso de almacenamiento
      const testKey = 'test_' + Date.now()
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)

      // Método 2: Verificar quota de almacenamiento
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then((estimate) => {
          // Los navegadores en incógnito suelen tener cuotas muy bajas
          if (estimate.quota && estimate.quota < 100000000) { // 100MB
            return true
          }
        })
      }

      return false
    } catch (e) {
      return true // Si hay error, probablemente es incógnito
    }
  }

  // Detectar si es un dispositivo móvil
  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  // Detectar si es una VPN o proxy (básico)
  detectVPN(): boolean {
    // Esto es una detección muy básica, en producción usar servicios más sofisticados
    const publicIPRanges = [
      '10.', '172.16.', '172.17.', '172.18.', '172.19.', '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.', '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.',
      '192.168.', '127.', '169.254.'
    ]

    // Esto solo funciona si tenemos la IP del cliente
    return false // Implementación requeriría obtener la IP del cliente
  }
}

export default FingerprintClient