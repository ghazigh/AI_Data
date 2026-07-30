import { entryById } from '../data/pipelineCatalogue'

export function PipelineWorkspace({ entryId }: { entryId: string }) {
  const entry = entryById(entryId)
  if (!entry) return null
  return (
    <section className="dm-workspace">
      <h1>{entry.name}</h1>
      <p>{entry.summary}</p>
    </section>
  )
}
