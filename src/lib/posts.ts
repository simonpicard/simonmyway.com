import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'

const postsDirectory = (locale: Locale) => path.join(process.cwd(), 'content/posts', locale)
const DEFAULT_IMAGE = '/img/simonmyway-og.png'

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  locale: Locale
  file: string // filename shared across locales, used to link translations
  img?: string
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')               // Decompose accented chars (é -> e + combining accent)
    .replace(/[\u0300-\u036f]/g, '') // Strip diacritical marks
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

export async function getAllPosts(locale: Locale): Promise<Post[]> {
  let files: string[]
  try {
    files = await fs.readdir(postsDirectory(locale))
  } catch {
    return []
  }
  const markdownFiles = files.filter(file => file.endsWith('.md'))

  const posts = await Promise.all(
    markdownFiles.map(async (filename) => {
      const fullPath = path.join(postsDirectory(locale), filename)
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
        locale,
        file: filename,
        img: data.img || firstImage || DEFAULT_IMAGE
      }
    })
  )

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts(locale)
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error('Error getting post by slug:', error)
    return null
  }
}

// Find the same post in another locale (matched by filename)
export async function getTranslation(post: Post, locale: Locale): Promise<Post | null> {
  const posts = await getAllPosts(locale)
  return posts.find((p) => p.file === post.file) || null
}

// Map of localized blog paths to their counterpart in the other locale,
// e.g. '/en/blog/my-post' -> '/fr/blog/mon-article' (and vice versa).
// Used by the language switcher.
export async function getBlogPathMap(): Promise<Record<string, string>> {
  const [en, fr] = await Promise.all(locales.map((locale) => getAllPosts(locale)))
  const map: Record<string, string> = {}
  for (const enPost of en) {
    const frPost = fr.find((p) => p.file === enPost.file)
    if (frPost) {
      map[`/en/blog/${enPost.slug}`] = `/fr/blog/${frPost.slug}`
      map[`/fr/blog/${frPost.slug}`] = `/en/blog/${enPost.slug}`
    }
  }
  return map
}
