# Product Strategy — Datalith, The Agentic Data Center

## One-liner

**Datalith connects every data source in the enterprise, builds the Enterprise Knowledge Graph, and serves governed, agent-ready data to any AI agent — while recommending the agentic workflows the data itself makes possible.**

Category name we are claiming: **the Agentic Data Center** — the layer between the enterprise data estate and the agent workforce. (Analogy pitch: "JetScale is agentic AI for your cloud. Datalith is agentic AI for your data.")

## The two promises (core value proposition)

1. **See everything — visibility, transparency, control.** Clients have data everywhere and no visibility on what they have or what's happening in their databases. Datalith maps the entire estate into one live dashboard: what exists and where it lives (estate map), what's changing/going stale/breaking (activity stream), and who — human or agent — can touch what (access control + full audit).
2. **Make it work for agents — agent-ready, potential unlocked.** Every modality (tables, documents, tickets, transcripts, images) is prepared for agent consumption: cleaned, typed, chunked, embedded, scored. Then Datalith goes further — it **detects the potential sleeping in the data** and **suggests the agentic workflows and topic knowledge bases** to build, with projected ROI.

Elevator line: *"First we show you what you have. Then we turn it into an agent workforce."*

## Product principles

1. **Agent-native, human-governed.** Agents are the primary consumers; humans set policy, review, and approve.
2. **Read-only by default.** Like JetScale's wedge: connect with read-only credentials, produce value before asking for write access. Kills the #1 security objection.
3. **Meet the estate where it is.** No migration. No "move your data to us." Federate, index, and prepare in place; materialize only what serving requires.
4. **Protocol-open.** MCP first; adapters for A2A, OpenAI tool calling, LangChain/LlamaIndex/CrewAI SDKs. The graph is the asset; wire formats are commodities.
5. **Score everything.** If readiness isn't measurable, it isn't manageable. The Agent-Readiness Score (ARS) is the product's heartbeat and the marketing wedge.

## The platform — six modules (as productized on the landing page)

### 1. Datalith Connect — *every source, one platform*
- 150+ connectors: warehouses (Snowflake, BigQuery, Databricks, Redshift), OLTP databases (Postgres, MySQL, MongoDB, SQL Server), SaaS (Salesforce, HubSpot, Zendesk, Jira, Notion, Slack, Google Drive, SharePoint), object stores (S3, GCS, Azure Blob), streams (Kafka, Kinesis).
- Multi-modal: tables, documents, PDFs, wikis, tickets, emails, transcripts, images.
- Read-only, agentless, incremental sync; deploys as SaaS or in-VPC.

### 2. Datalith Graph — *the Enterprise Knowledge Graph*
- Auto-constructed ontology: entities (customers, products, orders, employees, contracts…), relationships, and cross-source identity resolution ("this Salesforce Account = this Snowflake `dim_customer` row = this Zendesk org").
- Column- and chunk-level lineage; freshness and provenance on every node.
- Human curation surface: stewards confirm/correct mappings; corrections retrain the mappers.

### 3. Datalith Topics — *the semantic layer agents can trust*
- Auto-defined business topics and domains (Revenue, Churn, Inventory, Support…), each bundling: canonical metric definitions, business glossary, authoritative sources, and freshness SLAs.
- This is the "consistent semantic layer" whose absence Gartner says will kill 60% of MCP-only projects — productized.

### 4. Datalith Ready — *the agent-ready data engine*
- Prepares data for machine consumption: cleaning, deduplication, normalization, semantic typing, chunking, embedding, PII detection and masking.
- **Agent-Readiness Score (ARS 0–100)** per source, domain, and estate: completeness, freshness, consistency, semantic coverage, governance coverage. The board-level KPI for AI programs — and our free-audit growth wedge.

### 5. Datalith Flows — *agentic workflow recommendations*
- Mines the graph for automation opportunities: "Invoices in NetSuite + contracts in SharePoint + tickets in Zendesk → a collections-followup agent is feasible; projected impact $X."
- Generates deployable blueprints (data bindings, guardrails, eval set) exportable to LangGraph, CrewAI, OpenAI Agents SDK, or n8n.
- Turns Datalith from cost-avoidance into revenue creation — the expansion engine.

### 6. Datalith Gateway — *governed serving for any agent*
- One MCP endpoint for the whole estate; per-agent identities, least-privilege scopes, row/column/chunk-level policy enforcement.
- Full audit log of every agent query — the artifact that gets security teams to "yes."
- Sub-second context retrieval APIs: semantic search, graph traversal, SQL-over-federation.

### Command dashboard (the "centralized data dashboard" from the founding notes)
Single pane: estate map, ARS trends, agent activity, policy violations, workflow pipeline ROI. Built for the CDO's Monday meeting.

## How it works (the loop)

**Connect → Graph → Score → Prepare → Serve → Recommend** — then every agent interaction feeds back into scoring and recommendations. Time-to-value target: first ARS report within 48 hours of connecting read-only credentials.

## Roadmap

| Phase | Timeline | Scope |
|---|---|---|
| **v0 — Readiness Audit** (wedge) | Now → +3 mo | 25 connectors, ARS scoring, estate map. Free tier. Goal: 100 audits run. |
| **v1 — The Graph** | +3 → +9 mo | Knowledge graph GA, Topics, Gateway (MCP) beta, in-VPC deploy, SOC 2 Type I. 10 design partners → paying. |
| **v2 — The Platform** | +9 → +18 mo | Ready engine GA, Flows recommendations, audit/permissions GA, SOC 2 Type II. $1M+ ARR, Series A metrics. |

## Success metrics
- Activation: connected-sources-per-account (target ≥4 within 30 days).
- Value: ARS improvement per quarter; # agents served via Gateway.
- Revenue: net revenue retention ≥130% via source/usage expansion (Flows drives it).
