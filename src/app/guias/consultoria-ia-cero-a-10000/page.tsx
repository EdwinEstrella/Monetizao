import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp, Target, Zap, CheckCircle, DollarSign } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Consultoría de IA: De Cero a $10,000/mes | Monetizao',
  description: 'Sistema completo para lanzar tu negocio de consultoría con IA. Encuentra clientes, fija precios premium y entrega resultados extraordinarios usando inteligencia artificial.',
  openGraph: {
    title: 'Consultoría de IA: De Cero a $10,000/mes',
    description: 'Sistema completo para lanzar tu negocio de consultoría con IA.',
    url: 'https://monetizao.com/guias/consultoria-ia-cero-a-10000',
  },
}

const pasosConsultoria = [
  {
    fase: "Fase 1: Fundamentos",
    titulo: "Establece tu Especialidad",
    descripcion: "Define tu nicho específico y conviértete en el referente.",
    tareas: [
      "Identifica 3 industrias donde la IA puede transformar negocios",
      "Elige un nicho basado en tu experiencia y demanda del mercado",
      "Crea tu propuesta de valor única",
      "Desarrolla casos de estudio iniciales (pro bono si es necesario)"
    ],
    tiempo: "2-3 semanas",
    inversion: "$100-500 en herramientas",
    resultado: "Posicionamiento claro en el mercado"
  },
  {
    fase: "Fase 2: Servicios",
    titulo: "Diseña tus Ofertas",
    descripcion: "Crea paquetes de servicios irresistible.",
    tareas: [
      "Auditoría IA: $500-1000 por diagnóstico completo",
      "Implementación: $2000-5000 por proyecto",
      "Capacitación: $800-1500 por equipo entrenado",
      "Mantenimiento: $300-800 mensuales por soporte"
    ],
    tiempo: "1 semana",
    inversion: "Tiempo para crear materiales",
    resultado: "Catálogo de servicios rentables"
  },
  {
    fase: "Fase 3: Marketing",
    titulo: "Atrae tus Primeros Clientes",
    descripcion: "Estrategias probadas para conseguir clientes de alto valor.",
    tareas: [
      "LinkedIn: publica 3 posts semanales sobre casos de éxito",
      "Networking: asiste a eventos del sector y haz presentaciones",
      "Cold Email: envía 10 emails personalizados diarios",
      "Webinars mensuales mostrando resultados reales"
    ],
    tiempo: "4-6 semanas",
    inversion: "$200-500 en publicidad",
    resultado: "2-5 clientes iniciales"
  },
  {
    fase: "Fase 4: Escalado",
    titulo: "Multiplica tus Ingresos",
    descripcion: "Sistemas para crecer sin trabajar más horas.",
    tareas: [
      "Contrata 1-2 consultores junior",
      "Crea productos digitales (cursos, plantillas)",
      "Establece alianzas estratégicas con agencias",
      "Desarrolla programa de afiliados"
    ],
    tiempo: "2-3 meses",
    inversion: "$2000-5000 en contratación",
    resultado: "$10,000+ ingresos mensuales"
  }
]

const serviciosConsultoria = [
  {
    servicio: "Auditoría de Implementación IA",
    descripcion: "Análisis completo de cómo tu empresa puede aprovechar la IA",
    precio: "$750-1500",
    duracion: "1 semana",
    entregables: [
      "Diagnóstico de procesos actuales",
      "Oportunidades de implementación",
      "Roadmap personalizado",
      "ROI estimado"
    ]
  },
  {
    servicio: "Implementación ChatGPT Empresarial",
    descripcion: "Integración completa de ChatGPT en operaciones del negocio",
    precio: "$3000-8000",
    duracion: "2-4 semanas",
    entregables: [
      "Configuración personalizada",
      "Entrenamiento del equipo",
      "Documentación completa",
      "Soporte post-implementación"
    ]
  },
  {
    servicio: "Automatización con IA",
    descripcion: "Automatización de procesos repetitivos usando IA",
    precio: "$2000-6000",
    duracion: "2-3 semanas",
    entregables: [
      "Mapa de procesos automatizables",
      "Implementación de sistemas",
      "Reducción de costos demostrada",
      "Capacitación del equipo"
    ]
  },
  {
    servicio: "Estrategia de Marketing IA",
    descripcion: "Implementación de IA en marketing y ventas",
    precio: "$2500-7000",
    duracion: "3 semanas",
    entregables: [
      "Estrategia personalizada",
      "Implementación de herramientas",
      "Métricas de éxito",
      "Optimización continua"
    ]
  },
  {
    servicio: "Capacitación Empresarial IA",
    descripcion: "Programa completo de formación en IA para equipos",
    precio: "$1200-3000",
    duracion: "2 semanas",
    entregables: [
      "Programa de capacitación",
      "Materiales de estudio",
      "Workshops prácticos",
      "Certificación del equipo"
    ]
  }
]

const casosExito = [
  {
    empresa: "E-commerce Regional",
    problema: "Procesamiento manual de 500 pedidos diarios",
    solucion: "Implementación de IA para automatización completa",
    inversion: "$4500",
    resultados: [
      "Reducción 80% en tiempo de procesamiento",
      "Ahorro $8000 mensuales en mano de obra",
      "Errores reducidos del 15% al 0.5%",
      "ROI de 178% en 3 meses"
    ]
  },
  {
    empresa: "Agencia de Marketing",
    problema: "Creación de contenido lenta y costosa",
    solucion: "Sistema de generación de contenido con IA",
    inversion: "$6000",
    resultados: [
      "Producción 10x más rápida de contenido",
      "Ahorro $12000 mensuales en copywriters",
      "Calidad consistente en todos los materiales",
      "Client satisfaction del 95%"
    ]
  },
  {
    empresa: "Consultora Financiera",
    problema: "Análisis de datos manual e ineficiente",
    solucion: "IA para análisis predictivo y reportes",
    inversion: "$8000",
    resultados: [
      "Análisis en minutos vs días",
      "Precisión del 98% en predicciones",
      "Nuevos servicios premium vendidos",
      "Ingresos adicionales $25000/mes"
    ]
  }
]

export default function ConsultoriaIAPage() {
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
            <Badge variant="secondary" className="mb-4">Negocio</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Consultoría de IA: De Cero a $10,000/mes
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Sistema completo para lanzar tu negocio de consultoría con IA. Encuentra clientes, fija precios premium y entrega resultados extraordinarios usando inteligencia artificial.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>35 min de lectura</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>8,930 estudiantes</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
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
              <DollarSign className="h-5 w-5 text-primary" />
              La Oportunidad de Oro de la Consultoría de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              El mercado de consultoría de IA está explotando. Empresas de todos los tamaños
              necesitan urgentemente expertos que les ayuden a implementar soluciones de IA,
              pero hay muy pocas personas calificadas para hacerlo. Esto crea una oportunidad
              sin precedentes para profesionales como tú.
            </p>
            <p className="text-muted-foreground">
              A diferencia de otros negocios, la consultoría de IA requiere mínima inversión
              inicial, márgenes de profit del 70-90%, y la capacidad de trabajar desde cualquier
              parte del mundo con clientes globales.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">$280B</p>
                <p className="text-sm text-muted-foreground">Mercado global de IA para 2030</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">73%</p>
                <p className="text-sm text-muted-foreground">Empresas buscando implementar IA</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">$85/hora</p>
                <p className="text-sm text-muted-foreground">Tarifa promedio de consultores IA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistema de 4 Fases */}
        <Card>
          <CardHeader>
            <CardTitle>Sistema Probado: 4 Fases para Llegar a $10,000/mes</CardTitle>
            <p className="text-muted-foreground">
              Este sistema ha sido validado por cientos de consultores exitosos. Cada fase
              está diseñada para construir sobre la anterior y crear un negocio sostenible.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {pasosConsultoria.map((paso, index) => (
                <div key={index} className="border-l-4 border-primary pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge variant="outline" className="mb-2">{paso.fase}</Badge>
                        <h3 className="text-lg font-semibold">{paso.titulo}</h3>
                        <p className="text-muted-foreground">{paso.descripcion}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Tiempo:</p>
                        <p className="text-sm text-primary">{paso.tiempo}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="font-medium mb-2">Tareas clave:</p>
                      <ul className="space-y-1">
                        {paso.tareas.map((tarea, tareaIndex) => (
                          <li key={tareaIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {tarea}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Inversión:</p>
                        <p className="text-muted-foreground">{paso.inversion}</p>
                      </div>
                      <div>
                        <p className="font-medium">Resultado esperado:</p>
                        <p className="text-green-600">{paso.resultado}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Servicios Rentables */}
        <Card>
          <CardHeader>
            <CardTitle>Servicios Más Rentables en Consultoría de IA</CardTitle>
            <p className="text-muted-foreground">
              Estos servicios tienen la mayor demanda y los mejores márgenes. Comienza con
              uno y expande tu portafolio gradualmente.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {serviciosConsultoria.map((servicio, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{servicio.servicio}</h4>
                      <p className="text-muted-foreground mb-3">{servicio.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{servicio.precio}</p>
                      <p className="text-sm text-muted-foreground">{servicio.duracion}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Entregables:</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {servicio.entregables.map((entregable, entregableIndex) => (
                        <div key={entregableIndex} className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-blue-500" />
                          {entregable}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Casos de Éxito */}
        <Card>
          <CardHeader>
            <CardTitle>Casos de Éxito Reales (Estos Son Números Reales)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {casosExito.map((caso, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{caso.empresa}</h4>
                    <p className="text-sm text-red-600 mb-2">Problema: {caso.problema}</p>
                    <p className="text-sm text-muted-foreground">Solución: {caso.solucion}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Inversión cliente:</p>
                    <p className="text-lg font-bold text-green-600">{caso.inversion}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Resultados obtenidos:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {caso.resultados.map((resultado, resultadoIndex) => (
                      <div key={resultadoIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{resultado}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Herramientas Esenciales */}
        <Card>
          <CardHeader>
            <CardTitle>Tu Kit de Herramientas Esencial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Herramientas de Consultoría</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Notion:</strong> Organización de proyectos ($8/mes)</li>
                  <li>• <strong>Calendly:</strong> Agendamiento automático ($10/mes)</li>
                  <li>• <strong>Loom:</strong> Videos demostrativos ($15/mes)</li>
                  <li>• <strong>Figma:</strong> Diagramas y prototipos ($15/mes)</li>
                  <li>• <strong>Slack:</strong> Comunicación con clientes ($8/mes)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Plataformas de IA</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>ChatGPT Plus:</strong> Consultas avanzadas ($20/mes)</li>
                  <li>• <strong>Claude Pro:</strong> Análisis extensivo ($20/mes)</li>
                  <li>• <strong>Midjourney:</strong> Generación de imágenes ($30/mes)</li>
                  <li>• <strong>ElevenLabs:</strong> Voz sintética ($5/mes)</li>
                  <li>• <strong>Make/Zapier:</strong> Automatización ($20/mes)</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">Inversión inicial total:</p>
              <p className="text-2xl font-bold text-blue-600">$126/mes</p>
              <p className="text-sm text-blue-700">Con un solo cliente cubres 10x esta inversión</p>
            </div>
          </CardContent>
        </Card>

        {/* Precios y Psicología */}
        <Card>
          <CardHeader>
            <CardTitle>Cómo Fijar Precios Premium sin Perder Clientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">1. Precia por Valor, no por Tiempo</h4>
                <p className="text-sm text-muted-foreground">
                  En lugar de cobrar $50/hora, cobrar $2000 por un proyecto que ahorra
                  al cliente $10,000 mensuales. El foco está en el ROI que entregas.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">2. Usa Precios Psicológicos</h4>
                <p className="text-sm text-muted-foreground">
                  $1997 suena mejor que $2000. $997 es más atractivo que $1000.
                  Los precios terminados en 7 y 9 tienen tasas de conversión más altas.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">3. Crea Escalones de Precio</h4>
                <p className="text-sm text-muted-foreground">
                  Básico ($997), Pro ($2997), Enterprise ($7997). El 80% de clientes
                  eligen la opción del medio (efecto anclaje).
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">4. Añade Urgencia y Escasez</h4>
                <p className="text-sm text-muted-foreground">
                  "Solo 3 espacios este mes", "Precio normal $5000, hoy $2997".
                  La escasez aumenta significativamente las conversiones.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clientes Ideales */}
        <Card>
          <CardHeader>
            <CardTitle>Encuentra tus Primeros 10 Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Clientes Perfectos para Empezar</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Empresas de 10-50 empleados con presupuestos de marketing</li>
                  <li>• Startups que han recibido inversión (Series A/B)</li>
                  <li>• Empresas de e-commerce con $500K+ en ventas anuales</li>
                  <li>• Consultoras que quieren modernizar sus servicios</li>
                  <li>• Profesionales que buscan automatizar tareas repetitivas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Dónde Encontrarlos</h4>
                <ul className="space-y-2 text-sm">
                  <li>• LinkedIn: busca "CEO", "Marketing Director", "Founder"</li>
                  <li>• Redes de networking empresariales locales</li>
                  <li>• Eventos de industria y conferencias</li>
                  <li>• Grupos de Facebook de empresarios</li>
                  <li>• Introducciones de contactos warm</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="font-medium text-yellow-900">🎯 Estrategia 10x:</p>
              <p className="text-sm text-yellow-700">
                Contacta 10 prospectos por día = 300 por mes. Con 2% de conversión = 6 nuevos clientes cada mes.
                A $3000 por cliente = $18,000 en ingresos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline de Éxito */}
        <Card>
          <CardHeader>
            <CardTitle>Tu Timeline hacia $10,000/mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 text-center">
                  <p className="font-bold text-lg">Mes 1</p>
                  <p className="text-xs text-muted-foreground">Fundación</p>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-4 relative">
                    <div className="bg-blue-500 h-4 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <p className="text-sm mt-1">1-2 clientes iniciales, $500-1000/mes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 text-center">
                  <p className="font-bold text-lg">Mes 3</p>
                  <p className="text-xs text-muted-foreground">Crecimiento</p>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-4 relative">
                    <div className="bg-green-500 h-4 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-sm mt-1">5-8 clientes activos, $3000-5000/mes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 text-center">
                  <p className="font-bold text-lg">Mes 6</p>
                  <p className="text-xs text-muted-foreground">Escalado</p>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-4 relative">
                    <div className="bg-green-600 h-4 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <p className="text-sm mt-1">10+ clientes, $10,000+/mes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 pb-6 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Convertirte en Consultor de IA?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              El mercado espera. Cada día que pasas sin actuar, otros están capturando
              los clientes que podrían ser tuyos. Comienza hoy mismo.
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