export interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  readTime: number
  image?: string
}

export interface PostWithContent extends Post {
  content: string
}

// Datos estáticos de posts para uso del lado del cliente
export const postsData: Post[] = [
  {
    slug: 'chatgpt-freelancers-ganar-dinero',
    title: 'ChatGPT para Freelancers: Cómo Multiplicar Tus Ingresos en 30 Días',
    description: 'Aprende a usar ChatGPT para aumentar tu productividad 10x, conseguir más clientes y generar hasta $10,000 mensuales como freelancer.',
    date: '2024-10-21',
    author: 'Equipo Monetizao',
    category: 'ChatGPT para Negocios',
    tags: ['ChatGPT', 'Freelance', 'Productividad'],
    featured: true,
    readTime: 12,
    image: '/images/chatgpt-freelance.jpg'
  },
  {
    slug: 'trading-ia-inversiones-automatizadas',
    title: 'Trading con IA: Cómo Crear un Sistema de Inversiones Automatizado',
    description: 'Descubre cómo implementar algoritmos de trading con inteligencia artificial para generar ingresos pasivos en los mercados financieros.',
    date: '2024-10-20',
    author: 'Equipo Monetizao',
    category: 'Finanzas e Inversión',
    tags: ['Trading', 'Inversiones', 'Automatización'],
    featured: true,
    readTime: 15,
    image: '/images/trading-ia.jpg'
  },
  {
    slug: 'prompts-lucrativos-1000-dolares',
    title: '100 Prompts Lucrativos que Pueden Generarte $1000+ Este Mes',
    description: 'Colección definitiva de prompts probados para generar ingresos sustanciales usando ChatGPT y otras herramientas de IA.',
    date: '2024-10-19',
    author: 'Equipo Monetizao',
    category: 'Prompts y Plantillas',
    tags: ['Prompts', 'ChatGPT', 'Ingresos'],
    featured: true,
    readTime: 8,
    image: '/images/prompts-lucrativos.jpg'
  },
  {
    slug: 'automatizacion-negocios-ia-24-7',
    title: 'Automatización de Negocios con IA: Cómo Crear Ingresos 24/7',
    description: 'Implementa sistemas automatizados impulsados por IA que generan ingresos mientras duermes. Guía completa para principiantes.',
    date: '2024-10-18',
    author: 'Equipo Monetizao',
    category: 'Automatización y Sistemas',
    tags: ['Automatización', 'Negocios', 'IA'],
    featured: false,
    readTime: 10,
    image: '/images/automatizacion-ia.jpg'
  },
  {
    slug: 'consultoria-ia-6-figuras',
    title: 'Consultoría de IA: Cómo Construir un Negocio de 6 Figuras',
    description: 'Guía paso a paso para establecer una consultora de IA rentable y conseguir clientes de alto valor.',
    date: '2024-10-17',
    author: 'Equipo Monetizao',
    category: 'Consultoría y Servicios',
    tags: ['Consultoría', 'IA', 'Negocios'],
    featured: false,
    readTime: 14,
    image: '/images/consultoria-ia.jpg'
  },
  {
    slug: 'ecommerce-ia-negocio-escalable',
    title: 'E-commerce con IA: Cómo Crear un Negocio Escalable',
    description: 'Utiliza la inteligencia artificial para optimizar cada aspecto de tu tienda online y multiplicar tus ventas.',
    date: '2024-10-16',
    author: 'Equipo Monetizao',
    category: 'E-commerce y Negocios Online',
    tags: ['E-commerce', 'IA', 'Ventas'],
    featured: false,
    readTime: 11,
    image: '/images/ecommerce-ia.jpg'
  },
  {
    slug: 'servicios-ia-flexible-2024',
    title: 'Servicios de IA: El Negocio Más Flexible del 2024',
    description: 'Ofrece servicios de alto valor usando IA y trabaja desde cualquier parte del mundo con márgenes de profit del 80%+.',
    date: '2024-10-15',
    author: 'Equipo Monetizao',
    category: 'Servicios y Freelance',
    tags: ['Servicios', 'IA', 'Freelance'],
    featured: false,
    readTime: 9,
    image: '/images/servicios-ia.jpg'
  },
  {
    slug: 'content-creation-imperio-contenido',
    title: 'Content Creation con IA: Cómo Construir tu Imperio del Contenido',
    description: 'Sistematiza la creación de contenido a escala con IA y domina múltiples plataformas simultáneamente.',
    date: '2024-10-14',
    author: 'Equipo Monetizao',
    category: 'Content Creation',
    tags: ['Content', 'IA', 'Estrategia'],
    featured: false,
    readTime: 13,
    image: '/images/content-creation.jpg'
  },
  {
    slug: 'copywriting-conversiones-magia',
    title: 'Copywriting con IA: Textos que Convierten como Magia',
    description: 'Domina el arte del copywriting potenciado por IA para crear textos que venden solos y maximizan conversiones.',
    date: '2024-10-13',
    author: 'Equipo Monetizao',
    category: 'Marketing y Ventas',
    tags: ['Copywriting', 'Conversiones', 'IA'],
    featured: false,
    readTime: 7,
    image: '/images/copywriting-ia.jpg'
  },
  {
    slug: 'midjourney-negocios-5000-dolares',
    title: 'Midjourney para Negocios: Cómo Ganar $5000 con Arte Digital',
    description: 'Transforma tu creatividad en un negocio rentable usando Midjourney y estrategias de marketing digital.',
    date: '2024-10-12',
    author: 'Equipo Monetizao',
    category: 'IA Visual y Creativa',
    tags: ['Midjourney', 'Arte', 'Negocios'],
    featured: false,
    readTime: 6,
    image: '/images/midjourney-negocios.jpg'
  },
  {
    slug: 'ejemplo-practico-monetizacion-30-dias',
    title: 'Ejemplo Práctico: Monetización con IA en 30 Días',
    description: 'Caso de estudio real: Cómo pasar de $0 a $5000 mensuales usando estrategias de monetización con IA.',
    date: '2024-10-11',
    author: 'Equipo Monetizao',
    category: 'Ejemplo',
    tags: ['Ejemplo', 'Caso', 'Estrategia'],
    featured: false,
    readTime: 16,
    image: '/images/ejemplo-monetizacion.jpg'
  }
]

export function getAllPosts(): Post[] {
  return postsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const post = postsData.find(p => p.slug === slug)
  if (!post) return null

  // Para el contenido dinámico, necesitamos usar el componente específico
  // Esto se manejará en el BlogPostClient
  return {
    ...post,
    content: ''
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map(post => post.category))
  return Array.from(categories)
}