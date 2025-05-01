import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About - Simon Myway',
  description: 'About the author.',
}

export default function AboutPage() {
  return (
    <main>
      <div className="px-5 py-4 border-b border-dark-border-default bg-dark-canvas-subtle">
        <h1 className="text-dark-primary text-3xl font-bold">About</h1>
      </div>
      
      <div className="px-5 py-4">
      <div className="px-5 py-4">
        <Image
          src={`/img/simonmyway.gif?${new Date().getTime()}`}
          alt="Simon Myway animated logo"
          width={800}
          height={400}
          className="rounded-lg mx-auto"
          unoptimized={true}
          priority
        />
      </div>

      <div className="py-4">

      <p>
        Hi, I&apos;m Simon! I am currently living in Beglium, I like to create and share content :)
      </p>

      <p>
        Find out why and how I started this website on{' '}
        <Link href="/blog/i-have-been-coding-for-more-than-15-years-but-never-in-javascript" className="underline hover:font-bold">
          my very first blog post
        </Link>
        .
      </p>
      </div>
      <h2 className="text-dark-primary text-2xl font-bold">Get and keep in touch</h2>

      <ul className="list-disc pl-5">
        <li>
          <a href="mailto:me@simonmyway.com" className="underline hover:font-bold">Mail</a>
        </li>
        <li>
          <a href="http://eepurl.com/h2ICR1" target="_blank" rel="noopener noreferrer" className="underline hover:font-bold">
            Newsletter
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/picard-simon/" target="_blank" rel="noopener noreferrer" className="underline hover:font-bold">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/simonpicard" target="_blank" rel="noopener noreferrer" className="underline hover:font-bold">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@simonmyway" target="_blank" rel="noopener noreferrer" className="underline hover:font-bold">
            YouTube
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/simon.myway/" target="_blank" rel="noopener noreferrer" className="underline hover:font-bold">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://www.twitch.tv/simonmyway" target="_blank" rel="noopener noreferrer" className="underline hover:font-bold">
            Twitch
          </a>
        </li>
      </ul>
      </div>
    </main>
  )
} 
