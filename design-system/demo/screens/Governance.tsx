import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { DataTable, type Column } from '../components/DataTable'
import { StatusPill } from '../components/StatusPill'
import { AuditStream } from '../components/AuditStream'
import { AGENTS, POLICIES, AUDIT, type AgentRecord, type PolicyLevel } from '../data/governance'
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
        <div className="dm-tile">
          <p className="dm-eyebrow">Agents registered</p>
          <p className="dm-tile-v">{AGENTS.length}</p>
          <p className="dm-tile-sub">Every registered agent scoped to named domains</p>
        </div>
        <div className="dm-tile">
          <p className="dm-eyebrow">Agent calls (30 days)</p>
          <p className="dm-tile-v">{ESTATE.agentCalls}</p>
          <p className="dm-tile-sub">100% logged to audit</p>
        </div>
        <div className="dm-tile">
          <p className="dm-eyebrow">Denials</p>
          <p className="dm-tile-v">{deniedCount}</p>
          <p className="dm-tile-sub">Every denial cites the policy that blocked it</p>
        </div>
      </div>

      <div className="dm-section">
        <Panel title="Agents">
          <DataTable caption="Agents" columns={AGENT_COLUMNS} rows={AGENTS} rowKey={a => a.id} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Policies">
          <div className="dm-policies">
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
    </>
  )
}
