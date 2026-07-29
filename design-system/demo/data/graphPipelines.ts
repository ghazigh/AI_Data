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
  /** Points that matched no topic, held for steward review. Extend path only. */
  unassigned?: { count: number; unit: string; note: string }
}

export const EMBEDDING_DIMENSIONS = 1_024
export const REDUCED_DIMENSIONS = 24

export const GRAPH_PIPELINES: GraphPipeline[] = [
  {
    id: 'construct',
    title: "How the graph's topics are discovered",
    lead: 'The graph is not hand-authored. Every structured chunk and typed row across the estate is embedded, projected into a shared coordinate space, clustered, and labelled — the eight knowledge bases fall out of that process rather than being declared in advance.',
    topicsBefore: 0,
    topicsAfter: 8,
    stages: [
      {
        name: 'Embed',
        detail: `Every structured chunk and typed row across the estate enters a shared ${EMBEDDING_DIMENSIONS}-dimension semantic space`,
        mode: 'applies',
        reuses: 'the sentence encoder',
        count: 9_580_000,
        unit: 'chunks',
        runtime: '~7 h',
      },
      {
        name: 'Reduce dimensions',
        detail: `Fits a projection from ${EMBEDDING_DIMENSIONS} dimensions down to ${REDUCED_DIMENSIONS}, and saves it so later work lands in the same coordinate space`,
        mode: 'fits',
        produces: 'the UMAP projection',
        count: 9_580_000,
        unit: 'points',
        runtime: '~3 h 30 min',
      },
      {
        name: 'Cluster',
        detail: 'Finds dense regions in the reduced space; each becomes a topic candidate, and sparse points are marked noise rather than forced into a group',
        mode: 'fits',
        produces: 'the HDBSCAN cluster model',
        count: 8,
        unit: 'clusters',
        runtime: '~2 h 15 min',
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
      count: 214,
      unit: 'chunks',
      note: 'Held as a candidate topic for steward review rather than dropped or forced into the nearest existing cluster.',
    },
    stages: [
      {
        name: 'Embed',
        detail: `Encodes the new source's chunks and rows into the same ${EMBEDDING_DIMENSIONS}-dimension space used at construction`,
        mode: 'applies',
        reuses: 'the sentence encoder',
        count: 41_000,
        unit: 'chunks',
        runtime: '~18 min',
      },
      {
        name: 'Project',
        detail: 'Transforms the new points through the already-fitted projection — no new fit, just placing them in the coordinate space built at construction time',
        mode: 'applies',
        reuses: 'the UMAP projection',
        count: 41_000,
        unit: 'points',
        runtime: '~9 min',
      },
      {
        name: 'Assign',
        detail: 'Scores each new point against the existing cluster model; points that fall inside a known dense region join that topic',
        mode: 'applies',
        reuses: 'the HDBSCAN cluster model',
        count: 40_786,
        unit: 'points',
        runtime: '~6 min',
      },
      {
        name: 'Bind & serve',
        detail: 'Attaches the newly assigned entities to the existing knowledge bases under the same governance and access policy',
        mode: 'applies',
        reuses: 'the topic labels',
        count: 40_786,
        unit: 'entities',
        runtime: '~4 min',
      },
    ],
  },
]
