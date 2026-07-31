import { useState } from 'react'
import { Drawer } from './Drawer'
import { SOURCES } from '../data/sources'
import type { SectionKind } from '../data/pipelineCatalogue'
import { stageOptionsFor, defaultStagesFor, type PipelineDraft } from '../data/createPipeline'
import { KIND_LABEL } from './PipelineTable'

const KIND_OPTIONS: SectionKind[] = ['structuring', 'graph', 'remediation']

export interface CreatePipelineDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (draft: PipelineDraft) => void
  /** Every pipeline name already in use — catalogue and session-created alike —
   * checked case-insensitively against the new name. */
  existingNames: string[]
}

/**
 * The Create pipeline dialog: kind, a required name, at least one connected
 * source, and at least one component. The submit button is never disabled —
 * pressing it with something missing reports exactly what, inline, rather
 * than leaving an operator staring at a greyed control with no explanation.
 */
export function CreatePipelineDialog({ open, onClose, onCreate, existingNames }: CreatePipelineDialogProps) {
  const [kind, setKind] = useState<SectionKind>('structuring')
  const [name, setName] = useState('')
  const [sourceIds, setSourceIds] = useState<string[]>([])
  const [stageNames, setStageNames] = useState<string[]>(defaultStagesFor('structuring'))
  const [errors, setErrors] = useState<string[]>([])

  const connectedSources = SOURCES.filter(s => s.status === 'connected')

  const changeKind = (next: SectionKind) => {
    setKind(next)
    // The component list is a property of the kind, not a running choice — a
    // Graph checklist left over from a Structuring pick would offer stage
    // names that kind never uses, so it resets to that kind's own chain.
    setStageNames(defaultStagesFor(next))
  }

  const reset = () => {
    setKind('structuring')
    setName('')
    setSourceIds([])
    setStageNames(defaultStagesFor('structuring'))
    setErrors([])
  }

  const close = () => {
    reset()
    onClose()
  }

  const toggle = (list: string[], setList: (next: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value])

  const submit = () => {
    const trimmed = name.trim()
    const problems: string[] = []
    if (!trimmed) {
      problems.push('Name is required.')
    } else if (existingNames.some(n => n.toLowerCase() === trimmed.toLowerCase())) {
      problems.push(`A pipeline named "${trimmed}" already exists.`)
    }
    if (sourceIds.length === 0) problems.push('Select at least one source.')
    if (stageNames.length === 0) problems.push('Select at least one component.')

    if (problems.length > 0) {
      setErrors(problems)
      return
    }

    onCreate({ name: trimmed, kind, sourceIds, stageNames })
    reset()
  }

  return (
    <Drawer open={open} title="Create pipeline" onClose={close}>
      <label className="dm-field">
        <span>Name</span>
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>

      <h3 className="dm-drawer-sub">Kind</h3>
      <div role="radiogroup" aria-label="Kind">
        {KIND_OPTIONS.map(option => (
          <label className="dm-cfg-check" key={option}>
            <input
              type="radio"
              name="dm-create-kind"
              checked={kind === option}
              onChange={() => changeKind(option)}
            />
            <span className="dm-cfg-opt">{KIND_LABEL[option]}</span>
          </label>
        ))}
      </div>

      <h3 className="dm-drawer-sub">Sources</h3>
      <div role="group" aria-label="Sources">
        {connectedSources.map(source => (
          <label className="dm-cfg-check" key={source.id}>
            <input
              type="checkbox"
              checked={sourceIds.includes(source.id)}
              onChange={() => toggle(sourceIds, setSourceIds, source.id)}
            />
            <span className="dm-cfg-opt">{source.name}</span>
          </label>
        ))}
      </div>

      <h3 className="dm-drawer-sub">Components</h3>
      <div role="group" aria-label="Components">
        {stageOptionsFor(kind).map(stageName => (
          <label className="dm-cfg-check" key={stageName}>
            <input
              type="checkbox"
              checked={stageNames.includes(stageName)}
              onChange={() => toggle(stageNames, setStageNames, stageName)}
            />
            <span className="dm-cfg-opt">{stageName}</span>
          </label>
        ))}
      </div>

      {errors.length > 0 && (
        <div role="alert">
          {errors.map(error => (
            <p className="dm-cfg-warning" key={error}>{error}</p>
          ))}
        </div>
      )}

      <div className="dm-connect-actions">
        <button type="button" className="dm-btn is-ghost" onClick={close}>Cancel</button>
        <button type="button" className="dm-btn is-ink" onClick={submit}>Create pipeline</button>
      </div>
    </Drawer>
  )
}
