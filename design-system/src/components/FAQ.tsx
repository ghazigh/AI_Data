import { SectionLabel } from './SectionLabel'

export interface FAQProps {
  label?: string
  title?: string
  items?: { q: string; a: string }[]
}

const DEFAULT_ITEMS = [
  { q: 'What exactly am I buying?', a: 'One platform that runs five stages over your estate: it connects to every system read-only, scores how ready the data is for agents, proposes the restructuring that estate needs, builds it into one knowledge graph, then names the agents that graph makes possible. You pick a plan rather than buying stages à la carte — higher plans connect more sources, serve more agent queries, and add use-case recommendations and deeper governance.' },
  { q: 'How is this different from a data catalog, or from Glean?', a: 'A catalog describes data for people to find. Glean answers employee questions. Datalith prepares data for machines and serves it to agents as governed knowledge bases, with per-agent identity and a full audit trail.' },
  { q: 'Is access really read-only?', a: 'Yes. Datalith connects with scoped, read-only credentials; nothing writes back to your systems, and every read is logged in the audit trail.' },
  { q: 'What is the Agent-Readiness Score?', a: 'A 0–100 measure of how usable your data is for AI agents — how much of the estate is covered, how well it is defined, how well it is governed, and how fresh it is. Computed per business domain and estate-wide.' },
  { q: 'How long does the audit take?', a: '48 hours from credentials to a board-ready readout: your estate map, your score, and the top opportunities sleeping in your data.' },
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
