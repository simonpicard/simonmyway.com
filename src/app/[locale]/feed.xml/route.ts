import { cleanDescription, getAllPosts } from '@/lib/posts'

import { NextResponse } from 'next/server'
import { convertMarkdownToHtml } from '@/lib/markdown'
import { dictionaries, isLocale, locales } from '@/lib/i18n'

const BASE_URL = 'https://simonmyway.com'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params
  if (!isLocale(locale)) {
    return new NextResponse('Not found', { status: 404 })
  }
  const t = dictionaries[locale]
  const posts = await getAllPosts(locale)

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xml:lang="${locale}">
  <title>Simon Myway</title>
  <subtitle>${t.feed.subtitle}</subtitle>
  <link href="${BASE_URL}/${locale}" />
  <link href="${BASE_URL}/${locale}/feed.xml" rel="self" type="application/atom+xml" />
  <id>${BASE_URL}/${locale}</id>
  <updated>${new Date().toUTCString()}</updated>
  ${posts.map(post => {
    const htmlContent = convertMarkdownToHtml(post.content)
    const summary = cleanDescription(post.content, 300)
    const postUrl = `${BASE_URL}/${locale}/blog/${post.slug}`
    return `
    <entry>
      <title>${post.title}</title>
      <content type="html">${htmlContent}</content>
      <summary type="text">${summary}</summary>
      <link href="${postUrl}" rel="alternate"/>
      <id>${postUrl}</id>
      <published>${new Date(post.date).toISOString()}</published>
      <updated>${new Date(post.date).toISOString()}</updated>
      <category term="blog"/>
      <author>
        <name>Simon Myway</name>
        <email>simon@ourway.be</email>
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
