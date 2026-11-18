import type { TaskDistribution, TaskDistributionStats } from '../simulation'

function seconds(value: number): string {
  return `${value.toFixed(2)}s`
}

function DistributionRow({ label, stats }: { label: string; stats: TaskDistributionStats }) {
  return (
    <tr>
      <th scope="row">{label}</th>
      <td>{stats.completed}</td>
      <td>{stats.throughput.toFixed(2)}</td>
      <td>{seconds(stats.averageLatency)}</td>
      <td>{seconds(stats.p25Latency)}</td>
      <td>{seconds(stats.p50Latency)}</td>
      <td>{seconds(stats.p75Latency)}</td>
      <td>{seconds(stats.p95Latency)}</td>
      <td>{seconds(stats.p99Latency)}</td>
      <td>{seconds(stats.maxLatency)}</td>
    </tr>
  )
}

export function TaskDistributionTable({ distribution }: { distribution: TaskDistribution }) {
  return (
    <section className="chart-panel load-test-table-panel" aria-labelledby="task-distribution-title">
      <div className="chart-header">
        <div>
          <h2 id="task-distribution-title">Task statistics</h2>
          <p>Current-run throughput and schedule-to-completion latency distribution</p>
        </div>
      </div>
      <div className="load-test-table-scroll">
        <table className="load-test-table">
          <thead>
            <tr>
              <th scope="col">Task group</th>
              <th scope="col">Completed</th>
              <th scope="col">Tasks/s</th>
              <th scope="col">Average</th>
              <th scope="col">P25</th>
              <th scope="col">P50</th>
              <th scope="col">P75</th>
              <th scope="col">P95</th>
              <th scope="col">P99</th>
              <th scope="col">Max</th>
            </tr>
          </thead>
          <tbody>
            <DistributionRow label="All Tasks" stats={distribution.total} />
            <DistributionRow label="Workflow Tasks" stats={distribution.workflow} />
            <DistributionRow label="Activity Tasks" stats={distribution.activity} />
          </tbody>
        </table>
      </div>
    </section>
  )
}
