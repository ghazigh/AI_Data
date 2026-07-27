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
  // Portrait canvas: the figure column is taller than it is wide, so the
  // artwork is authored to roughly that aspect. It then scales ~1:1 instead
  // of shrinking to 75% and letterboxing inside a landscape viewBox.
  const W = 440
  const H = 400
  // merge sits left of centre so the label clears the canvas: "ONE AGENTIC
  // PLATFORM" needs ~150 units at 10px mono with 0.14em tracking
  const mergeX = 248
  const midY = H / 2
  const pad = 30
  const rows = SOURCES.length + 1 // final row is the "+144 more" text stream
  const step = (H - pad * 2) / (rows - 1)
  const ICON = 22 // rendered icon size in viewBox units (icons are 24×24)
  const ICON_X = 6
  return (
    <figure className="dl-confluence dl-confluence--animated st-herofig">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img"
        aria-label={`${SOURCES.map(s => s.name).join(', ')} and 144 more sources merging into one graph`}>
        {SOURCES.map((s, i) => {
          const y = pad + i * step
          const spread = Math.abs(y - midY) / (H / 2)
          const startX = ICON_X + ICON + 10
          return (
            <g key={s.name}>
              <g className="st-herofig-icon" transform={`translate(${ICON_X} ${y - ICON / 2}) scale(${ICON / 24})`}>
                <title>{s.name}</title>
                <path d={s.icon.path} fillRule={s.icon.evenOdd ? 'evenodd' : undefined} />
              </g>
              <path
                className="dl-confluence-stream"
                d={`M${startX} ${y} C ${100 + spread * 16} ${y}, ${172 + spread * 16} ${midY}, ${mergeX} ${midY}`}
                style={{ opacity: 0.55 + 0.35 * ((i % 3) / 2) }}
              />
            </g>
          )
        })}
        {(() => {
          const y = pad + SOURCES.length * step
          return (
            <g>
              <text className="dl-confluence-srclabel" x={ICON_X} y={y + 3}>+144 more</text>
              <path className="dl-confluence-stream" d={`M74 ${y} C 117 ${y}, 184 ${midY}, ${mergeX} ${midY}`} style={{ opacity: 0.55 }} />
            </g>
          )
        })()}
        <path className="dl-confluence-merge" d={`M${mergeX} ${midY} L${W} ${midY}`} />
        <circle className="dl-confluence-node" cx={mergeX} cy={midY} r={6} />
        <text className="dl-confluence-mergelabel" x={mergeX + 16} y={midY - 16}>ONE AGENTIC PLATFORM</text>
      </svg>
    </figure>
  )
}
