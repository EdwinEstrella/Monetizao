import { getAllPosts } from '@/lib/mdx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Zap, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = [
  { name: 'ChatGPT para Negocios', slug: 'chatgpt-para-negocios', description: 'Estrategias para monetizar usando ChatGPT', icon: Zap },
  { name: 'IA Visual y Creativa', slug: 'ia-visual-y-creativa', description: 'Genera ingresos con arte y diseño por IA', icon: Target },
  { name: 'Automatización y Sistemas', slug: 'automatizacion-y-sistemas', description: 'Negocios automatizados que generan ingresos 24/7', icon: TrendingUp },
  { name: 'Prompts y Plantillas', slug: 'prompts-y-plantillas', description: 'Prompts optimizados para maximizar ganancias', icon: BookOpen },
  { name: 'Marketing y Ventas', slug: 'marketing-y-ventas', description: 'Estrategias de marketing potenciadas por IA', icon: Target },
  { name: 'Consultoría y Servicios', slug: 'consultoria-y-servicios', description: 'Ofrece servicios de consultoría con IA', icon: TrendingUp },
  { name: 'Finanzas e Inversión', slug: 'finanzas-e-inversion', description: 'Optimiza tus finanzas con herramientas de IA', icon: Zap },
  { name: 'E-commerce y Negocios Online', slug: 'e-commerce-y-negocios-online', description: 'Tiendas online y negocios digitales con IA', icon: Target },
  { name: 'Content Creation', slug: 'content-creation', description: 'Crea contenido atractivo usando inteligencia artificial', icon: BookOpen },
  { name: 'Servicios y Freelance', slug: 'servicios-y-freelance', description: 'Potencia tu trabajo freelance con herramientas de IA', icon: Zap },
]

export default function RecursosPage() {
  const posts = getAllPosts()

  // Count posts per category
  const categoriesWithCount = categories.map(category => {
    const categoryPosts = posts.filter(post =>
      post.category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') === category.slug
    )
    return {
      ...category,
      count: categoryPosts.length
    }
  })

  // Sort by count (most posts first)
  const sortedCategories = categoriesWithCount.sort((a, b) => b.count - a.count)

  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4 break-words">
          Categorías de Recursos
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto break-words">
          Explora nuestras estrategias probadas para monetizar con Inteligencia Artificial.
          Cada categoría contiene guías detalladas, prompts lucrativos y casos de éxito.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {sortedCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card key={category.slug} className="group hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count} artículo{category.count !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors break-words">
                  {category.name}
                </CardTitle>
                <CardDescription className="break-words">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 h-auto text-base w-full" asChild>
                  <Link href={`/blog/category/${category.slug}`} className="flex items-center justify-center gap-2">
                    Explorar categoría
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Popular Posts */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-4 break-words">
            Artículos Populares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto break-words">
            Los artículos más leídos sobre estrategias de monetización con IA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors text-lg break-words">
                  {post.title}
                </CardTitle>
                <CardDescription className="break-words">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Leer →
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-muted/50 rounded-lg">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold tracking-tighter mb-4 break-words">
            ¿Listo para empezar a monetizar con IA?
          </h2>
          <p className="text-muted-foreground mb-6 break-words">
            Únete a miles de emprendedores que ya están generando ingresos
            sustanciales gracias a nuestras estrategias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/blog">
                <BookOpen className="mr-2 h-4 w-4" />
                Ver Todos los Artículos
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contacto">
                Contactar para Asesoría
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}