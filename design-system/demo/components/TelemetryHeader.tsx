import { Sparkline } from './telemetry/Sparkline'
import { LiveDot } from './telemetry/LiveDot'
import { DOMAINS, ESTATE, ESTATE_SERIES } from '../data/tenant'
import { TREND } from '../data/readiness'

/** Domains under the 70 threshold — stated beside the score so the number has a
 * reason attached to it rather than sitting alone. */
const DOMAINS_BELOW = DOMAINS.filter(d => d.score < 70).length

export interface TelemetryKpi {
  label: string
  value: string
  unit?: string
  sub: string
  series: readonly number[]
  /** The one KPI allowed to draw in the signal colour. */
  accent?: boolean
}

/** Plots the quarterly readiness trend against its target. Pure geometry, so the
 * same numbers always produce the same path — nothing here reads a clock. */
const trendPath = (values: number[], w: number, h: number, pad: number) => {
  const lo = Math.min(...values, 40)
  const hi = Math.max(...values, ESTATE.scoreTarget)
  const span = hi - lo || 1
  return values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (v - lo) / span) * (h - pad * 2)
    return `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`
  })
}

/**
 * The estate's ink surface: the score, its trajectory against the target, and the
 * four numbers underneath it. This is the screen's one intelligence surface —
 * nothing else on Overview goes dark.
 */
export function TelemetryHeader({ kpis }: { kpis: TelemetryKpi[] }) {
  const w = 330
  const h = 76
  const values = TREND.map(t => t.value)
  const lo = Math.min(...values, 40)
  const hi = Math.max(...values, ESTATE.scoreTarget)
  const pts = trendPath(values, w, h, 8)
  const [lastX, lastY] = pts[pts.length - 1].split(',')
  // The target rule is placed on the same scale as the line, so "above the rule"
  // means the estate actually cleared its target.
  const targetY = 8 + (1 - (ESTATE.scoreTarget - lo) / ((hi - lo) || 1)) * (h - 16)
  // The target is usually the top of the scale, which leaves no room above the
  // rule — drop the label underneath it rather than letting it clip.
  const targetLabelY = targetY < 14 ? targetY + 12 : targetY - 5

  return (
    <section className="dm-ink dm-tele" aria-label="Estate telemetry">
      <div className="dm-tele-top">
        <p className="dm-eyebrow">Agent-readiness · estate telemetry</p>
        <p className="dm-tele-live"><LiveDot state="run" />Live · streaming</p>
      </div>

      <div className="dm-tele-body">
        <p className="dm-tele-score">
          {ESTATE.score}<span>/100</span>
        </p>
        <div>
          <p className="dm-tele-delta">▲ {ESTATE.scoreDelta} since last quarter</p>
          <p className="dm-tele-sub">
            Target {ESTATE.scoreTarget} by Q4 · {DOMAINS_BELOW} domains below threshold
          </p>
        </div>
        <figure className="dm-tele-trend">
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img"
            aria-label={`Readiness trend, ${TREND.map(t => `${t.label} ${t.value}`).join(', ')}, target ${ESTATE.scoreTarget}`}>
            <defs>
              <linearGradient id="dm-tele-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3D5FFF" stopOpacity=".34" />
                <stop offset="1" stopColor="#3D5FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line className="dm-tele-target" x1="0" y1={targetY} x2={w} y2={targetY} />
            <text className="dm-tele-tlabel" x={w - 62} y={targetLabelY}>TARGET {ESTATE.scoreTarget}</text>
            <path className="dm-tele-area" d={`M${pts.join(' L')} L${lastX},${h} L${pts[0].split(',')[0]},${h}Z`} />
            <polyline className="dm-tele-line" points={pts.join(' ')} />
            <circle className="dm-tele-head" cx={lastX} cy={lastY} r="3.2" />
            <circle className="dm-tele-halo" cx={lastX} cy={lastY} r="7" />
            <text className="dm-tele-x" x="0" y={h - 2}>{TREND[0].label}</text>
            <text className="dm-tele-x is-end" x={w} y={h - 2}>{TREND[TREND.length - 1].label}</text>
          </svg>
        </figure>
      </div>

      <div className="dm-tele-kpis">
        {kpis.map(k => (
          <div className="dm-tele-kpi" key={k.label}>
            <p className="dm-eyebrow">{k.label}</p>
            <div className="dm-tele-kpi-row">
              <p className="dm-tele-kpi-v">{k.value}{k.unit && <small>{k.unit}</small>}</p>
              <Sparkline points={[...k.series]} width={82} height={22}
                tone={k.accent ? 'run' : 'ok'} label={`${k.label} trend`} />
            </div>
            <p className="dm-tele-kpi-n">{k.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/** The four estate KPIs, defined here so Overview stays a layout. */
export const estateKpis = (running: number, failed: number, total: number): TelemetryKpi[] => [
  {
    label: 'Sources connected',
    value: String(ESTATE.sourcesConnected),
    sub: `${ESTATE.sourcesPending} awaiting read-only credentials`,
    series: ESTATE_SERIES.sources,
  },
  {
    label: 'Entities resolved',
    value: '2.4', unit: 'M',
    sub: `${ESTATE.knowledgeBases} knowledge bases · ${ESTATE.relationshipsMapped} relationships`,
    series: ESTATE_SERIES.entities,
  },
  {
    label: 'Agent calls served',
    value: '184', unit: 'K',
    sub: `Last 30 days · ${ESTATE.agentCallsDenied} denied by policy`,
    series: ESTATE_SERIES.agentCalls,
    accent: true,
  },
  {
    label: 'Pipelines running',
    value: String(running), unit: `/${total}`,
    sub: `${failed} failed · ${total - running - failed} idle`,
    series: ESTATE_SERIES.readiness,
  },
]
