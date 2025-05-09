import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllVideos } from '@/lib/videos';

const BASE_URL = 'https://simonmyway.com';

export async function GET() {
  const posts = await getAllPosts();
  const videos = await getAllVideos();

  // Create URLs for static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${BASE_URL}/videos`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${BASE_URL}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9'
    }
  ];

  // Create URLs for blog posts
  const postUrls = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'yearly',
    priority: '0.8'
  }));

  // Combine all URLs
  const allUrls = [...staticPages, ...postUrls];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 
