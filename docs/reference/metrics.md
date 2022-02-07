---
id: sdk-metrics
title: Worker & SDK Metrics
description: Temporal SDK Clients and Workers both emit metrics, this page describes them
sidebar_label: Worker & SDK Metrics
---

# Worker/SDK Metrics

The Temporal SDKs emit a largely common set of metrics. Note that all the below metrics are prefixed
with `temporal_` before being exported to their configured destination(s). The `Core` SDK type
includes all SDKs based on it, which as of now is only the Typescript SDK.

### Keys

The metrics always have some keys/labels attached to them. Their definitions:

- `task-queue` - Task queue the worker polls on
- `namespace` - Namespace the worker is bound to
- `poller_type` - One of `workflow_task`, `activity_task`, or `sticky_workflow_task`
- `worker_type` - One of `ActivityWorker`, `WorkflowWorker`, or `LocalActivityWorker` (Go and Java only)
- `activity_type` - The function name / class name / etc of the activity the metric is associated with
- `workflow_type` - The function name / class name / etc of the workflow the metric is associated with
- `operation` - Only for client gRPC requests, is the name of the RPC method

### Metrics definitions

Note that `Core` includes the Typescript SDK.

| Name                                      | Desc                                                                                                                                                            | Metric Type | Exists In SDK                               | Keys                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------- | --------------------------------------------------- |
| activity_execution_cancelled              | An activity execution was cancelled                                                                                                                             | Counter     | Java                                        | activity_type, namespace, task_queue                |
| activity_execution_failed                 | An activity execution failed                                                                                                                                    | Counter     | Core, Go, Java                              | activity_type, namespace, task_queue                |
| activity_execution_latency                | Time it took to complete activity execution, from the time core generated the activity task, to the time lang responded with a completion (failure or success). | Histogram   | Core, Go, Java                              | activity_type, namespace, task_queue                |
| activity_poll_no_task                     | An activity long poll timed out                                                                                                                                 | Counter     | Core, Go, Java                              | activity_type, namespace, task_queue                |
| activity_schedule_to_start_latency        | Activity task schedule to start time in millis                                                                                                                  | Histogram   | Core, Go, Java                              | activity_type, namespace, task_queue                |
| activity_task_error                       | An internal error / panic occurred during activity task handling/execution                                                                                      | Counter     | Go                                          | activity_type, namespace, task_queue, workflow_type |
| corrupted_signals                         | Number of signals whose payload could not be deserialized                                                                                                       | Counter     | Go, Java                                    | namespace, task_queue, workflow_type                |
| local_activity_execution_cancelled        | A local activity execution was cancelled                                                                                                                        | Counter     | Go, Java                                    | activity_type, namespace, task_queue                |
| local_activity_execution_failed           | A local activity execution failed                                                                                                                               | Counter     | Go, Java                                    | activity_type, namespace, task_queue                |
| local_activity_execution_latency          | Time it took to complete activity execution, from the time core generated the activity task, to the time lang responded with a completion (failure or success). | Histogram   | Go, Java                                    | activity_type, namespace, task_queue                |
| local_activity_succeeded_endtoend_latency | Total latency of successfully finished local activities from schedule to completion                                                                             | Histogram   | Go, Java                                    | activity_type, namespace, task_queue                |
| local_activity_total                      | Total local activity executions                                                                                                                                 | Counter     | Go, Java                                    | activity_type, namespace, task_queue                |
| long_request                              | Client failed an RPC long poll request                                                                                                                          | Counter     | Core-Client, Go-Client, Java-Service-Client | namespace, operation                                |
| long_request_failure                      | Client made an RPC long poll request                                                                                                                            | Counter     | Core-Client, Go-Client, Java-Service-Client | namespace, operation                                |
| long_request_latency                      | gRPC long poll request latency                                                                                                                                  | Histogram   | Core-Client, Go-Client, Java-Service-Client | namespace, operation                                |
| num_pollers                               | Current number of pollers                                                                                                                                       | Gauge       | Core                                        | namespace, poller_type, task_queue                  |
| poller_start                              | A poller was started                                                                                                                                            | Counter     | Go, Java                                    | namespace, task_queue                               |
| request                                   | Client made an RPC request                                                                                                                                      | Counter     | Core-Client, Go-Client, Java-Service-Client | namespace, operation                                |
| request_failure                           | Client failed an RPC request                                                                                                                                    | Counter     | Core-Client, Go-Client, Java-Service-Client | namespace, operation                                |
| request_latency                           | gRPC request latency                                                                                                                                            | Histogram   | Core-Client, Go-Client, Java-Service-Client | namespace, operation                                |
| sticky_cache_hit                          | A workflow task found a cached workflow to run against                                                                                                          | Counter     | Core, Go, Java                              | namespace, task_queue                               |
| sticky_cache_miss                         | A workflow task did not find a cached workflow                                                                                                                  | Counter     | Core, Go, Java                              | namespace, task_queue                               |
| sticky_cache_size                         | Current cache size in number of workflows                                                                                                                       | Gauge       | Core, Go, Java                              | _Core Only: namespace, task_queue_                  |
| sticky_cache_total_forced_eviction        | Count of workflows forced from the cache intentionally                                                                                                          | Counter     | Go, Java                                    | namespace, task_queue                               |
| unregistered_activity_invocation          | Count of number of times a request to invoke an activity that is not registered with the worker                                                                 | Counter     | Go                                          | activity_type, namespace, task_queue, workflow_type |
| worker_start                              | A worker was registered/created/started                                                                                                                         | Counter     | Core, Go, Java                              | namespace, task_queue, worker_type                  |
| worker_task_slots_available               | How many free slots for execution remain, type determined by the `worker_type` label                                                                            | Gauge       | Go, Java                                    | namespace, task_queue, worker_type                  |
| workflow_active_thread_count              | Total amount of workflow threads in the worker process                                                                                                          | Gauge       | Java                                        |                                                     |
| workflow_cancelled                        | A workflow ended cancelled                                                                                                                                      | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_completed                        | A workflow completed successfully                                                                                                                               | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_continue_as_new                  | A workflow ended continued-as-new                                                                                                                               | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_endtoend_latency                 | Workflow total execution time in milliseconds                                                                                                                   | Histogram   | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_failed                           | A workflow ended failed                                                                                                                                         | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_task_execution_failed            | A workflow task execution failed                                                                                                                                | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_task_execution_latency           | Workflow task execution time in milliseconds                                                                                                                    | Histogram   | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_task_queue_poll_empty            | A workflow task queue poll timed out / had empty response                                                                                                       | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_task_queue_poll_succeed          | A workflow task queue poll succeeded returning a new WFT                                                                                                        | Counter     | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_task_replay_latency              | Time it takes to catch up on replaying a WFT in ms                                                                                                              | Histogram   | Core, Go, Java                              | namespace, task_queue, workflow_type                |
| workflow_task_schedule_to_start_latency   | Workflow task schedule-to-start time in milliseconds                                                                                                            | Histogram   | Core, Go, Java                              | namespace, task_queue, workflow_type                |

#### Code definitions

If you're curious about how the metrics are defined in source, see:

- Core - [Worker metrics](https://github.com/temporalio/sdk-core/blob/master/core/src/telemetry/metrics.rs) and [Service Client metrics](https://github.com/temporalio/sdk-core/blob/master/client/src/metrics.rs)
- Java - [Worker metrics](https://github.com/temporalio/sdk-java/blob/master/temporal-sdk/src/main/java/io/temporal/worker/MetricsType.java) and [Service Client metrics](https://github.com/temporalio/sdk-java/blob/master/temporal-serviceclient/src/main/java/io/temporal/serviceclient/MetricsType.java)
- Go - [Worker & Service Client metrics](https://github.com/temporalio/sdk-go/blob/c32b04729cc7691f80c16f80eed7f323ee5ce24f/internal/common/metrics/constants.go)

### Notes on differences between SDKs

- Histograms may have different buckets in different languages.
- Some labels may not apply in every SDK
