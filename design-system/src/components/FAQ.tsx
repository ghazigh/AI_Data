import { SectionLabel } from './SectionLabel'

export interface FAQProps {
  label?: string
  title?: string
  items?: { q: string; a: string }[]
}

const DEFAULT_ITEMS = [
  { q: 'Is access really read-only?', a: 'Yes. Datalith ingests through scoped, read-only credentials; nothing writes back to your systems, and every read is logged in the audit trail.' },
  { q: 'What is the Agent-Readiness Score?', a: 'ARS is a 0–100 measure of how consumable your estate is for AI agents — coverage, semantics, governance and freshness, computed per domain and overall.' },
  { q: 'How is this different from a data catalog?', a: 'Catalogs describe data for humans. Datalith produces governed, agent-ready context and serves it over MCP — with per-agent identity and full audit.' },
  { q: 'How long does the audit take?', a: '48 hours from credentials to a board-ready readout: estate map, ARS, and the top opportunities sleeping in your data.' },
]

/** Accordion built on native details/summary — no state, works everywhere. */
export function FAQ({ label = 'Questions', title = 'Asked by every data leader.', items = DEFAULT_ITEMS }: FAQProps) {
  return (
    <section className="dl-faq">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <div className="dl-faq-list">
          {items.map((it, i) => (
            <details className="dl-faq-item" key={it.q}>
              <summary className="dl-faq-q">
                <span className="dl-faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dl-faq-qtext">{it.q}</span>
                <span className="dl-faq-toggle" aria-hidden="true">+</span>
              </summary>
              <p className="dl-faq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
