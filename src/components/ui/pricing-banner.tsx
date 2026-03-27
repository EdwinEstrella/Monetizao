'use client'

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function PricingBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg p-6 text-center space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Planes de Monetizao</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="border-green-500 text-green-700 bg-white">
            Gratis
          </Badge>
          <span className="text-sm text-gray-600">5 usos diarios de herramientas</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="border-purple-500 text-purple-700 bg-white">
            Premium
          </Badge>
          <span className="text-sm text-gray-600">Uso ilimitado y herramientas avanzadas</span>
        </div>
      </div>
      <Link
        href="/premium"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
      >
        Ver planes Premium →
      </Link>
    </div>
  )
}