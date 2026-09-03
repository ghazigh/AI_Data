import { TOUR, stepIndexFor } from '../data/tour'
import { useNavigate } from '../navigation'
import { useShell } from '../shell'
import { Icon } from './Icon'

/**
 * The presenter's guide: the story over the demo, one step per screen, docked
 * bottom-right so it never covers what it is talking about. Closed it is a
 * single pill; open it is the current step's talking points and the one thing
 * worth clicking, with Previous and Next moving through the same router a click
 * on the rail would use — so the rail, the breadcrumb and the guide can never
 * disagree about where the demo is.
 *
 * A screen outside the tour (a pipeline's workspace) resolves to the step of
 * the screen it lives under, so the guide never goes blank mid-demo.
 */
export function DemoGuide({ current }: { current: string }) {
  const { guideOpen, setGuideOpen } = useShell()
  const navigate = useNavigate()

  const exact = stepIndexFor(current)
  const index = exact >= 0 ? exact : Math.max(0, stepIndexFor(current.split('/')[0]))
  const step = TOUR[index]
  const prev = index > 0 ? TOUR[index - 1] : null
  const next = index < TOUR.length - 1 ? TOUR[index + 1] : null

  if (!guideOpen) {
    return (
      <button type="button" className="dm-guide-pill" onClick={() => setGuideOpen(true)}>
        <Icon name="play" size={12} strokeWidth={2.2} />
        Guided tour
        <span className="dm-guide-pill-n">{index + 1}/{TOUR.length}</span>
      </button>
    )
  }

  return (
    <aside className="dm-guide" aria-label="Guided tour">
      <header className="dm-guide-h">
        <div>
          <p className="dm-guide-k">Guided tour · step {index + 1} of {TOUR.length}</p>
          <ol className="dm-guide-dots" aria-label="Tour steps">
            {TOUR.map((s, i) => (
              <li key={s.slug}>
                <button
                  type="button"
                  className={i === index ? 'is-on' : i < index ? 'is-done' : undefined}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => navigate(s.slug)}
                />
              </li>
            ))}
          </ol>
        </div>
        <button type="button" className="dm-iconbtn is-quiet" onClick={() => setGuideOpen(false)} aria-label="Close the guide">
          <Icon name="x" size={14} />
        </button>
      </header>

      <div className="dm-guide-b">
        <h2 className="dm-guide-t">{step.title}</h2>
        <p className="dm-guide-claim">{step.claim}</p>
        {step.talk.map((t, i) => <p key={i} className="dm-guide-p">{t}</p>)}
        {step.tryThis && (
          <p className="dm-guide-try">
            <span className="dm-guide-try-k"><Icon name="zap" size={12} strokeWidth={2.2} /> Try this</span>
            {step.tryThis}
          </p>
        )}
      </div>

      <footer className="dm-guide-f">
        <button type="button" className="dm-btn is-ghost is-sm" disabled={!prev} onClick={() => prev && navigate(prev.slug)}>
          <Icon name="chevron-left" size={14} /> {prev ? prev.title : 'Start'}
        </button>
        {next ? (
          <button type="button" className="dm-btn is-ink is-sm" onClick={() => navigate(next.slug)}>
            {next.title} <Icon name="chevron-right" size={14} />
          </button>
        ) : (
          <button type="button" className="dm-btn is-ink is-sm" onClick={() => navigate('')}>
            Back to the overview <Icon name="refresh" size={13} />
          </button>
        )}
      </footer>
    </aside>
  )
}
