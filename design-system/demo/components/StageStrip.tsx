import { ROUTES, hrefFor } from '../routes'
import { useDemoState } from '../state'
import { ESTATE } from '../data/tenant'
import { PLAN } from '../data/pipelines'
import { USE_CASES } from '../data/useCases'

export function StageStrip({ prefix }: { prefix: string }) {
  const { sources } = useDemoState()
  const connectedCount = sources.filter(s => s.status === 'connected').length
  const blockedCount = USE_CASES.filter(u => u.status === 'blocked').length

  // Derived from session state and the canon data, not hardcoded — a source
  // connected mid-session or a plan step added later shows up here without
  // this component needing to change. All inputs are stable on first render
  // (SOURCES is the seed, PLAN and USE_CASES are static), so SSR and the
  // client agree.
  const STATUS: Record<string, { text: string; tone: 'ok' | 'warn' }> = {
    connect: { text: `${connectedCount} sources live`, tone: 'ok' },
    ready: { text: `Scored ${ESTATE.score} / 100`, tone: 'ok' },
    pipelines: { text: `1 running · ${PLAN.length} planned`, tone: 'warn' },
    graph: { text: `${ESTATE.entitiesResolved} entities`, tone: 'ok' },
    'use-cases': { text: `${USE_CASES.length} found · ${blockedCount} blocked`, tone: 'warn' },
  }

  return (
    <ol className="dm-stagestrip" aria-label="Product stages">
      {ROUTES.filter(r => r.stage).map(r => {
        const s = STATUS[r.slug]
        return (
          <li key={r.slug}>
            <a className="dm-stage" href={hrefFor(r.slug, prefix)} data-demo-link>
              <span className="dm-stage-ix">{r.stage}</span>
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
