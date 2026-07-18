import type { Locale } from '@/lib/i18n'

const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-BE',
}

export function formatDate(dateString: string, locale: Locale = 'en') {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
