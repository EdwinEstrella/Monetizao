import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, DollarSign, Users, Calendar, Star, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const successCases = [
  {
    name: "María González",
    role: "Freelancer Digital",
    image: "/placeholder-avatar-1.jpg",
    category: "Freelancing",
    revenue: "$8,500/mes",
    time: "3 meses",
    rating: 5,
    story: "Pasé de ganar $1,500 a $8,500 mensuales implementando los prompts y estrategias de monetización con IA.",
    strategies: ["Consultoría IA", "Content Creation", "Automatización"],
    featured: true,
    verified: true
  },
  {
    name: "Carlos Rodríguez",
    role: "Emprendedor E-commerce",
    image: "/placeholder-avatar-2.jpg",
    category: "E-commerce",
    revenue: "$15,000/mes",
    time: "6 meses",
    rating: 5,
    story: "Multiplicé mis ventas por 5 usando IA para optimizar productos, precios y marketing automático.",
    strategies: ["Product Optimization", "Marketing IA", "Customer Service"],
    featured: true,
    verified: true
  },
  {
    name: "Ana Martínez",
    role: "Content Creator",
    image: "/placeholder-avatar-3.jpg",
    category: "Contenido",
    revenue: "$12,000/mes",
    time: "4 meses",
    rating: 4,
    story: "Creé un sistema completo de generación de contenido con IA que me permite publicar 10x más contenido de calidad.",
    strategies: ["Content Generation", "Social Media", "SEO Automation"],
    featured: false,
    verified: true
  },
  {
    name: "Diego Silva",
    role: "Consultor de Negocios",
    image: "/placeholder-avatar-4.jpg",
    category: "Consultoría",
    revenue: "$20,000/mes",
    time: "8 meses",
    rating: 5,
    story: "Construí una agencia de consultoría especializada en implementación de IA para empresas tradicionales.",
    strategies: ["Business Consulting", "AI Implementation", "Training"],
    featured: true,
    verified: true
  },
  {
    name: "Sofía López",
    role: "Designer & Artist",
    image: "/placeholder-avatar-5.jpg",
    category: "Diseño",
    revenue: "$6,000/mes",
    time: "2 meses",
    rating: 4,
    story: "Vendo arte generado con IA y diseños personalizados usando Midjourney y herramientas de optimización.",
    strategies: ["AI Art", "Print on Demand", "Custom Design"],
    featured: false,
    verified: false
  },
  {
    name: "Roberto Chen",
    role: "Marketing Specialist",
    image: "/placeholder-avatar-6.jpg",
    category: "Marketing",
    revenue: "$18,000/mes",
    time: "5 meses",
    rating: 5,
    story: "Ofrezco servicios de marketing potenciados con IA a empresas, generando campañas automatizadas efectivas.",
    strategies: ["Marketing Automation", "Campaign Optimization", "Analytics"],
    featured: true,
    verified: true
  }
]

const categories = ["Todos", "Freelancing", "E-commerce", "Contenido", "Consultoría", "Diseño", "Marketing"]
const revenueRanges = ["Todos", "$1K-$5K", "$5K-$10K", "$10K-$20K", "$20K+"]

export default function CasosExitoPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Casos de Éxito Reales
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre cómo miles de emprendedores están transformando sus ingresos
          usando nuestras estrategias de monetización con IA.
        </p>
      </div>

      {/* Overall Stats */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">Emprendedores Exitosos</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$50M+</div>
              <div className="text-white/80">Ingresos Generados</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/80">Tasa de Éxito</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-white/80">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-sm font-medium mb-3">Categorías</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Todos" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">Rango de Ingresos</h3>
          <div className="flex flex-wrap gap-2">
            {revenueRanges.map((range) => (
              <Button
                key={range}
                variant={range === "Todos" ? "default" : "outline"}
                size="sm"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Success Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Historias Destacadas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successCases.filter(case_ => case_.featured).map((case_) => (
            <Card key={case_.name} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {case_.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{case_.name}</h3>
                        {case_.verified && (
                          <Badge variant="default" className="text-xs">Verificado</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{case_.role}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{case_.category}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <div className="font-bold text-green-600 dark:text-green-400">
                      {case_.revenue}
                    </div>
                    <div className="text-xs text-muted-foreground">Ingresos</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                    <div className="font-bold text-blue-600 dark:text-blue-400">
                      {case_.time}
                    </div>
                    <div className="text-xs text-muted-foreground">Tiempo</div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                  &ldquo;{case_.story}&rdquo;
                </blockquote>

                <div className="flex flex-wrap gap-1 mb-4">
                  {case_.strategies.map((strategy) => (
                    <Badge key={strategy} variant="outline" className="text-xs">
                      {strategy}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{case_.rating}.0</span>
                  </div>
                  <Button size="sm" variant="ghost">
                    Leer Historia Completa
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* All Success Cases */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Todas las Historias</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successCases.map((case_) => (
            <Card key={case_.name} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {case_.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{case_.name}</h3>
                        {case_.verified && (
                          <Badge variant="default" className="text-xs">Verificado</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{case_.role}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{case_.category}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <div className="font-bold text-green-600 dark:text-green-400">
                      {case_.revenue}
                    </div>
                    <div className="text-xs text-muted-foreground">Ingresos</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                    <div className="font-bold text-blue-600 dark:text-blue-400">
                      {case_.time}
                    </div>
                    <div className="text-xs text-muted-foreground">Tiempo</div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                  &ldquo;{case_.story}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{case_.rating}.0</span>
                  </div>
                  <Button size="sm" variant="ghost">
                    Leer Historia Completa
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Join Success CTA */}
      <section className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          ¿Quieres Ser el Próximo Caso de Éxito?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Únete a nuestro programa premium y obtén acceso a estrategias exclusivas,
          mentoría personalizada y herramientas profesionales.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Button size="lg">
            Comenzar Ahora
          </Button>
          <Button size="lg" variant="outline">
            Ver Testimonios Completos
          </Button>
        </div>
      </section>
    </div>
  )
}