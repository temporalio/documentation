export type TaskType = 'workflow' | 'activity'
export type WorkflowPhase = 'initial' | 'waiting' | 'decision' | 'final' | 'completed'
export type TaskState = 'enqueuing' | 'queued' | 'acquired' | 'dispatching' | 'running' | 'returning' | 'completed'
export type PollerState = 'long-polling' | 'task-received'
export type SlotState = 'available' | 'reserved' | 'occupied' | 'draining'
export type TaskResourceProfile = 'cpu' | 'io'
export type TaskExecutionPhase = 'replay' | 'decision' | 'activity'
export type WorkflowTaskRoutingState = 'shared-queue' | 'sticky-wait' | 'shared-fallback'
export type CacheEvictionReason = 'CAPACITY' | 'MEMORY_PRESSURE' | 'WORKFLOW_COMPLETED' | 'WORKER_REMOVED' | 'STICKY_FALLBACK'

export interface SimulationConfig {
  workflowStartRate: number
  activitiesPerWorkflow: number
  activityFanout: number
  workerCount: number
  workflowPollers: number
  activityPollers: number
  workflowSlots: number
  activitySlots: number
  cpuCapacity: number
  ioCapacity: number
  workflowCacheCapacity: number
  workflowCacheEntryMemoryMb: number
  memoryCapacityMb: number
  workflowTaskResourceProfile: TaskResourceProfile
  activityTaskResourceProfile: TaskResourceProfile
  taskResourceProfilesLocked: boolean
  workflowTaskCpuDemand: number
  activityTaskCpuDemand: number
  workflowTaskIoDemand: number
  activityTaskIoDemand: number
  workflowTaskBaseDurationSeconds: number
  activityTaskBaseDurationSeconds: number
  workflowTaskDurationJitterPercent: number
  activityTaskDurationJitterPercent: number
  workflowTaskReplayLatencySeconds: number
}

export interface WorkflowExecution {
  id: string
  displayId: string
  state: WorkflowPhase
  createdAt: number
  initialTaskIssueJitter: number
  completedAt?: number
  activitiesExpected: number
  activityFanout: number
  activitiesScheduled: number
  activitiesCompleted: number
  pendingWorkflowEvents: number
  workflowTaskOutstanding: boolean
  finalWorkflowTaskScheduled: boolean
  historyUnits: number
  cachedWorkerId: string | null
  lastCacheAccessAt: number | null
}

export interface BaseTask {
  id: string
  workflowId: string
  type: TaskType
  state: TaskState
  scheduledAt: number
  enqueueStartedAt: number
  dispatchStartedAt?: number
  startedAt?: number
  completedAt?: number
  assignedPollerId?: string
  assignedSlotId?: string
  assignedWorkerId?: string
  sourceSlotId?: string
  createdFrom: 'workflow' | 'workflow-slot' | 'activity-slot'
  enqueueRemaining: number
  queuedAt?: number
  pollEligibleAt?: number
  dispatchRemaining: number
  slotDispatchStartedAt?: number
  slotDispatchRemaining: number
  completionReturnRemaining: number
  dispatchBatchIndex?: number
  cpuWorkRemaining: number
  maxCpuDemand: number
  ioWorkRemaining: number
  maxIoDemand: number
  resourceProfile: TaskResourceProfile
  executionPhase: TaskExecutionPhase
  executionDurationSeconds: number
  replayCpuWorkRemaining: number
  replayCpuWorkTotal: number
  cacheOutcome?: 'hit' | 'miss'
}

export interface WorkflowTask extends BaseTask {
  type: 'workflow'
  phase: 'initial' | 'decision' | 'final'
  routingState: WorkflowTaskRoutingState
  preferredWorkerId?: string
  stickyWaitStartedAt?: number
  stickyFallbackAt?: number
}

export interface ActivityTask extends BaseTask {
  type: 'activity'
  activityIndex: number
}

export type SimulationTask = WorkflowTask | ActivityTask

export interface Poller {
  id: string
  workerId: string
  type: TaskType
  state: PollerState
  taskId?: string
}

export interface Slot {
  id: string
  workerId: string
  type: TaskType
  state: SlotState
  taskId?: string
  ordinal: number
}

export interface SemanticEvent {
  id: number
  timestamp: number
  type: string
  workflowId?: string
  taskId?: string
  pollerId?: string
  slotId?: string
  sourceSlotId?: string
  sourceTaskId?: string
  activityTaskIds?: string[]
  workerId?: string
  preferredWorkerId?: string
  routingState?: WorkflowTaskRoutingState
  reason?: CacheEvictionReason
  replayCpuSeconds?: number
}

export interface WorkflowCacheEntry {
  workflowId: string
  displayId: string
  workerId: string
  insertedAt: number
  lastUsedAt: number
  memoryMb: number
}

export interface CacheMetrics {
  cacheSize: number
  cacheCapacity: number
  cacheHits: number
  cacheMisses: number
  cacheEvictions: number
  cacheHitRate: number
  replaysStarted: number
  replayCpuSeconds: number
}

export interface WorkerSnapshot {
  id: string
  displayId: string
  status: 'active' | 'draining'
  workflowPollers: Poller[]
  activityPollers: Poller[]
  workflowSlots: Slot[]
  activitySlots: Slot[]
  cpuUtilization: number
  cpuDemand: number
  cpuThrottled: boolean
  memoryUtilization: number
  memoryUsedMb: number
  ioUtilization: number
  ioDemand: number
  ioThrottled: boolean
  workflowCache: WorkflowCacheEntry[]
}

export interface RollingMetrics {
  activityThroughput: number
  totalTaskThroughput: number
  workflowTaskThroughput: number
  activityTaskThroughput: number
  workflowCompletions: number
  slotResidenceSeconds: number
  workflowScheduleToStart: number
  activityScheduleToStart: number
}

export interface MetricSample {
  timestamp: number
  value: number
  throttled: boolean
  replaying: boolean
}

export interface TaskThroughputSample {
  timestamp: number
  total: number
  workflow: number
  activity: number
  throttled: boolean
  replaying: boolean
}

export type TaskTypeMetricSample = TaskThroughputSample

export interface RoundTaskThroughputSample extends TaskThroughputSample {
  roundId: number
  elapsedSeconds: number
}

export interface TaskDistributionStats {
  completed: number
  throughput: number
  averageLatency: number
  p25Latency: number
  p50Latency: number
  p75Latency: number
  p95Latency: number
  p99Latency: number
  maxLatency: number
}

export interface TaskDistribution {
  total: TaskDistributionStats
  workflow: TaskDistributionStats
  activity: TaskDistributionStats
}

export interface SimulationSnapshot {
  simulatedTime: number
  config: SimulationConfig
  workflows: WorkflowExecution[]
  tasks: SimulationTask[]
  workflowQueue: string[]
  activityQueue: string[]
  workers: WorkerSnapshot[]
  workflowPollers: Poller[]
  activityPollers: Poller[]
  workflowSlots: Slot[]
  activitySlots: Slot[]
  cpuUtilization: number
  cpuDemand: number
  cpuThrottled: boolean
  memoryUtilization: number
  memoryUsedMb: number
  memoryPressure: boolean
  ioUtilization: number
  ioDemand: number
  ioThrottled: boolean
  workflowCache: WorkflowCacheEntry[]
  cacheMetrics: CacheMetrics
  metrics: RollingMetrics
  taskThroughputHistory: TaskThroughputSample[]
  taskLatencyHistory: TaskTypeMetricSample[]
  taskDistribution: TaskDistribution
  roundTaskThroughput: RoundTaskThroughputSample | null
  pollerBusyRatioHistory: TaskTypeMetricSample[]
  slotUtilizationHistory: TaskTypeMetricSample[]
  syncMatchRateHistory: TaskTypeMetricSample[]
  backlogHistory: TaskTypeMetricSample[]
  cpuUtilizationHistory: MetricSample[]
  memoryUtilizationHistory: MetricSample[]
  ioUtilizationHistory: MetricSample[]
  recentEvents: SemanticEvent[]
}
