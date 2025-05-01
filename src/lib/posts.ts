import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  img?: string
}

export async function getAllPosts(): Promise<Post[]> {
  // Read posts.json
  const postsJson = JSON.parse(
    await fs.readFile(path.join(postsDirectory, 'posts.json'), 'utf8')
  )

  const posts = await Promise.all(
    postsJson.map(async (post: Omit<Post, 'content'>) => {
      // Read the markdown file
      const fullPath = path.join(postsDirectory, `${post.slug}.md`)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { content } = matter(fileContents)

      return {
        ...post,
        content,
      }
    })
  )

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error('Error getting post by slug:', error)
    return null
  }
} 
