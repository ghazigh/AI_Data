import { STAGES, hrefFor } from '../navigation'
import { useDemoState } from '../state'
import { ESTATE } from '../data/tenant'
import { USE_CASES } from '../data/useCases'
import { Icon, ROUTE_ICON } from './Icon'

export function StageStrip({ prefix }: { prefix: string }) {
  const { sources, runs, allEntriesWithCreated } = useDemoState()
  const connectedCount = sources.filter(s => s.status === 'connected').length
  const blockedCount = USE_CASES.filter(u => u.status === 'blocked').length
  // Same running/available shape the Pipelines list itself reports in its
  // own count line (see Pipelines.tsx) — guarded against disagreeing in
  // crossScreen.test.tsx. allEntriesWithCreated(), not allEntries(), so a
  // pipeline created this session is counted here too.
  const runningCount = runs.filter(r => r.status === 'running').length
  const availableCount = allEntriesWithCreated().length

  // Derived from session state and the canon data, not hardcoded. All inputs
  // are stable on first render, so SSR and the client agree.
  const STATUS: Record<string, { text: string; tone: 'ok' | 'warn' }> = {
    connect: { text: `${connectedCount} sources live`, tone: 'ok' },
    ready: { text: `Scored ${ESTATE.score} / 100`, tone: 'ok' },
    // 'warn' only while something is actually running — amber for a healthy
    // idle system would itself be misleading.
    pipelines: {
      text: `${runningCount} running · ${availableCount} available`,
      tone: runningCount > 0 ? 'warn' : 'ok',
    },
    graph: { text: `${ESTATE.entitiesResolved} entities`, tone: 'ok' },
    search: { text: `${connectedCount} sources searchable`, tone: 'ok' },
    'use-cases': { text: `${USE_CASES.length} found · ${blockedCount} blocked`, tone: 'warn' },
  }

  return (
    <ol className="dm-stagestrip" aria-label="Product stages">
      {STAGES.map(r => {
        const s = STATUS[r.slug]
        return (
          <li key={r.slug}>
            <a className="dm-stage" href={hrefFor(r.slug, prefix)} data-demo-link>
              <span className="dm-stage-ix">{r.stage}<Icon name={ROUTE_ICON[r.slug]} size={14} /></span>
              <span>
                <span className="dm-stage-nm">{r.title}</span>
                <span className={`dm-stage-st is-${s.tone}`}>{s.text}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
