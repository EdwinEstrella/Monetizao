/**
 * Optimized icon loading component
 * Use dynamic imports for better tree-shaking of lucide-react icons
 * This reduces bundle size by only loading icons when they're actually needed
 */

import dynamic from 'next/dynamic'

// Dynamic icon loader with proper typing
export const createDynamicIcon = (iconName: string) => {
  return dynamic(() =>
    import('lucide-react').then((mod) => {
      const IconComponent = (mod as any)[iconName]
      if (!IconComponent) {
        console.warn(`Icon ${iconName} not found in lucide-react`)
        return () => null
      }
      return IconComponent
    }),
    {
      ssr: false, // Icons don't need SSR
      loading: () => (
        <div className="animate-pulse bg-gray-200 rounded h-4 w-4" />
      ),
    }
  )
}

// Pre-configured dynamic icons for common use cases
export const CopyIcon = dynamic(() => import('lucide-react').then(mod => mod.Copy), { ssr: false })
export const SparklesIcon = dynamic(() => import('lucide-react').then(mod => mod.Sparkles), { ssr: false })
export const DownloadIcon = dynamic(() => import('lucide-react').then(mod => mod.Download), { ssr: false })
export const HeartIcon = dynamic(() => import('lucide-react').then(mod => mod.Heart), { ssr: false })
export const AlertCircleIcon = dynamic(() => import('lucide-react').then(mod => mod.AlertCircle), { ssr: false })
export const UserIcon = dynamic(() => import('lucide-react').then(mod => mod.User), { ssr: false })
export const CrownIcon = dynamic(() => import('lucide-react').then(mod => mod.Crown), { ssr: false })
export const ZapIcon = dynamic(() => import('lucide-react').then(mod => mod.Zap), { ssr: false })
export const TrendingUpIcon = dynamic(() => import('lucide-react').then(mod => mod.TrendingUp), { ssr: false })
export const TargetIcon = dynamic(() => import('lucide-react').then(mod => mod.Target), { ssr: false })
export const BookOpenIcon = dynamic(() => import('lucide-react').then(mod => mod.BookOpen), { ssr: false })
export const ArrowRightIcon = dynamic(() => import('lucide-react').then(mod => mod.ArrowRight), { ssr: false })
export const CalendarIcon = dynamic(() => import('lucide-react').then(mod => mod.Calendar), { ssr: false })
export const ClockIcon = dynamic(() => import('lucide-react').then(mod => mod.Clock), { ssr: false })

export default createDynamicIcon