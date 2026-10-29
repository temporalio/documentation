import type { TaskTypeMetricSample } from '../simulation'
import { AutoPauseLegend, AutoPauseMarkers } from './ChartLifecycleMarkers'
import { ThrottleBands, ThrottleLegend } from './ThrottleBands'

const WIDTH = 1200
const HEIGHT = 180
const LEFT = 62
const RIGHT = 20
const TOP = 18
const BOTTOM = 34
const PLOT_WIDTH = WIDTH - LEFT - RIGHT
const PLOT_HEIGHT = HEIGHT - TOP - BOTTOM

type SeriesKey = 'total' | 'workflow' | 'activity'

function linePath(samples: TaskTypeMetricSample[], series: SeriesKey, maxTime: number, maxValue: number): string {
  return samples.map((sample, index) => {
    const x = LEFT + (sample.timestamp / maxTime) * PLOT_WIDTH
    const y = TOP + PLOT_HEIGHT - (sample[series] / maxValue) * PLOT_HEIGHT
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
}

export function TaskLatencyChart({
  simulatedTime,
  samples,
  autoPauseTimes = [],
}: {
  simulatedTime: number
  samples: TaskTypeMetricSample[]
  autoPauseTimes?: number[]
}) {
  const maxTime = Math.max(simulatedTime, 0.25)
  const observedMax = Math.max(0, ...samples.flatMap((sample) => [sample.total, sample.workflow, sample.activity]))
  const maxValue = Math.max(1, observedMax * 1.1)
  const midpoint = maxTime / 2
  const current = samples.at(-1)?.total ?? 0

  return (
    <section className="chart-panel" aria-labelledby="task-latency-chart-title">
      <div className="chart-header">
        <div>
          <h2 id="task-latency-chart-title">Task completion latency</h2>
          <p>Rolling 5-second mean from Task scheduling through completion</p>
        </div>
        <div className="chart-status">
          <strong>{current.toFixed(2)}s</strong>
          <ThrottleLegend />
          <AutoPauseLegend />
        </div>
      </div>
      <div className="chart-legend" aria-label="Task completion latency series">
        <span><i className="legend-swatch throughput-total" />Overall</span>
        <span><i className="legend-swatch throughput-workflow" />Workflow Tasks</span>
        <span><i className="legend-swatch throughput-activity" />Activity Tasks</span>
      </div>
      <svg
        className="task-latency-chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Task completion latency from 0 to ${simulatedTime.toFixed(1)} simulated seconds`}
        data-time-max={simulatedTime}
        data-sample-count={samples.length}
      >
        <ThrottleBands samples={samples} maxTime={maxTime} left={LEFT} top={TOP} plotWidth={PLOT_WIDTH} plotHeight={PLOT_HEIGHT} />
        {[0, 0.5, 1].map((fraction) => {
          const y = TOP + PLOT_HEIGHT - fraction * PLOT_HEIGHT
          return <line key={fraction} x1={LEFT} y1={y} x2={WIDTH - RIGHT} y2={y} className="chart-grid-line" />
        })}
        <line x1={LEFT} y1={TOP} x2={LEFT} y2={TOP + PLOT_HEIGHT} className="chart-axis" />
        <line x1={LEFT} y1={TOP + PLOT_HEIGHT} x2={WIDTH - RIGHT} y2={TOP + PLOT_HEIGHT} className="chart-axis" />
        {(['workflow', 'activity', 'total'] as const).map((series) => (
          <path
            key={series}
            d={linePath(samples, series, maxTime, maxValue)}
            className={`chart-line throughput-${series}`}
            data-series={`${series === 'total' ? 'overall' : series}-task-latency`}
          />
        ))}
        <AutoPauseMarkers timestamps={autoPauseTimes} maxTime={maxTime} left={LEFT} top={TOP} plotWidth={PLOT_WIDTH} plotHeight={PLOT_HEIGHT} />
        <text x={LEFT - 10} y={TOP + 4} textAnchor="end" className="chart-label">{maxValue.toFixed(2)}s</text>
        <text x={LEFT - 10} y={TOP + PLOT_HEIGHT + 4} textAnchor="end" className="chart-label">0s</text>
        <text x={LEFT} y={HEIGHT - 9} textAnchor="middle" className="chart-label">0s</text>
        <text x={LEFT + PLOT_WIDTH / 2} y={HEIGHT - 9} textAnchor="middle" className="chart-label">{midpoint.toFixed(1)}s</text>
        <text x={WIDTH - RIGHT} y={HEIGHT - 9} textAnchor="end" className="chart-label">{simulatedTime.toFixed(1)}s</text>
      </svg>
    </section>
  )
}
