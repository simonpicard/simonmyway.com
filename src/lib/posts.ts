import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const DEFAULT_IMAGE = '/img/simonmyway-og.png'

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  img?: string
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

function getDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
  return match ? match[1] : new Date().toISOString().split('T')[0]
}

function extractFirstImage(content: string): string | undefined {
  const match = content.match(/!\[.*?\]\((.*?)\)/)
  return match ? match[1] : undefined
}

export function cleanDescription(content: string, length: number = 160): string {
  // Remove frontmatter if present
  const { content: markdownContent } = matter(content)

  // Remove the title (first h1)
  const withoutTitle = markdownContent.replace(/^#\s+.+$/m, '')

  // Remove markdown formatting
  return withoutTitle
    .replace(/#{1,6}\s/g, '')           // Remove headings
    .replace(/!\[.*?\]\(.*?\)/g, '')    // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/\*\*(.*?)\*\*/g, '$1')    // Remove bold
    .replace(/\*(.*?)\*/g, '$1')        // Remove italic
    .replace(/`(.*?)`/g, '$1')          // Remove code
    .replace(/>\s(.*)/g, '$1')          // Remove blockquotes
    .replace(/\n/g, ' ')                // Replace newlines with spaces
    .replace(/\s+/g, ' ')               // Normalize spaces
    .trim()
    .slice(0, length)                      // Limit length
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(postsDirectory)
  const markdownFiles = files.filter(file => file.endsWith('.md'))

  const posts = await Promise.all(
    markdownFiles.map(async (filename) => {
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Extract title from first h1 if not in frontmatter
      const title = data.title || content.match(/^#\s+(.+)$/m)?.[1] || filename
      const slug = slugify(title)
      const firstImage = extractFirstImage(content)

      return {
        slug,
        title,
        date: data.date || getDateFromFilename(filename),
        content,
        img: data.img || firstImage || DEFAULT_IMAGE
      }
    })
  )

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
