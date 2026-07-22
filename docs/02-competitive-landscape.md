# Competitive Landscape — Datalith

*July 2026*

## Positioning map

Two axes matter: **who consumes the data** (humans ↔ agents) and **scope** (single modality/source ↔ whole estate).

```
                       Whole data estate
                              │
        Collibra ● Alation    │      ★ DATALITH
              Atlan ●         │   (agent-native, whole estate)
                              │
   Humans ────────────────────┼──────────────────── Agents
                              │
            Glean ●           │   ● LlamaIndex / LlamaCloud
        (employee search)     │   ● Unstructured.io
                              │   ● one-off MCP servers
                              │
                      Single source / modality
```

## Direct and adjacent competitors

### Data catalogs & governance ("agentic data intelligence" pivots)
| Company | What they do | Why we win |
|---|---|---|
| **Atlan** | Active-metadata catalog; Leader, Gartner MQ for D&A Governance 2026; publishing "context layer" playbooks | Built for human data stewards. Governance workflows, not an agent runtime. No agent-facing serving layer, no workflow recommendations. |
| **Alation** | Catalog → "Agentic Data Intelligence platform" repositioning | Legacy enterprise sales motion and human-first product surface; agents are a feature, not the architecture. |
| **Collibra** | Enterprise data governance | Same: strong at policy for people, weak at machine-consumable context at runtime. |
| **DataHub (Acryl)** | Open-source metadata platform, now "context management" | Closest thesis-wise. But metadata-only: doesn't prepare or serve the data itself, doesn't recommend workflows. We ingest, structure, score, and serve. |

### Agent/RAG data tooling
| Company | What they do | Why we win |
|---|---|---|
| **LlamaIndex / LlamaCloud** | Document parsing, indexing, RAG pipelines for developers | Document-centric, developer-library DNA. No estate-wide graph, no governance, no business-user surface. |
| **Unstructured.io** | ETL for unstructured docs into LLM formats | A pipeline component, not a platform. We are a natural buyer/partner of this layer. |
| **Glean** | Enterprise search + work assistant over SaaS apps | Sells answers to employees. We sell infrastructure to agents. Glean's index is closed; our graph is served to any agent via open protocols. |
| **Palantir (Ontology)** | Ontology-driven operations platform | The proof that the enterprise-ontology thesis wins at scale — at 20× the price, with forward-deployed engineers. We are the product-led version for the mid-market and standard enterprise. |

### Platform-native features
| Player | Threat | Our answer |
|---|---|---|
| **Snowflake Cortex / Intelligence** | Agent features over Snowflake data | Only sees Snowflake. Enterprises average many systems; cross-source is the product. |
| **Databricks (Unity Catalog + Agent Bricks)** | Same, for the lakehouse | Same neutrality argument; we federate Databricks *and* everything else. |
| **Microsoft Fabric / Copilot ecosystem** | Bundled convenience | Deep Microsoft shops may use it; heterogeneous estates (the majority) need a neutral layer. |

### DIY (the real competitor)
Most prospects currently hand-roll MCP servers per source. This is the pattern Gartner projects will fail for 60% of agentic analytics projects by 2028 (no shared semantic layer, no permissions, no observability). Our sales motion literally begins by inventorying a prospect's ad-hoc MCP servers.

## Datalith's differentiation (the three things nobody else does together)

1. **Estate-wide, multi-modal ingestion → one Enterprise Knowledge Graph.** Warehouses, databases, SaaS, files, tickets, wikis — structured and unstructured — resolved into one governed ontology with lineage.
2. **Agent-Readiness Score + preparation engine.** We don't just catalog problems; we fix them: cleaning, deduplication, chunking, embedding, semantic typing — and quantify readiness per domain so leaders can manage it as a KPI.
3. **Workflow recommendation.** Like JetScale detects cloud savings, Datalith detects *automation opportunities in the data itself* and generates deployable agentic workflow blueprints — turning a readiness tool into a revenue driver.

## Moat over time

- **Data-network effect:** every connected source enriches the graph; every agent interaction (queries, corrections, outcomes) trains readiness scoring and workflow recommendations.
- **Switching cost:** the knowledge graph becomes the substrate every internal agent depends on — ripping it out means re-grounding every agent.
- **Neutrality:** the Switzerland position between warehouse vendors, agent frameworks, and model providers — historically a durable seat (dbt, Fivetran, Confluent).
