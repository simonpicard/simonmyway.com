import './globals.css';

import type { Metadata, Viewport } from 'next';

import Link from 'next/link';
import PlausibleProvider from 'next-plausible';

export const viewport: Viewport = {
  themeColor: '#0d1117',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://simonmyway.com'),
  title: 'Simon Myway',
  description: 'Personal website of Simon Myway',
  authors: [{ name: 'Simon Myway' }],
  robots: 'all',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Simon Myway',
    title: 'Simon Myway',
    description: 'Personal website of Simon Myway',
    images: [
      {
        url: '/img/simonmyway-og.png',
        width: 1200,
        height: 630,
        alt: 'Simon Myway',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: 'Simon Myway',
    creator: 'Simon Myway',
    title: 'Simon Myway',
    description: 'Personal website of Simon Myway',
    images: ['/img/simonmyway-square.png'],
  },
  icons: {
    icon: [
      { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/img/favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="font-sans text-base leading-body text-dark-primary bg-dark-background text-rendering-optimizeLegibility">
        <PlausibleProvider domain="simonmyway.com" trackOutboundLinks trackFileDownloads>
          <div className="min-h-screen justify-center max-w-[800px] mx-auto p-1">
            <header className="w-full px-4 py-5">
              <nav>
                <ul className="flex flex-wrap justify-center gap-3">
                  <li className="w-full text-center mb-2 sm:mb-0 sm:w-auto">
                    <Link href="/" className="font-bold no-underline">Simon Myway</Link>
                  </li>
                  <li className="hidden sm:block">
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <Link href="/" className="no-underline hidden sm:block">Blog</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary  hidden sm:block">|</span>
                  </li>
                  <li>
                    <Link href="/videos" className="no-underline">Videos</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <Link href="/about" className="no-underline">About</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <a href="/pdf/resume_picard_simon.pdf" target="_blank" rel="noopener noreferrer" className="no-underline">Resume</a>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <a href="https://eepurl.com/h2ICR1" target="_blank" rel="noopener noreferrer" className="no-underline">Newsletter</a>
                  </li>
                </ul>
              </nav>
            </header>
            <main className="flex-1">
              <div className="bg-dark-background border border-dark-border-default rounded-md">
                {children}
              </div>
              <footer className="px-5 py-5">
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3">
                    <a href="mailto:simon@ourway.be" className="no-underline">Mail</a>
                    <span className="hidden sm:inline text-dark-secondary">|</span>
                    <a href="https://www.linkedin.com/in/picard-simon/" className="no-underline">LinkedIn</a>
                    <span className="hidden sm:inline text-dark-secondary">|</span>
                    <a href="https://www.instagram.com/simon.myway/" className="no-underline">Instagram</a>
                    <span className="hidden sm:inline text-dark-secondary">|</span>
                    <a href="https://www.strava.com/athletes/44307339" className="no-underline">Strava</a>
                    <span className="hidden sm:inline text-dark-secondary">|</span>
                    <Link href="/feed.xml" className="no-underline">RSS</Link>
                  </div>
                </div>
              </footer>
            </main>
          </div>
        </PlausibleProvider>
      </body>
    </html>
  );
} 
