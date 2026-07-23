import { Badge } from '@datalith/ui'

export const Tones = () => (
  <div className="dl-root" style={{ padding: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Badge tone="blue">MCP-native</Badge>
    <Badge tone="neutral">150+ connectors</Badge>
    <Badge tone="ink">Enterprise</Badge>
    <Badge tone="ok">ARS 87</Badge>
    <Badge tone="warn">Ungoverned</Badge>
  </div>
)
