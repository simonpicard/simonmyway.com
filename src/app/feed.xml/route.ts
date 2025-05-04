import { NextResponse } from 'next/server'
import { convertMarkdownToHtml } from '@/lib/markdown'
import { getAllPosts } from '@/lib/posts'

const BASE_URL = 'https://simonmyway.com'

export async function GET() {
  const posts = await getAllPosts()
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <title>Simon Myway</title>
  <subtitle>Personal website of Simon Myway</subtitle>
  <link href="${BASE_URL}" />
  <link href="${BASE_URL}/feed.xml" rel="self" type="application/atom+xml" />
  <id>${BASE_URL}</id>
  <updated>${new Date().toUTCString()}</updated>
  ${posts.map(post => {
    const htmlContent = convertMarkdownToHtml(post.content)
    const postUrl = `${BASE_URL}/blog/${post.slug}`
    return `
    <entry>
      <title>${post.title}</title>
      <content type="html">${htmlContent}</content>
      <link href="${postUrl}" />
      <id>${postUrl}</id>
      <published>${new Date(post.date).toISOString()}</published>
      <updated>${new Date(post.date).toISOString()}</updated>
      <author>
        <name>Simon Myway</name>
      </author>
    </entry>
  `}).join('')}
</feed>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
} 
