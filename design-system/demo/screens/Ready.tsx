import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { StatusPill, type PillTone } from '../components/StatusPill'
import { ScoreMeter } from '../components/charts/ScoreMeter'
import { TrendLine } from '../components/charts/TrendLine'
import { DomainBars } from '../components/charts/DomainBars'
import { DimensionRadar } from '../components/charts/DimensionRadar'
import { DOMAINS, ESTATE, domainByKey } from '../data/tenant'
import { SOURCES } from '../data/sources'
import { DIMENSIONS, TREND, RED_FLAGS, type FlagSeverity } from '../data/readiness'
import type { DomainKey } from '../data/types'

const SEVERITY: Record<FlagSeverity, { tone: PillTone; label: string }> = {
  high: { tone: 'warn', label: 'High' },
  medium: { tone: 'neutral', label: 'Medium' },
  low: { tone: 'neutral', label: 'Low' },
}

const sourceName = (id: string): string => SOURCES.find(s => s.id === id)?.name ?? id

export function Ready() {
  const [domain, setDomain] = useState<DomainKey | null>(null)
  const flags = domain ? RED_FLAGS.filter(f => f.domain === domain) : RED_FLAGS
  const onSelect = (key: DomainKey) => setDomain(d => (d === key ? null : key))

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

      <div style={{ marginTop: 18 }}>
        <Panel title="Readiness by domain">
          <DomainBars domains={DOMAINS} onSelect={onSelect} />
        </Panel>
      </div>

      <div style={{ marginTop: 18 }}>
        <Panel title="Red flags">
          {domain && (
            <p className="dm-flags-heading">
              Filtered to <b>{domainByKey(domain)?.name}</b>
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
          </ul>
        </Panel>
      </div>
    </>
  )
}
