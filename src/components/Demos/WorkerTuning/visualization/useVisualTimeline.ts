import { useRef } from 'react'
import { COMPLETION_RETURN_SECONDS, WORKFLOW_START_TRANSIT_SECONDS, type SimulationSnapshot, type TaskType } from '../simulation'

export const CLIENT_TO_CORE_MS = WORKFLOW_START_TRANSIT_SECONDS * 1_000
export const RESULT_TO_CORE_MS = COMPLETION_RETURN_SECONDS * 1_000
export const WORKFLOW_COMPLETED_HOLD_MS = 2_000
export const WORKFLOW_COMPLETED_FADE_MS = 500

export interface WorkflowVisualPlan {
  workflowId: string
  requestStart: number
  coreArrival: number
  completionAt?: number
  completedPresentationAt?: number
}

export interface TaskResultPlan {
  taskId: string
  workflowId: string
  type: TaskType
  slotId?: string
  completionStart?: number
  resultArrival?: number
}

export interface VisualTimeline {
  workflows: Map<string, WorkflowVisualPlan>
  tasks: Map<string, TaskResultPlan>
}

export function useVisualTimeline(
  snapshot: SimulationSnapshot,
  nowMs: number,
  presentationNowMs: number,
): VisualTimeline {
  const workflows = useRef(new Map<string, WorkflowVisualPlan>())
  const tasks = useRef(new Map<string, TaskResultPlan>())
  const lastProcessedEventId = useRef(0)
  const lastSimTime = useRef(snapshot.simulatedTime)

  if (snapshot.simulatedTime < lastSimTime.current) {
    workflows.current.clear()
    tasks.current.clear()
    lastProcessedEventId.current = 0
  }
  lastSimTime.current = snapshot.simulatedTime

  for (const event of snapshot.recentEvents) {
    if (event.id <= lastProcessedEventId.current) continue
    lastProcessedEventId.current = event.id

    if (event.type === 'WORKFLOW_START_REQUESTED' && event.workflowId) {
      workflows.current.set(event.workflowId, {
        workflowId: event.workflowId,
        requestStart: nowMs,
        coreArrival: nowMs + CLIENT_TO_CORE_MS,
      })
      continue
    }

    if (event.type === 'WORKFLOW_CREATED' && event.workflowId && !workflows.current.has(event.workflowId)) {
      workflows.current.set(event.workflowId, {
        workflowId: event.workflowId,
        requestStart: nowMs,
        coreArrival: nowMs + CLIENT_TO_CORE_MS,
      })
      continue
    }

    if ((event.type === 'WORKFLOW_TASK_SCHEDULED' || event.type === 'ACTIVITY_TASK_SCHEDULED') && event.taskId && event.workflowId) {
      tasks.current.set(event.taskId, {
        taskId: event.taskId,
        workflowId: event.workflowId,
        type: event.type.startsWith('WORKFLOW_') ? 'workflow' : 'activity',
      })
      continue
    }

    if ((event.type === 'WORKFLOW_TASK_RETURN_STARTED' || event.type === 'ACTIVITY_TASK_RETURN_STARTED') && event.taskId) {
      const plan = tasks.current.get(event.taskId)
      if (!plan) continue
      const eventNowMs = nowMs - Math.max(0, snapshot.simulatedTime - event.timestamp) * 1_000
      plan.slotId = event.slotId
      plan.completionStart = eventNowMs
      plan.resultArrival = eventNowMs + RESULT_TO_CORE_MS
      continue
    }

    if ((event.type === 'WORKFLOW_TASK_COMPLETED' || event.type === 'ACTIVITY_TASK_COMPLETED') && event.taskId) {
      const plan = tasks.current.get(event.taskId)
      if (!plan || plan.completionStart !== undefined) continue
      const eventNowMs = nowMs - Math.max(0, snapshot.simulatedTime - event.timestamp) * 1_000
      plan.slotId = event.slotId
      plan.completionStart = eventNowMs - RESULT_TO_CORE_MS
      plan.resultArrival = eventNowMs
      continue
    }

    if (event.type === 'WORKFLOW_COMPLETED' && event.workflowId) {
      const workflow = workflows.current.get(event.workflowId)
      if (!workflow) continue
      const finalTask = [...tasks.current.values()]
        .filter((task) => task.workflowId === event.workflowId && task.type === 'workflow')
        .at(-1)
      workflow.completionAt = finalTask?.resultArrival ?? nowMs
    }
  }

  for (const [taskId, plan] of tasks.current) {
    if (plan.resultArrival !== undefined && nowMs > plan.resultArrival + 2_000) tasks.current.delete(taskId)
  }
  for (const [workflowId, plan] of workflows.current) {
    if (
      plan.completionAt !== undefined
      && nowMs >= plan.completionAt
      && plan.completedPresentationAt === undefined
    ) plan.completedPresentationAt = presentationNowMs
    if (
      plan.completedPresentationAt !== undefined
      && presentationNowMs > plan.completedPresentationAt + WORKFLOW_COMPLETED_HOLD_MS + WORKFLOW_COMPLETED_FADE_MS
    ) workflows.current.delete(workflowId)
  }

  return { workflows: workflows.current, tasks: tasks.current }
}
