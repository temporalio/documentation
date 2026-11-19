import type { SimulationSnapshot } from '../simulation'
import { activityLaneY, ordinalFromId, resultCorePoint, resultRailY, slotPoint, workflowLaneY } from './geometry'
import { RESULT_TO_CORE_MS, type VisualTimeline } from './useVisualTimeline'

function resultPosition(slot: { x: number; y: number }, progress: number) {
  const core = resultCorePoint()
  const vertical = Math.abs(resultRailY - slot.y)
  const horizontal = slot.x - core.x
  const total = vertical + horizontal
  const distance = Math.max(0, Math.min(1, progress)) * total
  if (distance <= vertical) {
    const direction = resultRailY < slot.y ? -1 : 1
    return { x: slot.x, y: slot.y + direction * distance }
  }
  return { x: slot.x - (distance - vertical), y: resultRailY }
}

export function ResultLayer({
  snapshot,
  nowMs,
  timeline,
}: {
  snapshot: SimulationSnapshot
  nowMs: number
  timeline: VisualTimeline
}) {
  const core = resultCorePoint()
  const active = [...timeline.tasks.values()].filter((plan) =>
    plan.completionStart !== undefined
    && plan.resultArrival !== undefined
    && nowMs >= plan.completionStart
    && nowMs < plan.resultArrival,
  )

  return (
    <g className="result-layer">
      {active.map((plan) => {
        const slotOrdinal = ordinalFromId(plan.slotId)
        const activeSlotCount = plan.type === 'workflow' ? snapshot.workflowSlots.length : snapshot.activitySlots.length
        const slotCount = Math.max(activeSlotCount, slotOrdinal + 1)
        const slot = slotPoint(
          slotOrdinal,
          slotCount,
          plan.type === 'workflow' ? workflowLaneY : activityLaneY,
        )
        const progress = (nowMs - plan.completionStart!) / RESULT_TO_CORE_MS
        const { x, y } = resultPosition(slot, progress)
        return (
          <g key={`result-${plan.taskId}`}>
            <path d={`M ${slot.x} ${slot.y} V ${resultRailY} H ${core.x}`} className="result-line" />
            <polygon
              points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
              className="result-pulse"
            >
              <title>{`Completion from ${plan.taskId}`}</title>
            </polygon>
          </g>
        )
      })}
    </g>
  )
}
