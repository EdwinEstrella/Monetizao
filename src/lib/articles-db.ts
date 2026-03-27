import insforge from './insforge'

export interface ArticleWithRelations {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  status: string
  publishedAt: Date | null
  seoTitle: string | null
  seoDescription: string | null
  seoKeywords: string | null
  viewCount: number
  language: string
  translations: any
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    name: string
    email: string
    avatar: string | null
  }
  category: {
    id: string
    name: string
    slug: string
  }
  tags: {
    id: string
    name: string
  }[]
  _count?: {
    comments: number
    ratings: number
  }
}

export async function getAllArticles(options?: {
  limit?: number
  offset?: number
  status?: string
  category?: string
  search?: string
}): Promise<ArticleWithRelations[]> {
  let query = insforge.database
    .from('articles')
    .select(`
      *,
      users (
        id,
        name,
        email,
        avatar
      ),
      categories (
        id,
        name,
        slug
      ),
      article_tags (
        tags (
          id,
          name
        )
      )
    `)
    .eq('status', options?.status || 'published')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(Math.min(options?.limit || 20, 50))

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options?.limit || 20) - 1)
  }

  if (options?.category) {
    query = query.eq('categories.slug', options.category)
  }

  if (options?.search) {
    // Usar ilike para búsqueda case-insensitive
    query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%,content.ilike.%${options.search}%`)
  }

  const { data: articles, error } = await query

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  // Transformar los datos para que coincidan con la interfaz
  return (articles || []).map((article: any) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    featuredImage: article.featured_image,
    status: article.status,
    publishedAt: article.published_at ? new Date(article.published_at) : null,
    seoTitle: article.seo_title,
    seoDescription: article.seo_description,
    seoKeywords: article.seo_keywords,
    viewCount: article.view_count,
    language: article.language,
    translations: article.translations,
    createdAt: new Date(article.created_at),
    updatedAt: new Date(article.updated_at),
    author: article.users || { id: '', name: '', email: '', avatar: null },
    category: article.categories || { id: '', name: 'Sin categoría', slug: '' },
    tags: article.article_tags?.map((tagRelation: any) => tagRelation.tags) || [],
    _count: {
      comments: 0, // InsForge no soporta _count, necesitamos consultas separadas
      ratings: 0
    }
  })) as ArticleWithRelations[]
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithRelations | null> {
  const { data: articles, error } = await insforge.database
    .from('articles')
    .select(`
      *,
      users (
        id,
        name,
        email,
        avatar
      ),
      categories (
        id,
        name,
        slug
      ),
      article_tags (
        tags (
          id,
          name
        )
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !articles) {
    return null
  }

  const article = articles
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    featuredImage: article.featured_image,
    status: article.status,
    publishedAt: article.published_at ? new Date(article.published_at) : null,
    seoTitle: article.seo_title,
    seoDescription: article.seo_description,
    seoKeywords: article.seo_keywords,
    viewCount: article.view_count,
    language: article.language,
    translations: article.translations,
    createdAt: new Date(article.created_at),
    updatedAt: new Date(article.updated_at),
    author: article.users || { id: '', name: '', email: '', avatar: null },
    category: article.categories || { id: '', name: 'Sin categoría', slug: '' },
    tags: article.article_tags?.map((tagRelation: any) => tagRelation.tags) || [],
    _count: {
      comments: 0,
      ratings: 0
    }
  } as ArticleWithRelations
}

export async function getRelatedArticles(
  articleId: string,
  categoryId: string,
  limit: number = 3
): Promise<ArticleWithRelations[]> {
  const { data: articles, error } = await insforge.database
    .from('articles')
    .select(`
      *,
      users (
        id,
        name,
        email,
        avatar
      ),
      categories (
        id,
        name,
        slug
      ),
      article_tags (
        tags (
          id,
          name
        )
      )
    `)
    .neq('id', articleId)
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related articles:', error)
    return []
  }

  return (articles || []).map((article: any) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    featuredImage: article.featured_image,
    status: article.status,
    publishedAt: article.published_at ? new Date(article.published_at) : null,
    seoTitle: article.seo_title,
    seoDescription: article.seo_description,
    seoKeywords: article.seo_keywords,
    viewCount: article.view_count,
    language: article.language,
    translations: article.translations,
    createdAt: new Date(article.created_at),
    updatedAt: new Date(article.updated_at),
    author: article.users || { id: '', name: '', email: '', avatar: null },
    category: article.categories || { id: '', name: 'Sin categoría', slug: '' },
    tags: article.article_tags?.map((tagRelation: any) => tagRelation.tags) || [],
    _count: {
      comments: 0,
      ratings: 0
    }
  })) as ArticleWithRelations[]
}

export async function getAllCategories() {
  const { data: categories, error } = await insforge.database
    .from('categories')
    .select(`
      *,
      articles (count)
    `)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return categories || []
}

export async function getAllTags() {
  const { data: tags, error } = await insforge.database
    .from('tags')
    .select(`
      *,
      article_tags (count)
    `)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  return tags || []
}

export async function incrementViewCount(articleId: string): Promise<void> {
  const { data: currentArticle } = await insforge.database
    .from('articles')
    .select('view_count')
    .eq('id', articleId)
    .single()

  if (currentArticle) {
    await insforge.database
      .from('articles')
      .update({ view_count: (currentArticle.view_count || 0) + 1 })
      .eq('id', articleId)
  }
}
