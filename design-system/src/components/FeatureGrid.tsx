import { SectionLabel } from './SectionLabel'

export interface FeatureGridProps {
  label?: string
  title?: string
  items?: { label: string; title: string; body: string }[]
  columns?: 2 | 3
}

const MODULES = [
  { label: '01 · Connect', title: 'Every source, read-only', body: '150+ connectors; multi-source, multi-platform, multi-modal ingestion.' },
  { label: '02 · Graph', title: 'One knowledge graph', body: 'Auto-ontology, identity resolution, lineage across the estate.' },
  { label: '03 · Topics', title: 'A semantic layer', body: 'Domains, canonical metrics, and a glossary agents can trust.' },
  { label: '04 · Ready', title: 'Agent-Readiness Score', body: 'Preparation engine + ARS 0–100, board-ready in 48 hours.' },
  { label: '05 · Gateway', title: 'Governed serving', body: 'MCP-native access with per-agent identity and full audit.' },
  { label: '06 · Flows', title: 'Workflows, ROI attached', body: 'Agentic workflows mined from your own data, ranked by value.' },
]

/** Hairline-divided grid of features — default content is the six Datalith modules. */
export function FeatureGrid({ label = 'The platform', title = 'Six modules. One monolith.', items = MODULES, columns = 3 }: FeatureGridProps) {
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
