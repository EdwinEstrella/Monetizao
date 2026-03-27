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
import { Progress } from '@/components/ui/progress'
import {
  FileText,
  Sparkles,
  Target,
  Copy,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

const contentTypes = [
  { id: 'blog', name: 'Artículo de Blog', icon: '📝' },
  { id: 'social', name: 'Post Redes Sociales', icon: '📱' },
  { id: 'email', name: 'Email Marketing', icon: '📧' },
  { id: 'sales', name: 'Página de Ventas', icon: '💰' },
  { id: 'product', name: 'Descripción de Producto', icon: '🛍️' },
  { id: 'landing', name: 'Landing Page', icon: '🎯' },
  { id: 'video', name: 'Guion para Video', icon: '🎬' },
  { id: 'press', name: 'Comunicado de Prensa', icon: '📰' }
]

const optimizationGoals = [
  "Mejorar SEO y posicionamiento",
  "Aumentar conversiones y ventas",
  "Mejorar legibilidad y claridad",
  "Optimizar para redes sociales",
  "Mejorar tono y estilo",
  "Aumentar engagement",
  "Optimizar para móviles",
  "Mejorar estructura organizativa"
]

export default function OptimizadorContenidoIAPage() {
  const [contentType, setContentType] = useState("")
  const [targetKeyword, setTargetKeyword] = useState("")
  const [secondaryKeywords, setSecondaryKeywords] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [optimizationGoal, setOptimizationGoal] = useState("")
  const [originalContent, setOriginalContent] = useState("")
  const [optimizedContent, setOptimizedContent] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [comparison, setComparison] = useState<any>(null)

  const optimizeContent = async () => {
    if (!originalContent.trim()) {
      alert("Por favor ingresa el contenido original")
      return
    }

    setIsOptimizing(true)

    // Simulación del análisis y optimización
    setTimeout(() => {
      // Análisis del contenido original
      const originalAnalysis = {
        wordCount: originalContent.split(/\s+/).length,
        readabilityScore: Math.floor(Math.random() * 40) + 40,
        seoScore: Math.floor(Math.random() * 30) + 50,
        keywordDensity: Math.floor(Math.random() * 2) + 1,
        structureScore: Math.floor(Math.random() * 30) + 60,
        engagementPotential: Math.floor(Math.random() * 40) + 40
      }

      // Contenido optimizado (simulación)
      const optimized = `
${contentType ? `<!-- ${contentTypes.find(ct => ct.id === contentType)?.icon} Optimizado para ${contentTypes.find(ct => ct.id === contentType)?.name} -->` : ''}

# ${targetKeyword ? `Título Optimizado: ${targetKeyword.toUpperCase()}` : 'Título Optimizado para Máximo Impacto'}

## Introducción Magnética
${targetKeyword ? `Descubre todo sobre ${targetKeyword.toLowerCase()} y cómo transformar tu estrategia. ` : ''}Este contenido ha sido cuidadosamente optimizado para ${targetAudience ? `alcance máximo con ${targetAudience.toLowerCase()}` : 'tu público objetivo'}.

## Contenido Principal Estructurado

### 🎯 Puntos Clave

1. **Fundamentos Esenciales**
${originalContent.slice(0, 200)}... (optimizado para ${targetKeyword || 'mejor rendimiento'})

2. **Estrategias Comprobadas**
${targetKeyword ? `Las mejores prácticas para ${targetKeyword.toLowerCase()} incluyen:` : ''}
   - ✅ Implementación inmediata
   - ✅ Resultados medibles
   - ✅ Escalabilidad garantizada
   - ✅ ROI optimizado

### 💡 Insights Valiosos

${targetKeyword ? `Cuando hablamos de ${targetKeyword.toLowerCase()}, es crucial entender que:` : ''}

${originalContent.slice(200, 600)}... (mejorado con lenguaje persuasivo y claro)

## Conclusión Accionable

${targetKeyword ? `En resumen, implementar estrategias de ${targetKeyword.toLowerCase()} puede transformar completamente tus resultados.` : ''}
${targetAudience ? `Para ${targetAudience.toLowerCase()}, este enfoque ofrece resultados inmediatos y sostenibles.` : ''}

### 🚀 Próximos Pasos

- [ ] Analizar resultados iniciales
- [ ] Ajustar estrategia según feedback
- [ ] Escalar implementación exitosa
- [ ] Medir y optimizar continuamente

---
*Este contenido ha sido optimizado utilizando IA avanzada para máxima efectividad y conversión.*
      `.trim()

      // Análisis del contenido optimizado
      const optimizedAnalysis = {
        wordCount: optimized.split(/\s+/).length,
        readabilityScore: Math.floor(Math.random() * 20) + 75,
        seoScore: Math.floor(Math.random() * 20) + 75,
        keywordDensity: Math.floor(Math.random() * 2) + 2,
        structureScore: Math.floor(Math.random() * 20) + 75,
        engagementPotential: Math.floor(Math.random() * 20) + 75
      }

      // Métricas de mejora
      const improvementMetrics = {
        readabilityImprovement: ((optimizedAnalysis.readabilityScore - originalAnalysis.readabilityScore) / originalAnalysis.readabilityScore * 100).toFixed(1),
        seoImprovement: ((optimizedAnalysis.seoScore - originalAnalysis.seoScore) / originalAnalysis.seoScore * 100).toFixed(1),
        engagementImprovement: ((optimizedAnalysis.engagementPotential - originalAnalysis.engagementPotential) / originalAnalysis.engagementPotential * 100).toFixed(1),
        wordCountChange: ((optimizedAnalysis.wordCount - originalAnalysis.wordCount) / originalAnalysis.wordCount * 100).toFixed(1)
      }

      // Insights y recomendaciones
      const insights = [
        `El contenido optimizado tiene ${optimizedAnalysis.seoScore}% de puntuación SEO vs ${originalAnalysis.seoScore}% original`,
        `Mejora en legibilidad del ${improvementMetrics.readabilityImprovement}%`,
        `Potencial de engagement aumentado en ${improvementMetrics.engagementImprovement}%`,
        `Densidad de keyword optimizada al ${optimizedAnalysis.keywordDensity}%`
      ]

      const recommendations = [
        "Publica en horarios de mayor tráfico para maximizar impacto",
        "Considera añadir elementos visuales para aumentar engagement",
        "Usa llamadas a la acción claras y estratégicas",
        "Monitorea métricas de rendimiento regularmente",
        "A/B testing de títulos para máxima efectividad"
      ]

      setOptimizedContent(optimized)
      setAnalysis({
        original: originalAnalysis,
        optimized: optimizedAnalysis,
        improvement: improvementMetrics,
        insights,
        recommendations
      })

      setIsOptimizing(false)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aquí podrías agregar una notificación toast
  }

  const downloadResults = () => {
    if (!analysis) return

    const resultsContent = `
ANÁLISIS DE OPTIMIZACIÓN DE CONTENIDO

Tipo de Contenido: ${contentTypes.find(ct => ct.id === contentType)?.name}
Keyword Principal: ${targetKeyword}
Audiencia Objetivo: ${targetAudience}

MÉTRICAS ORIGINALES:
- Palabras: ${analysis.original.wordCount}
- Legibilidad: ${analysis.original.readabilityScore}/100
- SEO Score: ${analysis.original.seoScore}/100
- Potencial Engagement: ${analysis.original.engagementPotential}/100

MÉTRICAS OPTIMIZADAS:
- Palabras: ${analysis.optimized.wordCount}
- Legibilidad: ${analysis.optimized.readabilityScore}/100
- SEO Score: ${analysis.optimized.seoScore}/100
- Potencial Engagement: ${analysis.optimized.engagementPotential}/100

MEJORAS:
- Legibilidad: +${analysis.improvement.readabilityImprovement}%
- SEO: +${analysis.improvement.seoImprovement}%
- Engagement: +${analysis.improvement.engagementImprovement}%
- Palabras: ${analysis.improvement.wordCountChange > 0 ? '+' : ''}${analysis.improvement.wordCountChange}%

INSIGHTS:
${analysis.insights.join('\n')}

RECOMENDACIONES:
${analysis.recommendations.join('\n')}
    `.trim()

    const blob = new Blob([resultsContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'optimization-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetOptimizer = () => {
    setContentType("")
    setTargetKeyword("")
    setSecondaryKeywords("")
    setTargetAudience("")
    setOptimizationGoal("")
    setOriginalContent("")
    setOptimizedContent("")
    setAnalysis(null)
    setComparison(null)
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
          <span className="text-foreground">Optimizador de Contenido IA</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Optimizador de Contenido IA</h1>
            <p className="text-muted-foreground">Mejora tu contenido para máxima monetización usando IA avanzada</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Premium</Badge>
          <Badge className="bg-purple-100 text-purple-800">Herramienta Optimización</Badge>
          <Badge className="bg-blue-100 text-blue-800">6K+ Usuarios</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuración */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Configuración de Optimización
              </CardTitle>
              <CardDescription>
                Define el contenido y objetivos de optimización
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contentType">Tipo de Contenido</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <span className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span>{type.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="keyword">Keyword Principal</Label>
                <Input
                  id="keyword"
                  placeholder="palabra clave principal"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords Secundarias</Label>
                <Input
                  id="keywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={secondaryKeywords}
                  onChange={(e) => setSecondaryKeywords(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="audience">Audiencia Objetivo</Label>
                <Input
                  id="audience"
                  placeholder="Ej: Emprendedores, marketers, etc."
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="goal">Objetivo de Optimización</Label>
                <Select value={optimizationGoal} onValueChange={setOptimizationGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {optimizationGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Contenido Original</Label>
                <Textarea
                  id="content"
                  placeholder="Pega tu contenido original aquí..."
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  rows={8}
                  className="min-h-[200px]"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {originalContent.split(/\s+/).length} palabras
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={optimizeContent}
                  disabled={isOptimizing || !originalContent.trim()}
                  className="flex-1"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Optimizando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Optimizar Contenido
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetOptimizer} disabled={isOptimizing}>
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips de optimización */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips de Optimización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">🎯 Keywords</h4>
                <p className="text-xs text-muted-foreground">Usa 1-2% de densidad principal</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">📖 Estructura</h4>
                <p className="text-xs text-muted-foreground">Usa subtítulos y párrafos cortos</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">💍 Llamadas a la acción</h4>
                <p className="text-xs text-muted-foreground">Incluye CTAs claras y persuasivas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área de resultados */}
        <div className="lg:col-span-2">
          {optimizedContent ? (
            <div className="space-y-6">
              {/* Métricas de mejora */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Análisis de Optimización
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={downloadResults}>
                      <Download className="h-4 w-4 mr-1" />
                      Descargar Reporte
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        +{analysis.improvement.seoImprovement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Mejora SEO</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        +{analysis.improvement.readabilityImprovement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Legibilidad</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        +{analysis.improvement.engagementImprovement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Engagement</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {analysis.improvement.wordCountChange > 0 ? '+' : ''}{analysis.improvement.wordCountChange}%
                      </div>
                      <div className="text-sm text-muted-foreground">Palabras</div>
                    </div>
                  </div>

                  {/* Scores comparativos */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Puntuación SEO</span>
                        <span>{analysis.original.seoScore} → {analysis.optimized.seoScore}/100</span>
                      </div>
                      <Progress value={analysis.optimized.seoScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Legibilidad</span>
                        <span>{analysis.original.readabilityScore} → {analysis.optimized.readabilityScore}/100</span>
                      </div>
                      <Progress value={analysis.optimized.readabilityScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Potencial Engagement</span>
                        <span>{analysis.original.engagementPotential} → {analysis.optimized.engagementPotential}/100</span>
                      </div>
                      <Progress value={analysis.optimized.engagementPotential} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs con contenido y análisis */}
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="optimized" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="optimized">Contenido Optimizado</TabsTrigger>
                      <TabsTrigger value="comparison">Comparación</TabsTrigger>
                      <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="optimized" className="mt-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Contenido Optimizado</h3>
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard(optimizedContent)}>
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                            {optimizedContent}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="comparison" className="mt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3 text-red-600">Original</h3>
                          <div className="border rounded-lg p-4 bg-red-50">
                            <pre className="whitespace-pre-wrap text-xs leading-relaxed font-sans max-h-96 overflow-y-auto">
                              {originalContent}
                            </pre>
                          </div>
                          <div className="mt-3 space-y-1 text-sm">
                            <div>Palabras: {analysis.original.wordCount}</div>
                            <div>SEO Score: {analysis.original.seoScore}/100</div>
                            <div>Legibilidad: {analysis.original.readabilityScore}/100</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-3 text-green-600">Optimizado</h3>
                          <div className="border rounded-lg p-4 bg-green-50">
                            <pre className="whitespace-pre-wrap text-xs leading-relaxed font-sans max-h-96 overflow-y-auto">
                              {optimizedContent}
                            </pre>
                          </div>
                          <div className="mt-3 space-y-1 text-sm">
                            <div>Palabras: {analysis.optimized.wordCount}</div>
                            <div>SEO Score: {analysis.optimized.seoScore}/100</div>
                            <div>Legibilidad: {analysis.optimized.readabilityScore}/100</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Insights de Optimización
                          </h3>
                          <div className="space-y-2">
                            {analysis.insights.map((insight: string, index: number) => (
                              <div key={index} className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-3 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            Recomendaciones Adicionales
                          </h3>
                          <div className="space-y-2">
                            {analysis.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm">{rec}</p>
                              </div>
                            ))}
                          </div>
                        </div>
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
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Optimizador de Contenido</h3>
                  <p className="text-muted-foreground">
                    Ingresa tu contenido y configura los parámetros para obtener una versión optimizada
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