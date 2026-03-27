/**
 * Optimized ToolCard component for dashboard
 * Uses React.memo to prevent unnecessary re-renders
 */

import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Clock, Cpu } from 'lucide-react'
import Link from 'next/link'

interface Tool {
  name: string
  slug: string
  icon: any
  category: string
  isPremium: boolean
  color: string
}

interface ToolCardProps {
  tool: Tool
  isLocked: boolean
  isDailyLimitReached: boolean
  hasActiveSubscription: boolean
}

// Optimize with React.memo and custom comparison to prevent unnecessary re-renders
export const ToolCard = memo(function ToolCard({
  tool,
  isLocked,
  isDailyLimitReached,
  hasActiveSubscription
}: ToolCardProps) {
  return (
    <Card className={`relative ${isLocked || isDailyLimitReached ? 'opacity-60' : ''}`}>
      {isLocked && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">Premium</Badge>
        </div>
      )}
      {isDailyLimitReached && (
        <div className="absolute top-2 right-2">
          <Badge variant="destructive">Límite alcanzado</Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10`}>
            <tool.icon className={`h-6 w-6 ${tool.color.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <CardTitle className="text-lg">{tool.name}</CardTitle>
            <CardDescription>{tool.category}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          variant={isLocked || isDailyLimitReached ? "outline" : "default"}
          disabled={isLocked || isDailyLimitReached}
          asChild={!isLocked && !isDailyLimitReached}
        >
          {isLocked ? (
            <Link href="/dashboard/settings">
              <ExternalLink className="h-4 w-4 mr-2" />
              Actualizar a Premium
            </Link>
          ) : isDailyLimitReached ? (
            <span>
              <Clock className="h-4 w-4 mr-2" />
              Límite diario alcanzado
            </span>
          ) : (
            <Link href={`/herramientas/${tool.slug}`}>
              <Cpu className="h-4 w-4 mr-2" />
              Usar Herramienta
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function for more precise memoization
  return (
    prevProps.tool.slug === nextProps.tool.slug &&
    prevProps.isLocked === nextProps.isLocked &&
    prevProps.isDailyLimitReached === nextProps.isDailyLimitReached &&
    prevProps.hasActiveSubscription === nextProps.hasActiveSubscription
  )
})

export default ToolCard
