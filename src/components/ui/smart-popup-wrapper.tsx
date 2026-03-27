'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SmartPopup = dynamic(() => import('./smart-popup').then(mod => mod.default), {
  ssr: false,
  loading: () => null
})

export default function SmartPopupWrapper() {
  return (
    <Suspense fallback={null}>
      <SmartPopup />
    </Suspense>
  )
}