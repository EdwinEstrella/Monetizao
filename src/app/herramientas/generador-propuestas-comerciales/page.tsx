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
import { FileText, Download, Send, Clock, DollarSign, Users, Target, Copy, RefreshCw, Sparkles } from 'lucide-react'
import Link from 'next/link'
import PricingBanner from '@/components/ui/pricing-banner'

const serviceTypes = [
  "Consultoría de IA",
  "Desarrollo de Software IA",
  "Marketing Digital IA",
  "Análisis de Datos",
  "Chatbots y Asistentes",
  "Optimización de Procesos",
  "Contenido IA",
  "Formación IA",
  "Integración de Sistemas",
  "Auditoría IA"
]

const proposalTemplates = [
  "Básico - Servicio único",
  "Estándar - Paquete completo",
  "Premium - Solución integral",
  "Personalizado - A medida"
]

export default function GeneradorPropuestasComercialesPage() {
  const [clientName, setClientName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [templateType, setTemplateType] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [generatedProposal, setGeneratedProposal] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [proposalHistory, setProposalHistory] = useState<Array<{id: string, content: string, date: string}>>([])

  const generateProposal = async () => {
    if (!clientName || !companyName || !serviceType || !templateType) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsGenerating(true)

    // Simulación de generación con API
    setTimeout(() => {
      const proposal = `
**PROPUESTA COMERCIAL - ${serviceType.toUpperCase()}**

**Fecha:** ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}

**Para:** ${clientName} - ${companyName}

---

## 📋 RESUMEN EJECUTIVO

${projectDescription ? `Proyecto: ${projectDescription}` : 'Proyecto de implementación de soluciones de IA para optimizar procesos y aumentar eficiencia operativa.'}

**Tipo de Servicio:** ${serviceType}
**Modalidad:** ${templateType}

---

## 🎯 OBJETIVOS DEL PROYECTO

### Objetivos Principales:
- Implementar soluciones de IA que impulsen el crecimiento del negocio
- Reducir costos operativos mediante automatización inteligente
- Mejorar la toma de decisiones con análisis predictivo
- Aumentar la satisfacción del cliente con herramientas avanzadas

### Métricas de Éxito:
- Reducción de tiempo de proceso: 40-60%
- Aumento de eficiencia operativa: 35-50%
- ROI esperado: 200-300% en 12 meses
- Satisfacción del cliente: >90%

---

## 💰 INVERSIÓN

**Presupuesto Estimado:** ${budget || '$15,000 - $50,000'}

### Desglose de Inversión:
- **Análisis y Consultoría Inicial:** 20%
- **Desarrollo e Implementación:** 50%
- **Capacitación y Soporte:** 20%
- **Mantenimiento y Optimización:** 10%

### Forma de Pago:
- 50% al inicio del proyecto
- 30% entrega de componentes principales
- 20% finalización y aceptación

---

## ⏱️ CRONOGRAMA

**Duración Estimada:** ${timeline || '8-12 semanas'}

### Fases del Proyecto:
1. **Análisis y Diagnóstico (Semanas 1-2)**
   - Evaluación de procesos actuales
   - Identificación de oportunidades de IA
   - Definición de KPIs y métricas

2. **Diseño de Solución (Semanas 3-4)**
   - Arquitectura del sistema
   - Selección de tecnologías
   - Prototipado inicial

3. **Desarrollo e Implementación (Semanas 5-8)**
   - Desarrollo de componentes principales
   - Integración con sistemas existentes
   - Pruebas y validación

4. **Capacitación y Lanzamiento (Semanas 9-10)**
   - Formación del equipo
   - Migración de datos
   - Puesta en producción

5. **Optimización y Soporte (Semanas 11-12)**
   - Monitoreo y ajustes
   - Optimización de rendimiento
   - Entrega final

---

## 🚀 BENEFICIOS ADICIONALES

### Valor Agregado:
- **Capacitación del equipo:** 20 horas de formación incluida
- **Documentación completa:** Manuales técnicos y de usuario
- **Soporte prioritario:** 6 meses de soporte técnico
- **Actualizaciones:** Mejoras continuas durante el primer año

### Diferenciadores Competitivos:
- Tecnología de última generación
- Equipo con más de 10 años de experiencia
- Metodología ágil y transparente
- Garantía de satisfacción 100%

---

## 📞 PRÓXIMOS PASOS

1. **Reunión de alineación:** 1 hora para discutir detalles específicos
2. **Presentación técnica:** Demostración de capacidades
3. **Propuesta detallada:** Documentación técnica completa
4. **Inicio del proyecto:** Firma de contrato y kick-off

---

## 💬 CONDICIONES COMERCIALES

- **Validez de la oferta:** 30 días
- **Garantía:** 3 meses de garantía en funcionalidad
- **Confidencialidad:** Acuerdo de confidencialidad incluido
- **Propiedad intelectual:** Transferencia completa al cliente

---

**Contacto:**
[Nombre de tu empresa]
[Teléfono]
[Email]
[Sitio web]

*Esta propuesta representa nuestro compromiso inicial con tu éxito. Estamos listos para transformar tu negocio con el poder de la Inteligencia Artificial.*
      `.trim()

      setGeneratedProposal(proposal)

      // Agregar al historial
      const newProposal = {
        id: Date.now().toString(),
        content: proposal,
        date: new Date().toISOString()
      }
      setProposalHistory(prev => [newProposal, ...prev.slice(0, 4)]) // Guardar últimas 5 propuestas

      setIsGenerating(false)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadProposal = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
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
          <span className="text-foreground">Generador de Propuestas Comerciales</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Generador de Propuestas Comerciales</h1>
            <p className="text-muted-foreground">Crea propuestas profesionales para servicios de IA en minutos</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Gratis</Badge>
          <Badge className="bg-blue-100 text-blue-800">Herramienta Esencial</Badge>
          <Badge className="bg-purple-100 text-purple-800">15K+ Usuarios</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuración */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Configuración de Propuesta
              </CardTitle>
              <CardDescription>
                Define los parámetros para generar tu propuesta comercial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clientName">Nombre del Cliente</Label>
                <Input
                  id="clientName"
                  placeholder="Juan Pérez"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="companyName">Empresa del Cliente</Label>
                <Input
                  id="companyName"
                  placeholder="Tech Solutions S.A."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Tipo de Servicio</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="templateType">Plantilla de Propuesta</Label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    {proposalTemplates.map((template) => (
                      <SelectItem key={template} value={template}>
                        {template}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="projectDescription">Descripción del Proyecto</Label>
                <Textarea
                  id="projectDescription"
                  placeholder="Describe los objetivos y alcance del proyecto..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="budget">Presupuesto Estimado</Label>
                <Input
                  id="budget"
                  placeholder="$15,000 - $50,000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="timeline">Cronograma</Label>
                <Input
                  id="timeline"
                  placeholder="8-12 semanas"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                />
              </div>

              <Button
                onClick={generateProposal}
                disabled={isGenerating || !clientName || !companyName || !serviceType || !templateType}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generando Propuesta...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Propuesta Profesional
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Métricas de Éxito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Propuestas generadas hoy</span>
                <span className="font-medium">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de conversión</span>
                <span className="font-medium text-green-600">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ticket promedio</span>
                <span className="font-medium">$32,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo de generación</span>
                <span className="font-medium">3.2s</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área principal */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Propuesta Generada
                </CardTitle>
                {generatedProposal && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedProposal)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => downloadProposal(generatedProposal, `Propuesta_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`)}>
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="proposal" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="proposal">Propuesta Actual</TabsTrigger>
                  <TabsTrigger value="history">Historial (5)</TabsTrigger>
                </TabsList>

                <TabsContent value="proposal" className="mt-4">
                  <div className="h-[600px] overflow-y-auto">
                    {generatedProposal ? (
                      <div className="bg-white border rounded-lg p-6">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                          {generatedProposal}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Completa la configuración para generar tu propuesta profesional</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <div className="h-[600px] overflow-y-auto space-y-4">
                    {proposalHistory.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Aún no has generado ninguna propuesta</p>
                      </div>
                    ) : (
                      proposalHistory.map((proposal) => (
                        <Card key={proposal.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Propuesta del {new Date(proposal.date).toLocaleDateString('es-ES')}</h4>
                            <Button variant="ghost" size="sm" onClick={() => downloadProposal(proposal.content, `Propuesta_History_${proposal.id}.txt`)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {proposal.content.substring(0, 200)}...
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

      {/* Casos de éxito */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Casos de Éxito</CardTitle>
          <CardDescription>Propuestas generadas que cerraron negocios importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🏢 Consultoría IA Grande</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Propuesta para implementación de IA en corporación multinacional"
              </p>
              <Badge variant="outline">Cerrado: $250,000</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🚀 Startup Tecnológica</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Desarrollo de chatbot personalizado para servicio al cliente"
              </p>
              <Badge variant="outline">Cerrado: $45,000</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">📈 E-commerce Local</h4>
              <p className="text-sm text-muted-foreground mb-2">
                "Sistema de recomendación impulsado por IA"
              </p>
              <Badge variant="outline">Cerrado: $28,000</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner de planes */}
      <PricingBanner />
    </div>
  )
}