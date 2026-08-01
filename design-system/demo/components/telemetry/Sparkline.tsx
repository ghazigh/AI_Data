/** Tone drives colour only — never the sole carrier of meaning, since every row
 * that shows a sparkline also states its outcome in text. */
export type SparkTone = 'ok' | 'run' | 'fail' | 'idle'

export interface SparklineProps {
  /** Oldest run first. Fewer than two points renders the empty rule. */
  points: number[]
  tone?: SparkTone
  width?: number
  height?: number
  /** Marks the most recent run. Only meaningful while something is running or has just failed. */
  dot?: boolean
  /** Read out to assistive tech in place of the drawing. */
  label: string
}

/**
 * Maps values onto an SVG polyline, normalised over the series' own range so a
 * flat-but-high series and a flat-but-low one both read as flat rather than
 * clipping to an edge. A zero range (every run identical) centres the line.
 * Exported for its own test: the geometry is the part worth pinning down.
 */
export const sparkPoints = (values: number[], width: number, height: number): string => {
  if (values.length < 2) return ''
  const pad = 3
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  const span = hi - lo
  const usable = height - pad * 2
  const step = width / (values.length - 1)
  return values
    .map((v, i) => {
      const y = span === 0 ? height / 2 : pad + (1 - (v - lo) / span) * usable
      return `${Math.round(i * step * 100) / 100},${Math.round(y * 100) / 100}`
    })
    .join(' ')
}

/** A run-history sparkline. Deterministic: the same series always draws the same
 * path, on the server and after hydration. */
export function Sparkline({ points, tone = 'ok', width = 132, height = 30, dot = false, label }: SparklineProps) {
  const path = sparkPoints(points, width, height)

  if (!path) {
    return (
      <svg className="dm-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <line className="dm-spark-empty" x1="0" y1={height / 2} x2={width} y2={height / 2} />
      </svg>
    )
  }

  const coords = path.split(' ')
  const last = coords[coords.length - 1].split(',')

  return (
    <svg className="dm-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <polyline className={`dm-spark-line is-${tone}`} points={path} />
      {dot && <circle className={`dm-spark-dot${tone === 'fail' ? ' is-fail' : ''}`} cx={last[0]} cy={last[1]} r="2.6" />}
    </svg>
  )
}
