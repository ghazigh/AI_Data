import { Logo } from '@datalith/ui'

export const Default = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <Logo size={22} />
  </div>
)

export const WordmarkOnly = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <Logo size={22} withGlyph={false} />
  </div>
)

export const OnInk = () => (
  <div className="dl-root">
    <div style={{ background: '#101013', padding: 24 }}>
      <Logo size={22} onInk />
    </div>
  </div>
)
