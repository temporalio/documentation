import type { SimulationSnapshot } from './simulation'

export interface AutoPauseState {
  armed: boolean
  zeroSince: number | null
}

export interface AutoPauseDecision {
  state: AutoPauseState
  shouldPause: boolean
}

export const AUTO_PAUSE_ZERO_BUFFER_SECONDS = 2

export const idleAutoPauseState = (): AutoPauseState => ({
  armed: false,
  zeroSince: null,
})

export const armAutoPause = (): AutoPauseState => ({
  armed: true,
  zeroSince: null,
})

export function advanceAutoPause(
  state: AutoPauseState,
  snapshot: Pick<
    SimulationSnapshot,
    | 'simulatedTime'
    | 'workflows'
    | 'workflowQueue'
    | 'activityQueue'
    | 'workflowSlots'
    | 'activitySlots'
    | 'cpuDemand'
    | 'ioDemand'
    | 'metrics'
    | 'taskThroughputHistory'
  >,
): AutoPauseDecision {
  if (!state.armed) return { state, shouldPause: false }

  const allWorkflowsCompleted = snapshot.workflows.length > 0
    && snapshot.workflows.every((workflow) => workflow.state === 'completed')
  if (!allWorkflowsCompleted) {
    return {
      state: armAutoPause(),
      shouldPause: false,
    }
  }

  const metricsAtZero = snapshot.workflowQueue.length === 0
    && snapshot.activityQueue.length === 0
    && snapshot.workflowSlots.every((slot) => !slot.taskId)
    && snapshot.activitySlots.every((slot) => !slot.taskId)
    && snapshot.cpuDemand === 0
    && snapshot.ioDemand === 0
    && snapshot.metrics.totalTaskThroughput === 0
    && snapshot.metrics.workflowTaskThroughput === 0
    && snapshot.metrics.activityTaskThroughput === 0
    && snapshot.metrics.activityThroughput === 0
    && snapshot.metrics.workflowCompletions === 0
    && snapshot.metrics.slotResidenceSeconds === 0
    && snapshot.taskThroughputHistory.at(-1)?.total === 0
    && snapshot.taskThroughputHistory.at(-1)?.workflow === 0
    && snapshot.taskThroughputHistory.at(-1)?.activity === 0
  if (!metricsAtZero) {
    return {
      state: armAutoPause(),
      shouldPause: false,
    }
  }

  if (state.zeroSince === null) {
    return {
      state: { armed: true, zeroSince: snapshot.simulatedTime },
      shouldPause: false,
    }
  }

  if (snapshot.simulatedTime - state.zeroSince < AUTO_PAUSE_ZERO_BUFFER_SECONDS) {
    return { state, shouldPause: false }
  }

  return {
    state: idleAutoPauseState(),
    shouldPause: true,
  }
}
