import { CTABand } from '@datalith/ui'

export const Default = () => (
  <div className="dl-root">
    <CTABand />
  </div>
)

export const CopyOnly = () => (
  <div className="dl-root">
    <CTABand
      headline="Ready when your data is."
      lead="Start with the free 48-hour audit — read-only credentials, board-ready score."
      withFigure={false}
    />
  </div>
)
