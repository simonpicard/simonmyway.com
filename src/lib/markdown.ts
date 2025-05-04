import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const BASE_URL = 'https://simonmyway.com'

const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: true,
  breaks: false,
  xhtmlOut: true // This ensures proper XHTML output
})

// Add support for GitHub Flavored Markdown tables
md.enable('table')

// Convert relative URLs to absolute
function makeAbsoluteUrl(url: string): string {
  if (url.startsWith('http')) {
    return url
  }
  if (url.startsWith('/')) {
    return `${BASE_URL}${url}`
  }
  return `${BASE_URL}/${url}`
}

export function convertMarkdownToHtml(markdown: string): string {
  const { content } = matter(markdown)
  
  // Convert markdown to HTML
  let html = md.render(content)
  
  // Convert all relative URLs to absolute in the HTML
  html = html.replace(
    /(src|href)="([^"]+)"/g,
    (match, attr, url) => `${attr}="${makeAbsoluteUrl(url)}"`
  )
  
  return html
} 
