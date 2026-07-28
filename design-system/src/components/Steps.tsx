import { SectionLabel } from './SectionLabel'

export interface StepsProps {
  label?: string
  title?: string
  /** Ordered — numbering encodes the real sequence. */
  steps?: { title: string; body: string }[]
}

const DEFAULT_STEPS = [
  { title: 'Connect, read-only', body: 'Give Datalith scoped read-only credentials. It maps every database, warehouse, wiki and app you run. No migration, nothing written back.' },
  { title: 'Scored, then restructured', body: 'Datalith scores how ready that data is for agents — board-ready in 48 hours — then proposes the restructuring your estate actually needs.' },
  { title: 'Mapped, then acted on', body: 'It builds one knowledge graph of your business, serves it to any agent under governance, and names the agents that graph makes possible.' },
]

/** Numbered how-it-works rows; the numbers are the actual order of operations. */
export function Steps({ label = 'How it works', title = 'Read-only credentials in. Governed context out.', steps = DEFAULT_STEPS }: StepsProps) {
  return (
    <section className="dl-steps">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <ol className="dl-steps-list">
          {steps.map((s, i) => (
            <li className="dl-steps-row" key={s.title}>
              <span className="dl-steps-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="dl-steps-title">{s.title}</h3>
              <p className="dl-steps-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
