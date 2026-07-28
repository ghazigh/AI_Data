import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { StatTile } from '../components/StatTile'
import { DataTable, type Column } from '../components/DataTable'
import { StatusPill } from '../components/StatusPill'
import { AuditStream } from '../components/AuditStream'
import { ActivityList } from '../components/ActivityList'
import { AGENTS, POLICIES, AUDIT, type AgentRecord, type PolicyLevel } from '../data/governance'
import { ACTIVITY } from '../data/activity'
import { ESTATE, domainByKey } from '../data/tenant'

const LEVEL_LABEL: Record<PolicyLevel, string> = {
  column: 'Column-level',
  row: 'Row-level',
  chunk: 'Chunk-level',
}

const LEVELS: PolicyLevel[] = ['column', 'row', 'chunk']

const AGENT_COLUMNS: Column<AgentRecord>[] = [
  { key: 'name', header: 'Agent', render: a => a.name },
  { key: 'owner', header: 'Owner', render: a => a.owner },
  { key: 'framework', header: 'Framework', render: a => a.framework },
  {
    key: 'scopes',
    header: 'Scopes',
    render: a => (
      <span className="dm-scopes">
        {a.scopes.map(s => (
          <StatusPill key={s} tone="neutral" label={domainByKey(s)?.name ?? s} />
        ))}
      </span>
    ),
  },
  { key: 'calls', header: 'Calls (30d)', align: 'end', render: a => a.calls },
  { key: 'denials', header: 'Denials', align: 'end', render: a => String(a.denials) },
  { key: 'lastSeen', header: 'Last seen', render: a => a.lastSeen },
]

const deniedCount = AUDIT.filter(e => e.decision === 'denied').length

export function Governance() {
  return (
    <>
      <PageHead eyebrow="Control" title="Who can touch what, and what they did" />

      <div className="dm-tiles is-3">
        <StatTile label="Agents registered" value={String(AGENTS.length)}
          sub="Every registered agent scoped to named domains" />
        <StatTile label="Agent calls (30 days)" value={ESTATE.agentCalls}
          sub="100% logged to audit" />
        <StatTile label="Denials" value={String(deniedCount)}
          sub="Every denial cites the policy that blocked it" />
      </div>

      <div className="dm-section">
        <Panel title="Agents">
          <DataTable caption="Agents" columns={AGENT_COLUMNS} rows={AGENTS} rowKey={a => a.id} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Policies">
          <div>
            {LEVELS.map(level => {
              const rules = POLICIES.filter(p => p.level === level)
              if (rules.length === 0) return null
              return (
                <div key={level} className="dm-policy-group">
                  <p className="dm-policy-level">{LEVEL_LABEL[level]}</p>
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
        <Panel title="Audit log">
          <AuditStream entries={AUDIT} />
        </Panel>
      </div>

      <div className="dm-section">
        {/* The full 12-entry feed Overview's "Full stream" link promises —
            Overview itself only teases the first 7, to keep its two-column
            layout balanced against the 5-row domain panel beside it. */}
        <Panel eyebrow="Live" title="Estate activity">
          <ActivityList entries={ACTIVITY} />
        </Panel>
      </div>
    </>
  )
}
