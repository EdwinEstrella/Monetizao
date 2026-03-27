import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'IA para E-commerce: Optimización y Escalabilidad | Monetizao',
  description: 'Transforma tu tienda online con IA. Optimización de precios, recomendaciones personalizadas, atención al cliente automatizada y estrategias de crecimiento.',
  openGraph: {
    title: 'IA para E-commerce: Optimización y Escalabilidad',
    description: 'Optimiza tu tienda online con Inteligencia Artificial.'
  },
}

export default function EcommercePage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      <Link href="/guias" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Guías
      </Link>

      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">E-commerce</Badge>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          IA para E-commerce: Optimización y Escalabilidad
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Transforma tu tienda online con IA. Optimización de precios, recomendaciones personalizadas y estrategias de crecimiento.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>38 min de lectura</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>3,890 estudiantes</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Nuevo</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>IA para E-commerce</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Optimiza cada aspecto de tu tienda online con IA para aumentar conversiones y reducir costos operativos.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Aplicaciones Clave</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Recomendaciones personalizadas</li>
                  <li>• Chatbots de atención</li>
                  <li>• Optimización de precios</li>
                  <li>• Análisis de sentimiento</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Herramientas</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Shopify + GPT</li>
                  <li>• Dynamic Yield</li>
                  <li>• Chatfuel</li>
                  <li>• Clarifai</li>
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
              <Link href="/contacto">Optimizar E-commerce con IA</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}