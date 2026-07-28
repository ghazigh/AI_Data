import type { CSSProperties, ReactNode } from 'react'

/**
 * The platform as the sequence it actually is: connect, score, restructure,
 * map, activate. Each stage carries a small figure that animates once the
 * row scrolls into view, so the transformation is shown rather than claimed.
 * Numbering is load-bearing here — you cannot propose use cases before the
 * graph exists — so the steps are ordered, not decorative.
 */

/** 01 — scattered sources resolving into a single read-only port. */
function ConnectGlyph() {
  const ys = [16, 34, 52, 70]
  return (
    <svg viewBox="0 0 160 96" className="st-cap-svg" aria-hidden="true">
      {ys.map((y, i) => (
        <g key={y}>
          <rect className="st-cap-src" x={8} y={y - 6} width={13} height={13} rx={3}
            style={{ '--i': i } as CSSProperties} />
          <path className="st-cap-wire" pathLength={100} style={{ '--i': i } as CSSProperties}
            d={`M25 ${y} C 62 ${y}, 84 43, 120 43`} />
        </g>
      ))}
      <rect className="st-cap-port" x={120} y={28} width={16} height={30} rx={4} />
    </svg>
  )
}

/** 02 — a readiness score sweeping up, with the monitoring trace beneath. */
function ReadyGlyph() {
  return (
    <svg viewBox="0 0 160 96" className="st-cap-svg" aria-hidden="true">
      <path className="st-cap-arc-bg" d="M34 62 A 46 46 0 0 1 126 62" />
      <path className="st-cap-arc" pathLength={100} d="M34 62 A 46 46 0 0 1 126 62" />
      <text className="st-cap-score" x={80} y={60} textAnchor="middle">78</text>
      <path className="st-cap-trace" pathLength={100}
        d="M34 84 L52 79 L66 86 L82 74 L98 80 L114 70 L126 73" />
    </svg>
  )
}

/** 03 — ragged records snapping into aligned ones. */
function PipelineGlyph() {
  const rows = [22, 44, 66]
  const ragged = [[8, 26], [40, 14], [60, 33]]
  return (
    <svg viewBox="0 0 160 96" className="st-cap-svg" aria-hidden="true">
      {rows.map((y, r) => (
        <g key={y}>
          {ragged.map(([x, w], c) => (
            <rect key={c} className="st-cap-cell" x={x} y={y - 5} width={w} height={10} rx={2}
              style={{ '--i': r * 3 + c, '--w': w, '--x': x } as CSSProperties} />
          ))}
        </g>
      ))}
      <path className="st-cap-tick" pathLength={100} d="M116 48 l8 8 l16 -18" />
    </svg>
  )
}

/** 04 — nodes resolving into three labelled knowledge clusters. */
function GraphGlyph() {
  const clusters = [
    { cx: 34, cy: 30, n: [[0, 0], [16, -9], [11, 13]] },
    { cx: 116, cy: 26, n: [[0, 0], [15, 8], [-6, 14]] },
    { cx: 72, cy: 72, n: [[0, 0], [18, -6], [8, 12]] },
  ]
  return (
    <svg viewBox="0 0 160 96" className="st-cap-svg" aria-hidden="true">
      <path className="st-cap-edge" pathLength={100} style={{ '--i': 0 } as CSSProperties} d="M50 34 L112 28" />
      <path className="st-cap-edge" pathLength={100} style={{ '--i': 1 } as CSSProperties} d="M40 42 L74 70" />
      <path className="st-cap-edge" pathLength={100} style={{ '--i': 2 } as CSSProperties} d="M112 36 L86 70" />
      {clusters.map((c, ci) => (
        <g key={ci}>
          <circle className="st-cap-halo" cx={c.cx + 7} cy={c.cy + 2} r={19}
            style={{ '--i': ci } as CSSProperties} />
          {c.n.map(([dx, dy], i) => (
            <circle key={i} className="st-cap-node" cx={c.cx + dx} cy={c.cy + dy} r={4}
              style={{ '--i': ci * 3 + i } as CSSProperties} />
          ))}
        </g>
      ))}
    </svg>
  )
}

/** 05 — candidate agents surfacing from the graph, ranked. */
function ActivateGlyph() {
  const cards = [
    { y: 14, w: 96 },
    { y: 40, w: 116 },
    { y: 66, w: 78 },
  ]
  return (
    <svg viewBox="0 0 160 96" className="st-cap-svg" aria-hidden="true">
      {cards.map((c, i) => (
        <g key={c.y} className="st-cap-card" style={{ '--i': i } as CSSProperties}>
          <rect x={16} y={c.y - 9} width={c.w} height={18} rx={4} />
          <rect className="st-cap-bar" x={22} y={c.y - 2} width={c.w - 40} height={4} rx={2} />
        </g>
      ))}
    </svg>
  )
}

interface Stage { name: string; what: string; value: string; glyph: ReactNode }

const STAGES: Stage[] = [
  {
    name: 'Connect',
    what: 'Plugs into every database, warehouse and app you run.',
    value: 'Read-only. No migration, no engineering project.',
    glyph: <ConnectGlyph />,
  },
  {
    name: 'Ready',
    what: 'Scores how ready your data is for agentic AI — and keeps watching it.',
    value: 'Continuous monitoring, not a one-off audit.',
    glyph: <ReadyGlyph />,
  },
  {
    name: 'Pipelines',
    what: 'Proposes the restructuring your estate actually needs, based on what it found.',
    value: 'Built for your data as it is, not a generic template.',
    glyph: <PipelineGlyph />,
  },
  {
    name: 'Graph',
    what: 'Maps your whole business into one graph, finding its topics, domains and expertise.',
    value: 'Knowledge bases any agentic AI can read.',
    glyph: <GraphGlyph />,
  },
  {
    name: 'Use cases',
    what: 'Reads the graph and proposes the agent applications your data makes possible.',
    value: 'You learn what to build, before you build it.',
    glyph: <ActivateGlyph />,
  },
]

export function CapabilityFlow() {
  return (
    <div className="dl-wrap">
      <ol className="st-capflow" data-reveal-group>
        {STAGES.map((s, i) => (
          <li className="st-cap" key={s.name} style={{ '--i': i } as CSSProperties}>
            <div className="st-cap-fig">{s.glyph}</div>
            <span className="st-cap-num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="st-cap-name">{s.name}</h3>
            <p className="st-cap-what">{s.what}</p>
            <p className="st-cap-value">{s.value}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
