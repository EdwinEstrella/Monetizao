'use client'

import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

interface SuspenseBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SuspenseBoundary({
  children,
  fallback = (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Cargando...</span>
    </div>
  )
}: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}