export interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  readTime: number
  image?: string
}

export interface PostWithContent extends Post {
  content: string
}

export interface Category {
  name: string
  slug: string
  description: string
  postCount: number
  color: string
}