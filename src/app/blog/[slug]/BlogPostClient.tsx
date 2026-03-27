'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Eye } from 'lucide-react'
import Link from 'next/link'
import { ArticleWithRelations } from '@/lib/articles-db'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import AuthorBio from '@/components/blog/AuthorBio';

interface BlogPostClientProps {
  article: ArticleWithRelations
  relatedPosts: ArticleWithRelations[]
}

export default function BlogPostClient({ article, relatedPosts }: BlogPostClientProps) {
  const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'Fecha no disponible'

    try {
      const d = new Date(date)
      if (isNaN(d.getTime())) return 'Fecha inválida'
      // Usar formato consistente para evitar hidratación
      const day = d.getDate()
      const month = d.toLocaleDateString('es-ES', { month: 'long' })
      const year = d.getFullYear()
      return `${day} de ${month} de ${year}`
    } catch (error) {
      console.error('Error formateando fecha:', error)
      return 'Fecha inválida'
    }
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
        <Link href="/blog" className="text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al blog
        </Link>
      </div>
    )
  }

  const processedContent = article.content || ''

  
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header del artículo */}
      <header className="mb-8">
        <div className="mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span suppressHydrationWarning>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {article.viewCount || 0} vistas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">EE</span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              Edwin Estrella
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
          {article.title || 'Sin título'}
        </h1>

        {article.excerpt && (
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {article.category && (
            <Badge variant="outline">
              {article.category.name}
            </Badge>
          )}
          {article.tags && article.tags.length > 0 && article.tags.map((tag: any) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </header>

      {/* Imagen destacada - Optimizada */}
      {article.featuredImage && (
        <div className="mb-8">
          <img
            src={article.featuredImage}
            alt={article.title || 'Imagen del artículo'}
            className="w-full h-auto rounded-lg object-cover"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      )}

      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          allowElement={(element, index, parent) => {
            // Permitir elementos iframe para videos de YouTube
            if (element.tagName === 'iframe') {
              const src = element.properties?.src as string;
              // Solo permitir iframes de YouTube y Vimeo
              return src && (
                src.includes('youtube.com') ||
                src.includes('youtu.be') ||
                src.includes('vimeo.com')
              );
            }
            return true;
          }}
          components={{
            code({ className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : ''
              const isInline = props.inline || !className?.includes('language-')
              return !isInline && language ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={language}
                  PreTag="div"
                  className="rounded-lg"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            h1: ({ children, ...props }) => (
              <h1 className="hidden" {...props}>
                {children}
              </h1>
            ), // Ocultar h1 duplicado con CSS
            h2: ({ children, ...props }) => (
              <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground" {...props}>
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground" {...props}>
                {children}
              </h3>
            ),
            p: ({ children, ...props }) => (
              <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
                {children}
              </p>
            ),
            ul: ({ children, ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground" {...props}>
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground" {...props}>
                {children}
              </ol>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/50 rounded-r" {...props}>
                {children}
              </blockquote>
            ),
            a: ({ children, href, ...props }) => (
              <a
                href={href}
                className="text-primary hover:underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            ),
            table: ({ children, ...props }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border-collapse border rounded" {...props}>
                  {children}
                </table>
              </div>
            ),
            th: ({ children, ...props }) => (
              <th className="border border-muted bg-muted px-4 py-2 text-left font-medium" {...props}>
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td className="border border-muted px-4 py-2" {...props}>
                {children}
              </td>
            ),
            hr: ({ ...props }) => (
              <hr className="my-6 border-border" {...props} />
            ),
            strong: ({ children, ...props }) => (
              <strong className="text-primary font-semibold" {...props}>
                {children}
              </strong>
            ),
            img: ({ src, alt, ...props }) => (
              <img
                src={src}
                alt={alt}
                className="rounded-lg max-w-full h-auto my-4"
                loading="lazy"
                {...props}
              />
            ),
            iframe: ({ src, title, className, ...props }: any) => (
              <div className="my-8">
                <iframe
                  src={src}
                  title={title}
                  className={`w-full aspect-video rounded-lg ${className || ''}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  {...props}
                />
              </div>
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>

      <AuthorBio author={article.author} />

      {/* Footer del artículo */}
      <footer className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Publicado el <span suppressHydrationWarning>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex gap-4">
            {article._count?.comments !== undefined && article._count.comments > 0 && (
              <span className="text-sm text-muted-foreground">
                {article._count.comments} comentario{article._count.comments !== 1 ? 's' : ''}
              </span>
            )}
            {article._count?.ratings !== undefined && article._count.ratings > 0 && (
              <span className="text-sm text-muted-foreground">
                {article._count.ratings} valoracion{article._count.ratings !== 1 ? 'es' : ''}
              </span>
            )}
          </div>
        </div>
      </footer>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost: any) => (
              <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {relatedPost.category && (
                      <Badge variant="outline" className="text-xs">
                        {relatedPost.category.name}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </CardTitle>
                  {relatedPost.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                      {relatedPost.excerpt}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span suppressHydrationWarning>{formatDate(relatedPost.publishedAt)}</span>
                    <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {relatedPost.viewCount || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}