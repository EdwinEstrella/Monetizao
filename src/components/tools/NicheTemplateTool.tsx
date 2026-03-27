'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Download, Copy, Eye, Target, TrendingUp, Lightbulb } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Template {
  id: string
  name: string
  description: string
  category: string
  niche: string
  content: string
  tags: string[]
  isPremium: boolean
}

export function NicheTemplateTool() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [keyBenefits, setKeyBenefits] = useState('')
  const [callToAction, setCallToAction] = useState('')
  const [generatedTemplate, setGeneratedTemplate] = useState<Template | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedTemplates, setSavedTemplates] = useState<Template[]>([])
  const { toast } = useToast()

  const categories = [
    { value: 'marketing', label: 'Marketing Digital' },
    { value: 'sales', label: 'Ventas' },
    { value: 'content', label: 'Creación de Contenido' },
    { value: 'automation', label: 'Automatización' },
    { value: 'consulting', label: 'Consultoría' },
    { value: 'coaching', label: 'Coaching y Educación' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'services', label: 'Servicios Profesionales' }
  ]

  const niches: Record<string, string[]> = {
    marketing: ['Redes Sociales', 'Email Marketing', 'SEO', 'Marketing de Contenidos', 'PPC', 'Marketing de Influencers'],
    sales: ['Ventas B2B', 'Ventas B2C', 'Ventas Online', 'Ventas Consultivas', 'Ventas Técnicas'],
    content: ['Blogging', 'Video Marketing', 'Podcasting', 'Infografías', 'E-books', 'Webinars'],
    automation: ['Automatización de Marketing', 'RPA', 'Automatización de Procesos', 'Chatbots'],
    consulting: ['Consultoría TI', 'Consultoría de Negocios', 'Consultoría Financiera', 'Consultoría de Recursos Humanos'],
    coaching: ['Coaching Ejecutivo', 'Life Coaching', 'Coaching de Negocios', 'Coaching de Carrera', 'Fitness Coaching'],
    ecommerce: ['Dropshipping', 'E-commerce de Nicho', 'Productos Digitales', 'Suscripciones'],
    services: ['Servicios Legales', 'Servicios de Salud', 'Servicios Financieros', 'Servicios Educativos', 'Servicios Creativos']
  }

  const predefinedTemplates = [
    {
      id: '1',
      name: 'Landing Page para SaaS',
      category: 'marketing',
      niche: 'Software',
      content: `# [NOMBRE DEL PRODUCTO]

## Transforma la forma en que [TIPO DE NEGOCIO] opera

### ¿Problemas con [PROBLEMA PRINCIPAL]?
Nuestra solución ayuda a [TIPO DE CLIENTE] a [BENEFICIO PRINCIPAL] en solo [PERIODO].

### Características Principales
- ✅ [CARACTERÍSTICA 1]
- ✅ [CARACTERÍSTICA 2]
- ✅ [CARACTERÍSTICA 3]

### Resultados Comprobados
- 📈 [MÉTRICA 1] de mejora
- 📊 [MÉTRICA 2] de eficiencia
- 💰 [MÉTRICA 3] de ROI

### Planes y Precios
**Plan Básico**: [PRECIO]/mes - Incluye [CARACTERÍSTICAS BÁSICAS]
**Plan Profesional**: [PRECIO]/mes - Incluye [CARACTERÍSTICAS PRO]
**Plan Enterprise**: [PRECIO]/mes - Incluye [CARACTERÍSTICAS ENTERPRISE]

### Comienza ahora
👉 [LLAMADA A LA ACCIÓN]

### Testimonios
"[TESTIMONIO 1]" - [CLIENTE 1]
"[TESTIMONIO 2]" - [CLIENTE 2]`,
      tags: ['SaaS', 'Landing Page', 'Conversión'],
      isPremium: false
    },
    {
      id: '2',
      name: 'Email Secuencia de Venta',
      category: 'marketing',
      niche: 'Email Marketing',
      content: `### Secuencia de Emails para [PRODUCTO/SERVICIO]

**Email 1: Bienvenida y Problemática (Día 1)**
Asunto: ¿Luchas con [PROBLEMA]?

Hola [NOMBRE],

¿Te suena familiar? [DESCRIPCIÓN DEL PROBLEMA]

La buena noticia es que no estás solo. Hemos ayudado a [NÚMERO] personas como tú a...

[BREVE INTRODUCCIÓN A LA SOLUCIÓN]

P.S. En el próximo email te compartiré [TEASER DEL SIGUIENTE EMAIL]

**Email 2: Agitación del Problema (Día 3)**
Asunto: El costo real de [PROBLEMA]

Hola [NOMBRE],

¿Sabías que [ESTADÍSTICA IMPACTANTE]?

Esto significa que...

[CONSEJO ÚTIL RELACIONADO]

En nuestro próximo email, veremos cómo...

**Email 3: Presentación de la Solución (Día 5)**
Asunto: La solución para [PROBLEMA]

Hola [NOMBRE],

¿Listo para decir adiós a [PROBLEMA]?

Presentamos [NOMBRE DEL PRODUCTO]:

✅ [BENEFICIO 1]
✅ [BENEFICIO 2]
✅ [BENEFICIO 3]

[LLAMADA A LA ACCIÓN CLARA]

**Email 4: Prueba Social (Día 7)**
Asunto: Cómo [CLIENTE] logró [RESULTADO]

Hola [NOMBRE],

[CASO DE ESTUDIO CORTO]

"[TESTIMONIO DIRECTO]"

Si [CLIENTE] pudo hacerlo, tú también.

[RECORDATORIO DE CTA]

**Email 5: Urgencia (Día 9)**
Asunto: Última oportunidad [MENCIÓN DE OFERTA]

Hola [NOMBRE],

[CREAR URGENCIA LEGÍTIMA]

La oferta especial termina en [PLAZO].

[CTA FINAL CON ESCASEZ]`,
      tags: ['Email Marketing', 'Secuencia', 'Venta'],
      isPremium: true
    }
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedNiche('')
  }

  const generateTemplate = async () => {
    if (!selectedCategory || !selectedNiche || !templateName) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa categoría, nicho y nombre del template",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Simular generación
      await new Promise(resolve => setTimeout(resolve, 2000))

      const template: Template = {
        id: Date.now().toString(),
        name: templateName,
        description: templateDescription || `Template para ${selectedNiche} en la categoría ${selectedCategory}`,
        category: selectedCategory,
        niche: selectedNiche,
        content: generateTemplateContent(),
        tags: [selectedCategory, selectedNiche],
        isPremium: Math.random() > 0.5
      }

      setGeneratedTemplate(template)

      toast({
        title: "¡Template generado!",
        description: "Tu template ha sido creado exitosamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el template",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateTemplateContent = (): string => {
    const currentDate = new Date().toLocaleDateString('es-ES')

    return `# ${templateName}

## Template Optimizado para ${selectedNiche}

**Categoría:** ${selectedCategory}
**Nicho:** ${selectedNiche}
**Fecha:** ${currentDate}

---

### DESCRIPCIÓN
${templateDescription || `Template profesional diseñado específicamente para el nicho de ${selectedNiche}.`}

### AUDIENCIA OBJETIVO
${targetAudience || `Profesionales y empresas del sector ${selectedNiche} que buscan optimizar sus resultados.`}

### BENEFICIOS CLAVE
${keyBenefits ? keyBenefits.split('\n').map(benefit => `• ${benefit.trim()}`).join('\n') : `• Mejora en la eficiencia operativa
• Reducción de costos significativa
• Aumento en la satisfacción del cliente
• Escalabilidad del negocio`}

### ESTRUCTURA DEL TEMPLATE

**1. Hook Inicial**
[Capturar inmediatamente la atención de la audiencia con un dato o pregunta impactante relacionada con ${selectedNiche}]

**2. Identificación del Problema**
[Describir los desafíos específicos que enfrenta el nicho ${selectedNiche}]

**3. Presentación de la Solución**
[Introducir tu solución como la respuesta específica a estos problemas]

**4. Prueba Social**
[Incluir testimonios o casos de éxito relevantes para ${selectedNiche}]

**5. Detalles y Beneficios**
[Explicar características con enfoque en beneficios para el nicho]

**6. Llamada a la Acción**
${callToAction || `[Llamada a la acción específica y relevante para ${selectedNiche}]`}

### ELEMENTOS PERSONALIZABLES
- [NOMBRE DEL CLIENTE]
- [PROBLEMA ESPECÍFICO]
- [RESULTADO DESEADO]
- [INDICADOR DE INDUSTRIA]
- [MÉTRICA RELEVANTE]

### OPTIMIZACIONES PARA EL NICHO
- **Tono y Voz**: [Adaptado al lenguaje profesional de ${selectedNiche}]
- **Métricas**: [Enfocado en KPIs relevantes para ${selectedNiche}]
- **Referencias**: [Incluir casos y ejemplos del sector]

### SEGUIMIENTO RECOMENDADO
1. **Email de seguimiento**: 24-48 horas después
2. **Llamada de seguimiento**: 3-5 días después
3. **Contenido de valor**: Semanalmente durante 30 días

---

### NOTAS ADICIONALES
- Adaptar el lenguaje según el nivel técnico de la audiencia
- Incluir datos y estadísticas específicas del sector ${selectedNiche}
- Considerar aspectos regulatorios o normativos del nicho
- Personalizar con marca y elementos visuales corporativos

*Este template ha sido optimizado para máxima conversión en el nicho ${selectedNiche}.*`
  }

  const copyTemplate = () => {
    if (generatedTemplate) {
      navigator.clipboard.writeText(generatedTemplate.content)
      toast({
        title: "¡Copiado!",
        description: "El template ha sido copiado al portapapeles",
      })
    }
  }

  const downloadTemplate = () => {
    if (generatedTemplate) {
      const blob = new Blob([generatedTemplate.content], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${generatedTemplate.name.toLowerCase().replace(/\s+/g, '-')}.txt`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "¡Descargado!",
        description: "El template ha sido descargado",
      })
    }
  }

  const saveTemplate = () => {
    if (generatedTemplate && !savedTemplates.find(t => t.id === generatedTemplate.id)) {
      setSavedTemplates(prev => [...prev, generatedTemplate])
      toast({
        title: "¡Guardado!",
        description: "El template ha sido guardado en tu colección",
      })
    }
  }

  const loadPredefinedTemplate = (template: Template) => {
    setGeneratedTemplate(template)
    setSelectedCategory(template.category)
    setSelectedNiche(template.niche)
    setTemplateName(template.name)
    toast({
      title: "Template cargado",
      description: `"${template.name}" ha sido cargado exitosamente`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Template Generator para Nichos
        </CardTitle>
        <CardDescription>
          Crea plantillas optimizadas para nichos específicos de mercado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generator">Generador</TabsTrigger>
            <TabsTrigger value="templates">Templates Lista</TabsTrigger>
            <TabsTrigger value="saved">Guardados ({savedTemplates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            {/* Category and Niche Selection */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="niche">Nicho Específico *</Label>
                <Select value={selectedNiche} onValueChange={setSelectedNiche} disabled={!selectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedCategory ? "Selecciona un nicho" : "Primero selecciona una categoría"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory && niches[selectedCategory]?.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Template Details */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="templateName">Nombre del Template *</Label>
                <Input
                  id="templateName"
                  placeholder="Ej: Landing Page para Consultores"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateDescription">Descripción del Template</Label>
                <Input
                  id="templateDescription"
                  placeholder="Describe brevemente el propósito del template"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Audiencia Objetivo</Label>
                  <Textarea
                    id="targetAudience"
                    placeholder="¿A quién va dirigido este template?"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="callToAction">Llamada a la Acción</Label>
                  <Textarea
                    id="callToAction"
                    placeholder="¿Qué acción debe tomar el usuario?"
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyBenefits">Beneficios Clave (uno por línea)</Label>
                <Textarea
                  id="keyBenefits"
                  placeholder="• Ahorra tiempo en procesos manuales&#10;• Reduce errores humanos&#10;• Mejora la satisfacción del cliente"
                  value={keyBenefits}
                  onChange={(e) => setKeyBenefits(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <Separator />

            {/* Generate Button */}
            <Button
              onClick={generateTemplate}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <FileText className="h-4 w-4 mr-2 animate-pulse" />
                  Generando template...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generar Template
                </>
              )}
            </Button>

            {/* Generated Template */}
            {generatedTemplate && (
              <div className="space-y-4">
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-base font-medium">{generatedTemplate.name}</Label>
                      <Badge variant="outline">{generatedTemplate.category}</Badge>
                      {generatedTemplate.isPremium && (
                        <Badge variant="secondary">Premium</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={saveTemplate}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Guardar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyTemplate}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadTemplate}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {generatedTemplate.content}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-green-900">Tips para templates efectivos</h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Investiga a fondo el nicho antes de crear el template</li>
                      <li>• Usa el lenguaje y terminología específica del sector</li>
                      <li>• Incluye métricas y datos relevantes para el nicho</li>
                      <li>• Personaliza elementos según la madurez del mercado</li>
                      <li>• Considera aspectos regulatorios del sector</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4">
              {predefinedTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:bg-gray-50" onClick={() => loadPredefinedTemplate(template)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{template.name}</h3>
                          {template.isPremium && (
                            <Badge variant="secondary" className="text-xs">Premium</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                          <Badge variant="outline" className="text-xs">{template.niche}</Badge>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedTemplates.length === 0 ? (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay templates guardados</h3>
                <p className="text-gray-600">Los templates que guardes aparecerán aquí</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {savedTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{template.name}</h3>
                            {template.isPremium && (
                              <Badge variant="secondary" className="text-xs">Premium</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">{template.category}</Badge>
                            <Badge variant="outline" className="text-xs">{template.niche}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(template.content)
                              toast({
                                title: "¡Copiado!",
                                description: "El template ha sido copiado al portapapeles",
                              })
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSavedTemplates(prev => prev.filter(t => t.id !== template.id))
                              toast({
                                title: "Eliminado",
                                description: "El template ha sido eliminado de guardados",
                              })
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
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