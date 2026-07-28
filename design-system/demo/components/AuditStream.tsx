import { DataTable, type Column } from './DataTable'
import { StatusPill } from './StatusPill'
import { AGENTS, POLICIES, type AuditEntry } from '../data/governance'

const agentName = (id: string): string => AGENTS.find(a => a.id === id)?.name ?? id
const policyRule = (id?: string): string => (id && POLICIES.find(p => p.id === id)?.rule) || '—'

const COLUMNS: Column<AuditEntry>[] = [
  { key: 'when', header: 'Time', render: e => <span className="dm-mono">{e.when}</span> },
  { key: 'agent', header: 'Agent', render: e => <span className="dm-mono">{agentName(e.agentId)}</span> },
  { key: 'query', header: 'Query', render: e => <span className="dm-mono dm-audit-query" title={e.query}>{e.query}</span> },
  { key: 'entities', header: 'Entities', render: e => e.entities },
  {
    key: 'decision',
    header: 'Decision',
    render: e =>
      e.decision === 'allowed'
        ? <StatusPill tone="ok" label="Allowed" />
        : <StatusPill tone="warn" label="Denied" />,
  },
  { key: 'policy', header: 'Policy', render: e => (e.decision === 'denied' ? policyRule(e.policyId) : '—') },
]

export function AuditStream({ entries }: { entries: AuditEntry[] }) {
  return <DataTable caption="Audit log" columns={COLUMNS} rows={entries} rowKey={e => e.id} />
}
