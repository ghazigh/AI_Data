import { Stat, type StatProps } from './Stat'

export interface StatBandProps { stats?: StatProps[] }

const DEFAULT_STATS: StatProps[] = [
  { value: '>40%', label: 'of agentic AI projects will be canceled by end of 2027 — data readiness is the #1 killer', source: 'Gartner' },
  { value: '60–75%', label: 'of every agent project\'s effort is spent on data preparation', source: 'Industry surveys' },
  { value: '89%', label: 'of teams are investing in context infrastructure in the next 12 months', source: 'DataHub, 2026' },
]

/** Hairline-divided band of statistics. */
export function StatBand({ stats = DEFAULT_STATS }: StatBandProps) {
  return (
    <section className="dl-statband">
      <div className="dl-wrap dl-statband-grid">
        {stats.map(s => (<div className="dl-statband-cell" key={s.value}><Stat {...s} /></div>))}
      </div>
    </section>
  )
}
