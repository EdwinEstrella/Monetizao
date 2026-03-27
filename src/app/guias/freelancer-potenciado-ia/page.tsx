import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp, Target, CheckCircle, Zap, Award, Star } from 'lucide-react'
import Link from 'next/link'
import CopyButton from '@/components/ui/copy-button'

export const metadata: Metadata = {
  title: 'Freelancer Potenciado por IA: Multiplica x5 tus Tarifas | Monetizao',
  description: 'Transforma tu carrera de freelancer usando IA. Aprende a entregar proyectos más rápidos, con mayor calidad y cobrar hasta 5 veces más por tu trabajo.',
  openGraph: {
    title: 'Freelancer Potenciado por IA: Multiplica x5 tus Tarifas',
    description: 'Transforma tu carrera de freelancer usando IA para multiplicar tus ingresos.'
  },
}

const serviciosFreelanceIA = [
  {
    servicio: "Content Writing con IA",
    descripcion: "Producción de contenido de alta calidad optimizado para SEO",
    tarifaTradicional: "$30-50 por artículo",
    tarifaPotenciado: "$100-200 por artículo",
    incremento: "3-4x más",
    herramientas: ["ChatGPT Plus", "Grammarly", "Surfer SEO"],
    tiempoAhorro: "60% menos tiempo",
    calidadMejora: "SEO optimizado desde el inicio",
    casosExito: [
      {
        freelancer: "Escritor junior México",
        antes: "$800/mes artículos básicos",
        despues: "$3,500/mes contenido optimizado",
        timeline: "3 meses"
      },
      {
        freelancer: "Copywriter España",
        antes: "$1,200/mes copy publicitario",
        despues: "$4,800/mes conversión optimizada",
        timeline: "4 meses"
      }
    ],
    promptPlantilla: `Actúa como experto en [tipo de contenido] para [industria].

Crea un artículo de [palabras] palabras sobre [tema] que:

1. TÍTULO SEO:
   - Incluye palabra clave principal al inicio
   - Longitud ideal: 50-60 caracteres
   - Incluye adjetivo poderoso y número si aplica

2. INTRODUCCIÓN:
   - Hook con estadística impactante o pregunta provocadora
   - Presentar el problema que el lector está experimentando
   - Breve roadmap del contenido

3. CONTENIDO PRINCIPAL:
   - Estructura H2-H3 clara y lógica
   - Cada sección con 300-400 palabras
   - Incluir examples prácticos y aplicables
   - Bullets lists para mejor legibilidad

4. SEO NATURAL:
   - Densidad de palabra clave: 1-2%
   - Palabras LSI naturalesmente integradas
   - Links internos sugeridos
   - Meta descripción optimizada

5. CTA:
   - Acción clara y específica
   - Crear urgencia si aplica
   - Mencionar beneficio directo

Tono: [profesional/entusiasta/autoritario]
Público objetivo: [describir audiencia específica]
Objetivo principal: [educar/vender/inspirar]`
  },
  {
    servicio: "Design Gráfico Asistido",
    descripcion: "Creación de diseños profesionales con asistencia de IA",
    tarifaTradicional: "$50-150 por diseño",
    tarifaPotenciado: "$200-500 por paquete",
    incremento: "3-4x más",
    herramientas: ["Midjourney", "DALL-E", "Figma", "Canva Pro"],
    tiempoAhorro: "50% menos tiempo",
    calidadMejora: "Más opciones creativas",
    casosExito: [
      {
        freelancer: "Designer junior Colombia",
        antes: "$1,500/mes diseños básicos",
        despues: "$4,200/mes branding completo",
        timeline: "2 meses"
      },
      {
        freelancer: "Designer Argentina",
        antes: "$2,000/mes logos simples",
        despues: "$6,500/mes sistemas de marca",
        timeline: "3 meses"
      }
    ],
    promptPlantilla: `Genera conceptos de diseño para [tipo de proyecto] de [marca/industria]:

BRAND IDENTITY:
- Estilo: [minimalista/vibrante/corporativo/tradicional]
- Colores: [paleta de colores específica o referencia]
- Audiencia: [demográfico y psicográfico]
- Valores de marca: [3 valores principales]

DESIGN REQUIREMENTS:
- Formato: [logo/banner/social media/packaging]
- Dimensiones específicas
- Elementos obligatorios
- Restricciones o consideraciones técnicas

VISUAL DIRECTION:
- Referencias de estilo adjuntadas
- Competidores para diferenciarse
- Tendencias a evitar o seguir
- Elementos culturales a considerar

CREATIVE CONCEPTS:
Generar 3 conceptos distintos:
1. Concepto A: [descripción breve]
2. Concepto B: [descripción breve]
3. Concepto C: [descripción breve]

Para cada concepto incluir:
- Justificación del diseño
- Cómo cumple los objetivos
- Aplicaciones potenciales
- Variaciones y formatos`
  },
  {
    servicio: "Video Editing Inteligente",
    descripcion: "Producción y edición de videos con herramientas de IA",
    tarifaTradicional: "$40-100 por video",
    tarifaPotenciado: "$150-400 por video",
    incremento: "3-4x más",
    herramientas: ["Pictory", "Synthesia", "Descript", "Runway"],
    tiempoAhorro: "70% menos tiempo",
    calidadMejora: "Subtítulos y optimización automática",
    casosExito: [
      {
        freelancer: "Video editor Chile",
        antes: "$1,800/mes edición básica",
        despues: "$5,600/mes producción completa",
        timeline: "3 meses"
      },
      {
        freelancer: "Content creator México",
        antes: "$2,200/mes videos simples",
        despues: "$7,500/mes contenido viral",
        timeline: "4 meses"
      }
    ],
    promptPlantilla: `Actúa como productor de video experto para [plataforma y tipo de contenido].

VIDEO PRODUCTION PLAN:

CONCEPT DEVELOPMENT:
- Tema: [especificar tema principal]
- Duración objetivo: [segundos/minutos]
- Formato: [entrevista/tutorial/promoción/reseña]
- Plataforma principal: [YouTube/TikTok/Instagram]

SCRIPT STRUCTURE:
1. HOOK (primeros 3 segundos):
   - Opening impactante o pregunta controversial
   - Visual atractivo inmediato
   - Promise de valor claro

2. VALUE DELIVERY:
   - Punto 1: [título y contenido]
   - Punto 2: [título y contenido]
   - Punto 3: [título y contenido]

3. CALL TO ACTION:
   - Específico y directo
   - Crea urgencia si aplica
   - Repetir 2-3 veces con diferente formato

VISUAL REQUIREMENTS:
- Estilo de editing: [rápido/cinematográfico/educativo]
- Color grading preference
- Graphics y text overlays requeridos
- Music style y tempo
- Brand elements a incluir

SEO Y OPTIMIZATION:
- Título optimizado con keywords
- Descripción completa con timestamps
- Tags relevantes y trending topics
- Thumbnail optimizado para click-through rate
- Subtítulos accesibles`
  },
  {
    servicio: "Social Media Management IA",
    descripcion: "Gestión completa de redes sociales con automatización inteligente",
    tarifaTradicional: "$300-800 por cliente/mes",
    tarifaPotenciado: "$1,200-2,500 por cliente/mes",
    incremento: "3-4x más",
    herramientas: ["Buffer", "Later", "Hootsuite", "Jasper"],
    tiempoAhorro: "65% menos tiempo",
    calidadMejora: "Contenido siempre relevante",
    casosExito: [
      {
        freelancer: "Social manager Perú",
        antes: "$2,500/mes 2 clientes",
        despues: "$6,800/mes 5 clientes",
        timeline: "4 meses"
      },
      {
        freelancer: "Community manager España",
        antes: "$3,000/mes 3 marcas",
        despues: "$8,200/mes 7 marcas",
        timeline: "3 meses"
      }
    ],
    promptPlantilla: `Actúa como estratega de social media experto para [tipo de negocio] con [presupuesto/recursos].

SOCIAL MEDIA STRATEGY:

PLATFORM PRIORITIES:
- Primary: [LinkedIn/Instagram/TikTok/Facebook]
- Secondary: [plataformas secundarias]
- Content mix: % por plataforma

CONTENT CALENDAR - [Mes]:
Week 1: [tema principal y 3 tipos de contenido]
Week 2: [tema principal y 3 tipos de contenido]
Week 3: [tema principal y 3 tipos de contenido]
Week 4: [tema principal y 3 tipos de contenido]

CONTENT CREATION SYSTEM:
For each piece of content:
- Hook: [fórmula de 3 segundos]
- Value: [tipo de valor específico]
- CTA: [llamada a la acción específica]
- Hashtags: [estrategia de hashtags]

ENGAGEMENT TACTICS:
- Daily: [actividades diarias]
- Weekly: [actividades semanales]
- Monthly: [actividades mensuales]

KPIs Y METRICS:
- Growth metrics: [métricas de crecimiento]
- Engagement metrics: [métricas de engagement]
- Conversion metrics: [métricas de conversión]

TONE OF VOICE:
- [describir personalidad de marca]
- Words to use: [palabras clave]
- Words to avoid: [palabras a evitar]`
  },
  {
    servicio: "Translation & Localization con IA",
    descripcion: "Traducción profesional y localización cultural con IA",
    tarifaTradicional: "$0.08-0.12 por palabra",
    tarifaPotenciado: "$0.15-0.25 por palabra",
    incremento: "2-3x más",
    herramientas: ["DeepL Pro", "ChatGPT", "Grammarly", "Context"],
    tiempoAhorro: "50% menos tiempo",
    calidadMejora: "Localización cultural precisa",
    casosExito: [
      {
        freelancer: "Traductor Argentina",
        antes: "$1,800/mes 20K palabras",
        despues: "$4,500/mes 30K palabras",
        timeline: "2 meses"
      },
      {
        freelancer: "Localization specialist México",
        antes: "$2,400/mes software localization",
        despues: "$5,800/mes localization completa",
        timeline: "3 meses"
      }
    ],
    promptPlantilla: `Actúa como traductor y localizador experto de [idioma original] a [idioma destino].

TRANSLATION BRIEF:
- Industry: [sector específico]
- Target audience: [demografía y nivel educativo]
- Cultural context: [consideraciones culturales importantes]
- Brand voice: [personalidad de marca a mantener]

QUALITY REQUIREMENTS:
- Accuracy level: [literal/adapted/transcreation]
- Technical terminology: [especificar términos técnicos]
- Cultural references: [adaptar o mantener]
- Local regulations: [requerimientos legales o regulatorios]

STYLE GUIDE:
- Formality level: [formal/informal/technical]
- Tone: [professional/friendly/academic]
- Punctuation preferences
- Number formatting conventions
- Date and time formats

LOCALIZATION CHECKLIST:
☐ Currency conversion correcta
☐ Medidas y unidades adaptadas
☐ Referencias culturales apropiadas
☐ Modismos y expresiones idiomáticas
☐ Imágenes y colores culturalmente adecuados
☐ Formatos de fecha y hora local
☐ Requisitos legales específicos
☐ Contact information localizada

REVIEW PROCESS:
- First draft: [tiempo estimado]
- Client review: [feedback esperado]
- Revisions: [número de revisiones incluidas]
- Final delivery: [formatos requeridos]`
  }
]

const roadmapFreelance = [
  {
    semana: "Semana 1-2: Foundation",
    actividades: [
      "Identificar tu servicio freelance actual",
      "Investigar herramientas IA relevantes",
      "Elegir 1-2 herramientas prioritarias",
      "Crear cuenta y aprender basics",
      "Definir KPIs de mejora"
    ],
    metricas: ["Herramientas seleccionadas", "Skill level evaluado", "Tiempo baseline medido"],
    inversion: "$50-100 en herramientas"
  },
  {
    semana: "Semana 3-4: Integration",
    actividades: [
      "Aplicar IA en proyectos pequeños",
      "Documentar mejoras de tiempo/calidad",
      "Crear templates y workflows",
      "Test diferentes prompts y técnicas",
      "Calcular ROI real"
    ],
    metricas: ["Tiempo reducido 20-30%", "Calidad mantenida/mejorada", "Primeros testimonials"],
    inversion: "$100-200 en herramientas avanzadas"
  },
  {
    semana: "Semana 5-8: Optimization",
    actividades: [
      "Refinar procesos completamente",
      "Crear packages premium con IA",
      "Aumentar precios gradualmente",
      "Documentar casos de éxito",
      "Empacar nuevo servicio"
    ],
    metricas: ["Precios aumentados 50-100%", "Eficiencia 40-60% mejor", "Satisfacción cliente >4.5/5"],
    inversion: "$200-400 en herramientas pro"
  },
  {
    semana: "Semana 9-12: Scaling",
    actividades: [
      "Promover nuevos servicios IA",
      "Duplicar capacidad de trabajo",
      "Entregar 2x proyectos mismo tiempo",
      "Construir portfolio de resultados",
      "Establecer sistemas automatizados"
    ],
    metricas: ["Ingresos 2-3x mayores", "Capacidad 2x mayor", "Procesos 80% automatizados"],
    inversion: "$400-600 en sistemas completos"
  }
]

export default function FreelancerIAPage() {
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
            <Badge variant="secondary" className="mb-4">Freelancing</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Freelancer Potenciado por IA: Multiplica x5 tus Tarifas
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Transforma tu carrera de freelancer usando IA. Aprende a entregar proyectos más rápidos, con mayor calidad y cobrar hasta 5 veces más por tu trabajo.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>30 min de lectura</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>12,150 estudiantes</span>
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
              <Zap className="h-5 w-5 text-primary" />
              La Nueva Era del Freelancing Potenciado por IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              El mercado freelance está experimentando una transformación sin precedentes.
              Mientras muchos freelancers compiten por precio, los inteligentes están usando IA
              para entregar más valor en menos tiempo. Esto no solo les permite cobrar más,
              sino atraer clientes mejor pagados que valoran calidad sobre precio.
            </p>
            <p className="text-muted-foreground">
              La clave no es reemplazar tu creatividad, sino amplificarla. La IA es tu asistente
              estratégico que maneja las tareas repetitivas mientras tú te enfocas en el valor
              creativo y estratégico que los clientes realmente pagan.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">3-5x</p>
                <p className="text-sm text-muted-foreground">Aumento en tarifas</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">60%</p>
                <p className="text-sm text-muted-foreground">Reducción en tiempo</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">2x</p>
                <p className="text-sm text-muted-foreground">Capacidad de proyectos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Servicios Potenciados */}
        <Card>
          <CardHeader>
            <CardTitle>5 Servicios Freelance que se Multiplican con IA</CardTitle>
            <p className="text-muted-foreground">
              Estos servicios tienen el mayor potencial para aumentar tus ingresos.
              Incluye prompts probados y casos reales de freelancers exitosos.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {serviciosFreelanceIA.map((servicio, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">Servicio {index + 1}</Badge>
                        <h3 className="text-xl font-bold mb-2">{servicio.servicio}</h3>
                        <p className="text-muted-foreground">{servicio.descripcion}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-500 line-through">{servicio.tarifaTradicional}</p>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <p className="text-lg font-bold text-green-600">{servicio.tarifaPotenciado}</p>
                        </div>
                        <p className="text-sm font-medium text-green-600">{servicio.incremento}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Metrícicas */}
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-medium">Ahorro tiempo:</p>
                          <p className="text-green-600">{servicio.tiempoAhorro}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="font-medium">Mejora calidad:</p>
                          <p>{servicio.calidadMejora}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium">ROI:</p>
                          <p className="text-green-600 font-medium">300-500%</p>
                        </div>
                      </div>
                    </div>

                    {/* Herramientas */}
                    <div>
                      <h4 className="font-semibold mb-3">Stack de Herramientas</h4>
                      <div className="flex flex-wrap gap-2">
                        {servicio.herramientas.map((herramienta, herramientaIndex) => (
                          <Badge key={herramientaIndex} variant="secondary" className="text-xs">
                            {herramienta}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Casos de Éxito */}
                    <div>
                      <h4 className="font-semibold mb-3">Casos Reales de Freelancers</h4>
                      <div className="space-y-2">
                        {servicio.casosExito.map((caso, casoIndex) => (
                          <div key={casoIndex} className="bg-gray-50 rounded p-3">
                            <div className="flex items-start justify-between mb-1">
                              <p className="font-medium text-sm">{caso.freelancer}</p>
                              <Badge variant="outline" className="text-xs">{caso.timeline}</Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-500">Antes:</p>
                                <p className="text-red-600 font-medium">{caso.antes}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Después:</p>
                                <p className="text-green-600 font-medium">{caso.despues}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prompt Plantilla */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-blue-900">💡 Prompt Template (Copiar y Adaptar)</h4>
                      <div className="bg-white rounded p-3 font-mono text-xs max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">{servicio.promptPlantilla}</pre>
                      </div>
                      <CopyButton
                        text={servicio.promptPlantilla}
                        className="mt-3 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                        label="📋 Copiar Plantilla"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap 12 Semanas */}
        <Card>
          <CardHeader>
            <CardTitle>Roadmap: 12 Semanas para Multiplicar tus Ingresos</CardTitle>
            <p className="text-muted-foreground">
              Sigue este plan paso a paso para transformar tu negocio freelance.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmapFreelance.map((fase, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{fase.semana}</h4>
                          <p className="text-sm text-muted-foreground">Inversión: {fase.inversion}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {index === 0 ? 'Foundation' : index === 1 ? 'Integration' : index === 2 ? 'Optimization' : 'Scaling'}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <p className="font-medium mb-2 text-sm">Actividades:</p>
                        <ul className="space-y-1">
                          {fase.actividades.map((actividad, actividadIndex) => (
                            <li key={actividadIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {actividad}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium mb-2 text-sm">Métricas de Éxito:</p>
                        <div className="grid md:grid-cols-3 gap-2">
                          {fase.metricas.map((metrica, metricaIndex) => (
                            <div key={metricaIndex} className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {metrica}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < roadmapFreelance.length - 1 && (
                    <div className="ml-5 w-0.5 h-6 bg-gray-200 mt-2"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-900 mb-2">🎯 Resultado del Roadmap:</p>
              <p className="text-sm text-green-700">
                En 12 semanas, transformarás tu negocio de $2,000-3,000/mes a $6,000-15,000/mes.
                La clave es aplicar sistemáticamente las herramientas IA y documentar tu valor agregado
                para justificar tarifas premium.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Precios y Posicionamiento */}
        <Card>
          <CardHeader>
            <CardTitle>Cómo Justificar y Fijar Precios Premium</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">1. Mide tu Valor en Resultados, no en Tiempo</h4>
                <p className="text-sm text-muted-foreground">
                  En lugar de "$25/hora", presenta "Aumento 40% en engagement" o "100 leads cualificados".
                  Los clientes pagan por resultados, no por tu tiempo.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">2. Crea Packages con Valor Agregado</h4>
                <p className="text-sm text-muted-foreground">
                  Básico ($300): solo entrega. Estándar ($500): entrega + 2 revisiones.
                  Premium ($800): entrega + ilimitadas revisiones + estrategia + soporte 30 días.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">3. Usa Casos de Éxito con Números</h4>
                <p className="text-sm text-muted-foreground">
                  "Cliente X pasó de 50 seguidores a 2,000 en 60 días usando mis servicios".
                  La evidencia numérica valida tus precios premium.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">4. Ofrece Garantías para Reducir Riesgo</h4>
                <p className="text-sm text-muted-foreground">
                  "Satisfacción garantizada o te reviso sin costo" o "Duplico tus leads o te devuelvo el 50%".
                  Las garantías demuestran confianza en tus resultados.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">💰 Fórmula de Precios IA-Powered:</p>
              <p className="text-sm text-blue-700">
                (Precio Tradicional × 2.5) + (Valor IA Agregado × 0.5) = Precio Premium
                <br />
                Ejemplo: ($50 × 2.5) + ($200 × 0.5) = $225 vs $50 tradicional = 4.5x más
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Herramientas Esenciales */}
        <Card>
          <CardHeader>
            <CardTitle>Tu Stack Mínimo Viable ($100/mes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Herramientas Esenciales</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>ChatGPT Plus:</strong> $20/mes - Todo propósito</li>
                  <li>• <strong>Grammarly Premium:</strong> $12/mes - Calidad profesional</li>
                  <li>• <strong>Notion Pro:</strong> $8/mes - Organización y proyectos</li>
                  <li>• <strong>Canva Pro:</strong> $12/mes - Diseño gráfico</li>
                  <li>• <strong>Buffer Pro:</strong> $6/mes - Social media scheduling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Herramientas Especializadas</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Midjourney:</strong> $30/mes - Imágenes AI</li>
                  <li>• <strong>DeepL Pro:</strong> $8/mes - Traducción profesional</li>
                  <li>• <strong>Surfer SEO:</strong> $49/mes - Optimización SEO</li>
                  <li>• <strong>Jasper:</strong> $49/mes - Copywriting avanzado</li>
                  <li>• <strong>Figma Pro:</strong> $12/mes - Design UI/UX</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="font-medium text-green-900">💡 ROI de Inversión:</p>
              <p className="text-sm text-green-700">
                Con 2 clientes premium ($500 cada uno), recuperas tu inversión en herramientas 10x.
                El resto del mes es 95% profit marginal.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 pb-6 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Multiplicar tus Ingresos como Freelancer?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Miles de freelancers ya están duplicando y triplicando sus ingresos usando IA.
              La pregunta no es si puedes permitírtelo, sino si puedes permitirte no hacerlo.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button size="lg" asChild>
                <Link href="/contacto">
                  Transformar mi Freelancing
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