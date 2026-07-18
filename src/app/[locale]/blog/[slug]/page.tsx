import { cleanDescription, getPostBySlug, getTranslation } from '@/lib/posts'

import CodeBlockStyles from '@/components/CodeBlockStyles'
import CodeHighlight from '@/components/CodeHighlight'
import Image from 'next/image'
import Link from 'next/link'
import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import ReactMarkdown from 'react-markdown'
import { dictionaries, isLocale, otherLocale } from '@/lib/i18n'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'

type Props = {
  params: Promise<{ locale: string, slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = await getPostBySlug(locale, slug)
  if (!post) return {}

  const description = cleanDescription(post.content)
  const imageUrl = post.img?.startsWith('http') ? post.img : `https://simonmyway.com${post.img}`

  const translation = await getTranslation(post, otherLocale(locale))
  const languages: Record<string, string> = {
    [locale]: `/${locale}/blog/${post.slug}`,
  }
  if (translation) {
    languages[translation.locale] = `/${translation.locale}/blog/${translation.slug}`
  }
  const englishPath = languages['en'] ?? `/${locale}/blog/${post.slug}`

  return {
    title: `${post.title} - Simon Myway`,
    description,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        ...languages,
        'x-default': englishPath,
      },
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      locale: dictionaries[locale].ogLocale,
      publishedTime: post.date,
      authors: ['Simon Myway'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) {
    notFound()
  }
  const post = await getPostBySlug(locale, slug)

  if (!post) {
    notFound()
  }

  const t = dictionaries[locale]
  const formattedDate = formatDate(post.date, locale)

  return (
    <main>
      <PageHeader>
        <h1 className="text-dark-primary text-3xl font-bold">{post.title}</h1>
      </PageHeader>
      <PageContent>
        <article className="prose max-w-none prose-headings:text-dark-primary prose-p:text-dark-primary prose-strong:text-dark-primary prose-a:text-dark-primary prose-a:!underline prose-code:text-blue-300 prose-pre:bg-dark-canvas-subtle prose-pre:text-dark-primary prose-blockquote:text-dark-primary prose-blockquote:border-dark-border-default prose-hr:border-dark-border-default prose-li:text-dark-primary prose-ul:text-dark-primary prose-ol:text-dark-primary prose-table:text-dark-primary prose-th:text-dark-primary prose-td:text-dark-primary prose-th:border-dark-border-default prose-td:border-dark-border-default prose-img:mx-auto prose-img:rounded-lg prose-img:my-4">
          <CodeBlockStyles />
          <CodeHighlight />
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null, // Skip rendering the h1 in markdown
              code: ({ node, className, children, ...props }: { node?: any, className?: string, children?: React.ReactNode, [key: string]: any }) => {
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : 'text'
                const isInline = !className?.includes('language-')

                if (isInline) {
                  return (
                    <code className={`font-code ${className}`} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <div className="relative">
                    <pre className={`language-${language} ${className}`} {...props}>
                      <code className={`language-${language}`}>
                        {children}
                      </code>
                    </pre>
                  </div>
                )
              },
              table: ({ children, ...props }) => (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" {...props}>
                    {children}
                  </table>
                </div>
              ),
              img: (() => {
                let imgIndex = 0;
                const MarkdownImage = ({ src, alt }: { node?: any, src?: string | Blob, alt?: string, [key: string]: any }) => {
                  if (!src || typeof src !== 'string') return null;
                  const isFirst = imgIndex === 0;
                  imgIndex++;
                  return (
                    <Image
                      src={src}
                      alt={alt || ''}
                      className="mx-auto rounded-lg block my-4"
                      width={800}
                      height={400}
                      priority={isFirst}
                    />
                  );
                };
                return MarkdownImage;
              })()
            }}
          >
            {post.content}
          </ReactMarkdown>
          <time dateTime={post.date} className="text-dark-secondary">
            {formattedDate}
          </time>
          <div className="mt-4">
            <a href="https://eepurl.com/h2ICR1" target="_blank" rel="noopener noreferrer">
              {t.blog.subscribe}
            </a>
          </div>
          <div className="mt-4">
            <Link href={`/${locale}`}>{t.blog.returnHome}</Link>
          </div>
        </article>
      </PageContent>
    </main>
  )
}
