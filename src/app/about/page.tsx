import Image from 'next/image'
import Link from 'next/link'
import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'About - Simon Myway',
  description: 'About the author.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHeader>
        <h1 className="text-dark-primary text-3xl font-bold">About</h1>
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
          Hi, I&apos;m Simon! I am currently living in Beglium, I like to create and share content :)
        </p>

        <p>
          Find out why and how I started this website on{' '}
          <Link href="/blog/i-have-been-coding-for-more-than-15-years-but-never-in-javascript" className="!underline">
            my very first blog post
          </Link>
          .
        </p>

        <br />
        <h2 className="text-dark-primary text-2xl font-bold">Get and keep in touch</h2>

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
            <a href="https://www.instagram.com/simon.myway/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
              Instagram
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
