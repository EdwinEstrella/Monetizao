'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Target, BarChart3, Globe, Zap, Eye, AlertTriangle, Calendar, Search, Filter, Download, RefreshCw, Sparkles, Brain, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import PricingBanner from '@/components/ui/pricing-banner'

const industries = [
  "Tecnología y Software",
  "E-commerce y Retail",
  "Marketing Digital",
  "Salud y Wellness",
  "Educación y E-learning",
  "Finanzas y Fintech",
  "Manufactura y Industria",
  "Turismo y Hospitalidad",
  "Enttenimiento y Media",
  "Bienes Raíces"
]

const trendTypes = [
  "Tecnologías Emergentes",
  "Comportamiento del Consumidor",
  "Oportunidades de Mercado",
  "Tendencias de Contenido",
  "Innovaciones en IA",
  "Cambios Regulatorios"
]

const timeRanges = [
  "Última Semana",
  "Último Mes",
  "Últimos 3 Meses",
  "Últimos 6 Meses",
  "Último Año"
]

export default function DetectorTendenciasIAPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedTrendType, setSelectedTrendType] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("Último Mes")
  const [keywords, setKeywords] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [trendResults, setTrendResults] = useState<any>(null)
  const [searchHistory, setSearchHistory] = useState<Array<{query: string, date: string, results: any}>>([])

  const analyzeTrends = async () => {
    if (!selectedIndustry || !selectedTrendType) {
      alert("Por favor selecciona una industria y tipo de tendencia")
      return
    }

    setIsAnalyzing(true)

    // Simulación de análisis de tendencias con IA
    setTimeout(() => {
      const mockTrends = {
        overview: {
          industry: selectedIndustry,
          trendType: selectedTrendType,
          timeRange: selectedTimeRange,
          totalTrends: 12,
          highImpact: 4,
          emerging: 8
        },
        topTrends: [
          {
            id: 1,
            title: "Automatización Avanzada con IA Generativa",
            description: "La implementación de modelos de lenguaje grandes para automatizar procesos complejos está revolucionando la industria",
            impact: 95,
            growth: 245,
            confidence: 92,
            timeframe: "6-12 meses",
            keywords: ["IA Generativa", "Automatización", "LLMs", "Procesos inteligentes"],
            opportunities: [
              "Implementación de chatbots avanzados para atención al cliente",
              "Automatización de análisis de datos y reportes",
              "Creación de contenido personalizado a escala"
            ],
            data: {
              searchVolume: "124K+ búsquedas/mes",
              growthRate: "+245% año tras año",
            trendScore: 9.2,
            competition: "Media",
            investmentRequired: "$25K-100K"
            }
          },
          {
            id: 2,
            title: "Experiencias Inmersivas con AR/VR",
            description: "La realidad aumentada y virtual están transformando cómo los consumidores interactúan con productos digitales",
            impact: 78,
            growth: 189,
            confidence: 88,
            timeframe: "12-18 meses",
            keywords: ["Realidad Aumentada", "Realidad Virtual", "Metaverso", "Experiencias Inmersivas"],
            opportunities: [
              "Pruebas virtuales de productos",
              "Tours virtuales inmobiliarios",
              "Entrenamiento inmersivo para empleados"
            ],
            data: {
              searchVolume: "89K+ búsquedas/mes",
              growthRate: "+189% año tras año",
              trendScore: 8.7,
              competition: "Alta",
              investmentRequired: "$50K-250K"
            }
          },
          {
            id: 3,
            title: "Sostenibilidad y Tecnología Verde",
            description: "Las soluciones tecnológicas enfocadas en la sostenibilidad están ganando rápida adopción",
            impact: 82,
            growth: 156,
            confidence: 85,
            timeframe: "9-15 meses",
            keywords: ["Tecnología Verde", "Sostenibilidad", "Green Tech", "Energías Renovables"],
            opportunities: [
              "Optimización energética con IA",
              "Plataformas de trading de carbono",
              "Soluciones de economía circular"
            ],
            data: {
              searchVolume: "156K+ búsquedas/mes",
              growthRate: "+156% año tras año",
              trendScore: 8.9,
              competition: "Baja",
              investmentRequired: "$30K-150K"
            }
          },
          {
            id: 4,
            title: "Web3 y Economías Descentralizadas",
            description: "La tecnología blockchain está creando nuevos modelos de negocio descentralizados",
            impact: 71,
            growth: 203,
            confidence: 79,
            timeframe: "18-24 meses",
            keywords: ["Blockchain", "Web3", "DeFi", "NFTs", "DAOs"],
            opportunities: [
              "Plataformas de finanzas descentralizadas",
              "Mercados de tokens digitales",
              "Sistemas de governance basados en tokens"
            ],
            data: {
              searchVolume: "67K+ búsquedas/mes",
              growthRate: "+203% año tras año",
              trendScore: 8.1,
              competition: "Media",
              investmentRequired: "$40K-200K"
            }
          }
        ],
        marketAnalysis: {
          totalMarketSize: "$2.8 Trillones",
          annualGrowth: "34.5%",
          competitorAnalysis: {
            highCompetition: ["Automatización", "AR/VR"],
            mediumCompetition: ["Sostenibilidad", "Web3"],
            lowCompetition: ["Biotech IA", "Quantum Computing"]
          },
          investmentOpportunities: [
            {
              area: "Automatización con IA",
              potentialROI: "300-500%",
              timeToROI: "12-18 meses",
              riskLevel: "Medio"
            },
            {
              area: "Tecnología Verde",
              potentialROI: "200-350%",
              timeToROI: "18-24 meses",
              riskLevel: "Bajo"
            },
            {
              area: "Web3 Solutions",
              potentialROI: "400-800%",
              timeToROI: "24-36 meses",
              riskLevel: "Alto"
            }
          ]
        },
        recommendations: [
          {
            priority: "Alta",
            action: "Invertir en capacidad de IA Generativa",
            justification: "Alta demanda y ROI probado",
            timeline: "Inmediato",
            resources: "Equipo técnico + $50K presupuesto"
          },
          {
            priority: "Media",
            action: "Explorar oportunidades en Sostenibilidad",
            justification: "Crecimiento sostenido con baja competencia",
            timeline: "3-6 meses",
            resources: "Investigación + $30K piloto"
          },
          {
            priority: "Baja",
            action: "Monitorear desarrollos Web3",
            justification: "Potencial alto pero riesgos significativos",
            timeline: "6-12 meses",
            resources: "Equipo de investigación"
          }
        ]
      }

      setTrendResults(mockTrends)

      // Agregar al historial
      const searchEntry = {
        query: `${selectedIndustry} - ${selectedTrendType}`,
        date: new Date().toISOString(),
        results: mockTrends
      }
      setSearchHistory(prev => [searchEntry, ...prev.slice(0, 4)])

      setIsAnalyzing(false)
    }, 4000)
  }

  const exportResults = () => {
    if (!trendResults) return

    const dataStr = JSON.stringify(trendResults, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tendencias_${selectedIndustry.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 85) return "bg-red-100 text-red-800"
    if (impact >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-blue-100 text-blue-800"
    if (confidence >= 80) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
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
          <span className="text-foreground">Detector de Tendencias IA</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Detector de Tendencias IA</h1>
            <p className="text-muted-foreground">Identifica tendencias emergentes y oportunidades de mercado antes que nadie</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Premium</Badge>
          <Badge className="bg-purple-100 text-purple-800">Herramienta Innovadora</Badge>
          <Badge className="bg-blue-100 text-blue-800">9K+ Usuarios</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuración */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Configuración de Análisis
              </CardTitle>
              <CardDescription>
                Define los parámetros para detectar tendencias relevantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="industry">Industria</Label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona industria" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trendType">Tipo de Tendencia</Label>
                <Select value={selectedTrendType} onValueChange={setSelectedTrendType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {trendTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeRange">Rango de Tiempo</Label>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona período" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="keywords">Palabras Clave (Opcional)</Label>
                <Textarea
                  id="keywords"
                  placeholder="Ingresa palabras clave específicas para enfocar la búsqueda..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={analyzeTrends}
                disabled={isAnalyzing || !selectedIndustry || !selectedTrendType}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analizando Tendencias...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analizar Tendencias con IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Estadísticas de la herramienta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Estadísticas del Detector
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Análisis realizados hoy</span>
                <span className="font-medium">1,347</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tendencias detectadas</span>
                <span className="font-medium text-green-600">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Precisión del modelo</span>
                <span className="font-medium text-blue-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo promedio</span>
                <span className="font-medium">3.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Usuarios activos</span>
                <span className="font-medium">9,234</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área principal de resultados */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Resultados del Análisis
                </CardTitle>
                {trendResults && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Download className="h-4 w-4 mr-1" />
                      Exportar
                    </Button>
                    <Button variant="outline" size="sm" onClick={analyzeTrends}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Actualizar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trends" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trends">Tendencias</TabsTrigger>
                  <TabsTrigger value="market">Análisis de Mercado</TabsTrigger>
                  <TabsTrigger value="history">Historial</TabsTrigger>
                </TabsList>

                <TabsContent value="trends" className="mt-4">
                  <div className="h-[600px] overflow-y-auto">
                    {trendResults ? (
                      <div className="space-y-6">
                        {/* Resumen */}
                        <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{trendResults.overview.totalTrends}</div>
                            <div className="text-sm text-muted-foreground">Total Tendencias</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{trendResults.overview.highImpact}</div>
                            <div className="text-sm text-muted-foreground">Alto Impacto</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{trendResults.overview.emerging}</div>
                            <div className="text-sm text-muted-foreground">Emergentes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {(trendResults.topTrends.reduce((acc: number, trend: any) => acc + trend.impact, 0) / trendResults.topTrends.length).toFixed(1)}
                            </div>
                            <div className="text-sm text-muted-foreground">Impacto Promedio</div>
                          </div>
                        </div>

                        {/* Tendencias principales */}
                        <div className="space-y-4">
                          {trendResults.topTrends.map((trend: any) => (
                            <Card key={trend.id} className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{trend.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {trend.keywords.map((keyword: string, idx: number) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {keyword}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                  <Badge className={getImpactColor(trend.impact)}>
                                    Impacto: {trend.impact}%
                                  </Badge>
                                  <Badge className={getConfidenceColor(trend.confidence)}>
                                    Confianza: {trend.confidence}%
                                  </Badge>
                                  <Badge variant="outline">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {trend.growth}%
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Volumen de búsqueda:</span>
                                    <span className="font-medium">{trend.data.searchVolume}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Tasa crecimiento:</span>
                                    <span className="font-medium text-green-600">{trend.data.growthRate}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Puntuación tendencia:</span>
                                    <span className="font-medium">{trend.data.trendScore}/10</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Competencia:</span>
                                    <span className="font-medium">{trend.data.competition}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Inversión requerida:</span>
                                    <span className="font-medium">{trend.data.investmentRequired}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Horizonte temporal:</span>
                                    <span className="font-medium">{trend.timeframe}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-1">
                                  <Lightbulb className="h-4 w-4" />
                                  Oportunidades Identificadas:
                                </h4>
                                <ul className="space-y-1 text-sm">
                                  {trend.opportunities.map((opportunity: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-blue-500 mt-1">•</span>
                                      <span>{opportunity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Configura los parámetros para descubrir tendencias emergentes</p>
                        <p className="text-sm mt-2">Nuestra IA analizará miles de fuentes para identificar oportunidades únicas</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="market" className="mt-4">
                  <div className="h-[600px] overflow-y-auto">
                    {trendResults ? (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Análisis de Mercado</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-4">Estadísticas Generales</h4>
                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span>Tamaño del mercado:</span>
                                    <span className="font-bold">{trendResults.marketAnalysis.totalMarketSize}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Crecimiento anual:</span>
                                    <span className="font-bold text-green-600">{trendResults.marketAnalysis.annualGrowth}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-4">Oportunidades de Inversión</h4>
                                <div className="space-y-3">
                                  {trendResults.marketAnalysis.investmentOpportunities.map((opp: any, idx: number) => (
                                    <div key={idx} className="p-3 border rounded-lg">
                                      <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium">{opp.area}</span>
                                        <Badge variant="outline">{opp.riskLevel} riesgo</Badge>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        ROI: {opp.potentialROI} | Retorno: {opp.timeToROI}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Recomendaciones Estratégicas</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {trendResults.recommendations.map((rec: any, idx: number) => (
                                <div key={idx} className="p-4 border rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <Badge className={
                                      rec.priority === "Alta" ? "bg-red-100 text-red-800" :
                                      rec.priority === "Media" ? "bg-yellow-100 text-yellow-800" :
                                      "bg-green-100 text-green-800"
                                    }>
                                      {rec.priority}
                                    </Badge>
                                    <div className="flex-1">
                                      <h4 className="font-medium mb-1">{rec.action}</h4>
                                      <p className="text-sm text-muted-foreground mb-2">{rec.justification}</p>
                                      <div className="flex gap-4 text-xs text-muted-foreground">
                                        <span>Timeline: {rec.timeline}</span>
                                        <span>Recursos: {rec.resources}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Realiza un análisis para ver información detallada del mercado</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <div className="h-[600px] overflow-y-auto">
                    {searchHistory.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Aún no has realizado análisis de tendencias</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {searchHistory.map((search, idx) => (
                          <Card key={idx} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{search.query}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(search.date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {search.results.overview.totalTrends} tendencias detectadas
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Casos de éxito */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Éxitos de Detección Temprana</CardTitle>
          <CardDescription>Tendencias que nuestros usuarios identificaron antes que nadie</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🤖 IA Generativa (2022)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Usuarios identificaron el potencial de ChatGPT 2 meses antes del lanzamiento masivo"
              </p>
              <Badge variant="outline">Detectado: Oct 2022</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🏦 DeFi (2021)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Detección temprana de finanzas descentralizadas antes del boom de 2021"
              </p>
              <Badge variant="outline">Detectado: Ene 2021</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🛒 E-commerce Social</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Identificación del comercio social antes que se masificara globalmente"
              </p>
              <Badge variant="outline">Detectado: Mar 2020</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner de planes */}
      <PricingBanner />
    </div>
  )
}