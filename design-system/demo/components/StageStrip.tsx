import { ROUTES, hrefFor } from '../routes'

const STATUS: Record<string, { text: string; tone: 'ok' | 'warn' }> = {
  connect: { text: '34 sources live', tone: 'ok' },
  ready: { text: 'Scored 71 / 100', tone: 'ok' },
  pipelines: { text: '2 runs queued', tone: 'warn' },
  graph: { text: '2.4M entities', tone: 'ok' },
  'use-cases': { text: '14 found · 5 blocked', tone: 'warn' },
}

export function StageStrip({ prefix }: { prefix: string }) {
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
