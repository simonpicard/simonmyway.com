import Image from 'next/image'
import Link from 'next/link'
import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'About - Simon Myway',
  description: 'AI builder, entrepreneur and trail runner. Discover my work, writing and how we can collaborate.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHeader>
        <h1 className="text-dark-primary text-3xl font-bold">Hi, I&apos;m Simon</h1>
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
          <li><strong>End-to-end generative-AI features</strong> – model research, evaluation and deployment to a live SaaS.</li>
          <li><strong>Predictive &amp; prescriptive analytics</strong> for pricing, demand forecasting and optimisation.</li>
          <li><strong>Fractional CTO / Head-of-AI</strong> – strategy, roadmap, hiring and team coaching.</li>
          <li><strong>MLOps &amp; cloud architecture</strong> – CI/CD, experiment tracking and data pipelines that scale.</li>
          <li><strong>Executive advisory &amp; technical due-diligence</strong> – translating AI talk into board-level action plans.</li>
          <li><strong>Academic-grade R&amp;D</strong> in real-time systems and formal verification.</li>
        </ul>

        <p className="mt-4">
          If that resonates, <a href="mailto:simon@ourway.be" className="underline">drop me an email</a> or say hi on&nbsp;
          <a href="https://www.linkedin.com/in/picard-simon/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>.
        </p>

        <h2 className="mt-8 text-dark-primary text-2xl font-bold">Stay in touch</h2>

        <ul className="list-disc pl-5">
          <li>
            <a href="mailto:simon@ourway.be" className="underline hover:text-blue-300">Mail</a>
          </li>
          <li>
            <a href="http://eepurl.com/h2ICR1" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              Newsletter
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
          <Link href="/">Return to homepage</Link>
        </div>
      </PageContent>
    </main>
  )
} 
