import type { Domain, DomainKey } from '../../data/types'

export interface DomainBarsProps {
  domains: Domain[]
  /** Scores below this render in the warning tone. */
  threshold?: number
  onSelect?: (key: DomainKey) => void
}

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
          <span className="dm-bar">
            <i
              className={`dm-bar-fill${d.score < threshold ? ' is-under' : ''}`}
              style={{ width: `${d.score}%` }}
            />
          </span>
          <span className="dm-bar-score">{d.score}</span>
        </li>
      ))}
    </ul>
  )
}
