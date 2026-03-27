import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles-db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url || 'http://localhost')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const articles = await getAllArticles({
      search: search || undefined,
      category: category || undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined
    })

    return NextResponse.json({
      success: true,
      data: articles.map(article => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        category: article.category?.name || 'Sin categoría',
        tags: article.tags?.map((tag: any) => tag.name) || [],
        publishedAt: article.publishedAt,
        createdAt: article.createdAt
      }))
    })
  } catch (error) {
    console.error('Error en API de artículos:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener los artículos'
      },
      { status: 500 }
    )
  }
}