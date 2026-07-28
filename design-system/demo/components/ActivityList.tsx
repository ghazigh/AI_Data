import type { ActivityEntry } from '../data/activity'

/** The estate activity feed, shared by the Overview teaser and Governance's
 * full stream so the two never render the same data two different ways. */
export function ActivityList({ entries }: { entries: ActivityEntry[] }) {
  return (
    <ul className="dm-activity">
      {entries.map(a => (
        <li key={a.id}>
          <span className={`dm-dot is-${a.tone}`} aria-hidden="true" />
          <div>
            <p><b>{a.subject}</b> {a.detail}</p>
            <p className="dm-when">{a.when}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
