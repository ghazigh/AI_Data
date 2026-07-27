import {
  siSap, siSnowflake, siDatabricks, siGooglebigquery, siPostgresql, siMysql,
  type SimpleIcon,
} from 'simple-icons'

/**
 * The seven headline sources. Icon where a redistributable mark exists,
 * name-only otherwise — simple-icons carries no Amazon/AWS marks, so S3
 * renders as a label, matching the connector marquee on the same page.
 */
const SOURCES: { name: string; icon?: SimpleIcon }[] = [
  { name: 'SAP', icon: siSap },
  { name: 'AWS S3' },
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
  const mergeX = 296
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
          // text heads are wider than icon heads, so their stream starts further right
          const startX = s.icon ? ICON_X + ICON + 10 : 64
          return (
            <g key={s.name}>
              {s.icon ? (
                <g className="st-herofig-icon" transform={`translate(${ICON_X} ${y - ICON / 2}) scale(${ICON / 24})`}>
                  <title>{s.name}</title>
                  <path d={s.icon.path} />
                </g>
              ) : (
                <text className="dl-confluence-srclabel" x={ICON_X} y={y + 3}>{s.name}</text>
              )}
              <path
                className="dl-confluence-stream"
                d={`M${startX} ${y} C ${120 + spread * 18} ${y}, ${205 + spread * 18} ${midY}, ${mergeX} ${midY}`}
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
              <path className="dl-confluence-stream" d={`M74 ${y} C 140 ${y}, 220 ${midY}, ${mergeX} ${midY}`} style={{ opacity: 0.55 }} />
            </g>
          )
        })()}
        <path className="dl-confluence-merge" d={`M${mergeX} ${midY} L${W} ${midY}`} />
        <circle className="dl-confluence-node" cx={mergeX} cy={midY} r={6} />
        <text className="dl-confluence-mergelabel" x={mergeX + 16} y={midY - 16}>ONE GRAPH</text>
      </svg>
    </figure>
  )
}
