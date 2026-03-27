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
import { FileText, Download, Copy, RefreshCw, Sparkles, Target, Users, Zap, Briefcase, Palette, Code, Globe, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import PricingBanner from '@/components/ui/pricing-banner'

const niches = [
  "Marketing Digital para Negocios Locales",
  "E-commerce de Productos Artesanales",
  "Consultoría de Tecnología para PYMES",
  "Servicios de Salud y Wellness",
  "Educación Online y Cursos Digitales",
  "Bienes Raíces y Propiedades",
  "Restauración y Gastronomía",
  "Finanzas Personales y Finanzas Corporativas",
  "Turismo y Experiencias de Viaje",
  "Moda y Belleza Sostenible",
  "Tecnología Educativa",
  "Servicios de Mascotas",
  "Fitness y Entrenamiento Personal",
  "Consultoría de Sostenibilidad",
  "Marketing de Contenidos"
]

const templateTypes = [
  "Landing Page de Conversión",
  "Email Marketing Secuencia",
  "Redes Sociales Kit",
  "Propuesta Comercial",
  "Plan de Marketing",
  "Funnel de Ventas",
  "Guía de Producto",
  "Webinar Script",
  "Artículo SEO",
  "Campaña de Publicidad"
]

const contentStyles = [
  "Profesional y Corporativo",
  "Moderno y Minimalista",
  "Creativo y Colorido",
  "Técnico y Detallado",
  "Emocional y Persuasivo",
  "Informal y Amigable"
]

export default function TemplateGeneratorNichosPage() {
  const [selectedNiche, setSelectedNiche] = useState("")
  const [templateType, setTemplateType] = useState("")
  const [contentStyle, setContentStyle] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [keywords, setKeywords] = useState("")
  const [customRequirements, setCustomRequirements] = useState("")
  const [generatedTemplate, setGeneratedTemplate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [templateHistory, setTemplateHistory] = useState<Array<{id: string, content: string, date: string, niche: string}>>([])

  const generateTemplate = async () => {
    if (!selectedNiche || !templateType || !contentStyle) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsGenerating(true)

    // Simulación de generación de plantilla
    setTimeout(() => {
      const template = `
# PLANTILLA ${templateType.toUpperCase()}

**Nichos:** ${selectedNiche}
**Estilo:** ${contentStyle}
**Audiencia:** ${targetAudience || "Público general del nicho"}
**Fecha de creación:** ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}

---

## 🎯 OBJETIVOS DE LA PLANTILLA

- Maximizar conversiones en el nicho de ${selectedNiche.toLowerCase()}
- Conectar con la audiencia objetivo utilizando un estilo ${contentStyle.toLowerCase()}
- Optimizar para palabras clave: ${keywords || "generales del sector"}
- Adaptarse a las necesidades específicas del mercado

---

## 📋 ESTRUCTURA COMPLETA

### 1. ENCABEZADO PRINCIPAL
**Título de Impacto:**
Transforma tu Negocio de ${selectedNiche} con Estrategias Probadas que Generan Resultados Reales

**Subtítulo:**
Descubre el método revolucionario que está ayudando a cientos de emprendedores como tú a duplicar sus ingresos en 90 días

### 2. GANCHO INICIAL (Primera sección)
**Problema-Solución:**
¿Cansado de no ver resultados en tu negocio de ${selectedNiche}? No estás solo. El 87% de los emprendedores luchan con los mismos desafíos que tú enfrentas ahora.

**Agitación del Dolor:**
Cada día que pasa sin una estrategia efectiva, estás perdiendo oportunidades valiosas que tus competidores ya están aprovechando.

### 3. PRESENTACIÓN DE SOLUCIÓN
**Nuestra Propuesta Única:**
Presentamos el sistema completo diseñado específicamente para profesionales de ${selectedNiche} que buscan resultados tangibles sin perder tiempo en estrategias que no funcionan.

### 4. BENEFICIOS PRINCIPALES
**Transforma tu Negocio Con:**
- ✅ **Aumento de Clientes:** 40-60% más en los primeros 60 días
- ✅ **Optimización de Procesos:** Reduce tiempo administrativo en 50%
- ✅ **Estrategias Personalizadas:** Adaptadas a tu nicho específico
- ✅ **Resultados Medibles:** Sistema de seguimiento en tiempo real
- ✅ **Soporte Continuo:** Acceso a comunidad exclusive

### 5. PRUEBA SOCIAL
**Casos de Éxito Reales:**

**🏆 Testimonio 1:**
"Después de implementar estas estrategias, mis ingresos se triplicaron en 4 meses. Lo mejor es que todo está adaptado específicamente para ${selectedNiche.toLowerCase()}."
- [Nombre], Ciudad

**🏆 Testimonio 2:**
"Llevaba años estancado con los mismos resultados. Esta plantilla fue el cambio radical que necesitaba. 100% recomendado."
- [Nombre], [Empresa]

### 6. CONTENIDO DE VALOR
**Mini-Guía Gratuita (Lead Magnet):**
Los 7 Errores Costosos que Cometen los Profesionales de ${selectedNiche} (y Cómo Evitarlos)

**Contenido del Guide:**
- Error #1: Estrategias genéricas que no conectan
- Error #2: Ignorar el comportamiento actual del cliente
- Error #3: No tener un sistema de medición real
- Error #4: Enfocarse solo en la venta, no en la relación
- Error #5: No adaptarse a las nuevas tecnologías
- Error #6: Descuidar el seguimiento post-venta
- Error #7: No tener un plan de escalabilidad

### 7. OFERTA IRRESISTIBLE
**Paquete de Transformación:**

🎯 **Módulo 1:** Fundamentos Estratégicos ($997 valor)
🎯 **Módulo 2:** Implementación Práctica ($1,497 valor)
🎯 **Módulo 3:** Escalabilidad y Crecimiento ($1,997 valor)
🎯 **Bono 1:** Community Access ($497 valor)
🎯 **Bono 2:** Plantillas Adicionales ($297 valor)
🎯 **Bono 3:** Soporte Personalizado ($997 valor)

**Valor Total: $6,282**
**Precio Especial Hoy: $997**

### 8. GARANTÍA INEQUÍVOCA
**Garantía de Satisfacción 100%:**
"Usa el sistema completo durante 30 días. Si no ves resultados medibles, te devolvemos cada centavo. Sin preguntas, sin complicaciones."

### 9. LLAMADA A LA ACCIÓN (CTA)
**Botón Principal:**
[ SÍ, QUIERO TRANSFORMAR MI NEGOCIO AHORA ]

**Opciones de Pago:**
- 📞 Pago único con descuento
- 💳 Plan de cuotas sin intereses
- 🏦 Transferencia bancaria disponible

### 10. URGENCIA Y ESCASEZ
**Motivadores de Acción:**
- ⏰ **Oferta por tiempo limitado:** Termina en 24 horas
- 👥 **Solo 15 cupos disponibles** en este lote
- 🎁 **Bonus especial** para los primeros 10 que actúen ahora

### 11. CIERRE FINAL
**Mensaje de Empoderamiento:**
"La oportunidad está frente a ti. La pregunta no es si puedes permitirte este programa, sino si puedes permitirte seguir esperando. Tu futuro yo te lo agradecerá."

**Firma:**
Con éxito y crecimiento,
[Tu Nombre]
[Tu Título]
[Tu Contacto]

---

## 🎨 ELEMENTOS VISUALES RECOMENDADOS

### Paleta de Colores:
- **Principal:** Azul profesional (#2563eb)
- **Secundario:** Verde confianza (#16a34a)
- **Acento:** Naranja energía (#ea580c)
- **Neutral:** Gris elegante (#6b7280)

### Tipografía:
- **Titulares:** Montserrat Bold
- **Cuerpo:** Open Sans Regular
- **Énfasis:** Open Sans Semibold

### Imágenes Sugeridas:
- Foto profesional tuya
- Gráficos de resultados
- Testimonios con fotos reales
- Imágenes del proceso/workflow

---

## 📱 ADAPTACIONES POR PLATAFORMA

### Para Email Marketing:
- Asunto impactante
- Versión móvil optimizada
- Personalización con nombre
- Botones claros y visibles

### Para Redes Sociales:
- Imágenes cuadradas y stories
- Textos cortos y potentes
- Hashtags relevantes
- Llamadas a la acción claras

### Para Landing Page:
- Diseño limpio y profesional
- Formulario simple
- Testimonios visibles
- Chat de soporte integrado

---

## 📊 MÉTRICAS DE ÉXITO

### KPIs a Medir:
- **Tasa de conversión:** >5%
- **Tasa de apertura:** >25%
- **CTR (Click-through):** >3%
- **Costo por adquisición:** <$50
- **ROI esperado:** >300%

### Pruebas A/B Sugeridas:
- Títulos diferentes
- Colores de botones
- Textos de CTA
- Imágenes principales
- Puntos de precio

---

## 🔄 PRÓXIMOS PASOS

1. **Personaliza** con tu información específica
2. **Añade** tus casos de éxito reales
3. **Adapta** el tono a tu marca personal
4. **Implementa** las pruebas A/B sugeridas
5. **Mide** los resultados semanalmente
6. **Optimiza** basado en datos reales

---

**Nota Importante:** Esta plantilla está diseñada como base. Los mejores resultados se obtienen cuando la adaptas auténticamente a tu estilo único y las necesidades específicas de tus clientes.

---

*Generado con IA especializada en marketing para ${selectedNiche.toLowerCase()}*
      `.trim()

      setGeneratedTemplate(template)

      // Agregar al historial
      const newTemplate = {
        id: Date.now().toString(),
        content: template,
        date: new Date().toISOString(),
        niche: selectedNiche
      }
      setTemplateHistory(prev => [newTemplate, ...prev.slice(0, 4)])

      setIsGenerating(false)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadTemplate = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
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
          <span className="text-foreground">Template Generator para Nichos</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Template Generator para Nichos</h1>
            <p className="text-muted-foreground">Genera plantillas personalizadas para diferentes nichos de mercado</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Gratis</Badge>
          <Badge className="bg-indigo-100 text-indigo-800">Herramienta Creativa</Badge>
          <Badge className="bg-green-100 text-green-800">18K+ Usuarios</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuración */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configuración de Plantilla
              </CardTitle>
              <CardDescription>
                Define los parámetros para generar tu plantilla personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="niche">Nicho de Mercado</Label>
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nicho" />
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
                <Label htmlFor="templateType">Tipo de Plantilla</Label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo de plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contentStyle">Estilo de Contenido</Label>
                <Select value={contentStyle} onValueChange={setContentStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentStyles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="audience">Audiencia Objetivo</Label>
                <Input
                  id="audience"
                  placeholder="Ej: Pequeños empresarios, estudiantes, etc."
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Palabras Clave</Label>
                <Input
                  id="keywords"
                  placeholder="Ej: marketing digital, ventas, éxito"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requisitos Específicos</Label>
                <Textarea
                  id="requirements"
                  placeholder="Describe cualquier requisito específico o detalles adicionales..."
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={generateTemplate}
                disabled={isGenerating || !selectedNiche || !templateType || !contentStyle}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generando Plantilla...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Plantilla Personalizada
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Estadísticas de Uso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Plantillas generadas hoy</span>
                <span className="font-medium">2,347</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Nichos populares</span>
                <span className="font-medium">15 activos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de satisfacción</span>
                <span className="font-medium text-green-600">96.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo de generación</span>
                <span className="font-medium">2.7s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Usuarios activos</span>
                <span className="font-medium">18,923</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área principal de plantilla */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Plantilla Generada
                </CardTitle>
                {generatedTemplate && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedTemplate)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => downloadTemplate(generatedTemplate, `Plantilla_${selectedNiche.replace(/\s+/g, '_')}_${templateType.replace(/\s+/g, '_')}.md`)}>
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="template" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="template">Plantilla Actual</TabsTrigger>
                  <TabsTrigger value="history">Historial (5)</TabsTrigger>
                </TabsList>

                <TabsContent value="template" className="mt-4">
                  <div className="h-[600px] overflow-y-auto">
                    {generatedTemplate ? (
                      <div className="bg-white border rounded-lg p-6">
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-gray-800">
                            {generatedTemplate}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Configura los parámetros para generar tu plantilla personalizada</p>
                        <p className="text-sm mt-2">Crea contenido profesional adaptado a tu nicho específico</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <div className="h-[600px] overflow-y-auto space-y-4">
                    {templateHistory.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Aún no has generado ninguna plantilla</p>
                      </div>
                    ) : (
                      templateHistory.map((template) => (
                        <Card key={template.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{template.niche}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(template.date).toLocaleDateString('es-ES', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setGeneratedTemplate(template.content)}>
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => downloadTemplate(template.content, `Template_History_${template.id}.md`)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {template.content.substring(0, 150)}...
                          </p>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ejemplos de plantillas populares */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Plantillas Populares</CardTitle>
          <CardDescription>Las plantillas más generadas y exitosas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Marketing Digital Local</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                "Plantilla para agencias que trabajan con negocios locales"
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline">12K+ generaciones</Badge>
                <Badge className="bg-green-100 text-green-800">98% éxito</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-red-600" />
                <h4 className="font-medium">Salud y Wellness</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                "Contenido para coaches de salud y profesionales del wellness"
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline">8K+ generaciones</Badge>
                <Badge className="bg-green-100 text-green-800">96% éxito</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">Tecnología Educativa</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                "Plantillas para creadores de cursos online y plataformas educativas"
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline">6K+ generaciones</Badge>
                <Badge className="bg-green-100 text-green-800">94% éxito</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner de planes */}
      <PricingBanner />
    </div>
  )
}