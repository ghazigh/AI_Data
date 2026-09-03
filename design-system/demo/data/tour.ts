/**
 * The guided tour: the story a presenter tells over the demo, one step per
 * screen, in the order the product actually works. Each step is talking
 * points, not UI copy — what to say while the screen is up, and the one thing
 * worth clicking. The guide navigates between steps through the same router a
 * click would use, so the rail and breadcrumb always agree with the step.
 *
 * Fixed data: nothing here reads a clock or state, so the guide renders the
 * same on the server and after hydration.
 */
export interface TourStep {
  /** Route slug the step lives on. '' is the Overview. */
  slug: string
  /** Short name shown in the step list. */
  title: string
  /** The one-line claim this screen makes. */
  claim: string
  /** What to say — two or three sentences. */
  talk: string[]
  /** The interaction worth showing on this screen. */
  tryThis?: string
}

export const TOUR: TourStep[] = [
  {
    slug: '',
    title: 'The estate at a glance',
    claim: 'Every source, one score, one place to look.',
    talk: [
      'Meridian Assurance runs 38 systems across eight business domains. Datalith reads all of them, read-only, and scores how usable that data is for agents — 71 out of 100 today, up 6 this quarter.',
      'The six stages across the top are the product: connect, score, fix, map, ask, build. Everything on this screen is derived from the same data every other screen shows.',
    ],
    tryThis: 'Open “Needs attention” — each item is a real defect with a route to the screen that fixes it.',
  },
  {
    slug: 'connect',
    title: 'Connect every system',
    claim: 'No migration, no engineering project — credentials in, estate mapped.',
    talk: [
      '150+ connectors covering tables, documents, tickets, email, transcripts, images and streams. Nothing is written back and no data leaves the estate during a scan.',
      'Four systems are still awaiting read-only credentials. That is the only thing standing between them and a readiness score.',
    ],
    tryThis: 'Connect a source from the catalogue and watch it scan, score and join the estate in a few seconds.',
  },
  {
    slug: 'ready',
    title: 'Score agent-readiness',
    claim: 'A board-ready number, and the six defects behind it.',
    talk: [
      'Readiness is scored on five dimensions — completeness, freshness, consistency, semantic coverage and governance coverage — per source, per domain and for the whole estate.',
      'Every point below target has a named cause: unmasked PII in a broker portal, 41,208 duplicate policyholders, treaty PDFs that were never chunked. Each red flag routes straight into the pipeline that fixes it.',
    ],
    tryThis: 'Click a domain bar to filter the red flags to that domain.',
  },
  {
    slug: 'pipelines',
    title: 'Fix what the scan found',
    claim: 'Restructuring sized to this estate, not a generic ETL.',
    talk: [
      'Fifteen pipelines, three kinds: structuring turns each modality into agent-readable form, graph pipelines build and extend the knowledge graph, remediation pipelines fix the red flags.',
      'Rows group by what an operator actually asks — what is running, what failed, what runs on a schedule — with thirteen runs of history on every row.',
    ],
    tryThis: 'Open “Resolve duplicate policyholders”, configure a component, and run it. The monitor shows records and readiness moving live.',
  },
  {
    slug: 'graph',
    title: 'One map of the business',
    claim: 'The Enterprise Knowledge Graph — 2.4M entities, eight knowledge bases, any agent.',
    talk: [
      'Identity resolution turns three records of the same policyholder — Salesforce, Snowflake and Guidewire — into one entity with 98% confidence, with the evidence listed.',
      'Each knowledge base is a domain the graph named by itself, served to registered agents under policy and audit.',
    ],
    tryThis: 'Select a knowledge base to focus the graph, then click a node to see its properties and which system each one came from.',
  },
  {
    slug: 'search',
    title: 'Ask what data you have',
    claim: 'The estate answers with datasets, never with a guess.',
    talk: [
      'A business question in plain language — “do we hold anything on claim fraud?” — comes back as the datasets that carry it, where each lives, how big, how fresh and how ready.',
      'Attach a dataset as the reference and ask what is inside it. What the estate does not have, it says so.',
    ],
    tryThis: 'Ask one of the suggested questions, then attach a result and ask a follow-up.',
  },
  {
    slug: 'use-cases',
    title: 'Which agents to build',
    claim: 'Fourteen opportunities, ranked by payback, with the blocked ones explained.',
    talk: [
      'The graph is mined for the agent applications this data supports: sources, effort and projected impact attached. Seven are ready to build today, worth $8.1M a year.',
      'Five are blocked by a domain scoring under 70 — and each one names the domain, so the fix is a readiness project, not a research project.',
    ],
    tryThis: 'Open a blocked use case; the drawer names the domain holding it back and links to its readiness.',
  },
  {
    slug: 'governance',
    title: 'Who touched what',
    claim: 'Every agent scoped, every call logged, every denial cites its policy.',
    talk: [
      'Six registered agents across four frameworks, each scoped to named knowledge bases. Column-, row- and chunk-level policies are enforced on every read.',
      '184K agent calls in the last 30 days, 100% logged. The three denials each cite the exact rule that blocked them.',
    ],
    tryThis: 'Filter the audit log to denials — each one names the policy that fired.',
  },
]

/** Index of the step for a slug, or -1 if the slug has no step (a pipeline workspace, say). */
export const stepIndexFor = (slug: string): number => TOUR.findIndex(s => s.slug === slug)
