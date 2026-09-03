import type { UseCase } from '../../data/useCases'

/**
 * Impact against effort, one point per use case — the chart an executive
 * actually reads this list through. Quick wins sit top-left; the bottom-right
 * is where nobody should start. Colour is the build status, and every point
 * is a real control that opens the same drawer the table does.
 *
 * Pure geometry from the data: no layout solver, no jitter, so the server and
 * the client draw the identical figure.
 */
export interface OpportunityMapProps {
  useCases: UseCase[]
  onSelect: (u: UseCase) => void
}

/** "6 weeks" → 6. Only ever reads the fixed display strings in the data. */
export const effortWeeks = (effort: string): number => Number(/(\d+)/.exec(effort)?.[1] ?? 0)

const W = 640, H = 300
const PAD = { l: 52, r: 24, t: 22, b: 40 }

export function OpportunityMap({ useCases, onSelect }: OpportunityMapProps) {
  const weeks = useCases.map(u => effortWeeks(u.effort))
  const xMin = Math.min(...weeks) - 1, xMax = Math.max(...weeks) + 1
  const yMax = Math.max(...useCases.map(u => u.impactValue)) * 1.1
  const x = (w: number) => PAD.l + ((w - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r)
  const y = (v: number) => H - PAD.b - (v / yMax) * (H - PAD.t - PAD.b)
  const r = (v: number) => 5 + 9 * Math.sqrt(v / yMax)
  const midX = x((xMin + xMax) / 2)
  const midY = y(yMax / 2)
  const ranked = [...useCases].sort((a, b) => b.impactValue - a.impactValue)
  const labelled = new Set(ranked.slice(0, 5).map(u => u.id))
  const ticks = Array.from({ length: xMax - xMin - 1 }, (_, i) => xMin + 1 + i)
  const yTicks = [0.5, 1, 1.5, 2].map(m => m * 1_000_000).filter(v => v < yMax)

  return (
    <figure className="dm-ucmap-fig">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Opportunity map: projected impact against effort, one point per use case">
        {yTicks.map(v => <line key={v} className="dm-ucmap-grid" x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} />)}
        <line className="dm-ucmap-axis" x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} />
        <line className="dm-ucmap-axis" x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} />
        <line className="dm-ucmap-grid" x1={midX} x2={midX} y1={PAD.t} y2={H - PAD.b} strokeDasharray="3 4" />
        <line className="dm-ucmap-grid" x1={PAD.l} x2={W - PAD.r} y1={midY} y2={midY} strokeDasharray="3 4" />
        <text className="dm-ucmap-quad" x={PAD.l + 8} y={PAD.t + 12}>Quick wins</text>
        <text className="dm-ucmap-quad" x={W - PAD.r - 8} y={PAD.t + 12} textAnchor="end">Strategic bets</text>
        <text className="dm-ucmap-quad" x={PAD.l + 8} y={H - PAD.b - 8}>Fill-ins</text>
        <text className="dm-ucmap-quad" x={W - PAD.r - 8} y={H - PAD.b - 8} textAnchor="end">Reconsider</text>
        {ticks.map(w => (
          <text key={w} className="dm-ucmap-lbl" x={x(w)} y={H - PAD.b + 16} textAnchor="middle">{w}w</text>
        ))}
        {yTicks.map(v => (
          <text key={v} className="dm-ucmap-lbl" x={PAD.l - 8} y={y(v) + 3} textAnchor="end">${v / 1_000_000}M</text>
        ))}
        <text className="dm-ucmap-lbl" x={(PAD.l + W - PAD.r) / 2} y={H - 6} textAnchor="middle">Effort to build</text>
        <text className="dm-ucmap-lbl" x={14} y={H - PAD.b} textAnchor="start" transform={`rotate(-90 14 ${H - PAD.b})`}>Projected impact / yr</text>
        {ranked.map(u => {
          const cx = x(effortWeeks(u.effort)), cy = y(u.impactValue)
          return (
            <g
              key={u.id}
              className={`dm-ucmap-pt is-${u.status}${labelled.has(u.id) ? '' : ' is-quiet'}`}
              role="button"
              tabIndex={0}
              aria-label={`${u.name} — ${u.impact} projected, ${u.effort}`}
              onClick={() => onSelect(u)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(u) } }}
            >
              <circle cx={cx} cy={cy} r={r(u.impactValue)} />
              <text x={cx + r(u.impactValue) + 5} y={cy + 4}>{u.name}</text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
