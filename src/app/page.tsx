import Link from 'next/link';
import PageContent from '@/components/PageContent';
import PageHeader from '@/components/PageHeader';
import { formatDate } from '@/lib/utils';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getAllPosts();
  
  // Format dates on the server side and sort by date in descending order
  const formattedPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => ({
      ...post,
      formattedDate: formatDate(post.date)
    }));

  return (
    <main>
      <PageHeader>
        <p className="font-bold">
          Hi, and welcome! While on my way, I am happy to share some of my thoughts with you - Simon
        </p>
      </PageHeader>
      <PageContent>
        <div className="flex flex-col gap-2">
          {formattedPosts.map((post) => (
            <div key={post.slug} className="flex flex-col sm:flex-row sm:items-start justify-between">
              <Link 
                href={`/blog/${post.slug}`} 
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
