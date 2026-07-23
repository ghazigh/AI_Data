import { Input } from '@datalith/ui'

export const Email = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 320 }}>
    <Input label="Work email" placeholder="you@company.com" type="email" />
  </div>
)

export const Text = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 320 }}>
    <Input label="Company" placeholder="Acme Corp" />
  </div>
)
