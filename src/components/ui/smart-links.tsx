'use client'

import Link from 'next/link'

interface SmartLinkProps {
  children: React.ReactNode
  href?: string
  target?: string
  category?: string
  currentSlug?: string
  className?: string
}

export default function SmartLink({
  children,
  href,
  target,
  category = 'general',
  currentSlug = '',
  className = ''
}: SmartLinkProps) {

  // Sistema de backlinks inteligentes basado en contexto
  const generateSmartLink = (): string => {
    if (href) return href

    // Backlinks basados en el contenido
    const context = children?.toString().toLowerCase() || ''

    if (context.includes('prompt') || context.includes('chatgpt')) {
      return '/guias/prompts-lucrativos-generar-ingresos'
    }

    if (context.includes('consultor') || context.includes('negocio')) {
      return '/guias/consultoria-ia-cero-a-10000'
    }

    if (context.includes('automatiz') || context.includes('sistema')) {
      return '/guias/automatizacion-negocios-24-7'
    }

    if (context.includes('freelanc') || context.includes('trabaj')) {
      return '/guias/freelancer-potenciado-ia'
    }

    if (context.includes('contenido') || context.includes('viral')) {
      return '/guias/contenido-viral-con-ia'
    }

    if (context.includes('precios') || context.includes('cobrar')) {
      return '/guias/precios-premium-servicios-ia'
    }

    if (context.includes('marketing') || context.includes('venta')) {
      return '/guias/marketing-ventas-con-ia'
    }

    if (context.includes('producto') || context.includes('digital')) {
      return '/guias/productos-digitales-con-ia'
    }

    if (context.includes('e-commerc') || context.includes('tienda')) {
      return '/guias/ia-para-ecommerce-optimizacion'
    }

    // Backlinks contextual según la página actual
    if (currentSlug) {
      if (currentSlug.includes('guias/')) {
        // Si estamos en una guía, enlazar a otras guías
        const guias = [
          '/guias/prompts-lucrativos-generar-ingresos',
          '/guias/consultoria-ia-cero-a-10000',
          '/guias/automatizacion-negocios-24-7',
          '/guias/freelancer-potenciado-ia',
          '/guias/contenido-viral-con-ia'
        ]
        return guias[Math.floor(Math.random() * guias.length)]
      }

      if (currentSlug.includes('blog/')) {
        // Si estamos en un blog, enlazar a guías relacionadas
        return '/guias'
      }
    }

    // Backlinks por defecto
    const defaults = ['/blog', '/guias', '/contacto', '/sobre-nosotros']
    return defaults[Math.floor(Math.random() * defaults.length)]
  }

  const linkHref = generateSmartLink()

  if (!href && linkHref.startsWith('/')) {
    return (
      <Link
        href={linkHref}
        className={`text-blue-600 hover:text-blue-700 transition-colors ${className}`}
        title={`Aprende más sobre ${category}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href || linkHref}
      target={target}
      className={`text-blue-600 hover:text-blue-700 transition-colors ${className}`}
    >
      {children}
    </Link>
  )
}

// Componente para generar backlinks contextual en artículos
export function ContextualBacklinks({
  currentSlug,
  currentCategory
}: {
  currentSlug?: string
  currentCategory?: string
}) {
  const backlinks = [
    {
      text: "Aprende prompts lucrativos para generar ingresos",
      href: "/guias/prompts-lucrativos-generar-ingresos",
      relevance: "high"
    },
    {
      text: "Lanza tu consultoría de IA desde cero",
      href: "/guias/consultoria-ia-cero-a-10000",
      relevance: "high"
    },
    {
      text: "Automatiza tu negocio para trabajar 24/7",
      href: "/guias/automatizacion-negocios-24-7",
      relevance: "medium"
    },
    {
      text: "Multiplica tus tarifas como freelancer con IA",
      href: "/guias/freelancer-potenciado-ia",
      relevance: "medium"
    },
    {
      text: "Crea contenido viral con inteligencia artificial",
      href: "/guias/contenido-viral-con-ia",
      relevance: "medium"
    }
  ]

  // Filtrar backlinks basados en el contexto actual
  const relevantBacklinks = backlinks.filter(link => {
    if (currentSlug?.includes(link.href)) return false
    if (currentCategory && link.href.includes(currentCategory)) return true
    return link.relevance === 'high'
  }).slice(0, 3)

  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-3">
        📚 Continúa aprendiendo sobre IA:
      </h4>
      <div className="space-y-2">
        {relevantBacklinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block text-blue-700 hover:text-blue-800 text-sm transition-colors"
          >
            → {link.text}
          </Link>
        ))}
      </div>
      <Link
        href="/guias"
        className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
      >
        Ver todas las guías de IA →
      </Link>
    </div>
  )
}