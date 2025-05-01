import axios from 'axios'
import fs from 'fs'
import path from 'path'

const ONE_DAY = 24 * 60 * 60 * 1000 // ms
const videosPath = path.join(process.cwd(), 'content', 'videos.json')

export interface Video {
  title: string
  description: string
  date: string // Store as ISO string
  thumbnail: string
  video_id: string
}

interface CachedVideos {
  dt: number
  data: Video[]
}

async function getVideosFromYouTubeAPI(): Promise<Video[]> {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&channelId=${process.env.YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}&order=viewCount&type=video`
    )

    return response.data.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      date: item.snippet.publishedAt, // Keep as ISO string
      thumbnail: item.snippet.thumbnails.medium.url,
      video_id: item.id.videoId,
    }))
  } catch (error) {
    console.error('Error fetching videos from YouTube API:', error)
    return []
  }
}

async function getVideosFromFile(): Promise<CachedVideos> {
  try {
    const fileContent = await fs.promises.readFile(videosPath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist or is corrupted, return empty data
    return { dt: Date.now(), data: [] }
  }
}

async function saveVideosToFile(videos: Video[]): Promise<boolean> {
  try {
    const data: CachedVideos = {
      dt: Date.now(),
      data: videos,
    }
    await fs.promises.writeFile(videosPath, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving videos to file:', error)
    return false
  }
}

export async function refreshVideos(): Promise<Video[]> {
  const videos = await getVideosFromYouTubeAPI()
  await saveVideosToFile(videos)
  return videos
}

export async function getAllVideos(): Promise<Video[]> {
  try {
    const cachedVideos = await getVideosFromFile()
    
    // If cache is older than one day, refresh it
    if (Date.now() - cachedVideos.dt >= ONE_DAY || cachedVideos.data.length === 0) {
      const refreshedVideos = await refreshVideos()
      return refreshedVideos
    }
    
    return cachedVideos.data
  } catch (error) {
    console.error('Error getting videos:', error)
    return []
  }
} 
