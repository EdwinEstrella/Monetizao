'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Mail,
  Settings,
  Zap,
  BarChart3,
  Globe,
  Target,
  FileText,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  ExternalLink,
  Key,
  Cpu,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// Hoist static data outside component to prevent recreation on every render
const TOOLS = [
  {
    name: 'Generador de Prompts',
    slug: 'generador-prompts-lucrativos',
    icon: Zap,
    category: 'Generación',
    isPremium: false,
    color: 'bg-blue-500',
  },
  {
    name: 'Calculadora ROI',
    slug: 'calculadora-roi-servicios-ia',
    icon: BarChart3,
    category: 'Analytics',
    isPremium: false,
    color: 'bg-green-500',
  },
  {
    name: 'Generador Propuestas',
    slug: 'generador-propuestas-comerciales',
    icon: FileText,
    category: 'Negocio',
    isPremium: false,
    color: 'bg-purple-500',
  },
  {
    name: 'Template Nichos',
    slug: 'template-generator-nichos',
    icon: Target,
    category: 'Plantillas',
    isPremium: false,
    color: 'bg-orange-500',
  },
  {
    name: 'Analizador Competencia',
    slug: 'analizador-competencia-ia',
    icon: Target,
    category: 'Análisis',
    isPremium: true,
    color: 'bg-red-500',
  },
  {
    name: 'Optimizador Contenido',
    slug: 'optimizador-contenido-ia',
    icon: Globe,
    category: 'Optimización',
    isPremium: true,
    color: 'bg-indigo-500',
  },
  {
    name: 'Dashboard Métricas',
    slug: 'dashboard-metricas-monetizacion',
    icon: BarChart3,
    category: 'Dashboard',
    isPremium: true,
    color: 'bg-cyan-500',
  },
  {
    name: 'Detector Tendencias',
    slug: 'detector-tendencias-ia',
    icon: TrendingUp,
    category: 'Tendencias',
    isPremium: true,
    color: 'bg-pink-500',
  },
] as const

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [usageStats, setUsageStats] = useState({
    dailyUsage: 0,
    maxDaily: 5,
    monthlyUsage: 0,
    totalSaved: 0,
  })
  const { toast } = useToast()
  const router = useRouter()

  // Use useCallback to prevent recreation on every render
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()

        // Verificar que data.user existe antes de acceder a sus propiedades
        if (!data.user) {
          // NO redirigir automáticamente - evitar loop infinito
          setUser(null)
          return
        }

        setUser(data.user)

        // Calcular estadísticas de uso
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const isToday = data.user.lastUsageDate && new Date(data.user.lastUsageDate) >= today
        const dailyUsage = isToday ? data.user.dailyUsageCount : 0

        setUsageStats({
          dailyUsage,
          maxDaily: data.user.hasActiveSubscription ? 999 : 5,
          monthlyUsage: data.user.dailyUsageCount * 30,
          totalSaved: 0,
        })
      } else {
        // Solo redirigir si es un error 401 explícito
        if (response.status === 401) {
          router.push('/auth')
        } else {
          setUser(null)
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [router])

  // Initialize dashboard - InsForge handles OAuth automatically on backend
  useEffect(() => {
    // InsForge backend already exchanged the OAuth code and set cookies
    // Just verify authentication and fetch user data
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Solo ejecutar una vez al montar, no re-ejecutar cuando fetchUserData cambie

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/auth')
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      })
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }, [router, toast])

  // Memoize expensive calculations
  const usagePercentage = useMemo(() => {
    return (usageStats.dailyUsage / usageStats.maxDaily) * 100
  }, [usageStats.dailyUsage, usageStats.maxDaily])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-64 bg-gray-200 rounded w-96"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Monetizao
              </Link>
              <span className="ml-2 text-sm text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Bienvenido, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Aquí tienes todas tus herramientas de IA para monetizar tus habilidades
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uso Diario</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usageStats.dailyUsage}/{usageStats.maxDaily}
              </div>
              <Progress value={usagePercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {usageStats.dailyUsage >= usageStats.maxDaily
                  ? 'Has alcanzado tu límite diario'
                  : `${usageStats.maxDaily - usageStats.dailyUsage} usos restantes hoy`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan Actual</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.hasActiveSubscription ? 'Premium' : 'Gratis'}
              </div>
              {user.hasActiveSubscription ? (
                <Badge variant="default" className="mt-2">
                  Activo hasta {new Date(user.subscription.endDate).toLocaleDateString()}
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-2">
                  5 usos diarios
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Configurada</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.apiConfig ? user.apiConfig.provider.toUpperCase() : 'No'}
              </div>
              {user.apiConfig ? (
                <Badge variant="outline" className="mt-2 capitalize">
                  {user.apiConfig.modelName}
                </Badge>
              ) : (
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <Link href="/dashboard/settings">
                    Configurar API
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                Verificado
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Cuenta activa y lista para usar
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tools Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Tus Herramientas
            </h2>
            {!user.hasActiveSubscription && usageStats.dailyUsage >= usageStats.maxDaily && (
              <AlertCircle className="h-6 w-6 text-orange-500" />
            )}
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="free">Gratis</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => {
                const isLocked = tool.isPremium && !user.hasActiveSubscription
                const isDailyLimitReached = !user.hasActiveSubscription && usageStats.dailyUsage >= usageStats.maxDaily && !tool.isPremium

                return (
                  <Card key={tool.slug} className={`relative ${isLocked || isDailyLimitReached ? 'opacity-60' : ''}`}>
                    {isLocked && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">Premium</Badge>
                      </div>
                    )}
                    {isDailyLimitReached && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive">Límite alcanzado</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10`}>
                          <tool.icon className={`h-6 w-6 ${tool.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription>{tool.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant={isLocked || isDailyLimitReached ? "outline" : "default"}
                        disabled={isLocked || isDailyLimitReached}
                        asChild={!isLocked && !isDailyLimitReached}
                      >
                        {isLocked ? (
                          <Link href="/dashboard/settings">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Actualizar a Premium
                          </Link>
                        ) : isDailyLimitReached ? (
                          <span>
                            <Clock className="h-4 w-4 mr-2" />
                            Límite diario alcanzado
                          </span>
                        ) : (
                          <Link href={`/herramientas/${tool.slug}`}>
                            <Cpu className="h-4 w-4 mr-2" />
                            Usar Herramienta
                          </Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="free" className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {TOOLS.filter(tool => !tool.isPremium).map((tool) => {
                const isDailyLimitReached = !user.hasActiveSubscription && usageStats.dailyUsage >= usageStats.maxDaily

                return (
                  <Card key={tool.slug} className={`relative ${isDailyLimitReached ? 'opacity-60' : ''}`}>
                    {isDailyLimitReached && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive">Límite alcanzado</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10`}>
                          <tool.icon className={`h-6 w-6 ${tool.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription>{tool.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        disabled={isDailyLimitReached}
                        asChild={!isDailyLimitReached}
                      >
                        {isDailyLimitReached ? (
                          <span>
                            <Clock className="h-4 w-4 mr-2" />
                            Límite diario alcanzado
                          </span>
                        ) : (
                          <Link href={`/herramientas/${tool.slug}`}>
                            <Cpu className="h-4 w-4 mr-2" />
                            Usar Herramienta
                          </Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="premium" className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {TOOLS.filter(tool => tool.isPremium).map((tool) => {
                const isLocked = !user.hasActiveSubscription

                return (
                  <Card key={tool.slug} className={`relative ${isLocked ? 'opacity-60' : ''}`}>
                    {isLocked && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">Premium</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10`}>
                          <tool.icon className={`h-6 w-6 ${tool.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription>{tool.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant={isLocked ? "outline" : "default"}
                        disabled={isLocked}
                        asChild={!isLocked}
                      >
                        {isLocked ? (
                          <Link href="/dashboard/settings">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Actualizar a Premium
                          </Link>
                        ) : (
                          <Link href={`/herramientas/${tool.slug}`}>
                            <Cpu className="h-4 w-4 mr-2" />
                            Usar Herramienta
                          </Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>
          </Tabs>
        </div>

        {/* API Configuration Section */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              <CardTitle>Configuración de APIs de IA</CardTitle>
            </div>
            <CardDescription>
              Configura tus propias APIs para uso ilimitado o usa las APIs del proyecto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  APIs del Proyecto
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Usa las APIs de DeepSeek proporcionadas por Monetizao. Limitado a 5 usos por semana para usuarios no logueados.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Gratis para empezar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Configuración automática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>5 usos semanales</span>
                  </div>
                </div>
                <Badge variant="outline" className="mt-3">
                  Estado: Activo automáticamente
                </Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-600" />
                  APIs Personales
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Configura tus propias APIs de OpenAI, DeepSeek o Gemini para uso ilimitado y personalizado.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Uso ilimitado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Configuración personalizada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Privacidad garantizada</span>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    🔒 <strong>Importante:</strong> Tus APIs son privadas y nunca se comparten con otros usuarios.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/settings">
                      <Key className="h-3 w-3 mr-1" />
                      Configurar mi API
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium mb-2 text-blue-800">¿Cómo funciona?</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Si no configuras API personal, usamos automáticamente la API del proyecto</li>
                <li>• Tu configuración personal reemplaza a la API del proyecto</li>
                <li>• Cada usuario tiene su propia configuración privada y aislada</li>
                <li>• Puedes cambiar tu configuración en cualquier momento</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade CTA */}
        {!user.hasActiveSubscription && (
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">🚀 Desbloquea Todo el Potencial</CardTitle>
              <CardDescription className="text-blue-100">
                Actualiza a Premium para usar herramientas avanzadas sin límites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Uso ilimitado de todas las herramientas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Acceso a herramientas Premium exclusivas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Prioridad en el soporte técnico
                    </li>
                  </ul>
                </div>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/dashboard/settings">
                    <Star className="h-4 w-4 mr-2" />
                    Actualizar Ahora
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}