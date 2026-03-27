import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, AlertTriangle, Scale, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Monetizao',
  description: 'Términos y condiciones de uso de los servicios de Monetizao.',
  openGraph: {
    title: 'Términos y Condiciones | Monetizao',
    description: 'Términos y condiciones de uso de los servicios de Monetizao.',
    url: 'https://monetizao.com/terminos',
  },
}

export default function TermsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Términos que rigen el uso de nuestros servicios y contenido. Al usar Monetizao, aceptas estos términos.
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
        {/* Acceptance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Aceptación de los Términos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              Al acceder y utilizar nuestros servicios, contenido y sitio web (en conjunto, los &ldquo;Servicios&rdquo;),
              aceptas estar sujeto a estos Términos y Condiciones (&ldquo;Términos&rdquo;). Si no estás de acuerdo con
              estos términos, no utilices nuestros Servicios.
            </p>
          </CardContent>
        </Card>

        {/* Description of Services */}
        <Card>
          <CardHeader>
            <CardTitle>Descripción de los Servicios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Monetizao proporciona:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Contenido educativo sobre estrategias de monetización con Inteligencia Artificial</li>
              <li>Artículos, guías y tutoriales sobre el uso de ChatGPT y otras herramientas de IA</li>
              <li>Plantillas y prompts para optimizar procesos y generar ingresos</li>
              <li>Recursos y estrategias para freelancers y emprendedores</li>
              <li>Contenido gratuito y de pago sobre monetización digital</li>
            </ul>

            <p className="text-sm bg-muted p-3 rounded">
              Los resultados pueden variar según el esfuerzo individual, la implementación y otros factores.
            </p>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>Responsabilidades del Usuario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Como usuario, te comprometes a:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Proporcionar información veraz y actualizada</li>
                <li>Utilizar los servicios para fines legítimos</li>
                <li>No infringir derechos de propiedad intelectual</li>
                <li>No compartir contenido de forma no autorizada</li>
                <li>No realizar actividades fraudulentas o engañosas</li>
                <li>Respetar a otros usuarios y a nuestro equipo</li>
                <li>Cumplir con todas las leyes aplicables</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm">
                <strong>Importante:</strong> El incumplimiento de estas responsabilidades puede resultar
                en la suspensión o terminación de tu acceso a nuestros servicios.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle>Propiedad Intelectual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Todo el contenido, incluyendo pero no limitado a textos, imágenes, gráficos, logos,
              software, y otros materiales, es propiedad de Monetizao o de nuestros licenciantes
              y está protegido por leyes de propiedad intelectual.
            </p>

            <div>
              <h3 className="font-semibold mb-2">Puedes:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Leer y descargar contenido para uso personal</li>
                <li>Compartir enlaces a nuestro contenido</li>
                <li>Citar nuestro contenido con atribución adecuada</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">No puedes:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Vender, licenciar o comercializar nuestro contenido</li>
                <li>Reproducirlo masivamente sin permiso</li>
                <li>Modificar o crear obras derivadas</li>
                <li>Eliminar avisos de propiedad intelectual</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Descargo de Responsabilidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">Resultados e Ingresos</p>
            <p>
              La información proporcionada en nuestros servicios tiene fines educativos e informativos.
              No garantizamos ningún nivel específico de ingresos o resultados. El éxito en la
              monetización con IA depende de muchos factores incluyendo esfuerzo individual,
              experiencia, implementación y condiciones del mercado.
            </p>

            <p className="font-semibold">Riesgos</p>
            <p>
              Cualquier actividad de negocio o inversión conlleva riesgos. Debes evaluar cuidadosamente
              tu situación financiera y consultar con profesionales antes de tomar decisiones de negocio.
            </p>

            <p className="font-semibold">Información del Mercado</p>
            <p>
              El mercado de la IA y la monetización digital cambia rápidamente. La información puede
              volverse desactualizada. Te recomendamos mantenerte informado y adaptar estrategias
              según las condiciones actuales del mercado.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card>
          <CardHeader>
            <CardTitle>Limitación de Responsabilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              En la medida máxima permitida por la ley, Monetizao no será responsable por ningún
              daño directo, indirecto, incidental, especial o consecuente que resulte del uso o
              la incapacidad de uso de nuestros servicios.
            </p>

            <p className="mt-4">
              Esto incluye, pero no se limita a, pérdida de datos, pérdida de ingresos, pérdida de
              oportunidades de negocio, o cualquier otro daño financiero o no financiero.
            </p>
          </CardContent>
        </Card>

        {/* Payment and Refunds */}
        <Card>
          <CardHeader>
            <CardTitle>Pagos y Reembolsos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Servicios de Pago</h3>
              <p>
                Para productos o servicios de pago, utilizamos procesadores de pago seguros. Tu
                información de pago es procesada por terceros seguros y no almacenamos tus datos
                de tarjetas de crédito.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Política de Reembolsos</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Productos digitales: Generalmente no reembolsables después de la descarga</li>
                <li>Suscripciones: Cancelables en cualquier momento, sin reembolso proporcional</li>
                <li>Servicios personalizados: Reembolsos según términos específicos del servicio</li>
              </ul>
            </div>

            <p className="text-sm bg-muted p-3 rounded">
              Para solicitar un reembolso, contáctanos dentro de los plazos especificados.
            </p>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacidad y Datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Tu privacidad es importante para nosotros. El uso de tus datos personales se rige
              por nuestra Política de Privacidad, que forma parte integrante de estos Términos.
            </p>

            <p className="mt-2">
              Al utilizar nuestros servicios, aceptas la recopilación y uso de tu información
              según lo descrito en nuestra Política de Privacidad.
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card>
          <CardHeader>
            <CardTitle>Terminación</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Podemos suspender o terminar tu acceso a nuestros servicios en cualquier momento
              por cualquier motivo, incluyendo pero no limitado a violación de estos términos,
              actividad fraudulenta, o comportamiento perjudicial para otros usuarios.
            </p>

            <p className="mt-4">
              También puedes terminar tu cuenta en cualquier momento. La terminación no afectará
              tus obligaciones bajo estos términos que hayan surgido antes de la terminación.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Cambios en los Términos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Podemos actualizar estos términos ocasionalmente. Te notificaremos cambios
              significativos publicando los nuevos términos en esta página y actualizando
              la fecha de &ldquo;Última actualización&rdquo;.
            </p>

            <p className="mt-4">
              El uso continuo de nuestros servicios después de cambios constituye aceptación
              de los nuevos términos.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card>
          <CardHeader>
            <CardTitle>Ley Aplicable y Jurisdicción</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Estos términos se rigen por las leyes aplicables en nuestra jurisdicción.
              Cualquier disputa será resuelta en los tribunales competentes de nuestra
              ubicación principal.
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
              Si tienes preguntas sobre estos Términos y Condiciones, contáctanos:
            </p>

            <div className="space-y-2">
              <p><strong>Correo electrónico:</strong> hola@monetizao.com</p>
              <p><strong>Sitio web:</strong> https://monetizao.com</p>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Al usar nuestros servicios, reconoces que has leído, entendido y aceptado
              estos Términos y Condiciones.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}