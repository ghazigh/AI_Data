import { ROUTES, hrefFor } from '../routes'
import { TENANT } from '../data/tenant'

export interface RailProps { current: string; prefix: string }

const MARK = (
  <svg width="26" height="19" viewBox="0 0 28 20" fill="none" aria-hidden="true">
    <path d="M0 3 C8 3, 10 10, 16 10" stroke="currentColor" strokeWidth="1.4" />
    <path d="M0 10 L16 10" stroke="currentColor" strokeWidth="1.4" />
    <path d="M0 17 C8 17, 10 10, 16 10" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 10 L28 10" stroke="var(--dl-blue-bright)" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

function RailLink({ route, current, prefix }: { route: typeof ROUTES[number]; current: string; prefix: string }) {
  const on = route.slug === current
  return (
    <li>
      <a
        className={`dm-rail-link${on ? ' is-on' : ''}`}
        href={hrefFor(route.slug, prefix)}
        aria-current={on ? 'page' : undefined}
        data-demo-link
      >
        <span className="dm-rail-ix" aria-hidden="true">{route.stage ?? '◇'}</span>
        <span>{route.title}</span>
      </a>
    </li>
  )
}

export function Rail({ current, prefix }: RailProps) {
  const overview = ROUTES[0]
  const stages = ROUTES.filter(r => r.stage)
  const control = ROUTES.filter(r => !r.stage && r.slug !== '')

  return (
    <aside className="dm-rail">
      <a className="dm-rail-logo" href={hrefFor('', prefix)} data-demo-link>
        {MARK}<span>datalith</span>
      </a>
      <span className="dm-demo-tag">Demo · sample data</span>

      <nav aria-label="Demo screens">
        <ul className="dm-rail-group">
          <RailLink route={overview} current={current} prefix={prefix} />
        </ul>
        <p className="dm-rail-heading">The pipeline</p>
        <ul className="dm-rail-group">
          {stages.map(r => <RailLink key={r.slug} route={r} current={current} prefix={prefix} />)}
        </ul>
        <p className="dm-rail-heading">Control</p>
        <ul className="dm-rail-group">
          {control.map(r => <RailLink key={r.slug} route={r} current={current} prefix={prefix} />)}
        </ul>
      </nav>

      <div className="dm-rail-foot">
        <a className="dm-rail-cta" href={`${prefix}../index.html#audit`}>Start your free audit</a>
        <p className="dm-rail-who">{TENANT.viewer.name}</p>
        <p className="dm-rail-role">{TENANT.viewer.role}</p>
      </div>
    </aside>
  )
}
