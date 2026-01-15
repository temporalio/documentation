---
id: reference
title: Temporal Cloud metrics reference
sidebar_label: Available metrics
description: Explore Temporal Cloud metrics to query with PromQL or scrape via OpenMetrics, supporting rate and latency calculations.
toc_max_heading_level: 4
tags:
  - Metrics
  - Observability
  - Temporal Cloud
keywords:
  - temporal cloud metrics
  - promql temporal metrics
  - prometheus temporal monitoring
  - temporal cloud observability
  - workflow latency metrics
  - workflow state transition metrics
  - analyze temporal cloud metrics
  - metric labels for temporal
  - workflow execution metrics
  - temporal cloud latency analysis
  - temporal cloud promql
  - histogram metrics analysis
  - metric filtering with labels
  - workflow success metrics
  - gRPC error count
---

A metric is a measurement or data point that provides insights into the performance and health of a system.
This document describes the metrics available on the Temporal Cloud platform.
Temporal Cloud metrics help you monitor performance and troubleshoot errors.
They provide insights into different aspects of the Service.

This document describes:

- **[Available Temporal Cloud metrics](#available-metrics)**:
  The metrics emitted by Temporal Cloud include counts of gRPC errors, requests, successful task matches to a poller, and more.
- **[Metrics labels](#metrics-labels)**:
  Temporal Cloud metrics labels can filter metrics and help categorize and differentiate results.
- **[Operations](#metrics-operations)**:
  An operation is a special type of label that categorizes the type of operation being performed when the metric was collected.

:::info SDK METRICS

This document discusses metrics emitted by [Temporal Cloud](/cloud).
Temporal SDKs also emit metrics, sourced from Temporal Clients and Worker processes.
You can find information about Temporal SDK metrics on its [dedicated page](/references/sdk-metrics).

Please note:

- SDK metrics start with the phrase `temporal_`.
- Temporal Cloud metrics start with `temporal_cloud_`.

:::

## Available Temporal Cloud metrics {#available-metrics}

**What metrics are emitted from Temporal Cloud?**

The following metrics are emitted for your Namespaces:

### Frontend Service metrics {#frontend}

#### temporal_cloud_v0_frontend_service_error_count

This is a count of gRPC errors returned aggregated by operation.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_frontend_service_request_count

This is a count of gRPC requests received aggregated by operation.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_resource_exhausted_error_count

gRPC requests received that were rate-limited by Temporal Cloud, aggregated by cause.
Labels: temporal_account, temporal_namespace, resource_exhausted_cause

#### temporal_cloud_v0_state_transition_count

Count of state transitions for each Namespace.

#### temporal_cloud_v0_total_action_count

Approximate count of Temporal Cloud Actions.
Labels: temporal_account, temporal_namespace, is_background, namespace_mode

### Poll metrics {#poll}

#### temporal_cloud_v0_poll_success_count

Tasks that are successfully matched to a poller.
Labels: temporal_account, temporal_namespace, operation, task_type, temporal_service_type

#### temporal_cloud_v0_poll_success_sync_count

Tasks that are successfully sync matched to a poller.
Labels: temporal_account, temporal_namespace, operation, task_type, temporal_service_type

#### temporal_cloud_v0_poll_timeout_count

When no tasks are available for a poller before timing out.
Labels: temporal_account, temporal_namespace, operation, task_type, temporal_service_type

### Replication lag metrics {#replication-lag}

#### temporal_cloud_v0_replication_lag_bucket

A histogram of [replication lag](/cloud/high-availability/monitoring#replication-lag-metric) during a specific time interval for a Namespace with high availability.
Labels: temporal_account, temporal_namespace, le

#### temporal_cloud_v0_replication_lag_count

The [replication lag](/cloud/high-availability/monitoring#replication-lag-metric) count during a specific time interval for a Namespace with high availability.
Labels: temporal_account, temporal_namespace

#### temporal_cloud_v0_replication_lag_sum

The sum of [replication lag](/cloud/high-availability/monitoring#replication-lag-metric) during a specific time interval for a Namespace with high availability.
Labels: temporal_account, temporal_namespace

### Schedule metrics {#schedule}

#### temporal_cloud_v0_schedule_action_success_count

Successful execution of a Scheduled Workflow.
Labels: temporal_account, temporal_namespace

#### temporal_cloud_v0_schedule_buffer_overruns_count

When average schedule run length is greater than average schedule interval while a `buffer_all` overlap policy is configured.
Labels: temporal_account, temporal_namespace

#### temporal_cloud_v0_schedule_missed_catchup_window_count

Skipped Scheduled executions when Workflows were delayed longer than the catchup window.
Labels: temporal_account, temporal_namespace

#### temporal_cloud_v0_schedule_rate_limited_count

Workflows that were delayed due to exceeding a rate limit.
Labels: temporal_account, temporal_namespace

### Service latency metrics {#service-latency}

#### temporal_cloud_v0_service_latency_bucket

Latency for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.
Labels: temporal_account, temporal_namespace, le, operation, temporal_service_type

#### temporal_cloud_v0_service_latency_count

Count of latency observations for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_service_latency_sum

Sum of latency observation time for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

### Workflow metrics {#workflow}

#### temporal_cloud_v0_workflow_cancel_count

Workflows canceled before completing execution.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_workflow_continued_as_new_count

Workflow Executions that were Continued-As-New from a past execution.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_workflow_failed_count

Workflows that failed before completion.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_workflow_success_count

Workflows that successfully completed.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_workflow_terminate_count

Workflows terminated before completing execution.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

#### temporal_cloud_v0_workflow_timeout_count

Workflows that timed out before completing execution.
Labels: temporal_account, temporal_namespace, operation, temporal_service_type

## Metrics labels {#metrics-labels}

**What labels can you use to filter metrics?**

Temporal Cloud metrics include key-value pairs called labels in their associated metadata.
Labels help you categorize and differentiate metrics for precise filtering, querying, and aggregation.
Use labels to specific attributes or compare values, such as numeric buckets in histograms.
This added context enhances the monitoring and analysis capabilities, providing deeper insights into your data.

Use the following labels to filter metrics:

| Label                      | Explanation                                                                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `le`                       | Less than or equal to (`le`) is used in histograms to categorize observations into buckets based on their value being less than or equal to a predefined upper limit.                                                                                                                      |
| `operation`                | This includes gRPC operations and general Cloud operations such as:<ul><li>SignalWorkflowExecution</li><li>StartBatchOperation</li><li>StartWorkflowExecution</li><li>TaskQueueMgr</li><li>TerminateWorkflowExecution</li><li>UpdateNamespace</li><li>UpdateSchedule</li></ul> See: [Metric Operations](#metrics-operations) and [Temporal Cloud Operation reference](/references/operation-list)|
| `resource_exhausted_cause` | Cause for resource exhaustion.                                                                                                                                                                                                                                                             |
| `task_type`                | Activity, Workflow, or Nexus.                                                                                                                                                                                                                                                              |
| `temporal_account`         | Temporal Account.                                                                                                                                                                                                                                                                          |
| `temporal_namespace`       | Temporal Namespace.                                                                                                                                                                                                                                                                        |
| `temporal_service_type`    | Frontend or Matching or History or Worker.                                                                                                                                                                                                                                                 |
| `is_background`            | This label on `temporal_cloud_v0_total_action_count` indicates when actions are produced by a Temporal background job, for example: hourly Workflow Export.                                                                                                                                |
| `namespace_mode`           | This label on `temporal_cloud_v0_total_action_count` indicates if actions are produced by an active vs a standby Namespace. For a regular Namespace, `namespace_mode` will always be “active”.                                                                                             |

The following is an example of how you can filter metrics using labels:

```text
temporal_cloud_v0_poll_success_count{__rollup__="true", operation="TaskQueueMgr", task_type="Activity", temporal_account="12345", temporal_namespace="your_namespace.12345", temporal_service_type="matching"}
```

## Operations {#metrics-operations}

**What operation labels are captured by Temporal Cloud?**

Operations are a special class of metrics label.
They describe the context during which a metric was captured.
Temporal Cloud includes the following operations labels:

- AdminDescribeMutableState
- AdminGetWorkflowExecutionRawHistory
- AdminGetWorkflowExecutionRawHistoryV2
- AdminReapplyEvents
- CountWorkflowExecutions
- CreateSchedule
- DeleteSchedule
- DeleteWorkflowExecution
- DescribeBatchOperation
- DescribeNamespace
- DescribeSchedule
- DescribeTaskQueue
- DescribeWorkflowExecution
- GetWorkerBuildIdCompatibility
- GetWorkerTaskReachability
- GetWorkflowExecutionHistory
- GetWorkflowExecutionHistoryReverse
- ListBatchOperations
- ListClosedWorkflowExecutions
- OperatorDeleteNamespace
- PatchSchedule
- PollActivityTaskQueue
- PollNexusTaskQueue
- PollWorkflowExecutionHistory
- PollWorkflowExecutionUpdate
- PollWorkflowTaskQueue
- QueryWorkflow
- RecordActivityTaskHeartbeat
- RecordActivityTaskHeartbeatById
- RegisterNamespace
- RequestCancelWorkflowExecution
- ResetStickyTaskQueue
- ResetWorkflowExecution
- RespondActivityTaskCanceled
- RespondActivityTaskCompleted
- RespondActivityTaskCompletedById
- RespondActivityTaskFailed
- RespondActivityTaskFailedById
- RespondNexusTaskCompleted
- RespondNexusTaskFailed
- RespondQueryTaskCompleted
- RespondWorkflowTaskCompleted
- RespondWorkflowTaskFailed
- SignalWithStartWorkflowExecution
- SignalWorkflowExecution
- StartBatchOperation
- StartWorkflowExecution
- StopBatchOperation
- TerminateWorkflowExecution
- UpdateNamespace
- UpdateSchedule
- UpdateWorkerBuildIdCompatibility
- UpdateWorkflowExecution

As the following table shows, certain [metrics groups](#available-metrics) support [operations](#metrics-operations) for aggregation and filtering:

| Metrics Group / Operations                      | All Operations | SignalWithStartWorkflowExecution / SignalWorkflowExecution / StartWorkflowExecution | TaskQueueMgr | CompletionStats |
| ----------------------------------------------- | -------------- | ----------------------------------------------------------------------------------- | ------------ | --------------- |
| **[Frontend Service Metrics](#frontend)**       | X              |                                                                                     |              |                 |
| **[Service Latency Metrics](#service-latency)** |                | X                                                                                   |              |                 |
| **[Poll Metrics](#poll)**                       |                |                                                                                     | X            |                 |
| **[Workflow Metrics](#workflow)**               |                |                                                                                     |              | X               |
