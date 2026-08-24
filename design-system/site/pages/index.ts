import type { ComponentType } from 'react'
import { Home } from './Home'
import { Platform } from './Platform'
import { Banking } from './Banking'
import { Pricing } from './Pricing'
import { Company } from './Company'
import { Investors } from './Investors'
import { NotFound } from './NotFound'

export interface PageDef {
  /** Output file name without extension; "index" is the home page. */
  slug: string
  title: string
  description: string
  Component: ComponentType
  /** Exclude from sitemap.xml (e.g. 404). */
  noindex?: boolean
}

export const PAGES: PageDef[] = [
  {
    slug: 'index',
    title: 'Datalith — The Agentic Data Center',
    description: 'Datalith connects every database, warehouse, wiki and app your company runs into one governed knowledge graph — then serves it to any AI agent, with a full audit trail. Free 48-hour Agent-Readiness Score.',
    Component: Home,
  },
  {
    slug: 'platform',
    title: 'Platform — Datalith',
    description: 'One platform, six stages: Connect, Ready, Pipelines, Graph, Search, Use cases — from 150+ read-only connectors to a searchable estate and the agent applications your data makes possible.',
    Component: Platform,
  },
  {
    slug: 'banking',
    title: 'Banking — Datalith',
    description: 'The agent list every bank already has — KYC file refresh, credit memo drafting, complaint assembly, alert triage, arrears follow-up, desk exposure briefings — and the readiness score, per banking domain, that decides which ones ship. Read-only, entitlements inherited, every agent read audited.',
    Component: Banking,
  },
  {
    slug: 'pricing',
    title: 'Pricing — Datalith',
    description: 'Free 48-hour Agent-Readiness Audit, Growth from $2.5K/mo, Scale from $6K/mo, Enterprise from $100K ACV. Priced on usage — sources, entities, agent calls.',
    Component: Pricing,
  },
  {
    slug: 'company',
    title: 'Company — Datalith',
    description: 'We make enterprise data ready for the agent workforce. The mission, the six principles, the roadmap from Audit to Platform, and the founding team.',
    Component: Company,
  },
  {
    slug: 'investors',
    title: 'Investors — Datalith seed round',
    description: 'Raising a $4M seed to build the Agentic Data Center: the thesis in three numbers, the market, the moat, the financial model, and the ask.',
    Component: Investors,
  },
  {
    slug: '404',
    title: 'Page not found — Datalith',
    description: 'This page isn’t in the graph.',
    Component: NotFound,
    noindex: true,
  },
]
