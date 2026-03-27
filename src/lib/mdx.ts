import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

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
  contentHtml?: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title || '',
        description: matterResult.data.description || '',
        date: matterResult.data.date || '',
        author: matterResult.data.author || 'Monetizao Team',
        category: matterResult.data.category || 'IA',
        tags: matterResult.data.tags || [],
        featured: matterResult.data.featured || false,
        readTime: matterResult.data.readTime || 5,
        image: matterResult.data.image || '',
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): PostWithContent | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title || '',
      description: matterResult.data.description || '',
      date: matterResult.data.date || '',
      author: matterResult.data.author || 'Monetizao Team',
      category: matterResult.data.category || 'IA',
      tags: matterResult.data.tags || [],
      featured: matterResult.data.featured || false,
      readTime: matterResult.data.readTime || 5,
      image: matterResult.data.image || '',
      content: matterResult.content, // El contenido MDX sin procesar
    }
  } catch (error) {
    return null
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map(post => post.category))
  return Array.from(categories)
}