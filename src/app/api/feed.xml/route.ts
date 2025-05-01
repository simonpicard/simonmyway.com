import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Generate RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Simon Myway</title>
    <link>https://simonmyway.com</link>
    <description>Personal website of Simon Myway</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-us</language>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 
