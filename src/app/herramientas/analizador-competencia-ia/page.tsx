'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Search,
  Target,
  TrendingUp,
  Users,
  Globe,
  Eye,
  BarChart3,
  Copy,
  RefreshCw,
  Download,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'

const niches = [
  "E-commerce",
  "Marketing Digital",
  "Servicios Freelance",
  "Software SaaS",
  "Contenido Digital",
  "Consultoría",
  "Educación Online",
  "Salud y Bienestar"
]

const analysisDepth = [
  { value: 'basic', name: 'Básico', description: 'Análisis superficial rápido' },
  { value: 'detailed', name: 'Detallado', description: 'Análisis completo con métricas' },
  { value: 'comprehensive', name: 'Integral', description: 'Análisis profundo con estrategias' }
]

const focusAreas = [
  "Análisis de Precios",
  "Estrategias de Marketing",
  "Contenido y SEO",
  "Experiencia de Usuario",
  "Modelos de Negocio",
  "Redes Sociales",
  "Tecnología y Herramientas"
]

export default function AnalizadorCompetenciaIAPage() {
  const [niche, setNiche] = useState("")
  const [competitors, setCompetitors] = useState("")
  const [depth, setDepth] = useState("detailed")
  const [focus, setFocus] = useState("")
  const [customUrl, setCustomUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const analyzeCompetition = async () => {
    if (!niche || !competitors) {
      alert("Por favor ingresa el nicho y los competidores")
      return
    }

    setIsAnalyzing(true)

    // Simulación del análisis
    setTimeout(() => {
      const competitorList = competitors.split(',').map(c => c.trim())

      // Análisis simulado
      const mockAnalysis = {
        niche,
        competitors: competitorList,
        analysis: {
          marketSize: Math.floor(Math.random() * 900000) + 100000,
          growthRate: Math.floor(Math.random() * 30) + 5,
          competitionLevel: depth === 'basic' ? 'Media' : depth === 'detailed' ? 'Alta' : 'Muy Alta',
          averagePrice: Math.floor(Math.random() * 500) + 50,
          marketTrends: [
            "Creciente adopción de IA en el sector",
            "Demandas de servicios personalizados",
            "Mayor enfoque en experiencia del cliente",
            "Expansión a mercados internacionales"
          ],
          opportunities: [
            "Nichos desatendidos dentro del mercado principal",
            "Precios premium por valor añadido",
            "Servicios de consultoría especializada",
            "Plataformas de automatización"
          ],
          threats: [
            "Nuevos entrantes con tecnología superior",
            "Cambios regulatorios potenciales",
            "Comoditización de servicios básicos",
            "Mayores requisitos de certificación"
          ]
        },
        competitorAnalysis: competitorList.map((competitor, index) => ({
          name: competitor,
          url: `https://www.${competitor.toLowerCase().replace(/\s+/g, '')}.com`,
          strengths: [
            "Fuerte presencia en redes sociales",
            "Precios competitivos",
            "Servicio al cliente excelente",
            "Tecnología avanzada"
          ].slice(0, Math.floor(Math.random() * 3) + 2),
          weaknesses: [
            "Tiempo de respuesta lento",
            "Interfaz desactualizada",
            "Precios poco flexibles",
            "Soporte técnico limitado"
          ].slice(0, Math.floor(Math.random() * 2) + 1),
          marketShare: Math.floor(Math.random() * 20) + 5,
          pricingStrategy: index % 2 === 0 ? 'Premium' : 'Competitive',
          uniqueValue: [
            "Experiencia 10+ años en el sector",
            "Tecnología propietaria única",
            "Equipo experto certificado",
            "Garantía de resultados"
          ][index % 4]
        })),
        recommendations: [
          `Enfócate en ${focus || 'diferenciación por calidad'} para destacar`,
          "Desarrollar estrategias de contenido para posicionamiento de marca",
          "Implementar modelo de precios escalonados",
          "Crear programas de lealtad para retención de clientes",
          "Explorar alianzas estratégicas con complementarios",
          "Invertir en tecnología para automatizar procesos",
          "Desarrollar propuesta de valor única y comunicarla claramente"
        ].slice(0, depth === 'comprehensive' ? 7 : 4),
        marketGaps: [
          "Servicios para PYMES con presupuesto limitado",
          "Soluciones especializadas para industrias específicas",
          "Planes de suscripción con diferentes niveles",
          "Servicios consultivos con implementación",
          "Herramientas DIY con asesoría experta"
        ]
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 4000)
  }

  const downloadReport = () => {
    if (!analysis) return

    const reportContent = `
ANÁLISIS DE COMPETENCIA - ${analysis.niche.toUpperCase()}

ANÁLISIS DE MERCADO:
- Tamaño del mercado: $${analysis.analysis.marketSize.toLocaleString()}
- Tasa de crecimiento: ${analysis.analysis.growthRate}%
- Nivel de competencia: ${analysis.analysis.competitionLevel}
- Precio promedio: $${analysis.analysis.averagePrice}

TENDENCIAS DEL MERCADO:
${analysis.analysis.marketTrends.map(t => `• ${t}`).join('\n')}

OPORTUNIDADES IDENTIFICADAS:
${analysis.analysis.opportunities.map(o => `• ${o}`).join('\n')}

ANÁLISIS DE COMPETIDORES:
${analysis.competitorAnalysis.map((comp: any) => `
${comp.name}:
• Cuota de mercado: ${comp.marketShare}%
• Estrategia de precios: ${comp.pricingStrategy}
• Valor único: ${comp.uniqueValue}
• Fortalezas: ${comp.strengths.join(', ')}
• Debilidades: ${comp.weaknesses.join(', ')}
`).join('\n')}

RECOMENDACIONES ESTRATÉGICAS:
${analysis.recommendations.map(r => `• ${r}`).join('\n')}

GAPS DE MERCADO:
${analysis.marketGaps.map(g => `• ${g}`).join('\n')}
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'competitor-analysis.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetAnalyzer = () => {
    setNiche("")
    setCompetitors("")
    setDepth("detailed")
    setFocus("")
    setCustomUrl("")
    setAnalysis(null)
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
          <span className="text-foreground">Analizador de Competencia IA</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Target className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Analizador de Competencia IA</h1>
            <p className="text-muted-foreground">Analiza tu competencia y encuentra oportunidades de monetización</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Premium</Badge>
          <Badge className="bg-red-100 text-red-800">Herramienta Análisis</Badge>
          <Badge className="bg-blue-100 text-blue-800">8K+ Usuarios</Badge>
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
                Define los parámetros para analizar tu competencia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="niche">Nichos de Mercado</Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un nicho" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="competitors">Competidores (separados por coma)</Label>
                <Textarea
                  id="competitors"
                  placeholder="Competidor 1, Competidor 2, Competidor 3..."
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="depth">Profundidad del Análisis</Label>
                <Select value={depth} onValueChange={setDepth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisDepth.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="focus">Área de Enfoque</Label>
                <Select value={focus} onValueChange={setFocus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona área de enfoque" />
                  </SelectTrigger>
                  <SelectContent>
                    {focusAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="url">URL Personalizada (Opcional)</Label>
                <Input
                  id="url"
                  placeholder="https://ejemplo.com"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={analyzeCompetition}
                  disabled={isAnalyzing || !niche || !competitors}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analizar Competencia
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetAnalyzer} disabled={isAnalyzing}>
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Métricas de la herramienta */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capacidades del Análisis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-blue-500" />
                <span>Análisis web y SEO</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-green-500" />
                <span>Análisis de redes sociales</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4 text-purple-500" />
                <span>Monitoreo de precios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Tendencias de mercado</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área de resultados */}
        <div className="lg:col-span-2">
          {analysis ? (
            <div className="space-y-6">
              {/* Resumen del mercado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Análisis de Mercado - {analysis.niche}
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={downloadReport}>
                      <Download className="h-4 w-4 mr-1" />
                      Descargar Reporte
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        ${(analysis.analysis.marketSize / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-muted-foreground">Tamaño Mercado</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        +{analysis.analysis.growthRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">Crecimiento Anual</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        ${analysis.analysis.averagePrice}
                      </div>
                      <div className="text-sm text-muted-foreground">Precio Promedio</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {analysis.competitorAnalysis.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Competidores</div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Nivel de Competencia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={
                          analysis.analysis.competitionLevel === 'Media' ? 50 :
                          analysis.analysis.competitionLevel === 'Alta' ? 75 : 90
                        }
                        className="flex-1"
                      />
                      <span className="text-sm font-medium min-w-[80px]">
                        {analysis.analysis.competitionLevel}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs con análisis detallado */}
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="competitors" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="competitors">Competidores</TabsTrigger>
                      <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
                      <TabsTrigger value="trends">Tendencias</TabsTrigger>
                      <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="competitors" className="mt-4">
                      <div className="space-y-4">
                        {analysis.competitorAnalysis.map((competitor: any, index: number) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium">{competitor.name}</h4>
                                <Badge variant={index % 2 === 0 ? "default" : "secondary"}>
                                  {competitor.marketShare}% Cuota
                                </Badge>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div>
                                  <div className="text-sm text-muted-foreground mb-1">Fortalezas</div>
                                  <ul className="text-sm space-y-1">
                                    {competitor.strengths.map((strength: string, i: number) => (
                                      <li key={i} className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        {strength}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground mb-1">Debilidades</div>
                                  <ul className="text-sm space-y-1">
                                    {competitor.weaknesses.map((weakness: string, i: number) => (
                                      <li key={i} className="flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                                        {weakness}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {competitor.pricingStrategy}
                                </span>
                                <span className="text-muted-foreground">
                                  Valor único: {competitor.uniqueValue}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="opportunities" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-3">Oportunidades Identificadas</h3>
                          <div className="space-y-2">
                            {analysis.analysis.opportunities.map((opportunity: string, index: number) => (
                              <div key={index} className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm">{opportunity}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Gaps de Mercado</h3>
                          <div className="space-y-2">
                            {analysis.marketGaps.map((gap: string, index: number) => (
                              <div key={index} className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm">{gap}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="trends" className="mt-4">
                      <div className="space-y-3">
                        <h3 className="font-medium">Tendencias del Mercado</h3>
                        {analysis.analysis.marketTrends.map((trend: string, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <p className="text-sm">{trend}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="mt-4">
                      <div className="space-y-3">
                        <h3 className="font-medium">Recomendaciones Estratégicas</h3>
                        {analysis.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="p-3 bg-purple-50 rounded-lg">
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
                  <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Analizador de Competencia</h3>
                  <p className="text-muted-foreground">
                    Configura los parámetros en el panel izquierdo para analizar tu competencia
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