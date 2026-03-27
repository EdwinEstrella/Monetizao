'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Users, TrendingUp, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const guides = [
  {
    title: "Guía Maestra: Prompts Lucrativos para Generar Ingresos",
    description: "Domina el arte de crear prompts que generan ingresos reales. Aprende técnicas avanzadas para ChatGPT, Claude, Midjourney y otras herramientas de IA que te pagan por usarlas.",
    category: "Prompts",
    duration: "25 min",
    level: "Principiante",
    popularity: "Popular",
    icon: Target,
    featured: true,
    rating: 4.9,
    students: 15420,
    slug: "prompts-lucrativos-generar-ingresos"
  },
  {
    title: "Consultoría de IA: De Cero a $10,000/mes",
    description: "Sistema completo para lanzar tu negocio de consultoría con IA. Encuentra clientes, fija precios premium y entrega resultados extraordinarios usando inteligencia artificial.",
    category: "Negocio",
    duration: "35 min",
    level: "Intermedio",
    popularity: "Trending",
    icon: TrendingUp,
    featured: true,
    rating: 4.8,
    students: 8930,
    slug: "consultoria-ia-cero-a-10000"
  },
  {
    title: "Automatización Inteligente: Negocios 24/7 con IA",
    description: "Crea sistemas automatizados que generan ingresos mientras duermes. Aprende a construir chatbots, flujos de marketing autónomo y servicios siempre activos.",
    category: "Automatización",
    duration: "40 min",
    level: "Avanzado",
    popularity: "Nuevo",
    icon: Zap,
    featured: true,
    rating: 4.7,
    students: 5680,
    slug: "automatizacion-negocios-24-7"
  },
  {
    title: "Freelancer Potenciado por IA: Multiplica x5 tus Tarifas",
    description: "Transforma tu carrera de freelancer usando IA. Aprende a entregar proyectos más rápidos, con mayor calidad y cobrar hasta 5 veces más por tu trabajo.",
    category: "Freelancing",
    duration: "30 min",
    level: "Principiante",
    popularity: "Popular",
    icon: Users,
    featured: true,
    rating: 4.9,
    students: 12150,
    slug: "freelancer-potenciado-ia"
  },
  {
    title: "Creación de Contenido Viral con IA",
    description: "Produce contenido masivo que enamora audiencias y genera ingresos. Blogs, videos, podcasts y posts optimizados con IA para maximizar engagement y monetización.",
    category: "Contenido",
    duration: "28 min",
    level: "Intermedio",
    popularity: "Trending",
    icon: BookOpen,
    featured: true,
    rating: 4.6,
    students: 9870,
    slug: "contenido-viral-con-ia"
  },
  {
    title: "Precios Premium para Servicios de IA",
    description: "Deja de cobrar poco. Aprende estrategias de pricing que te permiten cobrar 3-10 veces más por servicios de IA. Posicionamiento, valor y estructura de precios.",
    category: "Estrategia",
    duration: "22 min",
    level: "Intermedio",
    popularity: "Popular",
    icon: Target,
    featured: true,
    rating: 4.8,
    students: 7340,
    slug: "precios-premium-servicios-ia"
  },
  {
    title: "Marketing y Ventas con IA: Adquisición Automatizada",
    description: "Atrae clientes constantemente usando IA para marketing, ventas y seguimiento. Construye una máquina de ventas que nunca descansa.",
    category: "Marketing",
    duration: "32 min",
    level: "Intermedio",
    popularity: "Nuevo",
    icon: TrendingUp,
    featured: true,
    rating: 4.7,
    students: 6230,
    slug: "marketing-ventas-con-ia"
  },
  {
    title: "Desarrollo de Productos Digitales con IA",
    description: "Crea y lanza productos digitales exitosos usando IA. Cursos, ebooks, software, plantillas y más. Del concepto a clientes pagando en semanas.",
    category: "Productos",
    duration: "45 min",
    level: "Avanzado",
    popularity: "Trending",
    icon: BookOpen,
    featured: true,
    rating: 4.5,
    students: 4560,
    slug: "productos-digitales-con-ia"
  },
  {
    title: "IA para E-commerce: Optimización y Escalabilidad",
    description: "Transforma tu tienda online con IA. Optimización de precios, recomendaciones personalizadas, atención al cliente automatizada y estrategias de crecimiento.",
    category: "E-commerce",
    duration: "38 min",
    level: "Avanzado",
    popularity: "Nuevo",
    icon: Zap,
    featured: true,
    rating: 4.6,
    students: 3890,
    slug: "ia-para-ecommerce-optimizacion"
  }
]

const categories = ["Todas", "Prompts", "Negocio", "Automatización", "Freelancing", "Contenido", "Estrategia", "Marketing", "Productos", "E-commerce"]
const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"]

interface FormData {
  name: string
  email: string
  interest: string
  message: string
}

interface RecommendedArticle {
  title: string
  slug: string
  excerpt: string
}

export default function GuiasPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recommendedArticle, setRecommendedArticle] = useState<RecommendedArticle | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedLevel, setSelectedLevel] = useState("Todos")

  useEffect(() => {
    // Initialize form handler
    const form = document.getElementById('guides-contact-form') as HTMLFormElement
    if (form) {
      form.addEventListener('submit', handleFormSubmit)
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmit)
      }
    }
  }, [])

  const filteredGuides = guides.filter(guide => {
    const categoryMatch = selectedCategory === "Todas" || guide.category === selectedCategory
    const levelMatch = selectedLevel === "Todos" || guide.level === selectedLevel
    return categoryMatch && levelMatch
  })

  const getRandomArticle = (): RecommendedArticle => {
    const articles = [
      {
        title: "10 Prompts que Generan $100+ al Día",
        slug: "prompts-generan-100-dia",
        excerpt: "Descubre los prompts más rentables que están funcionando actualmente en el mercado."
      },
      {
        title: "Cómo Lanzar tu Consultoría de IA en 30 Días",
        slug: "lanzar-consultoria-ia-30-dias",
        excerpt: "Guía paso a paso para establecer tu negocio de consultoría desde cero."
      },
      {
        title: "Automatización ChatGPT: Negocios que Trabajan Solos",
        slug: "automatizacion-chatgpt-negocios-solos",
        excerpt: "Crea sistemas automatizados que generan ingresos 24/7 sin intervención manual."
      },
      {
        title: "Freelancer con IA: Cómo Cobrar 5x Más",
        slug: "freelancer-ia-cobrar-5x-mas",
        excerpt: "Estrategias probadas para multiplicar tus tarifas como freelancer usando IA."
      },
      {
        title: "Marketing con IA: Clientes Automáticos",
        slug: "marketing-ia-clientes-automaticos",
        excerpt: "Implementa sistemas de marketing inteligente que atraen clientes constantemente."
      }
    ]

    return articles[Math.floor(Math.random() * articles.length)]
  }

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement

    setIsSubmitting(true)
    setFormStatus('idle')

    const originalText = submitButton.innerHTML
    submitButton.innerHTML = `
      <span class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Procesando...
      </span>
    `
    submitButton.disabled = true

    try {
      // Simular procesamiento del formulario
      await new Promise(resolve => setTimeout(resolve, 2000))

      const article = getRandomArticle()
      setRecommendedArticle(article)
      setFormStatus('success')
      form.reset()

      // Google Analytics event (opcional)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Guides Form',
          value: 1
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setFormStatus('error')
    } finally {
      submitButton.innerHTML = originalText
      submitButton.disabled = false
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Guías de Monetización con IA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Aprende paso a paso cómo monetizar efectivamente con Inteligencia Artificial.
          Guías prácticas para todos los niveles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">50+</div>
          <div className="text-sm text-muted-foreground">Guías Disponibles</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">100K+</div>
          <div className="text-sm text-muted-foreground">Lectores</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">4.8/5</div>
          <div className="text-sm text-muted-foreground">Valoración</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">95%</div>
          <div className="text-sm text-muted-foreground">Éxito Comprobado</div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-sm font-medium mb-3">Categorías</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">Nivel</h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
        {(selectedCategory !== "Todas" || selectedLevel !== "Todos") && (
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredGuides.length} de {guides.length} guías
          </div>
        )}
      </div>

      {/* Featured Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Guías Destacadas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.filter(guide => guide.featured).map((guide) => (
            <Card key={guide.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <guide.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{guide.category}</Badge>
                    <Badge variant="outline">{guide.level}</Badge>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {guide.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium ml-1">{guide.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({(guide.students / 1000).toFixed(1)}k)</span>
                    </div>
                  </div>

                  {/* Popularity Badge */}
                  <div className="flex justify-between items-center">
                    <Badge variant={guide.popularity === "Popular" ? "default" :
                                 guide.popularity === "Trending" ? "secondary" : "outline"}>
                      {guide.popularity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{guide.students.toLocaleString()} estudiantes</span>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/guias/${guide.slug}`}>
                      Leer Guía Completa
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Guides */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory !== "Todas" || selectedLevel !== "Todos"
            ? `Resultados Filtrados (${filteredGuides.length})`
            : "Todas las Guías"}
        </h2>
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron guías con los filtros seleccionados.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory("Todas")
                setSelectedLevel("Todos")
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.title} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <Badge variant="outline">{guide.level}</Badge>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {guide.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium ml-1">{guide.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({(guide.students / 1000).toFixed(1)}k)</span>
                      </div>
                    </div>

                    {/* Popularity Badge */}
                    <div className="flex justify-between items-center">
                      <Badge variant={guide.popularity === "Popular" ? "default" :
                                   guide.popularity === "Trending" ? "secondary" : "outline"}>
                        {guide.popularity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{guide.students.toLocaleString()} estudiantes</span>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/guias/${guide.slug}`}>
                        Leer Guía Completa
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            ¿Listo para Transformar tu Futuro con IA?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Obtén acceso personalizado a nuestras guías exclusivas y comienza tu viaje hacia la monetización con Inteligencia Artificial.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button size="lg" asChild>
              <Link href="#contact-form">
                Solicitar Consultoría Gratuita
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/blog">
                Ver Historias de Éxito
              </a>
            </Button>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-2xl mx-auto mt-12">
          {formStatus === 'success' && recommendedArticle ? (
            <Card>
              <div className="text-center py-12">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>

                {/* Success Message */}
                <h3 className="text-2xl font-bold mb-4 text-green-800">¡Solicitud Enviada con Éxito!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Gracias por tu interés. Hemos recibido tu solicitud y te enviaremos una estrategia personalizada a tu correo en las próximas 24 horas.
                </p>

                {/* Recommended Article */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 max-w-lg mx-auto">
                  <h4 className="font-semibold text-gray-800 mb-3">📚 Mientras esperas, te recomendamos:</h4>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-medium text-gray-900 mb-2">{recommendedArticle.title}</h5>
                    <p className="text-sm text-gray-600 mb-4">{recommendedArticle.excerpt}</p>
                    <a href={`/blog/${recommendedArticle.slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Leer artículo completo →
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
                  <Button size="lg" onClick={() => setFormStatus('idle')}>
                    Ver Más Guías
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/blog">
                      Explorar Blog
                    </a>
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-sm text-gray-500">
                  <p>¿Preguntas urgentes? Escríbenos a <a href="mailto:hola@monetizao.com" className="text-primary hover:underline">hola@monetizao.com</a></p>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Comienza tu Transformación Digital</CardTitle>
                <p className="text-muted-foreground">
                  Cuéntanos sobre tus objetivos y te enviaremos una estrategia personalizada
                </p>
              </CardHeader>
              <CardContent>
                {formStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <span>Error al enviar el formulario. Por favor, intenta nuevamente o contáctanos directamente.</span>
                    </div>
                  </div>
                )}

                <form id="guides-contact-form" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium">Nombre</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre completo"
                        required
                        className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-interest" className="text-sm font-medium">Área de Interés</label>
                    <select
                      id="contact-interest"
                      name="interest"
                      required
                      className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    >
                      <option value="">Selecciona tu área de interés</option>
                      <option value="prompts">Prompts Lucrativos</option>
                      <option value="consultoria">Consultoría de IA</option>
                      <option value="automatizacion">Automatización</option>
                      <option value="freelancing">Freelancing con IA</option>
                      <option value="contenido">Creación de Contenido</option>
                      <option value="productos">Productos Digitales</option>
                      <option value="ecommerce">E-commerce con IA</option>
                      <option value="marketing">Marketing y Ventas</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">Cuéntanos tus metas</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="¿Qué resultados esperas obtener con nuestras guías de IA?"
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      'Acceder a Estrategia Personalizada'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
