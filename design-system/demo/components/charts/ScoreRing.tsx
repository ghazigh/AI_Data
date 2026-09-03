/**
 * The estate score as an arc: the number, the arc it has covered, and the
 * target mark it is measured against. Pure geometry from the score, so the
 * server and the client draw the identical path.
 */
export interface ScoreRingProps {
  score: number
  /** Drawn as a tick on the track. */
  target?: number
  delta?: number
  /** Diameter in px. */
  size?: number
  label?: string
  /** 'ink' inverts the palette for a dark surface. */
  tone?: 'paper' | 'ink'
  /** A caption under the number, e.g. "Agent-readiness". */
  caption?: string
}

const SWEEP = 270 // degrees of arc the track covers
const START = 135 // degrees clockwise from 12 o'clock where the track begins

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: +(cx + r * Math.cos(rad)).toFixed(2), y: +(cy + r * Math.sin(rad)).toFixed(2) }
}

/** SVG arc path from angle a to angle b (degrees clockwise from 12 o'clock). */
export const arcPath = (cx: number, cy: number, r: number, a: number, b: number): string => {
  const s = polar(cx, cy, r, a)
  const e = polar(cx, cy, r, b)
  const large = b - a > 180 ? 1 : 0
  return `M${s.x} ${s.y} A${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

export function ScoreRing({ score, target, delta, size = 168, label = 'Agent-readiness score', tone = 'paper', caption }: ScoreRingProps) {
  const c = size / 2
  const r = c - 10
  const clamped = Math.max(0, Math.min(100, score))
  const end = START + (SWEEP * clamped) / 100
  const tick = target === undefined ? null : polar(c, c, r, START + (SWEEP * target) / 100)
  const tickOuter = target === undefined ? null : polar(c, c, r + 7, START + (SWEEP * target) / 100)

  return (
    <div className={`dm-ring is-${tone}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <path className="dm-ring-track" d={arcPath(c, c, r, START, START + SWEEP)} />
        {clamped > 0 && <path className="dm-ring-fill" d={arcPath(c, c, r, START, end)} />}
        {tick && tickOuter && (
          <line className="dm-ring-tick" x1={tick.x} y1={tick.y} x2={tickOuter.x} y2={tickOuter.y} />
        )}
      </svg>
      <div className="dm-ring-body">
        <p className="dm-ring-v">{score}<span>/100</span></p>
        {caption && <p className="dm-ring-cap">{caption}</p>}
        {delta !== undefined && (
          <p className={`dm-ring-delta${delta < 0 ? ' is-down' : ''}`}>
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} this quarter
          </p>
        )}
      </div>
    </div>
  )
}
