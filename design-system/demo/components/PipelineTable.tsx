import { DataTable, type Column } from './DataTable'
import { StatusPill, type PillTone } from './StatusPill'
import { hrefFor } from '../routes'
import type { CatalogueEntry, SectionKind } from '../data/pipelineCatalogue'
import { lastExecutionFor, type ExecutionStatus } from '../data/executions'
import { triggersFor } from '../data/triggers'
import { useDemoState } from '../state'

/** How a catalogue entry's kind reads, defined once — the table's Kind column
 * and a pipeline's own workspace header must always agree on the label. */
export const KIND_LABEL: Record<SectionKind, string> = {
  structuring: 'Structuring',
  graph: 'Graph',
  remediation: 'Remediation',
}

/** How an execution status looks, defined once — the pill beside a pipeline's
 * last-execution label must always agree with what that label itself says. */
export const executionStatusPill = (status: ExecutionStatus): { tone: PillTone; label: string } =>
  status === 'running' ? { tone: 'blue', label: 'Running' }
  : status === 'succeeded' ? { tone: 'ok', label: 'Succeeded' }
  : status === 'failed' ? { tone: 'warn', label: 'Failed' }
  : status === 'cancelled' ? { tone: 'neutral', label: 'Cancelled' }
  : { tone: 'neutral', label: 'Not yet run' }

export interface PipelineTableProps {
  entries: CatalogueEntry[]
  /** Depth-relative prefix, as written into every href in this table. */
  prefix: string
}

/**
 * The whole Pipelines screen, flattened to one table: every pipeline the
 * catalogue knows about, whatever kind it is, one row each. A row's name
 * links straight into that pipeline's own workspace — this table itself
 * offers no way to configure or start a run.
 */
export function PipelineTable({ entries, prefix }: PipelineTableProps) {
  const { runs, triggerEnabled } = useDemoState()

  const columns: Column<CatalogueEntry>[] = [
    {
      key: 'name',
      header: 'Name',
      sortValue: e => e.name,
      render: e => (
        <a href={hrefFor(`pipelines/${e.id}`, prefix)} data-demo-link>
          {e.name}
        </a>
      ),
    },
    {
      key: 'kind',
      header: 'Kind',
      sortValue: e => KIND_LABEL[e.kind],
      render: e => KIND_LABEL[e.kind],
    },
    {
      key: 'sources',
      header: 'Sources',
      align: 'end',
      sortValue: e => e.sourceIds.length,
      render: e => e.sourceIds.length,
    },
    {
      key: 'trigger',
      header: 'Trigger',
      render: e => {
        const schedule = triggersFor(e).find(t => t.kind === 'schedule')
        return schedule && triggerEnabled(schedule.id) ? schedule.label : 'Manual'
      },
    },
    {
      key: 'lastExecution',
      header: 'Last execution',
      render: e => {
        const execution = lastExecutionFor(e.id, runs)
        const pill = executionStatusPill(execution.status)
        return (
          <span className="dm-exec">
            <StatusPill tone={pill.tone} label={pill.label} />
            <span className="dm-exec-label">{execution.label}</span>
          </span>
        )
      },
    },
  ]

  return (
    <DataTable
      caption="Pipelines"
      columns={columns}
      rows={entries}
      rowKey={e => e.id}
      initialSort={{ key: 'name', dir: 'asc' }}
    />
  )
}
