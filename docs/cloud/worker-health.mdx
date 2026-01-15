---
id: worker-health
title: Monitor worker health
sidebar_label: Monitor worker health
description: Detect and configure for Task backlogs, greedy Worker resources, misconfigured Workers, and Sticky cache settings. Optimize alert systems and get actionable insights on metrics like Schedule-To-Start latency, Sync Match Rate, and Poll Success Rate for improved application health.
toc_max_heading_level: 4
tags:
  - Metrics
  - Observability
  - Temporal Cloud
  - Workers
keywords:
  - temporal workflow optimization
  - detect task backlog
  - greedy worker resources
  - detect misconfigured workers
  - sticky cache configuration
  - sync match rate
  - workflow task latency
  - temporal cloud metrics
  - temporal task queue management
  - prometheus queries for temporal
  - worker configuration
  - workflow performance tuning
  - optimize temporal workflows
  - workflow task execution size
  - temporal worker resources
---
import { LANGUAGE_TAB_GROUP, getLanguageLabel } from '@site/src/constants/languageTabs';
import SdkTabs from '@site/src/components';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page is a guide to monitoring a Temporal Worker fleet and covers the following scenarios:

- [Configuring minimal observations](#minimal-observations)
- [How to detect a backlog of Tasks](#detect-task-backlog)
- [How to detect greedy Worker resources](#detect-greedy-workers)
- [How to detect misconfigured Workers](#detect-misconfigured-workers)
- [How to configure Sticky cache](#configure-sticky-cache)

## Minimal Observations {#minimal-observations}

These alerts should be configured and understood first to gain intelligence into your application health and behaviors.

1. Create monitors and alerts for Schedule To Start latency SDK metrics (both [Workflow Executions](/references/sdk-metrics#workflow_task_schedule_to_start_latency) and [Activity Executions](/references/sdk-metrics#activity_schedule_to_start_latency)).
   See [Detect Task backlog section](#detect-task-backlog) to explore [sample queries](#prometheus-query-samples) and appropriate responses that accompany these values.

- Alert at >200ms for your p99 value
- Plot >100ms for your p95 value

2. Create a [Grafana](/cloud/metrics/prometheus-grafana) panel called Sync Match Rate.
   See the [Sync Match Rate section](#sync-match-rate) to explore example queries and appropriate responses that accompany these values.

- Alert at \<95% for your p99 value
- Plot \<99% for your p95 value

3. Create a [Grafana](/cloud/metrics/prometheus-grafana) panel called Poll Success Rate.
   See the [Detect greedy Workers section](#detect-greedy-workers) for example queries and appropriate responses that accompany these values.

- Alert at \<90% for your p99 value
- Plot \<95% for your p95 value

The following alerts build on the above to dive deeper into specific potential causes for Worker related issues you might be experiencing.

1. Create monitors and alerts for the [temporal_worker_task_slots_available](/references/sdk-metrics#worker_task_slots_available) SDK metric.
   See the [Detect misconfigured Workers section](#detect-misconfigured-workers) for appropriate responses based on the value.

- Alert at 0 for your p99 value

2. Create monitors for the [temporal_sticky_cache_size](/references/sdk-metrics#sticky_cache_size) SDK metric.
   See the [Configure Sticky Cache section](#configure-sticky-cache) for more details on this configuration.

- Plot at \{value\} > \{WorkflowCacheSize.Value\}

3. Create monitors for the [temporal_sticky_cache_total_forced_eviction](/references/sdk-metrics#sticky_cache_total_forced_eviction) SDK metric.
   This metric is available in the Go SDK, and the Java SDK only.
   See the [Configure Sticky Cache section](#configure-sticky-cache) for more details and appropriate responses.

- Alert at >\{predetermined_high_number\}

## Detect Task Backlog {#detect-task-backlog}

### Symptoms of high Task backlog

If the Task backlog is too high, you will find that tasks are waiting to find Workers to run on. This can cause a delay in
Workflow execution. Detecting a growing Task backlog is possible by watching the Schedule To Start latency and sync match rate.

Metrics to monitor:

- **SDK metric**: [workflow_task_schedule_to_start_latency](/references/sdk-metrics#workflow_task_schedule_to_start_latency)
- **SDK metric**: [activity_schedule_to_start_latency](/references/sdk-metrics#activity_schedule_to_start_latency)
- **Temporal Cloud metric**: [temporal_cloud_v0_poll_success_count](/cloud/metrics/reference#temporal_cloud_v0_poll_success_count)
- **Temporal Cloud metric**: [temporal_cloud_v0_poll_success_sync_count](/cloud/metrics/reference#temporal_cloud_v0_poll_success_sync_count)

### Schedule To Start latency

The Schedule To Start metric represents how long Tasks are staying unprocessed in the Task Queues.
It is the time between when a Task is enqueued and when it is started by a Worker.
This time being long (likely) means that your Workers can't keep up — either increase the number of Workers (if the host load is already high) or increase the number of pollers per Worker.

If your Schedule To Start latency alert triggers or is high, check the [Sync Match Rate](#sync-match-rate) to decide if you need to adjust your Worker or fleet, or contact Temporal Cloud support.
If your Sync Match Rate is low, contact [Temporal Cloud support](/cloud/support#support-ticket).
If your Sync Match Rate is low, you can contact Temporal Cloud support.

The schedule_to_start_latency SDK metric for both [Workflow Executions](/references/sdk-metrics#workflow_task_schedule_to_start_latency) and [Activity Executions](/references/sdk-metrics#activity_schedule_to_start_latency) should have alerts.

#### Prometheus query samples

**Workflow Task Latency, 99th percentile**

```
histogram_quantile(0.99, sum(rate(temporal_workflow_task_schedule_to_start_latency_seconds_bucket[5m])) by (le, namespace, task_queue))
```

**Workflow Task Latency, average**

```
sum(increase(temporal_workflow_task_schedule_to_start_latency_seconds_sum[5m])) by (namespace, task_queue)
/
sum(increase(temporal_workflow_task_schedule_to_start_latency_seconds_count[5m])) by (namespace, task_queue)
```

**Activity Task Latency, 99th percentile**

```
histogram_quantile(0.99, sum(rate(temporal_activity_schedule_to_start_latency_seconds_bucket[5m])) by (le, namespace, task_queue))
```

**Activity Task Latency, average**

```
sum(increase(temporal_activity_schedule_to_start_latency_seconds_sum[5m])) by (namespace, task_queue)
/
sum(increase(temporal_activity_schedule_to_start_latency_seconds_count[5m])) by (namespace, task_queue)
```

**Target**

This latency should be very low, close to zero.
Any higher value indicates a bottleneck.

### Sync Match Rate {#sync-match-rate}

The sync match rate measures the rate of Tasks that are delivered to workers without having to be persisted (workers are up and available to pick them up) to the rate of all delivered tasks.

A sync match is when a task is immediately matched to a Worker via the Sticky Queue.

An async match is when a Task cannot be matched to the Sticky Queue for a Worker. This can happen when no Worker has cached the Workflow, or if the Task times out during processing. In this case, the Task returns to the general Task Queue.

**Calculate Sync Match Rate**

```
temporal_cloud_v0_poll_success_sync_count ÷ temporal_cloud_v0_poll_success_count = N
```

#### Prometheus query samples

**sync_match_rate query**

```
sum by(temporal_namespace) (
    rate(
        temporal_cloud_v0_poll_success_sync_count{temporal_namespace=~"$namespace"}[5m]
    )
)
/
sum by(temporal_namespace) (
    rate(
        temporal_cloud_v0_poll_success_count{temporal_namespace=~"$namespace"}[5m]
    )
)
```

**Target**

The Sync Match Rate should be at least >95%, but preferably >99%.

### Handling Task backlog issues {#task-backlog-handling}

Once you have detected the condition of a high Task backlog, consider the scenarios below to take action.

#### High Schedule To Start latency and high sync match rate

There are three typical causes for this:

- There are not enough workers to perform work
- Each worker is either under resourced, or is misconfigured, to handle enough work
- There is congestion caused by the environment (eg., network) hosting the worker(s) and Temporal Cloud

Consider

- Increasing either the number of available workers
- Verifying that your worker hosts are appropriately resourced
- Increasing the worker configuration value for concurrent pollers for workers/task executions (if your worker resources can accommodate the increased load)
- Doing some combination of these

#### High Schedule To Start latency and low sync match rate

Verify that you have not set a value for `ScheduleToStartTimeout` in your Activity Options. This may skew your observations.

It may be acceptable for your use case to have low sync match rate.
For example, if you have known workloads or you intentionally throttle tasks.

In this case it's also important to understand the fill and drain rates of the async tasks are during these windows:

Successful async polls

```
temporal_cloud_v0_poll_success_count - temporal_cloud_v0_poll_success_sync_count = N
```

```
sum(rate(temporal_cloud_v0_poll_success_count{temporal_namespace=~"$temporal_namespace"}[5m])) by (temporal_namespace, task_type)
-
sum(rate(temporal_cloud_v0_poll_success_sync_count{temporal_namespace=~"$temporal_namespace"}[5m])) by (temporal_namespace, task_type)
```

[//]: # (add `temporal_cloud_v1_approximate_backlog_count` once the v2 metrics has been GA'd)

**Actions**

- Verify that your Worker setup is optimized for your instance:
  - Check the system CPU usage against `task_slots` and adjust `maxConcurrentWorkflowTaskExecutionSize` and `maxConcurrentActivityExecutionSize` settings as necessary.
  - Check the system memory usage against `sticky_cache_size` and adjust sticky cache size as necessary.
  - For a detailed explanation of settings, see the [Worker Performance](/develop/worker-performance#task-queues-processing-tuning) section.
- Increase the Worker config for concurrent pollers for Workflow or Activity `task_slots`, if your Worker resources can accommodate the increased load.
  - Reference [Worker Performance > Poller Count](/develop/worker-performance#poller-count).
- Increase the number of available Workers.

:::warning

Setting the [Schedule To Start Timeout](/encyclopedia/detecting-activity-failures#schedule-to-start-timeout) in your Activity Options can skew your observations.
Avoid setting a Schedule To Start Timeout when load testing for latency.

:::

## Detect greedy Worker resources {#detect-greedy-workers}

**How to detect greedy Worker resources.**

You can have too many Workers.
If you see the Poll Success Rate showing low numbers, you might have too many resources polling Temporal Cloud.

Metrics to monitor:

- **Temporal Cloud metric**: [temporal_cloud_v0_poll_success_count](/cloud/metrics/reference#temporal_cloud_v0_poll_success_count)
- **Temporal Cloud metric**: [temporal_cloud_v0_poll_success_sync_count](/cloud/metrics/reference#temporal_cloud_v0_poll_success_sync_count)
- **Temporal Cloud metric**: [temporal_cloud_v0_poll_timeout_count](/cloud/metrics/reference#temporal_cloud_v0_poll_timeout_count)
- **SDK metric**: [temporal_workflow_task_schedule_to_start_latency](/references/sdk-metrics#workflow_task_schedule_to_start_latency)
- **SDK metric**: [temporal_activity_schedule_to_start_latency](/references/sdk-metrics#activity_schedule_to_start_latency)

**Calculate Poll Success Rate**

```
(temporal_cloud_v0_poll_success_count + temporal_cloud_v0_poll_success_sync_count)
/
(temporal_cloud_v0_poll_success_count + temporal_cloud_v0_poll_success_sync_count + temporal_cloud_v0_poll_timeout_count)
```

**Target**

Poll Success Rate should be >90% in most cases of systems with a steady load.
For high volume and low latency, try to target >95%.

**Interpretation**

There may be too many Pollers for the amount of Workers.

If you see all of the following at the same time then you might have too many Workers:

- Low poll success rate
- Low Schedule To Start latency
- Low worker host resource utilization

**Actions**

Consider sizing down your Workers by either:

- Reducing the number of Workers polling the impacted Task Queue, OR
- Reducing the concurrent pollers per Worker, OR
- Both of the above

#### Prometheus query samples

**poll_success_rate query**

```
(
    (
        sum by(temporal_namespace) (
          rate(
            temporal_cloud_v0_poll_success_count{temporal_namespace=~"$namespace"}[5m]
          )
        )
      +
        sum by(temporal_namespace) (
          rate(
            temporal_cloud_v0_poll_success_sync_count{temporal_namespace=~"$namespace"}[5m]
          )
        )
    )
  /
    (
        (
            sum by(temporal_namespace) (
              rate(
                temporal_cloud_v0_poll_success_count{temporal_namespace=~"$namespace"}[5m]
              )
            )
          +
            sum by(temporal_namespace) (
              rate(
                temporal_cloud_v0_poll_success_sync_count{temporal_namespace=~"$namespace"}[5m]
              )
            )
        )
      +
        sum by(temporal_namespace) (
          rate(
            temporal_cloud_v0_poll_timeout_count{temporal_namespace=~"$namespace"}[5m]
          )
        )
    )
)
```

## Detect misconfigured Workers {#detect-misconfigured-workers}

**How to detect misconfigured Workers.**

Worker configuration can negatively affect Task processing efficiency.

Metrics to monitor:

- **SDK metric**: [temporal_worker_task_slots_available](/references/sdk-metrics#worker_task_slots_available)
- **SDK metric**: [sticky_cache_size](/references/sdk-metrics#sticky_cache_size)
- **SDK metric**: [sticky_cache_total_forced_eviction](/references/sdk-metrics#sticky_cache_total_forced_eviction)

**Execution Size Configuration**

The `maxConcurrentWorkflowTaskExecutionSize` and `maxConcurrentActivityExecutionSize` define the number of total available slots for the Worker.
If this is set too low, the Worker will not be able to keep up processing Tasks.

**Target**

The `temporal_worker_task_slots_available` metric should always be >0.

#### Prometheus query samples

**Over Time**

```
avg_over_time(temporal_worker_task_slots_available{namespace="$namespace",worker_type="WorkflowWorker"}[10m])
```

**Current Time**

```
temporal_worker_task_slots_available{namespace="default", worker_type="WorkflowWorker", task_queue="$task_queue_name"}
```

**Interpretation**

You are likely experiencing a Task backlog if you are seeing inadequate slot counts frequently.
The work is not getting processed as fast as it should/can.

**Action**

Increase the `maxConcurrentWorkflowTaskExecutionSize` and `maxConcurrentActivityExecutionSize` values and keep an eye on your Worker resource metrics (CPU utilization, etc) to make sure you haven't created a new issue.

### Configure Sticky Execution Cache {#configure-sticky-cache}

Sticky Execution means that a Worker caches a Workflow Execution Event History and creates a dedicated Task Queue to listen on.
It significantly improves performance because the Temporal Service only sends new events to the Worker instead of entire Event Histories.

**Target**

The `sticky_cache_size` should report less than or equal to your `WorkflowCacheSize` value.
Also, sticky_cache_total_forced_eviction should not be reporting high numbers (relative).

**Action**

If you see a high eviction count, verify there are no other inefficiencies in your Worker configuration or resource provisioning (backlog).
If you see the cache size metric exceed the `WorkflowCacheSize`, increase this value if your Worker resources can accommodate it or provision more Workers.
Finally, take time to review [the Worker performance guide](/develop/worker-performance) and see if it addresses other potential cache issues.

#### Prometheus query samples

**Sticky Cache Size**

```
max_over_time(temporal_sticky_cache_size{namespace="$namespace"}[10m])
```

**Sticky Cache Evictions**

```
rate(temporal_sticky_cache_total_forced_eviction_total{namespace="$namespace"}[5m]))
```

## Manage Worker Heartbeating {#manage-worker-heartbeating}

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

This feature is currently in [Public Preview](/evaluate/development-production-features/release-stages#public-preview).

:::

Workers send a heartbeat to Temporal Server every 60 seconds by default. This heartbeat serves to provide liveness and configuration data from the Worker to the Server.
Specific data sent can be found in the [API](https://github.com/temporalio/api/blob/master/temporal/api/worker/v1/message.proto). By providing a consistent heartbeat from
Workers, the Server can obtain an accurate count of Workers, understand Worker performance, and respond to Worker heartbeats with commands. Some examples of how this is useful:

- understanding the difference between a Worker that is down and a Worker that is processing tasks for a long time
- identifying a Worker with high CPU usage from the Server point of view

Use the Temporal CLI to view information about all Workers connected to Temporal Server. Use `temporal worker describe` to see details of a specific Worker. Use `temporal worker list` to get a complete list of all connected Workers.

If you wish to disable Worker heartbeating (features above will not work with this feature disabled) or set heartbeating to be more frequent than every 60 seconds (allowed range is 1s to 60s), set the configuration relevant to your SDK.
<SdkTabs hideUnsupportedLanguages>
<SdkTabs.Python>
Use `TelemetryConfig()` to adjust heartbeat settings. See the [Python SDK documentation](https://python.temporal.io/temporalio.bridge.runtime.RuntimeOptions.html#worker_heartbeat_interval_millis) for more details.
</SdkTabs.Python>
<SdkTabs.Ruby>
Add configurations to `Runtime()` to adjust heartbeat settings. See the [Ruby SDK documentation](https://ruby.temporal.io/Temporalio/Runtime.html) for more details.
</SdkTabs.Ruby>
</SdkTabs>

