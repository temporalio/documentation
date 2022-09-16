---
slug: cluster-metrics-reference
title: Cluster metrics reference
tags:
  - kb-article
date: 2022-09-15T00:00:00Z
---

The Temporal Cluster reports a range of metrics to help operators get visibility into the Cluster’s performance and set up alerts.
All metrics emitted by the Cluster are listed in [defs.go](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go).

For details on setting up metrics in your Cluster configuraiton, see [Temporal Cluster](/references/configuration/##global).

The [dashboards repository](https://github.com/temporalio/dashboards) contains community-driven Grafana dashboards that can be used for monitoring Temporal Server and SDK metrics.
You can use these as a reference to build your own dashboards.
For any metrics that are missing in the dashboards, use [defs.go](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go) as a reference.

Note that apart from these metrics emitted by the Cluster, you should also monitor infrastructure-specific metrics like CPU, memory, and network for all hosts that are running Temporal Cluster services.

## Metrics reference

Temporal emits metrics for each gRPC service request.
These metrics are emitted with `type`, `operation`, and `namespace` tags, which provide visibility into service usage and show the request rates across services, namespaces, and even operations.

- Use the `operation` tag with each metric in your query to get request rates, error rates or latencies per operation.
- Use `service_type` with the [service role tag values](https://github.com/temporalio/temporal/blob/bba148cf1e1642fd39fa0174423b183d5fc62d95/common/metrics/defs.go#L108) to get details for the specific service.

For example, to get the Workflow Task start to schedule ratio, use:

```
sum(rate(service_requests{service_type="history", operation="RecordWorkflowTaskStarted"}[2m])) / sum(rate(service_requests{service_type="matching", operation="AddWorkflowTask"}[2m]))
```

Note: All metrics queries in this article are [Prometheus queries](https://prometheus.io/docs/prometheus/latest/querying/basics/).

The following list describes some metrics you can get started with.

- [`service_requests`](https://github.com/temporalio/temporal/blob/bba148cf1e1642fd39fa0174423b183d5fc62d95/common/metrics/defs.go#L2497) - shows service requests received per Task Queue.
  Example: Service requests by operation
  `sum(rate(service_requests{operation=\"AddWorkflowTask\"}[2m]))`

- [`service_latency`](https://github.com/temporalio/temporal/blob/bba148cf1e1642fd39fa0174423b183d5fc62d95/common/metrics/defs.go#L2502) - shows latencies for all Client request operations. Usually these are the starting point to investigate which operation is experiencing high latency issues.
  Example: Service latency by operation for the Frontend service
  `histogram_quantile(0.95, sum(rate(service_latency_bucket{service_type="frontend"}[5m])) by (operation, le))`

- [`service_error_with_type`](https://github.com/temporalio/temporal/blob/bba148cf1e1642fd39fa0174423b183d5fc62d95/common/metrics/defs.go#L2500) - (available only in v1.17.0+) to identify errors encountered by the service.
  Example: Service errors by type for the Frontend service
  `sum(rate(service_errors_with_type{service_type="frontend"}[5m])) by (error_type)`

- [`client_errors`](https://github.com/temporalio/temporal/blob/bba148cf1e1642fd39fa0174423b183d5fc62d95/common/metrics/defs.go#L2539) - an indicator for connection issues between different Server roles.
  Example: Client errors
  `sum(rate(client_errors{service_type="frontend",service_role="history"}[5m]))`

The complete list of common metrics is [here](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2496).

In addition to these, you can define some Service-specific metrics to get performance details for each service.
Start with the following list, and use [defs.go](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go) to define additional metrics as required.

### Matching Service metrics

- [poll_success_per_tl](https://github.com/temporalio/temporal/blob/6a354ee73f41a26497130f6cd0f4b97ac157f680/common/metrics/defs.go#L2823) - _need description here_.
  Example: `sum(rate(poll_success{}[5m]))`
- [poll_timeouts](https://github.com/temporalio/temporal/blob/6a354ee73f41a26497130f6cd0f4b97ac157f680/common/metrics/defs.go#L2824) - _need description here_.
  Example: `sum(rate(poll_timeouts{}[5m]))`
- [poll_success_sync_per_tl](https://github.com/temporalio/temporal/blob/6a354ee73f41a26497130f6cd0f4b97ac157f680/common/metrics/defs.go#L2825)
  Example: `sum(rate(poll_success_sync{}[5m]))`
- [asyncmatch_latency](https://github.com/temporalio/temporal/blob/77be7a96c66e6ca1ffc1f6c56d2779e0264d5dfe/common/metrics/defs.go#L2807) - measures async matched tasks from the time they are created to delivered. The larger this latency the longer tasks are sitting in the queue waiting for your workers to pick them up.
  Example: `histogram_quantile(0.95, sum(rate(asyncmatch_latency_bucket{service_type=~"matching"}[5m])) by (operation, le))`

### History Service metrics

History task is an internal task in Temporal that is created as part of a transaction to update Workflow state, and is processed by the Temporal History service.
It is critical to ensure that the History task processing system is healthy.
The following key metrics can be used to monitor the History Service health:

- [task_requests](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2641): emit on every task process request.
  Example: `sum(rate(task_requests{service="$service",operation=~"TransferActive.*"}[1m]))`
- [task_errors](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2648): emit on task process error.
  Example: `sum(rate(task_errors{operation=~"TransferActive.*"}[1m]))`
- [task_attempt](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2647): number of attempts on each task execution. A task is retried forever, and each retry increases the attempt count.
  Example: `histogram_quantile($percentile, sum(rate(task_attempt_bucket{service="$service",operation=~"TransferActive.*"}[1m])) by (operation, le))`
- [task_latency_processing](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2658) : processing latency per attempt.
  Example: `histogram_quantile($percentile, sum(rate(task_latency_processing_bucket{operation=~"TransferActive.*",service="$service", service_type="history"}[1m])) by (operation, le))`
- [task_latency](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2643): processing latency of all attempts within a single Worker.
- [task_latency_queue](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2661): end-to-end task latency, from the time the task is generated to when it completes.
  Example: _need an example_
- [task_latency_userlatency](https://github.com/temporalio/temporal/blob/fcec8f99bb199ad28632d5a1c84b9281f816db0c/common/metrics/defs.go#L2644): latency introduced because of Workflow logic. For example, if you have one Workflow scheduling many Activities or Child Workflows at the same time, it can cause a per-Workflow lock contention. The wait period for the per-Workflow lock is counted as `userlatency`.
  Example: _need an example_

The `operation` tag contains details about Task type and Active vs Standby statuses, and can be used to get request rates, error rates or latencies per operation.
These can help identify issues caused by database problems.

### Persistence metrics

Temporal Server emits metrics for every persistence database read and write.
Some of the most important metrics are:

- [persistence_requests](https://github.com/temporalio/temporal/blob/57424088d28e785d4dfe797c4a957f093e5ad02e/common/metrics/defs.go#L2523): emit on every persistence request.
  Examples:
  - Prometheus query for getting total number of persistence requests by operation for the history service:
    `sum by (operation) (rate(persistence_requests{service="$service",service_type="history"}[1m]))`
  - Prometheus query for getting total number of persistence requests by operation for the matching service:
    `sum by (operation) (rate(persistence_requests{cluster="$cluster",service_type="matching"}[5m]))`
- [persistence_errors](https://github.com/temporalio/temporal/blob/57424088d28e785d4dfe797c4a957f093e5ad02e/common/metrics/defs.go#L2524): emit on persistence error, includes `error_type` tag. This metric is a good indicator for connection issues between server and persistence store.
  Example:
  - Prometheus query for getting the persistence errors by type:
    `sum(rate(persistence_error_with_type{service="$service",service_type="history"}[1m])) by (error_type)`
- [persistence_latency](https://github.com/temporalio/temporal/blob/57424088d28e785d4dfe797c4a957f093e5ad02e/common/metrics/defs.go#L2526):
  Example:
  - Prometheus query for getting latency by percentile:
    `histogram_quantile($percentile, sum(rate(persistence_latency_bucket{service="$service" service_type="history"}[1m])) by (operation, le))`

### Workflows and Activities metrics

- To monitor task queue backlog look at the `schedule_to_start` latency metrics, for example, `temporal_workflow_task_schedule_to_start_latency_seconds_bucket` and `temporal_activity_schedule_to_start_latency_seconds_bucket` metrics.
- For Activity Workers, use the `temporal_worker_task_slots_available` SDK metric with label `worker_type="ActivityWorker"` to help you tune your `WorkerOptions#getMaxConcurrentActivityExecutionSize` setting.
- `Workflow_endtoend_latency` - measures your Workflow Execution time from start to close.
- Temporal emits counters on completion of Workflows. These are useful in getting the overall statistics about Workflow completion. Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate` and `workflow_cancel` counters for each type of Workflow completion. These metrics are also tagged with `namespace` tag.

## Cluster performance baselines

Here are some baselines to consider when analyzing performance:

- Frontend API latency at P95 should be below 100ms.
- For Matching Service, - `AddWorkflowTask` ideally should be 50ms to ~100ms - `AddActivityTask` might be slightly higher if there is contention between multiple concurrent Activities for the same Workflow Execution.
- _add more baselines here_
