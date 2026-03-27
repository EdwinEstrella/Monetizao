import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Marketing y Ventas con IA: Adquisición Automatizada | Monetizao',
  description: 'Atrae clientes constantemente usando IA para marketing, ventas y seguimiento. Construye una máquina de ventas que nunca descansa.',
  openGraph: {
    title: 'Marketing y Ventas con IA: Adquisición Automatizada',
    description: 'Atrae clientes constantemente usando IA para marketing y ventas.'
  },
}

export default function MarketingVentasPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      <Link href="/guias" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Guías
      </Link>

      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">Marketing</Badge>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Marketing y Ventas con IA: Adquisición Automatizada
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Atrae clientes constantemente usando IA para marketing, ventas y seguimiento. Construye una máquina de ventas que nunca descansa.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>32 min de lectura</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>6,230 estudiantes</span>
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
            <CardTitle>Marketing y Ventas con IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Aprende a crear sistemas automatizados que atraen y convierten clientes 24/7 usando IA.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Componentes del Sistema</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Lead generation automática</li>
                  <li>• Lead scoring con IA</li>
                  <li>• Email marketing personalizado</li>
                  <li>• Chatbots de ventas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Herramientas</h4>
                <ul className="space-y-2 text-sm">
                  <li>• HubSpot + ChatGPT</li>
                  <li>• Make para automatización</li>
                  <li>• Voiceflow para chatbots</li>
                  <li>• Jasper para contenido</li>
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
              <Link href="/contacto">Implementar Marketing con IA</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}