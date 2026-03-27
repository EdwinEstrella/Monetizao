import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Database, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Monetizao',
  description: 'Política de privacidad de Monetizao - Protección de datos y privacidad del usuario.',
  openGraph: {
    title: 'Política de Privacidad | Monetizao',
    description: 'Política de privacidad de Monetizao - Protección de datos y privacidad del usuario.',
    url: 'https://monetizao.com/privacidad',
  },
}

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Política de Privacidad
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Última actualización: {new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Alcance de esta Política
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              Esta Política de Privacidad se aplica a todos los servicios, sitios web y aplicaciones proporcionados por Monetizao
              (en adelante, &ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo; o &ldquo;Monetizao&rdquo;). Al utilizar nuestros servicios, aceptas las prácticas
              descritas en esta política.
            </p>
          </CardContent>
        </Card>

        {/* Information Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Información que Recopilamos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Información Personal</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Nombre y dirección de correo electrónico</li>
                <li>Información de contacto proporcionada voluntariamente</li>
                <li>Información demográfica opcional</li>
                <li>Historial de compras o suscripciones</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Información Técnica</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Dirección IP y tipo de navegador</li>
                <li>Información del dispositivo y sistema operativo</li>
                <li>Cookies y tecnologías similares</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Referidores y sitios web de origen</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Información de Uso</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Contenido que accedes o descargas</li>
                <li>Interacciones con nuestro contenido</li>
                <li>Preferencias y configuraciones</li>
                <li>Comentarios y feedback proporcionado</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card>
          <CardHeader>
            <CardTitle>¿Cómo Usamos tu Información?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Para Servirte Mejor</h4>
                <ul className="text-sm space-y-1">
                  <li>• Personalizar contenido y recomendaciones</li>
                  <li>• Mejorar nuestros servicios</li>
                  <li>• Responder a tus consultas</li>
                  <li>• Proporcionar soporte técnico</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Para Seguridad y Legal</h4>
                <ul className="text-sm space-y-1">
                  <li>• Prevenir fraudes y abusos</li>
                  <li>• Cumplir con leyes aplicables</li>
                  <li>• Proteger nuestros derechos</li>
                  <li>• Mantener la seguridad del sitio</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>Cookies y Tecnologías Similares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio:
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Cookies Esenciales</h4>
                <p className="text-sm text-muted-foreground">
                  Necesarias para el funcionamiento básico del sitio.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Cookies de Rendimiento</h4>
                <p className="text-sm text-muted-foreground">
                  Nos ayudan a entender cómo utilizas nuestro sitio para mejorarlo.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Cookies de Funcionalidad</h4>
                <p className="text-sm text-muted-foreground">
                  Recuerdan tus preferencias y configuraciones.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Cookies de Publicidad</h4>
                <p className="text-sm text-muted-foreground">
                  Utilizamos Google AdSense para mostrar anuncios relevantes.
                </p>
              </div>
            </div>

            <p className="text-sm">
              Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.
            </p>
          </CardContent>
        </Card>

        {/* Third Party Services */}
        <Card>
          <CardHeader>
            <CardTitle>Servicios de Terceros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Compartimos información con los siguientes servicios de terceros:
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-muted rounded">
                <h4 className="font-semibold">Google AdSense</h4>
                <p className="text-sm text-muted-foreground">
                  Para mostrar publicidad relevante. Ver su
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                    política de privacidad
                  </a>.
                </p>
              </div>

              <div className="p-3 bg-muted rounded">
                <h4 className="font-semibold">Google Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Para analizar el tráfico del sitio. Ver su
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                    política de privacidad
                  </a>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Tus Derechos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Tienes los siguientes derechos sobre tu información personal:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Acceso:</strong> Solicitar una copia de tu información personal.
              </li>
              <li>
                <strong>Corrección:</strong> Solicitar la corrección de información inexacta.
              </li>
              <li>
                <strong>Eliminación:</strong> Solicitar la eliminación de tu información personal.
              </li>
              <li>
                <strong>Portabilidad:</strong> Recibir tu información en un formato estructurado.
              </li>
              <li>
                <strong>Oposición:</strong> Oponerte al procesamiento de tu información.
              </li>
              <li>
                <strong>Restricción:</strong> Limitar el procesamiento de tu información.
              </li>
            </ul>

            <p className="text-sm bg-muted p-3 rounded">
              Para ejercer estos derechos, contáctanos en hola@monetizao.com
            </p>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <CardTitle>Seguridad de tus Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información
              contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>

            <p>
              Sin embargo, ningún sistema es 100% seguro. Te recomendamos tomar precauciones adicionales como
              usar contraseñas seguras y no compartir tu información de acceso.
            </p>
          </CardContent>
        </Card>

        {/* Children Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Privacidad de Menores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionadamente
              información personal de menores. Si eres padre/tutor y crees que tu hijo nos ha proporcionado
              información personal, contáctanos inmediatamente.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Cambios en esta Política</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cambios
              significativos publicando la nueva política en esta página y actualizando la fecha de
              &ldquo;Última actualización&rdquo;.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Si tienes preguntas sobre esta Política de Privacidad o quieres ejercer tus derechos,
              contáctanos:
            </p>

            <div className="space-y-2">
              <p><strong>Correo electrónico:</strong> hola@monetizao.com</p>
              <p><strong>Sitio web:</strong> https://monetizao.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}