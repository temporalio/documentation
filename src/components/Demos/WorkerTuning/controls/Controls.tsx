import { useEffect, useState } from 'react'
import {
  CPU_CAPACITY_STEP,
  IO_CAPACITY_STEP,
  MAX_CPU_CAPACITY,
  MAX_IO_CAPACITY,
  MIN_CPU_CAPACITY,
  MIN_IO_CAPACITY,
  defaultConfig,
  type SimulationConfig,
} from '../simulation'
import { DocsLink, DocsLinks } from '../DocsLink'
import { SIMULATOR_PRESETS, type SimulatorPresetId } from './presets'

export type WorkflowRateUnit = 'second' | 'minute' | 'hour'
export type GenerationMode = 'triggered' | 'continuous'

interface WorkflowGenerationControlsProps {
  config: SimulationConfig
  workflowRateValue: number
  workflowRateUnit: WorkflowRateUnit
  generationMode: GenerationMode
  workflowCount: number
  playing: boolean
  canResume: boolean
  speed: number
  onConfigChange: (changes: Partial<SimulationConfig>) => void
  onWorkflowRateValueChange: (value: number) => void
  onWorkflowRateUnitChange: (unit: WorkflowRateUnit) => void
  onGenerationModeChange: (mode: GenerationMode) => void
  onWorkflowCountChange: (count: number) => void
  onStart: () => void
  onPlayingChange: (playing: boolean) => void
  onSpeedChange: (speed: number) => void
  onReset: () => void
}

interface RangeControlProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (value: number) => void
}

function RangeControl({ label, value, min, max, step = 1, suffix = '', onChange }: RangeControlProps) {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const commit = (next = draft) => {
    if (next !== value) onChange(next)
  }

  return (
    <label className="range-control">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={draft}
        onChange={(event) => setDraft(Number(event.target.value))}
        onPointerUp={(event) => commit(Number(event.currentTarget.value))}
        onPointerCancel={(event) => commit(Number(event.currentTarget.value))}
        onKeyUp={(event) => commit(Number(event.currentTarget.value))}
        onBlur={(event) => commit(Number(event.currentTarget.value))}
      />
      <output>{draft}{suffix}</output>
    </label>
  )
}

function TimeScaleControls({ speed, onSpeedChange }: { speed: number; onSpeedChange: (speed: number) => void }) {
  const [speedDraft, setSpeedDraft] = useState(String(speed))
  const [speedSliderDraft, setSpeedSliderDraft] = useState(Math.min(speed, 2))

  useEffect(() => {
    setSpeedDraft(String(speed))
    setSpeedSliderDraft(Math.min(speed, 2))
  }, [speed])

  const commitSpeed = () => {
    const parsed = Number(speedDraft)
    const next = Number.isFinite(parsed) ? Math.max(0.05, Math.min(8, parsed)) : speed
    setSpeedDraft(String(next))
    onSpeedChange(next)
  }

  const commitSpeedSlider = (next = speedSliderDraft) => {
    if (next !== speed) onSpeedChange(next)
  }

  return (
    <div className="speed-control">
      <label htmlFor="simulation-speed">Time scale</label>
      <input
        id="simulation-speed"
        type="range"
        min="0.25"
        max="2"
        step="0.25"
        list="speed-presets"
        value={speedSliderDraft}
        onChange={(event) => setSpeedSliderDraft(Number(event.target.value))}
        onPointerUp={(event) => commitSpeedSlider(Number(event.currentTarget.value))}
        onPointerCancel={(event) => commitSpeedSlider(Number(event.currentTarget.value))}
        onKeyUp={(event) => commitSpeedSlider(Number(event.currentTarget.value))}
        onBlur={(event) => commitSpeedSlider(Number(event.currentTarget.value))}
      />
      <datalist id="speed-presets">
        {[0.25, 0.5, 1, 2].map((option) => <option key={option} value={option} />)}
      </datalist>
      <input
        className="speed-number"
        aria-label="Simulation speed value"
        type="number"
        min="0.05"
        max="8"
        step="0.05"
        value={speedDraft}
        onChange={(event) => setSpeedDraft(event.target.value)}
        onBlur={commitSpeed}
        onKeyDown={(event) => {
          if (event.key === 'Enter') commitSpeed()
        }}
      />
      <span>x</span>
      <button type="button" className={speed === 0.5 ? 'active' : ''} onClick={() => onSpeedChange(0.5)}>0.5x</button>
      <button type="button" className={speed === 1 ? 'active' : ''} onClick={() => onSpeedChange(1)}>1x</button>
      <button type="button" className={speed === 2 ? 'active' : ''} onClick={() => onSpeedChange(2)}>2x</button>
      <button type="button" className={speed === 4 ? 'active' : ''} onClick={() => onSpeedChange(4)}>4x</button>
      <button type="button" className={speed === 8 ? 'active' : ''} onClick={() => onSpeedChange(8)}>8x</button>
    </div>
  )
}

function WorkerCapacityControls({
  config,
  onConfigChange,
}: {
  config: SimulationConfig
  onConfigChange: (changes: Partial<SimulationConfig>) => void
}) {
  return (
    <div className="worker-config-controls">
      <RangeControl label="Workflow Pollers / Worker" value={config.workflowPollers} min={0} max={10} onChange={(value) => onConfigChange({ workflowPollers: value })} />
      <RangeControl label="Workflow Slots / Worker" value={config.workflowSlots} min={0} max={16} onChange={(value) => onConfigChange({ workflowSlots: value })} />
      <RangeControl label="Activity Pollers / Worker" value={config.activityPollers} min={0} max={10} onChange={(value) => onConfigChange({ activityPollers: value })} />
      <RangeControl label="Activity Slots / Worker" value={config.activitySlots} min={0} max={32} onChange={(value) => onConfigChange({ activitySlots: value })} />
      <RangeControl label="Workflow Cache Capacity / Worker" value={config.workflowCacheCapacity} min={0} max={50} onChange={(value) => onConfigChange({ workflowCacheCapacity: value })} />
    </div>
  )
}

function WorkerResourceControls({
  config,
  onConfigChange,
}: {
  config: SimulationConfig
  onConfigChange: (changes: Partial<SimulationConfig>) => void
}) {
  const cpuCapacity = config.cpuCapacity ?? defaultConfig.cpuCapacity
  const ioCapacity = config.ioCapacity ?? defaultConfig.ioCapacity

  return (
    <div className="worker-config-controls">
      <RangeControl label="CPU / Worker" value={cpuCapacity} min={MIN_CPU_CAPACITY} max={MAX_CPU_CAPACITY} step={CPU_CAPACITY_STEP} suffix=" CPU" onChange={(value) => onConfigChange({ cpuCapacity: value })} />
      <RangeControl label="Memory / Worker" value={config.memoryCapacityMb} min={64} max={1024} step={16} suffix=" MB" onChange={(value) => onConfigChange({ memoryCapacityMb: value })} />
      <RangeControl label="I/O Capacity / Worker" value={ioCapacity} min={MIN_IO_CAPACITY} max={MAX_IO_CAPACITY} step={IO_CAPACITY_STEP} suffix=" throughput" onChange={(value) => onConfigChange({ ioCapacity: value })} />
      <RangeControl label="Workflow Cache Memory / Entry" value={config.workflowCacheEntryMemoryMb} min={1} max={16} suffix=" MB" onChange={(value) => onConfigChange({ workflowCacheEntryMemoryMb: value })} />
    </div>
  )
}

function TaskResourceProfileControls({
  config,
  onConfigChange,
}: {
  config: SimulationConfig
  onConfigChange: (changes: Partial<SimulationConfig>) => void
}) {
  const workflowTaskResourceProfile = config.workflowTaskResourceProfile ?? defaultConfig.workflowTaskResourceProfile
  const activityTaskResourceProfile = config.activityTaskResourceProfile ?? defaultConfig.activityTaskResourceProfile
  const taskResourceProfilesLocked = config.taskResourceProfilesLocked ?? defaultConfig.taskResourceProfilesLocked
  const workflowTaskDemand = workflowTaskResourceProfile === 'cpu'
    ? config.workflowTaskCpuDemand ?? defaultConfig.workflowTaskCpuDemand
    : config.workflowTaskIoDemand ?? defaultConfig.workflowTaskIoDemand
  const activityTaskDemand = activityTaskResourceProfile === 'cpu'
    ? config.activityTaskCpuDemand ?? defaultConfig.activityTaskCpuDemand
    : config.activityTaskIoDemand ?? defaultConfig.activityTaskIoDemand
  const updateWorkflowTaskDemand = (value: number) => onConfigChange(workflowTaskResourceProfile === 'cpu'
    ? { workflowTaskCpuDemand: value }
    : { workflowTaskIoDemand: value })
  const updateActivityTaskDemand = (value: number) => onConfigChange(activityTaskResourceProfile === 'cpu'
    ? { activityTaskCpuDemand: value }
    : { activityTaskIoDemand: value })
  const updateWorkflowTaskProfile = (profile: 'cpu' | 'io') => onConfigChange(taskResourceProfilesLocked
    ? { workflowTaskResourceProfile: profile, activityTaskResourceProfile: profile }
    : { workflowTaskResourceProfile: profile })
  const updateActivityTaskProfile = (profile: 'cpu' | 'io') => onConfigChange(taskResourceProfilesLocked
    ? { workflowTaskResourceProfile: profile, activityTaskResourceProfile: profile }
    : { activityTaskResourceProfile: profile })
  const updateProfileLock = (locked: boolean) => onConfigChange(locked
    ? {
        taskResourceProfilesLocked: true,
        activityTaskResourceProfile: workflowTaskResourceProfile,
      }
    : { taskResourceProfilesLocked: false })

  return (
    <div className="task-resource-panel">
        <div className="task-resource-header">
          <label className="profile-lock">
            <input type="checkbox" checked={taskResourceProfilesLocked} onChange={(event) => updateProfileLock(event.target.checked)} />
            Lock profile types
          </label>
        </div>
        <div className="task-profile-group">
          <span className="task-profile-name">Workflow Task</span>
          <div className="workload-mode" role="radiogroup" aria-label="Workflow Task resource profile">
            <label>
              <input type="radio" name="workflow-task-resource-profile" checked={workflowTaskResourceProfile === 'cpu'} onChange={() => updateWorkflowTaskProfile('cpu')} />
              CPU-bound
            </label>
            <label>
              <input type="radio" name="workflow-task-resource-profile" checked={workflowTaskResourceProfile === 'io'} onChange={() => updateWorkflowTaskProfile('io')} />
              I/O-bound
            </label>
          </div>
          <RangeControl label="Demand" value={workflowTaskDemand} min={0.01} max={1} step={0.01} suffix={workflowTaskResourceProfile === 'cpu' ? ' CPU' : ' throughput'} onChange={updateWorkflowTaskDemand} />
          <RangeControl label="Base execution duration" value={config.workflowTaskBaseDurationSeconds} min={0.05} max={10} step={0.05} suffix=" s" onChange={(value) => onConfigChange({ workflowTaskBaseDurationSeconds: value })} />
          <RangeControl label="Execution duration jitter" value={config.workflowTaskDurationJitterPercent} min={0} max={100} step={5} suffix="%" onChange={(value) => onConfigChange({ workflowTaskDurationJitterPercent: value })} />
          <RangeControl label="Replay latency / history unit" value={config.workflowTaskReplayLatencySeconds} min={0.05} max={2} step={0.05} suffix=" s" onChange={(value) => onConfigChange({ workflowTaskReplayLatencySeconds: value })} />
        </div>
        <div className="task-profile-group">
          <span className="task-profile-name">Activity Task</span>
          <div className="workload-mode" role="radiogroup" aria-label="Activity Task resource profile">
            <label>
              <input type="radio" name="activity-task-resource-profile" checked={activityTaskResourceProfile === 'cpu'} onChange={() => updateActivityTaskProfile('cpu')} />
              CPU-bound
            </label>
            <label>
              <input type="radio" name="activity-task-resource-profile" checked={activityTaskResourceProfile === 'io'} onChange={() => updateActivityTaskProfile('io')} />
              I/O-bound
            </label>
          </div>
          <RangeControl label="Demand" value={activityTaskDemand} min={0.01} max={1} step={0.01} suffix={activityTaskResourceProfile === 'cpu' ? ' CPU' : ' throughput'} onChange={updateActivityTaskDemand} />
          <RangeControl label="Base execution duration" value={config.activityTaskBaseDurationSeconds} min={0.05} max={10} step={0.05} suffix=" s" onChange={(value) => onConfigChange({ activityTaskBaseDurationSeconds: value })} />
          <RangeControl label="Execution duration jitter" value={config.activityTaskDurationJitterPercent} min={0} max={100} step={5} suffix="%" onChange={(value) => onConfigChange({ activityTaskDurationJitterPercent: value })} />
        </div>
    </div>
  )
}

export function WorkflowGenerationControls({
  config,
  workflowRateValue,
  workflowRateUnit,
  generationMode,
  workflowCount,
  playing,
  canResume,
  speed,
  onConfigChange,
  onWorkflowRateValueChange,
  onWorkflowRateUnitChange,
  onGenerationModeChange,
  onWorkflowCountChange,
  onStart,
  onPlayingChange,
  onSpeedChange,
  onReset,
}: WorkflowGenerationControlsProps) {
  const activityBatches = Math.ceil(config.activitiesPerWorkflow / config.activityFanout)
  const selectedPreset = Object.entries(SIMULATOR_PRESETS).find(([, preset]) =>
    preset.generationMode === generationMode
    && preset.workflowRateValue === workflowRateValue
    && preset.workflowRateUnit === workflowRateUnit
    && Object.entries(preset.config).every(([key, value]) =>
      key === 'workflowStartRate' || config[key as keyof SimulationConfig] === value,
    ),
  )?.[0] ?? 'custom'
  const [rateDraft, setRateDraft] = useState(String(workflowRateValue))

  useEffect(() => {
    setRateDraft(String(workflowRateValue))
  }, [workflowRateValue])

  const commitRate = () => {
    const parsed = Number(rateDraft)
    const next = Number.isFinite(parsed) ? Math.max(0, parsed) : workflowRateValue
    setRateDraft(String(next))
    onWorkflowRateValueChange(next)
  }

  return (
    <section className="workflow-generation-controls" aria-label="Workflow generation mode">
      <div className="generation-config-label">Workflow generation mode</div>
      <div className="generation-mode" role="radiogroup" aria-label="Workflow generation mode">
        <label>
          <input type="radio" name="workload-mode" checked={generationMode === 'triggered'} onChange={() => onGenerationModeChange('triggered')} />
          Manual
        </label>
        <label>
          <input type="radio" name="workload-mode" checked={generationMode === 'continuous'} onChange={() => onGenerationModeChange('continuous')} />
          Continuous
        </label>
      </div>

      {generationMode === 'triggered' ? (
        <div className="top-count-control">
          <label htmlFor="workflow-count">Workflows to start</label>
          <div className="count-stepper">
            <button type="button" aria-label="Decrease Workflow count" onClick={() => onWorkflowCountChange(Math.max(1, workflowCount - 1))}>-</button>
            <input
              id="workflow-count"
              aria-label="Workflow count"
              type="number"
              min="1"
              max="1000"
              step="1"
              value={workflowCount}
              onChange={(event) => {
                const value = Number(event.target.value)
                if (Number.isFinite(value)) onWorkflowCountChange(Math.max(1, Math.min(1000, Math.floor(value))))
              }}
            />
            <button type="button" aria-label="Increase Workflow count" onClick={() => onWorkflowCountChange(Math.min(1000, workflowCount + 1))}>+</button>
          </div>
        </div>
      ) : (
        <div className="top-rate-control">
          <label htmlFor="workflow-rate-value">Workflow starts</label>
          <input
            id="workflow-rate-value"
            type="number"
            min="0"
            step="1"
            value={rateDraft}
            onChange={(event) => setRateDraft(event.target.value)}
            onBlur={commitRate}
            onKeyDown={(event) => {
              if (event.key === 'Enter') commitRate()
            }}
          />
          <select
            aria-label="Workflow start rate unit"
            value={workflowRateUnit}
            onChange={(event) => onWorkflowRateUnitChange(event.target.value as WorkflowRateUnit)}
          >
            <option value="second">per second</option>
            <option value="minute">per minute</option>
            <option value="hour">per hour</option>
          </select>
        </div>
      )}

      <div className="generation-actions">
        <button type="button" className="start-workflow-button" onClick={onStart} disabled={generationMode === 'continuous' && playing}>
          {generationMode === 'triggered'
            ? `Start ${workflowCount} Workflow${workflowCount === 1 ? '' : 's'}`
            : 'Start continuous'}
        </button>
        <button
          type="button"
          onClick={() => onPlayingChange(!playing)}
          disabled={!playing && !canResume}
        >
          {playing ? 'Pause' : canResume ? 'Resume' : 'Pause'}
        </button>
        <button type="button" onClick={onReset}>Reset</button>
      </div>

      <div className="simulation-time-controls" aria-label="Simulation time controls">
        <TimeScaleControls speed={speed} onSpeedChange={onSpeedChange} />
      </div>

      <section className="simulator-config" aria-labelledby="simulator-config-title">
        <div id="simulator-config-title" className="simulator-config-title">Simulator config</div>
        <div className="simulator-config-sections">
          <label className="preset-control">
            <span>Preset</span>
            <select
              aria-label="Simulator preset"
              value={selectedPreset}
              onChange={(event) => {
                const preset = SIMULATOR_PRESETS[event.target.value as SimulatorPresetId]
                if (!preset) return
                onGenerationModeChange(preset.generationMode)
                onWorkflowRateUnitChange(preset.workflowRateUnit)
                onWorkflowRateValueChange(preset.workflowRateValue)
                onWorkflowCountChange(preset.workflowCount)
                onConfigChange({
                  ...preset.config,
                  workflowStartRate: preset.generationMode === 'continuous'
                    ? preset.config.workflowStartRate
                    : 0,
                })
              }}
            >
              <option value="custom">Custom</option>
              {Object.entries(SIMULATOR_PRESETS).map(([id, preset]) => (
                <option key={id} value={id}>{preset.label}</option>
              ))}
            </select>
          </label>
          <details className="custom-settings">
            <summary>Custom settings</summary>
            <div className="custom-settings-sections">
              <details className="config-section workflow-shape-controls">
                <summary>Workflow shape</summary>
                <div className="config-section-content">
                  <p>Each Workflow Task schedules one execution phase of Activities. Every Activity in that phase must finish before the next execution phase starts.</p>
                  <div className="workflow-shape-grid">
                    <RangeControl label="Execution Phases" value={activityBatches} min={1} max={10} onChange={(value) => onConfigChange({ activitiesPerWorkflow: value * config.activityFanout })} />
                    <RangeControl label="Activities per Activity Phase" value={config.activityFanout} min={1} max={10} onChange={(value) => onConfigChange({ activitiesPerWorkflow: activityBatches * value, activityFanout: value })} />
                  </div>
                  <div className="workflow-shape-tally" aria-live="polite">
                    <span><strong>{activityBatches + 1}</strong> Workflow Tasks / Workflow</span>
                    <span><strong>{config.activitiesPerWorkflow}</strong> Activity Tasks / Workflow</span>
                  </div>
                </div>
              </details>
              <details className="config-section worker-capacity-section">
                <summary>Worker capacity</summary>
                <div className="config-section-content">
                  <DocsLinks label="Related docs">
                    <DocsLink to="/develop/worker-performance#task-pollers">Task Pollers</DocsLink>, <DocsLink to="/develop/worker-performance#slots">Task Slots</DocsLink>, <DocsLink to="/develop/worker-performance/configuration">Worker performance options</DocsLink>
                  </DocsLinks>
                  <WorkerCapacityControls config={config} onConfigChange={onConfigChange} />
                </div>
              </details>
              <details className="config-section worker-resources-section">
                <summary>Worker resources</summary>
                <div className="config-section-content">
                  <DocsLinks label="Related docs">
                    <DocsLink to="/develop/worker-tuning-reference">Worker tuning quick reference</DocsLink>, <DocsLink to="/develop/worker-performance/workflow-cache">Workflow cache tuning</DocsLink>
                  </DocsLinks>
                  <WorkerResourceControls config={config} onConfigChange={onConfigChange} />
                </div>
              </details>
              <details className="config-section task-resource-profiles-section">
                <summary>Task resource profiles</summary>
                <div className="config-section-content">
                  <TaskResourceProfileControls config={config} onConfigChange={onConfigChange} />
                </div>
              </details>
            </div>
          </details>
        </div>
      </section>
    </section>
  )
}
