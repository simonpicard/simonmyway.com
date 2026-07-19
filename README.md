# simonmyway.com

Personal website and blog of Simon — [simonmyway.com](https://simonmyway.com).
A bilingual (English / French) blog with videos, RSS feeds, and an automated
newsletter.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router) + **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — dark theme only
- **[Plausible](https://plausible.io/)** analytics, self-proxied under neutral
  paths to survive ad blockers
- **[Mailchimp](https://mailchimp.com/)** newsletter, dispatched by a daily
  GitHub Actions workflow
- **Python 3.11** (managed with **[uv](https://docs.astral.sh/uv/)**) for the
  newsletter scripts
- Deployed on **[Vercel](https://vercel.com/)**

## Getting started

Requires **Node.js 22+** and **npm**.

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build (also type-checks)
npm run lint         # ESLint (flat config)
```

The site works without any environment variables — the videos page just renders
empty until the YouTube variables below are set.

### Environment variables

Create a `.env.local` (git-ignored). None are committed to the repo.

| Variable | Used for |
|---|---|
| `YOUTUBE_CHANNEL_ID` | Fetching the videos list |
| `YOUTUBE_API_KEY` | YouTube Data API key |
| `MAILCHIMP_API_KEY` | Newsletter dispatch (CI only) |
| `MAILCHIMP_LIST_ID` | Target audience (CI only) |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp datacenter, e.g. `us1` (CI only) |
| `MAILCHIMP_LANGUAGE_MERGE_TAG` | Optional; language merge field, defaults to `LANGUAGE` |

The Mailchimp variables are only needed by the GitHub Actions workflow and are
stored as repository secrets.

## Internationalization

Every page lives under `src/app/[locale]/` (`en` and `fr`). The root path `/`
negotiates the language (cookie, then `Accept-Language`) via `src/proxy.ts`;
legacy unprefixed URLs permanently redirect to `/en/...`. UI strings live in
`src/lib/i18n.ts`. `hreflang` alternates are emitted on every page and in the
sitemap.

## Content

Blog posts are markdown files under `content/posts/en/` and `content/posts/fr/`,
named `YYYY-MM-DD-title.md`. A post and its translation **share the same
filename** — that filename links the two versions (for the language switcher and
`hreflang`). A post with no French file simply doesn't appear on the French
site.

- The title comes from frontmatter `title`, or the first `# heading`.
- The URL slug is derived from the localized title (accents are transliterated),
  so French posts get French slugs.
- The first image (or frontmatter `img`) is used as the social/OG image.

RSS/Atom feeds are served per language at `/en/feed.xml` and `/fr/feed.xml`.

## Newsletter automation

`.github/workflows/newsletter.yml` runs daily at 10:00 CET:

1. `scripts/check_feed.py` reads both live feeds and finds entries published
   the previous day, tagged by language.
2. `scripts/send_newsletter.py` creates and sends a Mailchimp campaign per new
   entry, targeting subscribers by language via the `LANGUAGE` merge field
   (`fr` → French campaign, everyone else → English).

Run the scripts locally with uv:

```bash
uv sync
uv run scripts/check_feed.py
```

## Continuous integration

Two path-filtered workflows run on pushes to `master` and on pull requests:

- **`ci-web.yml`** (on web changes) — `npm run lint` and `npm run build`
- **`ci-python.yml`** (on `scripts/` changes) — `ruff check`, `ruff format --check`,
  and `ty check`

## Project structure

```
src/app/[locale]/     Localized routes (home, blog, about, videos, feed)
src/lib/              posts, i18n, videos, markdown helpers
src/components/       Shared UI components
src/proxy.ts          Root-path language negotiation
content/posts/{en,fr} Markdown blog posts
scripts/              Python newsletter automation (uv)
```

## License

No open-source license — the source is public for reference, but the content
(blog posts, images) and branding are © Simon. All rights reserved.
