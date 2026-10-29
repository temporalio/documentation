import {
  ACTIVE_TASK_MEMORY_MB,
  BASE_WORKER_MEMORY_MB,
  CACHED_WORKFLOW_MEMORY_MB,
  CPU_CONTENTION_KNEE,
  COMPLETED_WORKFLOW_RETENTION_SECONDS,
  MAX_CPU_CAPACITY,
  MIN_CPU_CAPACITY,
  CPU_MAX_CONTENTION_SPEED_LOSS,
  COMPLETION_RETURN_SECONDS,
  DEFAULT_MEMORY_CAPACITY_MB,
  DEFAULT_ACTIVITY_TASK_CPU_DEMAND,
  DEFAULT_ACTIVITY_TASK_BASE_DURATION_SECONDS,
  DEFAULT_ACTIVITY_TASK_IO_DEMAND,
  DEFAULT_ACTIVITY_TASK_DURATION_JITTER_PERCENT,
  DEFAULT_WORKFLOW_TASK_BASE_DURATION_SECONDS,
  DEFAULT_WORKFLOW_TASK_CPU_DEMAND,
  DEFAULT_WORKFLOW_TASK_IO_DEMAND,
  DEFAULT_WORKFLOW_TASK_REPLAY_LATENCY_SECONDS,
  DEFAULT_WORKFLOW_TASK_DURATION_JITTER_PERCENT,
  DEFAULT_WORKFLOW_CACHE_CAPACITY,
  IO_CAPACITY,
  IO_CONTENTION_KNEE,
  IO_MAX_CONTENTION_SPEED_LOSS,
  MAX_IO_CAPACITY,
  MAX_METRIC_HISTORY_SAMPLES,
  MAX_RECENT_EVENTS,
  MAX_RETAINED_EVENTS,
  MEMORY_PRESSURE_PULSE_SECONDS,
  METRIC_SAMPLE_SECONDS,
  METRIC_WINDOW_SECONDS,
  MIN_IO_CAPACITY,
  POLL_DISPATCH_SECONDS,
  QUEUE_ADMISSION_SECONDS,
  QUEUE_DWELL_SECONDS,
  REPLAY_CPU_DEMAND,
  SINGLE_WORKER_ID,
  STICKY_SCHEDULE_TO_START_TIMEOUT_SECONDS,
  SLOT_DISPATCH_SECONDS,
  TASK_ENQUEUE_STAGGER_SECONDS,
  TICK_SECONDS,
  WORKFLOW_START_TRANSIT_SECONDS,
  WORKFLOW_TASK_ISSUE_DELAY_SECONDS,
  WORKFLOW_TASK_ISSUE_JITTER_SECONDS,
} from './constants'
import type {
  ActivityTask,
  Poller,
  SemanticEvent,
  SimulationConfig,
  MetricSample,
  SimulationSnapshot,
  SimulationTask,
  Slot,
  TaskResourceProfile,
  TaskType,
  TaskThroughputSample,
  TaskTypeMetricSample,
  RoundTaskThroughputSample,
  TaskDistribution,
  TaskDistributionStats,
  WorkflowExecution,
  WorkflowCacheEntry,
  WorkflowTask,
  WorkerSnapshot,
} from './types'
import { resourceProgressScale } from './resources'

export const defaultConfig: SimulationConfig = {
  workflowStartRate: 0.1,
  activitiesPerWorkflow: 3,
  activityFanout: 3,
  workerCount: 1,
  workflowPollers: 1,
  activityPollers: 2,
  workflowSlots: 2,
  activitySlots: 4,
  cpuCapacity: 1,
  ioCapacity: IO_CAPACITY,
  workflowCacheCapacity: DEFAULT_WORKFLOW_CACHE_CAPACITY,
  workflowCacheEntryMemoryMb: CACHED_WORKFLOW_MEMORY_MB,
  memoryCapacityMb: DEFAULT_MEMORY_CAPACITY_MB,
  workflowTaskResourceProfile: 'cpu',
  activityTaskResourceProfile: 'cpu',
  taskResourceProfilesLocked: true,
  workflowTaskCpuDemand: DEFAULT_WORKFLOW_TASK_CPU_DEMAND,
  activityTaskCpuDemand: DEFAULT_ACTIVITY_TASK_CPU_DEMAND,
  workflowTaskIoDemand: DEFAULT_WORKFLOW_TASK_IO_DEMAND,
  activityTaskIoDemand: DEFAULT_ACTIVITY_TASK_IO_DEMAND,
  workflowTaskBaseDurationSeconds: DEFAULT_WORKFLOW_TASK_BASE_DURATION_SECONDS,
  activityTaskBaseDurationSeconds: DEFAULT_ACTIVITY_TASK_BASE_DURATION_SECONDS,
  workflowTaskDurationJitterPercent: DEFAULT_WORKFLOW_TASK_DURATION_JITTER_PERCENT,
  activityTaskDurationJitterPercent: DEFAULT_ACTIVITY_TASK_DURATION_JITTER_PERCENT,
  workflowTaskReplayLatencySeconds: DEFAULT_WORKFLOW_TASK_REPLAY_LATENCY_SECONDS,
}

// Latencies are differences of tick-aligned times, so a count per exact
// latency value gives exact percentiles in memory bounded by the number of
// distinct latencies rather than the number of completed Tasks.
interface TaskLatencyHistogram {
  counts: Map<number, number>
  completed: number
  totalSeconds: number
}

function emptyLatencyHistogram(): TaskLatencyHistogram {
  return { counts: new Map(), completed: 0, totalSeconds: 0 }
}

function recordLatency(histogram: TaskLatencyHistogram, seconds: number): void {
  histogram.counts.set(seconds, (histogram.counts.get(seconds) ?? 0) + 1)
  histogram.completed += 1
  histogram.totalSeconds += seconds
}

function mergeLatencyHistograms(left: TaskLatencyHistogram, right: TaskLatencyHistogram): TaskLatencyHistogram {
  const counts = new Map(left.counts)
  for (const [seconds, count] of right.counts) counts.set(seconds, (counts.get(seconds) ?? 0) + count)
  return {
    counts,
    completed: left.completed + right.completed,
    totalSeconds: left.totalSeconds + right.totalSeconds,
  }
}

// Keeps the first sample and every second one after it, folding each dropped
// sample's flags into the sample that replaces it.
function compactSamples<T extends { throttled: boolean; replaying: boolean }>(samples: T[]): T[] {
  const compacted = samples.slice(0, 1)
  for (let index = 1; index < samples.length; index += 2) {
    const dropped = samples[index]
    const kept = samples[index + 1]
    if (!kept) {
      compacted.push(dropped)
      break
    }
    compacted.push({
      ...kept,
      throttled: kept.throttled || dropped.throttled,
      replaying: kept.replaying || dropped.replaying,
    })
  }
  return compacted
}

function normalizeConfig(config: SimulationConfig): SimulationConfig {
  const cpuDemand = (value: number) => Math.max(0.01, Math.min(1, Math.round(value * 100) / 100))
  const taskDuration = (value: number) => Math.max(0.05, Math.min(10, Math.round(value * 20) / 20))
  const durationJitter = (value: number) => Math.max(0, Math.min(100, Math.round(value / 5) * 5))
  const cpuCapacity = Math.max(
    MIN_CPU_CAPACITY,
    Math.min(MAX_CPU_CAPACITY, Math.round(config.cpuCapacity * 10) / 10),
  )
  const ioCapacity = Math.max(
    MIN_IO_CAPACITY,
    Math.min(MAX_IO_CAPACITY, Math.round(config.ioCapacity * 10) / 10),
  )
  const workflowTaskResourceProfile = config.workflowTaskResourceProfile === 'io' ? 'io' : 'cpu'
  const activityTaskResourceProfile = config.taskResourceProfilesLocked
    ? workflowTaskResourceProfile
    : config.activityTaskResourceProfile === 'io' ? 'io' : 'cpu'
  return {
    ...config,
    cpuCapacity,
    ioCapacity,
    workerCount: Math.max(1, Math.min(4, Math.round(config.workerCount))),
    workflowCacheCapacity: Math.max(0, Math.min(50, Math.round(config.workflowCacheCapacity))),
    workflowCacheEntryMemoryMb: Math.max(1, Math.min(16, Math.round(config.workflowCacheEntryMemoryMb))),
    memoryCapacityMb: Math.max(64, Math.min(1_024, Math.round(config.memoryCapacityMb / 16) * 16)),
    workflowTaskResourceProfile,
    activityTaskResourceProfile,
    taskResourceProfilesLocked: Boolean(config.taskResourceProfilesLocked),
    workflowTaskCpuDemand: cpuDemand(config.workflowTaskCpuDemand),
    activityTaskCpuDemand: cpuDemand(config.activityTaskCpuDemand),
    workflowTaskIoDemand: cpuDemand(config.workflowTaskIoDemand),
    activityTaskIoDemand: cpuDemand(config.activityTaskIoDemand),
    workflowTaskBaseDurationSeconds: taskDuration(config.workflowTaskBaseDurationSeconds),
    activityTaskBaseDurationSeconds: taskDuration(config.activityTaskBaseDurationSeconds),
    workflowTaskDurationJitterPercent: durationJitter(config.workflowTaskDurationJitterPercent),
    activityTaskDurationJitterPercent: durationJitter(config.activityTaskDurationJitterPercent),
    workflowTaskReplayLatencySeconds: taskDuration(config.workflowTaskReplayLatencySeconds),
  }
}

interface CompletionRecord {
  timestamp: number
  type: 'activity' | 'workflow'
}

interface SlotResidenceRecord {
  timestamp: number
  seconds: number
}

interface TaskCompletionRecord {
  timestamp: number
  type: TaskType
}

interface TaskLatencyRecord extends TaskCompletionRecord {
  seconds: number
}

interface LoadTestRound {
  startedAt: number
  endedAt: number | null
  latencies: Record<TaskType, TaskLatencyHistogram>
}

interface TaskDeliveryRecord {
  timestamp: number
  type: TaskType
  syncMatched: boolean
}

interface TaskThroughputRound {
  id: number
  startedAt: number
  workflowBaseline: number
  activityBaseline: number
}

interface InternalWorkflowCacheEntry extends WorkflowCacheEntry {
  lastUsedOrder: number
}

interface WorkerRuntime {
  id: string
  displayId: string
  status: 'active' | 'draining'
  cpuUtilization: number
  cpuDemand: number
  cpuThrottled: boolean
  ioUtilization: number
  ioDemand: number
  ioThrottled: boolean
}

export class Simulation {
  private config: SimulationConfig
  private readonly seed: number
  private time = 0
  private arrivalAccumulator = 0
  private nextWorkflowId = 1
  private nextWorkflowTaskId = 1
  private nextActivityTaskId = 1
  private nextEventId = 1
  private workflows = new Map<string, WorkflowExecution>()
  private tasks = new Map<string, SimulationTask>()
  private workflowQueue: string[] = []
  private activityQueue: string[] = []
  private workflowPollers: Poller[] = []
  private activityPollers: Poller[] = []
  private workflowSlots: Slot[] = []
  private activitySlots: Slot[] = []
  private workflowCache = new Map<string, InternalWorkflowCacheEntry>()
  private workers = new Map<string, WorkerRuntime>()
  private workflowRoundRobinIndex = 0
  private activityRoundRobinIndex = 0
  private cacheAccessSequence = 0
  private cacheHits = 0
  private cacheMisses = 0
  private cacheEvictions = 0
  private replaysStarted = 0
  private replayCpuSeconds = 0
  private events: SemanticEvent[] = []
  private completions: CompletionRecord[] = []
  private slotResidences: SlotResidenceRecord[] = []
  private taskCompletions: TaskCompletionRecord[] = []
  private taskLatencies: TaskLatencyRecord[] = []
  private taskThroughputHistory: TaskThroughputSample[] = [{
    timestamp: 0,
    total: 0,
    workflow: 0,
    activity: 0,
    throttled: false,
    replaying: false,
  }]
  private taskLatencyHistory: TaskTypeMetricSample[] = [this.emptyTaskTypeMetricSample()]
  private taskCompletionTotals = { workflow: 0, activity: 0 }
  private nextTaskThroughputRoundId = 1
  private taskThroughputRound: TaskThroughputRound | null = null
  private loadTestRound: LoadTestRound | null = null
  private lastRoundTaskThroughput: RoundTaskThroughputSample | null = null
  private taskDeliveries: TaskDeliveryRecord[] = []
  private pollerBusyRatioHistory: TaskTypeMetricSample[] = [this.emptyTaskTypeMetricSample()]
  private slotUtilizationHistory: TaskTypeMetricSample[] = [this.emptyTaskTypeMetricSample()]
  private syncMatchRateHistory: TaskTypeMetricSample[] = [this.emptyTaskTypeMetricSample()]
  private backlogHistory: TaskTypeMetricSample[] = [this.emptyTaskTypeMetricSample()]
  private cpuUtilizationHistory: MetricSample[] = []
  private memoryUtilizationHistory: MetricSample[] = []
  private ioUtilizationHistory: MetricSample[] = []
  private cpuUtilization = 0
  private cpuDemand = 0
  private cpuThrottled = false
  private memoryPressureUntil = 0
  private ioUtilization = 0
  private ioDemand = 0
  private ioThrottled = false
  private throttledSinceLastMetricSample = false
  private replayingSinceLastMetricSample = false
  private cpuThrottledSinceLastMetricSample = false
  private memoryPressureSinceLastMetricSample = false
  private ioThrottledSinceLastMetricSample = false
  private metricSampleStride = 1
  private scheduleToStartTotals = { workflow: { seconds: 0, count: 0 }, activity: { seconds: 0, count: 0 } }

  constructor(config: Partial<SimulationConfig> = {}, seed = 1) {
    this.config = normalizeConfig({ ...defaultConfig, ...config })
    this.seed = seed
    this.syncCapacity()
    this.initializeResourceUtilizationHistories()
  }

  step(deltaSeconds = TICK_SECONDS): void {
    const ticks = Math.round(deltaSeconds / TICK_SECONDS)
    for (let index = 0; index < ticks; index += 1) this.tick()
  }

  updateConfig(changes: Partial<SimulationConfig>): void {
    const previousWorkflowProfile = this.config.workflowTaskResourceProfile
    const previousActivityProfile = this.config.activityTaskResourceProfile
    const profilesLocked = changes.taskResourceProfilesLocked ?? this.config.taskResourceProfilesLocked
    const merged = { ...this.config, ...changes }
    if (profilesLocked) {
      const sharedProfile = changes.workflowTaskResourceProfile
        ?? changes.activityTaskResourceProfile
        ?? this.config.workflowTaskResourceProfile
      merged.workflowTaskResourceProfile = sharedProfile
      merged.activityTaskResourceProfile = sharedProfile
    }
    this.config = normalizeConfig(merged)
    for (const entry of this.workflowCache.values()) {
      entry.memoryMb = this.config.workflowCacheEntryMemoryMb
    }
    if (this.config.workflowTaskResourceProfile !== previousWorkflowProfile) {
      this.reprofilePendingTasks('workflow', this.config.workflowTaskResourceProfile)
    }
    if (this.config.activityTaskResourceProfile !== previousActivityProfile) {
      this.reprofilePendingTasks('activity', this.config.activityTaskResourceProfile)
    }
    this.syncCapacity()
    this.enforceCacheLimits()
  }

  startWorkflow(): void {
    this.startWorkflows(1)
  }

  startWorkflows(count: number): void {
    const total = Math.max(0, Math.floor(count))
    for (let index = 0; index < total; index += 1) this.createWorkflow()
  }

  startContinuousGeneration(): void {
    this.arrivalAccumulator = 0
    this.createWorkflow()
  }

  beginTaskThroughputRound(): void {
    if (this.taskThroughputRound) return
    this.taskThroughputRound = {
      id: this.nextTaskThroughputRoundId++,
      startedAt: this.time,
      workflowBaseline: this.taskCompletionTotals.workflow,
      activityBaseline: this.taskCompletionTotals.activity,
    }
    this.loadTestRound = {
      startedAt: this.time,
      endedAt: null,
      latencies: { workflow: emptyLatencyHistogram(), activity: emptyLatencyHistogram() },
    }
  }

  endTaskThroughputRound(): void {
    if (!this.taskThroughputRound) return
    this.lastRoundTaskThroughput = this.currentRoundTaskThroughput()
    if (this.loadTestRound) this.loadTestRound.endedAt = this.time
    this.taskThroughputRound = null
  }

  reset(): void {
    const config = { ...this.config }
    this.time = 0
    this.arrivalAccumulator = 0
    this.nextWorkflowId = 1
    this.nextWorkflowTaskId = 1
    this.nextActivityTaskId = 1
    this.nextEventId = 1
    this.workflows.clear()
    this.tasks.clear()
    this.workflowQueue = []
    this.activityQueue = []
    this.events = []
    this.completions = []
    this.slotResidences = []
    this.taskCompletions = []
    this.taskLatencies = []
    this.taskThroughputHistory = [{ timestamp: 0, total: 0, workflow: 0, activity: 0, throttled: false, replaying: false }]
    this.taskLatencyHistory = [this.emptyTaskTypeMetricSample()]
    this.taskCompletionTotals = { workflow: 0, activity: 0 }
    this.nextTaskThroughputRoundId = 1
    this.taskThroughputRound = null
    this.loadTestRound = null
    this.lastRoundTaskThroughput = null
    this.taskDeliveries = []
    this.pollerBusyRatioHistory = [this.emptyTaskTypeMetricSample()]
    this.slotUtilizationHistory = [this.emptyTaskTypeMetricSample()]
    this.syncMatchRateHistory = [this.emptyTaskTypeMetricSample()]
    this.backlogHistory = [this.emptyTaskTypeMetricSample()]
    this.cpuUtilizationHistory = []
    this.memoryUtilizationHistory = []
    this.ioUtilizationHistory = []
    this.cpuUtilization = 0
    this.cpuDemand = 0
    this.cpuThrottled = false
    this.memoryPressureUntil = 0
    this.ioUtilization = 0
    this.ioDemand = 0
    this.ioThrottled = false
    this.throttledSinceLastMetricSample = false
    this.replayingSinceLastMetricSample = false
    this.cpuThrottledSinceLastMetricSample = false
    this.memoryPressureSinceLastMetricSample = false
    this.ioThrottledSinceLastMetricSample = false
    this.metricSampleStride = 1
    this.scheduleToStartTotals = { workflow: { seconds: 0, count: 0 }, activity: { seconds: 0, count: 0 } }
    this.config = config
    this.workflowPollers = []
    this.activityPollers = []
    this.workflowSlots = []
    this.activitySlots = []
    this.workflowCache.clear()
    this.workers.clear()
    this.workflowRoundRobinIndex = 0
    this.activityRoundRobinIndex = 0
    this.cacheAccessSequence = 0
    this.cacheHits = 0
    this.cacheMisses = 0
    this.cacheEvictions = 0
    this.replaysStarted = 0
    this.replayCpuSeconds = 0
    this.syncCapacity()
    this.initializeResourceUtilizationHistories()
  }

  getSnapshot(): SimulationSnapshot {
    const scheduleToStart = (type: TaskType) => {
      const totals = this.scheduleToStartTotals[type]
      return totals.count === 0 ? 0 : totals.seconds / totals.count
    }
    const cutoff = this.time - METRIC_WINDOW_SECONDS
    const recent = this.completions.filter((record) => record.timestamp > cutoff)
    const slotResidenceSeconds = this.currentSlotResidenceSeconds()
    const taskThroughput = this.currentTaskThroughput()
    const memoryUsedMb = this.currentMemoryUsedMb()
    const cacheRequests = this.cacheHits + this.cacheMisses
    const workers = this.workerSnapshots()
    return {
      simulatedTime: this.time,
      config: { ...this.config },
      workflows: [...this.workflows.values()].map((workflow) => ({ ...workflow })),
      tasks: [...this.tasks.values()].map((task) => ({ ...task })),
      workflowQueue: [...this.workflowQueue],
      activityQueue: [...this.activityQueue],
      workers,
      workflowPollers: this.workflowPollers.map((poller) => ({ ...poller })),
      activityPollers: this.activityPollers.map((poller) => ({ ...poller })),
      workflowSlots: this.workflowSlots.map((slot) => ({ ...slot })),
      activitySlots: this.activitySlots.map((slot) => ({ ...slot })),
      cpuUtilization: this.cpuUtilization,
      cpuDemand: this.cpuDemand,
      cpuThrottled: this.cpuThrottled,
      memoryUtilization: Math.min(memoryUsedMb / (this.config.memoryCapacityMb * Math.max(1, workers.length)), 1),
      memoryUsedMb,
      memoryPressure: this.time < this.memoryPressureUntil,
      ioUtilization: this.ioUtilization,
      ioDemand: this.ioDemand,
      ioThrottled: this.ioThrottled,
      workflowCache: this.cacheEntries(),
      cacheMetrics: {
        cacheSize: this.workflowCache.size,
        cacheCapacity: this.config.workflowCacheCapacity * workers.filter((worker) => worker.status === 'active').length,
        cacheHits: this.cacheHits,
        cacheMisses: this.cacheMisses,
        cacheEvictions: this.cacheEvictions,
        cacheHitRate: cacheRequests === 0 ? 0 : this.cacheHits / cacheRequests,
        replaysStarted: this.replaysStarted,
        replayCpuSeconds: this.replayCpuSeconds,
      },
      metrics: {
        activityThroughput: recent.filter((record) => record.type === 'activity').length / METRIC_WINDOW_SECONDS,
        totalTaskThroughput: taskThroughput.total,
        workflowTaskThroughput: taskThroughput.workflow,
        activityTaskThroughput: taskThroughput.activity,
        workflowCompletions: recent.filter((record) => record.type === 'workflow').length / METRIC_WINDOW_SECONDS,
        slotResidenceSeconds,
        workflowScheduleToStart: scheduleToStart('workflow'),
        activityScheduleToStart: scheduleToStart('activity'),
      },
      taskThroughputHistory: this.taskThroughputHistory.map((sample) => ({ ...sample })),
      taskLatencyHistory: this.taskLatencyHistory.map((sample) => ({ ...sample })),
      taskDistribution: this.currentTaskDistribution(),
      roundTaskThroughput: this.currentRoundTaskThroughput(),
      pollerBusyRatioHistory: this.pollerBusyRatioHistory.map((sample) => ({ ...sample })),
      slotUtilizationHistory: this.slotUtilizationHistory.map((sample) => ({ ...sample })),
      syncMatchRateHistory: this.syncMatchRateHistory.map((sample) => ({ ...sample })),
      backlogHistory: this.backlogHistory.map((sample) => ({ ...sample })),
      cpuUtilizationHistory: this.cpuUtilizationHistory.map((sample) => ({ ...sample })),
      memoryUtilizationHistory: this.memoryUtilizationHistory.map((sample) => ({ ...sample })),
      ioUtilizationHistory: this.ioUtilizationHistory.map((sample) => ({ ...sample })),
      recentEvents: this.events.slice(-MAX_RECENT_EVENTS).map((event) => ({ ...event })),
    }
  }

  getEventsSince(eventId: number): SemanticEvent[] {
    return this.events.filter((event) => event.id > eventId).map((event) => ({ ...event }))
  }

  private tick(): void {
    this.time = this.round(this.time + TICK_SECONDS)
    this.generateArrivals()
    this.advanceWorkflowStarts()
    this.advanceQueueAdmissions()
    this.advanceSlotDispatches()
    this.advanceDispatches('workflow')
    this.advanceDispatches('activity')
    this.advanceCompletionReturns()
    this.advanceStickyFallbacks()
    this.trimRetiredPollers()
    this.dispatch('workflow')
    this.dispatch('activity')
    this.allocateResources()
    this.enforceCacheLimits()
    this.throttledSinceLastMetricSample ||= this.time < this.memoryPressureUntil
    this.memoryPressureSinceLastMetricSample ||= this.time < this.memoryPressureUntil
    this.removeDrainedSlots()
    this.removeDrainedWorkers()
    this.removeRetiredWorkflows()
    this.completions = this.completions.filter(
      (record) => record.timestamp > this.time - METRIC_WINDOW_SECONDS,
    )
    this.slotResidences = this.slotResidences.filter(
      (record) => record.timestamp > this.time - METRIC_WINDOW_SECONDS,
    )
    this.taskCompletions = this.taskCompletions.filter(
      (record) => record.timestamp > this.time - METRIC_WINDOW_SECONDS,
    )
    this.taskDeliveries = this.taskDeliveries.filter(
      (record) => record.timestamp > this.time - METRIC_WINDOW_SECONDS,
    )
    this.taskLatencies = this.taskLatencies.filter(
      (record) => record.timestamp > this.time - METRIC_WINDOW_SECONDS,
    )
    const tickNumber = Math.round(this.time / TICK_SECONDS)
    const sampleEveryTicks = Math.round(METRIC_SAMPLE_SECONDS / TICK_SECONDS) * this.metricSampleStride
    if (tickNumber % sampleEveryTicks === 0) {
      const throttled = this.throttledSinceLastMetricSample
      const replaying = this.replayingSinceLastMetricSample
      this.taskThroughputHistory.push({
        timestamp: this.time,
        ...this.currentTaskThroughput(),
        throttled,
        replaying,
      })
      this.taskLatencyHistory.push(this.metricSample(this.currentTaskLatency(), throttled, replaying))
      this.pollerBusyRatioHistory.push(this.metricSample(this.currentPollerBusyRatio(), throttled, replaying))
      this.slotUtilizationHistory.push(this.metricSample(this.currentSlotUtilization(), throttled, replaying))
      this.syncMatchRateHistory.push(this.metricSample(this.currentSyncMatchRate(), throttled, replaying))
      this.backlogHistory.push(this.metricSample(this.currentBacklog(), throttled, replaying))
      this.cpuUtilizationHistory.push({
        timestamp: this.time,
        value: this.cpuUtilization,
        throttled: this.cpuThrottledSinceLastMetricSample,
        replaying: false,
      })
      this.memoryUtilizationHistory.push({
        timestamp: this.time,
        value: this.currentMemoryUtilization(),
        throttled: this.memoryPressureSinceLastMetricSample,
        replaying: false,
      })
      this.ioUtilizationHistory.push({
        timestamp: this.time,
        value: this.ioUtilization,
        throttled: this.ioThrottledSinceLastMetricSample,
        replaying: false,
      })
      this.throttledSinceLastMetricSample = false
      this.replayingSinceLastMetricSample = false
      this.cpuThrottledSinceLastMetricSample = false
      this.memoryPressureSinceLastMetricSample = false
      this.ioThrottledSinceLastMetricSample = false
      if (this.taskThroughputHistory.length > MAX_METRIC_HISTORY_SAMPLES) this.compactMetricHistories()
    }
  }

  // Charts span the whole run, so long runs halve their sample density
  // instead of growing without bound. Merged samples keep throttle and
  // replay flags so chart bands survive compaction.
  private compactMetricHistories(): void {
    this.metricSampleStride *= 2
    this.taskThroughputHistory = compactSamples(this.taskThroughputHistory)
    this.taskLatencyHistory = compactSamples(this.taskLatencyHistory)
    this.pollerBusyRatioHistory = compactSamples(this.pollerBusyRatioHistory)
    this.slotUtilizationHistory = compactSamples(this.slotUtilizationHistory)
    this.syncMatchRateHistory = compactSamples(this.syncMatchRateHistory)
    this.backlogHistory = compactSamples(this.backlogHistory)
    this.cpuUtilizationHistory = compactSamples(this.cpuUtilizationHistory)
    this.memoryUtilizationHistory = compactSamples(this.memoryUtilizationHistory)
    this.ioUtilizationHistory = compactSamples(this.ioUtilizationHistory)
  }

  private removeRetiredWorkflows(): void {
    const cutoff = this.time - COMPLETED_WORKFLOW_RETENTION_SECONDS
    for (const workflow of this.workflows.values()) {
      if (workflow.state === 'completed' && workflow.completedAt! <= cutoff) this.workflows.delete(workflow.id)
    }
  }

  private currentSlotResidenceSeconds(): number {
    if (this.slotResidences.length === 0) return 0
    return this.slotResidences.reduce((sum, record) => sum + record.seconds, 0) / this.slotResidences.length
  }

  private currentTaskThroughput(): Pick<TaskThroughputSample, 'total' | 'workflow' | 'activity'> {
    const workflow = this.taskCompletions.filter((record) => record.type === 'workflow').length / METRIC_WINDOW_SECONDS
    const activity = this.taskCompletions.filter((record) => record.type === 'activity').length / METRIC_WINDOW_SECONDS
    return { total: workflow + activity, workflow, activity }
  }

  private currentTaskLatency(): Pick<TaskTypeMetricSample, 'total' | 'workflow' | 'activity'> {
    const cutoff = this.time - METRIC_WINDOW_SECONDS
    const recent = this.taskLatencies.filter((record) => record.timestamp > cutoff)
    const average = (type?: TaskType) => {
      const records = type ? recent.filter((record) => record.type === type) : recent
      return records.length === 0
        ? 0
        : records.reduce((sum, record) => sum + record.seconds, 0) / records.length
    }
    return { total: average(), workflow: average('workflow'), activity: average('activity') }
  }

  private currentTaskDistribution(): TaskDistribution {
    const round = this.loadTestRound
    const empty = () => this.taskDistributionStats(emptyLatencyHistogram(), 0)
    if (!round) return { total: empty(), workflow: empty(), activity: empty() }
    const endedAt = round.endedAt ?? this.time
    const elapsed = Math.max(endedAt - round.startedAt, 0)
    const { workflow, activity } = round.latencies
    return {
      total: this.taskDistributionStats(mergeLatencyHistograms(workflow, activity), elapsed),
      workflow: this.taskDistributionStats(workflow, elapsed),
      activity: this.taskDistributionStats(activity, elapsed),
    }
  }

  private taskDistributionStats(histogram: TaskLatencyHistogram, elapsed: number): TaskDistributionStats {
    const latencies = [...histogram.counts.keys()].sort((left, right) => left - right)
    const completed = histogram.completed
    const percentile = (fraction: number) => {
      const rank = Math.max(1, Math.ceil(completed * fraction))
      let seen = 0
      for (const latency of latencies) {
        seen += histogram.counts.get(latency)!
        if (seen >= rank) return latency
      }
      return 0
    }
    return {
      completed,
      throughput: elapsed === 0 ? 0 : completed / elapsed,
      averageLatency: completed === 0 ? 0 : histogram.totalSeconds / completed,
      p25Latency: percentile(0.25),
      p50Latency: percentile(0.5),
      p75Latency: percentile(0.75),
      p95Latency: percentile(0.95),
      p99Latency: percentile(0.99),
      maxLatency: latencies.at(-1) ?? 0,
    }
  }

  private emptyTaskTypeMetricSample(): TaskTypeMetricSample {
    return { timestamp: 0, total: 0, workflow: 0, activity: 0, throttled: false, replaying: false }
  }

  private initializeResourceUtilizationHistories(): void {
    this.cpuUtilizationHistory = [{ timestamp: this.time, value: this.cpuUtilization, throttled: false, replaying: false }]
    this.memoryUtilizationHistory = [{ timestamp: this.time, value: this.currentMemoryUtilization(), throttled: false, replaying: false }]
    this.ioUtilizationHistory = [{ timestamp: this.time, value: this.ioUtilization, throttled: false, replaying: false }]
  }

  private currentMemoryUtilization(): number {
    const capacity = this.config.memoryCapacityMb * Math.max(1, this.workers.size)
    return Math.min(this.currentMemoryUsedMb() / capacity, 1)
  }

  private metricSample(
    values: Pick<TaskTypeMetricSample, 'total' | 'workflow' | 'activity'>,
    throttled: boolean,
    replaying: boolean,
  ): TaskTypeMetricSample {
    return { timestamp: this.time, ...values, throttled, replaying }
  }

  private currentPollerBusyRatio(): Pick<TaskTypeMetricSample, 'total' | 'workflow' | 'activity'> {
    const ratio = (pollers: Poller[]) => pollers.length === 0
      ? 0
      : pollers.filter((poller) => poller.state !== 'long-polling').length / pollers.length
    const workflow = ratio(this.workflowPollers)
    const activity = ratio(this.activityPollers)
    return { total: Math.max(workflow, activity), workflow, activity }
  }

  private currentSlotUtilization(): Pick<TaskTypeMetricSample, 'total' | 'workflow' | 'activity'> {
    const ratio = (slots: Slot[]) => slots.length === 0
      ? 0
      : slots.filter((slot) => slot.taskId !== undefined).length / slots.length
    const workflow = ratio(this.workflowSlots)
    const activity = ratio(this.activitySlots)
    return { total: Math.max(workflow, activity), workflow, activity }
  }

  private currentSyncMatchRate(): Pick<TaskTypeMetricSample, 'total' | 'workflow' | 'activity'> {
    const rate = (type?: TaskType) => {
      const records = type ? this.taskDeliveries.filter((record) => record.type === type) : this.taskDeliveries
      return records.length === 0 ? 0 : records.filter((record) => record.syncMatched).length / records.length
    }
    const workflow = rate('workflow')
    const activity = rate('activity')
    return { total: Math.max(workflow, activity), workflow, activity }
  }

  private currentBacklog(): Pick<TaskTypeMetricSample, 'total' | 'workflow' | 'activity'> {
    const workflow = this.workflowQueue.length
    const activity = this.activityQueue.length
    return { total: workflow + activity, workflow, activity }
  }

  private currentRoundTaskThroughput(): RoundTaskThroughputSample | null {
    const round = this.taskThroughputRound
    if (!round) return this.lastRoundTaskThroughput
    const elapsedSeconds = this.round(this.time - round.startedAt)
    const workflowCompleted = this.taskCompletionTotals.workflow - round.workflowBaseline
    const activityCompleted = this.taskCompletionTotals.activity - round.activityBaseline
    const workflow = elapsedSeconds === 0 ? 0 : workflowCompleted / elapsedSeconds
    const activity = elapsedSeconds === 0 ? 0 : activityCompleted / elapsedSeconds
    return {
      timestamp: this.time,
      roundId: round.id,
      elapsedSeconds,
      total: workflow + activity,
      workflow,
      activity,
      throttled: false,
      replaying: false,
    }
  }

  private trimRetiredPollers(): void {
    this.workflowPollers = this.trimPollers(this.workflowPollers, this.config.workflowPollers)
    this.activityPollers = this.trimPollers(this.activityPollers, this.config.activityPollers)
  }

  private trimPollers(pollers: Poller[], target: number): Poller[] {
    return [...this.workers.values()].flatMap((worker) => {
      const workerPollers = pollers.filter((poller) => poller.workerId === worker.id)
      if (worker.status === 'draining') {
        return workerPollers.filter((poller) => poller.state !== 'long-polling')
      }
      const busy = workerPollers.filter((poller) => poller.state !== 'long-polling')
      const idle = workerPollers.filter((poller) => poller.state === 'long-polling')
      return [...busy, ...idle.slice(0, Math.max(0, target - busy.length))]
    }).sort((a, b) =>
      a.workerId.localeCompare(b.workerId, undefined, { numeric: true })
      || a.id.localeCompare(b.id, undefined, { numeric: true }))
  }

  private generateArrivals(): void {
    this.arrivalAccumulator += this.config.workflowStartRate * TICK_SECONDS
    while (this.arrivalAccumulator >= 1) {
      this.arrivalAccumulator -= 1
      this.createWorkflow()
    }
  }

  private createWorkflow(): void {
    const ordinal = this.nextWorkflowId++
    const id = `workflow-${ordinal}`
    const workflow: WorkflowExecution = {
      id,
      displayId: `W${ordinal}`,
      state: 'initial',
      createdAt: this.time,
      initialTaskIssueJitter: this.workflowIssueJitter(ordinal),
      activitiesExpected: this.config.activitiesPerWorkflow,
      activityFanout: this.config.activityFanout,
      activitiesScheduled: 0,
      activitiesCompleted: 0,
      pendingWorkflowEvents: 1,
      workflowTaskOutstanding: false,
      finalWorkflowTaskScheduled: false,
      historyUnits: 1,
      cachedWorkerId: null,
      lastCacheAccessAt: null,
    }
    this.emit('WORKFLOW_START_REQUESTED', { workflowId: id })
    this.workflows.set(id, workflow)
    this.emit('WORKFLOW_CREATED', { workflowId: id })
  }

  private advanceWorkflowStarts(): void {
    for (const workflow of this.workflows.values()) {
      if (workflow.state !== 'initial' || workflow.workflowTaskOutstanding) continue
      const issueAt = workflow.createdAt
        + WORKFLOW_START_TRANSIT_SECONDS
        + WORKFLOW_TASK_ISSUE_DELAY_SECONDS
        + workflow.initialTaskIssueJitter
      if (this.time < this.round(issueAt)) continue
      this.scheduleWorkflowTask(workflow, 'initial')
    }
  }

  private scheduleWorkflowTask(
    workflow: WorkflowExecution,
    phase: 'initial' | 'decision' | 'final',
    source?: SimulationTask,
  ): void {
    if (workflow.workflowTaskOutstanding) return
    const resourceProfile = this.config.workflowTaskResourceProfile
    const resourceDemand = this.taskResourceDemand('workflow', resourceProfile)
    const taskOrdinal = this.nextWorkflowTaskId++
    const executionDurationSeconds = this.taskExecutionDuration('workflow', taskOrdinal)
    const resourceWork = this.taskResourceWork('workflow', resourceProfile, executionDurationSeconds)
    const task: WorkflowTask = {
      id: `workflow-task-${taskOrdinal}`,
      workflowId: workflow.id,
      type: 'workflow',
      phase,
      state: 'enqueuing',
      scheduledAt: this.time,
      enqueueStartedAt: this.time,
      enqueueRemaining: QUEUE_ADMISSION_SECONDS,
      dispatchRemaining: 0,
      slotDispatchRemaining: 0,
      completionReturnRemaining: 0,
      cpuWorkRemaining: resourceProfile === 'cpu' ? resourceWork : 0,
      maxCpuDemand: resourceProfile === 'cpu' ? resourceDemand : 0,
      ioWorkRemaining: resourceProfile === 'io' ? resourceWork : 0,
      maxIoDemand: resourceProfile === 'io' ? resourceDemand : 0,
      resourceProfile,
      executionPhase: 'decision',
      executionDurationSeconds,
      replayCpuWorkRemaining: 0,
      replayCpuWorkTotal: 0,
      routingState: source && workflow.cachedWorkerId ? 'sticky-wait' : 'shared-queue',
      preferredWorkerId: source && workflow.cachedWorkerId ? workflow.cachedWorkerId : undefined,
      stickyWaitStartedAt: source && workflow.cachedWorkerId ? this.time : undefined,
      sourceSlotId: source?.assignedSlotId,
      createdFrom: source ? 'activity-slot' : 'workflow',
    }
    this.tasks.set(task.id, task)
    workflow.workflowTaskOutstanding = true
    this.emit('WORKFLOW_TASK_SCHEDULED', {
      workflowId: workflow.id,
      taskId: task.id,
      sourceTaskId: source?.id,
      sourceSlotId: source?.assignedSlotId,
      preferredWorkerId: task.preferredWorkerId,
      routingState: task.routingState,
    })
  }

  private advanceQueueAdmissions(): void {
    for (const task of this.tasks.values()) {
      if (task.state !== 'enqueuing') continue
      if (this.time < task.enqueueStartedAt) continue
      task.enqueueRemaining = this.round(task.enqueueRemaining - TICK_SECONDS)
      if (task.enqueueRemaining > 0) continue
      task.state = 'queued'
      task.queuedAt = this.time
      task.pollEligibleAt = this.round(this.time + QUEUE_DWELL_SECONDS)
      const queue = task.type === 'workflow' ? this.workflowQueue : this.activityQueue
      queue.push(task.id)
      this.emit(task.type === 'workflow' ? 'WORKFLOW_TASK_QUEUED' : 'ACTIVITY_TASK_QUEUED', {
        workflowId: task.workflowId,
        taskId: task.id,
      })
    }
  }

  private advanceDispatches(type: TaskType): void {
    const pollers = this.getPollers(type)
    for (const poller of pollers) {
      if (poller.state !== 'task-received' || !poller.taskId) continue
      const task = this.tasks.get(poller.taskId)
      if (!task) continue
      task.dispatchRemaining = this.round(task.dispatchRemaining - TICK_SECONDS)
      if (task.dispatchRemaining > 0) continue
      task.state = 'dispatching'
      task.slotDispatchStartedAt = this.time
      task.slotDispatchRemaining = SLOT_DISPATCH_SECONDS
      poller.state = 'long-polling'
      poller.taskId = undefined
      this.emit(type === 'workflow' ? 'WORKFLOW_TASK_SLOT_DISPATCH_STARTED' : 'ACTIVITY_TASK_SLOT_DISPATCH_STARTED', {
        workflowId: task.workflowId,
        taskId: task.id,
        pollerId: task.assignedPollerId,
        slotId: task.assignedSlotId,
        workerId: task.assignedWorkerId,
      })
    }
  }

  private advanceSlotDispatches(): void {
    for (const task of this.tasks.values()) {
      if (task.state !== 'dispatching') continue
      task.slotDispatchRemaining = this.round(task.slotDispatchRemaining - TICK_SECONDS)
      if (task.slotDispatchRemaining > 0) continue
      task.state = 'running'
      task.startedAt = this.time
      this.scheduleToStartTotals[task.type].seconds += this.time - task.scheduledAt
      this.scheduleToStartTotals[task.type].count += 1
      const slot = this.getSlots(task.type).find((candidate) => candidate.id === task.assignedSlotId)
      if (slot && slot.state !== 'draining') slot.state = 'occupied'
      this.emit(task.type === 'workflow' ? 'WORKFLOW_TASK_STARTED' : 'ACTIVITY_TASK_STARTED', {
        workflowId: task.workflowId,
        taskId: task.id,
        slotId: task.assignedSlotId,
        workerId: task.assignedWorkerId,
      })
      if (task.type === 'workflow') this.prepareWorkflowTaskExecution(task)
    }
  }

  private dispatch(type: TaskType): void {
    const queue = type === 'workflow' ? this.workflowQueue : this.activityQueue
    let dispatched = true
    while (dispatched) {
      dispatched = false
      for (let queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
        const task = this.tasks.get(queue[queueIndex])!
        if ((task.pollEligibleAt ?? Infinity) > this.time) continue
        const worker = this.selectWorkerForTask(task)
        if (!worker) continue
        const poller = this.getPollers(type).find((candidate) =>
          candidate.workerId === worker.id && candidate.state === 'long-polling',
        )!
        const slot = this.getSlots(type).find((candidate) =>
          candidate.workerId === worker.id && candidate.state === 'available',
        )!
        queue.splice(queueIndex, 1)
        this.taskDeliveries.push({
          timestamp: this.time,
          type,
          syncMatched: this.time - (task.pollEligibleAt ?? this.time) <= TICK_SECONDS / 2,
        })
      task.state = 'acquired'
      task.dispatchStartedAt = this.time
      task.dispatchRemaining = POLL_DISPATCH_SECONDS
      task.assignedPollerId = poller.id
      task.assignedSlotId = slot.id
        task.assignedWorkerId = worker.id
        task.dispatchBatchIndex = queueIndex
      poller.state = 'task-received'
      poller.taskId = task.id
      slot.state = 'reserved'
      slot.taskId = task.id
      this.emit(type === 'workflow' ? 'WORKFLOW_TASK_DISPATCH_STARTED' : 'ACTIVITY_TASK_DISPATCH_STARTED', {
        workflowId: task.workflowId,
        taskId: task.id,
        pollerId: poller.id,
        slotId: slot.id,
          workerId: worker.id,
      })
        dispatched = true
        break
      }
    }
  }

  private selectWorkerForTask(task: SimulationTask): WorkerRuntime | undefined {
    const type = task.type
    const eligible = [...this.workers.values()]
      .filter((worker) => worker.status === 'active')
      .filter((worker) => this.getPollers(type).some((poller) =>
        poller.workerId === worker.id && poller.state === 'long-polling',
      ))
      .filter((worker) => this.getSlots(type).some((slot) =>
        slot.workerId === worker.id && slot.state === 'available',
      ))
      .sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true }))
    if (task.type === 'workflow' && task.routingState === 'sticky-wait') {
      return eligible.find((worker) => worker.id === task.preferredWorkerId)
    }
    if (eligible.length === 0) return undefined
    const pointer = type === 'workflow' ? this.workflowRoundRobinIndex : this.activityRoundRobinIndex
    const activeIds = [...this.workers.values()]
      .filter((worker) => worker.status === 'active')
      .sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true }))
      .map((worker) => worker.id)
    for (let offset = 0; offset < activeIds.length; offset += 1) {
      const index = (pointer + offset) % activeIds.length
      const worker = eligible.find((candidate) => candidate.id === activeIds[index])
      if (!worker) continue
      if (type === 'workflow') this.workflowRoundRobinIndex = (index + 1) % activeIds.length
      else this.activityRoundRobinIndex = (index + 1) % activeIds.length
      return worker
    }
    return undefined
  }

  private advanceStickyFallbacks(): void {
    for (const task of this.tasks.values()) {
      if (task.type !== 'workflow' || task.state !== 'queued' || task.routingState !== 'sticky-wait') continue
      if (task.stickyWaitStartedAt === undefined) continue
      if (this.time - task.stickyWaitStartedAt < STICKY_SCHEDULE_TO_START_TIMEOUT_SECONDS) continue
      const previousWorkerId = task.preferredWorkerId
      task.routingState = 'shared-fallback'
      task.stickyFallbackAt = this.time
      task.preferredWorkerId = undefined
      this.emit('STICKY_FALLBACK', {
        workflowId: task.workflowId,
        taskId: task.id,
        workerId: previousWorkerId,
        routingState: task.routingState,
      })
    }
  }

  private allocateResources(): void {
    const running = [...this.tasks.values()].filter((task) => task.state === 'running')
    const replayingAtTickStart = new Set(
      running.filter((task) => task.replayCpuWorkRemaining > 0).map((task) => task.id),
    )
    this.replayingSinceLastMetricSample ||= replayingAtTickStart.size > 0
    const cpuDemandFor = (task: SimulationTask) => task.replayCpuWorkRemaining > 0
      ? REPLAY_CPU_DEMAND
      : task.maxCpuDemand
    for (const worker of this.workers.values()) {
      const workerRunning = running.filter((task) => task.assignedWorkerId === worker.id)
      const cpuActive = workerRunning.filter((task) => task.replayCpuWorkRemaining > 0 || task.cpuWorkRemaining > 0)
      const desiredCpu = cpuActive.reduce((sum, task) => sum + cpuDemandFor(task), 0)
      worker.cpuDemand = desiredCpu
      worker.cpuUtilization = Math.min(desiredCpu / this.config.cpuCapacity, 1)
      const cpuScale = resourceProgressScale(desiredCpu, this.config.cpuCapacity, {
        knee: CPU_CONTENTION_KNEE,
        maxSpeedLoss: CPU_MAX_CONTENTION_SPEED_LOSS,
      })
      worker.cpuThrottled = desiredCpu > 0 && cpuScale < 1
      for (const task of cpuActive) {
        const workDone = cpuDemandFor(task) * cpuScale * TICK_SECONDS
        if (task.replayCpuWorkRemaining > 0) {
          task.replayCpuWorkRemaining = this.round(task.replayCpuWorkRemaining - workDone)
          if (task.replayCpuWorkRemaining <= 0) {
            task.replayCpuWorkRemaining = 0
            task.executionPhase = 'decision'
            this.emit('REPLAY_COMPLETED', {
              workflowId: task.workflowId,
              taskId: task.id,
              workerId: worker.id,
              replayCpuSeconds: task.replayCpuWorkTotal,
            })
            if (task.type === 'workflow' && task.phase !== 'final') {
              const workflow = this.workflows.get(task.workflowId)!
              this.cacheWorkflow(workflow, worker.id)
            }
          }
        } else {
          task.cpuWorkRemaining = this.round(task.cpuWorkRemaining - workDone)
        }
      }

      const ioActive = workerRunning.filter((task) =>
        !replayingAtTickStart.has(task.id) && task.replayCpuWorkRemaining <= 0 && task.ioWorkRemaining > 0,
      )
      const desiredIo = ioActive.reduce((sum, task) => sum + task.maxIoDemand, 0)
      worker.ioDemand = desiredIo
      worker.ioUtilization = Math.min(desiredIo / this.config.ioCapacity, 1)
      const ioScale = resourceProgressScale(desiredIo, this.config.ioCapacity, {
        knee: IO_CONTENTION_KNEE,
        maxSpeedLoss: IO_MAX_CONTENTION_SPEED_LOSS,
      })
      worker.ioThrottled = desiredIo > 0 && ioScale < 1
      for (const task of ioActive) {
        task.ioWorkRemaining = this.round(
          task.ioWorkRemaining - task.maxIoDemand * ioScale * TICK_SECONDS,
        )
      }
    }
    const workerCount = Math.max(1, this.workers.size)
    this.cpuDemand = this.round([...this.workers.values()].reduce((sum, worker) => sum + worker.cpuDemand, 0))
    this.cpuUtilization = Math.min(this.cpuDemand / (this.config.cpuCapacity * workerCount), 1)
    this.cpuThrottled = [...this.workers.values()].some((worker) => worker.cpuThrottled)
    this.ioDemand = this.round([...this.workers.values()].reduce((sum, worker) => sum + worker.ioDemand, 0))
    this.ioUtilization = Math.min(this.ioDemand / (this.config.ioCapacity * workerCount), 1)
    this.ioThrottled = [...this.workers.values()].some((worker) => worker.ioThrottled)
    this.throttledSinceLastMetricSample ||= this.cpuThrottled || this.ioThrottled
    this.cpuThrottledSinceLastMetricSample ||= this.cpuThrottled
    this.ioThrottledSinceLastMetricSample ||= this.ioThrottled

    for (const task of running) {
      if (task.replayCpuWorkRemaining <= 0 && task.cpuWorkRemaining <= 0 && task.ioWorkRemaining <= 0) {
        this.beginCompletionReturn(task)
      }
    }
  }

  private beginCompletionReturn(task: SimulationTask): void {
    task.state = 'returning'
    task.completionReturnRemaining = COMPLETION_RETURN_SECONDS
    if (task.dispatchStartedAt !== undefined) {
      this.slotResidences.push({
        timestamp: this.time,
        seconds: this.round(this.time - task.dispatchStartedAt),
      })
    }
    const slot = this.getSlots(task.type).find((candidate) => candidate.id === task.assignedSlotId)
    if (slot) {
      slot.taskId = undefined
      this.refreshIdleSlotStates(task.type)
    }
    this.emit(task.type === 'workflow' ? 'WORKFLOW_TASK_RESPONSE_SENT' : 'ACTIVITY_TASK_RESPONSE_SENT', {
      workflowId: task.workflowId,
      taskId: task.id,
      slotId: task.assignedSlotId,
      workerId: task.assignedWorkerId,
    })
    this.emit(task.type === 'workflow' ? 'WORKFLOW_TASK_RETURN_STARTED' : 'ACTIVITY_TASK_RETURN_STARTED', {
      workflowId: task.workflowId,
      taskId: task.id,
      slotId: task.assignedSlotId,
      workerId: task.assignedWorkerId,
    })
  }

  private advanceCompletionReturns(): void {
    for (const task of this.tasks.values()) {
      if (task.state !== 'returning') continue
      task.completionReturnRemaining = this.round(task.completionReturnRemaining - TICK_SECONDS)
      if (task.completionReturnRemaining > 0) continue
      this.completeTask(task)
    }
  }

  private completeTask(task: SimulationTask): void {
    task.state = 'completed'
    task.completedAt = this.time
    this.tasks.delete(task.id)
    const latencySeconds = this.round(this.time - task.scheduledAt)
    this.taskCompletions.push({ timestamp: this.time, type: task.type })
    this.taskLatencies.push({ timestamp: this.time, type: task.type, seconds: latencySeconds })
    if (this.loadTestRound && this.loadTestRound.endedAt === null) {
      recordLatency(this.loadTestRound.latencies[task.type], latencySeconds)
    }
    this.taskCompletionTotals[task.type] += 1
    const workflow = this.workflows.get(task.workflowId)!
    if (task.type === 'workflow') {
      workflow.historyUnits += 1
      workflow.workflowTaskOutstanding = false
      workflow.pendingWorkflowEvents = 0
      this.emit('WORKFLOW_TASK_COMPLETED', {
        workflowId: workflow.id,
        taskId: task.id,
        slotId: task.assignedSlotId,
        workerId: task.assignedWorkerId,
      })
      if (task.phase === 'final') {
        this.completeWorkflow(workflow)
      } else {
        this.cacheWorkflow(workflow, task.assignedWorkerId!)
        this.scheduleActivityBatch(workflow, task)
      }
    } else {
      workflow.activitiesCompleted += 1
      workflow.historyUnits += 1
      workflow.pendingWorkflowEvents += 1
      this.completions.push({ timestamp: this.time, type: 'activity' })
      this.emit('ACTIVITY_TASK_COMPLETED', {
        workflowId: workflow.id,
        taskId: task.id,
        slotId: task.assignedSlotId,
        workerId: task.assignedWorkerId,
      })
      const batchCompleted = workflow.activitiesCompleted === workflow.activitiesScheduled
      if (!batchCompleted) return
      const allActivitiesCompleted = workflow.activitiesCompleted === workflow.activitiesExpected
      if (allActivitiesCompleted && !workflow.finalWorkflowTaskScheduled) {
        workflow.finalWorkflowTaskScheduled = true
        workflow.state = 'final'
        this.ensureWorkflowTask(workflow, 'final', task)
      } else if (!allActivitiesCompleted) {
        workflow.state = 'decision'
        this.ensureWorkflowTask(workflow, 'decision', task)
      }
    }
  }

  private prepareWorkflowTaskExecution(task: WorkflowTask): void {
    const workflow = this.workflows.get(task.workflowId)!
    const workerId = task.assignedWorkerId!
    const entry = this.workflowCache.get(this.cacheKey(workerId, workflow.id))
    if (entry) {
      this.cacheHits += 1
      this.touchCacheEntry(entry, workflow)
      task.cacheOutcome = 'hit'
      this.emit('CACHE_HIT', {
        workflowId: workflow.id,
        taskId: task.id,
        workerId,
      })
      return
    }

    this.cacheMisses += 1
    task.cacheOutcome = 'miss'
    workflow.cachedWorkerId = null
    workflow.lastCacheAccessAt = null
    this.emit('CACHE_MISS', {
      workflowId: workflow.id,
      taskId: task.id,
      workerId,
    })
    const replayCpuWork = this.round(
      Math.max(1, workflow.historyUnits)
      * this.config.workflowTaskReplayLatencySeconds
      * REPLAY_CPU_DEMAND,
    )
    task.executionPhase = 'replay'
    task.replayCpuWorkRemaining = replayCpuWork
    task.replayCpuWorkTotal = replayCpuWork
    this.replaysStarted += 1
    this.replayCpuSeconds = this.round(this.replayCpuSeconds + replayCpuWork)
    this.emit('REPLAY_STARTED', {
      workflowId: workflow.id,
      taskId: task.id,
      workerId,
      replayCpuSeconds: replayCpuWork,
    })
  }

  private cacheWorkflow(workflow: WorkflowExecution, workerId: string): void {
    if (this.config.workflowCacheCapacity === 0) {
      this.removeCachedWorkflow(workflow.id)
      return
    }
    // After a sticky fallback moves the Workflow to another Worker, the
    // previous Worker's cached state is stale.
    for (const entry of [...this.workflowCache.values()]) {
      if (entry.workflowId === workflow.id && entry.workerId !== workerId) {
        this.workflowCache.delete(this.cacheKey(entry.workerId, entry.workflowId))
        this.cacheEvictions += 1
        this.emit('CACHE_EVICTED', { workflowId: workflow.id, workerId: entry.workerId, reason: 'STICKY_FALLBACK' })
      }
    }
    const key = this.cacheKey(workerId, workflow.id)
    const existing = this.workflowCache.get(key)
    if (existing) {
      this.touchCacheEntry(existing, workflow)
      this.emit('CACHE_REFRESHED', {
        workflowId: workflow.id,
        workerId,
      })
      return
    }

    while (this.cacheEntries(workerId).length >= this.config.workflowCacheCapacity) {
      if (!this.evictOldestCacheEntry('CAPACITY', workerId)) break
    }
    const entry: InternalWorkflowCacheEntry = {
      workflowId: workflow.id,
      displayId: workflow.displayId,
      workerId,
      insertedAt: this.time,
      lastUsedAt: this.time,
      lastUsedOrder: ++this.cacheAccessSequence,
      memoryMb: this.config.workflowCacheEntryMemoryMb,
    }
    this.workflowCache.set(key, entry)
    workflow.cachedWorkerId = workerId
    workflow.lastCacheAccessAt = this.time
    this.emit('CACHE_INSERTED', {
      workflowId: workflow.id,
      workerId,
    })
    this.enforceCacheLimits()
  }

  private touchCacheEntry(entry: InternalWorkflowCacheEntry, workflow: WorkflowExecution): void {
    entry.lastUsedAt = this.time
    entry.lastUsedOrder = ++this.cacheAccessSequence
    workflow.cachedWorkerId = entry.workerId
    workflow.lastCacheAccessAt = this.time
  }

  private enforceCacheLimits(): void {
    for (const worker of this.workers.values()) {
      while (this.cacheEntries(worker.id).length > this.config.workflowCacheCapacity) {
        if (!this.evictOldestCacheEntry('CAPACITY', worker.id)) break
      }
      while (this.currentMemoryUsedMb(worker.id) > this.config.memoryCapacityMb && this.cacheEntries(worker.id).length > 0) {
        if (!this.evictOldestCacheEntry('MEMORY_PRESSURE', worker.id)) break
      }
    }
  }

  private evictOldestCacheEntry(reason: 'CAPACITY' | 'MEMORY_PRESSURE', workerId?: string): boolean {
    const oldest = [...this.workflowCache.values()]
      .filter((entry) => workerId === undefined || entry.workerId === workerId)
      .sort((left, right) => left.lastUsedOrder - right.lastUsedOrder || left.workflowId.localeCompare(right.workflowId))[0]
    if (!oldest) return false
    this.workflowCache.delete(this.cacheKey(oldest.workerId, oldest.workflowId))
    const workflow = this.workflows.get(oldest.workflowId)
    if (workflow?.cachedWorkerId === oldest.workerId) {
      workflow.cachedWorkerId = null
      workflow.lastCacheAccessAt = null
    }
    this.cacheEvictions += 1
    if (reason === 'MEMORY_PRESSURE') {
      this.memoryPressureUntil = Math.max(
        this.memoryPressureUntil,
        this.round(this.time + MEMORY_PRESSURE_PULSE_SECONDS),
      )
    }
    this.emit('CACHE_EVICTED', {
      workflowId: oldest.workflowId,
      workerId: oldest.workerId,
      reason,
    })
    return true
  }

  // Removing a completed Workflow is a normal close rather than a forced
  // eviction, so it emits an event without counting toward cacheEvictions.
  private removeCachedWorkflow(workflowId: string, reason?: 'WORKFLOW_COMPLETED'): void {
    for (const entry of [...this.workflowCache.values()]) {
      if (entry.workflowId === workflowId) {
        this.workflowCache.delete(this.cacheKey(entry.workerId, entry.workflowId))
        if (reason) {
          this.emit('CACHE_EVICTED', { workflowId, workerId: entry.workerId, reason })
        }
      }
    }
    const workflow = this.workflows.get(workflowId)
    if (workflow) {
      workflow.cachedWorkerId = null
      workflow.lastCacheAccessAt = null
    }
  }

  private invalidateWorkflowCache(workflowId: string, reason: 'WORKER_REMOVED'): void {
    for (const entry of [...this.workflowCache.values()]) {
      if (entry.workflowId !== workflowId) continue
      this.workflowCache.delete(this.cacheKey(entry.workerId, entry.workflowId))
      this.cacheEvictions += 1
      this.emit('CACHE_EVICTED', { workflowId, workerId: entry.workerId, reason })
    }
    const workflow = this.workflows.get(workflowId)
    if (workflow) {
      workflow.cachedWorkerId = null
      workflow.lastCacheAccessAt = null
    }
  }

  private cacheKey(workerId: string, workflowId: string): string {
    return `${workerId}:${workflowId}`
  }

  private cacheEntries(workerId?: string): WorkflowCacheEntry[] {
    return [...this.workflowCache.values()]
      .filter((entry) => workerId === undefined || entry.workerId === workerId)
      .sort((left, right) => left.lastUsedOrder - right.lastUsedOrder)
      .map(({ lastUsedOrder: _lastUsedOrder, ...entry }) => ({ ...entry }))
  }

  private currentMemoryUsedMb(workerId?: string): number {
    if (workerId === undefined) {
      return [...this.workers.keys()].reduce((sum, id) => sum + this.currentMemoryUsedMb(id), 0)
    }
    const activeWorkerTasks = [...this.tasks.values()].filter((task) =>
      task.assignedWorkerId === workerId
      && (task.state === 'acquired' || task.state === 'dispatching' || task.state === 'running'),
    ).length
    return BASE_WORKER_MEMORY_MB
      + activeWorkerTasks * ACTIVE_TASK_MEMORY_MB
      + this.cacheEntries(workerId).reduce((sum, entry) => sum + entry.memoryMb, 0)
  }

  private reprofilePendingTasks(type: TaskType, profile: 'cpu' | 'io'): void {
    for (const task of this.tasks.values()) {
      if (task.type !== type) continue
      if (task.state === 'running' || task.state === 'returning' || task.state === 'completed') continue
      const resourceDemand = this.taskResourceDemand(task.type, profile)
      const resourceWork = this.taskResourceWork(task.type, profile, task.executionDurationSeconds)
      task.resourceProfile = profile
      task.cpuWorkRemaining = profile === 'cpu' ? resourceWork : 0
      task.maxCpuDemand = profile === 'cpu' ? resourceDemand : 0
      task.ioWorkRemaining = profile === 'io' ? resourceWork : 0
      task.maxIoDemand = profile === 'io' ? resourceDemand : 0
      this.emit('TASK_RESOURCE_PROFILE_CHANGED', {
        workflowId: task.workflowId,
        taskId: task.id,
      })
    }
  }

  private ensureWorkflowTask(
    workflow: WorkflowExecution,
    phase: 'decision' | 'final',
    source: SimulationTask,
  ): void {
    if (workflow.pendingWorkflowEvents <= 0 || workflow.workflowTaskOutstanding) return
    this.scheduleWorkflowTask(workflow, phase, source)
  }

  private scheduleActivityBatch(workflow: WorkflowExecution, sourceTask: WorkflowTask): void {
    workflow.state = 'waiting'
    const remaining = workflow.activitiesExpected - workflow.activitiesScheduled
    const batchSize = Math.min(workflow.activityFanout, remaining)
    const activityTaskIds: string[] = []
    const resourceProfile = this.config.activityTaskResourceProfile
    const resourceDemand = this.taskResourceDemand('activity', resourceProfile)
    for (let batchIndex = 0; batchIndex < batchSize; batchIndex += 1) {
      const activityIndex = workflow.activitiesScheduled + 1
      workflow.activitiesScheduled = activityIndex
      const taskOrdinal = this.nextActivityTaskId++
      const executionDurationSeconds = this.taskExecutionDuration('activity', taskOrdinal)
      const resourceWork = this.taskResourceWork('activity', resourceProfile, executionDurationSeconds)
      const task: ActivityTask = {
        id: `activity-task-${taskOrdinal}`,
        workflowId: workflow.id,
        type: 'activity',
        activityIndex,
        state: 'enqueuing',
        scheduledAt: this.time,
        enqueueStartedAt: this.round(this.time + batchIndex * TASK_ENQUEUE_STAGGER_SECONDS),
        enqueueRemaining: QUEUE_ADMISSION_SECONDS,
        dispatchRemaining: 0,
        slotDispatchRemaining: 0,
        completionReturnRemaining: 0,
        cpuWorkRemaining: resourceProfile === 'cpu' ? resourceWork : 0,
        maxCpuDemand: resourceProfile === 'cpu' ? resourceDemand : 0,
        ioWorkRemaining: resourceProfile === 'io' ? resourceWork : 0,
        maxIoDemand: resourceProfile === 'io' ? resourceDemand : 0,
        resourceProfile,
        executionPhase: 'activity',
        executionDurationSeconds,
        replayCpuWorkRemaining: 0,
        replayCpuWorkTotal: 0,
        sourceSlotId: sourceTask.assignedSlotId,
        createdFrom: 'workflow-slot',
      }
      this.tasks.set(task.id, task)
      activityTaskIds.push(task.id)
      this.emit('ACTIVITY_TASK_SCHEDULED', {
        workflowId: workflow.id,
        taskId: task.id,
        sourceTaskId: sourceTask.id,
        sourceSlotId: sourceTask.assignedSlotId,
      })
    }
    this.emit('ACTIVITIES_SCHEDULED', {
      workflowId: workflow.id,
      taskId: sourceTask.id,
      activityTaskIds,
      sourceSlotId: sourceTask.assignedSlotId,
    })
  }

  private completeWorkflow(workflow: WorkflowExecution): void {
    this.removeCachedWorkflow(workflow.id, 'WORKFLOW_COMPLETED')
    workflow.state = 'completed'
    workflow.completedAt = this.time
    this.completions.push({ timestamp: this.time, type: 'workflow' })
    this.emit('WORKFLOW_COMPLETED', { workflowId: workflow.id })
  }

  private syncCapacity(): void {
    for (let ordinal = 1; ordinal <= this.config.workerCount; ordinal += 1) {
      const id = `worker-${ordinal}`
      const existing = this.workers.get(id)
      if (existing) existing.status = 'active'
      else {
        this.workers.set(id, {
          id,
          displayId: String.fromCharCode(64 + ordinal),
          status: 'active',
          cpuUtilization: 0,
          cpuDemand: 0,
          cpuThrottled: false,
          ioUtilization: 0,
          ioDemand: 0,
          ioThrottled: false,
        })
      }
    }
    for (const worker of this.workers.values()) {
      const ordinal = Number(worker.id.split('-')[1])
      if (ordinal > this.config.workerCount && worker.status === 'active') {
        worker.status = 'draining'
        for (const workflow of this.workflows.values()) {
          if (workflow.cachedWorkerId === worker.id) {
            this.invalidateWorkflowCache(workflow.id, 'WORKER_REMOVED')
          }
        }
      }
      const pollerTarget = worker.status === 'active' ? undefined : 0
      this.workflowPollers = this.resizePollers(
        this.workflowPollers,
        worker.id,
        'workflow',
        pollerTarget ?? this.config.workflowPollers,
      )
      this.activityPollers = this.resizePollers(
        this.activityPollers,
        worker.id,
        'activity',
        pollerTarget ?? this.config.activityPollers,
      )
      this.workflowSlots = this.resizeSlots(
        this.workflowSlots,
        worker.id,
        'workflow',
        worker.status === 'active' ? this.config.workflowSlots : 0,
      )
      this.activitySlots = this.resizeSlots(
        this.activitySlots,
        worker.id,
        'activity',
        worker.status === 'active' ? this.config.activitySlots : 0,
      )
    }
  }

  private resizePollers(existing: Poller[], workerId: string, type: TaskType, target: number): Poller[] {
    const otherWorkers = existing.filter((poller) => poller.workerId !== workerId)
    const workerPollers = existing.filter((poller) => poller.workerId === workerId)
    const busy = workerPollers.filter((poller) => poller.state !== 'long-polling')
    const idle = workerPollers.filter((poller) => poller.state === 'long-polling')
    const keep = [...busy, ...idle].slice(0, Math.max(target, busy.length))
    while (keep.length < target) {
      const ordinal = keep.length + 1
      const prefix = workerId === SINGLE_WORKER_ID ? '' : `${workerId}-`
      keep.push({ id: `${prefix}${type}-poller-${ordinal}`, workerId, type, state: 'long-polling' })
    }
    return [...otherWorkers, ...keep].sort((a, b) =>
      a.workerId.localeCompare(b.workerId, undefined, { numeric: true })
      || a.id.localeCompare(b.id, undefined, { numeric: true }))
  }

  private resizeSlots(existing: Slot[], workerId: string, type: TaskType, target: number): Slot[] {
    const workerSlots = existing.filter((slot) => slot.workerId === workerId)
    for (const slot of workerSlots) {
      if (slot.ordinal > target) slot.state = 'draining'
    }
    while (workerSlots.length < target) {
      const ordinal = workerSlots.length + 1
      const prefix = workerId === SINGLE_WORKER_ID ? '' : `${workerId}-`
      const slot: Slot = {
        id: `${prefix}${type}-slot-${ordinal}`,
        workerId,
        type,
        state: 'available',
        ordinal,
      }
      existing.push(slot)
      workerSlots.push(slot)
    }
    const resized = existing.filter((slot) => slot.workerId !== workerId || slot.ordinal <= target || slot.taskId)
    this.refreshIdleSlotStates(type, resized.filter((slot) => slot.workerId === workerId), target)
    return resized
  }

  // Idle Slots become available only while the Worker's occupied Slots are
  // below its limit, so lowering the limit never lets new Tasks start until
  // in-flight Tasks drain the occupied count below it.
  private refreshIdleSlotStates(
    type: TaskType,
    slots: Slot[] = this.getSlots(type),
    configuredLimit = this.slotLimit(type),
  ): void {
    const workerIds = new Set(slots.map((slot) => slot.workerId))
    for (const workerId of workerIds) {
      const workerSlots = slots
        .filter((slot) => slot.workerId === workerId)
        .sort((left, right) => left.ordinal - right.ordinal)
      const limit = this.workers.get(workerId)?.status === 'active' ? configuredLimit : 0
      let freeCapacity = limit - workerSlots.filter((slot) => slot.taskId).length
      for (const slot of workerSlots) {
        if (slot.taskId) continue
        if (slot.ordinal <= limit && freeCapacity > 0) {
          slot.state = 'available'
          freeCapacity -= 1
        } else {
          slot.state = 'draining'
        }
      }
    }
  }

  private removeDrainedSlots(): void {
    this.workflowSlots = this.workflowSlots.filter((slot) => {
      const worker = this.workers.get(slot.workerId)
      return slot.taskId || (worker?.status === 'active' && slot.ordinal <= this.config.workflowSlots)
    })
    this.activitySlots = this.activitySlots.filter((slot) => {
      const worker = this.workers.get(slot.workerId)
      return slot.taskId || (worker?.status === 'active' && slot.ordinal <= this.config.activitySlots)
    })
    this.refreshIdleSlotStates('workflow')
    this.refreshIdleSlotStates('activity')
  }

  private removeDrainedWorkers(): void {
    for (const worker of [...this.workers.values()]) {
      if (worker.status !== 'draining') continue
      const hasTask = [...this.tasks.values()].some((task) =>
        task.assignedWorkerId === worker.id
        && task.state !== 'returning'
        && task.state !== 'completed',
      )
      if (hasTask) continue
      this.workflowPollers = this.workflowPollers.filter((poller) => poller.workerId !== worker.id)
      this.activityPollers = this.activityPollers.filter((poller) => poller.workerId !== worker.id)
      this.workflowSlots = this.workflowSlots.filter((slot) => slot.workerId !== worker.id)
      this.activitySlots = this.activitySlots.filter((slot) => slot.workerId !== worker.id)
      this.workers.delete(worker.id)
    }
  }

  private workerSnapshots(): WorkerSnapshot[] {
    return [...this.workers.values()]
      .sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true }))
      .map((worker) => {
        const memoryUsedMb = this.currentMemoryUsedMb(worker.id)
        return {
          ...worker,
          workflowPollers: this.workflowPollers.filter((poller) => poller.workerId === worker.id).map((poller) => ({ ...poller })),
          activityPollers: this.activityPollers.filter((poller) => poller.workerId === worker.id).map((poller) => ({ ...poller })),
          workflowSlots: this.workflowSlots.filter((slot) => slot.workerId === worker.id).map((slot) => ({ ...slot })),
          activitySlots: this.activitySlots.filter((slot) => slot.workerId === worker.id).map((slot) => ({ ...slot })),
          memoryUtilization: Math.min(memoryUsedMb / this.config.memoryCapacityMb, 1),
          memoryUsedMb,
          workflowCache: this.cacheEntries(worker.id),
        }
      })
  }

  private getPollers(type: TaskType): Poller[] {
    return type === 'workflow' ? this.workflowPollers : this.activityPollers
  }

  private getSlots(type: TaskType): Slot[] {
    return type === 'workflow' ? this.workflowSlots : this.activitySlots
  }

  private slotLimit(type: TaskType): number {
    return type === 'workflow' ? this.config.workflowSlots : this.config.activitySlots
  }

  private taskResourceDemand(type: TaskType, profile: TaskResourceProfile): number {
    if (type === 'workflow') {
      return profile === 'cpu' ? this.config.workflowTaskCpuDemand : this.config.workflowTaskIoDemand
    }
    return profile === 'cpu' ? this.config.activityTaskCpuDemand : this.config.activityTaskIoDemand
  }

  private taskResourceWork(type: TaskType, profile: TaskResourceProfile, duration: number): number {
    return this.round(this.taskResourceDemand(type, profile) * duration)
  }

  private taskExecutionDuration(type: TaskType, ordinal: number): number {
    const baseDuration = type === 'workflow'
      ? this.config.workflowTaskBaseDurationSeconds
      : this.config.activityTaskBaseDurationSeconds
    const jitterPercent = type === 'workflow'
      ? this.config.workflowTaskDurationJitterPercent
      : this.config.activityTaskDurationJitterPercent
    if (jitterPercent === 0) return baseDuration
    const seedOffset = (Math.abs(this.seed) % 997) / 997
    const typeOffset = type === 'workflow' ? 0.271_828_182_84 : 0.618_033_988_75
    const sample = (seedOffset + typeOffset + (ordinal - 1) * 0.754_877_666_25) % 1
    const multiplier = 1 + (sample * 2 - 1) * jitterPercent / 100
    return this.round(Math.max(TICK_SECONDS, baseDuration * multiplier))
  }

  private emit(type: string, data: Omit<SemanticEvent, 'id' | 'timestamp' | 'type'>): void {
    this.events.push({ id: this.nextEventId++, timestamp: this.time, type, ...data })
    if (this.events.length > MAX_RETAINED_EVENTS * 2) this.events = this.events.slice(-MAX_RETAINED_EVENTS)
  }

  private round(value: number): number {
    return Math.round(value * 1_000_000) / 1_000_000
  }

  private workflowIssueJitter(ordinal: number): number {
    const seedOffset = (Math.abs(this.seed) % 997) / 997
    const lowDiscrepancyValue = (seedOffset + (ordinal - 1) * 0.618_033_988_75) % 1
    return this.round(lowDiscrepancyValue * WORKFLOW_TASK_ISSUE_JITTER_SECONDS)
  }
}
