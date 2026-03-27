'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const AdSense = dynamic(() => import('../AdSense').then(mod => mod.default), {
  ssr: false,
  loading: () => null
})

export default function AdSenseWrapper(props: any) {
  return (
    <Suspense fallback={null}>
      <AdSense {...props} />
    </Suspense>
  )
}