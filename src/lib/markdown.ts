import { AtRule, Comment, Declaration, Rule, parse } from 'css'

import MarkdownIt from 'markdown-it'
import fs from 'fs'
import hljs from 'highlight.js'
import matter from 'gray-matter'
import path from 'path'

const BASE_URL = 'https://simonmyway.com'

// Load the GitHub Dark theme CSS
const hljsTheme = fs.readFileSync(
  path.join(process.cwd(), 'src/styles/github-dark.css'),
  'utf-8'
)

// Convert CSS to inline styles
function convertCssToInlineStyles(html: string): string {
  // Create a map of class names to styles
  const classStyles = new Map<string, string>()
  
  // Parse the CSS
  const { stylesheet } = parse(hljsTheme)
  
  if (stylesheet?.rules) {
    stylesheet.rules.forEach((rule: Rule | Comment | AtRule) => {
      if (rule.type === 'rule' && 'selectors' in rule && rule.selectors) {
        rule.selectors.forEach((selector: string) => {
          if (selector.startsWith('.hljs')) {
            const className = selector.replace('.', '')
            const declarations = rule.declarations
              ?.filter((d: Declaration | Comment): d is Declaration => d.type === 'declaration')
              .map((d: Declaration) => `${d.property}: ${d.value}`)
              .join('; ')
            if (declarations) {
              classStyles.set(className, declarations)
            }
          }
        })
      }
    })
  }

  // Replace class names with inline styles
  return html.replace(/class="([^"]+)"/g, (match, classes) => {
    const style = classes.split(' ')
      .map((cls: string) => classStyles.get(cls))
      .filter(Boolean)
      .join('; ')
    return `style="${style}"`
  })
}

const md = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: true,
  breaks: false,
  xhtmlOut: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
      } catch (__) {}
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
  }
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
  
  // Convert highlight.js classes to inline styles
  html = convertCssToInlineStyles(html)
  
  // Convert all relative URLs to absolute in the HTML
  html = html.replace(
    /(src|href)="([^"]+)"/g,
    (match: string, attr: string, url: string) => `${attr}="${makeAbsoluteUrl(url)}"`
  )

  // Add responsive styles to images
  html = html.replace(
    /<img([^>]+)\/>/g,
    (match: string, attributes: string) => `<img${attributes} style="max-width: 100%; height: auto; display: block; margin: 1em auto;" />`
  )
  
  return html
} 
