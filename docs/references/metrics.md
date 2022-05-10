---
id: sdk-metrics
title: SDK metrics
description: The Temporal SDKs emit metrics from Temporal Client usage and Worker Processes.
sidebar_label: SDK metrics reference
---

The Temporal SDKs emit a set of metrics from Temporal Client usage and Worker Processes.
All metrics are prefixed with `temporal_` before being exported to their configured destination.
(The prefix has been removed in the following reference.)
Currently some metrics are specific to certain SDKs.

Metrics are defined in the following locations (The Typescript SDK metrics are defined in the Core SDK and PHP SDK metric are defined in the Go SDK):

- [Core SDK Worker metrics](https://github.com/temporalio/sdk-core/blob/master/core/src/telemetry/metrics.rs)
- [Core SDK Client metrics](https://github.com/temporalio/sdk-core/blob/master/client/src/metrics.rs)
- [Java SDK Worker metrics](https://github.com/temporalio/sdk-java/blob/master/temporal-sdk/src/main/java/io/temporal/worker/MetricsType.java)
- [Java SDK Client metrics](https://github.com/temporalio/sdk-java/blob/master/temporal-serviceclient/src/main/java/io/temporal/serviceclient/MetricsType.java)
- [Go SDK Worker and Client metrics](https://github.com/temporalio/sdk-go/blob/c32b04729cc7691f80c16f80eed7f323ee5ce24f/internal/common/metrics/constants.go)

Each metric may have some combination of the following keys attached to them:

- `task-queue`: Task Queue that the Worker Entity is polling
- `namespace`: Namespace the Worker is bound to
- `poller_type`: One of the following:
  - `workflow_task`
  - `activity_task`
  - `sticky_workflow_task`
- `worker_type`: One of the following:
  - `ActivityWorker`
  - `WorkflowWorker`
  - `LocalActivityWorker` (Go and Java only)
- `activity_type`: The name of the Activity Function the metric is associated with
- `workflow_type`: The name of the Workflow Function the metric is associated with
- `operation`: RPC method name; available for metrics related to Temporal Client gRPC requests

Some keys may not be available in every SDK, and Histogram metrics may have different buckets in each SDK.

| Metric name                                                                             | Emitted by     | Metric type | Availability              |
| --------------------------------------------------------------------------------------- | -------------- | ----------- | ------------------------- |
| [activity_execution_cancelled](#activity_execution_cancelled)                           | Worker         | Counter     | Java                      |
| [activity_execution_failed](#activity_execution_failed)                                 | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [activity_execution_latency](#activity_execution_latency)                               | Worker         | Histogram   | TypeScript, Go, PHP, Java |
| [activity_poll_no_task](#activity_poll_no_task)                                         | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [activity_schedule_to_start_latency](#activity_schedule_to_start_latency)               | Worker         | Histogram   | TypeScript, Go, PHP, Java |
| [activity_task_error](#activity_task_error)                                             | Worker         | Counter     | Go, PHP                   |
| [corrupted_signals](#corrupted_signals)                                                 | Worker         | Counter     | Go, PHP, Java             |
| [local_activity_execution_cancelled](#local_activity_execution_cancelled)               | Worker         | Counter     | Go, PHP, Java             |
| [local_activity_execution_failed](#local_activity_execution_failed)                     | Worker         | Counter     | Go, PHP, Java             |
| [local_activity_execution_latency](#local_activity_execution_latency)                   | Worker         | Histogram   | Go, PHP, Java             |
| [local_activity_succeeded_endtoend_latency](#local_activity_succeeded_endtoend_latency) | Worker         | Histogram   | Go, PHP, Java             |
| [local_activity_total](#local_activity_total)                                           | Worker         | Counter     | Go, PHP, Java             |
| [long_request](#long_request)                                                           | Service Client | Counter     | TypeScript, Go, PHP, Java |
| [long_request_failure](#long_request_failure)                                           | Service Client | Counter     | TypeScript, Go, PHP, Java |
| [long_request_latency](#long_request_latency)                                           | Service Client | Histogram   | TypeScript, Go, PHP, Java |
| [num_pollers](#num_pollers)                                                             | Worker         | Gauge       | TypeScript                |
| [poller_start](#poller_start)                                                           | Worker         | Counter     | Go, PHP, Java             |
| [request](#request)                                                                     | Service Client | Counter     | TypeScript, Go, PHP, Java |
| [request_failure](#request_failure)                                                     | Service Client | Counter     | TypeScript, Go, PHP, Java |
| [request_latency](#request_latency)                                                     | Service Client | Histogram   | TypeScript, Go, PHP, Java |
| [sticky_cache_hit](#sticky_cache_hit)                                                   | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [sticky_cache_miss](#sticky_cache_miss)                                                 | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [sticky_cache_size](#sticky_cache_size)                                                 | Worker         | Gauge       | TypeScript, Go, PHP, Java |
| [sticky_cache_total_forced_eviction](#sticky_cache_total_forced_eviction)               | Worker         | Counter     | Go, PHP, Java             |
| [unregistered_activity_invocation](#unregistered_activity_invocation)                   | Worker         | Counter     | Go, PHP                   |
| [worker_start](#worker_start)                                                           | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [worker_task_slots_available](#worker_task_slots_available)                             | Worker         | Gauge       | Go, PHP, Java             |
| [workflow_active_thread_count](#workflow_active_thread_count)                           | Worker         | Gauge       | Java                      |
| [workflow_cancelled](#workflow_cancelled)                                               | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_completed](#workflow_completed)                                               | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_continue_as_new](#workflow_continue_as_new)                                   | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_endtoend_latency](#workflow_endtoend_latency)                                 | Worker         | Histogram   | TypeScript, Go, PHP, Java |
| [workflow_failed](#workflow_failed)                                                     | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_task_execution_failed](#workflow_task_execution_failed)                       | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_task_execution_latency](#workflow_task_execution_latency)                     | Worker         | Histogram   | TypeScript, Go, PHP, Java |
| [workflow_task_queue_poll_empty](#workflow_task_queue_poll_empty)                       | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_task_queue_poll_succeed](#workflow_task_queue_poll_succeed)                   | Worker         | Counter     | TypeScript, Go, PHP, Java |
| [workflow_task_replay_latency](#workflow_task_replay_latency)                           | Worker         | Histogram   | TypeScript, Go, PHP, Java |
| [workflow_task_schedule_to_start_latency](#workflow_task_schedule_to_start_latency)     | Worker         | Histogram   | TypeScript, Go, PHP, Java |

### `activity_execution_cancelled`

An Activity Execution was canceled.

- Type: Counter
- Available in: Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `activity_execution_failed`

An Activity Execution failed.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `activity_execution_latency`

Time to complete an Activity Execution, from the time the Activity Task is generated to the time the language SDK responded with a completion (failure or success).

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `activity_poll_no_task`

An Activity Worker poll for an Activity Task timed out, and no Activity Task is available to pick from the Task Queue.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `activity_schedule_to_start_latency`

The Schedule-To-Start time of an Activity Task in milliseconds.
A [Schedule-To-Start Timeout](/concepts/what-is-a-schedule-to-start-timeout) can be set when an Activity Execution is spawned.

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `activity_task_error`

An internal error or kernel panic occurred during Activity Task handling or execution.

- Type: Counter
- Available in: Go, PHP
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `corrupted_signals`

Number of Signals whose payload could not be deserialized.

- Type: Counter
- Available in: Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `local_activity_execution_cancelled`

A Local Activity Execution was canceled.

- Type: Counter
- Available in: Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `local_activity_execution_failed`

A Local Activity Execution failed.

- Type: Counter
- Available in: Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `local_activity_execution_latency`

Time to complete a Local Activity Execution, from the time the first Activity Task is generated to the time the SDK responds that the execution is complete.

- Type: Histogram
- Available in: Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `local_activity_succeeded_endtoend_latency`

Total latency of successfully finished Local Activity Executions (from schedule to completion).

- Type: Histogram
- Available in: Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `local_activity_total`

Total number of [Local Activity Executions](/concepts/what-is-a-local-activity).

- Type: Counter
- Available in: Go, PHP, Java
- Tags: `activity_type`, `namespace`, `task_queue`

### `long_request`

Temporal Client made an RPC long poll request.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `operation`

### `long_request_failure`

Temporal Client made an RPC long poll request that failed.
This number is included into the total `long_request` counter for long poll RPC requests.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `operation`

### `long_request_latency`

Latency of a Temporal Client gRPC long poll request.

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `operation`

### `num_pollers`

Current number of Worker Entities that are polling.

- Type: Gauge
- Available in: TypeScript
- Tags: `namespace`, `poller_type`, `task_queue`

### `poller_start`

A Worker Entity poller was started.

- Type: Counter
- Available in: Go, PHP, Java
- Tags: `namespace`, `task_queue`

### `request`

Temporal Client made an RPC request.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `operation`

### `request_failure`

Temporal Client made an RPC request that failed.
This number is included into the total `request` counter for RPC requests.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `operation`

### `request_latency`

Latency of a Temporal Client gRPC request.

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `operation`

### `sticky_cache_hit`

A Workflow Task found a cached Workflow Execution Event History to run against.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`

### `sticky_cache_miss`

A Workflow Task did not find a cached Workflow Worker.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`

### `sticky_cache_size`

Current cache size, expressed in number of Workflow Executions.

- Type: Gauge
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace` (TypeScript, Java), `task_queue` (TypeScript)

### `sticky_cache_total_forced_eviction`

A Workflow Execution has been forced from the cache intentionally.

- Type: Counter
- Available in: Go, PHP, Java
- Tags: `namespace`, `task_queue`

### `unregistered_activity_invocation`

A request to spawn an Activity Execution is not registered with the Worker.

- Type: Counter
- Available in: Go, PHP
- Tags: `activity_type`, `namespace`, `task_queue`, `workflow_type`

### `worker_start`

A Worker Entity has been registered, created, or started.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `worker_type`

### `worker_task_slots_available`

The total number of Workflow Task and Activity Task execution slots that are currently available.
Use the `worker_type` key to differentiate execution slots.
(Workflow Workers execute Workflow Tasks; Activity Workers execute Activity Tasks.)

- Type: Gauge
- Available in: Go, PHP, Java
- Tags: `namespace`, `task_queue`, `worker_type`

### `workflow_active_thread_count`

Total amount of Workflow threads in the Worker Process.

- Type: Gauge
- Available in: Java

### `workflow_cancelled`

Workflow Execution ended because of a cancellation request.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_completed`

A Workflow Execution completed successfully.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_continue_as_new`

A Workflow ended with Continue-As-New.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_endtoend_latency`

Total Workflow Execution time from schedule to completion for a single Workflow Run. (A retried Workflow Execution is a separate Run.)

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_failed`

A Workflow Execution failed.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_execution_failed`

A Workflow Task Execution failed.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_execution_latency`

Workflow Task Execution time.

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_queue_poll_empty`

A Workflow Worker polled a Task Queue and timed out without picking up a Workflow Task.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_queue_poll_succeed`

A Workflow Worker polled a Task Queue and successfully picked up a Workflow Task.

- Type: Counter
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_replay_latency`

Time to catch up on replaying a Workflow Task.

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`

### `workflow_task_schedule_to_start_latency`

The Schedule-To-Start time of a Workflow Task.

- Type: Histogram
- Available in: TypeScript, Go, PHP, Java
- Tags: `namespace`, `task_queue`, `workflow_type`
