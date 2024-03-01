---
id: emitted-metrics
title: What metrics are emitted from Temporal Cloud?
description: Temporal Cloud emits several metrics.
sidebar_label: Available metrics
tags:
  - explanation
  - observability
  - temporal cloud
  - reference
---

Temporal tracks the following metrics for your various Namespaces.

- `temporal_cloud_v0_frontend_service_error_count`: gRPC errors returned aggregated by operation.

- `temporal_cloud_v0_frontend_service_request_count`: gRPC requests received aggregated by operation.

- `temporal_cloud_v0_poll_success_count`: Tasks that are successfully matched to a poller.

- `temporal_cloud_v0_poll_success_sync_count`: Tasks that are successfully sync matched to a poller.

- `temporal_cloud_v0_poll_timeout_count`: When no tasks are available for a poller before timing out.

- `temporal_cloud_v0_resource_exhausted_error_count`: gRPC requests received that were rate-limited by Temporal Cloud, aggregated by cause.

- `temporal_cloud_v0_schedule_action_success_count`: Successful execution of a Scheduled Workflow.

- `temporal_cloud_v0_schedule_buffer_overruns_count`: When average schedule run length is greater than average schedule interval while a `buffer_all` overlap policy is configured.

- `temporal_cloud_v0_schedule_missed_catchup_window_count`: Skipped Scheduled executions when Workflows were delayed longer than the catchup window.

- `temporal_cloud_v0_schedule_rate_limited_count`: Workflows that were delayed due to exceeding a rate limit.

- `temporal_cloud_v0_service_latency_bucket`: Latency for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.

- `temporal_cloud_v0_service_latency_count`: Count of latency observations for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.

- `temporal_cloud_v0_service_latency_sum` - Sum of latency observation time for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.

- `temporal_cloud_v0_state_transition_count`: Count of state transitions for each Namespace.

- `temporal_cloud_v0_total_action_count`: Approximate count of Temporal Cloud Actions.

- `temporal_cloud_v0_workflow_cancel_count`: Workflows canceled before completing execution.

- `temporal_cloud_v0_workflow_continued_as_new_count`: Workflow Executions that were Continued-As-New from a past execution.

- `temporal_cloud_v0_workflow_failed_count`: Workflows that failed before completion.

- `temporal_cloud_v0_workflow_success_count`: Workflows that successfully completed.

- `temporal_cloud_v0_workflow_terminate_count`: Workflows terminated before completing execution.

- `temporal_cloud_v0_workflow_timeout_count`: Workflows that timed out before completing execution.

Metrics for all Namespaces in your account are available from the metrics endpoint.

Metrics lag real-time performance by about one minute.

Temporal Cloud retains raw metrics for seven days.

### Metric labels

Metrics for all Namespaces in your account are available from the metrics endpoint. Use the following labels to filter metrics:

| Label                      | Explanation                                                                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `le`                       | Less than or equal to (`le`) is used in histograms to categorize observations into buckets based on their value being less than or equal to a predefined upper limit.                                                                                                     |
| `operation`                | This includes operations such as:<ul><li>SignalWorkflowExecution</li><li>StartBatchOperation</li><li>StartWorkflowExecution</li><li>TaskQueueMgr</li><li>TerminateWorkflowExecution</li><li>UpdateNamespace</li><li>UpdateSchedule</li></ul> This list is non-exhaustive. |
| `resource_exhausted_cause` | Cause for resource exhaustion.                                                                                                                                                                                                                                            |
| `task_type`                | Activity or Workflow.                                                                                                                                                                                                                                                     |
| `temporal_account`         | Temporal Account.                                                                                                                                                                                                                                                         |
| `temporal_namespace`       | Temporal Namespace.                                                                                                                                                                                                                                                       |
| `temporal_service_type`    | Frontend or Matching or History or Worker.                                                                                                                                                                                                                                |
| `is_background`            | This label on `temporal_cloud_v0_total_action_count` indicates when actions are produced by a Temporal background job, for example: hourly Workflow Export.                                                                                                               |
| `namespace_mode`           | This label on `temporal_cloud_v0_total_action_count` indicates if actions are produced by an active vs a passive Namespace. For a regular Namespace, `namespace_mode` will always be “active”.                                                                            |

The following is an example of how you can filter metrics using labels:

```text
temporal_cloud_v0_poll_success_count{__rollup__="true", operation="TaskQueueMgr", task_type="Activity", temporal_account="12345", temporal_namespace="your_namespace.12345", temporal_service_type="matching"}
```
