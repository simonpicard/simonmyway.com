export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en'
}

interface Dictionary {
  siteDescription: string
  ogLocale: string
  nav: {
    blog: string
    videos: string
    about: string
    resume: string
    newsletter: string
  }
  home: {
    intro: string
  }
  blog: {
    subscribe: string
    returnHome: string
  }
  videos: {
    title: string
    description: string
  }
  about: {
    title: string
    description: string
  }
  feed: {
    subtitle: string
  }
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    siteDescription: 'Personal website of Simon Myway',
    ogLocale: 'en_US',
    nav: {
      blog: 'Blog',
      videos: 'Videos',
      about: 'About',
      resume: 'Resume',
      newsletter: 'Newsletter',
    },
    home: {
      intro: 'Hi, and welcome! While on my way, I am happy to share some of my thoughts with you - Simon',
    },
    blog: {
      subscribe: 'Get future articles in your inbox',
      returnHome: 'Return to homepage',
    },
    videos: {
      title: 'Videos',
      description: 'A collection of my videos.',
    },
    about: {
      title: 'About',
      description: 'AI builder, entrepreneur and trail runner. Discover my work, writing and how we can collaborate.',
    },
    feed: {
      subtitle: 'Personal website of Simon Myway',
    },
  },
  fr: {
    siteDescription: 'Site personnel de Simon Myway',
    ogLocale: 'fr_BE',
    nav: {
      blog: 'Blog',
      videos: 'Vidéos',
      about: 'À propos',
      resume: 'CV',
      newsletter: 'Newsletter',
    },
    home: {
      intro: 'Salut, et bienvenue ! Chemin faisant, je partage ici quelques-unes de mes réflexions - Simon',
    },
    blog: {
      subscribe: 'Recevez les prochains articles par email',
      returnHome: "Retour à l'accueil",
    },
    videos: {
      title: 'Vidéos',
      description: 'Une collection de mes vidéos.',
    },
    about: {
      title: 'À propos',
      description: "Créateur d'IA, entrepreneur et traileur. Découvrez mon travail, mes écrits et comment nous pouvons collaborer.",
    },
    feed: {
      subtitle: 'Site personnel de Simon Myway',
    },
  },
}
