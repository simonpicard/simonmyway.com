import path from 'path'
import sharp from 'sharp'

export type ImageSize = { width: number, height: number }

const cache = new Map<string, Promise<ImageSize | null>>()

// Reads the displayed size of an image under public/, EXIF rotation included.
// Returns null for remote or unreadable images: they keep the default layout.
function readImageSize(src: string): Promise<ImageSize | null> {
  let size = cache.get(src)
  if (!size) {
    size = (async () => {
      if (!src.startsWith('/')) return null
      try {
        const file = path.join(process.cwd(), 'public', decodeURI(src))
        const { width, height, orientation } = await sharp(file).metadata()
        if (!width || !height) return null
        // EXIF orientations 5 to 8 rotate the image by 90°.
        return orientation && orientation >= 5 ? { width: height, height: width } : { width, height }
      } catch {
        return null
      }
    })()
    cache.set(src, size)
  }
  return size
}

// Sizes of every image referenced in a markdown document, keyed by src.
export async function getImageSizes(markdown: string): Promise<Record<string, ImageSize>> {
  const matches = Array.from(markdown.matchAll(/!\[[^\]]*\]\(\s*<?([^\s)>]+)/g))
  const srcs = Array.from(new Set(matches.map((match) => match[1])))
  const sizes: Record<string, ImageSize> = {}
  await Promise.all(srcs.map(async (src) => {
    const size = await readImageSize(src)
    if (size) sizes[src] = size
  }))
  return sizes
}
