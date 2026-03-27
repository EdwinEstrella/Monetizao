import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer7 } from '@/components/ui/footer-7'
import CookieBannerWrapper from '@/components/ui/cookie-banner-wrapper'
import SmartPopupWrapper from '@/components/ui/smart-popup-wrapper'
import AdSenseWrapper from '@/components/ui/adsense-wrapper'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://monetizao.com'),
  title: {
    default: 'Monetizao - Gana Dinero con Inteligencia Artificial',
    template: '%s | Monetizao'
  },
  description: 'Descubre cómo monetizar con IA. Estrategias probadas, herramientas lucrativas y casos de éxito para generar ingresos sustanciales usando Inteligencia Artificial.',
  keywords: ['monetizar con IA', 'ganar dinero IA', 'negocios IA', 'ChatGPT negocios', 'prompts lucrativos'],
  authors: [{ name: 'Monetizao Team' }],
  creator: 'Monetizao',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://monetizao.com',
    siteName: 'Monetizao',
    title: 'Monetizao - Gana Dinero con Inteligencia Artificial',
    description: 'Aprende a monetizar con IA. Estrategias, herramientas y casos de éxito.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monetizao - Gana Dinero con Inteligencia Artificial',
    description: 'Descubre cómo monetizar con IA. Estrategias probadas y herramientas lucrativas.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Performance optimizations - Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
      </head>
      {/* Optimize AdSense loading with defer and proper strategy */}
      <Script
        id="adsense-loader"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5431264679524719"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer7 />
          <CookieBannerWrapper />
        </div>
        <Toaster />
      </body>
    </html>
  )
}