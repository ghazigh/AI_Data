import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { StatusPill, type PillTone } from '../components/StatusPill'
import { ScoreMeter } from '../components/charts/ScoreMeter'
import { TrendLine } from '../components/charts/TrendLine'
import { DomainBars } from '../components/charts/DomainBars'
import { DimensionRadar } from '../components/charts/DimensionRadar'
import { DOMAINS, ESTATE, domainByKey } from '../data/tenant'
import { sourceName } from '../data/sources'
import { DIMENSIONS, TREND, RED_FLAGS, type FlagSeverity } from '../data/readiness'
import type { DomainKey } from '../data/types'

const SEVERITY: Record<FlagSeverity, { tone: PillTone; label: string }> = {
  high: { tone: 'warn', label: 'High' },
  medium: { tone: 'neutral', label: 'Medium' },
  low: { tone: 'neutral', label: 'Low' },
}

export function Ready() {
  const [domain, setDomain] = useState<DomainKey | null>(null)
  const flags = domain ? RED_FLAGS.filter(f => f.domain === domain) : RED_FLAGS
  const onSelect = (key: DomainKey) => setDomain(d => (d === key ? null : key))
  const selected = domain ? domainByKey(domain) : undefined

  return (
    <>
      <PageHead eyebrow="Stage 02 — Ready" title="A score for how usable this estate is" />

      <div className="dm-grid2">
        <Panel title="Agent-readiness score">
          <ScoreMeter score={ESTATE.score} delta={ESTATE.scoreDelta} />
          <TrendLine points={TREND} ariaLabel="Estate score by quarter" />
        </Panel>

        <Panel title="Readiness by dimension">
          <DimensionRadar dimensions={DIMENSIONS} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Readiness by domain">
          <DomainBars domains={DOMAINS} onSelect={onSelect} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Red flags">
          {selected && (
            <p className="dm-flags-heading">
              Filtered to <b>{selected.name}</b>
            </p>
          )}
          <ul className="dm-flags">
            {flags.map(f => (
              <li key={f.id}>
                <StatusPill tone={SEVERITY[f.severity].tone} label={SEVERITY[f.severity].label} />
                <div>
                  <p className="dm-flag-t">{f.title}</p>
                  <p className="dm-flag-d">{f.detail} — {sourceName(f.sourceId)}</p>
                </div>
                <p className="dm-flag-count">
                  {f.count.toLocaleString('en-US')}
                  <small>{f.unit}</small>
                </p>
                <a className="dm-panel-link" href="../pipelines/" data-demo-link>Send to pipelines</a>
              </li>
            ))}
            {selected && flags.length === 0 && (
              <li className="dm-flags-empty">
                <p>
                  No red flags in {selected.name}. Its readiness score of {selected.score} reflects
                  coverage and freshness rather than defects to fix.
                </p>
                <button className="dm-panel-link" type="button" onClick={() => setDomain(null)}>
                  Show all red flags
                </button>
              </li>
            )}
          </ul>
        </Panel>
      </div>
    </>
  )
}
