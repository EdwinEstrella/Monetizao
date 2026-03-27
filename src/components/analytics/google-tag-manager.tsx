'use client'

import { useEffect } from 'react'

interface GoogleTagManagerProps {
  gtmId: string
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    if (!gtmId) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // Load GTM script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`

    script.onload = () => {
      // Push initial dataLayer event
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount if needed
      const existingScript = document.querySelector(`script[src*="gtm.js?id=${gtmId}"]`)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [gtmId])

  return null
}