import {
  POLL_DISPATCH_SECONDS,
  QUEUE_ADMISSION_SECONDS,
  SLOT_DISPATCH_SECONDS,
  type SimulationSnapshot,
  type SimulationTask,
  type TaskType,
} from '../simulation'
import {
  activityLaneY,
  maxVisibleQueueTasks,
  pollerPoint,
  queueEgress,
  queueIngress,
  queueStoragePoint,
  slotPoint,
  workflowLaneY,
  type Point,
} from './geometry'

const taskOriginPoint = (type: TaskType): Point => ({
  x: 375,
  y: type === 'workflow' ? workflowLaneY : activityLaneY,
})

const laneY = (type: TaskType) => type === 'workflow' ? workflowLaneY : activityLaneY

const enqueueStartTime = (task: SimulationTask) => task.enqueueStartedAt ?? task.scheduledAt

const assignedIndex = (id: string | undefined, items: { id: string }[]): number =>
  Math.max(0, items.findIndex((item) => item.id === id))

const interpolate = (start: Point, end: Point, progress: number): Point => ({
  x: start.x + (end.x - start.x) * Math.max(0, Math.min(1, progress)),
  y: start.y + (end.y - start.y) * Math.max(0, Math.min(1, progress)),
})

function queueIndexes(snapshot: SimulationSnapshot): Map<string, number> {
  const indexes = new Map<string, number>()
  for (const type of ['workflow', 'activity'] as const) {
    const queue = type === 'workflow' ? snapshot.workflowQueue : snapshot.activityQueue
    queue.forEach((taskId, index) => indexes.set(taskId, index))
    snapshot.tasks
      .filter((task) => task.type === type && task.state === 'enqueuing')
      .sort((left, right) => enqueueStartTime(left) - enqueueStartTime(right) || left.id.localeCompare(right.id, undefined, { numeric: true }))
      .forEach((task, index) => indexes.set(task.id, queue.length + index))
  }
  return indexes
}

function positionFor(
  task: SimulationTask,
  snapshot: SimulationSnapshot,
  queueIndex: number,
  renderTimeSeconds: number,
): Point {
  const y = laneY(task.type)
  const storage = queueStoragePoint(queueIndex, y)
  const pollers = task.type === 'workflow' ? snapshot.workflowPollers : snapshot.activityPollers
  const slots = task.type === 'workflow' ? snapshot.workflowSlots : snapshot.activitySlots
  const poller = pollerPoint(assignedIndex(task.assignedPollerId, pollers), pollers.length, y)
  const slot = slotPoint(assignedIndex(task.assignedSlotId, slots), slots.length, y)

  if (task.state === 'enqueuing') {
    const progress = (renderTimeSeconds - enqueueStartTime(task)) / QUEUE_ADMISSION_SECONDS
    if (progress < 0.5) return interpolate(taskOriginPoint(task.type), queueIngress(y), progress / 0.5)
    return interpolate(queueIngress(y), storage, (progress - 0.5) / 0.5)
  }
  if (task.state === 'queued') return storage
  if (task.state === 'acquired') {
    const progress = (renderTimeSeconds - task.dispatchStartedAt!) / POLL_DISPATCH_SECONDS
    const departure = queueStoragePoint(task.dispatchBatchIndex ?? 0, y)
    const egress = queueEgress(y)
    const travelFraction = 0.6
    if (progress >= travelFraction) return poller
    const travelProgress = progress / travelFraction
    return travelProgress < 0.2
      ? interpolate(departure, egress, travelProgress / 0.2)
      : interpolate(egress, poller, (travelProgress - 0.2) / 0.8)
  }
  if (task.state === 'dispatching') {
    const progress = (renderTimeSeconds - task.slotDispatchStartedAt!) / SLOT_DISPATCH_SECONDS
    return interpolate(poller, slot, progress)
  }
  return slot
}

export function TaskLayer({ snapshot, nowMs = snapshot.simulatedTime * 1_000 }: { snapshot: SimulationSnapshot; nowMs?: number }) {
  const renderTimeSeconds = Math.max(snapshot.simulatedTime, nowMs / 1_000)
  const indexes = queueIndexes(snapshot)
  const queueDepth = (type: TaskType) => type === 'workflow'
    ? snapshot.workflowQueue.length
    : snapshot.activityQueue.length

  return (
    <g className="task-layer">
      {snapshot.tasks.map((task) => {
        if (task.state !== 'acquired') return null
        const y = laneY(task.type)
        const pollers = task.type === 'workflow' ? snapshot.workflowPollers : snapshot.activityPollers
        const slots = task.type === 'workflow' ? snapshot.workflowSlots : snapshot.activitySlots
        const poller = pollerPoint(assignedIndex(task.assignedPollerId, pollers), pollers.length, y)
        const slot = slotPoint(assignedIndex(task.assignedSlotId, slots), slots.length, y)
        const egress = queueEgress(y)
        return (
          <g key={`acquired-${task.id}`}>
            <line x1={egress.x} y1={egress.y} x2={poller.x} y2={poller.y} className={`queue-claim-line ${task.type}-path`} />
            <line x1={poller.x} y1={poller.y} x2={slot.x} y2={slot.y} className={`active-dispatch-line ${task.type}-path`} />
            <circle cx={poller.x} cy={poller.y} r="12" className="poller-claim-ring" />
          </g>
        )
      })}
      {snapshot.tasks.map((task) => {
        if (task.state !== 'dispatching') return null
        const y = laneY(task.type)
        const pollers = task.type === 'workflow' ? snapshot.workflowPollers : snapshot.activityPollers
        const slots = task.type === 'workflow' ? snapshot.workflowSlots : snapshot.activitySlots
        const poller = pollerPoint(assignedIndex(task.assignedPollerId, pollers), pollers.length, y)
        const slot = slotPoint(assignedIndex(task.assignedSlotId, slots), slots.length, y)
        return <line key={`dispatch-${task.id}`} x1={poller.x} y1={poller.y} x2={slot.x} y2={slot.y} className={`active-dispatch-line ${task.type}-path`} />
      })}
      {snapshot.tasks.map((task) => {
        if (task.state === 'returning') return null
        if (task.state === 'enqueuing' && renderTimeSeconds < enqueueStartTime(task)) return null
        const queueIndex = indexes.get(task.id) ?? 0
        if (
          task.state === 'queued'
          && queueIndex >= maxVisibleQueueTasks
          && queueDepth(task.type) > maxVisibleQueueTasks
        ) return null
        const point = positionFor(task, snapshot, queueIndex, renderTimeSeconds)
        const sticky = task.type === 'workflow' && task.routingState === 'sticky-wait'
        const fallback = task.type === 'workflow'
          && task.stickyFallbackAt !== undefined
          && renderTimeSeconds - task.stickyFallbackAt <= 0.8
        const replaying = task.type === 'workflow' && task.executionPhase === 'replay'
        const worker = sticky
          ? snapshot.workers.find((candidate) => candidate.id === task.preferredWorkerId)
          : undefined
        return (
          <g key={task.id} className={`${sticky ? 'sticky-wait' : ''}${fallback ? ' sticky-fallback' : ''}`}>
            <rect
              data-task-id={task.id}
              data-task-state={task.state}
              x={point.x - 5}
              y={point.y - 5}
              width="10"
              height="10"
              rx="1"
              className={`task task-${task.type}${task.resourceProfile === 'io' ? ' io-bound' : ''}${replaying ? ' replaying' : ''}`}
            >
              <title>{`${task.id} - ${task.state}${replaying ? ' - replaying Workflow History after cache miss' : ''}${sticky ? ` - waiting for warm Worker ${worker?.displayId}` : ''}`}</title>
            </rect>
            {sticky && <>
              <circle cx={point.x} cy={point.y} r="9" className="sticky-wait-ring" />
              <text x={point.x + 9} y={point.y - 7} className="sticky-worker-badge">{worker?.displayId}</text>
            </>}
          </g>
        )
      })}
    </g>
  )
}
