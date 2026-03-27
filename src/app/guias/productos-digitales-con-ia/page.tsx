import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Desarrollo de Productos Digitales con IA | Monetizao',
  description: 'Crea y lanza productos digitales exitosos usando IA. Cursos, ebooks, software, plantillas y más. Del concepto a clientes pagando en semanas.',
  openGraph: {
    title: 'Desarrollo de Productos Digitales con IA',
    description: 'Crea productos digitales exitosos usando Inteligencia Artificial.'
  },
}

export default function ProductosDigitalesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      <Link href="/guias" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Guías
      </Link>

      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">Productos</Badge>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Desarrollo de Productos Digitales con IA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Crea y lanza productos digitales exitosos usando IA. Cursos, ebooks, software, plantillas y más.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>45 min de lectura</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>4,560 estudiantes</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Productos Digitales con IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Aprende a crear productos digitales rentables usando IA para acelerar el desarrollo y mejorar la calidad.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Tipos de Productos</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Cursos online</li>
                  <li>• Ebooks y guías</li>
                  <li>• Software y herramientas</li>
                  <li>• Plantillas y sistemas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Herramientas IA</h4>
                <ul className="space-y-2 text-sm">
                  <li>• ChatGPT para contenido</li>
                  <li>• Midjourney para diseño</li>
                  <li>• Synthesia para videos</li>
                  <li>• Bubble para apps</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call to Action</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" asChild>
              <Link href="/contacto">Crear Producto Digital con IA</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}