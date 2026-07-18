import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageContent from '@/components/PageContent';
import PageHeader from '@/components/PageHeader';
import { dictionaries, isLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { getAllPosts } from '@/lib/posts';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) {
    notFound()
  }
  const t = dictionaries[locale]
  const posts = await getAllPosts(locale);

  // Format dates on the server side and sort by date in descending order
  const formattedPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => ({
      ...post,
      formattedDate: formatDate(post.date, locale)
    }));

  return (
    <main>
      <PageHeader>
        <p className="font-bold">
          {t.home.intro}
        </p>
      </PageHeader>
      <PageContent>
        <div className="flex flex-col gap-2">
          {formattedPosts.map((post) => (
            <div key={post.slug} className="flex flex-col sm:flex-row sm:items-start justify-between">
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="font-medium decoration-skip-ink w-full sm:w-auto"
              >
                {post.title}
              </Link>
              <time
                dateTime={post.date}
                className="tabular-nums tracking-tight whitespace-pre hidden sm:inline text-dark-secondary"
              >
                {post.formattedDate}
              </time>
              <time
                dateTime={post.date}
                className="tabular-nums tracking-tight whitespace-pre sm:hidden text-dark-secondary"
              >
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '-')}
              </time>
            </div>
          ))}
        </div>
      </PageContent>
    </main>
  );
}
