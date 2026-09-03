import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { StatusPill, type PillTone } from '../components/StatusPill'
import { ScoreRing } from '../components/charts/ScoreRing'
import { TrendLine } from '../components/charts/TrendLine'
import { DomainBars } from '../components/charts/DomainBars'
import { Meter } from '../components/telemetry/Meter'
import { DOMAINS, ESTATE, domainByKey } from '../data/tenant'
import { sourceName } from '../data/sources'
import { DIMENSIONS, TREND, RED_FLAGS, type FlagSeverity } from '../data/readiness'
import type { DomainKey } from '../data/types'

const SEVERITY: Record<FlagSeverity, { tone: PillTone; label: string }> = {
  high: { tone: 'warn', label: 'High' },
  medium: { tone: 'neutral', label: 'Medium' },
  low: { tone: 'neutral', label: 'Low' },
}

/** What each dimension measures, said once beside its score — a buyer reads
 * "Semantic coverage 58" as a fact only once they know what it would take to
 * move it. */
const DIMENSION_NOTE: Record<string, string> = {
  Completeness: 'Required fields populated across the estate',
  Freshness: 'How recently each source was synced against its cadence',
  Consistency: 'Identities and codes that agree between systems',
  'Semantic coverage': 'Columns and chunks carrying a business meaning',
  'Governance coverage': 'Records under a policy an agent can be held to',
}

const DOMAINS_BELOW = DOMAINS.filter(d => d.score < 70).length
const WEAKEST = [...DIMENSIONS].sort((a, b) => a.value - b.value)[0]

export function Ready() {
  const [domain, setDomain] = useState<DomainKey | null>(null)
  const flags = domain ? RED_FLAGS.filter(f => f.domain === domain) : RED_FLAGS
  const onSelect = (key: DomainKey) => setDomain(d => (d === key ? null : key))
  const selected = domain ? domainByKey(domain) : undefined

  return (
    <>
      <PageHead
        eyebrow="Stage 02 — Ready"
        title="A score for how usable this estate is"
        lead="Scored continuously on five dimensions, per source, per domain and for the whole estate — with every point lost traced to a defect a pipeline can fix."
      />

      <div className="dm-grid2">
        <Panel title="Agent-readiness score" tone="ink" eyebrow="Estate · all domains">
          <div className="dm-score-split">
            <ScoreRing score={ESTATE.score} target={ESTATE.scoreTarget} delta={ESTATE.scoreDelta} tone="ink" size={186} caption="Agent-ready" />
            <div className="dm-score-side">
              <p className="dm-score-note">
                Target <b>{ESTATE.scoreTarget}</b> by Q4. <b>{DOMAINS_BELOW} of {DOMAINS.length}</b> domains sit under the 70 an
                agent binding needs; <b>{WEAKEST.label.toLowerCase()}</b> is the dimension holding the estate back.
              </p>
              <TrendLine points={TREND} ariaLabel="Estate score by quarter" />
            </div>
          </div>
        </Panel>

        <Panel title="Readiness by dimension" eyebrow="What the score is made of">
          <ul className="dm-dims" aria-label="Readiness dimensions">
            {DIMENSIONS.map(d => (
              <li className="dm-dim" key={d.label}>
                <div>
                  <p className="dm-dim-l">{d.label}<small>{DIMENSION_NOTE[d.label]}</small></p>
                  <Meter value={d.value} target={70} tone={d.value < 70 ? 'under' : 'default'} />
                </div>
                <b>{d.value}</b>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Readiness by domain" eyebrow="Select a domain to filter its red flags">
          <DomainBars domains={DOMAINS} onSelect={onSelect} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Red flags" eyebrow={`${RED_FLAGS.length} defects · each with a pipeline that fixes it`}>
          {selected && (
            <p className="dm-flags-heading">
              Filtered to <b>{selected.name}</b>
            </p>
          )}
          <ul className="dm-flags">
            {flags.map(f => (
              <li key={f.id} className={`is-${f.severity}`}>
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
