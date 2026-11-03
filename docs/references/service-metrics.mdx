---
id: service-metrics
title: OSS Temporal Service metrics reference
sidebar_label: OSS Temporal Service metrics
description: Reference for the metrics a self-hosted Temporal Service emits, covering request rates, latencies, errors, and Nexus Operation activity.
toc_max_heading_level: 4
tags:
  - Reference
  - Metrics
---

:::info

The information on this page is relevant to open source [Temporal Service deployments](/temporal-service).

See the [Cloud metrics reference](/cloud/metrics/openmetrics/metrics-reference) for metrics emitted by [Temporal Cloud](/evaluate/cloud).

See [SDK metrics](/references/sdk-metrics) for metrics emitted by the [SDKs](/encyclopedia/architecture/temporal-sdks).

Temporal SDKs and the Temporal Service attach these metric dimensions as [tags](/glossary#tag). Once a metric is scraped by Prometheus or another OpenMetrics-compatible system, the same dimensions are called labels.

:::

A Temporal Service emits metrics that operators use to monitor the Temporal Service's performance and to set up alerts.

All metrics emitted by the Temporal Service are listed in [metric_defs.go](https://github.com/temporalio/temporal/blob/main/common/metrics/metric_defs.go).

For details on setting up metrics in your Temporal Service configuration, see the [Temporal Service configuration reference](/references/service-configuration#global).

The [dashboards repository](https://github.com/temporalio/dashboards) contains community-driven Grafana dashboard templates that you can use as a starting point for monitoring the Temporal Service and SDK metrics.
For any metrics that are missing in the dashboards, use [metric_defs.go](https://github.com/temporalio/temporal/blob/main/common/metrics/metric_defs.go) as a reference.

In addition to the metrics the Temporal Service emits, monitor infrastructure metrics such as CPU, memory, and network for every host that runs a Temporal Service service.

Each metric on this page lists its type:

- **Counter:** A value that only increases. Query it with `rate()` or `increase()`.
- **Gauge:** A sampled value that can go up or down.
- **Histogram:** A distribution of values. Latency histograms are defined as timers in `metric_defs.go`. Query them through the `_bucket` series with `histogram_quantile()`.

All example queries on this page use [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/).

## Common metrics

Temporal emits metrics for each gRPC service request.
These metrics are emitted with `type`, `operation`, and `namespace` tags, which show request rates across services, Namespaces, and operations.

- Use the `operation` tag in your query to get request rates, error rates, or latencies per operation.
- Use the `service_name` tag with a service role value, such as `frontend`, `history`, or `matching`, to get details for a specific service.
  The role values are defined in [metric_defs.go](https://github.com/temporalio/temporal/blob/main/common/metrics/metric_defs.go).

All common tags that you can add in your query are defined in [metric_defs.go](https://github.com/temporalio/temporal/blob/main/common/metrics/metric_defs.go).

For example, to see service requests by operation on the Frontend Service, use the following query:

```promql
sum by (operation) (rate(service_requests{service_name="frontend"}[2m]))
```

Start with the following metrics.

### `service_requests`

Counts the gRPC requests the service receives, tagged by `operation`.

Type: Counter

Example: Request rate for the `AddWorkflowTask` operation

```promql
sum(rate(service_requests{operation="AddWorkflowTask"}[2m]))
```

### `service_latency`

Shows latencies for all Client request operations.
Start here to find which operation has high latency.

Type: Histogram

Example: P95 service latency by operation for the Frontend Service

```promql
histogram_quantile(0.95, sum(rate(service_latency_bucket{service_name="frontend"}[5m])) by (operation, le))
```

### `service_error_with_type`

Counts errors the service encounters, tagged by `error_type`.

Type: Counter

Example: Service errors by type for the Frontend Service

```promql
sum(rate(service_error_with_type{service_name="frontend"}[5m])) by (error_type)
```

### `client_errors`

Counts failed requests between Temporal Service roles.
An increase indicates connection issues between roles.

Type: Counter

Example: Errors on requests from the Frontend Service to the History Service

```promql
sum(rate(client_errors{service_name="frontend",service_role="history"}[5m]))
```

The following sections list metrics for each service.
For metrics not listed here, see [metric_defs.go](https://github.com/temporalio/temporal/blob/main/common/metrics/metric_defs.go).

## Matching Service metrics

### `poll_success`

Counts Tasks that are successfully matched to a poller.

Type: Counter

Example:

```promql
sum(rate(poll_success{}[5m]))
```

### `poll_timeouts`

Counts polls that return because no Task was available within the poll timeout.

Type: Counter

Example:

```promql
sum(rate(poll_timeouts{}[5m]))
```

### `asyncmatch_latency`

Measures the time from creation to delivery for async matched Tasks.
The larger this latency, the longer Tasks wait in the queue for your Workers to pick them up.

Type: Histogram

Example:

```promql
histogram_quantile(0.95, sum(rate(asyncmatch_latency_bucket{service_name="matching"}[5m])) by (operation, le))
```

### `no_poller_tasks`

Counts Tasks added to a Task Queue that has no recent poller.
An increase usually means that the Worker or the starter program is using the wrong Task Queue name.

Type: Counter

## History Service metrics

A History Task is an internal Task that the Temporal Service creates as part of a transaction that updates Workflow state.
The History Service processes these Tasks.
Use the following metrics to monitor the health of History Task processing.

### `task_requests`

Counts every Task process request.

Type: Counter

Example:

```promql
sum(rate(task_requests{operation=~"TransferActive.*"}[1m]))
```

### `task_errors`

Counts every Task process error.

Type: Counter

Example:

```promql
sum(rate(task_errors{operation=~"TransferActive.*"}[1m]))
```

### `task_attempt`

Records the number of attempts for each Task Execution.
A Task is retried until it succeeds, and each retry increases the attempt count.

Type: Histogram

Example:

```promql
histogram_quantile(0.95, sum(rate(task_attempt_bucket{operation=~"TransferActive.*"}[1m])) by (operation, le))
```

### `task_latency_processing`

Shows the processing latency per attempt.

Type: Histogram

Example:

```promql
histogram_quantile(0.95, sum(rate(task_latency_processing_bucket{operation=~"TransferActive.*",service_name="history"}[1m])) by (operation, le))
```

### `task_latency`

Measures the in-memory latency across multiple attempts.

Type: Histogram

### `task_latency_queue`

Measures the end-to-end duration from when the Task should run (when it fired) to when the Task is done.

Type: Histogram

### `task_latency_load`

Measures the duration from Task generation to Task loading.
This is the schedule-to-start latency for the persistence queue.

Type: Histogram

### `task_latency_schedule`

Measures the duration from Task submission to the Task scheduler to processing.
This is the schedule-to-start latency for the in-memory queue.

Type: Histogram

### `queue_latency_schedule`

Measures the time to schedule 100 Tasks in one Task channel in the host-level Task scheduler.
If fewer than 100 Tasks are in the Task channel for 30 seconds, the latency is scaled to 100 Tasks when emitted.

Type: Histogram

### `service_latency_userlatency`

Shows the latency introduced by Workflow logic.
For example, one Workflow that schedules many Activities or Child Workflows at the same time can cause per-Workflow lock contention.
The time spent waiting for the per-Workflow lock counts as `userlatency`.

Type: Histogram

The `operation` tag on History Service metrics contains the Task type and whether the Task is Active or Standby.
Use it to get request rates, error rates, or latencies per operation, which helps identify issues caused by database problems.

## Persistence metrics

The Temporal Service emits metrics for every persistence database read and write.
Start with the following metrics.

### `persistence_requests`

Counts every persistence request.

Type: Counter

Example: Persistence requests by operation for the History Service

```promql
sum by (operation) (rate(persistence_requests{service_name="history"}[1m]))
```

Example: Persistence requests by operation for the Matching Service

```promql
sum by (operation) (rate(persistence_requests{service_name="matching"}[1m]))
```

### `persistence_errors`

Counts all persistence errors.
An increase indicates connection issues between the Temporal Service and the persistence store.

Type: Counter

Example: Persistence errors for the History Service

```promql
sum(rate(persistence_errors{service_name="history"}[1m]))
```

### `persistence_error_with_type`

Counts persistence store errors, tagged by `error_type`.

Type: Counter

Example: Persistence errors by type for the History Service

```promql
sum(rate(persistence_error_with_type{service_name="history"}[1m])) by (error_type)
```

### `persistence_latency`

Shows the latency of persistence operations.

Type: Histogram

Example: P95 persistence latency by operation for the History Service

```promql
histogram_quantile(0.95, sum(rate(persistence_latency_bucket{service_name="history"}[1m])) by (operation, le))
```

## Schedule metrics

The following metrics track the performance and outcomes of the Workflow Executions that [Schedules](/schedule) start.
Schedule metrics are tagged by `namespace`, not by individual Schedule.
A non-zero value tells you that at least one Schedule in the Namespace is affected, but not which one.
To find the affected Schedule, see [Troubleshoot missed Schedule Actions](/troubleshooting/schedule-missed-actions).

### `schedule_buffer_overruns`

Counts the times the buffer that holds Scheduled Workflow Executions exceeds its maximum capacity.
This usually happens when a Schedule with the `BufferAll` overlap policy has an average run length longer than its average interval.

Type: Counter

Example:

```promql
sum(rate(schedule_buffer_overruns{namespace="$namespace"}[5m]))
```

### `schedule_missed_catchup_window`

Counts the Scheduled Actions that the Temporal Service didn't run within the configured catchup window.
An outage that lasts longer than the catchup window can cause missed Actions.

Type: Counter

Example:

```promql
sum(rate(schedule_missed_catchup_window{namespace="$namespace"}[5m]))
```

### `schedule_rate_limited`

Counts the Workflow Executions a Schedule tried to start that were throttled by Namespace rate limits.
Frequent rate limiting can cause missed catchup windows.

Type: Counter

Example:

```promql
sum(rate(schedule_rate_limited{namespace="$namespace"}[5m]))
```

### `schedule_action_success`

Counts the Workflow Executions that a Schedule started successfully, on its schedule or from a manual trigger.

Type: Counter

Example:

```promql
sum(rate(schedule_action_success{namespace="$namespace"}[5m]))
```

## Workflow metrics

These metrics count Workflow Execution outcomes.

### `workflow_cancel`

Counts Workflow Executions canceled before completing.

Type: Counter

### `workflow_continued_as_new`

Counts Workflow Executions that Continued-As-New.

Type: Counter

### `workflow_failed`

Counts Workflow Executions that failed.

Type: Counter

### `workflow_success`

Counts Workflow Executions that completed successfully.

Type: Counter

### `workflow_terminate`

Counts Workflow Executions that were terminated.

Type: Counter

### `workflow_timeout`

Counts Workflow Executions that timed out before completing.

Type: Counter

## Nexus metrics

These metrics cover Nexus Operations.

### Nexus machinery in the History Service

See the [Nexus architecture document](https://github.com/temporalio/temporal/blob/main/docs/architecture/nexus.md#scheduler) for how these components fit together.

#### In-memory buffer

- `dynamic_worker_pool_scheduler_enqueued_tasks` (Counter): Increments when a Task is added to the buffer.
- `dynamic_worker_pool_scheduler_dequeued_tasks` (Counter): Increments when a Task is removed from the buffer.
- `dynamic_worker_pool_scheduler_rejected_tasks` (Counter): Increments when the buffer is full and a Task is rejected.
- `dynamic_worker_pool_scheduler_buffer_size` (Gauge): The sampled size of the buffer.

#### Concurrency limiter

- `dynamic_worker_pool_scheduler_active_workers` (Gauge): The sampled number of running goroutines.

#### Rate limiter

- `rate_limited_task_runnable_wait_time` (Histogram): The time a Task waits for the rate limiter.

#### Circuit breaker

- `circuit_breaker_executable_blocked` (Counter): Increments each time the circuit breaker blocks a Task execution.

#### Task executors

- `nexus_outbound_requests` (Counter): The number of outbound Nexus requests the History Service makes.
- `nexus_outbound_latency` (Histogram): The latency of outbound Nexus requests the History Service makes.
- `callback_outbound_requests` (Counter): The number of outbound callback requests the History Service makes.
- `callback_outbound_latency` (Histogram): The latency of outbound callback requests the History Service makes.

### Nexus machinery on the Frontend Service

#### `nexus_requests`

The number of Nexus requests received by the service.

Type: Counter

#### `nexus_latency`

Latency of Nexus requests.

Type: Histogram

#### `nexus_request_preprocess_errors`

The number of Nexus requests for which pre-processing failed.

Type: Counter

#### `nexus_completion_requests`

The number of Nexus completion (callback) requests received by the service.

Type: Counter

#### `nexus_completion_latency`

Latency of Nexus completion (callback) requests.

Type: Histogram

#### `nexus_completion_request_preprocess_errors`

The number of Nexus completion requests for which pre-processing failed.

Type: Counter
