import Image from 'next/image'
import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '@/lib/utils'
import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} - Simon Myway`,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      ...(post.img && {
        images: [{ url: post.img }],
      }),
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const formattedDate = formatDate(post.date)

  return (
    <main>
      <PageHeader>
        <h1 className="text-dark-primary text-3xl font-bold">{post.title}</h1>
      </PageHeader>
      <PageContent>
        <article className="prose prose-lg max-w-none prose-headings:text-dark-primary prose-p:text-dark-primary prose-strong:text-dark-primary prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:text-blue-300 prose-pre:bg-dark-canvas-subtle prose-pre:text-dark-primary prose-blockquote:text-dark-primary prose-blockquote:border-dark-border-default prose-hr:border-dark-border-default prose-li:text-dark-primary prose-ul:text-dark-primary prose-ol:text-dark-primary prose-table:text-dark-primary prose-th:text-dark-primary prose-td:text-dark-primary prose-th:border-dark-border-default prose-td:border-dark-border-default prose-img:mx-auto prose-img:rounded-lg prose-img:my-4 text-justify">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null, // Skip rendering the h1 in markdown
              code: ({className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <code className={`font-code ${className}`} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="font-code" {...props}>
                    {children}
                  </code>
                )
              },
              table: ({children, ...props}) => (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" {...props}>
                    {children}
                  </table>
                </div>
              ),
              img: ({src, alt}) => {
                if (!src || typeof src !== 'string') return null;
                return (
                    <Image
                      src={src}
                      alt={alt || ''}
                      className="mx-auto rounded-lg block my-4"
                      width={800}
                      height={400}
                    />
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
          <time dateTime={post.date} className="text-dark-secondary">
            {formattedDate}
          </time>
        </article>
      </PageContent>
    </main>
  )
} 
