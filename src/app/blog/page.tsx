import { getAllArticles } from '@/lib/articles-db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 3600

const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return 'Fecha no disponible'

  try {
    const dateInput = date as string | Date
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) return 'Fecha inválida'
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  } catch (error) {
    return 'Fecha inválida'
  }
}

const PostCard = ({ post }: { post: any }) => (
  <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Calendar className="h-4 w-4" />
        <span suppressHydrationWarning>{formatDate(post.publishedAt || post.createdAt)}</span>
      </div>
      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </CardTitle>
      <CardDescription className="line-clamp-3">
        {post.excerpt}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">EE</span>
          </div>
          <span className="font-medium">Edwin Estrella</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {Math.ceil(post.content.length / 1000)} min
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags && post.tags.length > 0 && post.tags.slice(0, 3).map((tag: any) => (
          <Badge key={tag.id} variant="secondary" className="text-xs">
            {tag.name}
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
)

export default async function BlogPage() {
  const posts = await getAllArticles()

  const featuredPosts = posts.filter(post => post.featuredImage !== null).slice(0, 6)

  return (
    <div className="container px-4 py-8 md:px-6 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">
          Blog Monetizao
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre estrategias probadas para monetizar con Inteligencia Artificial.
          Artículos, guías y casos de éxito para transformar tu futuro financiero.
        </p>
      </div>

      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Artículos Destacados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Todos los Artículos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay artículos publicados todavía. ¡Vuelve pronto!
          </p>
        </div>
      )}
    </div>
  )
}