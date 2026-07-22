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
        <blockquote className="dl-quote-text">"{quote}"</blockquote>
        <figcaption className="dl-quote-attr">{name}{role && <span> · {role}</span>}</figcaption>
      </div>
    </section>
  )
}
