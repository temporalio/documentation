export const BASE_SIMULATION_RATE = 0.75

export function simulationSecondsForRealSeconds(realSeconds: number, timeScale: number): number {
  return realSeconds * timeScale * BASE_SIMULATION_RATE
}
