'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

const serviceTypes = [
  { id: 'chatbot', name: 'Chatbot / Asistente IA', icon: '🤖', basePrice: 500 },
  { id: 'content', name: 'Generación de Contenido', icon: '✍️', basePrice: 800 },
  { id: 'automation', name: 'Automatización de Procesos', icon: '⚙️', basePrice: 1200 },
  { id: 'analytics', name: 'Análisis Predictivo', icon: '📊', basePrice: 1500 },
  { id: 'voice', name: 'Asistente de Voz IA', icon: '🎤', basePrice: 600 },
  { id: 'image', name: 'Generación de Imágenes', icon: '🎨', basePrice: 400 }
]

export default function CalculadoraROIServiciosIAPage() {
  const [selectedService, setSelectedService] = useState("")
  const [initialInvestment, setInitialInvestment] = useState("")
  const [monthlyCost, setMonthlyCost] = useState("")
  const [expectedRevenue, setExpectedRevenue] = useState("")
  const [timeHorizon, setTimeHorizon] = useState("12")
  const [efficiencyGain, setEfficiencyGain] = useState("30")
  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateROI = async () => {
    if (!selectedService || !initialInvestment || !monthlyCost || !expectedRevenue) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsCalculating(true)

    // Simulación del cálculo (en producción se conectaría a backend)
    setTimeout(() => {
      const investment = parseFloat(initialInvestment)
      const monthly = parseFloat(monthlyCost)
      const revenue = parseFloat(expectedRevenue)
      const months = parseInt(timeHorizon)
      const efficiency = parseFloat(efficiencyGain) / 100

      // Cálculos
      const totalCost = investment + (monthly * months)
      const adjustedRevenue = revenue * (1 + efficiency)
      const totalRevenue = adjustedRevenue * months
      const netProfit = totalRevenue - totalCost
      const roiPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0

      // Break-even point
      const monthlyNet = adjustedRevenue - monthly
      const breakEvenMonths = investment > 0 && monthlyNet > 0 ? Math.ceil(investment / monthlyNet) : 0

      // Proyecciones mensuales
      const monthlyProjections = []
      let cumulativeRevenue = 0
      let cumulativeCost = investment

      for (let month = 1; month <= months; month++) {
        cumulativeRevenue += adjustedRevenue
        cumulativeCost += monthly

        monthlyProjections.push({
          month,
          revenue: adjustedRevenue,
          cost: monthly + (month === 1 ? investment : 0),
          net: adjustedRevenue - monthly,
          cumulative: {
            revenue: cumulativeRevenue,
            cost: cumulativeCost,
            profit: cumulativeRevenue - cumulativeCost,
          },
        })
      }

      // Insights y recomendaciones
      const insights = []
      const recommendations = []

      if (roiPercentage > 200) {
        insights.push('Excelente retorno de inversión esperado')
        recommendations.push('Considera escalar este servicio rápidamente')
      } else if (roiPercentage > 100) {
        insights.push('Muy buen retorno de inversión')
        recommendations.push('Procede con la implementación')
      } else if (roiPercentage > 50) {
        insights.push('Retorno positivo moderado')
        recommendations.push('Optimiza costos o aumenta ingresos esperados')
      } else {
        insights.push('El ROI necesita mejora')
        recommendations.push('Revisa el modelo de negocio o reduce costos')
      }

      if (breakEvenMonths <= 3) {
        insights.push('Recuperación muy rápida de la inversión')
      } else if (breakEvenMonths <= 6) {
        insights.push('Recuperación aceptable de la inversión')
      } else if (breakEvenMonths <= 12) {
        insights.push('Recuperación en plazo razonable')
      } else {
        insights.push('La recuperación tomará más tiempo de lo ideal')
      }

      if (efficiency > 50) {
        insights.push('Mejoras de eficiencia significativas')
      }

      const serviceData = serviceTypes.find(s => s.id === selectedService)

      setResults({
        service: serviceData,
        summary: {
          initialInvestment: investment,
          monthlyCost: monthly,
          expectedRevenue: adjustedRevenue,
          timeHorizon: months,
          totalCost,
          totalRevenue,
          netProfit,
          roiPercentage,
          breakEvenMonths,
          efficiencyGain: efficiency * 100,
        },
        projections: monthlyProjections,
        insights,
        recommendations,
        metrics: {
          monthlyGrowthRate: roiPercentage / months,
          profitMargin: (netProfit / totalRevenue) * 100,
          costPerDollarEarned: totalCost / totalRevenue,
        }
      })

      setIsCalculating(false)
    }, 1500)
  }

  const exportResults = () => {
    if (!results) return

    const csvContent = "Month,Revenue,Cost,Net Profit,Cumulative Profit\n" +
      results.projections.map((p: any) =>
        `${p.month},${p.revenue},${p.cost},${p.net},${p.cumulative.profit}`
      ).join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'roi-analysis.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetCalculator = () => {
    setSelectedService("")
    setInitialInvestment("")
    setMonthlyCost("")
    setExpectedRevenue("")
    setTimeHorizon("12")
    setEfficiencyGain("30")
    setResults(null)
  }

  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link href="/herramientas" className="hover:text-primary">Herramientas</Link>
          <span>/</span>
          <span className="text-foreground">Calculadora ROI Servicios IA</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Calculator className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Calculadora ROI para Servicios IA</h1>
            <p className="text-muted-foreground">Calcula el retorno de inversión para servicios de Inteligencia Artificial</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Gratis</Badge>
          <Badge className="bg-blue-100 text-blue-800">Herramienta Analytics</Badge>
          <Badge className="bg-green-100 text-green-800">12K+ Usuarios</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuración */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Configuración del ROI
              </CardTitle>
              <CardDescription>
                Ingresa los datos para calcular el retorno de inversión
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="service">Tipo de Servicio IA</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <span className="flex items-center gap-2">
                          <span>{service.icon}</span>
                          <span>{service.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="investment">Inversión Inicial ($)</Label>
                <Input
                  id="investment"
                  type="number"
                  placeholder="5000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="monthly">Costo Mensual ($)</Label>
                <Input
                  id="monthly"
                  type="number"
                  placeholder="500"
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="revenue">Ingreso Esperado Mensual ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="2000"
                  value={expectedRevenue}
                  onChange={(e) => setExpectedRevenue(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="horizon">Horizonte de Tiempo (meses)</Label>
                <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="efficiency">Ganancia de Eficiencia (%)</Label>
                <div className="space-y-2">
                  <Input
                    id="efficiency"
                    type="range"
                    min="0"
                    max="100"
                    value={efficiencyGain}
                    onChange={(e) => setEfficiencyGain(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0%</span>
                    <span className="font-medium">{efficiencyGain}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={calculateROI}
                  disabled={isCalculating || !selectedService || !initialInvestment || !monthlyCost || !expectedRevenue}
                  className="flex-1"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Calcular ROI
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetCalculator} disabled={isCalculating}>
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Guías rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guías Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">💡 ROI Ideal</h4>
                <p className="text-xs text-muted-foreground">Busca un ROI > 100% en 12 meses</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">⏱️ Break-even</h4>
                <p className="text-xs text-muted-foreground">Recupera inversión en ≤ 6 meses</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">📈 Eficiencia</h4>
                <p className="text-xs text-muted-foreground">Ganancias del 30-50% son realistas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área de resultados */}
        <div className="lg:col-span-2">
          {results ? (
            <div className="space-y-6">
              {/* Resumen de resultados */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {results.service.icon} {results.service.name}
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Download className="h-4 w-4 mr-1" />
                      Exportar CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {results.summary.roiPercentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">ROI Total</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ${results.summary.netProfit.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Ganancia Neta</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {results.summary.breakEvenMonths}
                      </div>
                      <div className="text-sm text-muted-foreground">Meses Break-even</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {results.summary.efficiencyGain.toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Ganancia Eficiencia</div>
                    </div>
                  </div>

                  {/* Progreso de ROI */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Progreso hacia Break-even</span>
                      <span>{Math.min((results.summary.timeHorizon / results.summary.breakEvenMonths) * 100, 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={Math.min((results.summary.timeHorizon / results.summary.breakEvenMonths) * 100, 100)} />
                  </div>

                  {/* Métricas adicionales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Margen de Beneficio</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {results.metrics.profitMargin.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Crecimiento Mensual</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {results.metrics.monthlyGrowthRate.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Costo por $ Ganado</span>
                      </div>
                      <div className="text-2xl font-bold">
                        ${results.metrics.costPerDollarEarned.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs con detalles */}
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="insights" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                      <TabsTrigger value="projections">Proyecciones</TabsTrigger>
                      <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="insights" className="mt-4">
                      <div className="space-y-3">
                        {results.insights.map((insight: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="projections" className="mt-4">
                      <div className="h-96 overflow-y-auto">
                        <div className="space-y-2">
                          {results.projections.map((month: any, index: number) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Mes {month.month}</span>
                                <span className={`font-bold ${month.cumulative.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  ${month.cumulative.profit.toLocaleString()}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Ingreso:</span>
                                  <div className="font-medium">${month.revenue}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Costo:</span>
                                  <div className="font-medium">${month.cost}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Neto:</span>
                                  <div className={`font-medium ${month.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${month.net}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="mt-4">
                      <div className="space-y-3">
                        {results.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Calculadora de ROI</h3>
                  <p className="text-muted-foreground">
                    Configura los parámetros en el panel izquierdo para calcular el retorno de inversión
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}