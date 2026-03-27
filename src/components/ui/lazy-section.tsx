'use client'

import { useEffect, useRef, useState } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
}

export function LazySection({
  children,
  fallback = <div className="animate-pulse bg-muted h-64 rounded-lg" />,
  rootMargin = '200px',
  threshold = 0.1
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, isMounted])

  // Evitar problemas de hidratación mostrando el contenido inmediatamente en el servidor
  if (!isMounted) {
    return <div ref={ref}>{children}</div>
  }

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}