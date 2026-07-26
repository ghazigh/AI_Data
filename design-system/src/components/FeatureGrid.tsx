import { SectionLabel } from './SectionLabel'

export interface FeatureGridProps {
  label?: string
  title?: string
  items?: { label: string; title: string; body: string; value?: string }[]
  columns?: 2 | 3
}

const CAPABILITIES = [
  { label: '01 · Connect', title: 'Plugs into every system, read-only', body: '150+ connectors across warehouses, databases, SaaS apps, object stores and streams.', value: 'No migration and no engineering project — connected in an afternoon.' },
  { label: '02 · Graph', title: 'One map of your business across all systems', body: 'The same customer, order or contract recognised across every system you run.', value: 'Agents stop giving contradictory answers from three systems.' },
  { label: '03 · Topics', title: 'One agreed definition per business metric', body: 'Business domains defined once: canonical metrics, glossary, authoritative source.', value: '"Revenue" means the same thing to every agent, every time.' },
  { label: '04 · Ready', title: 'Cleans and scores your data for machine use', body: 'Cleaning, deduplication, typing, chunking, masking — measured by the Agent-Readiness Score.', value: 'Removes the 60–75% of agent project effort that goes to data prep.' },
  { label: '05 · Gateway', title: 'One governed door for every agent', body: 'A single endpoint with per-agent identity, least-privilege scopes and a full audit log.', value: 'Security signs off, because every agent query is identified and logged.' },
  { label: '06 · Flows', title: 'Ranks which agents to build, by payback', body: 'Datalith mines your own data for automation opportunities and generates deployable blueprints.', value: 'Turns a data cleanup budget into a revenue roadmap.' },
]

/** Hairline-divided grid of features — default content is the six Datalith capabilities. */
export function FeatureGrid({ label = 'What you get', title = 'One platform. Six capabilities.', items = CAPABILITIES, columns = 3 }: FeatureGridProps) {
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
