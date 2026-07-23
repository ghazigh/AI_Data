export interface QuoteProps {
  quote: string
  name: string
  role?: string
}

/** Editorial pull-quote set in display type with mono attribution. */
export function Quote({ quote, name, role }: QuoteProps) {
  return (
    <section className="dl-quote">
      <div className="dl-wrap">
        <figure className="dl-quote-fig">
          <blockquote className="dl-quote-text">&ldquo;{quote}&rdquo;</blockquote>
          <figcaption className="dl-quote-attr">{name}{role && <span> · {role}</span>}</figcaption>
        </figure>
      </div>
    </section>
  )
}
