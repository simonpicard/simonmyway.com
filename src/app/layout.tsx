import './globals.css';

import type { Metadata, Viewport } from 'next';

import Link from 'next/link';

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
      <head>
        <script
          defer
          data-domain="simonmyway.com"
          src="https://plausible.io/js/plausible.compat.outbound-links.file-downloads.js"
        />
      </head>
      <body className="font-base text-base leading-body text-dark-secondary bg-dark-background text-rendering-optimizeLegibility">
        <div className="min-h-screen justify-center max-w-[800px] mx-auto">
            <header className="w-full px-4 py-5">
              <nav>
                <ul className="flex flex-wrap justify-center gap-3">
                  <li>
                    <Link href="/" className="no-underline hover:underline font-bold">Simon Myway</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <Link href="/" className="no-underline hover:underline">Blog</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <Link href="/videos" className="no-underline hover:underline">Videos</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <Link href="/about" className="no-underline hover:underline">About</Link>
                  </li>
                  <li>
                    <span className="text-dark-secondary">|</span>
                  </li>
                  <li>
                    <a href="/pdf/cv_picard_simon.pdf" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">Resume</a>
                  </li>
                </ul>
              </nav>
            </header>
            <main className="flex-1">
                <div className="bg-dark-background border border-dark-border-default rounded-box">
                  {children}
                </div>
              <footer className="px-5 py-5">
                <div className="text-center">
                  <p className="flex flex-wrap justify-center gap-3">
                    <a href="mailto:simon@ourway.be" className="no-underline hover:underline">Mail</a>
                    <span className="text-dark-secondary">|</span>
                    <a href="https://www.linkedin.com/in/picard-simon/" className="no-underline hover:underline">LinkedIn</a>
                    <span className="text-dark-secondary">|</span>
                    <a href="https://github.com/simonpicard" className="no-underline hover:underline">GitHub</a>
                    <span className="text-dark-secondary">|</span>
                    <a href="https://www.youtube.com/@simonmyway" className="no-underline hover:underline">YouTube</a>
                    <span className="text-dark-secondary">|</span>
                    <a href="https://www.instagram.com/simon.myway/" className="no-underline hover:underline">Instagram</a>
                    <span className="text-dark-secondary">|</span>
                    <a href="https://www.twitch.tv/simonmyway" className="no-underline hover:underline">Twitch</a>
                  </p>
                </div>
              </footer>
            </main>
          </div>
      </body>
    </html>
  );
} 
