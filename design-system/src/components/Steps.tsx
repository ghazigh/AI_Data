import { SectionLabel } from './SectionLabel'

export interface StepsProps {
  label?: string
  title?: string
  /** Ordered — numbering encodes the real sequence. */
  steps?: { title: string; body: string }[]
}

const DEFAULT_STEPS = [
  { title: 'Connect, read-only', body: 'Hand us scoped read-only credentials. Datalith maps the whole estate — every database, warehouse, wiki and inbox.' },
  { title: 'One graph, scored', body: 'The Enterprise Knowledge Graph assembles itself: ontology, identities, lineage — and your Agent-Readiness Score, board-ready in 48 hours.' },
  { title: 'Serve to any agent', body: 'Governed, MCP-native context for every agent — per-agent identity, full audit, and suggested workflows with ROI attached.' },
]

/** Numbered how-it-works rows; the numbers are the actual order of operations. */
export function Steps({ label = 'How it works', title = 'Read-only in. Agent workforce out.', steps = DEFAULT_STEPS }: StepsProps) {
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
