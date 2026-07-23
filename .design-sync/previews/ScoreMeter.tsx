import { ScoreMeter } from '@datalith/ui'

export const Certified = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <ScoreMeter value={87} caption="Certified · full audit" />
  </div>
)

export const NeedsWork = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <ScoreMeter value={34} label="Agent-Readiness Score" caption="12 findings · remediation plan attached" />
  </div>
)
