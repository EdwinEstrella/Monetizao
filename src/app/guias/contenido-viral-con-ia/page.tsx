import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Users, TrendingUp, Target, CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Creación de Contenido Viral con IA | Monetizao',
  description: 'Produce contenido masivo que enamora audiencias y genera ingresos. Blogs, videos, podcasts y posts optimizados con IA para maximizar engagement y monetización.',
  openGraph: {
    title: 'Creación de Contenido Viral con IA',
    description: 'Produce contenido masivo que enamora audiencias y genera ingresos.',
    url: 'https://monetizao.com/guias/contenido-viral-con-ia',
  },
}

const formatosContenido = [
  {
    formato: "Blog Posts SEO Optimizados",
    descripcion: "Artículos que dominan Google y atraen tráfico orgánico",
    metricasViralidad: "1000+ shares, top 10 Google, backlinks naturales",
    herramientas: ["ChatGPT", "Surfer SEO", "Grammarly", "Canva"],
    promptEjemplo: `Crea artículo blog 1500 palabras sobre [tema] optimizado para SEO:
- Título con keyword principal al inicio y número
- Meta description 155 chars con CTA
- H1, 3-4 H2, 6-8 H3 con keywords LSI
- Densidad keyword: 1.5-2%
- Links internos: 3-5 naturales
- Call-to-action estratégico
- Readability: Flesch 60-70
- Word count: 1500-2000 palabras`,
    casosExito: [
      "Blog fitness: 50K views en 48hrs usando IA para trending topics",
      "Blog finanzas: Page 1 Google en 2 semanas con contenido optimizado"
    ]
  },
  {
    formato: "Short-form Videos (Reels/TikTok/Shorts)",
    descripcion: "Videos de 15-60 segundos diseñados para viralidad",
    metricasViralidad: "100K+ views, 10K+ likes, alto engagement",
    herramientas: ["Pictory", "Synthesia", "Canva", "CapCut"],
    promptEjemplo: `Generar script video viral 30 segundos sobre [tema]:
Hook 3 seg: [pregunta controversial o dato impactante]
Valor 20 seg: [3 tips rápidos con valor inmediato]
CTA 7 seg: [pregunta para comentar o follow]

ESTRUCTURA VISUAL:
- 0-3s: Cara impactante con texto grande
- 4-15s: Tips con efectos rápidos
- 16-25s: Demostración o ejemplo
- 26-30s: CTA claro con dirección

AUDIO: Música trending + voiceover enérgico
CAPTIONS: Texto grande legible sin sonido
HASHTAGS: 3 trending + 3 de nicho`,
    casosExito: [
      "Cocina: 1M views en 48hrs con recipe simplificada",
      "Fitness: 500K views mostrando transformación 30 días"
    ]
  },
  {
    formato: "Email Newsletters Persuasivos",
    descripcion: "Emails que convierten suscriptores en clientes",
    metricasViralidad: "50%+ open rate, 10%+ CTR, alto forward rate",
    herramientas: ["ChatGPT", "ConvertKit", "Canva", "Grammarly"],
    promptEjemplo: `Newsletter semanal para [audiencia]:

SUBJECT LINE:
3 opciones con emoji y personalización:
- [Pain point] + [beneficio] 🔥
- [Nombre], ¿listo para [resultado]?
- ⚠️ Error que te está costando [consecuencia]?

BODY STRUCTURE:
- Opening personalizada + hook
- Valor principal (story o tips)
- Segundo valor (herramienta/recurso)
- CTA clara con urgencia
- P.S. con bonus o recordatorio

Tono: [conversacional/inspirador/urgente]
Length: 300-500 palabras
Mobile: Optimizado para lectura móvil`,
    casosExito: [
      "Marketing: $25K en ventas usando newsletter 2x/semana",
      "Coaching: 80%学员 retention con contenido personalizado"
    ]
  }
]

export default function ContenidoViralPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      <Link href="/guias" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Guías
      </Link>

      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">Contenido</Badge>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Creación de Contenido Viral con IA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Produce contenido masivo que enamora audiencias y genera ingresos. Aprende a crear blogs, videos, podcasts y posts optimizados con IA.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>28 min de lectura</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>9,870 estudiantes</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Sistema de Contenido Viral con IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              El contenido viral no es accidente, es ciencia. Con IA puedes analizar patrones,
              predecir tendencias y producir contenido optimizado a escala industrial.
              Esta guía te muestra exactamente cómo hacerlo.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatos de Contenido con Mayor Potencial Viral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formatosContenido.map((formato, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="outline" className="mb-2">Formato {index + 1}</Badge>
                      <h3 className="text-lg font-semibold">{formato.formato}</h3>
                      <p className="text-muted-foreground">{formato.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{formato.metricasViralidad}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Herramientas:</p>
                      <div className="flex flex-wrap gap-1">
                        {formato.herramientas.map((herramienta, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{herramienta}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm mb-2">Casos reales:</p>
                      {formato.casosExito.map((caso, i) => (
                        <p key={i} className="text-sm text-green-600">✓ {caso}</p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded p-3">
                    <p className="font-medium text-blue-900 mb-2">Prompt Ejemplo:</p>
                    <div className="bg-white rounded p-2 text-xs font-mono max-h-32 overflow-y-auto">
                      {formato.promptEjemplo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call to Action</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" asChild>
              <Link href="/contacto">Aplicar Estrategias de Contenido Viral</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}