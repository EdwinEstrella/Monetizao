/**
 * Optimized StatCard component for dashboard stats
 * Uses React.memo to prevent unnecessary re-renders
 */

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  icon: LucideIcon
  value: string | number
  subContent?: React.ReactNode
  description?: string
}

// Optimize with React.memo for dashboard stats
export const StatCard = memo(function StatCard({
  title,
  icon: Icon,
  value,
  subContent,
  description
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subContent && <div className="mt-2">{subContent}</div>}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for stat cards
  return (
    prevProps.title === nextProps.title &&
    prevProps.value === nextProps.value &&
    prevProps.description === nextProps.description
  )
})

export default StatCard
