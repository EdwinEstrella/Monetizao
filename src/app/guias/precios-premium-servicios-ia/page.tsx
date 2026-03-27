import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp, Target, CheckCircle, DollarSign } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Precios Premium para Servicios de IA | Monetizao',
  description: 'Deja de cobrar poco. Aprende estrategias de pricing que te permiten cobrar 3-10 veces más por servicios de IA. Posicionamiento, valor y estructura de precios.',
  openGraph: {
    title: 'Precios Premium para Servicios de IA',
    description: 'Aprende a cobrar premium por servicios de IA con estrategias probadas.'
  },
}

export default function PreciosPremiumPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      <Link href="/guias" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Guías
      </Link>

      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">Estrategia</Badge>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Precios Premium para Servicios de IA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Deja de cobrar poco. Aprende estrategias de pricing que te permiten cobrar 3-10 veces más por servicios de IA.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>22 min de lectura</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>7,340 estudiantes</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Popular</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              El Error Más Costoso: Subvaluación de Servicios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              El 90% de freelancers y consultores de IA cobran 50-80% menos de lo que podrían.
              No por falta de calidad, sino por falta de estrategia de precios y posicionamiento.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">73%</p>
                <p className="text-sm text-muted-foreground">Cobra por tiempo, no por valor</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">$47/hora</p>
                <p className="text-sm text-muted-foreground">Tarifa promedio freelancer IA</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">$150/hora</p>
                <p className="text-sm text-muted-foreground">Tarifa promedio premium IA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistema de 5 Niveles para Precios Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Nivel 1: Medir Valor en Resultados</h4>
                <p className="text-sm text-muted-foreground">
                  En lugar de "$25/hora", presenta "Aumento 40% en conversiones" o "Reducción 60% en costos".
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Nivel 2: Crear Jerarquía de Precios</h4>
                <p className="text-sm text-muted-foreground">
                  Básico ($500), Estándar ($1200), Premium ($3000). El 70% elige opción del medio.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Nivel 3: Añadir Urgencia y Escasez</h4>
                <p className="text-sm text-muted-foreground">
                  "Solo 3 cupos este mes", "Precio sube a $4500 la próxima semana".
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Nivel 4: Ofrecer Garantías</h4>
                <p className="text-sm text-muted-foreground">
                  "Resultados o te devuelvo el 50%" o "Satisfacción 100% garantizada".
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Nivel 5: Construir Autoridad</h4>
                <p className="text-sm text-muted-foreground">
                  Casos de éxito, testimonios, y posicionamiento como experto indiscutible.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ejemplos de Pricing Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h4 className="font-semibold mb-2">Consultoría IA Marketing</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Badge className="mb-2">Básico</Badge>
                    <p className="font-bold">$1,500</p>
                    <p className="text-sm">Diagnóstico + roadmap básico</p>
                  </div>
                  <div className="border-primary border-2 rounded p-2">
                    <Badge className="mb-2">Popular</Badge>
                    <p className="font-bold">$3,500</p>
                    <p className="text-sm">Implementación completa + 3 meses soporte</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Premium</Badge>
                    <p className="font-bold">$7,500</p>
                    <p className="text-sm">Sistema completo + equipo training</p>
                  </div>
                </div>
              </div>

              <div className="border rounded p-4">
                <h4 className="font-semibold mb-2">Servicio de Content Creation</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Badge className="mb-2">Starter</Badge>
                    <p className="font-bold">$800/mes</p>
                    <p className="text-sm">8 posts + 2 artículos blog</p>
                  </div>
                  <div className="border-primary border-2 rounded p-2">
                    <Badge className="mb-2">Growth</Badge>
                    <p className="font-bold">$1,800/mes</p>
                    <p className="text-sm">20 posts + 8 artículos + emails</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Enterprise</Badge>
                    <p className="font-bold">$3,500/mes</p>
                    <p className="text-sm">Contenido completo + strategy + reporting</p>
                  </div>
                </div>
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
              <Link href="/contacto">Implementar Estrategia de Precios Premium</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}