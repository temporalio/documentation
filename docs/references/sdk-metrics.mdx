---
id: sdk-metrics
title: Temporal SDK metrics reference
sidebar_label: SDK metrics
description: Metrics Temporal SDKs emit from Clients and Workers, with each metric's type, tags, and the SDKs that define it.
toc_max_heading_level: 4
tags:
  - Reference
  - Metrics
---

:::info

For metrics emitted by [Temporal Cloud](/evaluate/cloud), see [Cloud metrics](/cloud/metrics/openmetrics).
For metrics emitted by a [self-hosted Temporal Service](/temporal-service), see [Temporal Service metrics](/references/service-metrics).
To tune Workers based on these metrics, see [Worker performance](/develop/worker-performance).

:::

The [Temporal SDKs](/encyclopedia/architecture/temporal-sdks) emit metrics from Temporal Client usage and Worker Processes.
To set up metrics in your application, see the observability guide for your SDK:
[Go](/develop/go/platform/observability#metrics),
[Java](/develop/java/platform/observability#metrics),
[Python](/develop/python/platform/observability#metrics),
[TypeScript](/develop/typescript/platform/observability#metrics),
[.NET](/develop/dotnet/platform/observability#metrics), or
[Ruby](/develop/ruby/platform/observability#metrics).

Only the metrics on this page have guaranteed, defined behavior.
Some SDKs emit other metrics.
Treat those as deprecated, inconsistent, or experimental.

The SDKs add the `temporal_` prefix to every metric before exporting it.
Headings on this page omit the prefix.

Each metric on this page lists the following:

- **Type:** Counter, Gauge, or Histogram.
- **Available in:** The SDK that defines the metric.
  Other SDKs inherit their metrics from one of these:
  - **Core:** The [Core SDK](/glossary#core-sdk) defines the metrics for the TypeScript, Python, .NET, and Ruby SDKs, in [Worker metrics](https://github.com/temporalio/sdk-rust/blob/main/crates/sdk-core/src/telemetry/metrics.rs) and [Client metrics](https://github.com/temporalio/sdk-rust/blob/main/crates/client/src/metrics.rs).
  - **Go:** The Go SDK defines the metrics for the Go and PHP SDKs, in [Worker and Client metrics](https://github.com/temporalio/sdk-go/blob/main/internal/common/metrics/constants.go).
  - **Java:** The Java SDK defines its own metrics, in [Worker metrics](https://github.com/temporalio/sdk-java/blob/main/temporal-sdk/src/main/java/io/temporal/worker/MetricsType.java) and [Client metrics](https://github.com/temporalio/sdk-java/blob/main/temporal-serviceclient/src/main/java/io/temporal/serviceclient/MetricsType.java).
- **Tags:** The [tags](/glossary#tag) the SDK attaches to the metric.
  Prometheus and other OpenMetrics-compatible systems call these labels.

:::note Metric units across SDKs

The unit for Histogram metrics depends on the SDK:

- **Core-based SDKs:** Milliseconds by default.
  You can configure Core-based SDKs to use seconds instead.
- **Go and Java SDKs:** Seconds.

:::

Each metric may have some combination of the following tags:

- `task_queue`: The Task Queue the Worker Entity polls.
- `namespace`: The Namespace the Worker is bound to.
- `poller_type`: One of the following:
  - `workflow_task`
  - `workflow_sticky_task`
  - `activity_task`
  - `nexus_task`
- `worker_type`: One of the following:
  - `ActivityWorker`
  - `WorkflowWorker`
  - `LocalActivityWorker`
  - `NexusWorker`
- `activity_type`: The name of the Activity Function.
- `workflow_type`: The name of the Workflow Function.
- `operation`: The RPC method name. Available on Temporal Client gRPC request metrics.
- `status_code`: The gRPC status code the Temporal Service returned, in `UPPER_SNAKE_CASE`, such as `NOT_FOUND`. Available on Temporal Client gRPC request failure metrics.
- `cause`: The reason the Temporal Service rejected a request as resource exhausted, such as `RESOURCE_EXHAUSTED_CAUSE_RPS_LIMIT`. Available on the resource-exhausted metrics.

Not every SDK attaches every tag, and Histogram buckets differ between SDKs.

| Metric name                                                                                  | Emitted by     | Metric type | Availability   |
| -------------------------------------------------------------------------------------------- | -------------- | ----------- | -------------- |
| [temporal_activity_execution_cancelled](#activity_execution_cancelled)                       | Worker         | Counter     | Java           |
| [temporal_activity_execution_failed](#activity_execution_failed)                             | Worker         | Counter     | Core, Go, Java |
| [temporal_activity_execution_latency](#activity_execution_latency)                           | Worker         | Histogram   | Core, Go, Java |
| [temporal_activity_poll_no_task](#activity_poll_no_task)                                     | Worker         | Counter     | Core, Go, Java |
| [temporal_activity_schedule_to_start_latency](#activity_schedule_to_start_latency)           | Worker         | Histogram   | Core, Go, Java |
| [temporal_activity_succeed_endtoend_latency](#activity_succeed_endtoend_latency)             | Worker         | Histogram   | Core, Go, Java |
| [temporal_activity_task_error](#activity_task_error)                                         | Worker         | Counter     | Go             |
| [temporal_corrupted_signals](#corrupted_signals)                                             | Worker         | Counter     | Go, Java       |
| [temporal_local_activity_execution_cancelled](#local_activity_execution_cancelled)           | Worker         | Counter     | Core, Go, Java |
| [temporal_local_activity_execution_failed](#local_activity_execution_failed)                 | Worker         | Counter     | Core, Go, Java |
| [temporal_local_activity_execution_latency](#local_activity_execution_latency)               | Worker         | Histogram   | Core, Go, Java |
| [temporal_local_activity_succeed_endtoend_latency](#local_activity_succeed_endtoend_latency) | Worker         | Histogram   | Core, Go, Java |
| [temporal_local_activity_total](#local_activity_total)                                       | Worker         | Counter     | Core, Go, Java |
| [temporal_long_request](#long_request)                                                       | Service Client | Counter     | Core, Go, Java |
| [temporal_long_request_failure](#long_request_failure)                                       | Service Client | Counter     | Core, Go, Java |
| [temporal_long_request_latency](#long_request_latency)                                       | Service Client | Histogram   | Core, Go, Java |
| [temporal_long_request_resource_exhausted](#long_request_resource_exhausted)                 | Service Client | Counter     | Go             |
| [temporal_nexus_poll_no_task](#nexus_poll_no_task)                                           | Worker         | Counter     | Core, Go, Java |
| [temporal_nexus_task_schedule_to_start_latency](#nexus_task_schedule_to_start_latency)       | Worker         | Histogram   | Core, Go, Java |
| [temporal_nexus_task_execution_failed](#nexus_task_execution_failed)                         | Worker         | Counter     | Core, Go, Java |
| [temporal_nexus_task_execution_latency](#nexus_task_execution_latency)                       | Worker         | Histogram   | Core, Go, Java |
| [temporal_nexus_task_endtoend_latency](#nexus_task_endtoend_latency)                         | Worker         | Histogram   | Core, Go, Java |
| [temporal_num_pollers](#num_pollers)                                                         | Worker         | Gauge       | Core, Go, Java |
| [temporal_poller_start](#poller_start)                                                       | Worker         | Counter     | Go, Java       |
| [temporal_request](#request)                                                                 | Service Client | Counter     | Core, Go, Java |
| [temporal_request_failure](#request_failure)                                                 | Service Client | Counter     | Core, Go, Java |
| [temporal_request_latency](#request_latency)                                                 | Service Client | Histogram   | Core, Go, Java |
| [temporal_request_resource_exhausted](#request_resource_exhausted)                           | Service Client | Counter     | Go             |
| [temporal_resource_slots_cpu_usage](#resource_slots_cpu_usage)                               | Worker         | Gauge       | Core, Java     |
| [temporal_resource_slots_mem_usage](#resource_slots_mem_usage)                               | Worker         | Gauge       | Core, Java     |
| [temporal_sticky_cache_hit](#sticky_cache_hit)                                               | Worker         | Counter     | Core, Go, Java |
| [temporal_sticky_cache_miss](#sticky_cache_miss)                                             | Worker         | Counter     | Core, Go, Java |
| [temporal_sticky_cache_size](#sticky_cache_size)                                             | Worker         | Gauge       | Core, Go, Java |
| [temporal_sticky_cache_total_forced_eviction](#sticky_cache_total_forced_eviction)           | Worker         | Counter     | Core, Go, Java |
| [temporal_unregistered_activity_invocation](#unregistered_activity_invocation)               | Worker         | Counter     | Go             |
| [temporal_worker_start](#worker_start)                                                       | Worker         | Counter     | Core, Go, Java |
| [temporal_worker_task_slots_available](#worker_task_slots_available)                         | Worker         | Gauge       | Core, Go, Java |
| [temporal_worker_task_slots_used](#worker_task_slots_used)                                   | Worker         | Gauge       | Core, Go, Java |
| [temporal_workflow_active_thread_count](#workflow_active_thread_count)                       | Worker         | Gauge       | Java           |
| [temporal_workflow_canceled](#workflow_canceled)                                             | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_completed](#workflow_completed)                                           | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_continue_as_new](#workflow_continue_as_new)                               | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_endtoend_latency](#workflow_endtoend_latency)                             | Worker         | Histogram   | Core, Go, Java |
| [temporal_workflow_failed](#workflow_failed)                                                 | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_task_execution_failed](#workflow_task_execution_failed)                   | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_task_execution_latency](#workflow_task_execution_latency)                 | Worker         | Histogram   | Core, Go, Java |
| [temporal_workflow_task_queue_poll_empty](#workflow_task_queue_poll_empty)                   | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_task_queue_poll_succeed](#workflow_task_queue_poll_succeed)               | Worker         | Counter     | Core, Go, Java |
| [temporal_workflow_task_replay_latency](#workflow_task_replay_latency)                       | Worker         | Histogram   | Core, Go, Java |
| [temporal_workflow_task_schedule_to_start_latency](#workflow_task_schedule_to_start_latency) | Worker         | Histogram   | Core, Go, Java |

### `activity_execution_cancelled`

An Activity Execution was canceled.

- Type: Counter
- Available in: Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `activity_execution_failed`

An Activity Execution failed.
In the Go and Java SDKs, this metric doesn't count Local Activity failures.
For those, see [`local_activity_execution_failed`](#local_activity_execution_failed).

- Type: Counter
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`, `failure_reason`

Valid values for the `failure_reason` tag:

- `PayloadsTooLarge`: A Payload in the Activity Task response exceeded the Namespace size limit, so the Worker failed the Activity Task as retryable before sending it.
  See [Activity Payloads too large](/troubleshooting/execution-failures#activity-payloads-too-large).
- `ActivityError`: The Activity Task failed for any other reason.

### `activity_execution_latency`

Time to complete an Activity Execution, from when the Activity Task is generated to when the SDK responds with a success or failure.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `activity_poll_no_task`

An Activity Worker's poll for an Activity Task timed out because no Activity Task was available on the Task Queue.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `activity_schedule_to_start_latency`

The Schedule-To-Start time of an Activity Task.
Use this metric to check that Workers pick up Activity Tasks from the Task Queue promptly.
To limit this time, set a [Schedule-To-Start Timeout](/encyclopedia/detecting-activity-failures#schedule-to-start-timeout) when you start the Activity Execution.

Some SDKs add the `activity_type` and `workflow_type` tags.
The value doesn't vary by type, because the type doesn't affect how fast Workers pull tasks from the Task Queue.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `activity_succeed_endtoend_latency`

Total time for a successful Activity Execution, from when it's scheduled to when it completes.
The SDK doesn't record this metric for Activities that complete asynchronously.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `activity_task_error`

An internal error or panic occurred while the Worker handled or ran an Activity Task.

- Type: Counter
- Available in: Go
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `corrupted_signals`

The number of Signals whose Payload the Worker couldn't deserialize.

- Type: Counter
- Available in: Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `local_activity_execution_cancelled`

A Local Activity Execution was canceled.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `local_activity_execution_failed`

A Local Activity Execution failed.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`, `failure_reason`

Valid values for the `failure_reason` tag:

- `timeout`: The Local Activity exceeded its Schedule-To-Close Timeout or Start-To-Close Timeout.
- `ActivityError`: The Local Activity failed for any other reason.

### `local_activity_execution_latency`

Time to complete a Local Activity Execution, from when the first Activity Task is generated to when the SDK responds that the execution is complete.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `local_activity_succeed_endtoend_latency`

Total time for a successful Local Activity Execution, from when it's scheduled to when it completes.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `local_activity_total`

The total number of [Local Activity Executions](/local-activity).

- Type: Counter
- Available in: Core, Go, Java
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `long_request`

The Temporal Client made a gRPC long-poll request.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `operation`

### `long_request_failure`

A gRPC long-poll request from the Temporal Client failed.
The `long_request` counter also counts these requests.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `operation`, `status_code`

The `status_code` tag holds the gRPC status code the Temporal Service returned.
Values match the gRPC status code names in `UPPER_SNAKE_CASE`, such as `NOT_FOUND`, `RESOURCE_EXHAUSTED`, `UNIMPLEMENTED`, and `INTERNAL`.
Client options can suppress this tag, so confirm your metrics endpoint includes it before you write queries against it.

### `long_request_latency`

Latency of a gRPC long-poll request from the Temporal Client.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `operation`

### `long_request_resource_exhausted`

The Temporal Service rejected a gRPC long-poll request from the Temporal Client as resource exhausted.
The `long_request_failure` metric also counts these failures with `status_code=RESOURCE_EXHAUSTED`.
This metric adds the reason for the rejection in the `cause` tag.

- Type: Counter
- Available in: Go
- Tags: `namespace`, `operation`, `cause`

The `cause` tag holds the reason the Temporal Service rejected the request, such as `RESOURCE_EXHAUSTED_CAUSE_RPS_LIMIT`, `RESOURCE_EXHAUSTED_CAUSE_CONCURRENT_LIMIT`, `RESOURCE_EXHAUSTED_CAUSE_SYSTEM_OVERLOADED`, or `RESOURCE_EXHAUSTED_CAUSE_CIRCUIT_BREAKER_OPEN`.
Use this metric instead of `long_request_failure` to investigate throttling, because the fix depends on the cause.

### `nexus_poll_no_task`

A Nexus Worker's poll for a Nexus Task timed out because no Nexus Task was available on the Task Queue.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `nexus_task_schedule_to_start_latency`

The Schedule-To-Start time of a Nexus Task, from when the request reaches the Frontend Service to when the SDK starts processing the task.
The `Request-Timeout` header on the request to the Frontend Service limits this time.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `nexus_task_execution_failed`

Handling a Nexus Task resulted in an error.
This includes errors returned from your handler and unexpected internal errors in the SDK.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `nexus_service`, `nexus_operation`, `failure_reason`

Valid values for the `failure_reason` tag:

- `internal_sdk_error`: The SDK hit an unexpected internal error while handling the Nexus Task.
  This indicates a bug in the SDK.
- `handler_error_{TYPE}`: Your handler returned a [predefined handler error](https://github.com/nexus-rpc/api/blob/main/SPEC.md#predefined-handler-errors) from the Nexus specification.
  If the handler returns an unexpected error, `{TYPE}` is `INTERNAL`.
- `timeout`: Your handler didn't return within the request timeout.
- `operation_failed`: Your handler reported that the Nexus Operation failed.
  In Go, this is an `UnsuccessfulOperationError` with a `failed` state.
- `operation_canceled`: Your handler reported that the Nexus Operation completed as canceled.
  In Go, this is an `UnsuccessfulOperationError` with a `canceled` state.

### `nexus_task_execution_latency`

Time to complete a Nexus Task, from when the SDK starts processing it to when your handler completes.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `nexus_service`, `nexus_operation`

### `nexus_task_endtoend_latency`

Total time for a Nexus Task, from when the request reaches the Frontend Service to when the Temporal Service acknowledges the task's completion to the SDK.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `nexus_service`, `nexus_operation`

### `num_pollers`

The current number of Worker Entities that are polling.

- Type: Gauge
- Available in: Core, Go, Java
- Tags: `namespace`, `poller_type`, `task_queue`

### `poller_start`

A Worker Entity started a poller.

- Type: Counter
- Available in: Go, Java
- Tags: `namespace`, `task_queue`

### `request`

The Temporal Client made a gRPC request.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `operation`

### `request_failure`

A gRPC request from the Temporal Client failed.
The `request` counter also counts these requests.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `operation`, `status_code`

The `status_code` tag holds the gRPC status code the Temporal Service returned.
Values match the gRPC status code names in `UPPER_SNAKE_CASE`, such as `NOT_FOUND`, `RESOURCE_EXHAUSTED`, `UNIMPLEMENTED`, and `INTERNAL`.
Client options can suppress this tag, so confirm your metrics endpoint includes it before you write queries against it.

### `request_latency`

Latency of a Temporal Client gRPC request.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `operation`

### `request_resource_exhausted`

The Temporal Service rejected a gRPC request from the Temporal Client as resource exhausted.
The `request_failure` metric also counts these failures with `status_code=RESOURCE_EXHAUSTED`.
This metric adds the reason for the rejection in the `cause` tag.

- Type: Counter
- Available in: Go
- Tags: `namespace`, `operation`, `cause`

The `cause` tag holds the reason the Temporal Service rejected the request, such as `RESOURCE_EXHAUSTED_CAUSE_RPS_LIMIT`, `RESOURCE_EXHAUSTED_CAUSE_CONCURRENT_LIMIT`, `RESOURCE_EXHAUSTED_CAUSE_SYSTEM_OVERLOADED`, or `RESOURCE_EXHAUSTED_CAUSE_CIRCUIT_BREAKER_OPEN`.
Use this metric instead of `request_failure` to investigate throttling, because the fix depends on the cause.

### `resource_slots_cpu_usage`

CPU usage, from 0 to 100, as measured by the resource-based slot tuner.
The SDK emits this metric only when the resource-based slot tuner is enabled.

- Type: Gauge
- Available in: Core, Java

### `resource_slots_mem_usage`

Memory usage, from 0 to 100, as measured by the resource-based slot tuner.
The SDK emits this metric only when the resource-based slot tuner is enabled.

- Type: Gauge
- Available in: Core, Java

### `sticky_cache_hit`

A Workflow Task found a cached Workflow Execution to run against.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `sticky_cache_miss`

A Workflow Task didn't find a cached Workflow Execution to run against.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `sticky_cache_size`

The current number of Workflow Executions in the cache.

- Type: Gauge
- Available in: Core, Go, Java
- Tags: `namespace` (TypeScript, Java), `task_queue` (TypeScript)

### `sticky_cache_total_forced_eviction`

The Worker evicted a Workflow Execution from the cache on purpose.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `unregistered_activity_invocation`

The Worker received an Activity Task for an Activity type that isn't registered with it.

- Type: Counter
- Available in: Go
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `worker_start`

A Worker Entity was registered, created, or started.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `worker_type`

### `worker_task_slots_available`

The number of Workflow, Activity, Local Activity, or Nexus Task execution slots currently available.
Use the `worker_type` tag to tell the slot types apart.
For example, `WorkflowWorker` slots run Workflow Tasks and `ActivityWorker` slots run Activity Tasks.

- Type: Gauge
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `worker_type`

### `worker_task_slots_used`

The number of Workflow, Activity, Local Activity, or Nexus Task execution slots currently in use.
Use the `worker_type` tag to tell the slot types apart.
For example, `WorkflowWorker` slots run Workflow Tasks and `ActivityWorker` slots run Activity Tasks.

- Type: Gauge
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `worker_type`

### `workflow_active_thread_count`

The number of Workflow threads in the Worker Process.

- Type: Gauge
- Available in: Java

### `workflow_canceled`

A Workflow Execution ended because of a cancellation request.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_completed`

A Workflow Execution completed successfully.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_continue_as_new`

A Workflow Execution ended with Continue-As-New.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_endtoend_latency`

Total time for a single Workflow Run, from when it's scheduled to when it completes.
Each retry of a Workflow Execution is a separate Run.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_failed`

A Workflow Execution failed.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_execution_failed`

A Workflow Task Execution failed.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`, `failure_reason`

Valid values for the `failure_reason` tag:

- `NonDeterminismError`: The Workflow Task failed because of a non-determinism error.
- `GrpcMessageTooLarge`: The Workflow Task response exceeded the gRPC message size limit and couldn't be delivered.
  The Temporal Service terminates the Workflow Execution in response.
  See [Troubleshoot the BlobSizeLimitError](/troubleshooting/blob-size-limit-error).
- `PayloadsTooLarge`: A Payload or Memo in the Workflow Task response exceeded the Namespace size limit, so the Worker failed the Workflow Task as retryable before sending it.
  See [Troubleshoot the BlobSizeLimitError](/troubleshooting/blob-size-limit-error#payload-size-limit).
- `RequestTooLarge`: The whole Workflow Task completion exceeded the Namespace limit on the size of a single request.
  The Worker failed the Workflow Task instead of sending a request the Temporal Service would reject, and the Temporal Service retries the Workflow Task.
  See [Request too large](/troubleshooting/execution-failures#request-too-large).
- `WorkflowError`: The Workflow Task failed for any other reason.

### `workflow_task_execution_latency`

Time to run a Workflow Task Execution.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_queue_poll_empty`

A Workflow Worker polled a Task Queue and timed out without picking up a Workflow Task.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `workflow_task_queue_poll_succeed`

A Workflow Worker polled a Task Queue and successfully picked up a Workflow Task.

- Type: Counter
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`

### `workflow_task_replay_latency`

Time the Worker spends replaying Event History to catch up before running a Workflow Task.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_schedule_to_start_latency`

The Schedule-To-Start time of a Workflow Task.

- Type: Histogram
- Available in: Core, Go, Java
- Tags: `namespace`, `task_queue`
