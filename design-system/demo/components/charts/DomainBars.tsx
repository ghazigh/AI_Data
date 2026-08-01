import { Meter } from '../telemetry/Meter'
import type { Domain, DomainKey } from '../../data/types'

export interface DomainBarsProps {
  domains: Domain[]
  /** Scores below this render in the warning tone, and every bar marks it. */
  threshold?: number
  onSelect?: (key: DomainKey) => void
}

/** Domain scores against the threshold they are actually judged by. The mark is
 * the point of the panel: a bare bar says "68", a marked one says "68, short of
 * 70", which is what the operator is deciding on. */
export function DomainBars({ domains, threshold = 70, onSelect }: DomainBarsProps) {
  return (
    <ul className="dm-bars">
      {domains.map(d => (
        <li className="dm-bar-row" key={d.key}>
          <span className="dm-bar-name">
            {onSelect
              ? <button type="button" onClick={() => onSelect(d.key)}>{d.name}</button>
              : d.name}
          </span>
          <Meter value={d.score} target={threshold} tone={d.score < threshold ? 'under' : 'default'} />
          <span className="dm-bar-score">{d.score}</span>
          <span className={`dm-bar-delta${d.delta < 0 ? ' is-down' : ''}`}>
            {d.delta > 0 ? '+' : d.delta < 0 ? '−' : '±'}{Math.abs(d.delta)}
          </span>
        </li>
      ))}
    </ul>
  )
}
