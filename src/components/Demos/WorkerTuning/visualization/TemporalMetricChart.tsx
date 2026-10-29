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

interface TemporalMetricChartProps {
  title: string
  subtitle: string
  metricId: string
  simulatedTime: number
  samples: TaskTypeMetricSample[]
  autoPauseTimes?: number[]
  format: 'percent' | 'count'
}

function linePath(
  samples: TaskTypeMetricSample[],
  series: SeriesKey,
  maxTime: number,
  maxValue: number,
): string {
  return samples.map((sample, index) => {
    const x = LEFT + (sample.timestamp / maxTime) * PLOT_WIDTH
    const y = TOP + PLOT_HEIGHT - (sample[series] / maxValue) * PLOT_HEIGHT
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
}

export function TemporalMetricChart({
  title,
  subtitle,
  metricId,
  simulatedTime,
  samples,
  autoPauseTimes = [],
  format,
}: TemporalMetricChartProps) {
  const maxTime = Math.max(simulatedTime, 0.25)
  const observedMax = Math.max(0, ...samples.map((sample) => sample.total))
  const maxValue = format === 'percent' ? 1 : Math.max(1, observedMax * 1.1)
  const current = samples.at(-1)?.total ?? 0
  const midpoint = maxTime / 2
  const valueLabel = format === 'percent' ? `${Math.round(current * 100)}%` : `${Math.round(current)} Tasks`
  const axisLabel = format === 'percent' ? '100%' : `${Math.ceil(maxValue)}`
  const aggregateLabel = format === 'percent' ? 'Maximum' : 'Total'
  const aggregateSeriesId = format === 'percent' ? 'maximum' : 'total'

  return (
    <section className="chart-panel" aria-labelledby={`${metricId}-chart-title`}>
      <div className="chart-header">
        <div>
          <h2 id={`${metricId}-chart-title`}>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="chart-status">
          <strong>{valueLabel}</strong>
          <ThrottleLegend />
          <AutoPauseLegend />
        </div>
      </div>
      <div className="chart-legend" aria-label={`${title} series`}>
        <span><i className="legend-swatch throughput-total" />{aggregateLabel}</span>
        <span><i className="legend-swatch throughput-workflow" />Workflow Tasks</span>
        <span><i className="legend-swatch throughput-activity" />Activity Tasks</span>
      </div>
      <svg
        className="temporal-metric-chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`${title} from 0 to ${simulatedTime.toFixed(1)} simulated seconds`}
        data-chart-kind={metricId}
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
            data-series={`${series === 'total' ? aggregateSeriesId : series}-${metricId}`}
          />
        ))}
        <AutoPauseMarkers timestamps={autoPauseTimes} maxTime={maxTime} left={LEFT} top={TOP} plotWidth={PLOT_WIDTH} plotHeight={PLOT_HEIGHT} />
        <text x={LEFT - 10} y={TOP + 4} textAnchor="end" className="chart-label">{axisLabel}</text>
        <text x={LEFT - 10} y={TOP + PLOT_HEIGHT + 4} textAnchor="end" className="chart-label">{format === 'percent' ? '0%' : '0'}</text>
        <text x={LEFT} y={HEIGHT - 9} textAnchor="middle" className="chart-label">0s</text>
        <text x={LEFT + PLOT_WIDTH / 2} y={HEIGHT - 9} textAnchor="middle" className="chart-label">{midpoint.toFixed(1)}s</text>
        <text x={WIDTH - RIGHT} y={HEIGHT - 9} textAnchor="end" className="chart-label">{simulatedTime.toFixed(1)}s</text>
      </svg>
    </section>
  )
}
