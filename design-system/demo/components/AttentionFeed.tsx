import { RED_FLAGS } from '../data/readiness'
import { USE_CASES } from '../data/useCases'
import { DOMAINS } from '../data/tenant'
import { lastExecutionFor } from '../data/executions'
import { sourceName } from '../data/sources'
import { useDemoState } from '../state'
import { Icon, type IconName } from './Icon'

export type AttentionTone = 'fail' | 'warn' | 'info'

export interface AttentionItem {
  id: string
  tone: AttentionTone
  icon: IconName
  title: string
  detail: string
  /** Route slug the fix lives on. */
  slug: string
  action: string
}

/**
 * What needs a person, derived — never listed by hand — from the same canon
 * every other screen reads: a pipeline whose last run failed, the high-severity
 * red flags, sources still awaiting credentials, and the use cases a low domain
 * score is holding back. Each item routes to the screen that fixes it, which
 * is the whole point: a console that only reports is a dashboard, one that
 * tells you the next move is a product.
 *
 * Pure function of state, so a run started this session or a source connected
 * mid-demo changes the list without this module needing to know.
 */
export const attentionItems = (
  runs: Parameters<typeof lastExecutionFor>[1],
  entries: { id: string; name: string }[],
  sources: { status: string }[],
): AttentionItem[] => {
  const items: AttentionItem[] = []

  for (const e of entries) {
    const ex = lastExecutionFor(e.id, runs)
    if (ex.status === 'failed') {
      items.push({
        id: `run-${e.id}`, tone: 'fail', icon: 'workflow',
        title: `${e.name} failed ${ex.label}`,
        detail: 'Its last run stopped mid-way. Open the workspace to see the stage it died at and re-run.',
        slug: `pipelines/${e.id}`, action: 'Open pipeline',
      })
    }
  }

  for (const f of RED_FLAGS.filter(f => f.severity === 'high')) {
    items.push({
      id: `flag-${f.id}`, tone: 'warn', icon: 'flag',
      title: f.title,
      detail: `${f.count.toLocaleString('en-US')} ${f.unit} in ${sourceName(f.sourceId)} — a remediation pipeline already exists for it.`,
      slug: 'ready', action: 'See red flag',
    })
  }

  const pending = sources.filter(s => s.status === 'pending-credentials').length
  if (pending > 0) {
    items.push({
      id: 'pending', tone: 'info', icon: 'plug',
      title: `${pending} sources awaiting read-only credentials`,
      detail: 'Nothing else is needed to score them. Each becomes searchable and graph-ready within the hour of connecting.',
      slug: 'connect', action: 'Connect',
    })
  }

  const blocked = USE_CASES.filter(u => u.status === 'blocked')
  if (blocked.length > 0) {
    const domains = [...new Set(blocked.map(u => u.blockedBy))]
      .map(k => DOMAINS.find(d => d.key === k))
      .filter((d): d is NonNullable<typeof d> => d != null)
    const value = blocked.reduce((sum, u) => sum + u.impactValue, 0)
    items.push({
      id: 'blocked', tone: 'info', icon: 'sparkles',
      title: `${blocked.length} use cases blocked by ${domains.length} domains under 70`,
      detail: `${domains.map(d => `${d.name} (${d.score})`).join(', ')} — lifting them unlocks $${(value / 1_000_000).toFixed(1)}M a year in projected impact.`,
      slug: 'use-cases', action: 'See what is blocked',
    })
  }

  return items
}

export function AttentionFeed({ prefix, limit = 5 }: { prefix: string; limit?: number }) {
  const { runs, sources, allEntriesWithCreated } = useDemoState()
  const items = attentionItems(runs, allEntriesWithCreated(), sources)
  const shown = items.slice(0, limit)

  return (
    <>
      <ul className="dm-attn" aria-label="Needs attention">
        {shown.map(item => (
          <li key={item.id} className={`is-${item.tone}`}>
            <span className="dm-attn-ic"><Icon name={item.icon} size={15} /></span>
            <div>
              <p className="dm-attn-t">{item.title}</p>
              <p className="dm-attn-d">{item.detail}</p>
            </div>
            <a className="dm-panel-link" href={`${prefix}${item.slug}/`} data-demo-link>{item.action}</a>
          </li>
        ))}
      </ul>
      {items.length > shown.length && (
        <p className="dm-attn-all">{items.length - shown.length} more on the screens they belong to.</p>
      )}
    </>
  )
}
