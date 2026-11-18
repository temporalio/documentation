export interface Point {
  x: number
  y: number
}

export const serviceCoreBounds = {
  x: 205,
  y: 95,
  width: 205,
  height: 365,
}

const CLIENT_CORE_POINT: Point = { x: 230, y: 225 }
export const workflowLaneY = 236
export const returnLaneY = 325
export const activityLaneY = 424
export const maxVisibleQueueTasks = 20

const QUEUE_INGRESS_X = 440
const QUEUE_STORAGE_EGRESS_X = 680
const QUEUE_EGRESS_X = 705
const QUEUE_STORAGE_PITCH = 12.5

const RETURN_CORE_POINT: Point = {
  x: serviceCoreBounds.x + serviceCoreBounds.width - 20,
  y: returnLaneY,
}

export const queueIngress = (y: number): Point => ({ x: QUEUE_INGRESS_X, y })

export const queueEgress = (y: number): Point => ({ x: QUEUE_EGRESS_X, y })

export const queueStoragePoint = (index: number, y: number): Point => ({
  x: QUEUE_STORAGE_EGRESS_X - Math.min(index, maxVisibleQueueTasks - 1) * QUEUE_STORAGE_PITCH,
  y,
})

function centeredGridPoint(
  ordinal: number,
  count: number,
  columns: number,
  startX: number,
  centerY: number,
  columnPitch: number,
  rowPitch: number,
): Point {
  const rows = Math.max(1, Math.ceil(count / columns))
  const firstRowY = centerY - ((rows - 1) * rowPitch) / 2
  return {
    x: startX + (ordinal % columns) * columnPitch,
    y: firstRowY + Math.floor(ordinal / columns) * rowPitch,
  }
}

export const pollerPoint = (ordinal: number, count: number, y: number): Point =>
  centeredGridPoint(ordinal, count, 4, 800, y, 28, 24)

export const slotPoint = (ordinal: number, count: number, y: number): Point =>
  centeredGridPoint(ordinal, count, 8, 930, y, 32, 32)

export const slotGroupTop = (count: number, y: number): number => {
  const rows = Math.max(1, Math.ceil(count / 8))
  const groupHeight = 28 + (rows - 1) * 32
  return y - groupHeight / 2
}

export const workflowPoint = (index: number): Point => ({
  x: 230 + (index % 5) * 30,
  y: 225 + Math.floor(index / 5) * 30,
})

export const compactWorkflowPoints = (workflowIds: string[]): Map<string, Point> =>
  new Map(workflowIds.map((workflowId, index) => [workflowId, workflowPoint(index)]))

export const serviceCorePoint = (): Point => CLIENT_CORE_POINT
export const resultCorePoint = (): Point => RETURN_CORE_POINT
export const resultRailY = returnLaneY

export function ordinalFromId(id: string | undefined): number {
  if (!id) return 0
  const match = id.match(/(\d+)$/)
  return Math.max(0, Number(match?.[1] ?? 1) - 1)
}
