---
id: emitted-metrics
title: What metrics are emitted from Temporal Cloud
description: Temporal Cloud emits several metrics.
sidebar_label: Available metrics
tags:
  - Explanation archetype
  - Observability concept
  - Temporal Cloud
---

Temporal tracks the following metrics for your various Namespaces.

- temporal_cloud_v0_frontend_service_error_count
- temporal_cloud_v0_frontend_service_request_count
- temporal_cloud_v0_poll_success_count
- temporal_cloud_v0_poll_success_sync_count
- temporal_cloud_v0_poll_timeout_count
- temporal_cloud_v0_service_latency_bucket
- temporal_cloud_v0_service_latency_count
- temporal_cloud_v0_service_latency_sum
- temporal_cloud_v0_state_transition_count
- temporal_cloud_v0_total_action_count
- temporal_cloud_v0_workflow_cancel_count
- temporal_cloud_v0_workflow_continued_as_new_count
- temporal_cloud_v0_workflow_failed_count
- temporal_cloud_v0_workflow_success_count
- temporal_cloud_v0_workflow_terminate_count
- temporal_cloud_v0_workflow_timeout_count

Metrics for all Namespaces in your account are available from the metrics endpoint.
The `temporal_namespace` label identifies the Namespace that is associated with each metric so that each user can build their own dashboard to meet their needs.

Metrics lag real-time performance by about one minute.

We retain raw metrics for seven days.
