---
id: sdk-metrics
title: SDK metrics
description: Temporal SDK Clients and Workers both emit metrics, this page describes them
sidebar_label: SDK metrics
---

The Temporal SDKs emit a set of metrics from Temporal Client usage and Worker Processes.
All metrics are prefixed with `temporal_` before being exported to their configured destination (The prefix has been removed in following reference).
Currently some metrics are specific to certain SDKs.

**The Typescript SDK is built using the Core SDK and therefore emits all of the same metrics associated with the Core SDK.**

**The PHP SDK is built using the Go SDK and therefore emits all of the same metrics associated with the Go SDK.**

Metrics are defined in the following locations:

- [Core SDK Worker metrics](https://github.com/temporalio/sdk-core/blob/master/core/src/telemetry/metrics.rs)
- [Core SDK Client metrics](https://github.com/temporalio/sdk-core/blob/master/client/src/metrics.rs)
- [Java SDK Worker metrics](https://github.com/temporalio/sdk-java/blob/master/temporal-sdk/src/main/java/io/temporal/worker/MetricsType.java)
- [Java SDK Client metrics](https://github.com/temporalio/sdk-java/blob/master/temporal-serviceclient/src/main/java/io/temporal/serviceclient/MetricsType.java)
- [Go SDK Worker and Client metrics](https://github.com/temporalio/sdk-go/blob/c32b04729cc7691f80c16f80eed7f323ee5ce24f/internal/common/metrics/constants.go)

Each metric may have some combination of the following keys attached to them:

- `task-queue`: Task Queue that the Worker Entity is polling on
- `namespace`: Namespace the Worker is bound to
- `poller_type`: One of following:
  - `workflow_task`
  - `activity_task`
  - `sticky_workflow_task`
- `worker_type`: One of the following:
  - `ActivityWorker`
  - `WorkflowWorker`
  - `LocalActivityWorker`: (Limited to Go and Java only)
- `activity_type`: The name of the Activity Function the metric is associated with.
- `workflow_type`: The name of the Workflow Function the metric is associated with
- `operation`: RPC method name, available for metrics related to Temporal Client gRPC requests.

Some keys may not be available in every SDK, and Histogram metrics may have different buckets in each SDK.

| Metric Name | Metric Type | Availability |
| ---- | ------------| -------------|
| [activity_execution_cancelled](#activity_execution_cancelled) | Counter | Java |
| [activity_execution_failed](#activity_execution_failed) | Counter | Core, Go, Java |
| [activity_execution_latency](#activity_execution_latency) | Histogram   | Core, Go, Java |
| [activity_poll_no_task](#activity_poll_no_task) | Counter | Core, Go, Java | activity_type, namespace, task_queue |
| [activity_schedule_to_start_latency](#activity_schedule_to_start_latency) | Histogram   | Core, Go, Java |
| [activity_task_error](#activity_task_error) | Counter | Go |
| [corrupted_signals](#corrupted_signals) | Counter | Go, Java |
| [local_activity_execution_cancelled](#local_activity_execution_cancelled) | Counter | Go, Java |
| [local_activity_execution_failed](#local_activity_execution_failed) | Counter | Go, Java |
| [local_activity_execution_latency](#local_activity_execution_latency) | Histogram | Go, Java |
| [local_activity_succeeded_endtoend_latency](#local_activity_succeeded_endtoend_latency) | Histogram | Go, Java |
| [local_activity_total](#local_activity_total) | Counter | Go, Java |
| [long_request](#long_request) | Counter | Core, Go, Java |
| [long_request_failure](#long_request_failure) | Counter | Core, Go, Java |
| [long_request_latency](#long_request_latency) | Histogram | Core, Go, Java |
| [num_pollers](#num_pollers) | Gauge | Core |
| [poller_start](#poller_start) | Counter | Go, Java |
| [request](#request) | Counter | Core, Go, Java |
| [request_failure](#request_failure) | Counter | Core, Go, Java |
| [request_latency](#request_latency) | Histogram | Core, Go, Java |
| [sticky_cache_hit](#sticky_cache_hit) | Counter | Core, Go, Java |
| [sticky_cache_miss](#sticky_cache_miss) | Counter | Core, Go, Java |
| [sticky_cache_size](#sticky_cache_size) | Gauge | Core, Go, Java |
| [sticky_cache_total_forced_eviction](#sticky_cache_total_forced_eviction) | Counter | Go, Java |
| [unregistered_activity_invocation](#unregistered_activity_invocation) | Counter | Go |
| [worker_start](#worker_start) | Counter | Core, Go, Java |
| [worker_task_slots_available](#worker_task_slots_available) | Gauge | Go, Java |
| [workflow_active_thread_count](#workflow_active_thread_count) | Gauge | Java |
| [workflow_cancelled](#workflow_cancelled) | Counter | Core, Go, Java |
| [workflow_completed](#workflow_completed) | Counter | Core, Go, Java |
| [workflow_continue_as_new](#workflow_continue_as_new) | Counter | Core, Go, Java |
| [workflow_endtoend_latency](#workflow_endtoend_latency) | Histogram | Core, Go, Java |
| [workflow_failed](#workflow_failed) | Counter | Core, Go, Java |
| [workflow_task_execution_failed](#workflow_task_execution_failed) | Counter | Core, Go, Java |
| [workflow_task_execution_latency](#workflow_task_execution_latency) | Histogram | Core, Go, Java |
| [workflow_task_queue_poll_empty](#workflow_task_queue_poll_empty) | Counter | Core, Go, Java |
| [workflow_task_queue_poll_succeed](#workflow_task_queue_poll_succeed) | Counter | Core, Go, Java |
| [workflow_task_replay_latency](#workflow_task_replay_latency) | Histogram | Core, Go, Java |
| [workflow_task_schedule_to_start_latency](#workflow_task_schedule_to_start_latency) | Histogram | Core, Go, Java |


#### `activity_execution_cancelled`

An Activity Execution was cancelled.

- Type: Counter
- Available in: Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `activity_execution_failed`

An Activity Execution failed.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `activity_execution_latency`

Time it took to complete an Activity Execution, from the time core generated the activity task, to the time lang responded with a completion (failure or success).

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `activity_poll_no_task`

An Activity Worker poll for an Activity Task timed out; There is no Activity Task to pick from the Task Queue.                                                 

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `activity_schedule_to_start_latency`

The Schedule-To-Start time of an Activity Task in milliseconds.
A [Schedule-To-Start Timeout](/docs/concepts/what-is-a-schedule-to-start-timeout) can be set when an Activity Execution is spawned.

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `activity_task_error`

An internal error / panic occurred during Activity Task handling/execution

- Type: Counter
- Available in: Go
- Available keys: `activity_type`, `namespace`, `task_queue`, `workflow_type`

#### `corrupted_signals`

Number of Signals whose payload could not be deserialized.

- Type: Counter
- Available in: Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `local_activity_execution_cancelled`

A local activity execution was cancelled

- Type: Counter
- Available in: Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `local_activity_execution_failed`

A local activity execution failed

- Type: Counter
- Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `local_activity_execution_latency`

The time it is taking for Local Activity Executions to complete, from the time the first Activity Task is generated, to the time the SDK responds that the execution is complete.

- Type: Histogram
- Available in: Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `local_activity_succeeded_endtoend_latency`

Total latency of successfully finished Local Activity Executions (from schedule to completion).

- Type: Histogram
- Available in: Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `local_activity_total`

Total number of [Local Activity Executions](/docs/concepts/what-is-a-local-activity).

- Type: Counter
- Available in: Go, Java
- Available keys: `activity_type`, `namespace`, `task_queue`

#### `long_request`

Temporal Client failed an RPC long poll request.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `operation`

#### `long_request_failure`

Temporal Client made an RPC long poll request.

- Type: Counter
- Core-Client, Go, Java
- Available keys: `namespace`, `operation`

#### `long_request_latency`

Temporal Client gRPC long poll request latency.

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `namespace`, `operation`

#### `num_pollers`

Current number of Worker Entities that are polling.

- Type: Gauge
- Available in: Core
- Available keys: `namespace`, `poller_type`, `task_queue`

#### `poller_start`

A Worker Entity poller was started.

- Type: Counter
- Available in: Go, Java
- Available keys: `namespace`, `task_queue`

#### `request`

Temporal Client made an RPC request.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `operation`

#### `request_failure`

Temporal Client failed an RPC request.

- Type: Counter
- Available in: Core, Go, Java
- `namespace`, `operation`

#### `request_latency`

Temporal Client gRPC request latency.

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `namespace`, `operation`

#### `sticky_cache_hit`

A Workflow Task found a cached Workflow Execution Event History to run against.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`

#### `sticky_cache_miss`

A Workflow Task did not find a cached Workflow Worker.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`

#### `sticky_cache_size`

Current cache size in number of Workflow Executions.

- Type: Gauge
- Available in: Core, Go, Java
- Available keys: `namespace`(Core Only), `task_queue`

#### `sticky_cache_total_forced_eviction`

A Workflow Execution has been forced from the cache intentionally.

- Type: Counter
- Available in: Go, Java
- Available keys: `namespace`, `task_queue`

#### `unregistered_activity_invocation`

There was a request to spawn an Activity Execution that is not registered with the Worker.

- Type: Counter
- Available in: Go
- Available keys: `activity_type`, `namespace`, `task_queue`, `workflow_type`

#### `worker_start`

A Worker Entity has been registered/created/started.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `worker_type`

#### `worker_task_slots_available`

The total number of Workflow Task and Activity Task execution slots that are currently available.
The `worker_type` key provides the ability to differentiate respectively (Workflow Workers execute Workflow Tasks, Activity Workers execute Activity Tasks).

- Type: Gauge
- Available in: Go, Java
- Available keys: `namespace`, `task_queue`, `worker_type`

#### `workflow_active_thread_count`

Total amount of Workflow threads in the Worker Process

- Type: Gauge
- Available in: Java

#### `workflow_cancelled`

Workflow Execution ended because of a cancellation request.

- Type: Counter
- Available in: Core, Go, Java
- `namespace`, `task_queue`, `workflow_type`

#### `workflow_completed`

 A Workflow Execution completed successfully.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `workflow_continue_as_new`

A workflow ended continued-as-new

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `workflow_endtoend_latency`

Workflow total execution time in milliseconds

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `workflow_failed`

A workflow ended failed

- Type: Counter
- Available in: Core, Go, Java
- `namespace`, `task_queue`, `workflow_type`

#### `workflow_task_execution_failed`

A workflow task execution failed

- Type: Counter
- Available in: Core, Go, Java
- `namespace`, `task_queue`, `workflow_type`

#### `workflow_task_execution_latency`

Workflow task execution time in milliseconds

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `workflow_task_queue_poll_empty`

A Workflow Worker polled a Task queue and timed out without picking up a Workflow Task.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `workflow_task_queue_poll_succeed`

A Workflow Worker polled a Task Queue and successfully picked up a Workflow Task.

- Type: Counter
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`

#### `workflow_task_replay_latency`

Time it takes to catch up on replaying a Workflow Task in milliseconds.

- Type: Histogram
- Available in: Core, Go, Java
- `namespace`, `task_queue`, `workflow_type`

#### `workflow_task_schedule_to_start_latency`

The Schedule-To-Start time of a Workflow Task in milliseconds.

- Type: Histogram
- Available in: Core, Go, Java
- Available keys: `namespace`, `task_queue`, `workflow_type`
