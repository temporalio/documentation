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
The `temporal_namespace` label identifies the Namespace that is associated with each metric so that each user can build their own dashboard to meet their needs.

Metrics lag real-time performance by about one minute.

Temporal Cloud retains raw metrics for seven days.
