import { Button } from '@datalith/ui'

export const Variants = () => (
  <div className="dl-root" style={{ padding: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button variant="blue">Run the 48h audit</Button>
    <Button variant="ink">Get a demo</Button>
    <Button variant="ghost">See the method</Button>
  </div>
)

export const Sizes = () => (
  <div className="dl-root" style={{ padding: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button variant="ink" size="sm">Small</Button>
    <Button variant="ink" size="md">Medium</Button>
    <Button variant="ink" size="lg">Large</Button>
  </div>
)

export const OnInk = () => (
  <div className="dl-root">
    <div className="dl-on-ink" style={{ padding: 24, display: 'flex', gap: 12 }}>
      <Button variant="blue">Run the 48h audit</Button>
      <Button variant="ghost">Talk to us</Button>
    </div>
  </div>
)
