'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageCircle, Clock } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://n8n.ibpweb.site/webhook/monetizao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contacto-page',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })

        // Google Analytics event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: 'Contact Form',
            value: 1
          })
        }
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error:', error)
      // Mostrar mensaje de error
      alert('Error al enviar el formulario. Por favor, intenta nuevamente más tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="container px-4 py-8 md:px-6 max-w-4xl">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold mb-4 text-green-800">¡Mensaje Enviado con Éxito!</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en las próximas 24 horas hábiles con una respuesta personalizada.
            </p>

            {/* Recommended Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 max-w-lg mx-auto">
              <h4 className="font-semibold text-gray-800 mb-3">📚 Mientras esperas, puedes:</h4>
              <div className="space-y-3">
                <a href="/guias" className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-1">Explorar nuestras Guías de IA</h5>
                  <p className="text-sm text-gray-600">Aprende estrategias probadas para monetizar con Inteligencia Artificial</p>
                </a>
                <a href="/blog" className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-1">Leer nuestro Blog</h5>
                  <p className="text-sm text-gray-600">Descubre los últimos casos de éxito y estrategias</p>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button onClick={() => setSubmitted(false)} size="lg">
                Enviar Otro Mensaje
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/guias">
                  Ver Guías de IA
                </a>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 text-sm text-gray-500">
              <p>¿Necesitas respuesta urgente? Llámanos al <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a> o escribe a <a href="mailto:hola@monetizao.com" className="text-primary hover:underline">hola@monetizao.com</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Contacta con Nosotros
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes preguntas sobre estrategias de monetización con IA? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Envíanos un Mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nombre Completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="¿Cómo podemos ayudarte?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntanos más sobre tu proyecto o consulta..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Correo Electrónico</p>
                  <p className="text-sm text-muted-foreground">hola@monetizao.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Respuesta Rápida</p>
                  <p className="text-sm text-muted-foreground">24-48 horas hábiles</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Horario de Atención</p>
                  <p className="text-sm text-muted-foreground">Lunes a Viernes, 9:00 - 18:00 (GMT-5)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Temas Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium mb-3">¿Sobre qué necesitas ayuda?</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Estrategias ChatGPT
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Monetización IA
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Prompts Lucrativos
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Automatización
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Marketing IA
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Consultoría
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Link */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">¿Buscas respuestas rápidas?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Visita nuestro blog donde compartimos estrategias detalladas y casos de éxito.
              </p>
              <Button variant="outline" asChild>
                <a href="/blog">
                  Ver Estrategias
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}