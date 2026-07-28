import { SectionLabel } from './SectionLabel'

export interface FeatureGridProps {
  label?: string
  title?: string
  items?: { label: string; title: string; body: string; value?: string }[]
  columns?: 2 | 3
}

const STAGES = [
  { label: '01 · Connect', title: 'Plugs into every system, read-only', body: '150+ connectors across warehouses, databases, SaaS apps, object stores and streams — every modality.', value: 'No migration and no engineering project — connected in an afternoon.' },
  { label: '02 · Ready', title: 'Scores how ready your data is for agents', body: 'An Agent-Readiness Score per source and per domain, with the red flags a data team can act on.', value: 'Continuous monitoring, not a one-off audit.' },
  { label: '03 · Pipelines', title: 'Proposes the restructuring your estate needs', body: 'The score becomes a plan: resolution, semantic typing, PII masking, chunking and embedding.', value: 'Built for your data as it is, not a generic template.' },
  { label: '04 · Graph', title: 'Builds one map of your whole business', body: 'Every system resolved into one knowledge graph, with its topics, domains and expertise named.', value: 'Knowledge bases any agentic AI can read.' },
  { label: '05 · Use cases', title: 'Tells you which agents are worth building', body: 'Datalith reads the graph and proposes the agent applications your data actually supports.', value: 'You find out what to build before you build it.' },
]

/** Hairline-divided grid of features — default content is the five Datalith stages. */
export function FeatureGrid({ label = 'What you get', title = 'One platform. Five stages.', items = STAGES, columns = 3 }: FeatureGridProps) {
  return (
    <section className="dl-featuregrid">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <div className={`dl-featuregrid-grid dl-featuregrid-grid--${columns}`}>
          {items.map(it => (
            <div className="dl-featuregrid-cell" key={it.label}>
              <span className="dl-featuregrid-label">{it.label}</span>
              <h3 className="dl-featuregrid-title">{it.title}</h3>
              <p className="dl-featuregrid-body">{it.body}</p>
              {it.value && <p className="dl-featuregrid-value">{it.value}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
