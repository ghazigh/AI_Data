import { MODALITY_PIPELINES } from './modalities'
import type { Modality } from './types'

export type StageMode = 'fits' | 'applies'

export interface ConstructionStage {
  name: string
  detail: string
  mode: StageMode
  /** What this stage fits. Present only when mode is 'fits'. */
  produces?: string
  /** The fitted artefact this stage reuses. Present when it applies one. */
  reuses?: string
  count: number
  unit: string
  runtime: string
}

export interface GraphPipeline {
  id: 'construct' | 'extend'
  title: string
  lead: string
  stages: ConstructionStage[]
  topicsBefore: number
  topicsAfter: number
  /** Points that matched no topic, held for steward review. */
  unassigned?: { count: number; unit: string; note: string }
}

export const EMBEDDING_DIMENSIONS = 1_024
export const REDUCED_DIMENSIONS = 24

const stageCount = (modality: Modality, stageName: string): number => {
  const pipeline = MODALITY_PIPELINES.find(p => p.modality === modality)!
  const stage = pipeline.stages.find(s => s.name === stageName)!
  return stage.count
}

/**
 * The volume that actually enters the graph — every embeddable chunk,
 * queryable row and typed rollup — summed across the seven modality
 * pipelines in modalities.ts. Derived, not hand-typed, so a modality
 * volume change can never silently decouple this panel from the one
 * above it on the same screen.
 *
 * One stage per modality was picked as the entry grain. The pipeline's
 * own last stage is not always at that grain, so each pick is justified
 * below rather than assumed:
 *
 * - tables (23,000,000):      "Profile", not the chain's last stage
 *   ("Publish schema", 1,260). Publish schema's count is in columns —
 *   the shape of the schema, not the volume it describes. Profile is
 *   the row-grain stage, and its count matches the modality's own row
 *   volume exactly: every row is queryable through the published schema.
 * - documents (9,362,000):    "Embed" — the chain's own embedding stage,
 *   already at chunk grain.
 * - tickets (1,600,000):      "Embed" — one embedded record per ticket
 *   thread.
 * - email (3,349,724):        "Embed" — post-chunk embedding grain, after
 *   threads are split at reply boundaries.
 * - transcripts (3,077,000):  "Embed" — same reasoning as email, chunked
 *   after diarising.
 * - images (4,200,000):       "Embed" — one embedded markdown record per
 *   photo.
 * - streams (2,305,000):      "Aggregate", not the chain's last stage
 *   ("Publish schema", 42). Same issue as tables: Publish schema's count
 *   is columns, not rollup rows. Aggregate is where the queryable rollup
 *   grain is produced — the unit the output description ("typed rollups,
 *   queryable beside the warehouse") actually promises.
 *
 * Sum: 46,893,724 records.
 */
export const GRAPH_ENTRY_VOLUME =
  stageCount('tables', 'Profile') +
  stageCount('documents', 'Embed') +
  stageCount('tickets', 'Embed') +
  stageCount('email', 'Embed') +
  stageCount('transcripts', 'Embed') +
  stageCount('images', 'Embed') +
  stageCount('streams', 'Aggregate')

/**
 * HDBSCAN marks sparse points as noise rather than forcing them into a
 * group. On a heterogeneous, seven-modality corpus this size, a small
 * but non-trivial fraction is expected — 4% approximates the points
 * that land in no region dense enough to seed or join a cluster.
 */
const CONSTRUCTION_NOISE_RATE = 0.04
const CONSTRUCTION_NOISE_COUNT = Math.round(GRAPH_ENTRY_VOLUME * CONSTRUCTION_NOISE_RATE)

export const GRAPH_PIPELINES: GraphPipeline[] = [
  {
    id: 'construct',
    title: "How the graph's topics are discovered",
    lead: 'The graph is not hand-authored. Every structured chunk and typed row across the estate is embedded, projected into a shared coordinate space, clustered, and labelled — the eight knowledge bases fall out of that process rather than being declared in advance.',
    topicsBefore: 0,
    topicsAfter: 8,
    unassigned: {
      count: CONSTRUCTION_NOISE_COUNT,
      unit: 'points',
      note: 'These points fall in no region dense enough to seed or join a cluster. Held as candidate topics for steward review rather than forced into a group.',
    },
    stages: [
      {
        name: 'Embed',
        detail: `Every structured chunk and typed row across the estate enters a shared ${EMBEDDING_DIMENSIONS}-dimension semantic space`,
        mode: 'applies',
        reuses: 'the sentence encoder',
        count: GRAPH_ENTRY_VOLUME,
        unit: 'records',
        runtime: '~7 h',
      },
      {
        name: 'Reduce dimensions',
        detail: `Fits a projection from ${EMBEDDING_DIMENSIONS} dimensions down to ${REDUCED_DIMENSIONS} — enough dimensions for density to be meaningful — and saves it so later work lands in the same coordinate space`,
        mode: 'fits',
        produces: 'the UMAP projection',
        count: GRAPH_ENTRY_VOLUME,
        unit: 'points',
        runtime: '~5 h',
      },
      {
        name: 'Cluster',
        detail: 'Finds dense regions in the reduced space; each becomes a topic candidate, and sparse points are marked noise rather than forced into a group',
        mode: 'fits',
        produces: 'the HDBSCAN cluster model',
        count: 8,
        unit: 'clusters',
        runtime: '~3 h',
      },
      {
        name: 'Define topics',
        detail: 'Labels each cluster from its most representative members, turning eight clusters into eight named knowledge bases',
        mode: 'fits',
        produces: 'the topic labels',
        count: 8,
        unit: 'topics',
        runtime: '~45 min',
      },
    ],
  },
  {
    id: 'extend',
    title: 'Adding a dataset to the graph',
    lead: 'Nothing here is re-fitted. The projection and the cluster model are the ones fitted once, at construction time, and this path only ever applies them — so a new source lands in the coordinate space that already exists and joins the topics that already exist. An agent bound to Claims yesterday is still bound to Claims today; re-fitting would reshuffle the space and break that binding.',
    topicsBefore: 8,
    topicsAfter: 8,
    unassigned: {
      count: 330,
      unit: 'chunks',
      note: 'These points matched no existing topic well enough to join it. Held as a candidate topic for steward review rather than dropped or forced into the nearest existing cluster.',
    },
    stages: [
      {
        name: 'Embed',
        detail: `Encodes the new source's chunks and rows into the same ${EMBEDDING_DIMENSIONS}-dimension space used at construction`,
        mode: 'applies',
        reuses: 'the sentence encoder',
        count: 63_400,
        unit: 'records',
        runtime: '~28 min',
      },
      {
        name: 'Project',
        detail: 'Transforms the new points through the already-fitted projection — no new fit, just placing them in the coordinate space built at construction time',
        mode: 'applies',
        reuses: 'the UMAP projection',
        count: 63_400,
        unit: 'points',
        runtime: '~14 min',
      },
      {
        name: 'Assign',
        detail: 'Scores each new point against the existing cluster model; points that fall inside a known dense region join that topic',
        mode: 'applies',
        reuses: 'the HDBSCAN cluster model',
        count: 63_070,
        unit: 'points',
        runtime: '~9 min',
      },
      {
        name: 'Bind & serve',
        detail: 'Resolves the newly assigned points to entities and attaches them to the existing knowledge bases under the same governance and access policy',
        mode: 'applies',
        reuses: 'the topic labels',
        count: 57_391,
        unit: 'entities',
        runtime: '~6 min',
      },
    ],
  },
]
