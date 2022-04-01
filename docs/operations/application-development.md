---
id: temporal-application-development
title: Temporal Application development guide
sidebar_label: Application development
description: This is a Temporal Application developer guide.
tags:
  - developer-guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

This guide is a work in progress.
Some sections may be incomplete or missing for some languages.

:::

This guide is meant to be a comprehensive resource for developing a [Temporal Application](/docs/concepts/what-is-a-temporal-application).

It is broken down into four large sections:

- [Foundations](#application-foundations): The minimum things required to build and run a simple Workflow with a single Activity.
- [Features](#application-features): All of the general features available to a Temporal Application.
- [Analysis](#application-analysis): Features and tools available that give you insight into you application.
- [Scaling](#application-scaling): Things to consider and look for when scaling a Temporal Application to millions or billions of Workflow Executions.

## Foundations

This section covers the minimum set of concepts and implementation details needed to build and run a simple [Temporal Application](/docs/concepts/what-is-a-temporal-application).

### Run a Temporal Cluster

Whenever we are developing Temporal Applications, we want to have a [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster) up and running.
We can interact with a Cluster via [Temporal Client](/docs/concepts/what-is-a-temporal-sdk/#what-is-a-temporal-client) APIs and [tctl](/docs/tctl) commands.

<!-- The fastest way to get a Temporal Cluster running locally for testing and development is to use Docker Compose. -->

<!-- - [Run a local Temporal Cluster using Docker Compose](/docs/clusters/quick-install#docker-compose) -->

import DockerCompose from '../clusters/quick-install/docker-compose.md'

<DockerCompose/>

### Install your SDK

import InstallGo from '../go/index.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<InstallGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

### Develop Workflow Definitions

Workflows are the fundamental unit of a Temporal Application, and it all starts with the development of a [Workflow Definition](/docs/concepts/what-is-a-workflow-definition).

<!-- Develop a Workflow Definition in the language of your choice.

- [How to develop a Workflow Definition in Go](/docs/go/how-to-develop-a-workflow-definition-in-go)
- [How to develop a Workflow Definition in Java](/docs/java/how-to-develop-a-workflow-definition-in-java)
- [How to develop a Workflow Definition in PHP](/docs/php/workflows)
- [How to develop a Workflow Definition in TypeScript](/docs/typescript/workflows/#how-to-write-a-workflow-function) -->

import DevelopWorkflowDefinitionInGo from '../go/how-to-develop-a-workflow-definition-in-go.md'
import DevelopWorkflowDefinitionInJava from '../java/how-to-develop-a-workflow-definition-in-java.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<DevelopWorkflowDefinitionInGo/>

</TabItem>
<TabItem value="java">

<DevelopWorkflowDefinitionInJava/>

</TabItem>
<TabItem value="php">

[How to develop a Workflow Definition in PHP](/docs/php/workflows)

</TabItem>
<TabItem value="ts">

[How to develop a Workflow Definition in TypeScript](/docs/typescript/workflows/#how-to-write-a-workflow-function)

</TabItem>
</Tabs>

### Develop Activity Definitions

One of the primary things that Workflows do, is orchestrate the execution of Activities.
Activities are normal function/method executions that can interact with the world.
For the Workflow to be able to execute the Activity we must define the [Activity Definition](/docs/concepts/what-is-an-activity-definition)

<!-- - [How to develop an Activity Definition in Go](/docs/go/how-to-develop-an-activity-definition-in-go) -->

import DevelopActivityDefinitionInGo from '../go/how-to-develop-an-activity-definition-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<DevelopActivityDefinitionInGo/>

</TabItem>
<TabItem value="java">

[How to develop an Activity Definition in Java](/docs/java/activities)

</TabItem>
<TabItem value="php">

[How to develop a Workflow Definition in PHP](/docs/php/activities)

</TabItem>
<TabItem value="ts">

[How to develop a Workflow Definition in TypeScript](/docs/typescript/activities)

</TabItem>
</Tabs>

### Spawn Activity Executions

Calls to spawn [Activity Executions](/docs/concepts/what-is-an-activity-execution) are written within a Workflow Definition.
The call to spawn an Activity Execution generates the [ScheduleActivityTask](/docs/concepts/what-is-a-command#scheduleactivitytask) Command.
This results in the set of [Activity Task](/docs/concepts/what-is-an-activity-task) related Events ([ActivityTaskScheduled](/docs/concepts/what-is-an-event/#activitytaskscheduled), [ActivityTaskStarted](/docs/concepts/what-is-an-event/#activitytaskstarted), and ActivityTask[Closed])in your Workflow Execution Event History

<!-- - [How to spawn an Activity Execution in Go](/docs/go/how-to-spawn-an-activity-execution-in-go) -->

import SpawnActivityExecutionInGo from '../go/how-to-spawn-an-activity-execution-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<SpawnActivityExecutionInGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

#### Required timeout

Activity Execution semantics rely on several parameters.
The only required custom value that needs to be set is either a [Schedule-To-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout) or a [Start-To-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout).
These parameters are set in the Activity Options.

**Schedule-To-Close:**

import ScheduleToCloseTimeoutGo from '../go/activityoptions/schedule-to-close-timeout.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<ScheduleToCloseTimeoutGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

<!-- **Schedule-To-Close:**

- [How to set a Schedule-To-Close Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#scheduletoclosetimeout) -->

**Start-To-Close:**

<!-- - [How to set a Start-To-Close Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#starttoclosetimeout) -->

import StartToCloseTimeoutGo from '../go/activityoptions/start-to-close-timeout.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<StartToCloseTimeoutGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

### Get Activity Execution results

The call to spawn an [Activity Execution](/docs/concepts/what-is-an-activity-execution) generates the [ScheduleActivityTask](/docs/concepts/what-is-a-command/#scheduleactivitytask) Command and provides the Workflow with an Awaitable.
Workflow Executions can either block progress until the result is available via the Awaitable or continue progressing, making use of the result when it becomes available.

<!-- - [How to get the results of an Activity Execution in Go](/docs/go/how-to-get-the-result-of-an-activity-execution-in-go) -->

import GetResultActivityExecutionGo from '../go/how-to-get-the-result-of-an-activity-execution-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<GetResultActivityExecutionGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

### Run Worker Processes

The [Worker Process](/docs/concepts/what-is-a-worker-process) is where Workflow Functions and Activity Functions are executed.
Each [Worker Entity](/docs/concepts/what-is-a-worker-entity) in the Worker Process must register the exact Workflow Types and Activity Types it may execute.
Each Worker Entity must also associate itself with exactly one [Task Queue](/docs/concepts/what-is-a-task-queue).
Each Worker Entity polling the same Task Queue must be registered with the same Workflow Types and Activity Types.

import DevelopWorkerGo from '../go/how-to-develop-a-worker-program-in-go.md'
import DevelopWorkerJava from '../java/how-to-develop-a-worker-program-in-java.md'
import DevelopWorkerPHP from '../php/how-to-develop-a-worker-program-in-php.md'
import DevelopWorkerTypeScript from '../typescript/how-to-develop-a-worker-program-in-typescript.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<DevelopWorkerGo/>

</TabItem>
<TabItem value="java">

<DevelopWorkerJava/>

</TabItem>
<TabItem value="php">

<DevelopWorkerPHP/>

</TabItem>
<TabItem value="ts">

<DevelopWorkerTypeScript/>

</TabItem>
</Tabs>

<!-- - [How to develop a Worker Program in Go](/docs/go/how-to-develop-a-worker-program-in-go)
- [How to develop a Worker Program in Java](/docs/java/how-to-develop-a-worker-program-in-java)
- [How to develop a Worker Program in PHP](/docs/php/how-to-develop-a-worker-program-in-php)
- [How to develop a Worker Program in TypeScript](/docs/typescript/how-to-develop-a-worker-program-in-typescript) -->

### Spawn Workflow Executions

[Workflow Execution](/docs/concepts/what-is-a-workflow-execution) semantics rely on several parameters – that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language specific contextual data, and Workflow Function parameters.

<!-- - [How to spawn a Workflow Execution using tctl](/docs/tctl/workflow/start)
- [How to spawn a Workflow Execution in Go](/docs/go/how-to-spawn-a-workflow-execution-in-go)
- [How to spawn a Workflow Execution in Java](/docs/java/how-to-spawn-a-workflow-execution-in-java) -->

import SpawnWorkflowExecutionGo from '../go/how-to-spawn-a-workflow-execution-in-go.md'
import SpawnWorkflowExecutionJava from '../java/how-to-spawn-a-workflow-execution-in-java.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
{label: 'tctl', value: 'tctl'},
]
}>

<TabItem value="go">

<SpawnWorkflowExecutionGo/>

</TabItem>
<TabItem value="java">

<SpawnWorkflowExecutionJava/>

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

A request to spawn a Workflow Execution causes the Temporal Cluster to create the first Event ([WorkflowExecutionStarted](/docs/concepts/what-is-an-event#workflowexecutionstarted)) in the Workflow Execution Event History.
The Temporal Cluster then creates the first Workflow Task resulting the first [WorkflowTaskScheduled](/docs/concepts/what-is-an-event/#workflowtaskscheduled) Event.

### Get Workflow Execution results

**Core concept: [Workflow Execution](/docs/concepts/what-is-a-workflow-execution)**

import WorkflowExecutionResultGo from '../go/how-to-get-the-result-of-a-workflow-execution-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<WorkflowExecutionResultGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

<!-- - [How to get the result of a Workflow Execution in Go](/docs/go/how-to-get-the-result-of-a-workflow-execution-in-go) -->

## Features

This section covers many of the features that are available to use in your [Temporal Application](/docs/concepts/what-is-a-temporal-application).

### Signals

[Signals](/docs/concepts/what-is-a-signal) are a great way to get data into a running Workflow Execution.
Signals can be sent from a Temporal Client or from within a Workflow.

import SignalsGo from '../go/how-to-use-signals-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<SignalsGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

<!-- - [What is a Signal?](/docs/concepts/what-is-a-signal)
- [How to send a Signal to a Workflow Execution in Go](/docs/go/how-to-send-a-signal-to-a-workflow-execution-in-go)
- [How to handle a Signal in a Workflow in Go](/docs/go/how-to-handle-a-signal-in-a-workflow-in-go)
- [How to use Signals in Java](/docs/java/signals)
- [How to use Signals in PHP](/docs/php/signals) -->

### Queries

- [What is a Query?](/docs/concepts/what-is-a-query)

- [How to send a Query to a Workflow Execution in Go](/docs/go/how-to-send-a-query-to-a-workflow-execution-in-go)
- [How to handle a Query in a Workflow in Go](/docs/go/how-to-handle-a-query-in-a-workflow-in-go)
- [How to use Queries in Java](/docs/java/queries)
- [How to use Queries in PHP](/docs/php/queries)
- [How to send a Query to a Workflow Execution using tctl](/docs/tctl/workflow/query)

### Timers

### Side Effects

A [Side Effect](/docs/concepts/what-is-a-side-effect) is a great way to execute a short, nondeterministic code snippet, such as generating a UUID.
The result is recorded into the Workflow Execution Event History as a [MarkerRecorded](/docs/concepts/what-is-an-event/#markerrecorded) Event.

import SideEffectGo from '../go/how-to-execute-a-side-effect-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<SideEffectGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

### Local Activities

- [What is a Local Activity Execution](/docs/concepts/what-is-a-local-activity)

- [How to set ExecuteLocalActivityOptions in Go](/docs/go/how-to-set-executelocalactivityoptions-in-go)

### Long-running Activities

If your use-case demands long-running Activity Executions, [Activity Heartbeats](/docs/concepts/what-is-an-activity-heartbeat) provide a way to keep track of the progress.

#### Record Heartbeats

import HeartbeatActivityGo from '../go/how-to-heartbeat-an-activity-in-go.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<HeartbeatActivityGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

#### Set Heartbeat Timeout

A [Heartbeat Timeout](/docs/concepts/what-is-a-heartbeat-timeout) will cause the long-running Activity to timeout if too much time has elapsed between Heartbeats.

import HeartbeatTimeoutGo from '../go/activityoptions/heartbeat-timeout.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<HeartbeatTimeoutGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

<!-- - [How to set a Heartbeat Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#heartbeattimeout) -->

### Child Workflow Executions

A [Child Workflow Execution](/docs/concepts/what-is-a-child-workflow-execution) is a Workflow Execution that is spawned from within another Workflow.

To asynchronously spawn a Child Workflow Execution, the Child Workflow must have an "Abandon" [Parent Close Policy](/docs/concepts/what-is-a-parent-close-policy) set in the Child Workflow Options.
Additionally, the Parent Workflow Execution must wait for the ChildWorkflowExecutionStarted event to appear in its event history before it completes.

If the Parent makes the call to spawn the Child Workflow Execution and then immediately completes, the Child Workflow Execution will not spawn.

import ChildWorkflowExecutionGo from '../go/how-to-spawn-a-child-workflow-execution-in-go.md'
import ChildWorkflowExecutionJava from '../java/how-to-spawn-a-child-workflow-execution-in-java.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<ChildWorkflowExecutionGo/>

</TabItem>
<TabItem value="java">

<ChildWorkflowExecutionJava/>

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

<!-- - [How to set ChildWorkflowOptions in Go](/docs/go/how-to-set-childworkflowoptions-in-go) -->

### Temporal Cron Jobs

A [Temporal Cron Job](/docs/concepts/what-is-a-temporal-cron-job) is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

A Cron Schedule is provided as an option when the call to spawn a Workflow Execution is made.

import CronScheduleGo from '../go/startworkflowoptions/cron-schedule.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<CronScheduleGo/>

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

<!-- - [How to set a Cron Schedule in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#cronschedule)
- [How to set a Cron Schedule in Java](/docs/java/distributed-cron)
- [How to set a Cron Schedule in PHP](/docs/php/distributed-cron)
- [How to set a Cron Schedule in Typescript](/docs/typescript/clients) -->

## Analysis

This section covers the features and customizations that enable us to observe many different aspects of the current state of the Temporal Application.

### Logging

**In progress**

### Metrics

**In progress**

### Visibility

**Core concepts: [Standard Visibility](/docs/concepts/what-is-standard-visibility), [Advanced Visibility](/docs/concepts/what-is-advanced-visibility), [List Filter](/docs/concepts/what-is-a-list-filter), [Search Attribute](/docs/concepts/what-is-a-search-attribute)**

The Temporal Platform h Visibility features that allow you to list Workflow Executions.

- [How to list Workflow Executions using tctl](/docs/tctl/workflow/list)
- [How to use a List Filter in the Temporal Web UI](/docs/web-ui/how-to-use-a-list-filter-in-the-temporal-web-ui)

## Scaling

In this section breaks down some of the features, metrics, and other configurations available to tune the performance of your Temporal Application as both the throughput and total number of Workflow Executions and Activity Executions scales up. (See also [Workers in Production](/blog/workers-in-production) blog post)

### Continue-As-New

[Continue-As-New](/docs/concepts/what-is-continue-as-new) enables a Workflow Execution to close successfully and create a new Workflow Execution in a single an atomic operation if the number of Events in the Event History is becoming too large.
The Workflow Execution spawned from the use of Continue-As-New has the same Workflow Id, a new Run Id, and a fresh Event History and is passed all the appropriate parameters.

import ContinueAsNewGo from '../go/how-to-continue-as-new-in-go.md'
import ContinueAsNewJava from '../java/how-to-continue-as-new-in-java.md'

<Tabs
defaultValue="go"
groupId="site-lang"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

<ContinueAsNewGo/>

</TabItem>
<TabItem value="java">

<ContinueAsNewJava/>

</TabItem>
<TabItem value="php">

</TabItem>
<TabItem value="ts">

</TabItem>
</Tabs>

### Worker Entity optimization

_Note: All metrics in this article are prepended with the “temporal\_” prefix. The prefix is omitted in this article to make the names more descriptive._

Performance tuning involves three important [SDK metric](/docs/reference/sdk-metrics) groups:

1. `worker_task_slots_available` gauges tagged `worker_type=WorkflowWorker` and `worker_type=ActivityWorker` for Workflow Task and Activity Workers correspondingly. These gauges report how many executor “slots” are currently available (unoccupied) for each Worker type.
2. `workflow_task_schedule_to_start_latency` and `activity_schedule_to_start_latency` timers for Workflow Tasks and Activities correspondingly. For more information about `schedule_to_start` timeout and latency, see [https://docs.temporal.io/docs/concepts/what-is-a-schedule-to-start-timeout/](https://docs.temporal.io/docs/concepts/what-is-a-schedule-to-start-timeout/).
3. `sticky_cache_size` and `workflow_active_thread_count` report the size of the Workflow cache and the number of cached Workflow threads.

_Note: To have access to all the metrics mentioned above in the JavaSDK, version ≥ 1.8.0 is required._

#### Configuration

The following options are defined on `WorkerOptions` and are applicable for each Worker separately:

1. `maxConcurrentWorkflowTaskExecutionSize` and `maxConcurrentActivityExecutionSize` define the number of total available slots for that Worker.
2. `maxConcurrentWorkflowTaskPollers` (JavaSDK: `workflowPollThreadCount`) and `maxConcurrentActivityTaskPollers` (JavaSDK: `activityPollThreadCount`) define the number of pollers performing poll requests waiting on Workflow / Activity task queue and delivering the tasks to the executors.

The Workflow Cache is created and shared between all the workers. It’s designed to limit the amount of resources used by the cache for the whole host/process. So the options are defined on `WorkerFactoryOptions` in JavaSDK and in `worker` package in GoSDK:

1. `WorkerFactoryOptions#workflowCacheSize` (GoSDK: `worker.setStickyWorkflowCacheSize`) defines the maximum number of cached Workflows Executions. Each cached Workflow contains at least one Workflow thread and its resources (memory, etc).
2. `maxWorkflowThreadCount` defines the maximum number of Workflow threads.

These options limit the resource consumption of the in-memory Workflow cache. Workflow cache options are shared between all Workers, because the Workflow cache is something that has to do with the resource consumption of the whole host, like memory and the total amount of threads, and should be limited per JVM.

#### Task Queues Processing Tuning

These steps and intended to make sure that there are no delays in the processing of Task Queues because of the under-provisioning of Workers or their unbalanced configuration.
You should revisit these steps if you observe elevated `schedule_to_start` metrics.
The steps are arranged in the recommended order of execution.

##### Hosts and Resources provisioning

If currently provisioned Worker hosts are fully utilized (near full CPU usage, high load average, etc), additional Workers hosts have to be provisioned to increase the capacity of the Workers pool.

**It's possible to have too many Workers**

Monitor the poll success (`poll_success`/`poll_success_sync`) and poll timeout `poll_timeouts` Server metric counters.

Poll Success Rate = (`poll_success` + `poll_success_sync`) / (`poll_success` + `poll_success_sync` + `poll_timeouts`)

Poll Success Rate should be >90% in most cases of systems with a steady load. For high volume and low latency, try to target >95%.

If you see

1. low Poll Success Rate, and
2. low `schedule_to_start_latency`, and
3. low Worker hosts resource utilization at the same time,

you might have too many workers, consider to size down.

##### Worker Executor Slots sizing

The main area of tuning should be the number of Worker Executor Slots. If:

1. the Worker hosts are underutilized (there are no bottlenecks on CPU, load average, etc), and
2. the `worker_task_slots_available` metric from the corresponding Worker type often shows a depleted number of available Worker slots, and

then consider increasing the maximum number of working slots by adjusting `maxConcurrentWorkflowTaskExecutionSize` or `maxConcurrentActivityExecutionSize`.

##### Poller count

_Note: Adjustments to pollers are rarely needed and rarely make a difference. Please consider this step only after adjusting Worker slots in the previous step. The only scenario in which the pollers’ adjustment makes sense is when there is a significant network latency between the Workers and Temporal Server._

If:

1. the `schedule_to_start` metric is abnormally long, and
2. the Worker hosts are underutilized (there are no bottlenecks on CPU, load average, etc), and
3. `worker_task_slots_available` metric from the corresponding Worker type shows that a significant percentage of Worker slots are available on a regular basis,

then consider increasing the number of pollers by adjusting `maxConcurrentWorkflowTaskPollers` or `maxConcurrentActivityTaskPollers`, depending on which type of `schedule_to_start` metric is elevated.

##### Rate Limiting

If, after adjusting the poller and executors count as specified above, you still observe an elevated `schedule_to_start`, underutilized Worker hosts, or high `worker_task_slots_available`, you may want to check

1. If server-side rate limiting per Task Queue is set by `WorkerOptions#maxTaskQueueActivitiesPerSecond` and remove the limit or adjust the value up.
2. If Worker-side rate limiting per Worker is set by `WorkerOptions#maxWorkerActivitiesPerSecond` and remove the limit. [GoSDK only]

#### Workflow Cache Tuning

When the number of cached Workflow Executions reported by `sticky_cache_size` hits `workflowCacheSize` or the number of their threads reported by `workflow_active_thread_count` metrics gauge hits `maxWorkflowThreadCount`, Workflow Executions start to get “evicted” from the cache.
An evicted workflow execution will need to be replayed when it gets any action that may advance it.

If

1. The Workflow Cache limits described above are hit, and
2. Worker hosts have enough free RAM and are not close to reasonable thread limits,

`workflowCacheSize` and `maxWorkflowThreadCount` limits may be increased to decrease the overall latency and cost of the replays in the system. If the opposite occurs, consider decreasing the limits.

_Note: In CoreSDK based SDKs, like TypeScript, this metric works differently and should be monitored and adjusted on a per Worker / Task Queue basis._

#### Invariants

These properties should always be true for a Worker’s configuration.

_These are applicable to JavaSDK only._

Perform this sanity check after the adjustments to Worker settings.

1. `workflowCacheSize` should be ≤ `maxWorkflowThreadCount`. Each Workflow has at least 1 Workflow thread.
2. `maxConcurrentWorkflowTaskExecutionSize` should be ≤ `maxWorkflowThreadCount`. Having more Worker slots than the Workflow cache size will lead to resource contention/stealing between executors and unpredictable delays. It’s recommended that `maxWorkflowThreadCount` be at least 2x of `maxConcurrentWorkflowTaskExecutionSize`.
3. `maxConcurrentWorkflowTaskExecutionSize` should be significantly ≤ `maxConcurrentWorkflowTaskPollers`. And `maxConcurrentActivityExecutionSize` should be significantly ≤ `maxConcurrentActivityTaskPollers`. The number of pollers should always be lower than the number of executors.

#### Drawbacks of putting just "large values everywhere"

As with any multithreading system, specifying too large values without monitoring with the SDK and system metrics will lead to constant resource contention/stealing, which decreases the total throughput and increases latency jitter of the system.
