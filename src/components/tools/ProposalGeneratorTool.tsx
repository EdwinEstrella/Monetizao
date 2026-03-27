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
import { FileText, Download, Copy, Eye, Mail, Calendar, DollarSign } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function ProposalGeneratorTool() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientIndustry: '',
    serviceDescription: '',
    budget: '',
    timeline: '',
    painPoints: '',
    solutions: '',
    proposalType: 'commercial',
  })

  const [generatedProposal, setGeneratedProposal] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const proposalTypes = [
    { value: 'commercial', label: 'Propuesta Comercial' },
    { value: 'technical', label: 'Propuesta Técnica' },
    { value: 'partnership', label: 'Propuesta de Asociación' },
    { value: 'project', label: 'Propuesta de Proyecto' },
  ]

  const industries = [
    'Tecnología',
    'Salud',
    'Finanzas',
    'Retail',
    'Manufactura',
    'Educación',
    'Servicios Profesionales',
    'Otro'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateProposal = async () => {
    // Validar campos requeridos
    const requiredFields = ['clientName', 'clientIndustry', 'serviceDescription', 'budget', 'timeline']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Simular generación con delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const proposal = generateProposalContent(formData)
      setGeneratedProposal(proposal)

      toast({
        title: "¡Propuesta generada!",
        description: "Tu propuesta comercial ha sido creada exitosamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar la propuesta",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateProposalContent = (data: any): string => {
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return `PROPUESTA COMERCIAL
${data.clientName.toUpperCase()}
Fecha: ${currentDate}

---

1. RESUMEN EJECUTIVO

${data.clientName} es una empresa del sector ${data.clientIndustry} que busca soluciones innovadoras para optimizar sus operaciones y alcanzar sus objetivos de negocio.

Esta propuesta presenta ${data.serviceDescription} como solución estratégica para generar valor medible y resultados sostenibles.

Inversión estimada: ${data.budget}€
Timeline del proyecto: ${data.timeline}

---

2. ANÁLISIS DE LA SITUACIÓN ACTUAL

${data.clientName} enfrenta desafíos en el competitivo mercado actual del sector ${data.clientIndustry}.

${data.painPoints ? `Problemáticas identificadas:
${data.painPoints.split('\n').map((point: string, index: number) => `${index + 1}. ${point.trim()}`).join('\n')}` : 'Necesitamos más información sobre los desafíos específicos.'}

Estos desafíos impactan directamente en la eficiencia operativa, costos y capacidad de crecimiento de la organización.

---

3. SOLUCIÓN PROPUESTA

${data.serviceDescription}

${data.solutions ? `Soluciones específicas:
${data.solutions.split('\n').map((solution: string, index: number) => `${index + 1}. ${solution.trim()}`).join('\n')}` : 'Nuestro equipo desarrollará soluciones personalizadas basadas en las necesidades específicas.'}

Nuestra propuesta se basa en:
- Análisis profundo de sus requerimientos
- Soluciones probadas y escalables
- Enfoque en ROI y resultados medibles
- Acompañamiento durante toda la implementación

---

4. METODOLOGÍA

Fase 1: Diagnóstico y Planificación (2-4 semanas)
- Análisis detallado de requerimientos
- Definición de objetivos y KPIs
- Diseño de arquitectura de solución

Fase 2: Desarrollo e Implementación (4-12 semanas)
- Desarrollo de soluciones personalizadas
- Integración con sistemas existentes
- Testing y validación

Fase 3: Despliegue y Capacitación (2-4 semanas)
- Implementación en producción
- Capacitación del equipo
- Transferencia de conocimiento

Fase 4: Soporte y Optimización (Continuo)
- Monitoreo y soporte técnico
- Optimización basada en resultados
- Mejoras continuas

---

5. BENEFICIOS ESPERADOS

- Reducción de costos operativos: 25-35%
- Aumento de eficiencia: 40-60%
- ROI esperado: 150-250% en 12 meses
- Mejora en satisfacción del cliente: 30-50%
- Escalabilidad y crecimiento sostenible

---

6. INVERSIÓN

Inversión Total: ${data.budget}€

Desglose:
- Consultoría y análisis: ${Math.round(parseFloat(data.budget) * 0.15)}€
- Desarrollo e implementación: ${Math.round(parseFloat(data.budget) * 0.60)}€
- Capacitación y soporte: ${Math.round(parseFloat(data.budget) * 0.15)}€
- Contingencia (10%): ${Math.round(parseFloat(data.budget) * 0.10)}€

Opciones de pago:
- 50% al inicio, 50% al finalizar
- Financiamiento disponible hasta 12 meses

---

7. GARANTÍAS

- Satisfacción garantizada o reembolso del 100%
- Soporte técnico 24/7 durante primer año
- Actualizaciones y mejoras incluidas
- Capacitación ilimitada para el equipo

---

8. NUESTRO EQUIPO

Contamos con más de 15 años de experiencia en el sector ${data.clientIndustry} y hemos ayudado a más de 500 empresas a transformar sus operaciones y alcanzar sus objetivos de negocio.

---

9. PRÓXIMOS PASOS

1. Aprobación de propuesta (1-2 días)
2. Firma de contrato (3-5 días)
3. Kick-off meeting (1 semana)
4. Inicio del proyecto (2 semanas)

---

Para proceder con esta propuesta, por favor contáctenos al:
Email: contacto@empresa.com
Teléfono: +34 900 123 456

Gracias por considerar nuestra propuesta.
Estamos seguros de que podemos ayudar a ${data.clientName} a alcanzar sus objetivos.`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedProposal)
    toast({
      title: "¡Copiado!",
      description: "La propuesta ha sido copiada al portapapeles",
    })
  }

  const downloadProposal = () => {
    const blob = new Blob([generatedProposal], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `propuesta-${formData.clientName.toLowerCase().replace(/\s+/g, '-')}.txt`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "¡Descargado!",
      description: "La propuesta ha sido descargada",
    })
  }

  const sendByEmail = () => {
    const subject = encodeURIComponent(`Propuesta Comercial para ${formData.clientName}`)
    const body = encodeURIComponent(generatedProposal)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount)
    if (isNaN(num)) return amount
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(num)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generador de Propuestas Comerciales
        </CardTitle>
        <CardDescription>
          Crea propuestas comerciales profesionales y persuasivas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clientName">Nombre del Cliente *</Label>
            <Input
              id="clientName"
              placeholder="Ej: TechCorp S.A."
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientIndustry">Industria *</Label>
            <Select value={formData.clientIndustry} onValueChange={(value) => handleInputChange('clientIndustry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la industria" />
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

          <div className="space-y-2">
            <Label htmlFor="proposalType">Tipo de Propuesta</Label>
            <Select value={formData.proposalType} onValueChange={(value) => handleInputChange('proposalType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                {proposalTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Presupuesto (€) *</Label>
            <Input
              id="budget"
              type="number"
              placeholder="Ej: 25000"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
            />
          </div>
        </div>

        {/* Service Description */}
        <div className="space-y-2">
          <Label htmlFor="serviceDescription">Descripción del Servicio *</Label>
          <Textarea
            id="serviceDescription"
            placeholder="Describe detalladamente el servicio que ofreces..."
            value={formData.serviceDescription}
            onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline del Proyecto *</Label>
            <Input
              id="timeline"
              placeholder="Ej: 12 semanas"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
            />
          </div>
        </div>

        {/* Pain Points and Solutions */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="painPoints">Problemáticas del Cliente (una por línea)</Label>
            <Textarea
              id="painPoints"
              placeholder="• Costos operativos elevados&#10;• Procesos manuales ineficientes&#10;• Falta de visibilidad del negocio"
              value={formData.painPoints}
              onChange={(e) => handleInputChange('painPoints', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solutions">Soluciones Propuestas (una por línea)</Label>
            <Textarea
              id="solutions"
              placeholder="• Automatización de procesos críticos&#10;• Dashboard de gestión en tiempo real&#10;• Integración con sistemas existentes"
              value={formData.solutions}
              onChange={(e) => handleInputChange('solutions', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={generateProposal}
            disabled={isGenerating}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <FileText className="h-4 w-4 mr-2 animate-pulse" />
                Generando propuesta...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generar Propuesta
              </>
            )}
          </Button>
        </div>

        {/* Generated Proposal */}
        {generatedProposal && (
          <div className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Propuesta Comercial Generada</Label>
                <div className="flex gap-2">
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
                    onClick={sendByEmail}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Enviar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadProposal}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {generatedProposal}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-blue-900">Consejos para mejores propuestas</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Sé específico sobre los problemas del cliente</li>
                  <li>• Cuantifica los beneficios y ROI esperados</li>
                  <li>• Incluye pruebas sociales y casos de éxito</li>
                  <li>• Personaliza el lenguaje para la industria del cliente</li>
                  <li>• Proporciona múltiples opciones de pago</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}