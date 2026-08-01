import { CanvasTexture, LinearFilter, SRGBColorSpace, type Texture } from 'three'

/** Texture edge in device pixels. Generous, because the hub is the one thing a
 * viewer zooms into, and a sprite has no vector fallback once it is rasterised. */
const SIZE = 512

/**
 * The datalith mark drawn to a canvas, for use as the hub's sprite texture.
 *
 * It is the same geometry the DS Logo renders — three streams converging into
 * one blue line, on the 28×20 viewBox — reproduced here rather than imported,
 * because that component emits SVG for the DOM and this needs pixels for WebGL.
 * `src/components/Logo.tsx` is the source of truth for the shape; the paths
 * below are copied from it verbatim and the strokes match `.dl-logo-stream`
 * and `.dl-logo-merge` in `src/styles.css`.
 *
 * Deterministic and dependency-free: no image is fetched, so the hub cannot
 * flash empty while a file loads, and nothing here needs a network or a build
 * step to resolve an asset URL.
 */
export const drawLogoTexture = (
  accent = '#0031E3',
  disc = '#101013',
  mark = '#FFFFFF',
): Texture | null => {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // The badge: an ink disc the mark is knocked out of, so the hub still reads as
  // a node in the graph rather than as a logo pasted over one.
  ctx.fillStyle = disc
  ctx.beginPath()
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 2, 0, Math.PI * 2)
  ctx.fill()

  // Map the 28×20 viewBox into the middle of the disc.
  const scale = SIZE / 28 * 0.62
  ctx.save()
  ctx.translate(SIZE / 2 - (28 * scale) / 2, SIZE / 2 - (20 * scale) / 2)
  ctx.scale(scale, scale)
  ctx.lineCap = 'butt'

  ctx.strokeStyle = mark
  ctx.lineWidth = 1.4
  ctx.beginPath()
  ctx.moveTo(0, 3)
  ctx.bezierCurveTo(8, 3, 10, 10, 16, 10)
  ctx.moveTo(0, 10)
  ctx.lineTo(16, 10)
  ctx.moveTo(0, 17)
  ctx.bezierCurveTo(8, 17, 10, 10, 16, 10)
  ctx.stroke()

  // The merged line keeps the accent even on ink, exactly as the DS logo does.
  ctx.strokeStyle = accent
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(16, 10)
  ctx.lineTo(28, 10)
  ctx.stroke()
  ctx.restore()

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  // Linear rather than mipmapped: the sprite is only ever seen close to its own
  // resolution, and mipmaps would soften the 1.4px strokes into mush.
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.needsUpdate = true
  return texture
}
