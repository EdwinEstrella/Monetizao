import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp, Zap, CheckCircle, Target, AlertCircle, Award } from 'lucide-react'
import Link from 'next/link'
import CopyButton from '@/components/ui/copy-button'

export const metadata: Metadata = {
  title: 'Automatización Inteligente: Negocios que Trabajan Solos 24/7 | Monetizao',
  description: 'Crea sistemas automatizados que generan ingresos mientras duermes. Aprende a construir chatbots, flujos de marketing autónomo y servicios siempre activos usando IA.',
  openGraph: {
    title: 'Automatización Inteligente: Negocios que Trabajan Solos 24/7',
    description: 'Crea sistemas automatizados que generan ingresos mientras duermes.'
  },
}

const sistemasAutomatizados = [
  {
    sistema: "Chatbot de Ventas 24/7",
    descripcion: "Sistema completo que convierte visitantes en clientes automáticamente",
    potencialIngresos: "$2,000-8,000/mes por implementación",
    tiempoImplementacion: "2-4 semanas",
    mantenimiento: "5 horas/mes",
    componentes: [
      "ChatGPT integrado para conversaciones naturales",
      "Base de conocimientos dinámica sobre productos",
      "Sistema de calificación de leads automático",
      "Integración con CRM (HubSpot, Salesforce)",
      "Notificaciones en tiempo real para el equipo",
      "Análisis de conversaciones y optimización"
    ],
    herramientas: {
      "Chatbot": ["Botpress", "Voiceflow", "Dialogflow"],
      "Integración": ["Zapier", "Make", "n8n"],
      "CRM": ["HubSpot", "Pipedrive", "Salesforce"],
      "Analytics": ["Google Analytics", "Hotjar", "Mixpanel"]
    },
    casosExito: [
      {
        empresa: "E-commerce de Moda",
        resultado: "Aumento 340% en ventas nocturnas",
        metricas: "Tasa conversión del 18% vs 3% manual"
      },
      {
        empresa: "SaaS B2B",
        resultado: "52 leads cualificados diarios automáticamente",
        metricas: "Reducción 90% en costos de adquisición"
      }
    ],
    codigoPrompt: `Crea un chatbot para [tipo de negocio] que:
1. Identifique las necesidades del cliente mediante preguntas estratégicas
2. Recomiende productos específicos basados en respuestas
3. Maneje objeciones comunes con respuestas predefinidas
4. Programe demostraciones o llamadas de seguimiento
5. Envíe información relevante por email automáticamente
6. Escale conversaciones complejas a humanos cuando sea necesario

Tono: [profesional/amigable/innovador]
Productos: [lista de productos/servicios]
Objetivo principal: [ventas/soporte/calificación de leads]`
  },
  {
    sistema: "Generador de Contenido Masivo",
    descripcion: "Produce y distribuye contenido ilimitado en todas las plataformas",
    potencialIngresos: "$1,500-5,000/mes por cliente",
    tiempoImplementacion: "1-3 semanas",
    mantenimiento: "3 horas/mes",
    componentes: [
      "Generación de temas basados en tendencias del mercado",
      "Creación de posts para redes sociales (imágenes + texto)",
      "Producción de artículos de blog optimizados para SEO",
      "Scripting para videos cortos (Reels, TikTok, Shorts)",
      "Email marketing automatizado",
      "Programación de publicación cross-plataforma"
    ],
    herramientas: {
      "IA Content": ["ChatGPT", "Claude", "Jasper", "Copy.ai"],
      "Imágenes": ["Midjourney", "DALL-E", "Stable Diffusion"],
      "Videos": ["Pictory", "Synthesia", "Runway"],
      "Programación": ["Buffer", "Later", "Hootsuite"]
    },
    casosExito: [
      {
        empresa: "Coach Personal",
        resultado: "30 posts diarios generados automáticamente",
        metricas: "Seguidores aumentaron de 1K a 50K en 4 meses"
      },
      {
        empresa: "Agencia Digital",
        resultado: "Clientes 5x más content production",
        metricas: "Ahorro de 40 horas semanales de trabajo manual"
      }
    ],
    codigoPrompt: `Sistema de generación de contenido para [industria]:

DIA 1 - Contenido Educativo:
• Título: [generar 5 opciones de titulares virales]
• Hook inicial: [crear apertura impactante de 3 segundos]
• Desarrollo: [explicar concepto clave con ejemplos]
• CTA: [llamada a la acción específica]

DIA 2 - Contenido Promocional:
• Producto destacado: [seleccionar producto/servicio]
• Beneficios: [enumerar 3 beneficios principales]
• Prueba social: [incluir testimonio o caso de éxito]
• Oferta especial: [crear urgencia con limitación]

DIA 3 - Contenido Interactivo:
• Pregunta enganchadora: [generar pregunta viral]
• Encuesta: [crear opción A/B para aumentar engagement]
• Debate: [proponer tema controversial en la industria]
• Incentivo: [ofrecer recompensa por participación]

Hashtags: [generar 20 hashtags relevantes con diferentes niveles de competencia]
Tono de marca: [definir personalidad: experto/amigable/inspirador]`
  },
  {
    sistema: "Embudo de Ventas Autónomo",
    descripcion: "Sistema completo que nutre y convierte leads sin intervención humana",
    potencialIngresos: "$3,000-12,000/mes por embudo",
    tiempoImplementacion: "3-5 semanas",
    mantenimiento: "8 horas/mes",
    componentes: [
      "Captura de leads con magnet irresistible",
      "Secuencia de emails personalizada con IA",
      "Calificación automática de leads con scoring",
      "Segmentación dinámica basada en comportamiento",
      "Reactivación automática de leads fríos",
      "Optimización continua del embudo"
    ],
    herramientas: {
      "Landing Pages": ["Webflow", "Framer", "Instapage"],
      "Email Marketing": ["ConvertKit", "ActiveCampaign", "Klaviyo"],
      "CRM": ["HubSpot", "Pipedrive", "Close"],
      "Analytics": ["Google Analytics", "Hotjar", "VWO"]
    },
    casosExito: [
      {
        empresa: "Cursos Online",
        resultado: "$45,000 en ventas primer mes sin anuncios",
        metricas: "Tasa conversión del 8.7% (industry average 2%)"
      },
      {
        empresa: "Servicios B2B",
        resultado: "27 demostraciones agendadas semanalmente",
        metricas: "Ciclo de ventas reducido 60%"
      }
    ],
    codigoPrompt: `Diseña embudo de ventas para [producto/servicio]:

FASE 1 - AWARENESS:
• Problema: [identificar dolor principal del target]
• Solución: [presentar visión de futuro deseada]
• Magnet: [crear lead magnet irresistible]
• Tráfico: [definir canales de adquisición]

FASE 2 - CONSIDERATION:
• Educación: [5 emails educativos sobre el problema]
• Credibilidad: [probar autoridad con casos de éxito]
• Trust: [responder objeciones antes de que surjan]
• Relación: [construir conexión emocional con marca]

FASE 3 - CONVERSION:
• Oferta irresistible: [diseñar propuesta con stack de valor]
• Urgencia: [crear razón para actuar ahora]
• Reducción de riesgo: [garantía y pruebas sociales]
• Facilidad: [eliminar fricción en proceso de compra]

FASE 4 - RETENTION:
• Onboarding perfecto: [experiencia inicial excepcional]
• Soporte proactivo: [anticipar problemas y soluciones]
• Upsell estratégico: [ofrecer productos complementarios]
• Advocacy: [convertir clientes en embajadores]`
  },
  {
    sistema: "Asistente Virtual Inteligente",
    descripcion: "IA personalizada que gestiona operaciones empresariales completas",
    potencialIngresos: "$2,500-15,000/mes por sistema",
    tiempoImplementacion: "4-6 semanas",
    mantenimiento: "10 horas/mes",
    componentes: [
      "Agendamiento automático de reuniones",
      "Gestión de email y respuestas inteligentes",
      "Análisis de datos y generación de reports",
      "Coordinación de equipos y tareas",
      "Monitoreo de KPIs y alertas",
      "Optimización de procesos basada en datos"
    ],
    herramientas: {
      "IA Assistant": ["GPT-4", "Claude Pro", "Chatbase"],
      "Automation": ["Make", "Zapier", "Microsoft Power Automate"],
      "Calendar": ["Calendly", "Acuity", "Google Calendar"],
      "Analytics": ["Tableau", "Power BI", "Google Data Studio"]
    },
    casosExito: [
      {
        empresa: "Consultora Financiera",
        resultado: "40 horas semanales ahorradas en admin",
        metricas: "Productividad del equipo aumentó 3.5x"
      },
      {
        empresa: "Startup Tech",
        resultado: "$25,000 ahorrados en costos operativos",
        metricas: "Tiempo respuesta cliente reducido de 24h a 15min"
      }
    ],
    codigoPrompt: `Crea asistente virtual ejecutivo para [tipo de negocio]:

FUNCIONES PRINCIPALES:
1. EMAIL MANAGEMENT
   - Categorizar emails por urgencia y tipo
   - Redactar respuestas profesionales basadas en contexto
   - Programar seguimientos automáticos
   - Identificar oportunidades de negocio

2. CALENDAR MANAGEMENT
   - Coordinar disponibilidad con múltiples participantes
   - Enviar confirmaciones y recordatorios
   - Preparar agenda de reuniones basada en objetivos
   - Seguimiento post-reunión con acciones definidas

3. TASK COORDINATION
   - Asignar tareas al miembro adecuado del equipo
   - Establecer prioridades basadas en deadlines e importancia
   - Monitorear progreso y enviar alertas de retraso
   - Generar reports de productividad semanal

4. DATA ANALYSIS
   - Analizar KPIs del negocio daily/weekly/monthly
   - Identificar tendencias y patrones
   - Generar insights accionables
   - Crear recomendaciones estratégicas

ESTILO DE COMUNICACIÓN: [profesional/innovador/friendly]
NIVEL DE AUTONOMÍA: [alta/parcial/supervisión]
INDUSTRIA: [especificar sector y terminología clave]`
  },
  {
    sistema: "Plataforma de Cursos Automatizada",
    descripcion: "Educa y vende mientras duermes con contenido personalizado",
    potencialIngresos: "$5,000-25,000/mes por plataforma",
    tiempoImplementacion: "3-4 semanas",
    mantenimiento: "5 horas/mes",
    componentes: [
      "Generación de contenido de cursos dinámico",
      "Evaluaciones personalizadas adaptativas",
      "Certificados automáticos con verificación",
      "Comunidad gestionada por IA",
      "Tracking de progreso y motivación",
      "Upsells inteligentes basados en rendimiento"
    ],
    herramientas: {
      "LMS": ["Teachable", "Thinkific", "Kajabi"],
      "Content": ["Articulate", "Canva", "Synthesia"],
      "Automation": ["ActiveCampaign", "ConvertKit"],
      "Community": ["Discord", "Circle", "Mighty Networks"]
    },
    casosExito: [
      {
        empresa: "Coach de Negocios",
        resultado: "500 estudiantes activos sin staff adicional",
        metricas: "Completion rate del 87% (industry average 12%)"
      },
      {
        empresa: "Educación Financiera",
        resultado: "$120,000 mensuales en ventas automatizadas",
        metricas: "Student satisfaction del 4.8/5"
      }
    ],
    codigoPrompt: `Diseña plataforma de aprendizaje automatizada para [tema]:

MÓDULO 1 - FUNDAMENTOS:
• Contenido adaptativo basado en nivel inicial del estudiante
• Ejercicios interactivos con feedback instantáneo
• Mini-exámenes para verificar comprensión
• Recursos complementarios personalizados

MÓDULO 2 - APLICACIÓN PRÁCTICA:
• Proyectos hands-on con guía paso a paso
• Simulaciones del mundo real
• Case studies con análisis detallado
• Templates y herramientas descargables

MÓDULO 3 - ESPECIALIZACIÓN:
• Contenido avanzado basado en progreso individual
• Personalización según intereses y objetivos
• Proyectos capstone con evaluación por IA
• Networking automático con pares similares

MÓDULO 4 - IMPLEMENTACIÓN:
• Plan de acción personalizado
• Tracking de metas y milestones
- Comunidad gestionada con preguntas frecuentes
• Mentoring automatizado basado en desafíos

CARACTERÍSTICAS INNOVADORAS:
- Gamificación con puntos, niveles y badges
- Learning paths múltiples basados en objetivos
- Content refresh automático basado en tendencias
- Certificación con blockchain verification`
  }
]

const roadmapImplementacion = [
  {
    fase: "Semana 1-2: Diseño y Planificación",
    entregables: [
      "Mapa de procesos a automatizar",
      "Selección de herramientas estratégicas",
      "Definición de KPIs y métricas",
      "Blueprint del sistema completo",
      "Análisis ROI y proyecciones financieras"
    ],
    tiempoDedicacion: "20-30 horas",
    resultado: "Estrategia clara y roadmap detallado"
  },
  {
    fase: "Semana 3-4: Desarrollo MVP",
    entregables: [
      "Versión funcional del sistema",
      "Pruebas piloto con usuarios reales",
      "Integración básica de herramientas",
      "Documentación inicial",
      "Sistema de soporte y feedback"
    ],
    tiempoDedicacion: "40-50 horas",
    resultado: "Sistema operativo generando primeros resultados"
  },
  {
    fase: "Semana 5-6: Optimización y Escalado",
    entregables: [
      "Análisis de datos y optimización",
      "Expansión de funcionalidades",
      "Automatización de mantenimiento",
      "Sistema de monitoreo proactivo",
      "Preparación para escalamiento"
    ],
    tiempoDedicacion: "15-20 horas",
    resultado: "Sistema optimizado y listo para crecimiento"
  },
  {
    fase: "Semana 7-8: Lanzamiento y Monetización",
    entregables: [
      "Lanzamiento oficial del sistema",
      "Material marketing y casos de éxito",
      "Precios y paquetes de servicios",
      "Sistema de ventas automatizado",
      "Escalado y replicación en otros clientes"
    ],
    tiempoDedicacion: "10-15 horas",
    resultado: "Sistema generando ingresos consistentes"
  }
]

export default function AutomatizacionPage() {
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
            <Badge variant="secondary" className="mb-4">Automatización</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Automatización Inteligente: Negocios que Trabajan Solos 24/7
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Crea sistemas automatizados que generan ingresos mientras duermes. Aprende a construir chatbots, flujos de marketing autónomo y servicios siempre activos usando IA.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>40 min de lectura</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>5,680 estudiantes</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Nuevo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="space-y-8">
        {/* Impacto de Automatización */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              La Revolución de los Negocios Autónomos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Imagina tener un negocio que trabaja 168 horas a la semana sin que tengas que estar presente.
              Donde los clientes son atendidos, las ventas se cierran y el marketing funciona perfectamente
              mientras tú disfrutas de tu vida. Esto no es ciencia ficción, es el poder de la automatización inteligente.
            </p>
            <p className="text-muted-foreground">
              La diferencia entre un negocio tradicional y uno automatizado es como tener un empleado vs
              tener un equipo de 50 personas trabajando 24/7. Pero la mejor parte es que estos sistemas
              no piden vacaciones, no se enferman, y mejoran continuamente gracias a la IA.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">94%</p>
                <p className="text-sm text-muted-foreground">Reducción de trabajo manual</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">5.2x</p>
                <p className="text-sm text-muted-foreground">ROI promedio en 6 meses</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">$125K</p>
                <p className="text-sm text-muted-foreground">Ahorro anual por sistema</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistemas Rentables */}
        <Card>
          <CardHeader>
            <CardTitle>5 Sistemas Automatizados que Generan $2,000-25,000/mes</CardTitle>
            <p className="text-muted-foreground">
              Cada sistema incluye el prompt exacto para ChatGPT, las herramientas necesarias,
              casos de éxito reales, y el potencial de ingresos comprobado.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-10">
              {sistemasAutomatizados.map((sistema, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">Sistema {index + 1}</Badge>
                        <h3 className="text-xl font-bold mb-2">{sistema.sistema}</h3>
                        <p className="text-muted-foreground">{sistema.descripcion}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{sistema.potencialIngresos}</p>
                        <p className="text-sm text-muted-foreground">por cliente/mes</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Metrículas Clave */}
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-medium">Implementación:</p>
                          <p>{sistema.tiempoImplementacion}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <div>
                          <p className="font-medium">Mantenimiento:</p>
                          <p>{sistema.mantenimiento}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">Retorno:</p>
                          <p className="text-green-600">ROI 300-800%</p>
                        </div>
                      </div>
                    </div>

                    {/* Componentes del Sistema */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Componentes del Sistema
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {sistema.componentes.map((componente, componenteIndex) => (
                          <div key={componenteIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {componente}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Herramientas Necesarias */}
                    <div>
                      <h4 className="font-semibold mb-3">Stack Tecnológico Recomendado</h4>
                      <div className="space-y-2">
                        {Object.entries(sistema.herramientas).map(([categoria, herramientas]) => (
                          <div key={categoria} className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">{categoria}</Badge>
                            <div className="flex flex-wrap gap-1">
                              {herramientas.map((herramienta: string, herramientaIndex: number) => (
                                <Badge key={herramientaIndex} variant="outline" className="text-xs">
                                  {herramienta}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Casos de Éxito */}
                    <div>
                      <h4 className="font-semibold mb-3">Casos de Éxito Reales</h4>
                      <div className="space-y-2">
                        {sistema.casosExito.map((caso, casoIndex) => (
                          <div key={casoIndex} className="bg-gray-50 rounded p-3">
                            <div className="flex items-start justify-between mb-1">
                              <p className="font-medium text-sm">{caso.empresa}</p>
                              <Badge variant="outline" className="text-xs">Verificado</Badge>
                            </div>
                            <p className="text-green-600 font-medium text-sm">{caso.resultado}</p>
                            <p className="text-muted-foreground text-xs">{caso.metricas}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prompt ChatGPT */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-blue-900">💡 Prompt para ChatGPT (Copiar y Usar)</h4>
                      <div className="bg-white rounded p-3 font-mono text-xs max-h-48 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">{sistema.codigoPrompt}</pre>
                      </div>
                      <CopyButton
                        text={sistema.codigoPrompt}
                        className="mt-3 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                        label="📋 Copiar Prompt para ChatGPT"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap de Implementación */}
        <Card>
          <CardHeader>
            <CardTitle>Roadmap de Implementación: 8 Semanas para Tu Primer Sistema</CardTitle>
            <p className="text-muted-foreground">
              Sigue este timeline exacto para construir tu primer sistema automatizado rentable.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmapImplementacion.map((fase, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{fase.fase}</h4>
                          <p className="text-sm text-muted-foreground">{fase.resultado}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary">{fase.tiempoDedicacion}</p>
                          <p className="text-xs text-muted-foreground">dedicación</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-2 text-sm">Entregables:</p>
                        <ul className="space-y-1">
                          {fase.entregables.map((entregable, entregableIndex) => (
                            <li key={entregableIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {entregable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {index < roadmapImplementacion.length - 1 && (
                    <div className="ml-5 w-0.5 h-6 bg-gray-200 mt-2"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-900 mb-2">🎯 Resultado Esperado del Roadmap:</p>
              <p className="text-green-700">
                Al finalizar estas 8 semanas tendrás un sistema automatizado funcionando,
                generando ingresos reales, y un proceso replicable para crear más sistemas.
                Tu primer cliente pagará entre $2,000-$15,000 por un sistema que te costó
                menos de $500 en herramientas y 150 horas de trabajo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Precios y Empaquetado */}
        <Card>
          <CardHeader>
            <CardTitle>Cómo Empaquetar y Vender tus Sistemas Automatizados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <Badge variant="outline" className="mb-2">STARTER</Badge>
                <h4 className="font-bold text-lg mb-2">$2,000-5,000</h4>
                <p className="text-sm text-muted-foreground mb-3">Emprendedores y pequeñas empresas</p>
                <ul className="space-y-1 text-sm">
                  <li>• 1 sistema básico</li>
                  <li>• Implementación 1-2 semanas</li>
                  <li>• Soporte 30 días</li>
                  <li>• Documentación básica</li>
                  <li>• Optimización inicial</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 border-primary bg-primary/5">
                <Badge className="mb-2">POPULAR</Badge>
                <h4 className="font-bold text-lg mb-2">$5,000-12,000</h4>
                <p className="text-sm text-muted-foreground mb-3">Empresas medianas y scale-ups</p>
                <ul className="space-y-1 text-sm">
                  <li>• 2-3 sistemas integrados</li>
                  <li>• Implementación 3-4 semanas</li>
                  <li>• Soporte 90 días</li>
                  <li>• Capacitación completa</li>
                  <li>• Optimización avanzada</li>
                  <li>• Reports automáticos</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <Badge variant="outline" className="mb-2">ENTERPRISE</Badge>
                <h4 className="font-bold text-lg mb-2">$12,000-25,000</h4>
                <p className="text-sm text-muted-foreground mb-3">Grandes corporaciones y agencias</p>
                <ul className="space-y-1 text-sm">
                  <li>• Ecosistema completo</li>
                  <li>• Implementación 6-8 semanas</li>
                  <li>• Soporte 12 meses</li>
                  <li>• Equipo dedicado</li>
                  <li>• API y integraciones custom</li>
                  <li>• SLA garantizado</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="font-medium text-yellow-900 mb-2">💰 Modelo de Ingresos Recomendado:</p>
              <p className="text-sm text-yellow-700">
                70% pago inicial + 30% al lanzamiento + $300-800/mes de mantenimiento.
                Esto genera ingresos predecibles y asegura relaciones a largo plazo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Errores Comunes */}
        <Card>
          <CardHeader>
            <CardTitle>Errores Costosos que Debes Evitar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold mb-1">❌ Tratar de Automatizar Todo de Inmediato</h4>
                <p className="text-sm text-muted-foreground">
                  Empieza con UN proceso clave. El éxito temprano genera confianza y momentum.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold mb-1">❌ Ignorar la Experiencia del Usuario</h4>
                <p className="text-sm text-muted-foreground">
                  La automatización debe mejorar, no frustrar. Involucra a los usuarios desde el inicio.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold mb-1">❌ Olvidar el Monitoreo Continuo</h4>
                <p className="text-sm text-muted-foreground">
                  Los sistemas automatizados requieren supervisión. Implementa alertas tempranas.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-1">✅ Best Practice: Empieza Small y Scale Fast</h4>
                <p className="text-sm text-muted-foreground">
                  Prueba con un cliente, optimiza, escala a 10, luego a 100. Cada iteración multiplica tu conocimiento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Herramientas Esenciales */}
        <Card>
          <CardHeader>
            <CardTitle>Tu Stack de Herramientas Profesional ($150/mes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Herramientas Esenciales (No Negociables)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Make/Zapier:</strong> $20/mes - Conector de todas las apps</li>
                  <li>• <strong>ChatGPT Plus:</strong> $20/mes - IA para todo</li>
                  <li>• <strong>Airtable:</strong> $10/mes - Base de datos flexible</li>
                  <li>• <strong>Calendly:</strong> $10/mes - Agendamiento automático</li>
                  <li>• <strong>Notion:</strong> $8/mes - Documentación y gestión</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Herramientas Avanzadas (Opcional)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Webflow:</strong> $20/mes - Sitios web automatizados</li>
                  <li>• <strong>Voiceflow:</strong> $25/mes - Chatbots avanzados</li>
                  <li>• <strong>HubSpot:</strong> $45/mes - CRM potente</li>
                  <li>• <strong>ConvertKit:</strong> $29/mes - Email marketing pro</li>
                  <li>• <strong>Loom:</strong> $15/mes - Videos automatizados</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">💡 ROI de Herramientas:</p>
              <p className="text-sm text-blue-700">
                Con solo 1 cliente pagando $5000, recuperas tu inversión en herramientas 33x.
                Cada cliente adicional es 100% profit en herramientas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 pb-6 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Construir tu Negocio Autónomo?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              La automatización inteligente no es el futuro, es el presente.
              Miles de empresarios ya están construyendo negocios que trabajan solos.
              ¿Cuándo empezarás tú?
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button size="lg" asChild>
                <Link href="/contacto">
                  Comenzar Automatización
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/guias">
                  Ver Más Estrategias
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}