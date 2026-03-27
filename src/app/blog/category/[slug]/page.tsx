import { getPostsByCategory, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

const categoryNames: { [key: string]: string } = {
  'chatgpt-para-negocios': 'ChatGPT para Negocios',
  'ia-visual-y-creativa': 'IA Visual y Creativa',
  'automatizacion-y-sistemas': 'Automatización y Sistemas',
  'prompts-y-plantillas': 'Prompts y Plantillas',
  'marketing-y-ventas': 'Marketing y Ventas',
  'consultoria-y-servicios': 'Consultoría y Servicios',
  'finanzas-e-inversion': 'Finanzas e Inversión',
  'e-commerce-y-negocios-online': 'E-commerce y Negocios Online',
  'content-creation': 'Content Creation',
  'servicios-y-freelance': 'Servicios y Freelance',
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = Array.from(new Set(posts.map(post => post.category)))
  return categories.map((category) => ({
    slug: category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryName = categoryNames[params.slug]

  if (!categoryName) {
    return {
      title: 'Categoría no encontrada',
    }
  }

  return {
    title: `${categoryName} - Blog Monetizao`,
    description: `Artículos sobre ${categoryName.toLowerCase()} para monetizar con inteligencia artificial.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryNames[params.slug]

  if (!categoryName) {
    notFound()
  }

  const posts = getPostsByCategory(categoryName)

  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      {/* Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </Button>
      </div>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          {categoryName}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre estrategias, guías y casos de éxito para monetizar con {categoryName.toLowerCase()}.
          {posts.length > 0 && ` ${posts.length} artículo${posts.length === 1 ? '' : 's'} disponible${posts.length === 1 ? '' : 's'}.`}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Leer artículo →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-6">
            <p className="text-muted-foreground text-lg">
              No hay artículos disponibles en esta categoría todavía.
            </p>
            <p className="text-muted-foreground mt-2">
              Prueba explorando otras categorías o vuelve más tarde para ver nuevo contenido.
            </p>
          </div>
          <Button asChild>
            <Link href="/blog">
              Ver todos los artículos
            </Link>
          </Button>
        </div>
      )}

      {/* Related Categories */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Explora Otras Categorías</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryNames)
            .filter(([slug]) => slug !== params.slug)
            .slice(0, 6)
            .map(([slug, name]) => {
              const categoryPosts = getAllPosts().filter(post =>
                post.category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') === slug
              )

              return (
                <Link
                  key={slug}
                  href={`/blog/category/${slug}`}
                  className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {categoryPosts.length} artículos
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Explora contenido sobre {name.toLowerCase()}
                  </p>
                </Link>
              )
            })}
        </div>
      </section>
    </div>
  )
}