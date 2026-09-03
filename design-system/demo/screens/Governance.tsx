import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { DataTable, type Column } from '../components/DataTable'
import { StatusPill } from '../components/StatusPill'
import { AuditStream } from '../components/AuditStream'
import { ActivityList } from '../components/ActivityList'
import { Icon, type IconName } from '../components/Icon'
import { VendorMark } from '../components/VendorMark'
import { AGENTS, POLICIES, AUDIT, type AgentRecord, type PolicyLevel } from '../data/governance'
import { ACTIVITY } from '../data/activity'
import { ESTATE, domainByKey } from '../data/tenant'

const LEVEL_LABEL: Record<PolicyLevel, string> = {
  column: 'Column-level',
  row: 'Row-level',
  chunk: 'Chunk-level',
}
const LEVEL_ICON: Record<PolicyLevel, IconName> = { column: 'table', row: 'list', chunk: 'file-text' }
const LEVELS: PolicyLevel[] = ['column', 'row', 'chunk']

const AGENT_COLUMNS: Column<AgentRecord>[] = [
  { key: 'name', header: 'Agent', render: a => (
    <span className="dm-agent-cell"><VendorMark name={a.framework} size="sm" /><b>{a.name}</b></span>
  ) },
  { key: 'owner', header: 'Owner', render: a => a.owner },
  { key: 'framework', header: 'Framework', render: a => <span className="dm-muted">{a.framework}</span> },
  {
    key: 'scopes',
    header: 'Scopes',
    render: a => (
      <span className="dm-scopes">
        {a.scopes.map(s => (
          <span key={s} className="dm-tag">{domainByKey(s)?.name ?? s}</span>
        ))}
      </span>
    ),
  },
  { key: 'calls', header: 'Calls (30d)', align: 'end', render: a => <b>{a.calls}</b> },
  { key: 'denials', header: 'Denials', align: 'end', render: a => (
    a.denials > 0 ? <StatusPill tone="warn" label={String(a.denials)} /> : <span className="dm-muted">0</span>
  ) },
  { key: 'lastSeen', header: 'Last seen', render: a => <span className="dm-muted">{a.lastSeen}</span> },
]

const deniedCount = AUDIT.filter(e => e.decision === 'denied').length
const allowedPct = Math.round(((AUDIT.length - deniedCount) / AUDIT.length) * 100)

type Decision = 'allowed' | 'denied'

export function Governance() {
  const [decision, setDecision] = useState<Decision | null>(null)
  const shown = decision ? AUDIT.filter(e => e.decision === decision) : AUDIT

  return (
    <>
      <PageHead
        eyebrow="Control"
        title="Who can touch what, and what they did"
        lead="Every registered agent is scoped to named knowledge bases, every read is checked against column-, row- and chunk-level policy, and every decision is logged."
      />

      <div className="dm-tiles is-3">
        <div className="dm-tile">
          <div className="dm-tile-head"><p className="dm-eyebrow">Agents registered</p><span className="dm-tile-ic"><Icon name="users" size={14} /></span></div>
          <p className="dm-tile-v">{AGENTS.length}</p>
          <p className="dm-tile-sub">Every registered agent scoped to named domains</p>
        </div>
        <div className="dm-tile is-accent">
          <div className="dm-tile-head"><p className="dm-eyebrow">Agent calls (30 days)</p><span className="dm-tile-ic"><Icon name="activity" size={14} /></span></div>
          <p className="dm-tile-v">{ESTATE.agentCalls}</p>
          <p className="dm-tile-sub">100% logged to audit · {allowedPct}% of the sampled log allowed</p>
          <div className="dm-mix" aria-hidden="true">
            <i className="is-ok" style={{ width: `${allowedPct}%` }} />
            <i className="is-warn" style={{ width: `${100 - allowedPct}%` }} />
          </div>
        </div>
        <div className="dm-tile is-warn">
          <div className="dm-tile-head"><p className="dm-eyebrow">Denials</p><span className="dm-tile-ic"><Icon name="lock" size={14} /></span></div>
          <p className="dm-tile-v">{deniedCount}</p>
          <p className="dm-tile-sub">Every denial cites the policy that blocked it</p>
        </div>
      </div>

      <div className="dm-section">
        <Panel title="Agents" eyebrow="Registered · scoped · metered">
          <DataTable caption="Agents" columns={AGENT_COLUMNS} rows={AGENTS} rowKey={a => a.id} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Policies" eyebrow="Enforced on every read, at the level the data needs">
          <div className="dm-policies">
            {LEVELS.map(level => {
              const rules = POLICIES.filter(p => p.level === level)
              if (rules.length === 0) return null
              return (
                <div key={level} className="dm-policy-group">
                  <p className="dm-policy-level"><Icon name={LEVEL_ICON[level]} size={13} />{LEVEL_LABEL[level]}</p>
                  <ul>
                    {rules.map(p => (
                      <li key={p.id}>
                        <div>
                          <p className="dm-policy-rule">{p.rule}</p>
                          <p className="dm-policy-applies">{p.applies}</p>
                        </div>
                        <p className="dm-policy-enforced">{p.enforcedOn}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      <div className="dm-section">
        <Panel
          title="Audit log"
          eyebrow="Every agent read, with the decision and the rule behind it"
          action={
            <div className="dm-filter-group" role="group" aria-label="Decision">
              {(['allowed', 'denied'] as Decision[]).map(d => (
                <button
                  key={d}
                  type="button"
                  className={`dm-filter-chip${decision === d ? ' is-on' : ''}`}
                  aria-pressed={decision === d}
                  onClick={() => setDecision(cur => (cur === d ? null : d))}
                >
                  {d}
                </button>
              ))}
            </div>
          }
        >
          <AuditStream entries={shown} />
        </Panel>
      </div>

      <div className="dm-section">
        {/* The full 12-entry feed Overview's "Full stream" link promises. */}
        <Panel eyebrow="Live" title="Estate activity" tone="ink">
          <ActivityList entries={ACTIVITY} />
        </Panel>
      </div>
    </>
  )
}
