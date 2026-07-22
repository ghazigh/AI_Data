export interface StatProps {
  /** The number itself, e.g. ">40%" or "150+". */
  value: string
  label: string
  /** Attribution shown in mono caption, e.g. "Gartner". */
  source?: string
}

/** Editorial statistic: display numeral, plain label, mono source. */
export function Stat({ value, label, source }: StatProps) {
  return (
    <div className="dl-stat">
      <div className="dl-stat-value">{value}</div>
      <p className="dl-stat-label">{label}</p>
      {source && <span className="dl-stat-source">{source}</span>}
    </div>
  )
}
