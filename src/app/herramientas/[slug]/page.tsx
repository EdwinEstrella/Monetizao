'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Star, Users, Zap, BarChart3, Wrench, Target, Globe, Lock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Importar componentes de herramientas específicas
import { PromptGeneratorTool } from '@/components/tools/PromptGeneratorTool'
import { ROICalculatorTool } from '@/components/tools/ROICalculatorTool'
import { ProposalGeneratorTool } from '@/components/tools/ProposalGeneratorTool'
import { NicheTemplateTool } from '@/components/tools/NicheTemplateTool'

const toolComponents: Record<string, React.ComponentType> = {
  'generador-prompts-lucrativos': PromptGeneratorTool,
  'calculadora-roi-servicios-ia': ROICalculatorTool,
  'generador-propuestas-comerciales': ProposalGeneratorTool,
  'template-generator-nichos': NicheTemplateTool,
}

const toolIcons: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Wrench: <Wrench className="h-6 w-6" />,
  Target: <Target className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
}

export default function ToolPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [tool, setTool] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/tools`)
        const data = await response.json()

        if (data.success) {
          const foundTool = data.data.find((t: any) => t.slug === slug)
          if (foundTool) {
            setTool(foundTool)
          } else {
            setError('Herramienta no encontrada')
          }
        } else {
          setError('Error cargando herramienta')
        }
      } catch (err) {
        setError('Error de conexión')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTool()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !tool) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Herramienta no encontrada'}
          </h1>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const ToolComponent = toolComponents[slug]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a herramientas
        </Button>

        <div className="flex items-start gap-6">
          <div className="bg-primary/10 p-4 rounded-xl">
            {toolIcons[tool.icon as keyof typeof toolIcons]}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {tool.name}
              </h1>
              {tool.isPremium && (
                <Badge variant="secondary" className="gap-1">
                  <Lock className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>

            <p className="text-gray-600 mb-4 max-w-2xl">
              {tool.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{tool.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{(tool.usersCount / 1000).toFixed(1)}K+ usuarios</span>
              </div>
              <Badge variant="outline">
                {tool.category}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Tool Interface */}
        <div className="lg:col-span-2">
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Interfaz de la Herramienta</CardTitle>
                <CardDescription>
                  Esta herramienta estará disponible próximamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-gray-100 p-8 rounded-lg mb-4">
                    {toolIcons[tool.icon as keyof typeof toolIcons]}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Estamos trabajando para traerte esta herramienta premium.
                  </p>
                  {tool.isPremium && (
                    <Button asChild>
                      <Link href="/premium">
                        Actualizar a Premium
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tool Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{tool.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Usuarios</span>
                <span className="font-medium">{tool.usersCount.toLocaleString()}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Categoría</span>
                <Badge variant="outline">{tool.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo</span>
                <Badge variant={tool.isPremium ? "secondary" : "default"}>
                  {tool.isPremium ? 'Premium' : 'Gratis'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/herramientas">
                  <Wrench className="h-4 w-4 mr-2" />
                  Explorar más herramientas
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/api-docs">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Documentación API
                </Link>
              </Button>
              {tool.isPremium && (
                <Button className="w-full" asChild>
                  <Link href="/premium">
                    <Lock className="h-4 w-4 mr-2" />
                    Desbloquear todas las herramientas
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Herramientas Relacionadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Aquí irían herramientas relacionadas */}
                <div className="text-sm text-gray-600">
                  Más herramientas coming soon...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}