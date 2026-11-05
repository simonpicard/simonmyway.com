import type { Nodes, Paragraph, Root, RootContent } from 'mdast'
import type { ImageSize } from '@/lib/images'

// Portrait photos in blog posts, placed like LaTeX floats.
//
// On wide screens, a portrait photo is shown as tall as a full-width 3:2 photo,
// floated right, with the surrounding text beside it. The photo never crosses a
// "barrier" (heading, landscape image, code block, table...). It stays where it
// is written if enough text follows it to fill its height; otherwise it moves up
// one block at a time, at most to the start of its zone, so the text before it
// fills the space. If the whole zone has too little text, the photo is shown
// alone, centered. The CSS lives in globals.css; the RSS feed is not affected.

// Wide-screen layout: the article is 750 px wide, so a 3:2 photo is 500 px tall.
const ARTICLE_WIDTH = 750
const PHOTO_HEIGHT = (ARTICLE_WIDTH * 2) / 3
// Space between the photo and the text (margin-left in globals.css).
const GAP = 24
// Characters of text per px² beside a photo, calibrated on rendered posts.
const CHARS_PER_PX2 = 0.0042

// width / height at or below which an image counts as portrait (2:3, 3:4, 9:16...).
const PORTRAIT_MAX_RATIO = 0.8
// Below this share of the text needed to fill the photo's height, show it alone.
const MIN_FILL = 0.5

export function isPortrait(size: ImageSize | undefined): size is ImageSize {
  return !!size && size.width / size.height <= PORTRAIT_MAX_RATIO
}

// Displayed width of a portrait photo on wide screens.
export function portraitWidth(size: ImageSize): number {
  return Math.round((PHOTO_HEIGHT * size.width) / size.height)
}

// Characters of text that fit beside the photo.
function textCapacity(size: ImageSize): number {
  return (ARTICLE_WIDTH - portraitWidth(size) - GAP) * PHOTO_HEIGHT * CHARS_PER_PX2
}

// The src of a paragraph that holds nothing but an image.
function imageSrc(node: RootContent): string | null {
  if (node.type !== 'paragraph') return null
  const children = node.children.filter((child) => !(child.type === 'text' && !child.value.trim()))
  return children.length === 1 && children[0].type === 'image' ? children[0].url : null
}

function textLength(node: Nodes): number {
  if ('children' in node) {
    let total = 0
    for (const child of node.children) total += textLength(child)
    return total
  }
  return 'value' in node ? node.value.length : 0
}

function sumText(nodes: RootContent[], from: number, to: number): number {
  let total = 0
  for (let i = from; i < to; i++) total += textLength(nodes[i])
  return total
}

function setClass(node: Paragraph, className: string, hName?: string) {
  node.data = { ...node.data, ...(hName && { hName }), hProperties: { className } }
}

export default function remarkPortraitPhotos({ sizes }: { sizes: Record<string, ImageSize> }) {
  const portraitSize = (node: RootContent): ImageSize | null => {
    const src = imageSrc(node)
    return src && isPortrait(sizes[src]) ? sizes[src] : null
  }
  const isFlow = (node: RootContent) =>
    (node.type === 'paragraph' && !imageSrc(node)) || node.type === 'list' || node.type === 'blockquote'

  // Places the portrait photos of one zone (text and photos between two barriers).
  const arrange = (zone: RootContent[]): RootContent[] => {
    const nodes = [...zone]
    let start = 0
    for (let i = 0; i < nodes.length; i++) {
      const size = portraitSize(nodes[i])
      if (!size) continue
      // A second photo in the same zone ends this photo's share of the text.
      let end = nodes.findIndex((node, k) => k > i && portraitSize(node))
      if (end === -1) end = nodes.length

      const capacity = textCapacity(size)
      if (sumText(nodes, start, end) < capacity * MIN_FILL) {
        setClass(nodes[i] as Paragraph, 'post-portrait post-portrait-alone', 'div')
        start = i + 1
        continue
      }

      let target = i
      let after = sumText(nodes, i + 1, end)
      while (target > start && after < capacity) {
        target--
        after += textLength(nodes[target])
      }
      const [photo] = nodes.splice(i, 1)
      nodes.splice(target, 0, photo)
      setClass(photo as Paragraph, 'post-portrait post-portrait-float', 'div')
      start = i + 1
    }
    return nodes
  }

  return (tree: Root) => {
    const children: RootContent[] = []
    let zone: RootContent[] = []
    for (const node of tree.children) {
      if (isFlow(node) || portraitSize(node)) {
        zone.push(node)
        continue
      }
      children.push(...arrange(zone))
      zone = []
      // Other images are full width: they must start below any floating photo.
      if (imageSrc(node)) setClass(node as Paragraph, 'post-clear')
      children.push(node)
    }
    children.push(...arrange(zone))
    tree.children = children
  }
}
