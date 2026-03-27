'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Sparkles, Download, Heart, AlertCircle, User, Crown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { PROMPT_TEMPLATES } from '@/data/prompt-templates'

export function PromptGeneratorTool() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedPrompts, setSavedPrompts] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const [usageInfo, setUsageInfo] = useState<any>(null)
  const { toast } = useToast()

  // Memoize templates to prevent recreation
  const templates = useMemo(() => PROMPT_TEMPLATES, [])

  useEffect(() => {
    // Verificar autenticación y obtener información de uso
    checkAuthAndUsage()
  }, [])

  // Optimize callback with useCallback to prevent recreation
  const checkAuthAndUsage = useCallback(async () => {
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
  }, [])

  // Optimize callbacks with useCallback to prevent recreation on every render
  const handleTemplateChange = useCallback((templateId: string) => {
    setSelectedTemplate(templateId)
    setVariables({})
    setGeneratedPrompt('')
  }, [])

  const handleVariableChange = useCallback((key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }))
  }, [])

  // Optimize generatePrompt callback with proper dependencies
  const generatePrompt = useCallback(async () => {
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
  }, [selectedTemplate, variables, templates, toast, generatedPrompt])

  // Optimize remaining callbacks with useCallback
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedPrompt)
    toast({
      title: "¡Copiado!",
      description: "El prompt ha sido copiado al portapapeles",
    })
  }, [generatedPrompt, toast])

  const savePrompt = useCallback(() => {
    if (generatedPrompt && !savedPrompts.includes(generatedPrompt)) {
      setSavedPrompts(prev => [...prev, generatedPrompt])
      toast({
        title: "¡Guardado!",
        description: "El prompt ha sido guardado",
      })
    }
  }, [generatedPrompt, savedPrompts, toast])

  const downloadPrompt = useCallback(() => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt-generado.txt'
    a.click()
    window.URL.revokeObjectURL(url)
  }, [generatedPrompt])

  // Memoize the selected template to prevent recalculation
  const template = useMemo(() =>
    templates.find(t => t.id === selectedTemplate),
    [templates, selectedTemplate]
  )

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