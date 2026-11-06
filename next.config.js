/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    // Legacy unprefixed URLs permanently redirect to the English version.
    // These must stay forever: external links to the old URLs will never be updated.
    // The root path is NOT listed here: src/proxy.ts negotiates the language
    // (cookie, then Accept-Language) and issues a temporary redirect instead.
    return [
      { source: '/blog/:slug', destination: '/en/blog/:slug', permanent: true },
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/videos', destination: '/en/videos', permanent: true },
      { source: '/feed.xml', destination: '/en/feed.xml', permanent: true },
      { source: '/api/feed.xml', destination: '/en/feed.xml', permanent: true },
    ]
  },
}

export default nextConfig
