// Plausible analytics is proxied same-origin under neutral paths so that
// ad/tracker blockers (which match on filenames like `script.*.js` and the
// `/api/event` path) don't strip it. The browser only ever sees the local
// paths below; Next rewrites them server-side to Plausible. The script's
// event endpoint is repointed to the local path via plausible.init({endpoint})
// in src/app/[locale]/layout.tsx. Keep these two paths in sync with that snippet.
const PLAUSIBLE_SCRIPT_PATH = '/e/js/e.js'
// No trailing slash: trailingSlash is false here, so a POST to /e/api/e/ would
// be 308'd to /e/api/e. Match the non-slash form everywhere.
const PLAUSIBLE_EVENT_PATH = '/e/api/e'
// Per-site modern Plausible script (domain is baked into the pa-<id> name).
const PLAUSIBLE_SCRIPT_REMOTE = 'https://plausible.io/js/pa-KuFkJUG0ZmzkcUQDflPgA.js'
const PLAUSIBLE_EVENT_REMOTE = 'https://plausible.io/api/event'

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
  async rewrites() {
    // beforeFiles so the proxy runs before page/filesystem routes.
    return {
      beforeFiles: [
        { source: PLAUSIBLE_SCRIPT_PATH, destination: PLAUSIBLE_SCRIPT_REMOTE },
        { source: PLAUSIBLE_EVENT_PATH, destination: PLAUSIBLE_EVENT_REMOTE },
      ],
    }
  },
}

export default nextConfig
