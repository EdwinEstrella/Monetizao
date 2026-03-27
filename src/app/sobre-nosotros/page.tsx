import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Lightbulb, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Monetizao',
  description: 'Conoce al equipo detrás de Monetizao - Expertos en monetización con Inteligencia Artificial.',
  openGraph: {
    title: 'Sobre Nosotros | Monetizao',
    description: 'Conoce al equipo detrás de Monetizao - Expertos en monetización con Inteligencia Artificial.',
    url: 'https://monetizao.com/sobre-nosotros',
  },
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Sobre Monetizao
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Somos un equipo de expertos apasionados por ayudarte a monetizar con Inteligencia Artificial
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Nuestra Misión</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg leading-relaxed">
              En Monetizao, nuestra misión es democratizar el acceso a estrategias de monetización con IA,
              permitiendo que emprendedores, freelancers y negocios de todos los tamaños puedan
              generar ingresos sustanciales utilizando las herramientas tecnológicas más avanzadas.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestros Valores</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Comunidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fomentamos una comunidad de aprendizaje colaborativo donde compartimos estrategias que funcionan.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Nos enfocamos en estrategias probadas que generen ingresos reales y medibles.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Lightbulb className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Innovación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Estamos siempre a la vanguardia de las nuevas oportunidades de monetización con IA.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Excelencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mantenemos los más altos estándares de calidad en todo nuestro contenido y estrategias.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Expertise */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestra Experiencia</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Especialización en IA</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• ChatGPT y GPT-4 para negocios</li>
                <li>• Automatización con inteligencia artificial</li>
                <li>• Prompts lucrativos y plantillas</li>
                <li>• Estrategias de content marketing con IA</li>
                <li>• Optimización de procesos freelancers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Casos de Éxito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded">
                  <p className="font-semibold">+300% Ingresos</p>
                  <p className="text-sm text-muted-foreground">
                    Freelancers que han multiplicado sus ingresos usando nuestras estrategias
                  </p>
                </div>
                <div className="p-3 bg-muted rounded">
                  <p className="font-semibold">1000+ Prompts</p>
                  <p className="text-sm text-muted-foreground">
                    Biblioteca de prompts probados y validados para diferentes nichos
                  </p>
                </div>
                <div className="p-3 bg-muted rounded">
                  <p className="font-semibold">24/7 Soporte</p>
                  <p className="text-sm text-muted-foreground">
                    Comunidad activa y soporte continuo para nuestros miembros
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Founder */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestro Fundador</h2>
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-muted flex items-center justify-center p-8">
              {/* Placeholder for an image */}
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-2">Edwin Estrella</h3>
              <p className="text-primary font-semibold mb-4">Fundador y Autor Principal</p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Edwin es un desarrollador de software y emprendedor con más de 5 años de experiencia en la creación de negocios digitales. Apasionado por la inteligencia artificial, ha dedicado los últimos años a explorar y aplicar estrategias de IA para la monetización de nichos de mercado. Su objetivo con Monetizao es compartir conocimiento práctico y probado para que otros puedan alcanzar la independencia financiera a través de la tecnología.
              </p>
              <a href="https://www.linkedin.com/in/edwin-estrella/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                Conectar en LinkedIn →
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestro Equipo</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipo Monetizao</h3>
              <p className="text-muted-foreground">
                Expertos en monetización digital, inteligencia artificial y marketing digital
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Badge variant="secondary" className="mb-2">Desarrollo</Badge>
                <p className="text-sm">
                  Especialistas en implementación de soluciones IA y automatización
                </p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Marketing</Badge>
                <p className="text-sm">
                  Expertos en estrategias de monetización y growth marketing
                </p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Contenido</Badge>
                <p className="text-sm">
                  Creadores de contenido educativo y estrategias probadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact CTA */}
      <section className="text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">
              ¿Listo para empezar a monetizar con IA?
            </h2>
            <p className="text-muted-foreground mb-6">
              Únete a nuestra comunidad y descubre las estrategias que están transformando negocios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blog"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Explorar Estrategias
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Contactarnos
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}