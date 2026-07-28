import { Drawer } from './Drawer'
import { domainByKey } from '../data/tenant'
import { SOURCES } from '../data/sources'
import type { UseCase } from '../data/useCases'

const sourceName = (id: string): string => SOURCES.find(s => s.id === id)?.name ?? id

export function UseCaseDrawer({ useCase, onClose }: { useCase: UseCase | null; onClose: () => void }) {
  if (!useCase) return null
  const blockedDomain = useCase.blockedBy ? domainByKey(useCase.blockedBy) : undefined

  return (
    <Drawer open title={useCase.name} onClose={onClose}>
      {useCase.status === 'blocked' && blockedDomain && (
        <div className="dm-blocked">
          <p className="dm-eyebrow">Blocked</p>
          <p>
            <b>{blockedDomain.name}</b> scores <b>{blockedDomain.score}</b> — below the 70 this
            use case needs. Raise it and this becomes buildable.
          </p>
          <a className="dm-panel-link" href="../ready/" data-demo-link>Open its readiness</a>
        </div>
      )}

      <p className="dm-uc-summary">{useCase.summary}</p>

      <h3 className="dm-drawer-sub">Data bindings</h3>
      <ul className="dm-bindings">
        {useCase.sourceIds.map(id => (
          <li key={id}>{sourceName(id)}</li>
        ))}
      </ul>

      <div className="dm-stat-row">
        <div className="dm-stat">
          <p className="dm-eyebrow">Projected impact</p>
          <p className="dm-stat-v">{useCase.impact}</p>
        </div>
        <div className="dm-stat">
          <p className="dm-eyebrow">Effort</p>
          <p className="dm-stat-v">{useCase.effort}</p>
        </div>
      </div>

      <h3 className="dm-drawer-sub">Guardrails</h3>
      <ul className="dm-guardrails">
        {useCase.guardrails.map(g => (
          <li key={g}>{g}</li>
        ))}
      </ul>

      <h3 className="dm-drawer-sub">Eval set</h3>
      <p className="dm-evalset">142 labelled examples · 89% pass required</p>

      <h3 className="dm-drawer-sub">Export to</h3>
      <div className="dm-exports">
        {useCase.exports.map(target => (
          <span className="dm-pill is-neutral" key={target}>{target}</span>
        ))}
      </div>
    </Drawer>
  )
}
