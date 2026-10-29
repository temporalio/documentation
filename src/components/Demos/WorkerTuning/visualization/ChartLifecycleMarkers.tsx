export function AutoPauseMarkers({
  timestamps,
  maxTime,
  left,
  top,
  plotWidth,
  plotHeight,
}: {
  timestamps: number[]
  maxTime: number
  left: number
  top: number
  plotWidth: number
  plotHeight: number
}) {
  return (
    <g className="chart-auto-pause-markers" aria-label="Auto-pause boundaries">
      {timestamps.filter((timestamp) => timestamp <= maxTime).map((timestamp) => {
        const x = left + (timestamp / maxTime) * plotWidth
        return (
          <line
            key={timestamp}
            x1={x}
            y1={top}
            x2={x}
            y2={top + plotHeight}
            className="chart-auto-pause-line"
            data-auto-pause-at={timestamp}
          >
            <title>{`Simulation auto-paused at ${timestamp.toFixed(1)}s`}</title>
          </line>
        )
      })}
    </g>
  )
}

export function AutoPauseLegend() {
  return (
    <span className="chart-auto-pause-key">
      <i />Auto-pause
    </span>
  )
}
