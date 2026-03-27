import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cookie, Shield, Eye, Database, Settings, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Cookies | Monetizao',
  description: 'Política de cookies de Monetizao - Información sobre el uso de cookies en nuestro sitio web.',
  openGraph: {
    title: 'Política de Cookies | Monetizao',
    description: 'Política de cookies de Monetizao - Información sobre el uso de cookies en nuestro sitio web.',
    url: 'https://monetizao.com/cookies',
  },
}

export default function CookiesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Cookie className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Política de Cookies
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Información clara sobre cómo usamos las cookies para mejorar tu experiencia
          en nuestro sitio web de monetización con IA.
        </p>
      </div>

      {/* Cookie Types Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Tipos de Cookies que Usamos</h2>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <CardTitle>Cookies Esenciales</CardTitle>
                <Badge variant="default">Siempre Activas</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Son necesarias para el funcionamiento básico del sitio. Sin estas cookies,
                el sitio no puede funcionar correctamente.
              </p>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Incluyen:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Autenticación de usuarios</li>
                  <li>• Carrito de compras</li>
                  <li>• Información de seguridad</li>
                  <li>• Preferencias básicas del sitio</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-green-600" />
                <CardTitle>Cookies de Análisis</CardTitle>
                <Badge variant="secondary">Opcionales</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio
                para mejorar la experiencia y el contenido.
              </p>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Herramientas que usamos:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Analytics</li>
                  <li>• Hotjar (mapas de calor)</li>
                  <li>• Google Search Console</li>
                  <li>• Métricas de rendimiento</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-purple-600" />
                <CardTitle>Cookies de Marketing</CardTitle>
                <Badge variant="secondary">Opcionales</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Se utilizan para mostrarte anuncios relevantes y medir la efectividad
                de nuestras campañas de marketing.
              </p>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Plataformas:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Ads</li>
                  <li>• Facebook Pixel</li>
                  <li>• LinkedIn Insight Tag</li>
                  <li>• Retargeting personalizado</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-orange-600" />
                <CardTitle>Cookies de Funcionalidad</CardTitle>
                <Badge variant="secondary">Opcionales</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Mejoran la funcionalidad del sitio recordando tus preferencias
                y personalizaciones.
              </p>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Ejemplos:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Idioma preferido</li>
                  <li>• Tema (claro/oscuro)</li>
                  <li>• Contenido guardado</li>
                  <li>• Preferencias de navegación</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How to Manage Cookies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">¿Cómo Gestionar las Cookies?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Desde tu Navegador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Puedes configurar tu navegador para rechazar cookies o para notificarte
                cuando se envían cookies.
              </p>
              <div className="text-sm space-y-2">
                <p><strong>Chrome:</strong> Configuración → Privacidad → Cookies</p>
                <p><strong>Firefox:</strong> Opciones → Privacidad → Historial</p>
                <p><strong>Safari:</strong> Preferencias → Privacidad → Cookies</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Desde nuestro Banner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nuestro banner de cookies te permite:
              </p>
              <ul className="text-sm space-y-2">
                <li>• Aceptar todas las cookies</li>
                <li>• Rechazar cookies no esenciales</li>
                <li>• Personalizar tus preferencias</li>
                <li>• Cambiar configuración posteriormente</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Cookies de Terceros</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Servicios Externos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Utilizamos servicios de terceros que pueden instalar sus propias cookies.
              Estos servicios tienen sus propias políticas de privacidad:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Google Services</h4>
                  <p className="text-sm text-muted-foreground">Analytics, Ads, reCAPTCHA</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Meta Platforms</h4>
                  <p className="text-sm text-muted-foreground">Facebook Pixel, Instagram Ads</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-sm text-muted-foreground">LinkedIn Insight Tag</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Hotjar</h4>
                  <p className="text-sm text-muted-foreground">Análisis de comportamiento</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info */}
      <section className="bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">¿Tienes Preguntas?</h2>
        <p className="text-muted-foreground mb-6">
          Si tienes alguna pregunta sobre nuestra política de cookies o cómo gestionamos
          tu información, no dudes en contactarnos.
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <strong>Email:</strong> privacy@monetizao.com
          </div>
          <div>
            <strong>Teléfono:</strong> +34 900 123 456
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
        </p>
      </section>
    </div>
  )
}