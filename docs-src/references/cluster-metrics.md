---
id: cluster-metrics
title: Temporal Cluster metrics reference
description: The Temporal Cluster emits a range of metrics to help operators get visibility into the Cluster’s performance and set up alerts.
sidebar_label: Cluster metrics
tags:
  - reference
---

A Temporal Cluster emits a range of metrics to help operators get visibility into the Cluster’s performance and to set up alerts.
All metrics emitted by the Cluster are listed in [defs.go](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go).

For details on setting up metrics in your Cluster configuration, see [Temporal Cluster](/references/configuration#global).

The [dashboards repository](https://github.com/temporalio/dashboards) contains community-driven Grafana dashboard templates that can be used as a starting point for monitoring the Temporal Cluster and SDK metrics.
You can use these templates as references to build your own dashboards.
For any metrics that are missing in the dashboards, use [defs.go](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go) as a reference.

Note that, apart from these metrics emitted by the Cluster, you should also monitor infrastructure-specific metrics like CPU, memory, and network for all hosts that are running Temporal Cluster services.

## Common metrics

Temporal emits metrics for each gRPC service request.
These metrics are emitted with `type`, `operation`, and `namespace` tags, which provide visibility into Service usage and show the request rates across Services, Namespaces, and Operations.

- Use the `operation` tag in your query to get request rates, error rates or latencies per operation.
- Use `service_name` tag with the [service role tag values](https://github.com/temporalio/temporal/blob/bba148cf1e1642fd39fa0174423b183d5fc62d95/common/metrics/defs.go#L108) to get details for the specific service.

All common tags that you can add in your query are defined in the following file
**(https://github.com/temporalio/temporal/blob/86966c5d2f78ee74c10b6808857f1a2f64d3c134/common/metrics/defs.go#L90)**.

For example, to see service requests by operation on the Frontend Service, use the following:

`sum by (operation) (rate(service_requests{service_name="frontend"}[2m]))`

Note: All metrics queries in this article are [Prometheus queries](https://prometheus.io/docs/prometheus/latest/querying/basics/).

The following list describes some metrics you can get started with.

### `service_requests`

Shows service requests received per Task Queue.
Example: Service requests by operation
`sum(rate(service_requests{operation=\"AddWorkflowTask\"}[2m]))`

### `service_latency`

Shows latencies for all Client request operations. Usually these are the starting point to investigate which operation is experiencing high latency issues.
Example: P95 service latency by operation for the Frontend service
`histogram_quantile(0.95, sum(rate(service_latency_bucket{service_name="frontend"}[5m])) by (operation, le))`

### `service_error_with_type`

(Available only in v1.17.0+) Use it to identify errors encountered by the service.
Example: Service errors by type for the Frontend Service
`sum(rate(service_errors_with_type{service_name="frontend"}[5m])) by (error_type)`

### `client_errors`

An indicator for connection issues between different Server roles.
Example: Client errors
`sum(rate(client_errors{service_name="frontend",service_role="history"}[5m]))`

In addition to these, you can define some service-specific metrics to get performance details for each service.
Start with the following list, and use [defs.go](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go) to define additional metrics as required.

## Matching Service metrics

### `poll_success`

Shows for tasks that are successfully matched to a poller.
Example: `sum(rate(poll_success{}[5m]))`

### `poll_timeouts`

Shows when no tasks are available for the poller within the poll timeout.
Example: `sum(rate(poll_timeouts{}[5m]))`

### `asyncmatch_latency`

Measures async matched tasks from the time they are created to delivered. The larger this latency the longer tasks are sitting in the queue waiting for your workers to pick them up.
Example: `histogram_quantile(0.95, sum(rate(asyncmatch_latency_bucket{service_name=~"matching"}[5m])) by (operation, le))`

## History Service metrics

History task is an internal task in Temporal that is created as part of a transaction to update Workflow state, and is processed by the Temporal History service.
It is critical to ensure that the History task processing system is healthy.
The following key metrics can be used to monitor the History Service health:

### `task_requests`

Emit on every task process request.
Example: `sum(rate(task_requests{service="$service",operation=~"TransferActive.*"}[1m]))`

### `task_errors`

Emit on every task process error.
Example: `sum(rate(task_errors{operation=~"TransferActive.*"}[1m]))`

### `task_attempt`

Number of attempts on each task execution. A task is retried forever, and each retry increases the attempt count.
Example: `histogram_quantile($percentile, sum(rate(task_attempt_bucket{service="$service",operation=~"TransferActive.*"}[1m])) by (operation, le))`

### `task_latency_processing`

Shows the processing latency per attempt.
Example: `histogram_quantile($percentile, sum(rate(task_latency_processing_bucket{operation=~"TransferActive.*",service="$service", service_name="history"}[1m])) by (operation, le))`

### `task_latency`

Measures the task processing latency for one attempt.

### `task_latency_queue`

Measures the duration, end-to-end, from when the task should be executed (from the time it was fired), to when the task is done.

### `task_latency_load`

(Available only in v1.18.0+) Measures the duration from task generation to task loading (task schedule to start latency for persistence queue).

### `task_latency_schedule`

(Available only in v1.18.0+) Measures the duration from task submission (to task scheduler) to processing (task schedule to start latency for in-memory queue).

### `queue_latency_schedule`

(Available only in v1.18.0+) Measures the time it takes to schedule 100 tasks in one task channel in the host-level task scheduler.
If there are less than 100 tasks in the task channel for 30 sesoncds, the latency will be scaled to 100 tasks upon emission.
Note: This is still an experimental metric and is subject to change.

### `task_latency_userlatency`

Shows the latency introduced because of Workflow logic. For example, if you have one Workflow scheduling many Activities or Child Workflows at the same time, it can cause a per-Workflow lock contention. The wait period for the per-Workflow lock is counted as `userlatency`.

The `operation` tag contains details about Task type and Active vs Standby statuses, and can be used to get request rates, error rates or latencies per operation, which can help identify issues caused by database problems.

## Persistence metrics

Temporal Server emits metrics for every persistence database read and write.
Some of the most important ones are:

### `persistence_requests`

Emitted on every persistence request.
Examples:

- Prometheus query for getting total number of persistence requests by operation for the History Service:
  `sum by (operation) (rate(persistence_requests{service="$service",service_name="history"}[1m]))`
- Prometheus query for getting total number of persistence requests by operation for the Matching Service:
  `sum by (operation) (rate(persistence_requests{cluster="$cluster",service_name="matching"}[5m]))`

### `persistence_errors`

Emitted on persistence error, includes `error_type` tag.
This metric is a good indicator for connection issues between Temporal Server and the persistence store.
Example:

- Prometheus query for getting the persistence errors by service:
  `sum(rate(persistence_error_with_type{service="$service",service_name="history"}[1m])) by (error_type)`

### `persistence_latency`

Shows the latency on persistence operations.
Example:

- Prometheus query for getting latency by percentile:
  `histogram_quantile($percentile, sum(rate(persistence_latency_bucket{service="$service" service_name="history"}[1m])) by (operation, le))`

## Relevant SDK Metrics for Workflows and Activities

- To monitor task queue backlog look at the `schedule_to_start` latency metrics, for example, `temporal_workflow_task_schedule_to_start_latency_seconds_bucket` and `temporal_activity_schedule_to_start_latency_seconds_bucket` metrics.
- For Activity Workers, use the `temporal_worker_task_slots_available` SDK metric with label `worker_type="ActivityWorker"` to help you tune your `WorkerOptions#getMaxConcurrentActivityExecutionSize` setting.
- `Workflow_endtoend_latency` - measures your Workflow Execution time from start to close.
- Temporal emits counters on completion of Workflows. These are useful in getting the overall statistics about Workflow completion. Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate` and `workflow_cancel` counters for each type of Workflow completion. These metrics are also tagged with `namespace` tag.
