import { Drawer } from './Drawer'
import { StatusPill } from './StatusPill'
import { domainByKey } from '../data/tenant'
import type { Source } from '../data/types'

const SUBSCORES = ['Completeness', 'Freshness', 'Consistency', 'Semantic coverage', 'Governance coverage']

export function SourceDrawer({ source, onClose }: { source: Source | null; onClose: () => void }) {
  if (!source) return null
  // Deterministic spread around the source score — no randomness.
  const offsets = [6, -4, 2, -9, 3]
  return (
    <Drawer open title={source.name} onClose={onClose}>
      <dl className="dm-deflist">
        <div><dt>Vendor</dt><dd>{source.vendor}</dd></div>
        <div><dt>Category</dt><dd>{source.category}</dd></div>
        <div><dt>Modalities</dt><dd>{source.modalities.join(' · ')}</dd></div>
        <div><dt>Records</dt><dd>{source.records.toLocaleString('en-US')}</dd></div>
        <div><dt>Last sync</dt><dd>{source.lastSync}</dd></div>
        <div><dt>Domains</dt><dd>{source.domains.map(d => domainByKey(d)?.name).join(' · ')}</dd></div>
        <div><dt>Status</dt><dd><StatusPill tone={source.status === 'connected' ? 'ok' : 'neutral'} label={source.status.replace('-', ' ')} /></dd></div>
      </dl>

      <h3 className="dm-drawer-sub">Readiness sub-scores</h3>
      <ul className="dm-bars">
        {SUBSCORES.map((label, i) => {
          const value = Math.max(0, Math.min(100, source.readiness + offsets[i]))
          return (
            <li className="dm-bar-row" key={label}>
              <span className="dm-bar-name">{label}</span>
              <span className="dm-bar"><i className={`dm-bar-fill${value < 70 ? ' is-under' : ''}`} style={{ width: `${value}%` }} /></span>
              <span className="dm-bar-score">{value}</span>
            </li>
          )
        })}
      </ul>
    </Drawer>
  )
}
