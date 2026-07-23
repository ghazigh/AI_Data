import {
  siPostgresql, siSnowflake, siDatabricks, siGooglebigquery, siMongodb,
  siApachekafka, siNotion, siGmail, siJira,
} from 'simple-icons'

const SOURCES = [
  siSnowflake, siDatabricks, siGooglebigquery, siPostgresql, siMongodb,
  siApachekafka, siNotion, siGmail, siJira,
]

/**
 * Hero confluence artwork with real connector logos at the stream heads
 * (monochrome simple-icons marks) instead of text labels. Reuses the
 * dl-confluence classes so the draw-in animation and ink variant carry over.
 */
export function HeroFigure() {
  const W = 560
  const H = 340
  const mergeX = 392
  const midY = H / 2
  const pad = 22
  const rows = SOURCES.length + 1 // final row is the "+142 more" text stream
  const step = (H - pad * 2) / (rows - 1)
  const ICON = 18 // rendered icon size in viewBox units (icons are 24×24)
  return (
    <figure className="dl-confluence dl-confluence--animated st-herofig" style={{ height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img"
        aria-label={`${SOURCES.map(s => s.title).join(', ')} and 142 more sources merging into one graph`}>
        {SOURCES.map((icon, i) => {
          const y = pad + i * step
          const spread = Math.abs(y - midY) / (H / 2)
          return (
            <g key={icon.title}>
              <g className="st-herofig-icon" transform={`translate(6 ${y - ICON / 2}) scale(${ICON / 24})`}>
                <title>{icon.title}</title>
                <path d={icon.path} />
              </g>
              <path
                className="dl-confluence-stream"
                d={`M${ICON + 14} ${y} C ${150 + spread * 20} ${y}, ${245 + spread * 20} ${midY}, ${mergeX} ${midY}`}
                style={{ opacity: 0.55 + 0.35 * ((i % 3) / 2) }}
              />
            </g>
          )
        })}
        {(() => {
          const y = pad + SOURCES.length * step
          return (
            <g>
              <text className="dl-confluence-srclabel" x={6} y={y + 3}>+142 more</text>
              <path className="dl-confluence-stream" d={`M${ICON + 58} ${y} C 170 ${y}, 265 ${midY}, ${mergeX} ${midY}`} style={{ opacity: 0.55 }} />
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
