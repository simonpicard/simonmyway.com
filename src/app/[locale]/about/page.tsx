import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import type { Locale } from '@/lib/i18n'
import { dictionaries, isLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = dictionaries[locale]
  return {
    title: `${t.about.title} - Simon Myway`,
    description: t.about.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        fr: '/fr/about',
        'x-default': '/en/about',
      },
    },
  }
}

function AboutContentEn() {
  return (
    <>
      <p>
        I&apos;m a Belgian computer scientist who likes to create and share content about my journey. When I&apos;m not coding, you&apos;ll find me chasing vert on mountain trails or testing yet-another training plan (CrossFit / HYROX experiments incoming).
      </p>

      <p>
        On this blog I unpack my experiences in (gen) AI and entrepreneurship, share the business lessons that fall out along the way, and sprinkle in long-run stories for good measure.
      </p>

      <h2 className="mt-8 text-dark-primary text-2xl font-bold">How I can help</h2>
      <p>
        My career spans top-tier consulting, entrepreneurship and research, all fuelled by a desire for building things that matter. Armed with dual Master&apos;s degrees in Computer&nbsp;Science and Management, I blend deep technical expertise with business acumen to unlock AI opportunities that stick.
      </p>
      <p className="mt-2">
        I cut my teeth at <strong>McKinsey&nbsp;&amp;&nbsp;Company</strong> after winning their global hackathon, progressing to Project Leader and driving machine-learning programs in banking, healthcare, pharma, chemicals and basic materials across Europe, and Northern America.
      </p>
      <p className="mt-2">
        I&apos;ve also thrived in the startup trenches, taking on CTO-level roles in early-stage teams and completing the <strong>Entrepreneur&nbsp;First London</strong> programme, designing data products, guiding cross-functional teams and shipping fast.
      </p>
      <p className="mt-2">
        Since&nbsp;2023 I&apos;ve consulted independently on generative&nbsp;AI and data science, taking ideas from research notes to revenue-generating SaaS features. I&apos;ve also published peer-reviewed work on real-time systems, keeping one foot in academia.
      </p>
      <p className="mt-4 font-semibold">Typical ways I help clients:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>End-to-end generative-AI features</strong> - model research, evaluation and deployment to a live SaaS.</li>
        <li><strong>Predictive &amp; prescriptive analytics</strong> for pricing, demand forecasting and optimisation.</li>
        <li><strong>Fractional CTO / Head-of-AI</strong> - strategy, roadmap, hiring and team coaching.</li>
        <li><strong>MLOps &amp; cloud architecture</strong> - CI/CD, experiment tracking and data pipelines that scale.</li>
        <li><strong>Executive advisory &amp; technical due-diligence</strong> - translating AI talk into board-level action plans.</li>
      </ul>

      <p className="mt-4">
        If that resonates, <a href="mailto:simon@ourway.be" className="underline">drop me an email</a> or say hi on&nbsp;
        <a href="https://www.linkedin.com/in/picard-simon/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>.
      </p>

      <h2 className="mt-8 text-dark-primary text-2xl font-bold">Stay in touch</h2>
    </>
  )
}

function AboutContentFr() {
  return (
    <>
      <p>
        Je suis un informaticien belge qui aime créer et partager du contenu autour de son parcours. Quand je ne code pas, vous me trouverez à chasser du dénivelé sur les sentiers de montagne ou à tester encore-un-nouveau plan d&apos;entraînement (expérimentations CrossFit / HYROX à venir).
      </p>

      <p>
        Sur ce blog, je décortique mes expériences en IA (générative) et en entrepreneuriat, je partage les leçons business qui en découlent, et j&apos;y glisse quelques récits de sorties longues pour faire bonne mesure.
      </p>

      <h2 className="mt-8 text-dark-primary text-2xl font-bold">Comment je peux aider</h2>
      <p>
        Ma carrière traverse le conseil de premier plan, l&apos;entrepreneuriat et la recherche, portée par l&apos;envie de construire des choses qui comptent. Fort d&apos;un double Master en Informatique et en Management, je combine expertise technique pointue et sens des affaires pour débloquer des opportunités IA qui durent.
      </p>
      <p className="mt-2">
        J&apos;ai fait mes armes chez <strong>McKinsey&nbsp;&amp;&nbsp;Company</strong> après avoir remporté leur hackathon mondial, progressant jusqu&apos;à Project Leader et pilotant des programmes de machine learning dans la banque, la santé, la pharma, la chimie et les matériaux de base, en Europe et en Amérique du Nord.
      </p>
      <p className="mt-2">
        Je me suis aussi épanoui dans les tranchées des startups, en assumant des rôles de niveau CTO dans des équipes early-stage et en complétant le programme <strong>Entrepreneur&nbsp;First London</strong> : conception de produits data, encadrement d&apos;équipes transverses et livraison rapide.
      </p>
      <p className="mt-2">
        Depuis&nbsp;2023, je suis consultant indépendant en IA générative et data science, menant des idées du stade de notes de recherche jusqu&apos;à des fonctionnalités SaaS génératrices de revenus. J&apos;ai aussi publié des travaux évalués par les pairs sur les systèmes temps réel, gardant un pied dans le monde académique.
      </p>
      <p className="mt-4 font-semibold">Comment j&apos;aide typiquement mes clients :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Fonctionnalités d&apos;IA générative de bout en bout</strong> - recherche de modèles, évaluation et déploiement sur un SaaS en production.</li>
        <li><strong>Analytique prédictive &amp; prescriptive</strong> pour le pricing, la prévision de la demande et l&apos;optimisation.</li>
        <li><strong>CTO / Head-of-AI à temps partagé</strong> - stratégie, roadmap, recrutement et coaching d&apos;équipe.</li>
        <li><strong>MLOps &amp; architecture cloud</strong> - CI/CD, suivi d&apos;expérimentations et pipelines de données qui passent à l&apos;échelle.</li>
        <li><strong>Conseil aux dirigeants &amp; due diligence technique</strong> - traduire le discours IA en plans d&apos;action pour le conseil d&apos;administration.</li>
      </ul>

      <p className="mt-4">
        Si cela vous parle, <a href="mailto:simon@ourway.be" className="underline">envoyez-moi un email</a> ou dites bonjour sur&nbsp;
        <a href="https://www.linkedin.com/in/picard-simon/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>.
      </p>

      <h2 className="mt-8 text-dark-primary text-2xl font-bold">Restons en contact</h2>
    </>
  )
}

const headings: Record<Locale, string> = {
  en: "Hi, I'm Simon",
  fr: 'Salut, moi c’est Simon',
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) {
    notFound()
  }
  const t = dictionaries[locale]

  return (
    <main>
      <PageHeader>
        <h1 className="text-dark-primary text-3xl font-bold">{headings[locale]}</h1>
      </PageHeader>

      <PageContent>
        <Image
          src={`/img/simonmyway.gif?${new Date().getTime()}`}
          alt="Simon Myway animated logo"
          width={600}
          height={387}
          className="rounded-lg mx-auto"
          unoptimized={true}
          priority
        />

        {locale === 'fr' ? <AboutContentFr /> : <AboutContentEn />}

        <ul className="list-disc pl-5">
          <li>
            <a href="mailto:simon@ourway.be" className="underline hover:text-blue-300">Mail</a>
          </li>
          <li>
            <a href="http://eepurl.com/h2ICR1" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              {t.nav.newsletter}
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/picard-simon/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/simon.myway/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.strava.com/athletes/44307339" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              Strava
            </a>
          </li>
          <li>
            <a href="https://github.com/simonpicard" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@simonmyway" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              YouTube
            </a>
          </li>
          <li>
            <a href="https://www.twitch.tv/simonmyway" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              Twitch
            </a>
          </li>
        </ul>
        <div className="mt-4">
          <Link href={`/${locale}`}>{t.blog.returnHome}</Link>
        </div>
      </PageContent>
    </main>
  )
}
