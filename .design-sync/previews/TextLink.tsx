import { TextLink } from '@datalith/ui'

export const Default = () => (
  <div className="dl-root" style={{ padding: 24, display: 'flex', gap: 28 }}>
    <TextLink href="#method">read the method</TextLink>
    <TextLink href="#audit" arrow={false}>the 48h audit</TextLink>
  </div>
)
