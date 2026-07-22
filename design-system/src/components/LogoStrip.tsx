export interface LogoStripProps {
  title?: string
  /** Partner / connector names, rendered as quiet text marks. */
  items?: string[]
}

/** Mono-label strip of integration names divided by hairlines. */
export function LogoStrip({
  title = 'Connects to',
  items = ['Snowflake', 'Databricks', 'Postgres', 'Salesforce', 'SharePoint', 'Kafka', 'S3', 'Notion'],
}: LogoStripProps) {
  return (
    <section className="dl-logostrip">
      <div className="dl-wrap dl-logostrip-in">
        <span className="dl-logostrip-title">{title}</span>
        <ul className="dl-logostrip-items">
          {items.map(n => (<li key={n}>{n}</li>))}
        </ul>
      </div>
    </section>
  )
}
