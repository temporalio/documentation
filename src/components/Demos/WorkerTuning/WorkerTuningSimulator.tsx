// @refresh reset
import { useEffect, useRef, useState } from 'react'
import { advanceAutoPause, armAutoPause, idleAutoPauseState } from './autoPause'
import { WorkflowGenerationControls, type GenerationMode, type WorkflowRateUnit } from './controls/Controls'
import { Simulation, TICK_SECONDS, defaultConfig, type SimulationConfig, type SimulationSnapshot } from './simulation'
import { simulationSecondsForRealSeconds } from './simulationClock'
import { SimulationScene } from './visualization/SimulationScene'
import { TaskThroughputChart } from './visualization/TaskThroughputChart'
import { TemporalMetricChart } from './visualization/TemporalMetricChart'
import { ResourceUsageChart } from './visualization/ResourceUsageChart'
import { TaskLatencyChart } from './visualization/TaskLatencyChart'
import { TaskDistributionTable } from './visualization/TaskDistributionTable'
import { useVisualTimeline } from './visualization/useVisualTimeline'
import './worker-tuning.css'

function diagnostics(snapshot: SimulationSnapshot) {
  return {
    simulatedTime: snapshot.simulatedTime,
    queues: {
      workflow: snapshot.workflowQueue.length,
      activity: snapshot.activityQueue.length,
    },
    workers: snapshot.workers,
    aggregateWorkerResources: {
      workflowPollers: snapshot.workflowPollers,
      activityPollers: snapshot.activityPollers,
      workflowSlots: snapshot.workflowSlots,
      activitySlots: snapshot.activitySlots,
      cpuUtilization: snapshot.cpuUtilization,
      cpuDemand: snapshot.cpuDemand,
      cpuThrottled: snapshot.cpuThrottled,
      memoryUtilization: snapshot.memoryUtilization,
      memoryUsedMb: snapshot.memoryUsedMb,
      memoryPressure: snapshot.memoryPressure,
      memoryCapacityMb: snapshot.config.memoryCapacityMb * snapshot.workers.length,
      ioUtilization: snapshot.ioUtilization,
      ioDemand: snapshot.ioDemand,
      ioThrottled: snapshot.ioThrottled,
      workflowCache: {
        entries: snapshot.workflowCache,
        ...snapshot.cacheMetrics,
      },
    },
    metrics: snapshot.metrics,
    tasks: snapshot.tasks,
    recentEvents: snapshot.recentEvents.slice(-12),
  }
}

export default function WorkerTuningSimulator() {
  const simulationRef = useRef(new Simulation(defaultConfig, 1))
  const [snapshot, setSnapshot] = useState(() => simulationRef.current.getSnapshot())
  const [config, setConfig] = useState<SimulationConfig>({ ...defaultConfig })
  const [playing, setPlaying] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const [timeScale, setTimeScale] = useState(1)
  const [visualTimeMs, setVisualTimeMs] = useState(0)
  const [presentationTimeMs, setPresentationTimeMs] = useState(0)
  const [generationMode, setGenerationMode] = useState<GenerationMode>('continuous')
  const [workflowCount, setWorkflowCount] = useState(1)
  const [workflowRateValue, setWorkflowRateValue] = useState(6)
  const [workflowRateUnit, setWorkflowRateUnit] = useState<WorkflowRateUnit>('minute')
  const [autoPauseTimes, setAutoPauseTimes] = useState<number[]>([])
  const playingRef = useRef(playing)
  const timeScaleRef = useRef(timeScale)
  const visualTimeRef = useRef(visualTimeMs)
  const presentationTimeRef = useRef(presentationTimeMs)
  const autoPauseRef = useRef(idleAutoPauseState())
  const timeline = useVisualTimeline(snapshot, visualTimeMs, presentationTimeMs)

  useEffect(() => { playingRef.current = playing }, [playing])
  useEffect(() => { timeScaleRef.current = timeScale }, [timeScale])

  useEffect(() => {
    let frame = 0
    let previous = performance.now()
    let accumulator = 0
    const animate = (now: number) => {
      const elapsed = Math.min((now - previous) / 1000, 0.25)
      previous = now
      if (playingRef.current) {
        const simulationElapsed = simulationSecondsForRealSeconds(elapsed, timeScaleRef.current)
        accumulator += simulationElapsed
        visualTimeRef.current += simulationElapsed * 1_000
        presentationTimeRef.current += elapsed * 1_000
        while (accumulator >= TICK_SECONDS) {
          simulationRef.current.step(TICK_SECONDS)
          accumulator -= TICK_SECONDS
          const autoPause = advanceAutoPause(autoPauseRef.current, simulationRef.current.getSnapshot())
          autoPauseRef.current = autoPause.state
          if (autoPause.shouldPause) {
            simulationRef.current.endTaskThroughputRound()
            const pausedAt = simulationRef.current.getSnapshot().simulatedTime
            setAutoPauseTimes((current) => current.at(-1) === pausedAt ? current : [...current, pausedAt])
            playingRef.current = false
            setPlaying(false)
            setManuallyPaused(false)
            accumulator = 0
            break
          }
        }
      }
      setSnapshot(simulationRef.current.getSnapshot())
      setVisualTimeMs(visualTimeRef.current)
      setPresentationTimeMs(presentationTimeRef.current)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const updateConfig = (changes: Partial<SimulationConfig>) => {
    const next = { ...config, ...changes }
    setConfig(next)
    simulationRef.current.updateConfig(changes)
    setSnapshot(simulationRef.current.getSnapshot())
  }

  const rateFactor = (unit: WorkflowRateUnit) => unit === 'second' ? 1 : unit === 'minute' ? 60 : 3600

  const updateWorkflowRateValue = (value: number) => {
    setWorkflowRateValue(value)
    if (generationMode === 'continuous') {
      updateConfig({ workflowStartRate: value / rateFactor(workflowRateUnit) })
    }
  }

  const updateWorkflowRateUnit = (unit: WorkflowRateUnit) => {
    const currentRate = workflowRateValue / rateFactor(workflowRateUnit)
    const converted = currentRate * rateFactor(unit)
    setWorkflowRateValue(Number(converted.toFixed(2)))
    setWorkflowRateUnit(unit)
  }

  const updateGenerationMode = (mode: GenerationMode) => {
    setGenerationMode(mode)
    if (mode === 'continuous') autoPauseRef.current = idleAutoPauseState()
    updateConfig({
      workflowStartRate: mode === 'triggered'
        ? 0
        : workflowRateValue / rateFactor(workflowRateUnit),
    })
  }

  const updateTimeScale = (next: number) => {
    timeScaleRef.current = next
    setTimeScale(next)
  }

  const startGeneration = () => {
    simulationRef.current.beginTaskThroughputRound()
    if (generationMode === 'triggered') {
      simulationRef.current.startWorkflows(workflowCount)
      autoPauseRef.current = armAutoPause()
    } else {
      simulationRef.current.startContinuousGeneration()
      autoPauseRef.current = idleAutoPauseState()
    }
    playingRef.current = true
    setPlaying(true)
    setManuallyPaused(false)
    setSnapshot(simulationRef.current.getSnapshot())
  }

  const updatePlaying = (next: boolean) => {
    playingRef.current = next
    setPlaying(next)
    setManuallyPaused(!next)
  }

  const reset = () => {
    simulationRef.current.reset()
    autoPauseRef.current = idleAutoPauseState()
    playingRef.current = false
    setPlaying(false)
    setManuallyPaused(false)
    visualTimeRef.current = 0
    presentationTimeRef.current = 0
    setVisualTimeMs(0)
    setPresentationTimeMs(0)
    setAutoPauseTimes([])
    setSnapshot(simulationRef.current.getSnapshot())
  }

  return (
    <div className="worker-tuning-sim">
    <div className="worker-tuning-main">
      <header>
        <h2>Worker tuning simulator</h2>
        <div className="clock">Current run time <strong>{(snapshot.roundTaskThroughput?.elapsedSeconds ?? 0).toFixed(1)}s</strong></div>
      </header>

      <WorkflowGenerationControls
        config={config}
        workflowRateValue={workflowRateValue}
        workflowRateUnit={workflowRateUnit}
        generationMode={generationMode}
        workflowCount={workflowCount}
        playing={playing}
        canResume={manuallyPaused}
        speed={timeScale}
        onConfigChange={updateConfig}
        onWorkflowRateValueChange={updateWorkflowRateValue}
        onWorkflowRateUnitChange={updateWorkflowRateUnit}
        onGenerationModeChange={updateGenerationMode}
        onWorkflowCountChange={setWorkflowCount}
        onStart={startGeneration}
        onPlayingChange={updatePlaying}
        onSpeedChange={updateTimeScale}
        onReset={reset}
      />

      <section className="simulation-panel" aria-labelledby="simulation-panel-title">
        <h2 id="simulation-panel-title">Temporal Task Flow</h2>
        <SimulationScene
          snapshot={snapshot}
          nowMs={visualTimeMs}
          presentationNowMs={presentationTimeMs}
          timeline={timeline}
        />
      </section>
      <details className="monitoring-panel">
        <summary>Monitoring</summary>
        <div className="monitoring-sections">
          <details className="monitoring-section" open>
            <summary>Temporal metrics</summary>
            <div className="monitoring-charts">
              <TemporalMetricChart title="Poller busy ratio" subtitle="Share of configured Pollers holding a received Task" metricId="poller-busy-ratio" simulatedTime={snapshot.simulatedTime} samples={snapshot.pollerBusyRatioHistory} autoPauseTimes={autoPauseTimes} format="percent" />
              <TemporalMetricChart title="Slot utilization" subtitle="Share of execution Slots reserved or occupied" metricId="slot-utilization" simulatedTime={snapshot.simulatedTime} samples={snapshot.slotUtilizationHistory} autoPauseTimes={autoPauseTimes} format="percent" />
              <TemporalMetricChart title="Sync match rate" subtitle="Rolling 5-second share of Tasks delivered immediately to waiting Pollers" metricId="sync-match-rate" simulatedTime={snapshot.simulatedTime} samples={snapshot.syncMatchRateHistory} autoPauseTimes={autoPauseTimes} format="percent" />
              <TemporalMetricChart title="Backlog" subtitle="Tasks waiting in Workflow and Activity Task Queues" metricId="backlog" simulatedTime={snapshot.simulatedTime} samples={snapshot.backlogHistory} autoPauseTimes={autoPauseTimes} format="count" />
            </div>
          </details>
          <details className="monitoring-section" open>
            <summary>Worker resources</summary>
            <div className="monitoring-charts">
              <ResourceUsageChart title="CPU utilization" subtitle="Used CPU as a share of allocated Worker CPU" resource="cpu" simulatedTime={snapshot.simulatedTime} currentValue={snapshot.cpuUtilization} samples={snapshot.cpuUtilizationHistory} autoPauseTimes={autoPauseTimes} />
              <ResourceUsageChart title="Memory utilization" subtitle="Used memory as a share of allocated Worker memory" resource="memory" simulatedTime={snapshot.simulatedTime} currentValue={snapshot.memoryUtilization} samples={snapshot.memoryUtilizationHistory} autoPauseTimes={autoPauseTimes} />
              <ResourceUsageChart title="I/O utilization" subtitle="Used I/O as a share of allocated Worker throughput" resource="io" simulatedTime={snapshot.simulatedTime} currentValue={snapshot.ioUtilization} samples={snapshot.ioUtilizationHistory} autoPauseTimes={autoPauseTimes} />
            </div>
          </details>
          <details className="monitoring-section" open>
            <summary>Load testing</summary>
            <div className="monitoring-charts">
              <TaskThroughputChart
                simulatedTime={snapshot.simulatedTime}
                currentTotal={snapshot.metrics.totalTaskThroughput}
                samples={snapshot.taskThroughputHistory}
                autoPauseTimes={autoPauseTimes}
              />
              <TaskLatencyChart simulatedTime={snapshot.simulatedTime} samples={snapshot.taskLatencyHistory} autoPauseTimes={autoPauseTimes} />
              <TaskDistributionTable distribution={snapshot.taskDistribution} />
            </div>
          </details>
        </div>
      </details>
      <details className="diagnostics">
        <summary>Diagnostics</summary>
        <pre>{JSON.stringify(diagnostics(snapshot), null, 2)}</pre>
      </details>
    </div>
    </div>
  )
}
