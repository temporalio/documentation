---
id: worker-performance
title: Developer's guide - Worker performance
description: Guide into Workers Tuning
sidebar_label: Worker performance
tags:
  - operation-guide
  - workers
---

import RelatedReadList from '../components/RelatedReadList.js'

_Note: All metrics in this article are prepended with the “temporal\_” prefix. The prefix is omitted in this article to make the names more descriptive._

## Metrics

Performance tuning involves three important SDK metric groups:

1. `worker_task_slots_available` gauges tagged `worker_type=WorkflowWorker` and `worker_type=ActivityWorker` for Workflow Task and Activity Workers correspondingly. These gauges report how many executor “slots” are currently available (unoccupied) for each Worker type.
2. `workflow_task_schedule_to_start_latency` and `activity_schedule_to_start_latency` timers for Workflow Tasks and Activities correspondingly. For more information about `schedule_to_start` timeout and latency, see [Schedule-To-Start Timeout](/activities#schedule-to-start-timeout).
3. `sticky_cache_size` and `workflow_active_thread_count` report the size of the Workflow cache and the number of cached Workflow threads.

_Note: To have access to all the metrics mentioned above in the JavaSDK, version ≥ 1.8.0 is required._

## Configuration

The following options are defined on `WorkerOptions` and are applicable for each Worker separately:

1. `maxConcurrentWorkflowTaskExecutionSize` and `maxConcurrentActivityExecutionSize` define the number of total available slots for that Worker.
2. `maxConcurrentWorkflowTaskPollers` (JavaSDK: `workflowPollThreadCount`) and `maxConcurrentActivityTaskPollers` (JavaSDK: `activityPollThreadCount`) define the number of pollers performing poll requests waiting on Workflow / Activity task queue and delivering the tasks to the executors.

The Workflow Cache is created and shared between all the workers. It’s designed to limit the amount of resources used by the cache for the whole host/process. So the options are defined on `WorkerFactoryOptions` in JavaSDK and in `worker` package in GoSDK:

1. `WorkerFactoryOptions#workflowCacheSize` (GoSDK: `worker.setStickyWorkflowCacheSize`) defines the maximum number of cached Workflows Executions. Each cached Workflow contains at least one Workflow thread and its resources (memory, etc).
2. `maxWorkflowThreadCount` defines the maximum number of Workflow threads.

These options limit the resource consumption of the in-memory Workflow cache. Workflow cache options are shared between all Workers, because the Workflow cache is something that has to do with the resource consumption of the whole host, like memory and the total amount of threads, and should be limited per JVM.

## Task Queues Processing Tuning

These steps are intended to make sure that there are no delays in the processing of Task Queues because of the under-provisioning of Workers or their unbalanced configuration.
You should revisit these steps if you observe elevated `schedule_to_start` metrics.
The steps are arranged in the recommended order of execution.

### Hosts and Resources provisioning

If currently provisioned Worker hosts are fully utilized (near full CPU usage, high load average, etc), additional Workers hosts have to be provisioned to increase the capacity of the Workers pool.

**It's possible to have too many Workers**

Monitor the poll success (`poll_success`/`poll_success_sync`) and poll timeout `poll_timeouts` Server metric counters.

Poll Success Rate = (`poll_success` + `poll_success_sync`) / (`poll_success` + `poll_success_sync` + `poll_timeouts`)

Poll Success Rate should be >90% in most cases of systems with a steady load. For high volume and low latency, try to target >95%.

If you see

1. low Poll Success Rate, and
2. low `schedule_to_start_latency`, and
3. low Worker hosts resource utilization at the same time,

then you might have too many workers, consider sizing down.

### Worker Executor Slots sizing

The main area of tuning should be the number of Worker Executor Slots. If:

1. the Worker hosts are underutilized (there are no bottlenecks on CPU, load average, etc), and
2. the `worker_task_slots_available` metric from the corresponding Worker type often shows a depleted number of available Worker slots, and

then consider increasing the maximum number of working slots by adjusting `maxConcurrentWorkflowTaskExecutionSize` or `maxConcurrentActivityExecutionSize`.

### Poller count

:::note
Adjustments to pollers are rarely needed and rarely make a difference. Please consider this step only after adjusting Worker slots in the previous step. The only scenario in which the pollers’ adjustment makes sense is when there is a significant network latency between the Workers and Temporal Server.
:::

If:

1. the `schedule_to_start` metric is abnormally long, and
2. the Worker hosts are underutilized (there are no bottlenecks on CPU, load average, etc), and
3. `worker_task_slots_available` metric from the corresponding Worker type shows that a significant percentage of Worker slots are available on a regular basis,

then consider increasing the number of pollers by adjusting `maxConcurrentWorkflowTaskPollers` or `maxConcurrentActivityTaskPollers`, depending on which type of `schedule_to_start` metric is elevated.

### Rate Limiting

If, after adjusting the poller and executors count as specified earlier, you still observe an elevated `schedule_to_start`, underutilized Worker hosts, or high `worker_task_slots_available`, you might want to check the following:

- If server-side rate limiting per Task Queue is set by `WorkerOptions#maxTaskQueueActivitiesPerSecond`, remove the limit or adjust the value up. (See [Go](https://legacy-documentation-sdks.temporal.io/go/how-to-set-workeroptions-in-go/#taskqueueactivitiespersecond) and [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/WorkerOptions.Builder.html).)
- If Worker-side rate limiting per Worker is set by `WorkerOptions#maxWorkerActivitiesPerSecond`, remove the limit. (See [Go](https://legacy-documentation-sdks.temporal.io/go/how-to-set-workeroptions-in-go/#workeractivitiespersecond), [TypeScript](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#maxconcurrentactivitytaskexecutions), and [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/WorkerOptions.Builder.html).)

## Workflow Cache Tuning

When the number of cached Workflow Executions reported by `sticky_cache_size` hits `workflowCacheSize` or the number of their threads reported by `workflow_active_thread_count` metrics gauge hits `maxWorkflowThreadCount`, Workflow Executions start to get _evicted_ from the cache.
An evicted Workflow Execution will need to be replayed when it gets any action that may advance it.

If

1. The Workflow Cache limits described above are hit, and
2. Worker hosts have enough free RAM and are not close to reasonable thread limits,

`workflowCacheSize` and `maxWorkflowThreadCount` limits may be increased to decrease the overall latency and cost of the replays in the system. If the opposite occurs, consider decreasing the limits.

:::note
In CoreSDK based SDKs, like TypeScript, this metric works differently and should be monitored and adjusted on a per Worker and Task Queue basis.
:::

## Invariants

These properties should always be true for a Worker’s configuration.

_These are applicable to JavaSDK only._

Perform this sanity check after the adjustments to Worker settings.

1. `workflowCacheSize` should be ≤ `maxWorkflowThreadCount`. Each Workflow has at least one Workflow thread.
2. `maxConcurrentWorkflowTaskExecutionSize` should be ≤ `maxWorkflowThreadCount`. Having more Worker slots than the Workflow cache size will lead to resource contention/stealing between executors and unpredictable delays. It’s recommended that `maxWorkflowThreadCount` be at least 2x of `maxConcurrentWorkflowTaskExecutionSize`.
3. `maxConcurrentWorkflowTaskPollers` should be significantly ≤ `maxConcurrentWorkflowTaskExecutionSize`. And `maxConcurrentActivityTaskPollers` should be significantly ≤ `maxConcurrentActivityExecutionSize`. The number of pollers should always be lower than the number of executors.

## Drawbacks of putting just "large values everywhere"

As with any multithreading system, specifying too large values without monitoring with the SDK and system metrics will lead to constant resource contention/stealing, which decreases the total throughput and increases latency jitter of the system.

**Related**

- [Workers in production operation guide](https://temporal.io/blog/workers-in-production)
- [Full set of SDK Metrics reference](/references/sdk-metrics)
