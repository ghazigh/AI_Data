import { Logo } from './Logo'

export interface FooterProps {
  columns?: { title: string; links: { label: string; href: string }[] }[]
  note?: string
}

const DEFAULT_COLUMNS = [
  { title: 'Product', links: [ { label: 'Platform', href: '#platform' }, { label: 'The 48h audit', href: '#audit' }, { label: 'Pricing', href: '#pricing' } ] },
  { title: 'Company', links: [ { label: 'Method', href: '#method' }, { label: 'Writing', href: '#writing' }, { label: 'Contact', href: '#contact' } ] },
  { title: 'Trust', links: [ { label: 'Security', href: '#security' }, { label: 'Audit trail', href: '#trail' }, { label: 'Privacy', href: '#privacy' } ] },
]

/** Ink footer: wordmark, quiet link columns, one mono legal line. */
export function Footer({ columns = DEFAULT_COLUMNS, note = '© 2026 Datalith. Every source. One graph. Agent-ready.' }: FooterProps) {
  return (
    <footer className="dl-footer dl-on-ink">
      <div className="dl-wrap dl-footer-in">
        <div className="dl-footer-brand"><Logo /></div>
        <div className="dl-footer-cols">
          {columns.map(c => (
            <div className="dl-footer-col" key={c.title}>
              <span className="dl-footer-coltitle">{c.title}</span>
              <ul>{c.links.map(l => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="dl-wrap dl-footer-note">{note}</div>
    </footer>
  )
}
