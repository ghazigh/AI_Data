const DEFAULT_SOURCES = ['postgres', 'snowflake', 's3 buckets', 'salesforce', 'kafka', 'sharepoint', 'notion', 'gmail', 'jira', '+142 more']

export interface ConfluenceFigureProps {
  /** One hairline stream per source (2–14 recommended). */
  sources?: string[]
  /** Label on the merged blue line. */
  mergedLabel?: string
  /** Draw-in animation on mount (respects reduced motion). */
  animated?: boolean
  /** Light-on-dark variant for ink sections. */
  onInk?: boolean
  /** Rendered height in px (viewBox scales). */
  height?: number
}

/**
 * The brand signature: every source, one graph — as geometry.
 * Hairline streams converge into a single bold Klein-blue line.
 */
export function ConfluenceFigure({ sources = DEFAULT_SOURCES, mergedLabel = 'ONE GRAPH', animated = false, onInk = false, height = 340 }: ConfluenceFigureProps) {
  const W = 560
  const H = 340
  const mergeX = 392
  const midY = H / 2
  const pad = 22
  const n = sources.length
  const step = n > 1 ? (H - pad * 2) / (n - 1) : 0
  return (
    <figure className={`dl-confluence${onInk ? ' dl-confluence--on-ink' : ''}${animated ? ' dl-confluence--animated' : ''}`} style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${n} data sources merging into ${mergedLabel.toLowerCase()}`}>
        {sources.map((s, i) => {
          const y = n > 1 ? pad + i * step : midY
          const spread = Math.abs(y - midY) / (H / 2)
          return (
            <g key={s + i}>
              <path
                className="dl-confluence-stream"
                d={`M0 ${y} C ${140 + spread * 20} ${y}, ${240 + spread * 20} ${midY}, ${mergeX} ${midY}`}
                style={{ opacity: 0.55 + 0.35 * ((i % 3) / 2) }}
              />
              <text className="dl-confluence-srclabel" x={8} y={y - 6}>{s}</text>
            </g>
          )
        })}
        <path className="dl-confluence-merge" d={`M${mergeX} ${midY} L${W} ${midY}`} />
        <circle className="dl-confluence-node" cx={mergeX} cy={midY} r={5.5} />
        <text className="dl-confluence-mergelabel" x={mergeX + 48} y={midY - 14}>{mergedLabel}</text>
      </svg>
    </figure>
  )
}
