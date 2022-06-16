The requirements of your Temporal system will vary widely based on your intended production workload.
You will want to run your own proof of concept tests and watch for key metrics to understand the system health and scaling needs.

- **[Configure your metrics subsystem](/references/configuration/#metrics).** Temporal supports three metrics providers out of the box via [Uber's Tally](https://github.com/uber-go/tally) interface: [StatsD](https://github.com/statsd/statsd), [Prometheus](https://prometheus.io/), and [M3](https://m3db.io/).
  Tally offers [extensible custom metrics reporting](https://github.com/uber-go/tally#report-your-metrics), which we expose via [`temporal.WithCustomMetricsReporter`](/server/options/#withcustommetricsreporter).
  OpenTelemetry support is planned in the future.
- **Set up monitoring.** You can use these [Grafana dashboards](https://github.com/temporalio/dashboards) as a starting point.
  The single most important metric to track is `schedule_to_start_latency` - if you get a spike in workload and don't have enough workers, your tasks will get backlogged. **We strongly recommend setting alerts for this metric**. This is usually emitted in client SDKs as both `temporal_activity_schedule_to_start_latency_*` and `temporal_workflow_task_schedule_to_start_latency_*` variants - see [the Prometheus GO SDK example](https://github.com/temporalio/samples-go/pull/65) and the [Go SDK source](https://community.temporal.io/t/strategies-for-scaling-aws-services/1577) and there are [plans to add it on the Server](https://github.com/temporalio/temporal/issues/1754).
  - Set up alerts for Workflow Task failures.
  - Also set up monitoring/alerting for all Temporal Workers for standard metrics like CPU/Memory utilization.
- **Load testing.** You can use [the Maru benchmarking tool](https://github.com/temporalio/maru/) ([author's guide here](https://mikhail.io/2021/03/maru-load-testing-tool-for-temporal-workflows/)), see how we ourselves [stress test Temporal](/blog/temporal-deep-dive-stress-testing/), or write your own.

All metrics emitted by the server are [listed in Temporal's source](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go).
There are also equivalent metrics that you can configure from the client side.
At a high level, you will want to track these 3 categories of metrics:

- **Service metrics**: For each request made by the service handler we emit `service_requests`, `service_errors`, and `service_latency` metrics with `type`, `operation`, and `namespace` tags.
  This gives you basic visibility into service usage and allows you to look at request rates across services, namespaces and even operations.
- **Persistence metrics**: The Server emits `persistence_requests`, `persistence_errors` and `persistence_latency` metrics for each persistence operation.
  These metrics include the `operation` tag such that you can get the request rates, error rates or latencies per operation.
  These are super useful in identifying issues caused by the database.
- **Workflow Execution stats**: The Server also emits counters for when Workflow Executions are complete.
  These are useful in getting overall stats about Workflow Execution completions.
  Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate` and `workflow_cancel` counters for each type of Workflow Execution completion.
  These include the `namespace` tag.
