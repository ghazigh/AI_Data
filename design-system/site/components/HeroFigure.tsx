import type { CSSProperties } from 'react'
import {
  siSap, siSnowflake, siDatabricks, siGooglebigquery, siPostgresql, siMysql,
} from 'simple-icons'

/**
 * S3's bucket silhouette, drawn to the same 24×24 grid as the simple-icons
 * marks. simple-icons dropped every Amazon/AWS mark over trademark policy,
 * and AWS's own asset ships under their brand guidelines — so this is our
 * own monochrome rendering of the bucket form, used nominatively to say
 * "we connect to this". Two subpaths: outer bucket, inner rim opening.
 */
const S3_BUCKET =
  'M12 2C6.48 2 2 3.34 2 5l2.6 14.4C4.85 20.9 8.06 22 12 22s7.15-1.1 7.4-2.6L22 5c0-1.66-4.48-3-10-3z'
  + 'M12 3.7C7.86 3.7 4.5 4.28 4.5 5s3.36 1.3 7.5 1.3 7.5-.58 7.5-1.3-3.36-1.3-7.5-1.3z'

/** A drawable mark: either a simple-icons entry or one of our own paths. */
interface Mark { path: string; evenOdd?: boolean }

const SOURCES: { name: string; icon: Mark }[] = [
  { name: 'SAP', icon: siSap },
  { name: 'AWS S3', icon: { path: S3_BUCKET, evenOdd: true } },
  { name: 'Snowflake', icon: siSnowflake },
  { name: 'Databricks', icon: siDatabricks },
  { name: 'BigQuery', icon: siGooglebigquery },
  { name: 'Postgres', icon: siPostgresql },
  { name: 'MySQL', icon: siMysql },
]

/**
 * Hero confluence artwork: source marks at the stream heads flowing into a
 * single graph node. Reuses the dl-confluence classes so the draw-in
 * animation and ink variant carry over.
 */
export function HeroFigure() {
  // Landscape canvas: the figure now owns the full right half of the hero,
  // which is wider than it is tall, so the artwork is authored to that
  // aspect (~1.58) and fills the column instead of letterboxing in it.
  const W = 760
  const H = 480
  // merge sits left so "ONE AGENTIC PLATFORM" (~148 units at 10px mono,
  // 0.14em tracking) clears the terminal node at W-12
  const mergeX = 480
  const midY = H / 2
  const pad = 16  // tight: the viewBox should wrap the drawing, not pad it
  const rows = SOURCES.length + 1 // final row is the "+144 more" text stream
  const step = (H - pad * 2) / (rows - 1)
  const ICON = 26 // rendered icon size in viewBox units (icons are 24×24)
  const ICON_X = 6
  return (
    <figure className="dl-confluence dl-confluence--animated st-herofig">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img"
        aria-label={`${SOURCES.map(s => s.name).join(', ')} and 144 more sources merging into one graph`}>
        {SOURCES.map((s, i) => {
          const y = pad + i * step
          const spread = Math.abs(y - midY) / (H / 2)
          const startX = ICON_X + ICON + 10
          const d = `M${startX} ${y} C ${210 + spread * 34} ${y}, ${372 + spread * 34} ${midY}, ${mergeX} ${midY}`
          return (
            <g key={s.name}>
              <g className="st-herofig-icon" transform={`translate(${ICON_X} ${y - ICON / 2}) scale(${ICON / 24})`}>
                <title>{s.name}</title>
                <path d={s.icon.path} fillRule={s.icon.evenOdd ? 'evenodd' : undefined} />
              </g>
              <path className="dl-confluence-stream" d={d} style={{ opacity: 0.55 + 0.35 * ((i % 3) / 2) }} />
              {/* the travelling packet: pathLength normalises every stream to
                  100 units so one keyframe drives them all regardless of curve */}
              <path className="st-flow" d={d} pathLength={100} style={{ '--i': i } as CSSProperties} />
            </g>
          )
        })}
        {(() => {
          const y = pad + SOURCES.length * step
          const d = `M92 ${y} C 240 ${y}, 400 ${midY}, ${mergeX} ${midY}`
          return (
            <g>
              <text className="dl-confluence-srclabel" x={ICON_X} y={y + 3}>+144 more</text>
              <path className="dl-confluence-stream" d={d} style={{ opacity: 0.55 }} />
              <path className="st-flow" d={d} pathLength={100} style={{ '--i': SOURCES.length } as CSSProperties} />
            </g>
          )
        })()}
        {/* the served line: a closed segment between two equal nodes, not a
            stub running off the canvas — inset so the terminal node clears W */}
        {/* pathLength pins the draw-in animation to the stylesheet's
            stroke-dasharray:200 regardless of how long the line actually is —
            without it, widening the canvas leaves the last stretch undrawn */}
        <path className="dl-confluence-merge" pathLength={200} d={`M${mergeX} ${midY} L${W - 12} ${midY}`} />
        {/* arrival ring at the platform, then the served highlight travelling out */}
        <circle className="st-arrival" cx={mergeX} cy={midY} r={6} />
        <path className="st-flow st-flow--served" pathLength={100} d={`M${mergeX} ${midY} L${W - 12} ${midY}`} />
        <circle className="dl-confluence-node" cx={mergeX} cy={midY} r={6} />
        <circle className="dl-confluence-node" cx={W - 12} cy={midY} r={6} />
        <text className="dl-confluence-mergelabel" x={mergeX + 16} y={midY - 16}>ONE AGENTIC PLATFORM</text>
      </svg>
    </figure>
  )
}
