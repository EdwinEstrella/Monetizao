'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CookieBanner = dynamic(() => import('./cookie-banner').then(mod => mod.CookieBanner), {
  ssr: false,
  loading: () => null
})

export default function CookieBannerWrapper(props: any) {
  return (
    <Suspense fallback={null}>
      <CookieBanner {...props} />
    </Suspense>
  )
}