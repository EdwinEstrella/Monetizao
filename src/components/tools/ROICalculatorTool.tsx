'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calculator, TrendingUp, DollarSign, Calendar, BarChart3, Download, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ROIResult {
  summary: {
    initialInvestment: number
    monthlyCost: number
    expectedRevenue: number
    timeHorizon: number
    totalCost: number
    totalRevenue: number
    netProfit: number
    roiPercentage: number
    breakEvenMonths: number
    efficiencyGain: number
  }
  projections: Array<{
    month: number
    revenue: number
    cost: number
    cumulative: {
      revenue: number
      cost: number
      profit: number
    }
  }>
  insights: string[]
  recommendations: string[]
}

export function ROICalculatorTool() {
  const [formData, setFormData] = useState({
    serviceType: '',
    initialInvestment: '',
    monthlyCost: '',
    expectedRevenue: '',
    timeHorizon: '',
    efficiencyGain: '',
  })

  const [result, setResult] = useState<ROIResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { toast } = useToast()

  const serviceTypes = [
    { value: 'automation', label: 'Automatización de Procesos' },
    { value: 'ai-consulting', label: 'Consultoría IA' },
    { value: 'chatbot', label: 'Chatbot/Asistente Virtual' },
    { value: 'analytics', label: 'Análisis de Datos IA' },
    { value: 'content-ai', label: 'Generación de Contenido' },
    { value: 'prediction', label: 'Predicción y Forecasting' },
    { value: 'custom-ai', label: 'Solución IA Personalizada' },
  ]

  const predefinedScenarios = [
    {
      name: 'Automatización Básica',
      serviceType: 'automation',
      initialInvestment: 5000,
      monthlyCost: 500,
      expectedRevenue: 2000,
      timeHorizon: 12,
      efficiencyGain: 30
    },
    {
      name: 'Chatbot Empresarial',
      serviceType: 'chatbot',
      initialInvestment: 15000,
      monthlyCost: 1000,
      expectedRevenue: 5000,
      timeHorizon: 24,
      efficiencyGain: 60
    },
    {
      name: 'Analytics IA',
      serviceType: 'analytics',
      initialInvestment: 10000,
      monthlyCost: 800,
      expectedRevenue: 3500,
      timeHorizon: 18,
      efficiencyGain: 45
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const loadScenario = (scenario: any) => {
    setFormData({
      serviceType: scenario.serviceType,
      initialInvestment: scenario.initialInvestment.toString(),
      monthlyCost: scenario.monthlyCost.toString(),
      expectedRevenue: scenario.expectedRevenue.toString(),
      timeHorizon: scenario.timeHorizon.toString(),
      efficiencyGain: scenario.efficiencyGain.toString(),
    })
    toast({
      title: "Escenario cargado",
      description: `Valores de "${scenario.name}" aplicados`,
    })
  }

  const calculateROI = async () => {
    // Validar campos
    const requiredFields = ['serviceType', 'initialInvestment', 'monthlyCost', 'expectedRevenue', 'timeHorizon', 'efficiencyGain']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)

    try {
      const data = {
        serviceType: formData.serviceType,
        initialInvestment: parseFloat(formData.initialInvestment),
        monthlyCost: parseFloat(formData.monthlyCost),
        expectedRevenue: parseFloat(formData.expectedRevenue),
        timeHorizon: parseInt(formData.timeHorizon),
        efficiencyGain: parseFloat(formData.efficiencyGain),
      }

      // Llamar a la API real
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'calculate-roi',
          ...data
        })
      })

      if (response.ok) {
        const apiResult = await response.json()
        if (apiResult.success) {
          setResult(apiResult.data)
        } else {
          throw new Error(apiResult.error)
        }
      } else {
        throw new Error('Error en la API')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo calcular el ROI. Usando cálculo local.",
        variant: "destructive",
      })

      // Cálculo de respaldo
      const localResult = calculateROILocal({
        serviceType: formData.serviceType,
        initialInvestment: parseFloat(formData.initialInvestment),
        monthlyCost: parseFloat(formData.monthlyCost),
        expectedRevenue: parseFloat(formData.expectedRevenue),
        timeHorizon: parseInt(formData.timeHorizon),
        efficiencyGain: parseFloat(formData.efficiencyGain),
      })
      setResult(localResult)
    } finally {
      setIsCalculating(false)
    }
  }

  const calculateROILocal = (data: any): ROIResult => {
    const {
      serviceType,
      initialInvestment,
      monthlyCost,
      expectedRevenue,
      timeHorizon,
      efficiencyGain
    } = data

    const totalCost = initialInvestment + (monthlyCost * timeHorizon)
    const efficiencyMultiplier = 1 + (efficiencyGain / 100)
    const adjustedRevenue = expectedRevenue * efficiencyMultiplier
    const totalRevenue = adjustedRevenue * timeHorizon
    const netProfit = totalRevenue - totalCost
    const roiPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0

    const monthlyNet = adjustedRevenue - monthlyCost
    const breakEvenMonths = initialInvestment > 0 && monthlyNet > 0
      ? Math.ceil(initialInvestment / monthlyNet)
      : 0

    const monthlyProjections = []
    let cumulativeRevenue = 0
    let cumulativeCost = initialInvestment

    for (let month = 1; month <= timeHorizon; month++) {
      cumulativeRevenue += adjustedRevenue
      cumulativeCost += monthlyCost

      monthlyProjections.push({
        month,
        revenue: adjustedRevenue,
        cost: monthlyCost + (month === 1 ? initialInvestment : 0),
        cumulative: {
          revenue: cumulativeRevenue,
          cost: cumulativeCost,
          profit: cumulativeRevenue - cumulativeCost,
        },
      })
    }

    const insights = []
    const recommendations = []

    if (roiPercentage > 100) {
      insights.push('Excelente retorno de inversión esperado')
    } else if (roiPercentage > 50) {
      insights.push('Buen retorno de inversión esperado')
    } else if (roiPercentage > 0) {
      insights.push('Retorno de inversión positivo pero moderado')
    } else {
      insights.push('Se necesita revisar la viabilidad del proyecto')
    }

    if (breakEvenMonths <= 6) {
      insights.push('Recuperación rápida de la inversión inicial')
    } else if (breakEvenMonths <= 12) {
      insights.push('Recuperación de inversión en plazo razonable')
    } else if (breakEvenMonths > 0) {
      insights.push('La recuperación de la inversión tomará más tiempo')
    }

    if (efficiencyGain > 50) {
      insights.push('Mejoras significativas en eficiencia esperadas')
    } else if (efficiencyGain > 20) {
      insights.push('Mejoras moderadas en eficiencia')
    }

    if (roiPercentage < 50) {
      recommendations.push('Considera optimizar costos o aumentar ingresos esperados')
      recommendations.push('Evalúa alternativas de servicios con mejor ROI')
    }

    if (efficiencyGain < 30) {
      recommendations.push('Busca soluciones que ofrezcan mayor ganancia de eficiencia')
      recommendations.push('Considera capacitación adicional para maximizar beneficios')
    }

    if (serviceType.includes('automation')) {
      recommendations.push('Implementa gradualmente para minimizar riesgos')
      recommendations.push('Mide KPIs específicos para validar ganancias de eficiencia')
    }

    return {
      summary: {
        initialInvestment,
        monthlyCost,
        expectedRevenue: adjustedRevenue,
        timeHorizon,
        totalCost,
        totalRevenue,
        netProfit,
        roiPercentage,
        breakEvenMonths,
        efficiencyGain,
      },
      projections: monthlyProjections,
      insights,
      recommendations,
    }
  }

  const resetCalculator = () => {
    setFormData({
      serviceType: '',
      initialInvestment: '',
      monthlyCost: '',
      expectedRevenue: '',
      timeHorizon: '',
      efficiencyGain: '',
    })
    setResult(null)
  }

  const exportResults = () => {
    if (!result) return

    const csvContent = [
      ['Mes', 'Ingresos', 'Costos', 'Beneficio Acumulado'],
      ...result.projections.map(p => [
        p.month,
        p.revenue.toFixed(2),
        p.cost.toFixed(2),
        p.cumulative.profit.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'roi-analysis.csv'
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "¡Exportado!",
      description: "Los resultados han sido descargados",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  const getROIStatus = (roi: number) => {
    if (roi > 100) return { label: 'Excelente', color: 'bg-green-500' }
    if (roi > 50) return { label: 'Bueno', color: 'bg-blue-500' }
    if (roi > 0) return { label: 'Positivo', color: 'bg-yellow-500' }
    return { label: 'Revisar', color: 'bg-red-500' }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculadora de ROI para Servicios IA
        </CardTitle>
        <CardDescription>
          Calcula el retorno de inversión para servicios de inteligencia artificial
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="scenarios">Escenarios</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Quick Scenarios */}
            <div className="grid gap-3">
              <Label className="text-sm font-medium">Escenarios Rápidos</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {predefinedScenarios.map((scenario) => (
                  <Button
                    key={scenario.name}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-start"
                    onClick={() => loadScenario(scenario)}
                  >
                    <div className="font-medium">{scenario.name}</div>
                    <div className="text-xs text-gray-500">
                      ROI estimado: {((scenario.expectedRevenue * (1 + scenario.efficiencyGain/100) * scenario.timeHorizon - (scenario.initialInvestment + scenario.monthlyCost * scenario.timeHorizon)) / (scenario.initialInvestment + scenario.monthlyCost * scenario.timeHorizon) * 100).toFixed(1)}%
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Calculator Form */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Tipo de Servicio</Label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialInvestment">Inversión Inicial (€)</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  placeholder="10000"
                  value={formData.initialInvestment}
                  onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyCost">Costo Mensual (€)</Label>
                <Input
                  id="monthlyCost"
                  type="number"
                  placeholder="500"
                  value={formData.monthlyCost}
                  onChange={(e) => handleInputChange('monthlyCost', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedRevenue">Ingresos Esperados Mensuales (€)</Label>
                <Input
                  id="expectedRevenue"
                  type="number"
                  placeholder="2000"
                  value={formData.expectedRevenue}
                  onChange={(e) => handleInputChange('expectedRevenue', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeHorizon">Horizonte de Tiempo (meses)</Label>
                <Input
                  id="timeHorizon"
                  type="number"
                  placeholder="12"
                  value={formData.timeHorizon}
                  onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiencyGain">Ganancia de Eficiencia (%)</Label>
                <Input
                  id="efficiencyGain"
                  type="number"
                  placeholder="30"
                  min="0"
                  max="100"
                  value={formData.efficiencyGain}
                  onChange={(e) => handleInputChange('efficiencyGain', e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={calculateROI}
                disabled={isCalculating}
                className="flex-1"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular ROI
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {result ? (
              <>
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">ROI Total</div>
                          <div className="text-2xl font-bold">
                            {result.summary.roiPercentage.toFixed(1)}%
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {getROIStatus(result.summary.roiPercentage).label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Beneficio Neto</div>
                          <div className="text-2xl font-bold">
                            {formatCurrency(result.summary.netProfit)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="text-sm text-gray-600">Break-even</div>
                          <div className="text-2xl font-bold">
                            {result.summary.breakEvenMonths > 0 ? `${result.summary.breakEvenMonths} meses` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-orange-600" />
                        <div>
                          <div className="text-sm text-gray-600">Total Invertido</div>
                          <div className="text-2xl font-bold">
                            {formatCurrency(result.summary.totalCost)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ROI Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso ROI</span>
                    <span>{result.summary.roiPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(result.summary.roiPercentage, 200)} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>100%</span>
                    <span>200%+</span>
                  </div>
                </div>

                {/* Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insights Clave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recomendaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={exportResults} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Resultados
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin resultados aún</h3>
                <p className="text-gray-600">Usa la calculadora para ver el análisis de ROI</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}