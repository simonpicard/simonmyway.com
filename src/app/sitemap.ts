import type { MetadataRoute } from 'next'
import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'
import { getAllPosts } from '@/lib/posts'

const BASE_URL = 'https://simonmyway.com'

const staticPaths: { path: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/videos', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const postsByLocale = Object.fromEntries(
        await Promise.all(locales.map(async (locale) => [locale, await getAllPosts(locale)] as const))
    ) as Record<Locale, Awaited<ReturnType<typeof getAllPosts>>>

    // Static pages exist in every locale, cross-linked via hreflang alternates
    const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        staticPaths.map(({ path, changeFrequency, priority }) => ({
            url: `${BASE_URL}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
            alternates: {
                languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])),
            },
        }))
    )

    // Blog posts, cross-linked when a translation exists (matched by filename)
    const postUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        postsByLocale[locale].map((post) => {
            const languages: Record<string, string> = {}
            for (const l of locales) {
                const counterpart = postsByLocale[l].find((p) => p.file === post.file)
                if (counterpart) {
                    languages[l] = `${BASE_URL}/${l}/blog/${counterpart.slug}`
                }
            }
            return {
                url: `${BASE_URL}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'yearly' as const,
                priority: 0.8,
                alternates: { languages },
            }
        })
    )

    return [...staticPages, ...postUrls]
}
