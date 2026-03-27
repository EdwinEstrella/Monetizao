'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Users, Target, Activity, Download, RefreshCw, BarChart3, PieChart as PieChartIcon, Calendar, Eye, Zap, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import PricingBanner from '@/components/ui/pricing-banner'

// Datos simulados para el dashboard
const generateMockData = () => ({
  revenue: [
    { month: 'Ene', ingresos: 12500, costos: 3200, beneficio: 9300 },
    { month: 'Feb', ingresos: 18900, costos: 4800, beneficio: 14100 },
    { month: 'Mar', ingresos: 23400, costos: 5900, beneficio: 17500 },
    { month: 'Abr', ingresos: 31200, costos: 7800, beneficio: 23400 },
    { month: 'May', ingresos: 28900, costos: 7200, beneficio: 21700 },
    { month: 'Jun', ingresos: 35600, costos: 8900, beneficio: 26700 },
  ],
  tools: [
    { name: 'Generador Prompts', usage: 1450, revenue: 7250, growth: 23 },
    { name: 'Calculadora ROI', usage: 890, revenue: 4450, growth: 15 },
    { name: 'Optimizador IA', usage: 670, revenue: 6700, growth: 45 },
    { name: 'Analizador Competencia', usage: 340, revenue: 5100, growth: 67 },
    { name: 'Propuestas IA', usage: 230, revenue: 3450, growth: 89 },
  ],
  sources: [
    { name: 'Directo', value: 35, color: '#3b82f6' },
    { name: 'Redes Sociales', value: 28, color: '#10b981' },
    { name: 'SEO Orgánico', value: 22, color: '#f59e0b' },
    { name: 'Referidos', value: 15, color: '#8b5cf6' },
  ],
  kpis: {
    ingresosTotales: 150200,
    crecimientoMensual: 23.5,
    usuariosActivos: 4580,
    conversionRate: 12.8,
    ticketPromedio: 32.8,
    satisfaccionCliente: 94.2,
  }
})

export default function DashboardMetricasMonetizacionPage() {
  const [timeRange, setTimeRange] = useState("6meses")
  const [selectedMetric, setSelectedMetric] = useState("ingresos")
  const [refreshKey, setRefreshKey] = useState(0)
  const [dashboardData, setDashboardData] = useState(generateMockData())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' })
  const [exportFormat, setExportFormat] = useState("csv")

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setDashboardData(generateMockData())
      setRefreshKey(prev => prev + 1)
      setIsRefreshing(false)
    }, 2000)
  }

  const exportData = () => {
    // Simulación de exportación
    const dataStr = JSON.stringify(dashboardData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard_metrics_${new Date().toISOString().split('T')[0]}.${exportFormat}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="container px-4 py-8 md:px-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link href="/herramientas" className="hover:text-primary">Herramientas</Link>
          <span>/</span>
          <span className="text-foreground">Dashboard de Métricas de Monetización</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dashboard de Métricas</h1>
              <p className="text-muted-foreground">Monitorea en tiempo real tus ingresos y optimiza tus estrategias de IA</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button variant="outline" onClick={exportData}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Premium</Badge>
          <Badge className="bg-orange-100 text-orange-800">Herramienta Avanzada</Badge>
          <Badge className="bg-blue-100 text-blue-800">4K+ Usuarios</Badge>
        </div>
      </div>

      {/* Controles del dashboard */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Configuración de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="timeRange">Rango de Tiempo</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1mes">Último Mes</SelectItem>
                  <SelectItem value="3meses">Últimos 3 Meses</SelectItem>
                  <SelectItem value="6meses">Últimos 6 Meses</SelectItem>
                  <SelectItem value="1año">Último Año</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {timeRange === 'custom' && (
              <>
                <div>
                  <Label htmlFor="startDate">Fecha Inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Fecha Fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="metric">Métrica Principal</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona métrica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingresos">Ingresos</SelectItem>
                  <SelectItem value="usuarios">Usuarios</SelectItem>
                  <SelectItem value="conversion">Conversión</SelectItem>
                  <SelectItem value="herramientas">Uso de Herramientas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="exportFormat">Formato de Exportación</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <Badge className="bg-green-100 text-green-800">+23.5%</Badge>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.kpis.ingresosTotales)}</div>
            <div className="text-sm text-muted-foreground">Ingresos Totales</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">+15.2%</Badge>
            </div>
            <div className="text-2xl font-bold">{formatPercent(dashboardData.kpis.crecimientoMensual)}</div>
            <div className="text-sm text-muted-foreground">Crecimiento Mensual</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-800">+8.7%</Badge>
            </div>
            <div className="text-2xl font-bold">{dashboardData.kpis.usuariosActivos.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Usuarios Activos</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800">+3.1%</Badge>
            </div>
            <div className="text-2xl font-bold">{formatPercent(dashboardData.kpis.conversionRate)}</div>
            <div className="text-sm text-muted-foreground">Tasa de Conversión</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-red-600" />
              <Badge className="bg-red-100 text-red-800">+12.4%</Badge>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.kpis.ticketPromedio)}</div>
            <div className="text-sm text-muted-foreground">Ticket Promedio</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-8 w-8-teal-600" />
              <Badge className="bg-teal-100 text-teal-800">+5.8%</Badge>
            </div>
            <div className="text-2xl font-bold">{formatPercent(dashboardData.kpis.satisfaccionCliente)}</div>
            <div className="text-sm text-muted-foreground">Satisfacción</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="tools">Herramientas</TabsTrigger>
          <TabsTrigger value="sources">Fuentes</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ingresos</CardTitle>
                <CardDescription>Tendencia de ingresos, costos y beneficios</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dashboardData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Area type="monotone" dataKey="ingresos" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="costos" stackId="2" stroke="#ef4444" fill="#ef4444" />
                    <Area type="monotone" dataKey="beneficio" stackId="3" stroke="#10b981" fill="#10b981" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Rentabilidad</CardTitle>
                <CardDescription>Márgenes y rentabilidad por período</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="beneficio" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Herramienta</CardTitle>
              <CardDescription>Uso, ingresos y crecimiento de cada herramienta</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dashboardData.tools}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="usage" fill="#3b82f6" name="Usos" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Ingresos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de Tráfico</CardTitle>
                <CardDescription>Distribución de usuarios por canal</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData.sources}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {dashboardData.sources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas por Canal</CardTitle>
                <CardDescription>Conversión y calidad por fuente de tráfico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.sources.map((source) => (
                    <div key={source.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }} />
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{source.value}% del tráfico</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {(Math.random() * 20 + 10).toFixed(1)}% conversión
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Proyecciones</CardTitle>
                <CardDescription>Predicciones basadas en tendencias actuales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">📈 Proyección Mensual</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Basado en el crecimiento actual, se estima para el próximo mes:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>Ingresos:</strong> {formatCurrency(dashboardData.kpis.ingresosTotales * 1.12)}</div>
                      <div><strong>Usuarios:</strong> {Math.floor(dashboardData.kpis.usuariosActivos * 1.08).toLocaleString()}</div>
                      <div><strong>Conversión:</strong> {formatPercent(dashboardData.kpis.conversionRate * 1.03)}</div>
                      <div><strong>Ticket:</strong> {formatCurrency(dashboardData.kpis.ticketPromedio * 1.05)}</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">🎯 Objetivos del Trimestre</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Alcanzar {formatCurrency(200000)} en ingresos</span>
                        <span className="text-green-600">75% completado</span>
                      </div>
                      <div className="flex justify-between">
                        <span>6000 usuarios activos</span>
                        <span className="text-yellow-600">76% completado</span>
                      </div>
                      <div className="flex justify-between">
                        <span>15% tasa de conversión</span>
                        <span className="text-red-600">85% completado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones IA</CardTitle>
                <CardDescription>Sugerencias basadas en análisis de datos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Oportunidad Detectada</h4>
                        <p className="text-sm text-blue-700">
                          El uso de "Optimizador IA" creció 45% este mes. Considera incrementar la inversión en marketing para esta herramienta.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Tendencia Positiva</h4>
                        <p className="text-sm text-green-700">
                          La conversión desde redes sociales mejora continuamente. Duplica el presupuesto en este canal.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Área de Mejora</h4>
                        <p className="text-sm text-yellow-700">
                          El ticket promedio se ha estabilizado. Implementa estrategias de upselling para aumentarlo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Banner de planes */}
      <PricingBanner />
    </div>
  )
}