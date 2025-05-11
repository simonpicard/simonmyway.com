import Image from 'next/image'
import Link from 'next/link'
import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import { formatDate } from '@/lib/utils'
import { getAllVideos } from '@/lib/videos'

export const metadata = {
  title: 'Videos - Simon Myway',
  description: 'A collection of my videos.',
}

export default async function VideosPage() {
  const videos = await getAllVideos()

  return (
    <main>
      <PageHeader>
        <h1 className="text-dark-primary text-3xl font-bold">Videos</h1>
      </PageHeader>
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.video_id} className="bg-dark-canvas-subtle rounded-lg shadow-md overflow-hidden">
              <a
                href={`https://www.youtube.com/watch?v=${video.video_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: video.title }} />
                  <p className="text-dark-secondary text-sm mb-2">
                    <time dateTime={video.date}>{formatDate(video.date)}</time>
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/">Return to homepage</Link>
        </div>
      </PageContent>
    </main>
  )
} 
