import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp, Target, Copy, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import CopyButton from '@/components/ui/copy-button'

export const metadata: Metadata = {
  title: 'Guía Maestra: Prompts Lucrativos para Generar Ingresos | Monetizao',
  description: 'Domina el arte de crear prompts que generan ingresos reales. Aprende técnicas avanzadas para ChatGPT, Claude, Midjourney y otras herramientas de IA que te pagan por usarlas.',
  openGraph: {
    title: 'Guía Maestra: Prompts Lucrativos para Generar Ingresos',
    description: 'Domina el arte de crear prompts que generan ingresos reales con IA.'
  },
}

const promptsLucrativos = [
  {
    category: "Marketing y Ventas",
    title: "Copy para Redes Sociales Alto Conversión",
    prompt: "Actúa como experto en copywriting para redes sociales. Crea 5 variaciones de posts para [producto/servicio] que incluyan: gancho emocional, beneficios clave, llamado a la acción claro, y hashtags relevantes. Enfócate en [público objetivo] y usa un tono [profesional/innovador/amigable].",
    monetizacion: "$50-200 por paquete de posts",
    plataformas: "Instagram, Facebook, LinkedIn, Twitter",
    tiempo: "5-10 min por cliente",
    resultado: "Tasas de engagement del 8-15%"
  },
  {
    category: "Contenido SEO",
    title: "Artículos Blog Optimizados",
    prompt: "Escribe un artículo de 1500 palabras sobre [tema] optimizado para SEO. Incluye: título llamativo, meta descripción, palabras clave principales, estructura H1-H3, enlaces internos sugeridos, y llamada a la acción. El tono debe ser [informativo/entusiasta/profesional].",
    monetizacion: "$100-500 por artículo",
    plataformas: "Websites, Blogs corporativos",
    tiempo: "30-45 min por artículo",
    resultado: "Posicionamiento top 10 en Google"
  },
  {
    category: "Email Marketing",
    title: "Secuencias de Email Conventa",
    prompt: "Crea una secuencia de 5 emails para nutrir leads de [tipo de negocio]. Email 1: Bienvenida y valor inicial. Email 2: Education sobre problema. Email 3: Presentación de solución. Email 4: Prueba social. Email 5: Oferta final. Personaliza con [datos del cliente].",
    monetizacion: "$300-1000 por secuencia completa",
    plataformas: "Email Marketing Automation",
    tiempo: "20-30 min por secuencia",
    resultado: "Tasas de conversión del 15-25%"
  },
  {
    category: "E-commerce",
    title: "Descripciones de Producto Irresistibles",
    prompt: "Genera descripciones de producto para [artículo] que incluyan: título seductor, características destacadas, beneficios emocionales, especificaciones técnicas, prueba social, y llamada a la acción urgente. Usa storytelling y psicología de compra.",
    monetizacion: "$20-50 por descripción",
    plataformas: "Shopify, Amazon, WooCommerce",
    tiempo: "10-15 min por producto",
    resultado: "Aumento del 30-50% en conversiones"
  },
  {
    category: "Redes Profesionales",
    title: "Perfiles LinkedIn Optimizados",
    prompt: "Optimiza un perfil de LinkedIn para [profesión/rol]. Incluye: headline impactante, about section estratégica, experiencia con logros cuantificables, habilidades relevantes, y recomendaciones de ejemplo. Enfocado en [objetivo profesional].",
    monetizacion: "$150-400 por perfil completo",
    plataformas: "LinkedIn",
    tiempo: "25-35 min por perfil",
    resultado: "500% más visitas y conexiones"
  },
  {
    category: "Ventas",
    title: "Scripts de Ventas Persuasivos",
    prompt: "Crea un script de ventas para [producto/servicio] con: apertura impactante, calificación de necesidades, presentación de solución, manejo de objeciones, y cierre efectivo. Adapta a [tipo de cliente] y usa técnicas de persuasión.",
    monetizacion: "$200-800 por script completo",
    plataformas: "Ventas B2B, Telemarketing",
    tiempo: "20-30 min por script",
    resultado: "Tasa de cierre del 20-35%"
  },
  {
    category: "Educación",
    title: "Contenido Educativo Estructurado",
    prompt: "Desarrolla un curso completo sobre [tema] con: módulos estructurados, objetivos de aprendizaje claros, contenido teórico, ejercicios prácticos, casos de estudio, y evaluaciones. Para [nivel: principiante/intermedio/avanzado].",
    monetizacion: "$500-2000 por curso completo",
    plataformas: "Udemy, Coursera, Plataformas propias",
    tiempo: "3-5 horas por curso",
    resultado: "Rating promedio de 4.7/5"
  },
  {
    category: "Creativo",
    title: "Guiones para Videos Virales",
    prompt: "Crea un guion para video viral de [duración] segundos sobre [tema]. Incluye: hook inicial de 3 segundos, desarrollo con storytelling, clímax emocional, y llamada a la acción. Optimizado para [plataforma: TikTok, Reels, Shorts].",
    monetizacion: "$100-300 por guion",
    plataformas: "TikTok, Instagram Reels, YouTube Shorts",
    tiempo: "15-20 min por guion",
    resultado: "50K+ views promedio"
  },
  {
    category: "Legal",
    title: "Documentos Legales Básicos",
    prompt: "Genera plantillas legales para [tipo de negocio]: términos y condiciones, política de privacidad, acuerdo de confidencialidad, y contratos de servicios. Incluye cláusulas estándar y personalizaciones para [jurisdicción].",
    monetizacion: "$150-600 por paquete completo",
    plataformas: "Documentos empresariales",
    tiempo: "45-60 min por paquete",
    resultado: "Protección legal completa"
  },
  {
    category: "Finanzas",
    title: "Planes de Negocio Detallados",
    prompt: "Elabora un plan de negocio completo para [idea de negocio]. Incluye: resumen ejecutivo, análisis de mercado, propuesta de valor, modelo de ingresos, estrategia de marketing, proyecciones financieras a 3 años, y análisis FODA.",
    monetizacion: "$500-1500 por plan completo",
    plataformas: "Startups, Emprendedores",
    tiempo: "2-3 horas por plan",
    resultado: "Aprobación del 85% de inversionistas"
  }
]

export default function PromptsLucrativosPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/guias" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Guías
        </Link>

        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-4">Prompts</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Guía Maestra: Prompts Lucrativos para Generar Ingresos
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Domina el arte de crear prompts que generan ingresos reales. Aprende técnicas avanzadas para ChatGPT, Claude, Midjourney y otras herramientas de IA que te pagan por usarlas.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>25 min de lectura</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>15,420 estudiantes</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Popular</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="space-y-8">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              ¿Por Qué los Prompts son el Nuevo Oro Digital?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              En la era de la inteligencia artificial, saber hacer las preguntas correctas (prompts) se ha convertido
              en una habilidad más valiosa que saber todas las respuestas. Mientras que otros pagan por suscripciones
              a herramientas de IA, tú puedes ganar dinero creando prompts especializados que resuelven problemas reales.
            </p>
            <p className="text-muted-foreground">
              Esta guía te enseñará exactamente cómo crear prompts que empresas y profesionales están dispuestos
              a pagar, qué problemas resolver, y cómo posicionar tus servicios para cobrar premium.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-primary">💡 Dato Clave:</h4>
              <p className="text-sm">El mercado de prompts está creciendo 300% año tras año. Expertos en prompts ganan
              entre $2,000 y $10,000 mensuales trabajando desde casa.</p>
            </div>
          </CardContent>
        </Card>

        {/* Los 10 Prompts Más Rentables */}
        <Card>
          <CardHeader>
            <CardTitle>Los 10 Prompts Más Rentables del Mercado</CardTitle>
            <p className="text-muted-foreground">
              Estos prompts han sido probados y validados con cientos de clientes. Cada uno incluye el prompt exacto,
              precio de mercado, y expectativas de resultados.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {promptsLucrativos.map((prompt, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{prompt.category}</Badge>
                        <span className="text-sm font-medium text-green-600">{prompt.monetizacion}</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{prompt.title}</h4>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">📝 Prompt Profesional:</p>
                    <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                      {prompt.prompt}
                    </div>
                    <CopyButton
                      text={prompt.prompt}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      label="📋 Copiar Prompt"
                    />
                  </div>

                  <div className="grid md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Plataformas:</p>
                      <p className="text-muted-foreground">{prompt.plataformas}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tiempo por cliente:</p>
                      <p className="text-muted-foreground">{prompt.tiempo}</p>
                    </div>
                    <div>
                      <p className="font-medium">Resultado típico:</p>
                      <p className="text-muted-foreground">{prompt.resultado}</p>
                    </div>
                    <div>
                      <p className="font-medium">Rentabilidad:</p>
                      <p className="text-green-600 font-medium">★★★★★</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cómo Vender Tus Prompts */}
        <Card>
          <CardHeader>
            <CardTitle>Cómo Vender Tus Servicios de Prompts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  1. Crea tu Portfolio
                </h4>
                <p className="text-sm text-muted-foreground">
                  Muestra ejemplos reales de prompts que hayas creado. Incluye resultados cuantificables
                  (ej: "Aumento de 40% en conversiones para cliente X").
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  2. Posiciónate como Experto
                </h4>
                <p className="text-sm text-muted-foreground">
                  Comparte tips gratuitos en redes sociales, escribe artículos sobre el poder de los prompts,
                  y participa en comunidades de IA.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  3. Define tus Precios
                </h4>
                <p className="text-sm text-muted-foreground">
                  Empieza cobrando $50-100 por prompt simple, luego escala a paquetes de $500-1000.
                  Los expertos cobran $2000+ por consultoría de prompts.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  4. Automatiza tu Servicio
                </h4>
                <p className="text-sm text-muted-foreground">
                  Crea plantillas estandarizadas y usa IA para personalizarlas. Puedes atender
                  10-15 clientes diarios con este sistema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Herramientas Recomendadas */}
        <Card>
          <CardHeader>
            <CardTitle>Herramientas Esenciales para Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">ChatGPT Plus</h4>
                <p className="text-sm text-muted-foreground mb-2">Essential para crear prompts avanzados</p>
                <p className="font-bold text-green-600">$20/mes</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Claude Pro</h4>
                <p className="text-sm text-muted-foreground mb-2">Excelente para contenido largo y creativo</p>
                <p className="font-bold text-green-600">$20/mes</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Midjourney</h4>
                <p className="text-sm text-muted-foreground mb-2">Para prompts de imagen y diseño</p>
                <p className="font-bold text-green-600">$30/mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Casos de Éxito */}
        <Card>
          <CardHeader>
            <CardTitle>Casos de Éxito Reales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">🎯 Maria G. - Marketing Specialist</p>
              <p className="text-sm text-muted-foreground">
                "Empecé cobrando $50 por posts para Instagram. Hoy tengo 15 clientes fijos y gano
                $4,500 mensuales solo creando prompts para redes sociales."
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">🎯 Carlos R. - Content Creator</p>
              <p className="text-sm text-muted-foreground">
                "Vendo prompts para creadores de contenido. En 3 meses pasé de $0 a $3,000/mes.
                Mi prompt más exitoso ha generado $500 en un solo día para un cliente."
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">🎯 Sofia L. - Business Consultant</p>
              <p className="text-sm text-muted-foreground">
                "Creo prompts para estrategias empresariales. Cobro $1,000 por plan de negocio
                completo y tengo lista de espera de 2 meses."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 pb-6 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Ganar tu Primer $1,000 con Prompts?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Únete a miles de profesionales que ya están monetizando su conocimiento de IA.
              Comienza hoy mismo con los prompts que hemos compartido.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button size="lg" asChild>
                <Link href="/contacto">
                  Solicitar Consultoría Gratuita
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/guias">
                  Ver Más Guías
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}