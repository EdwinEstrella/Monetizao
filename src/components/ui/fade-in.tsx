'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
}

// Optimize with React.memo to prevent unnecessary re-renders since this is used frequently
const FadeIn = memo(function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  direction = 'up'
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'

    const baseClass = `transition-all ease-out opacity-100`

    switch (direction) {
      case 'up':
        return `${baseClass} transform translate-y-0`
      case 'down':
        return `${baseClass} transform translate-y-0`
      case 'left':
        return `${baseClass} transform translate-x-0`
      case 'right':
        return `${baseClass} transform translate-x-0`
      case 'scale':
        return `${baseClass} transform scale-100`
      case 'fade':
      default:
        return `${baseClass}`
    }
  }

  const getInitialClass = () => {
    if (isVisible) return ''

    switch (direction) {
      case 'up':
        return 'translate-y-8 opacity-0'
      case 'down':
        return '-translate-y-8 opacity-0'
      case 'left':
        return 'translate-x-8 opacity-0'
      case 'right':
        return '-translate-x-8 opacity-0'
      case 'scale':
        return 'scale-95 opacity-0'
      case 'fade':
      default:
        return 'opacity-0'
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        getInitialClass(),
        getAnimationClass(),
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
})

export default FadeIn