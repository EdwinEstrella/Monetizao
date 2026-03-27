import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles-db'

interface BlogPostProps {
  params: {
    slug: string
  }
}

export const revalidate = 1800

export async function generateStaticParams() {
  try {
    const { getAllArticles } = await import('@/lib/articles-db')
    const posts = await getAllArticles()

    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Artículo no encontrado',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.seoKeywords || article.tags.map(tag => tag.name).join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      type: 'article',
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      images: article.featuredImage ? [
        {
          url: article.featuredImage,
          alt: article.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || '',
      images: article.featuredImage ? [
        {
          url: article.featuredImage,
          alt: article.title,
        }
      ] : [],
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params

  try {
    const article = await getArticleBySlug(slug)

    if (!article) {
      notFound()
    }

    Promise.resolve().then(async () => {
      try {
        const { incrementViewCount } = await import('@/lib/articles-db')
        await incrementViewCount(article.id)
      } catch (error) {
        console.error('Error incrementando vista:', error)
      }
    })

    const relatedPosts = await getRelatedArticles(article.id, article.category?.id || '')

    return <BlogPostClient article={article} relatedPosts={relatedPosts} />
  } catch (error) {
    console.error('Error cargando artículo:', error)
    notFound()
  }
}