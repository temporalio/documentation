export interface ContentionCurve {
  knee: number
  maxSpeedLoss: number
}

export function resourceProgressScale(
  demand: number,
  capacity: number,
  curve: ContentionCurve,
): number {
  if (demand <= 0 || capacity <= 0) return 0
  const loadRatio = demand / capacity
  const pressure = Math.max(0, Math.min(1, (Math.min(loadRatio, 1) - curve.knee) / (1 - curve.knee)))
  const smoothPressure = pressure * pressure * (3 - 2 * pressure)
  const contentionScale = 1 - curve.maxSpeedLoss * smoothPressure
  const overloadScale = Math.min(1, 1 / loadRatio)
  return contentionScale * overloadScale
}
