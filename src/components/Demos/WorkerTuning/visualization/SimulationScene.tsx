import {
  ACTIVE_TASK_MEMORY_MB,
  BASE_WORKER_MEMORY_MB,
  POLL_REQUEST_VISUAL_THRESHOLD,
  type Poller,
  type SimulationSnapshot,
  type SimulationTask,
  type Slot,
} from '../simulation'
import {
  activityLaneY,
  maxVisibleQueueTasks,
  pollerPoint,
  returnLaneY,
  serviceCoreBounds,
  slotGroupTop,
  slotPoint,
  workflowLaneY,
} from './geometry'
import { ResultLayer } from './ResultLayer'
import { TaskLayer } from './TaskLayer'
import type { VisualTimeline } from './useVisualTimeline'
import { WorkflowLayer } from './WorkflowLayer'

const MAX_WORKFLOWS = 20

function compactNumber(value: number): string {
  return Number(value.toFixed(2)).toString()
}

function Pollers({ pollers, y }: { pollers: Poller[]; y: number }) {
  const showPollRequests = pollers.length <= POLL_REQUEST_VISUAL_THRESHOLD
  return (
    <g>
      {pollers.map((poller, index) => {
        const point = pollerPoint(index, pollers.length, y)
        return (
          <g key={poller.id}>
            {showPollRequests && poller.state === 'long-polling' && (
              <line x1={point.x - 12} y1={point.y} x2={point.x - 44} y2={point.y} className="poll-request" />
            )}
            <circle cx={point.x} cy={point.y} r="8" className={`poller ${poller.state}`}>
              <title>{`${poller.id} - ${poller.state}`}</title>
            </circle>
          </g>
        )
      })}
    </g>
  )
}

function Slots({ slots, y, tasks }: { slots: Slot[]; y: number; tasks: SimulationTask[] }) {
  const tasksById = new Map(tasks.map((task) => [task.id, task]))
  return (
    <g>
      {slots.map((slot, index) => {
        const point = slotPoint(index, slots.length, y)
        const task = slot.taskId ? tasksById.get(slot.taskId) : undefined
        const replaying = task?.type === 'workflow' && task.executionPhase === 'replay'
        return (
          <g key={slot.id}>
            <rect x={point.x - 14} y={point.y - 14} width="28" height="28" rx="3" className={`slot ${slot.state}${replaying ? ' replaying' : ''}`}>
              <title>{`${slot.id} - ${slot.state}${replaying ? ' - replaying Workflow History' : ''}`}</title>
            </rect>
            {replaying && <text x={point.x + 8} y={point.y + 11} textAnchor="middle" className="replay-glyph">↻</text>}
          </g>
        )
      })}
    </g>
  )
}

function WorkflowCacheView({ snapshot }: { snapshot: SimulationSnapshot }) {
  const capacity = snapshot.config.workflowCacheCapacity
  const singleWorker = snapshot.workers.length === 1
  const statusY = singleWorker ? 149 : 114
  const visibleCellCount = Math.min(Math.max(capacity, 1), 8)
  const recentHitIds = new Set(snapshot.recentEvents
    .filter((event) => event.type === 'CACHE_HIT' && snapshot.simulatedTime - event.timestamp <= 0.6)
    .map((event) => event.workflowId))
  const recentEviction = [...snapshot.recentEvents].reverse().find((event) =>
    event.type === 'CACHE_EVICTED' && snapshot.simulatedTime - event.timestamp <= 0.8,
  )
  const evictedDisplayId = snapshot.workflows.find((workflow) => workflow.id === recentEviction?.workflowId)?.displayId
  const evictionStatus = recentEviction?.reason === 'WORKFLOW_COMPLETED' ? 'closed' : 'evicted'

  return (
    <g
      className="workflow-cache"
      data-cache-size={snapshot.workflowCache.length}
      data-cache-capacity={capacity}
      data-cache-misses={snapshot.cacheMetrics.cacheMisses}
      data-replays-started={snapshot.cacheMetrics.replaysStarted}
    >
      <text x="785" y={singleWorker ? 130 : 95} className="section-label">Workflow Cache</text>
      {snapshot.workers.map((worker, workerIndex) => {
        const y = (singleWorker ? 137 : 102) + workerIndex * 21
        const cells = Array.from({ length: visibleCellCount }, (_, index) => worker.workflowCache[index])
        return (
          <g key={worker.id} data-worker-id={worker.id}>
            <rect x="780" y={y - 2} width="380" height="20" rx="3" className="worker-cache-card" />
            {!singleWorker && <text x="788" y={y + 12} className="worker-card-title">WORKER {worker.displayId}</text>}
            {capacity === 0 ? (
              <text x={singleWorker ? 790 : 870} y={y + 12} className="cache-disabled">disabled</text>
            ) : cells.map((entry, index) => {
              const x = (singleWorker ? 790 : 870) + index * 29
              const cacheDisplayId = entry?.displayId.replace(/^W/, 'WF')
              return (
                <g key={entry?.workflowId ?? `${worker.id}-empty-${index}`}>
                  <rect
                    x={x}
                    y={y}
                    width="25"
                    height="16"
                    rx="3"
                    data-cache-workflow-id={entry?.workflowId}
                    className={`cache-cell${entry ? ' occupied' : ''}${entry && recentHitIds.has(entry.workflowId) ? ' hit' : ''}`}
                  >
                    {entry && <title>{`${entry.displayId} warm on Worker ${worker.displayId}`}</title>}
                  </rect>
                  {entry && <text x={x + 12.5} y={y + 12} textAnchor="middle" className="cache-cell-label">{cacheDisplayId}</text>}
                </g>
              )
            })}
            <text x="1030" y={y + 12} className="metric-value">{worker.workflowCache.length} / {capacity}</text>
          </g>
        )
      })}
      {evictedDisplayId && <text x="1070" y={statusY} className="cache-evicted">{evictedDisplayId.replace(/^W/, 'WF')} {evictionStatus}</text>}
      <text x="1152" y={statusY} textAnchor="end" className="cache-hit-rate">
        Hit {Math.round(snapshot.cacheMetrics.cacheHitRate * 100)}% · Replays {snapshot.cacheMetrics.replaysStarted}
      </text>
    </g>
  )
}

function Overflow({ count, x, y }: { count: number; x: number; y: number }) {
  if (count <= maxVisibleQueueTasks) return null
  return <text x={x} y={y} className="overflow">+{count - maxVisibleQueueTasks}</text>
}

// The track ends early enough to leave room for the widest detail label,
// such as "100% (12.5 / 4 throughput)", right-aligned at x=1160.
const RESOURCE_TRACK_X = 845
const RESOURCE_TRACK_WIDTH = 155

function ResourceBar({
  resource,
  label,
  y,
  utilization,
  throttled = false,
  detail,
  fillClass,
  description,
  segments,
}: {
  resource: 'cpu' | 'memory' | 'io'
  label: string
  y: number
  utilization: number
  throttled?: boolean
  detail?: string
  fillClass: string
  description?: string
  segments?: { className: string; label: string; utilization: number }[]
}) {
  const percent = Math.round(utilization * 100)
  let segmentOffset = 0
  const visibleSegments = segments?.map((segment) => {
    const start = Math.min(segmentOffset, 1)
    segmentOffset += segment.utilization
    const end = Math.min(segmentOffset, 1)
    return { ...segment, start, width: Math.max(0, end - start) }
  })
  return (
    <g
      data-resource={resource}
      data-utilization={utilization}
      data-throttled={throttled}
      aria-label={description}
    >
      {(description || throttled) && <title>{description ?? `${label} throughput is being throttled`}</title>}
      <text x="785" y={y + 13} className="section-label">{label}</text>
      <rect x={RESOURCE_TRACK_X} y={y} width={RESOURCE_TRACK_WIDTH} height="18" rx="3" className="resource-track" />
      {visibleSegments ? visibleSegments.map((segment) => (
        <rect
          key={segment.className}
          x={RESOURCE_TRACK_X + RESOURCE_TRACK_WIDTH * segment.start}
          y={y}
          width={RESOURCE_TRACK_WIDTH * segment.width}
          height="18"
          className={`resource-fill ${segment.className}${throttled ? ' throttled' : ''}`}
        >
          <title>{segment.label}</title>
        </rect>
      )) : (
        <rect x={RESOURCE_TRACK_X} y={y} width={RESOURCE_TRACK_WIDTH * utilization} height="18" rx="3" className={`resource-fill ${fillClass}${throttled ? ' throttled' : ''}`} />
      )}
      <text x="1160" y={y + 13} textAnchor="end" className="metric-value">
        {percent}%{detail ? ` (${detail})` : ''}
      </text>
    </g>
  )
}

export function SimulationScene({
  snapshot,
  nowMs,
  presentationNowMs,
  timeline,
}: {
  snapshot: SimulationSnapshot
  nowMs: number
  presentationNowMs: number
  timeline: VisualTimeline
}) {
  const activeWorkflows = [...timeline.workflows.values()].filter((workflow) => nowMs >= workflow.coreArrival)
  const memoryCapacityMb = snapshot.config.memoryCapacityMb * snapshot.workers.length
  const baseMemoryMb = BASE_WORKER_MEMORY_MB * snapshot.workers.length
  const activeTaskMemoryMb = snapshot.tasks.filter((task) =>
    task.state === 'acquired' || task.state === 'dispatching' || task.state === 'running',
  ).length * ACTIVE_TASK_MEMORY_MB
  const cacheMemoryMb = snapshot.workflowCache.reduce((sum, entry) => sum + entry.memoryMb, 0)
  const memoryDescription = `${snapshot.memoryPressure ? 'Memory pressure active. ' : ''}Memory: ${compactNumber(baseMemoryMb)} MB base Workers + ${compactNumber(activeTaskMemoryMb)} MB active Tasks + ${compactNumber(cacheMemoryMb)} MB Workflow cache = ${compactNumber(snapshot.memoryUsedMb)} MB of ${memoryCapacityMb} MB`
  const workflowQueueDepth = snapshot.workflowQueue.length
  const activityQueueDepth = snapshot.activityQueue.length
  const returnActive = [...timeline.tasks.values()].some((task) =>
    task.completionStart !== undefined
    && task.resultArrival !== undefined
    && nowMs >= task.completionStart
    && nowMs < task.resultArrival,
  )
  const workflowSlotLabelY = Math.min(workflowLaneY - 46, slotGroupTop(snapshot.workflowSlots.length, workflowLaneY) - 12)
  const activitySlotLabelY = Math.min(activityLaneY - 44, slotGroupTop(snapshot.activitySlots.length, activityLaneY) - 12)

  return (
    <svg className="simulation-scene" viewBox="0 0 1200 600" role="img" aria-label="Temporal Worker simulation">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" className="arrow-head" />
        </marker>
        <marker id="return-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" className="return-arrow-head" />
        </marker>
      </defs>

      <rect x="20" y="40" width="140" height="540" rx="8" className="region" />
      <text x="40" y="73" className="region-title">CLIENT</text>
      <polygon points="103,225 84,214 84,236" className="client-emitter" />
      <text x="48" y="201" className="path-label">Workflow Start</text>
      <line x1="130" y1="225" x2="205" y2="225" className="flow-line" markerEnd="url(#arrow)" />

      <rect x="180" y="40" width="550" height="540" rx="8" className="region temporal-region" />
      <text x="200" y="73" className="region-title">TEMPORAL SERVICE</text>

      <rect
        x={serviceCoreBounds.x}
        y={serviceCoreBounds.y}
        width={serviceCoreBounds.width}
        height={serviceCoreBounds.height}
        rx="6"
        className="service-core"
      />
      <text x="225" y="125" className="core-title">Temporal Service Core</text>
      <text x="225" y="147" className="core-subtitle">Workflow state / history</text>
      <text x="225" y="165" className="core-subtitle">Task scheduling</text>
      <text x="225" y="195" className="section-label">Active Workflows</text>
      {activeWorkflows.length > MAX_WORKFLOWS && <text x="345" y="310" className="overflow">+{activeWorkflows.length - MAX_WORKFLOWS}</text>}

      <text x="425" y="150" className="queue-group-label">WORKFLOW LANE</text>
      <text x="425" y={workflowLaneY - 46} className="section-label">Workflow Task Queue ({workflowQueueDepth})</text>
      <rect x="425" y={workflowLaneY - 36} width="280" height="72" rx="4" className="queue" />
      <Overflow count={workflowQueueDepth} x={665} y={workflowLaneY + 23} />

      <text x="425" y="350" className="queue-group-label">ACTIVITY LANE</text>
      <text x="425" y={activityLaneY - 44} className="section-label">Activity Task Queue ({activityQueueDepth})</text>
      <rect x="425" y={activityLaneY - 36} width="280" height="72" rx="4" className="queue" />
      <Overflow count={activityQueueDepth} x={665} y={activityLaneY + 23} />

      <rect x="760" y="40" width="420" height="540" rx="8" className="region worker-region" />
      <text x="780" y="73" className="region-title">
        {snapshot.workers.length === 1
          ? `WORKER ${snapshot.workers[0].displayId}`
          : `WORKERS (${snapshot.workers.length})`}
      </text>
      {snapshot.workers.length === 1 && <>
        <rect x="775" y="84" width="390" height="482" rx="6" className="worker-card-outline" />
      </>}
      <text x="785" y="190" className="section-label">Workflow Pollers</text>
      <Pollers pollers={snapshot.workflowPollers} y={workflowLaneY} />
      <text x="930" y={workflowSlotLabelY} className="section-label">Workflow Slots</text>
      <Slots slots={snapshot.workflowSlots} y={workflowLaneY} tasks={snapshot.tasks} />
      <WorkflowCacheView snapshot={snapshot} />

      <text x="785" y="380" className="section-label">Activity Pollers</text>
      <Pollers pollers={snapshot.activityPollers} y={activityLaneY} />
      <text x="930" y={activitySlotLabelY} className="section-label">Activity Slots</text>
      <Slots slots={snapshot.activitySlots} y={activityLaneY} tasks={snapshot.tasks} />

      <g className="memory-legend" aria-label="Memory colors: base Worker, active Tasks, Workflow cache">
        <text x="785" y="479">Memory colors</text>
        <rect x="845" y="471" width="8" height="8" className="memory-base-fill" />
        <text x="857" y="479">Base Worker</text>
        <rect x="928" y="471" width="8" height="8" className="memory-task-fill" />
        <text x="940" y="479">Active Tasks</text>
        <rect x="1015" y="471" width="8" height="8" className="memory-cache-fill" />
        <text x="1027" y="479">Workflow cache</text>
      </g>
      <ResourceBar resource="cpu" label="CPU" y={491} utilization={snapshot.cpuUtilization} throttled={snapshot.cpuThrottled} detail={`${compactNumber(snapshot.cpuDemand)} / ${snapshot.config.cpuCapacity * snapshot.workers.length} CPU`} fillClass="cpu-fill" />
      <ResourceBar
        resource="memory"
        label="Memory"
        y={517}
        utilization={snapshot.memoryUtilization}
        throttled={snapshot.memoryPressure}
        detail={`${compactNumber(snapshot.memoryUsedMb)} / ${memoryCapacityMb} MB`}
        fillClass="memory-fill"
        description={memoryDescription}
        segments={[
          { className: 'memory-base-fill', label: `${compactNumber(baseMemoryMb)} MB base Worker memory`, utilization: baseMemoryMb / memoryCapacityMb },
          { className: 'memory-task-fill', label: `${compactNumber(activeTaskMemoryMb)} MB active Task memory`, utilization: activeTaskMemoryMb / memoryCapacityMb },
          { className: 'memory-cache-fill', label: `${compactNumber(cacheMemoryMb)} MB Workflow cache memory`, utilization: cacheMemoryMb / memoryCapacityMb },
        ]}
      />
      <ResourceBar resource="io" label="I/O" y={543} utilization={snapshot.ioUtilization} throttled={snapshot.ioThrottled} detail={`${compactNumber(snapshot.ioDemand)} / ${snapshot.config.ioCapacity * snapshot.workers.length} throughput`} fillClass="io-fill" />

      <circle cx="43" cy="496" r="5" className="workflow-execution" />
      <text x="54" y="500" className="small-label">Workflow</text>
      <rect x="38" y="512" width="9" height="9" className="task-workflow" />
      <text x="54" y="521" className="small-label">Workflow Task</text>
      <rect x="38" y="530" width="9" height="9" className="task-activity" />
      <text x="54" y="539" className="small-label">Activity Task</text>
      <polygon points="43,548 48,553 43,558 38,553" className="result-pulse" />
      <text x="54" y="553" className="small-label" aria-label="Command / result RPC">
        <tspan>Command / result</tspan>
        <tspan x="54" dy="11">RPC</tspan>
      </text>

      <path d={`M 1160 ${returnLaneY} H 390`} className={`return-rail${returnActive ? ' active' : ''}`} markerEnd="url(#return-arrow)" />
      <text x="575" y={returnLaneY - 11} textAnchor="middle" className="return-rail-label">COMMANDS / RESULTS -&gt; TEMPORAL</text>

      <ResultLayer snapshot={snapshot} nowMs={nowMs} timeline={timeline} />
      <WorkflowLayer snapshot={snapshot} nowMs={nowMs} presentationNowMs={presentationNowMs} timeline={timeline} />
      <TaskLayer snapshot={snapshot} nowMs={nowMs} />
    </svg>
  )
}
