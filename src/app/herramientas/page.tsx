'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wrench, ExternalLink, Star, Users, Zap, Target, BarChart3, Globe } from 'lucide-react'
import Link from 'next/link'

const tools = [
  {
    title: "Generador de Prompts Lucrativos",
    description: "Herramienta IA que genera prompts optimizados para generar ingresos en diferentes nichos.",
    category: "Generación",
    type: "Gratis",
    rating: 4.9,
    users: "25K+",
    icon: Zap,
    featured: true,
    url: "/herramientas/generador-prompts-lucrativos"
  },
  {
    title: "Calculadora de ROI para Servicios IA",
    description: "Calcula el retorno de inversión para diferentes servicios de IA y optimiza tu pricing.",
    category: "Analytics",
    type: "Gratis",
    rating: 4.7,
    users: "12K+",
    icon: BarChart3,
    featured: true,
    url: "/herramientas/calculadora-roi-servicios-ia"
  },
  {
    title: "Analizador de Competencia IA",
    description: "Analiza tu competencia y encuentra oportunidades de monetización con IA.",
    category: "Análisis",
    type: "Premium",
    rating: 4.8,
    users: "8K+",
    icon: Target,
    featured: false,
    url: "/herramientas/analizador-competencia-ia"
  },
  {
    title: "Optimizador de Contenido IA",
    description: "Mejora tu contenido para máxima monetización usando algoritmos avanzados.",
    category: "Optimización",
    type: "Premium",
    rating: 4.6,
    users: "6K+",
    icon: Globe,
    featured: true,
    url: "/herramientas/optimizador-contenido-ia"
  },
  {
    title: "Generador de Propuestas Comerciales",
    description: "Crea propuestas profesionales para servicios de IA en minutos.",
    category: "Negocio",
    type: "Gratis",
    rating: 4.5,
    users: "15K+",
    icon: Wrench,
    featured: false,
    url: "/herramientas/generador-propuestas-comerciales"
  },
  {
    title: "Dashboard de Métricas de Monetización",
    description: "Monitorea en tiempo real tus ingresos y optimiza tus estrategias de IA.",
    category: "Dashboard",
    type: "Premium",
    rating: 4.9,
    users: "4K+",
    icon: BarChart3,
    featured: false,
    url: "/herramientas/dashboard-metricas-monetizacion"
  },
  {
    title: "Detector de Tendencias IA",
    description: "Identifica tendencias emergentes y oportunidades de mercado antes que nadie.",
    category: "Tendencias",
    type: "Premium",
    rating: 4.7,
    users: "9K+",
    icon: Target,
    featured: true,
    url: "/herramientas/detector-tendencias-ia"
  },
  {
    title: "Template Generator para Nichos",
    description: "Genera plantillas personalizadas para diferentes nichos de mercado.",
    category: "Plantillas",
    type: "Gratis",
    rating: 4.4,
    users: "18K+",
    icon: Wrench,
    featured: false,
    url: "/herramientas/template-generator-nichos"
  }
]

const categories = ["Todas", "Generación", "Analytics", "Análisis", "Optimización", "Negocio", "Dashboard", "Tendencias", "Plantillas"]
const types = ["Todas", "Gratis", "Premium"]

export default function HerramientasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedType, setSelectedType] = useState("Todas")

  // Filtrar herramientas basado en las selecciones
  const filterTools = (tool: typeof tools[0]) => {
    const categoryMatch = selectedCategory === "Todas" || tool.category === selectedCategory
    const typeMatch = selectedType === "Todas" || tool.type === selectedType
    return categoryMatch && typeMatch
  }

  const filteredTools = tools.filter(filterTools)
  const featuredFilteredTools = tools.filter(tool => tool.featured && filterTools(tool))

  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Herramientas de Monetización IA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Herramientas profesionales diseñadas para maximizar tus ingresos con Inteligencia Artificial.
          Probadas por más de 100,000 emprendedores.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">25+</div>
          <div className="text-sm text-muted-foreground">Herramientas</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">150K+</div>
          <div className="text-sm text-muted-foreground">Usuarios Activos</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">$2.5M</div>
          <div className="text-sm text-muted-foreground">Generados</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
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
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">Tipo</h3>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={type === selectedType ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Herramientas Destacadas {selectedCategory !== "Todas" && `- ${selectedCategory}`} {selectedType !== "Todas" && `- ${selectedType}`}
        </h2>
        {featuredFilteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay herramientas destacadas para los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFilteredTools.map((tool) => (
            <Card key={tool.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{tool.category}</Badge>
                    <Badge variant={tool.type === "Gratis" ? "default" : "outline"}>
                      {tool.type}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {tool.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tool.users}
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={tool.url}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Usar Herramienta
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </section>

      {/* All Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Todas las Herramientas {selectedCategory !== "Todas" && `- ${selectedCategory}`} {selectedType !== "Todas" && `- ${selectedType}`}
        </h2>
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay herramientas para los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
            <Card key={tool.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{tool.category}</Badge>
                    <Badge variant={tool.type === "Gratis" ? "default" : "outline"}>
                      {tool.type}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {tool.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tool.users}
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={tool.url}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Usar Herramienta
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </section>

      {/* API Access CTA */}
      <section className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Acceso API para Desarrolladores
        </h2>
        <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
          Integra nuestras herramientas en tus propias aplicaciones. API RESTful,
          documentación completa y soporte técnico incluido.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Button size="lg" variant="secondary">
            Ver Documentación API
          </Button>
          <Button size="lg" variant="secondary">
            Obtener API Key
          </Button>
        </div>
      </section>
    </div>
  )
}