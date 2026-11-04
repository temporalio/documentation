import type { SimulationTask } from '../simulation'

export function outstandingTaskCounts(tasks: SimulationTask[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const task of tasks) {
    counts.set(task.workflowId, (counts.get(task.workflowId) ?? 0) + 1)
  }
  return counts
}
