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
import { MessageCircle, TrendingUp, Target, Zap, Copy, RefreshCw, Sparkles } from 'lucide-react'
import Link from 'next/link'
import PricingBanner from '@/components/ui/pricing-banner'

const niches = [
  "Marketing Digital",
  "E-commerce",
  "Contenido para Redes Sociales",
  "Email Marketing",
  "SEO y Contenido Web",
  "Servicios Freelance",
  "Consultoría de Negocios",
  "Creación de Cursos Online",
  "Venta de Productos Digitales",
  "Servicios de Copywriting"
]

const promptTypes = [
  "Prompts para generar clientes",
  "Prompts para crear contenido viral",
  "Prompts para optimizar precios",
  "Prompts para automatizar procesos",
  "Prompts para análisis de mercado"
]

export default function GeneradorPromptsLucrativosPage() {
  const [selectedNiche, setSelectedNiche] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [customRequest, setCustomRequest] = useState("")
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([])
  const [currentMessage, setCurrentMessage] = useState("")

  const generatePrompt = async () => {
    if (!selectedNiche || !selectedType) {
      alert("Por favor selecciona un nicho y un tipo de prompt")
      return
    }

    setIsGenerating(true)

    // Simulación de generación (en producción se conectaría a una API de IA)
    setTimeout(() => {
      const mockPrompt = `
**Prompt Lucrativo para ${selectedNiche} - ${selectedType}**

Actúa como un experto en ${selectedNiche.toLowerCase()} con más de 10 años de experiencia generando resultados excepcionales para clientes.

Tu tarea es ${selectedType.toLowerCase()} específicamente para ${selectedNiche.toLowerCase()}.

Requisitos:
1. Enfócate en resultados medibles y ROI
2. Incluye estrategias probadas que funcionen en 2024
3. Proporciona pasos accionables y específicos
4. Considera diferentes presupuestos y escalas
5. Incluye métricas de éxito clave

Contexto del cliente:
${customRequest || "Cliente buscando implementar estrategias efectivas"}

Genera un plan detallado con:
- Objetivos claros y medibles
- Estrategias específicas para el nicho
- Herramientas y recursos recomendados
- Timeline de implementación
- Métricas de seguimiento
- Posibles obstáculos y soluciones

Proporciona el resultado en formato estructurado, con ejemplos prácticos y accionables.
      `.trim()

      setGeneratedPrompt(mockPrompt)

      // Agregar al historial del chat
      setChatHistory([
        ...chatHistory,
        { role: 'user', content: `Generar prompt para ${selectedNiche} - ${selectedType}${customRequest ? ': ' + customRequest : ''}` },
        { role: 'assistant', content: mockPrompt }
      ])

      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aquí podrías agregar una notificación toast
  }

  const regeneratePrompt = () => {
    setGeneratedPrompt("")
    generatePrompt()
  }

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage = currentMessage
    setCurrentMessage("")

    // Agregar mensaje del usuario al historial
    setChatHistory([...chatHistory, { role: 'user', content: userMessage }])

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantResponse = `
Entendido. Basado en tu solicitud "${userMessage}", aquí tienes una optimización del prompt:

**Versión Mejorada del Prompt**

${generatedPrompt}

**Optimización específica para tu solicitud:**
- Enfoque mejorado según lo que necesitas
- Ajustes para ${userMessage.toLowerCase()}
- Estrategias adicionales específicas
- Métricas personalizadas para tu caso

¿Necesitas que ajuste algo más o te gustaría explorar otro ángulo para este prompt?
      `.trim()

      setChatHistory(prev => [...prev, { role: 'assistant', content: assistantResponse }])
    }, 1500)
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
          <span className="text-foreground">Generador de Prompts Lucrativos</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Generador de Prompts Lucrativos</h1>
            <p className="text-muted-foreground">Crea prompts optimizados para generar ingresos con Inteligencia Artificial</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Gratis</Badge>
          <Badge className="bg-green-100 text-green-800">Herramienta Popular</Badge>
          <Badge className="bg-blue-100 text-blue-800">25K+ Usuarios</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuración */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Configuración del Prompt
              </CardTitle>
              <CardDescription>
                Selecciona el nicho y tipo de prompt que quieres generar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="niche">Nichos</Label>
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un nicho" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Tipo de Prompt</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {promptTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="custom">Solicitud Específica (Opcional)</Label>
                <Textarea
                  id="custom"
                  placeholder="Describe cualquier requisito específico o contexto adicional..."
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={generatePrompt}
                disabled={isGenerating || !selectedNiche || !selectedType}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generar Prompt Lucrativo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Estadísticas de la herramienta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Métricas de Uso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prompts generados hoy</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de éxito</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo promedio</span>
                <span className="font-medium">2.3s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Usuarios activos</span>
                <span className="font-medium">25,431</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área principal de chat y resultados */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat de Generación
                </CardTitle>
                {generatedPrompt && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedPrompt)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={regeneratePrompt}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Regenerar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat Interactivo</TabsTrigger>
                  <TabsTrigger value="result">Resultado Final</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="mt-4">
                  <div className="flex flex-col h-[600px]">
                    {/* Historial del chat */}
                    <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
                      {chatHistory.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Comienza seleccionando tu nicho y tipo de prompt</p>
                          <p className="text-sm mt-2">Luego podrás chatear para refinar los resultados</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatHistory.map((message, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                message.role === 'user'
                                  ? 'bg-blue-100 ml-8'
                                  : 'bg-white border mr-8'
                              }`}
                            >
                              <div className="text-sm font-medium mb-2">
                                {message.role === 'user' ? 'Tú' : 'Asistente IA'}
                              </div>
                              <div className="whitespace-pre-wrap text-sm">
                                {message.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Input de mensaje */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Pide ajustes o refinamientos para tu prompt..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        disabled={!generatedPrompt}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!generatedPrompt || !currentMessage.trim()}
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="result" className="mt-4">
                  <div className="h-[600px] overflow-y-auto">
                    {generatedPrompt ? (
                      <div className="bg-white border rounded-lg p-6">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                          {generatedPrompt}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Configura los parámetros y genera tu primer prompt</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ejemplos de uso */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ejemplos de Uso Exitosos</CardTitle>
          <CardDescription>Casos reales de prompts generados con esta herramienta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">📈 Marketing Digital</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Prompt para estrategia de contenido que aumentó conversiones 300%"
              </p>
              <Badge variant="outline">ROI: +$45,000</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🛍️ E-commerce</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Prompt para optimización de descripciones que duplicó ventas"
              </p>
              <Badge variant="outline">ROI: +$28,000</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">✍️ Freelance</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Prompt para propuesta client que ganó proyecto premium"
              </p>
              <Badge variant="outline">ROI: +$15,000</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner de planes */}
      <PricingBanner />
    </div>
  )
}