---
id: metrics-reference
title: OpenMetrics metrics reference
sidebar_label: Metrics reference
description: Detailed API documentation for the Temporal Cloud OpenMetrics endpoint.
keywords:
  - temporal cloud metrics configuration
  - configure metrics endpoint
  - temporal cloud observability
  - tcld CLI guide
  - temporal cloud UI setup
  - grafana temporal integration
  - prometheus metrics endpoint
  - openmetrics endpoint
  - observability tools integration
  - openmetrics api
tags:
  - Metrics
  - OpenMetrics
  - Observability
  - Temporal Cloud
---

This document describes all metrics available from the Temporal Cloud OpenMetrics endpoint.

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

Temporal Cloud OpenMetrics support is available in  [Public Preview](/evaluate/development-production-features/release-stages#public-preview).

:::

## Metric Conventions

### Metric Types

All metrics are exposed as OpenMetrics gauges, but represent different measurement types:

* *Rate Metrics*: per-second rate of the aggregated values  
* *Value Metrics*: The most recent aggregate value within a look-back window (e.g. backlogs, limits)  
* *Percentile Metrics*: Pre-calculated aggregated latency percentiles in seconds

:::note

All metrics are stored as 1 minute aggregates.

:::

### Common Labels

All metrics include these base labels:

| Label | Description |
| ----- | ----- |
| `temporal_namespace` | The Temporal namespace |
| `temporal_account` | The Temporal account identifier |
| `region` | Cloud region where the metric originated |

## Metrics Catalog

### Frontend Service Metrics

#### temporal\_cloud\_v1\_service\_request\_count

gRPC requests received per second.

| Label | Description |
| ----- | ----- |
| `operation` | The name of the RPC operation |

**Type**: Rate

#### temporal\_cloud\_v1\_service\_request\_throttled\_count

gRPC requests throttled per second.

| Label | Description |
| ----- | ----- |
| `operation` | The name of the RPC operation |

**Type**: Rate

#### temporal\_cloud\_v1\_service\_error\_count

gRPC errors per second.

| Label | Description |
| ----- | ----- |
| `operation` | The name of the RPC operation |

**Type**: Rate

#### temporal\_cloud\_v1\_service\_pending\_requests

The number of pollers that are waiting for a task. Use this to track against ``temporal_cloud_v1_poller_limit``

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |

**Type**: Value

#### temporal\_cloud\_v1\_resource\_exhausted\_error\_count

Resource exhaustion errors per second. This metric does not include throttling due to Namespace limits.

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |

**Type**: Rate

#### temporal\_cloud\_v1\_service\_latency\_p50

:::caution

Avoid aggregating this metric across dimensions because the percentile won't be accurate.

:::

The 50th percentile latency of service requests in seconds

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |

**Type**: Latency  

#### temporal\_cloud\_v1\_service\_latency\_p95

:::caution

Avoid aggregating this metric across dimensions because the percentile won't be accurate.

:::

The 95th percentile latency of service requests in seconds

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |

**Type**: Latency  

#### temporal\_cloud\_v1\_service\_latency\_p99

:::caution

Avoid aggregating this metric across dimensions as the percentile won't be accurate.

:::

The 99th percentile latency of service requests in seconds

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |

**Type**: Latency  

### Workflow Completion Metrics

:::caution High Cardinality

These metrics could have high cardinality depending on number of workflow types and task queues.

:::

#### temporal\_cloud\_v1\_workflow\_success\_count

Successful workflow completions per second.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `temporal_workflow_type` | The workflow type |

**Type**: Rate  

#### temporal\_cloud\_v1\_workflow\_failed\_count

Workflow failures per second.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `temporal_workflow_type` | The workflow type |

**Type**: Rate

#### temporal\_cloud\_v1\_workflow\_timeout\_count

Workflow timeouts per second.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `temporal_workflow_type` | The workflow type |

**Type**: Rate

#### temporal\_cloud\_v1\_workflow\_cancel\_count

Workflow cancellations per second.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `temporal_workflow_type` | The workflow type |

**Type**: Rate

#### temporal\_cloud\_v1\_workflow\_terminate\_count

Workflow terminations per second.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `temporal_workflow_type` | The workflow type |

**Type**: Rate

#### temporal\_cloud\_v1\_workflow\_continued\_as\_new\_count

Workflows continued as new per second.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `temporal_workflow_type` | The workflow type |

**Type**: Rate

### Task Queue Metrics

:::caution High Cardinality

These metrics could have high cardinality depending on number of task queues present.

:::

#### temporal\_cloud\_v1\_approximate\_backlog\_count

The approximate number of tasks pending in a task queue. Started Activities are not included in the count as they have been dequeued from the task queue.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `task_type` | Type of task: `workflow` or `activity` |

**Type**: Value

#### temporal\_cloud\_v1\_poll\_success\_count

Successfully matched tasks per second.

| Label | Description |
| ----- | ----- |
| `operation` | The poll operation name |
| `task_type` | Type of task: `workflow` or `activity` |
| `temporal_task_queue` | The task queue name |

**Type**: Rate

#### temporal\_cloud\_v1\_poll\_success\_sync\_count

Tasks matched synchronously per second (no polling wait).

| Label | Description |
| ----- | ----- |
| `operation` | The poll operation name |
| `task_type` | Type of task: `workflow` or `activity` |
| `temporal_task_queue` | The task queue name |

**Type**: Rate

#### temporal\_cloud\_v1\_poll\_timeout\_count

The rate of poll requests that timed out without receiving a task.

| Label | Description |
| ----- | ----- |
| `operation` | The poll operation name |
| `task_type` | Type of task: `workflow` or `activity` |
| `temporal_task_queue` | The task queue name |

**Type**: Rate

#### temporal\_cloud\_v1\_no\_poller\_tasks\_count

The rate of tasks added to queues with no active pollers.

| Label | Description |
| ----- | ----- |
| `temporal_task_queue` | The task queue name |
| `task_type` | Type of task: `workflow` or `activity` |

**Type**: Rate

### Namespace Metrics

#### temporal\_cloud\_v1\_namespace\_open\_workflows

The current number of open workflows in a namespace.

**Type**: Value

#### temporal\_cloud\_v1\_total\_action\_count

The total number of actions performed per second. Actions with `is_background=false` are counted toward the ``temporal_cloud_v1_action_limit``.

| Label | Description |
| ----- | ----- |
| `is_background` | Whether the action was background: `true` or `false`. Background actions (e.g. History export) do not count toward the action rate limit |
| `namespace_mode` | Indicates if actions are produced by an `active` or a `standby` Namespace |

**Type**: Rate

#### temporal\_cloud\_v1\_total\_action\_throttled\_count

The total number of actions throttled per second.

**Type**: Rate

#### temporal\_cloud\_v1\_operations\_count

Operations performed per second.

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |
| `is_background` | Whether the operation was background: `true` or `false`. Background operations do not count toward the operation rate limit |
| `namespace_mode` | Indicates if operations are produced by an `active` or a `standby` Namespace |

**Type**: Rate

#### temporal\_cloud\_v1\_operations\_throttled\_count

Operations throttled due to rate limits per second.

| Label | Description |
| ----- | ----- |
| `operation` | The name of the operation |
| `is_background` | Whether the operation was background: `true` or `false`. Background operations do not count toward the operation rate limit |
| `namespace_mode` | Indicates if actions are throttled in an `active` or a `standby` Namespace |

**Type**: Rate

### Schedule Metrics

#### temporal\_cloud\_v1\_schedule\_action\_success\_count

Successfully executed scheduled workflows per second.

**Type**: Rate

#### temporal\_cloud\_v1\_schedule\_buffer\_overruns\_count

The rate of schedule buffer overruns when using `BUFFER_ALL` overlap policy.

**Type**: Rate

#### temporal\_cloud\_v1\_schedule\_missed\_catchup\_window\_count

The rate of missed schedule executions outside the catchup window.

**Type**: Rate

#### temporal\_cloud\_v1\_schedule\_rate\_limited\_count

The rate of scheduled workflows delayed due to rate limiting.

**Type**: Rate

### Replication Metrics

#### temporal\_cloud\_v1\_replication\_lag\_p50

The 50th percentile cross-region replication lag in seconds.

**Type**: Latency

#### temporal\_cloud\_v1\_replication\_lag\_p95

The 95th percentile cross-region replication lag in seconds.

**Type**: Latency

#### temporal\_cloud\_v1\_replication\_lag\_p99

The 99th percentile cross-region replication lag in seconds.

**Type**: Latency

### Limit Metrics

#### temporal\_cloud\_v1\_operations\_limit

The current configured operations per second limit for a namespace.

**Type**: Value

#### temporal\_cloud\_v1\_action\_limit

The current configured actions per second limit for a namespace. Track utilization against this limit with ``temporal_cloud_v1_total_action_count`` and `is_background=false`.

**Type**: Value

#### temporal\_cloud\_v1\_service\_request\_limit

The current configured frontend service RPS limit for a namespace. Track utilization against this limit with ``temporal_cloud_v1_service_request_count``

**Type**: Value

#### temporal\_cloud\_v1\_poller\_limit

The current configured poller limit for a namespace. Track utilization against this limit with ``temporal_cloud_v1_service_pending_requests``.

**Type**: Value

