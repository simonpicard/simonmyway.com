'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'

interface Props {
  locale: Locale
  // Localized blog paths mapped to their counterpart in the other locale
  blogPathMap: Record<string, string>
}

export default function LanguageSwitcher({ locale, blogPathMap }: Props) {
  const pathname = usePathname()

  const targetPath = (target: Locale): string => {
    if (target === locale) return pathname
    // Blog posts have translated slugs: use the map when available
    const mapped = blogPathMap[pathname]
    if (mapped) return mapped
    // Static pages share their path across locales: swap the prefix
    const rest = pathname.replace(/^\/(en|fr)/, '')
    // Untranslated blog posts fall back to the target locale's homepage
    if (rest.startsWith('/blog/')) return `/${target}`
    return `/${target}${rest}`
  }

  return (
    <span className="whitespace-nowrap">
      {locales.map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="text-dark-secondary"> / </span>}
          {l === locale ? (
            <span className="font-bold" aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <Link
              href={targetPath(l)}
              className="no-underline text-dark-secondary"
              rel="alternate"
              hrefLang={l}
              onClick={() => {
                // Remember the explicit choice: it overrides Accept-Language
                // negotiation on the root entry point (src/proxy.ts)
                document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; SameSite=Lax`
              }}
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  )
}
