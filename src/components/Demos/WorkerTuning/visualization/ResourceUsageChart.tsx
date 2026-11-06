import type { MetricSample } from '../simulation'
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

type ResourceKind = 'cpu' | 'memory' | 'io'

function linePath(samples: MetricSample[], maxTime: number, maxValue: number): string {
  return samples.map((sample, index) => {
    const x = LEFT + (sample.timestamp / maxTime) * PLOT_WIDTH
    const y = TOP + PLOT_HEIGHT - (sample.value / maxValue) * PLOT_HEIGHT
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
}

export function ResourceUsageChart({
  title,
  subtitle,
  resource,
  simulatedTime,
  currentValue,
  samples,
  autoPauseTimes = [],
}: {
  title: string
  subtitle: string
  resource: ResourceKind
  simulatedTime: number
  currentValue: number
  samples: MetricSample[]
  autoPauseTimes?: number[]
}) {
  const maxTime = Math.max(simulatedTime, 0.25)
  const maxValue = 1
  const midpoint = maxTime / 2
  const valueLabel = `${Math.round(currentValue * 100)}%`

  return (
    <section className="chart-panel" aria-labelledby={`${resource}-usage-chart-title`}>
      <div className="chart-header">
        <div>
          <h2 id={`${resource}-usage-chart-title`}>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="chart-status">
          <strong>{valueLabel}</strong>
          <ThrottleLegend />
          <AutoPauseLegend />
        </div>
      </div>
      <svg
        className="resource-usage-chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`${title} from 0 to ${simulatedTime.toFixed(1)} simulated seconds`}
        data-chart-kind={`${resource}-usage`}
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
        <path d={linePath(samples, maxTime, maxValue)} className={`chart-line resource-${resource}`} data-series={`${resource}-usage`} />
        <AutoPauseMarkers timestamps={autoPauseTimes} maxTime={maxTime} left={LEFT} top={TOP} plotWidth={PLOT_WIDTH} plotHeight={PLOT_HEIGHT} />
        <text x={LEFT - 10} y={TOP + 4} textAnchor="end" className="chart-label">100%</text>
        <text x={LEFT - 10} y={TOP + PLOT_HEIGHT + 4} textAnchor="end" className="chart-label">0%</text>
        <text x={LEFT} y={HEIGHT - 9} textAnchor="middle" className="chart-label">0s</text>
        <text x={LEFT + PLOT_WIDTH / 2} y={HEIGHT - 9} textAnchor="middle" className="chart-label">{midpoint.toFixed(1)}s</text>
        <text x={WIDTH - RIGHT} y={HEIGHT - 9} textAnchor="end" className="chart-label">{simulatedTime.toFixed(1)}s</text>
      </svg>
    </section>
  )
}
