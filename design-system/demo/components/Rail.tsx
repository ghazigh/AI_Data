import { ROUTES, hrefFor } from '../routes'
import { TENANT } from '../data/tenant'
import { Icon, ROUTE_ICON } from './Icon'
import { monogram } from './VendorMark'

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
  // A workspace under /pipelines/ keeps the Pipelines link lit — the operator
  // is still inside that screen's territory.
  const on = route.slug === current || (route.slug !== '' && current.startsWith(`${route.slug}/`))
  return (
    <li>
      <a
        className={`dm-rail-link${on ? ' is-on' : ''}`}
        href={hrefFor(route.slug, prefix)}
        aria-current={on ? 'page' : undefined}
        data-demo-link
      >
        <span className="dm-rail-ic"><Icon name={ROUTE_ICON[route.slug] ?? 'layers'} size={15} /></span>
        <span className="dm-rail-lbl">{route.title}</span>
        {route.stage && <span className="dm-rail-ix" aria-hidden="true">{route.stage}</span>}
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
      <div className="dm-rail-top">
        <a className="dm-rail-logo" href={hrefFor('', prefix)} data-demo-link>
          {MARK}<span>datalith</span>
        </a>
        <span className="dm-demo-tag">Demo · sample data</span>
      </div>

      {/* The workspace this console is signed into. Static in the demo — there is
          one tenant — but shaped like the switcher a real console carries, so a
          prospect reads it as their own company's seat. */}
      <div className="dm-tenant">
        <span className="dm-tenant-mark" aria-hidden="true">{monogram(TENANT.name)}</span>
        <span className="dm-tenant-body">
          <span className="dm-tenant-name">{TENANT.name}</span>
          <span className="dm-tenant-env"><i aria-hidden="true" />Production · {TENANT.scope}</span>
        </span>
        <span className="dm-tenant-chev"><Icon name="chevrons-updown" size={14} /></span>
      </div>

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
        <a className="dm-rail-cta" href={`${prefix}../index.html#audit`}>
          <span className="dm-rail-cta-k">Your own estate</span>
          <span className="dm-rail-cta-t">Start your free audit <Icon name="arrow-up-right" size={13} /></span>
        </a>
        <div className="dm-rail-user">
          <span className="dm-avatar" aria-hidden="true">{monogram(TENANT.viewer.name)}</span>
          <span>
            <p className="dm-rail-who">{TENANT.viewer.name}</p>
            <p className="dm-rail-role">{TENANT.viewer.role}</p>
          </span>
        </div>
      </div>
    </aside>
  )
}
