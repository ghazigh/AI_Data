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

## The platform — five stages

The product is a sequence, not a menu. Each stage consumes the previous one's
output, which is why the order is load-bearing: you cannot propose use cases
before the graph exists, and you cannot build the graph well before the
restructuring the score called for has run.

### 1. Connect — *every system you run, read-only*
- 150+ connectors: warehouses (Snowflake, BigQuery, Databricks, Redshift), OLTP databases (Postgres, MySQL, MongoDB, SQL Server), SaaS (Salesforce, HubSpot, Zendesk, Jira, Notion, Slack, Google Drive, SharePoint), object stores (S3, GCS, Azure Blob), streams (Kafka, Kinesis).
- Multi-modal: tables, documents, PDFs, wikis, tickets, emails, transcripts, images.
- Read-only, agentless, incremental sync; deploys as SaaS or in-VPC.
- **Value:** no migration and no engineering project — connected in an afternoon.

### 2. Ready — *a score for how usable the data is*
- Prepares the measurement, not yet the fix: completeness, freshness, consistency, semantic coverage, governance coverage.
- **Agent-Readiness Score (0–100)** per source, per business domain, and estate-wide. The board-level KPI for AI programs — and our free-audit growth wedge.
- Red flags a data team can act on: unmasked PII, duplicate entities, sources not refreshed.
- Continuous after the first pass — readiness moves as the estate changes, so this is monitoring rather than an audit.
- **Value:** you learn where you stand, and keep knowing.

### 3. Pipelines — *the restructuring this estate actually needs*
- The score becomes a plan. Each proposed step carries the count that justifies it: 41K duplicates to resolve, 380 columns to type, 12 to mask, 22K documents to chunk.
- Cleaning, deduplication, identity resolution, normalization, semantic typing, chunking, embedding, PII detection and masking.
- Runs in place; nothing is written back to source systems. Re-runs as the estate drifts.
- **Value:** built for the data as it is, not a generic template another estate needed.

### 4. Graph — *one map of the whole business*
- Auto-constructed ontology: entities (customers, products, orders, employees, contracts…), relationships, and cross-source identity resolution ("this Salesforce Account = this Snowflake `dim_customer` row = this Zendesk org").
- Detects and names the topics, domains and pockets of expertise inside the graph — Customers, Contracts, Support, Supply — so each becomes a knowledge base in its own right, with its own readiness standing.
- Column- and chunk-level lineage; freshness and provenance on every node. Stewards confirm or correct mappings; corrections retrain the mappers.
- Served to any agent under governance: per-agent identity, least-privilege scopes, row/column/chunk-level policy, and a full audit log of every query. MCP today, protocol-agnostic by design.
- **Value:** knowledge bases any agentic AI can read, whatever framework the team builds on.

### 5. Use cases — *which agents are worth building*
- Mines the graph for automation opportunities: "Invoices in NetSuite + contracts in SharePoint + tickets in Zendesk → a collections-followup agent is feasible; projected impact $X."
- Generates deployable blueprints (data bindings, guardrails, eval set) exportable to LangGraph, CrewAI, OpenAI Agents SDK, or n8n.
- Names what is *not* yet possible and the domain holding it back, which closes the loop to stage 2's score.
- **Value:** you find out what to build before spending a quarter building it. This is the expansion engine — it turns Datalith from cost-avoidance into revenue creation.

### What changed from the earlier six-module framing
Topics folded into Graph: naming a business domain is something the graph
does, not a separate product a customer buys. Gateway stopped being a named
module and became a property of the graph — serving is still governed,
audited and metered, but "how you read the graph" was never a thing anyone
wanted to buy separately.

### Command dashboard (the "centralized data dashboard" from the founding notes)
Single pane: estate map, readiness trends, agent activity, policy violations, use-case pipeline ROI. Built for the CDO's Monday meeting.

## How it works (the loop)

**Connect → Ready → Pipelines → Graph → Use cases** — then every agent interaction feeds back into scoring and recommendations. Time-to-value target: first Agent-Readiness Score within 48 hours of connecting read-only credentials.

## Roadmap

| Phase | Timeline | Scope |
|---|---|---|
| **v0 — Readiness Audit** (wedge) | Now → +3 mo | 25 connectors, ARS scoring, estate map. Free tier. Goal: 100 audits run. |
| **v1 — The Graph** | +3 → +9 mo | Knowledge graph GA, pipeline plans, governed serving (MCP) beta, in-VPC deploy, SOC 2 Type I. 10 design partners → paying. |
| **v2 — The Platform** | +9 → +18 mo | Ready engine GA, Flows recommendations, audit/permissions GA, SOC 2 Type II. $1M+ ARR, Series A metrics. |

## Success metrics
- Activation: connected-sources-per-account (target ≥4 within 30 days).
- Value: readiness improvement per quarter; # agents served from the graph.
- Revenue: net revenue retention ≥130% via source/usage expansion (Flows drives it).
