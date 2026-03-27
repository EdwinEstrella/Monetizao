'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Sparkles, Download, Share, Heart, AlertCircle, User, Crown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function PromptGeneratorTool() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [templates, setTemplates] = useState<any[]>([])
  const [savedPrompts, setSavedPrompts] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const [usageInfo, setUsageInfo] = useState<any>(null)
  const { toast } = useToast()

  const templatesData = [
    {
      id: '1',
      title: 'Copywriting de Alto Conversión',
      description: 'Crea textos publicitarios que convierten',
      category: 'Marketing',
      isPremium: false,
      variables: [
        { key: 'tipo_de_contenido', label: 'Tipo de Contenido', type: 'select', options: ['Email', 'Landing Page', 'Post Social Media', 'Anuncio', 'Artículo de Blog'] },
        { key: 'producto_servicio', label: 'Producto/Servicio', type: 'text', placeholder: 'Describe tu producto o servicio' },
        { key: 'audiencia_objetivo', label: 'Audiencia Objetivo', type: 'text', placeholder: '¿A quién te diriges?' },
        { key: 'contexto_producto', label: 'Contexto del Producto', type: 'textarea', placeholder: 'Detalles adicionales sobre el producto' },
        { key: 'objetivo_principal', label: 'Objetivo Principal', type: 'text', placeholder: '¿Qué quieres lograr?' },
        { key: 'tono_voz', label: 'Tono de Voz', type: 'select', options: ['Profesional', 'Amigable', 'Urgente', 'Inspirador', 'Divertido'] },
        { key: 'longitud', label: 'Longitud', type: 'select', options: ['Corto (50-100 palabras)', 'Mediano (100-300 palabras)', 'Largo (300+ palabras)'] },
        { key: 'plataforma_destino', label: 'Plataforma', type: 'select', options: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'Email', 'Blog'] }
      ],
      prompt: `Actúa como un experto copywriter con 10 años de experiencia en marketing directo.

Crea un {tipo_de_contenido} para {producto_servicio} que se dirija a {audiencia_objetivo}.

Contexto del producto/servicio: {contexto_producto}

Objetivo principal: {objetivo_principal}

Tono de voz: {tono_voz}

Longitud aproximada: {longitud}

Incluye:
1. Hook inicial irresistible
2. Beneficios clave (no características)
3. Prueba social
4. Llamada a la acción clara
5. Optimizado para {plataforma_destino}

Asegúrate de que el contenido siga las fórmulas de copywriting probadas (AIDA, PAS, FAB) y se enfoque en emociones y beneficios.`
    },
    {
      id: '2',
      title: 'Generador de Contenido SEO',
      description: 'Crea contenido optimizado para buscadores',
      category: 'SEO',
      isPremium: false,
      variables: [
        { key: 'keyword_principal', label: 'Keyword Principal', type: 'text', placeholder: 'Tu palabra clave principal' },
        { key: 'topic_principal', label: 'Tema Principal', type: 'text', placeholder: 'El tema principal del artículo' },
        { key: 'audiencia', label: 'Audiencia', type: 'text', placeholder: '¿Quién leerá esto?' },
        { key: 'longitud_articulo', label: 'Longitud del Artículo', type: 'select', options: ['Corto (500-800 palabras)', 'Mediano (800-1500 palabras)', 'Largo (1500+ palabras)'] },
        { key: 'tipo_contenido', label: 'Tipo de Contenido', type: 'select', options: ['Tutorial', 'Guía completa', 'Lista', 'Review', 'Caso de estudio'] }
      ],
      prompt: `Actúa como un experto en SEO y contenido con experiencia en crear artículos que posicionan en Google.

Escribe un {tipo_contenido} sobre "{topic_principal}" optimizado para la keyword "{keyword_principal}".

Audiencia objetivo: {audiencia}
Longitud: {longitud_articulo}

Crea contenido que:

1. **SEO On-Page Optimizado**:
   - Incluye la keyword principal en título y subtítulos
   - Usa palabras clave secundarias naturales
   - Mantén densidad de keyword del 1-2%
   - Incluye meta descripción atractiva

2. **Estructura del Contenido**:
   - Título llamativo (H1)
   - Introducción enganchante
   - Mínimo 3 subtítulos (H2, H3)
   - Lista de puntos clave
   - Conclusión con llamada a acción

3. **Calidad y Valor**:
   - Información original y útil
   - Ejemplos prácticos
   - Datos o estadísticas cuando aplique
   - Lenguaje claro y accesible

4. **Optimización Adicional**:
   - Questions people also ask
   - Entidades y topics relacionados
   - Formato legible con párrafos cortos
   - Negritas para énfasis

Asegúrate de que el contenido responda completamente a la intención de búsqueda y ofrezca valor real al lector.`
    },
    {
      id: '3',
      title: 'Creador de Propuestas Comerciales',
      description: 'Genera propuestas comerciales persuasivas',
      category: 'Negocio',
      isPremium: false,
      variables: [
        { key: 'cliente_potencial', label: 'Cliente Potencial', type: 'text', placeholder: 'Nombre del cliente' },
        { key: 'servicio_descripcion', label: 'Servicio a Ofrecer', type: 'textarea', placeholder: 'Describe tu servicio' },
        { key: 'problema_cliente', label: 'Problema del Cliente', type: 'textarea', placeholder: '¿Qué problema resuelves?' },
        { key: 'solucion_propuesta', label: 'Tu Solución', type: 'textarea', placeholder: '¿Cómo lo resuelves?' },
        { key: 'presupuesto', label: 'Presupuesto', type: 'text', placeholder: 'Rango de presupuesto' },
        { key: 'timeline', label: 'Timeline', type: 'text', placeholder: 'Duración del proyecto' }
      ],
      prompt: `Actúa como un consultor de negocios senior experto en crear propuestas comerciales ganadoras.

Crea una propuesta comercial para: {cliente_potencial}

Servicio a ofertar: {servicio_descripcion}

Presupuesto: {presupuesto}

Problema del cliente: {problema_cliente}

Solución propuesta: {solucion_propuesta}

Timeline: {timeline}

Estructura la propuesta con:
1. Resumen Ejecutivo
2. Análisis del Problema
3. Solución Propuesta
4. Metodología
5. Timeline y Entregables
6. Inversión (con opciones)
7. Garantías
8. Próximos Pasos

Usa lenguaje profesional pero persuasivo, enfocado en ROI y beneficios medibles.`
    }
  ]

  useEffect(() => {
    setTemplates(templatesData)

    // Verificar autenticación y obtener información de uso
    checkAuthAndUsage()
  }, [])

  const checkAuthAndUsage = async () => {
    try {
      // Verificar si el usuario está autenticado
      const authResponse = await fetch('/api/auth/me')
      if (authResponse.ok) {
        const userData = await authResponse.json()
        setUser(userData.user)

        // Obtener información de uso
        const usageResponse = await fetch('/api/tools/ai/generate-prompt')
        if (usageResponse.ok) {
          const usageData = await usageResponse.json()
          setUsageInfo(usageData.data.usage)
        }
      }
    } catch (error) {
      console.error('Error checking auth and usage:', error)
    }
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    setVariables({})
    setGeneratedPrompt('')
  }

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }))
  }

  const generatePrompt = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Por favor selecciona una plantilla",
        variant: "destructive",
      })
      return
    }

    const template = templates.find(t => t.id === selectedTemplate)
    if (!template) return

    // Validar que todas las variables requeridas estén llenas
    const missingVars = template.variables.filter(v => !variables[v.key])
    if (missingVars.length > 0) {
      toast({
        title: "Campos requeridos",
        description: `Por favor completa: ${missingVars.map(v => v.label).join(', ')}`,
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Construir prompt base
      let prompt = template.prompt
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{${key}}`, 'g')
        prompt = prompt.replace(regex, value as string)
      }

      // Mejorar el prompt para que la IA genere mejores resultados
      const enhancedPrompt = `${prompt}

Genera contenido de alta calidad siguiendo estas instrucciones de manera precisa y profesional.`

      // Llamar a la API real con IA
      const response = await fetch('/api/tools/ai/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          templateId: selectedTemplate,
          variables
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setGeneratedPrompt(data.data.content)
          toast({
            title: "¡Prompt generado con IA!",
            description: "Tu prompt ha sido creado con IA exitosamente",
          })
        } else {
          // Si falla la API de IA, mostrar error específico
          throw new Error(data.error || 'Error en la generación con IA')
        }
      } else {
        throw new Error('Error en la llamada a la API')
      }
    } catch (error) {
      console.error('Error en generación de prompt con IA:', error)
      toast({
        title: "Error de IA",
        description: error instanceof Error ? error.message : "No se pudo generar el prompt con la IA. Intenta con otro prompt o verifica tu configuración.",
        variant: "destructive",
      })

      // Fallback: mostrar el prompt sin IA
      if (!generatedPrompt) {
        let fallbackPrompt = template.prompt
        for (const [key, value] of Object.entries(variables)) {
          const regex = new RegExp(`{${key}}`, 'g')
          fallbackPrompt = fallbackPrompt.replace(regex, value as string)
        }
        setGeneratedPrompt(fallbackPrompt)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    toast({
      title: "¡Copiado!",
      description: "El prompt ha sido copiado al portapapeles",
    })
  }

  const savePrompt = () => {
    if (generatedPrompt && !savedPrompts.includes(generatedPrompt)) {
      setSavedPrompts(prev => [...prev, generatedPrompt])
      toast({
        title: "¡Guardado!",
        description: "El prompt ha sido guardado",
      })
    }
  }

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt-generado.txt'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const template = templates.find(t => t.id === selectedTemplate)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generador de Prompts Lucrativos
        </CardTitle>
        <CardDescription>
          Crea prompts optimizados usando plantillas profesionales
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* User and Usage Info */}
        {user && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {usageInfo?.isPremium ? (
                  <Crown className="h-5 w-5 text-yellow-500" />
                ) : (
                  <User className="h-5 w-5 text-blue-500" />
                )}
                <div>
                  <p className="font-medium text-sm">
                    {user.name} {usageInfo?.isPremium && '(Premium)'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {usageInfo?.isPremium
                      ? 'Uso ilimitado de herramientas'
                      : `Usos restantes hoy: ${usageInfo?.remainingUses || 0}/5`
                    }
                  </p>
                </div>
              </div>
              {!usageInfo?.isPremium && usageInfo?.remainingUses === 0 && (
                <Badge variant="destructive" className="text-xs">
                  Límite alcanzado
                </Badge>
              )}
            </div>
          </div>
        )}

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">Generador</TabsTrigger>
            <TabsTrigger value="saved">Guardados ({savedPrompts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            {/* Template Selection */}
            <div>
              <Label htmlFor="template">Plantilla de Prompt</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecciona una plantilla" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex flex-col items-start">
                        <div className="font-medium">{template.title}</div>
                        <div className="text-sm text-gray-500">{template.description}</div>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                          {template.isPremium && (
                            <Badge variant="secondary" className="text-xs">Premium</Badge>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {template && (
              <>
                <Separator />

                {/* Variables Form */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Variables del Prompt</Label>
                  {template.variables.map((variable: any) => (
                    <div key={variable.key} className="space-y-2">
                      <Label htmlFor={variable.key}>{variable.label}</Label>
                      {variable.type === 'select' ? (
                        <Select onValueChange={(value) => handleVariableChange(variable.key, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={variable.placeholder || "Selecciona una opción"} />
                          </SelectTrigger>
                          <SelectContent>
                            {variable.options?.map((option: string) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : variable.type === 'textarea' ? (
                        <Textarea
                          id={variable.key}
                          placeholder={variable.placeholder}
                          value={variables[variable.key] || ''}
                          onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={variable.key}
                          type="text"
                          placeholder={variable.placeholder}
                          value={variables[variable.key] || ''}
                          onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={generatePrompt}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generar Prompt
                      </>
                    )}
                  </Button>
                </div>

                {/* Generated Prompt */}
                {generatedPrompt && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Prompt Generado</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={savePrompt}
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            Guardar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadPrompt}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {generatedPrompt}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedPrompts.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay prompts guardados</h3>
                <p className="text-gray-600">Los prompts que guardes aparecerán aquí</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedPrompts.map((prompt, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-sm text-gray-500">
                          Prompt #{index + 1}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(prompt)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSavedPrompts(prev => prev.filter((_, i) => i !== index))
                              toast({
                                title: "Eliminado",
                                description: "El prompt ha sido eliminado de guardados",
                              })
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {prompt.substring(0, 200)}
                          {prompt.length > 200 && '...'}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}