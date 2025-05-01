import Link from 'next/link';
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
      <p className="px-5 py-4 border-b border-dark-border-default bg-dark-canvas-subtle font-bold">
        Hi, and welcome! While on my way, I am happy to share some of my thoughts with you - Simon
      </p>
      <div className="flex flex-col gap-2 px-5 py-4">
        {formattedPosts.map((post) => (
          <div key={post.slug} className="flex items-center justify-between">
            <Link 
              href={`/blog/${post.slug}`} 
              className="font-medium hover:underline no-underline decoration-skip-ink"
            >
              {post.title}
            </Link>
            <time 
              dateTime={post.date} 
              className="tabular-nums tracking-tight whitespace-pre"
            >
              {post.formattedDate}
            </time>
          </div>
        ))}
      </div>
    </main>
  );
} 
