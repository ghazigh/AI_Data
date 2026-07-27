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
  const W = 560
  const H = 340
  const mergeX = 392
  const midY = H / 2
  const pad = 26
  const rows = SOURCES.length + 1 // final row is the "+144 more" text stream
  const step = (H - pad * 2) / (rows - 1)
  const ICON = 20 // rendered icon size in viewBox units (icons are 24×24)
  const ICON_X = 6
  return (
    <figure className="dl-confluence dl-confluence--animated st-herofig" style={{ height: H }}>
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
                d={`M${startX} ${y} C ${150 + spread * 20} ${y}, ${245 + spread * 20} ${midY}, ${mergeX} ${midY}`}
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
              <path className="dl-confluence-stream" d={`M74 ${y} C 170 ${y}, 265 ${midY}, ${mergeX} ${midY}`} style={{ opacity: 0.55 }} />
            </g>
          )
        })()}
        <path className="dl-confluence-merge" d={`M${mergeX} ${midY} L${W} ${midY}`} />
        <circle className="dl-confluence-node" cx={mergeX} cy={midY} r={5.5} />
        <text className="dl-confluence-mergelabel" x={mergeX + 48} y={midY - 14}>ONE GRAPH</text>
      </svg>
    </figure>
  )
}
