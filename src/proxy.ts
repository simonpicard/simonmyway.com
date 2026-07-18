import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { Locale } from '@/lib/i18n'
import { defaultLocale, isLocale } from '@/lib/i18n'

// Language negotiation happens ONLY on the root entry point. Deep URLs
// (/en/..., /fr/...) are never auto-redirected — that would hurt SEO and
// prevent users from reading the other language.
export const config = { matcher: '/' }

// Pick the best supported locale from the Accept-Language header,
// honoring q-values, e.g. "fr-BE,fr;q=0.9,en;q=0.8" -> "fr".
function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale
  const prefs = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      return {
        lang: tag.trim().toLowerCase().split('-')[0],
        q: q ? parseFloat(q.slice(2)) || 0 : 1,
      }
    })
    .sort((a, b) => b.q - a.q)
  for (const { lang } of prefs) {
    if (isLocale(lang)) return lang
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  // An explicit choice (cookie set by the language switcher) always wins
  const cookie = request.cookies.get('NEXT_LOCALE')?.value
  const locale = cookie && isLocale(cookie)
    ? cookie
    : preferredLocale(request.headers.get('accept-language'))

  // Temporary redirect: never cached, so the negotiation runs on every visit
  return NextResponse.redirect(new URL(`/${locale}`, request.url), 307)
}
