---
id: mesh
title: Jargon Mesh
sidebar_label: Jargon Mesh
---

## Overview

Welcome to Temporal's core terminology!

This page is dedicated to defining and describing the terms and components of the Temporal system in a holistic way.
The Jargon Mesh is sort of like a glossary on steroids.
But the terms are not organized alphabetically, and instead ordered more by their relative importance to the "happy path" of a user.

## Workflow

A fault-oblivious stateful function that orchestrates Activities.

- A Workflow has full control over which [**Activities**](#activity) are executed, and in which order.
- A Workflow must not affect the external world directly, only through [**Activities**](#activity).
- What makes Workflow code a Workflow is that its state is preserved by Temporal.
Therefore any failure of a [**Worker**](#worker) process that hosts the Workflow code does not affect the [**Workflow Execution**](#workflow-execution).
The Workflow continues as if these failures did not happen.
At the same time, [**Activities**](#activity) can fail any moment for any reason.
- Because Workflow code is fully fault-oblivious, it is guaranteed to get notifications about [**Activity**](#activity) failures or timeouts and act accordingly.
- There is no limit to the duration of a Workflow Execution.


The Temporal programming model aims to encapsulate and implement the entire business logic in a simple function or object method.
Thanks to the Temporal Server, the function/method is stateful, and the implementer doesn't need to employ any additional systems to ensure durability and fault tolerance.

Again, it is important to note that this code directly implements the business logic, and if any of the invoked operations (aka [Activities](/docs/concepts/activities)) take a long time, the code is not going to change.

It is completely okay to be blocked on `chargeMonthlyFee` for a day or more if the downstream processing service is down or not responding.
In the same way, it is a completely normal operation to sleep for 30 days directly inside the Workflow code.
This is possible because infrastructure failures are not going to affect the Workflow state including threads, blocking calls, and any local or Workflow variables.

The Temporal Server has practically no scalability limits on the number of open Workflow instances, so this code can be used over and over even if your application has hundreds of millions of customers.

### Workflow Definition

A Workflow Definition is the static code written in a  given language, such as Go, Java, or PHP that specifies the constraints of the Workflow Execution.

### Workflow Type

A Workflow Type is the name that is given to a Workflow.

### Workflow Execution

An instance of a [**Workflow Definition**](#workflow-definition).

- It is possible for a Workflow Execution to be comprised of multiple [**Workflow Runs**](#workflow-runs).
  When a [**Workflow Executions's**](#workflow-execution) [**Event History**](#event-history) grows too large it, the next invocation can be called with a "Continue as New" flag to create a new run automatically.

If a Workflow Execution is currently executing, then it is considered "Open".
A Workflow Execution will end as either **Completed**, **Continued-As-New**, **Timed Out**, **Terminated**, **Canceled**, or **Failed**.

### Workflow Run

A Workflow Run is a single Workflow Execution.

#### Workflow Run Id

A Run Id is UUID that a Temporal service assigns to each [**Workflow Run**](#workflow-run).

- Temporal guarantees that only one [**Workflow Execution**](#workflow-execution) with a given [**Workflow Id**](#workflow-id) can be open at a time.
  But after the [**Workflow Execution**](#workflow-execution) has completed, if allowed by a configured policy, you might be able to re-execute a [**Workflow**](#workflow) after it has closed or failed, using the same [**Workflow Id**](#workflow-id).
- Each such re-execution is called a run. Run Id is used to uniquely identify a run even if it shares a Workflow Id with others.

### Workflow Task

A Workflow Task is a [**Task**](#task) that contains invocation information for a [**Workfow Execution**](/docs/terms/#workflow-execution).

- Every time a new external event that might affect a [**Workflow Execution**](#workflow-execution) state is recorded, a Workflow Task that contains it, is added to a [**Task Queue**](#task-queue) and then picked up by a [**Workflow Worker**](#worker).
- After the new event is handled, the Workflow Task is completed with a list of [**Commands**](#command).
- Handling of a Workflow Task is usually very fast and is not related to the duration of operations that the [**Workflow**](#workflow) invokes.


### Workflow Task Queue



### Workflow Task Execution

Execution of a [Workflow Task](/docs/terms/#workflow-task).
A [Worker] is responsible for polling its assigned [Workflow Task Queue](/docs/terms/#workflow-task-queue) to pickup Workflow Tasks.
The Server captures the Workflow Task Scheduled Event when the Workflow Task is placed in the Workflow Task Queue.
If a Worker does not pick up the Workflow Task within the Workflow Task Timeout period, a Workflow Task Timed Out Event is recorded.
After a Worker starts the Task it responds to the Server

### Workflow Options

When you start a [Workflow Execution](/docs/terms/#workflow-executions) you can pass along parameters that tell the Temporal Server and SDK how to handle it.
This parameters can include timeouts a Retry Policy, the Task Queue name, a Data Converter, search attributes, and Child Workflow options.

#### Workflow Execution Timeouts

It's sometimes necessary to impose time limits on a specific Workflow Execution.
Though, unlike [Activities](/docs/concepts/activities), Workflow timeouts are available primarily to protect the system from "runaway" Workflows that may end up consuming too many resources, and not intended to be used as a part of the business logic.
There are a few important things to consider with Workflow timeout settings:

1. When a Workflow times out, it is terminated without any notifications available to another application.
2. You should always account for possible outages, such that if your Workers go down for an hour, all of your Workflows won't time out.
   Start with infinite timeouts.
3. The SDKs come equipped with timers and sleep APIs that can be used directly inside of Workflows to handle business logic related timeouts.

##### Execution Timeout

- **Description**: This is the maximum amount of time that a Workflow should be allowed to run including retries and any usage of the "Continue-as-new" feature.
  The default value is set to 10 years.
  This is different from [Run timeout](#run-timeout).
- **Use-case**: This is most commonly used for stopping the execution of a [cron scheduled Workflow](#cron-schedule) after a certain amount of time has passed.

##### Run Timeout

- **Description**: This is the maximum amount of time that a single Workflow run is restricted to.
  The default is set to the same value as the [Execution timeout](#execution-timeout).
- **Use-case**: This is most commonly used to limit the execution time of a single [cron scheduled Workflow](#cron-schedule) invocation.
  If this timeout is reached and there is an associated Retry Policy, the Workflow will be retried before any scheduling occurs.
  If there is no Retry Policy then the Workflow will be scheduled per the [cron schedule](#cron-schedule).

##### Task Timeout

- **Description**: This is the maximum amount of time that the Server will wait for the Worker to start processing a [Workflow Task](/docs/glossary/#workflow-task) after the Task has been pulled from the Task Queue.
  The default value is 10 seconds.
- **Use-case**: This is primarily available to recognize whether a Worker has gone down so that the Workflow can be recovered and continue executing on a different Worker.
  The main reason for increasing the default value would be to accommodate a Workflow that has a very long event history that could take longer than 10 seconds for the Worker to load.

### Workflow Id

A Workflow Id identifies a [Workflow Execution](/docs/terms/#workflow-execution).
Custom Workflow Ids are supported.
The Workflow Id is meant for business level identification such as a *customer Id* or an *order Id*.
The Temporal Server guarantees the uniqueness of this Id within a [Namespace](/docs/server/namespaces) based on the Workflow Id Re-use Policy.

Any attempt to start a [Workflow Execution](/docs/terms/#workflow-execution) that has the same Id of another Workflow Execution that has a [Re-use Policy](/docs/terms/#workflow-id-re-use-policy) that does not allow it, is going to fail with a **"Workflow execution already started"** error.
It is not possible to have two **open** Workflows with the same Workflow Id, regardless of the [Re-use Policy](/docs/terms/#workflow-id-re-use-policy).
The [Re-use Policy](/docs/terms/#workflow-id-re-use-policy) applies only to closed Workflows.

:::note

A [Workflow Execution](/docs/terms/#workflow-execution) is uniquely identified by its [Namespace](/docs/terms/#namespace), [Workflow Id](/docs/terms/#workflow-id), and [Run Id](/docs/terms/#run-id).

:::

#### Workflow Id Re-use Policy

The [Workflow Id Re-use Policy](/docs/terms/#workflow-id-re-use-policy) is provided when the [Workflow Execution](/docs/terms/#workflow-execution) is started.
The policy lasts as long as the [Retention Period](/docs/terms/#retention-period) that is configured at the [Namespace](/docs/terms/#namespace) level.
The policy determines whether another [Workflow Execution](/docs/terms/#workflow-execution) may be started with the same Id once the [Workflow Execution](/docs/terms/#workflow-execution) that holds this policy is closed.
It is never possible to have two currently executing Workflows with the same [Workflow Id](/docs/terms/#workflow-id).
[Allow Duplicate Policy](/docs/terms/#allow-duplicate-policy) is the default policy, if one is not specified.

##### Allow Duplicate Failed Only

- **Description**: Specifying this means that a [Workflow Execution](/docs/terms/#workflow-execution) is allowed to start only if a previously executed [Workflow Execution](/docs/terms/#workflow-execution) with the same [Workflow Id](/docs/terms/#workflow-id) has failed.
- **Use case**: Use this policy when there is a need to re-execute a failed [Workflow Execution](/docs/terms/#workflow-execution) and guarantee that the successfully completed [Workflow Execution](/docs/terms/#workflow-execution) will not be re-executed.

##### Allow Duplicate

- **Description**: Specifying this means that the [Workflow Execution](/docs/terms/#workflow-execution) is allowed to start independently of a previous [Workflow Execution](/docs/terms/#workflow-execution) with the same Id regardless of its completion status.
  This is the default policy, if one is not specified.
- **Use case**: Use this when it is OK to execute a [Workflow](/docs/terms/#workflow) with the same [Workflow Id](/docs/terms/#workflow-id) again.

##### Reject Duplicate

- **Description**: Specifying this means that no other [Workflow Execution](/docs/terms/#workflow-execution) is allowed to start using the same [Workflow Id](/docs/terms/#workflow-id) at all.
- **Use case**: Use this when there can only be one Workflow execution per Workflow Id within a Namespace retention period.

### Child Workflows

If a Workflow Execution is started by another Workflow Execution, then it is considered a Child Workflow.
The completion or failure of a Child Workflow is reported to the Workflow that started it (the Parent Workflow).

The following is a list of some of the more common reasons why you might want to break up code execution into Child Workflows:

- Execute code using a different set of Workers.
- Enable invocation from multiple Workflows.
- Workaround event history size limits.
- Create one-to-one mappings between a Workflow Id and some other resource.
- Execute some periodic logic.

One of the main reasons you would not want to use a Child Workflow is the lack of a shared state with the Parent Workflow.
A Parent and Child Workflow can communicate only through asynchronous signals.
If the executing logic has tight coupling between Workflows, it may simply be easier to use a single Workflow that can rely on a shared object's state.

#### Child Workflow Options

##### Parent Close Policy

When creating a Child Workflow, you can define a [`ParentClosePolicy`](https://github.com/temporalio/api/blob/c1f04d0856a3ba2995e92717607f83536b5a44f5/temporal/api/enums/v1/workflow.proto#L44) that terminates, cancels, or abandons the Workflow Execution if the child's parent stops execution:

- `ABANDON`: When the parent stops, don't do anything with the Child Workflow.
- `TERMINATE`: When the parent stops, terminate the Child Workflow
- `REQUEST_CANCEL`: When the parent stops, terminate the Child Workflow

You can set policies per child, which means you can opt out of propagating terminates / cancels on a per-child basis.
This is useful for starting Child Workflows asynchronously (see [relevant issue here](https://community.temporal.io/t/best-way-to-create-an-async-child-workflow/114) or the corresponding SDK docs).

### Cron Workflow

#### Cron Schedule

When you specify a cron schedule while starting the Workflow, the Temporal Server will treat the Workflow as a cron job.
It is that simple to ensure your Workflow runs on a specific schedule.

The Server only schedules the next run after the current run has completed, failed, or timed out.
If a Retry Policy is supplied, and the Workflow fails or timed out, the Workflow will be retried based on the Retry Policy. While the Workflow is retrying, the Server will not schedule the next run.
If the next scheduled run is due to occur while the Workflow is still running (or retrying), then the Server will skip that scheduled run.
A cron Workflow will not stop until it is terminated or cancelled.

:::note

Scheduling is based on UTC time.

:::

### Search Attributes

When you start a Workflow Execution, you can configure it with search attributes that can be used in complex Workflow visibility search queries.
Read the [search attributes guide](/docs/server/workflow-search) to learn how to enable search attributes in Workflows.

## Activity

An Activity is a business-level function that implements your application logic, such as calling a service or transcoding a media file.

- An Activity usually implements a single well-defined action; it can be short or long running.
- An Activity can be implemented as a synchronous method or fully asynchronously involving multiple processes.
- An Activity can be retried indefinitely according to the provided exponential retry policy.
- If for any reason an Activity is not completed within the specified timeout, an error is reported to the [**Workflow**](#workflow) which decides how to handle it. There is no limit for an Activity duration.
- Activities support an [**Activity Heartbeat**](#activity-heartbeat) that helps to identify timeouts faster in case the Activity execution fails.

### Activity Execution

### Activity Execution Timeouts

The Temporal system does not impose any time limits on Activity Executions by default.
It is the responsibility of the application developer to configure Activity Execution Timeouts.

#### Schedule-To-Start

- **Description**: Maximum time from when an Activity Execution is called to when a Worker has started the Activity Execution.
  The usual reason for this timeout to fire is when all Workers are down or they are not able to keep up with the request rate.
  We recommend setting this timeout to the maximum time a Workflow is willing to wait for an Activity Execution in the presence of all possible Worker outages.
  This timeout **does not** trigger any retries regardless of the Retry Policy.
  Do not use this timeout unless you know what you are doing.
#### Start-To-Close

- **Description**: Maximum time for a single Activity Execution attempt.

#### Schedule-To-Close

- **Description**: Maximum time for the overall Activity Execution, including the time from ScheduleToStart and retries.

#### Heartbeat

- **Description**: Maximum time between Heartbeat requests.
  When an Activity calls the Heartbeat API, the calls will not be sent to the service unless the Heartbeat Timeout is specified.
  If a Heartbeat Timeout is specified then the Activity must call the Heartbeat API within this timeout.
  See [Long Running Activities](#long-running-activities).

Either `ScheduleToClose` or `StartToClose` timeouts are required.

### Activity Heartbeat

An Activity Heartbeat provides the status of an [**Activity Task**](#activity-task) that is being executed to the Temporal server.

- Activity Heartbeats help ensure that [**Activity**](#activity) execution failures and timeouts are identified quickly.
- Activity Heartbeats are implemented in code and are recorded at the discretion of the [Workflow](#workflow) implementation.
- Custom [**Activity**](#activity) progress information can be included in an Activity Heartbeat and can be used when the [**Activity**](#activity) is retried.

### Activity Id

A unique Id that identifies an [Activity Execution](#activity-execution) that is executing. The Id can be generated by the system or it can be provided by the Workflow code that invoked the [**Activity**](#activity). An Activity Id can be used to complete the [**Activity**](#activity) asynchronously.

### Activity Task

A Task that contains invocation information for an [**Activity**](#activity) that is delivered to an [**Activity Worker**](#worker) through and a [**Task Queue**](#task-queue).

- Upon receiving an [**Activity Task**](#activity-task), an [**Activity Worker**](#worker) executes the corresponding [**Activity**](#activity).

### Activity Task Execution



### Activity Task Queue



### Local Activity

A Local Activity is an [**Activity**](#activity) that is invoked directly in the same process by Workflow code.

- While a Local Activity consumes less resources than a normal [**Activity**](#activity), it is subject to shorter durations and a lack of rate limiting.

Some of the Activities are very short lived and do not need the queing semantic, flow control, rate limiting and routing capabilities. For these Temporal supports so called _local Activity_ feature. Local Activities are executed in the same worker process as the Workflow that invoked them. Consider using local Activities for functions that are:

- no longer than a few seconds
- do not require global rate limiting
- do not require routing to specific workers or pools of workers
- can be implemented in the same binary as the Workflow that invokes them

The main benefit of local Activities is that they are much more efficient in utilizing Temporal service resources and have much lower latency overhead comparing to the usual Activity invocation.

## Worker

A Worker is a service that hosts the [**Workflow**](#workflow) and [**Activity**](#activity) implementations.

- A single Worker actually contains both an [**Activity Worker**](#worker) and a [**Workflow Worker**](#worker), abstracting the logical separation and having the ability to execute both types of tasks.
- The Worker polls the Temporal service for [**Tasks**](#task), performs those [**Tasks**](#task), and communicates [**Task**](#task) execution results back to the Temporal service.
- Worker services are developed, deployed, and operated by Temporal customers.

A Worker is a service that does the following:

- Hosts executable [Workflow](/docs/concepts/workflows) and/or [Activity](/docs/concepts/activities) code. (Either can be hosted independently)
- Listens to [Task Queues](/docs/concepts/task-queues) via long polling.

Workers must have access to any resources needed to execute the actions defined in Activities, such as the following:

- Network access for external API calls.
- Credentials for infrastructure provisioning.
- Specialized GPUs for machine learning utilities.

:::note

If you need to process work sequentially on the same machine, the Go SDK also offers a [Sessions API](https://docs.temporal.io/docs/go/sessions/).

:::

See example Worker code for:

- [Go SDK](/docs/go/workers)
- [Java SDK](/docs/java/run-your-first-app-tutorial/#the-worker)
- [PHP SDK](/docs/php/workers)
- [Node SDK](/docs/node/hello-world/#worker)

Note that [Temporal also supports a polyglot programming model](https://github.com/tsurdilo/temporal-polyglot) because you can start workflows by string name and send signals between workflows, including across namespace boundaries.
This means that workflows can be run independently of teams maintaining microservices in different languages.

Workers are external to the Temporal Server

In our tutorials, we show you how to run both the Temporal Server and one Worker on the same machine for local development.

However, a typical production Temporal deployment will have a **fleet** of Workers external to the main Temporal Server cluster.
These can be independently managed by different developer teams, each registering their own sets of Workflows and Activities.

:::note

Temporal Server itself has [internal workers](https://docs.temporal.io/blog/workflow-engine-principles/#system-workflows-1910) for system workflows.
But this is not visible to the developer.

:::

Workers can be encrypted in transit and at rest

The external nature of Workers works very well for data privacy concerns, because the Temporal Server (including our managed Temporal Cloud version) doesn't run any Workflow or Activity code on its machines.
It is solely responsible for orchestrating state transitions and dispatching messages to the next available Worker.

While data transferred in the event histories is [secured by mTLS](https://docs.temporal.io/docs/server/security/#encryption-of-network-traffic), by default, it is still readable at rest in the Temporal Server.

To solve this, Temporal SDKs offer a [Data Converter API](https://docs.temporal.io/docs/java/activities/#activity-interface) that you can use to customize the serialization of data going out of and coming back in to a Worker, with the net effect of guaranteeing that the Temporal Server cannot read sensitive business data.

## Retry Policy

A Retry Policy instructs the Temporal Server on how to retry a Workflow Execution failure or an Activity Execution failure.

- A retry is when an execution is tried again from the very beginning.
- Workflow Executions **do not** start with a default Retry Policy, and therefore **do not** retry by default.
- Activity Executions **do** start with a default Retry Policy and therefore retry by default.
- A custom Retry Policy must be provided when an execution is started.

:::note

Workflow Executions should only be retried in specific scenarios, such as the following:

- Cron  Workflows or some other stateless always-running Workflow Executions that benefit from retries.
- File processing or media encoding Workflow Executions that download files to a host.

:::

The following settings make up a Retry Policy:

### Initial Interval

- **Description**: Amount of time that must elapse before the first retry occurs.
  The default value is 1 second.
- **Use-case**: This is used as the base interval time for the backoff coefficient to multiply against.

### Backoff Coefficient

- **Description**: Retries can occur exponentially.
  The backoff coefficient specifies how fast the retry interval will grow.
  The default value is set to 2.0.
  A backoff coefficient of 1.0 means that the retry interval will always equal the [Initial Interval](#initial-interval).
- **Use-case**: Use this to grow the interval between retries.
  By having a backoff coefficient, the first few retries happens relatively quickly to overcome intermittent failures, but subsequent retries will happen farther and farther apart to account for longer lasting outages.
  Use the [maximum interval option](#maximum-interval) to prevent the coefficient from growing the retry interval too much.

### Maximum Interval

- **Description**: Specifies the maximum interval between retries.
  The default is 100x that of [Initial Interval](#initial-interval).
- **Use-case**: This is useful for coefficients greater than 1.0 as it prevents the interval from growing exponentially infinitely.

### Maximum Attempts

- **Description**: Specifies the maximum number of execution attempts that can be made in the presence of failures.
  If this limit is exceeded, the execution fails without retrying again.
  When this happens an error is returned.
  The default is unlimited.
  Setting it to 0 also means unlimited.
- **Use-case**: This can be used to ensure that retries do not continue indefinitely.
  However, in the majority of cases, we recommend relying on the [Workflow Execution Timeout](/docs/concepts/workflows/#execution-timeout), for Workflow Executions, or the Schedule-To-Close Timeout, for Activity Executions, to limit the duration of the retries, instead of this.

### Non-Retryable Errors

- **Description**: Specifies errors that shouldn't trigger a retry.
- **Use-case**: There may be errors that you know of that should not trigger a retry.
  In this case you can specify them such that if they occur, the given execution will not be retried.

## History

The Event History is an append-log of [**Events**](#event) for your application.

- Event History is durably persisted by the Temporal service, enabling seamless recovery of your application state from crashes or failures.
- It also serves as an audit log for debugging.

Event Handling

Fault-oblivious stateful Workflows can be signaled about an external event. A signal is always point to point destined to a specific Workflow instance. Signals are always processed in the order in which they are received.

There are multiple scenarios for which signals are useful.

Event Aggregation and Correlation

Temporal is not a replacement for generic stream processing engines like Apache Flink or Apache Spark. But in certain scenarios it is a better fit. For example, when all events that should be aggregated and correlated are always applied to to some business entity with a clear Id. And then when a certain condition is met, actions should be executed.

The main limitation is that a single Temporal Workflow has a pretty limited throughput, while the number of Workflows is practically unlimited. So if you need to aggregate events per customer, and your application has 100 million customers and each customer doesn't generate more than 20 events per second, then Temporal would work fine. But if you want to aggregate all events for US customers then the rate of these events would be beyond the single Workflow capacity.

For example, an IoT device generates events and a certain sequence of events indicates that the device should be reprovisioned. A Workflow instance per device would be created and each instance would manage the state machine of the device and execute reprovision Activity when necessary.

Another use case is a customer loyalty program. Every time a customer makes a purchase, an event is generated into Apache Kafka for downstream systems to process. A loyalty service Kafka consumer receives the event and signals a customer Workflow about the purchase using the Temporal `signalWorkflowExecution` API. The Workflow accumulates the count of the purchases. If a specified threshold is achieved, the Workflow executes an Activity that notifies some external service that the customer has reached the next level of loyalty program. The Workflow also executes Activities to periodically message the customer about their current status.


### History Entry

There are two types of History Entries that Temporal tracks for each Workflow Execution

1. [**Commands**](#command)
2. [Events](#events)

History entries are defined as "Event Types" in the Server API [event_type.proto](https://github.com/temporalio/api/blob/master/temporal/api/enums/v1/event_type.proto) file.



- All Events are recorded in the [**Event History**](#event-history).

#### Command

- Command Events are events that correspond to [**Commands**](#command) produced by the [**Workflow Worker**](#worker).
Any action requested by the [**Workflow**](#workflow) durable function is called a Command.

- Scheduling an [**Activity**](#activity), canceling a child [**Workflow**](#workflow), or starting a timer are all Commands for example.
- A [**Workflow Task**](#workflow-task) contains an optional list of Commands.
- A [**Worker**](#worker) executing a [**Workflow**](#workflow) generates a list of Commands as a result to a [**Workflow Task**](#workflow-task). This list is sent to the Temporal service as part of the [**Workflow Task**](#workflow-task) completion request.
- Every Command is recorded in the [**Event History**](#event-history) as an [**Event**](#event). For example, the `StartTimer` command is recorded as a corresponding `TimerStarted` event.

#### Events

- All other events represent various external occurrences that the [**Workflow**] is expected to react to such as an [**Activity**](#activity) completion, a timer firing, a cancellation request, etc.
If you are new to debugging and monitoring your Workflows, check the relevant sections in our [production deployment guide](https://docs.temporal.io/docs/server/production-deployment).

##### Workflow Execution Started

This event type indicates that the workflow execution is started / triggered and contains Workflow execution inputs, as well as Workflow timeout configurations.

##### Workflow Execution Completed

This event type indicates that the Workflow execution has successfully completed and contains Workflow execution results.

##### EVENT_TYPE_WORKFLOW_EXECUTION_FAILED

This event type indicates that the Workflow execution has unsuccessfully completed and contains the Workflow execution error.

##### EVENT_TYPE_WORKFLOW_EXECUTION_TIMED_OUT

This event type indicates that the Workflow execution has timed out by the Temporal Server due to the Workflow having not been completed within timeout settings.

##### EVENT_TYPE_WORKFLOW_EXECUTION_CANCEL_REQUESTED

This event type indicates that a request has been made to cancel the Workflow execution.

##### EVENT_TYPE_WORKFLOW_EXECUTION_CANCELED

This event type indicates that the client has confirmed the cancellation request and the Workflow execution has been cancelled.

##### EVENT_TYPE_WORKFLOW_EXECUTION_SIGNALED

This event type indicates the Workflow has received a Signal event.
The event type contains the Signal name, as well as a Signal payload.

##### EVENT_TYPE_WORKFLOW_EXECUTION_TERMINATED

This event type indicates that the Workflow execution has been forcefully terminated and that likely the terminate Workflow API was called.

##### EVENT_TYPE_WORKFLOW_EXECUTION_CONTINUED_AS_NEW

This event type indicates that the Workflow has successfully completed and a new Workflow has been started within the same transaction.
This event type contains last Workflow execution results as well as new Workflow execution inputs.

##### EVENT_TYPE_WORKFLOW_TASK_SCHEDULED

This event type indicates that the Workflow Task has been scheduled.
The SDK client should now be able to process any new history events.

##### EVENT_TYPE_WORKFLOW_TASK_STARTED

This event type indicates that the Workflow Task has started.
The SDK client has picked up the Workflow Task and is processing new history events.

##### EVENT_TYPE_WORKFLOW_TASK_COMPLETED

This event type indicates that the Workflow Task completed.
The SDK client picked up the Workflow Task, processed new history events, and may or may not ask the Temporal Server to do additional work.
It is possible for the following events to still occur:

- [EVENT_TYPE_ACTIVITY_TASK_SCHEDULED](#event_type_activity_task_scheduled)
- [EVENT_TYPE_TIMER_STARTED](#event_type_timer_started)
- [EVENT_TYPE_UPSERT_WORKFLOW_SEARCH_ATTRIBUTES](#event_type_upsert_workflow_search_attributes)
- [EVENT_TYPE_MARKER_RECORDED](#event_type_marker_recorded)
- [EVENT_TYPE_START_CHILD_WORKFLOW_EXECUTION_INITIATED](#event_type_start_child_workflow_execution_initiated)
- [EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED](#event_type_request_cancel_external_workflow_execution_initiated)
- [EVENT_TYPE_SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED](#event_type_signal_external_workflow_execution_initiated)
- [EVENT_TYPE_WORKFLOW_EXECUTION_COMPLETED](#event_type_workflow_execution_completed)
- [EVENT_TYPE_WORKFLOW_EXECUTION_FAILED](#event_type_workflow_execution_failed)
- [EVENT_TYPE_WORKFLOW_EXECUTION_CANCELED](#event_type_workflow_execution_canceled)
- [EVENT_TYPE_WORKFLOW_EXECUTION_CONTINUED_AS_NEW](#event_type_workflow_execution_continued_as_new)

##### EVENT_TYPE_WORKFLOW_TASK_TIMED_OUT

This event type indicates that the Workflow Task encountered a timeout.
Either an SDK client with a local cache was not available at the time, or it took too long for the SDK client to process the task.

##### EVENT_TYPE_WORKFLOW_TASK_FAILED

This event type indicates that the Workflow Task encountered a failure.
Usually this means that the Workflow was non-deterministic.
However, the Workflow reset functionality also uses this event.

##### EVENT_TYPE_ACTIVITY_TASK_SCHEDULED

This event type indicates that an Activity Task was scheduled.
The SDK client should pick up this activity task and execute.
This event type contains activity inputs, as well as activity timeout configurations.

##### EVENT_TYPE_ACTIVITY_TASK_STARTED

This event type indicates that the Activity Task has started executing.
The SDK client has picked up the Activity Task and is processing the Activity invocation.

##### EVENT_TYPE_ACTIVITY_TASK_COMPLETED

This event type indicates that the Activity Task has completed.
The SDK client has picked up and successfully completed the Activity Task.
This event type contains Activity execution results.

##### EVENT_TYPE_ACTIVITY_TASK_FAILED

This event type indicates that the Activity Task has completed.
The SDK picked up the Activity Task but unsuccessfully completed it.
This event type contains Activity execution errors.

##### EVENT_TYPE_ACTIVITY_TASK_TIMED_OUT

This event type indicates that the Activity has timed out according to the Temporal Server, due to the Activity having not completed within the timeout settings.

##### EVENT_TYPE_ACTIVITY_TASK_CANCEL_REQUESTED

This event type indicates that a request to cancel the Activity has occurred.
The SDK client will be able to confirm cancellation of an Activity during an Activity heartbeat.

##### EVENT_TYPE_ACTIVITY_TASK_CANCELED

This event type indicates that the Activity has been cancelled.

##### EVENT_TYPE_TIMER_STARTED

This event type indicates a timer has started.

##### EVENT_TYPE_TIMER_FIRED

This event type indicates a timer has fired.

##### EVENT_TYPE_TIMER_CANCELED

This event type indicates a Timer has been cancelled.

##### EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED

This event type indicates that a Workflow has requested that the Temporal Server try to cancel another Workflow.

##### EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_FAILED

This event type indicates that Temporal Server could not cancel the targeted Workflow.
This is usually because the target Workflow could not be found.

##### EVENT_TYPE_EXTERNAL_WORKFLOW_EXECUTION_CANCEL_REQUESTED

This event type indicates that the Temporal Server has successfully requested the cancellation of the target Workflow.

##### EVENT_TYPE_EXTERNAL_WORKFLOW_EXECUTION_SIGNALED

This event type indicates that the Temporal Server has successfully Signaled the targeted Workflow.

##### EVENT_TYPE_MARKER_RECORDED

This event type is transparent to the Temporal Server.
The Server will only store it and will not try to understand it.
The SDK client may use it for local activities or side effects.

##### EVENT_TYPE_START_CHILD_WORKFLOW_EXECUTION_INITIATED

This event type indicates that the Temporal Server will try to start a child Workflow.

##### EVENT_TYPE_START_CHILD_WORKFLOW_EXECUTION_FAILED

This event type indicates a child Workflow execution cannot be started / triggered.
It is usually due to a child Workflow ID collision.

##### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_STARTED

This event type indicates a child Workflow execution has successfully started / triggered.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_STARTED](#event_type_workflow_execution_started) to be recorded for the Workflow that has started.

##### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_COMPLETED

This event type indicates that the child Workflow execution has successfully completed.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_COMPLETED](#event_type_workflow_execution_completed) to be recorded for the Workflow that has completed.

##### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_FAILED

This event type indicates that the child Workflow execution has unsuccessfully completed.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_FAILED](#event_type_workflow_execution_failed) to be recorded for the Workflow that has failed.

##### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_CANCELED

This event type indicates that the child Workflow execution has been cancelled.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_CANCELED](#event_type_workflow_execution_canceled) to be recorded for the Workflow that was canceled.

##### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_TIMED_OUT

This event type indicates that the child Workflow execution has timed out by the Temporal Server.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_TIMED_OUT](#event_type_workflow_execution_timed_out) to be recorded for the Workflow that timed out.

##### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_TERMINATED

This event type indicates that the child Workflow execution has been terminated.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_TERMINATED](#event_type_workflow_execution_terminated) to be recorded for the Workflow that was terminated.

##### EVENT_TYPE_SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED

This event type indicates that the Temporal Server will try to Signal the targeted Workflow.
This event type contains the Signal name, as well as a Signal payload.

##### EVENT_TYPE_SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_FAILED

This event type indicates that the Temporal Server cannot Signal the targeted Workflow, usually because the Workflow could not be found.

##### EVENT_TYPE_UPSERT_WORKFLOW_SEARCH_ATTRIBUTES

This event type indicates that the Workflow search attributes should be updated and synchronized with the visibility store.


## Archival

Archival is a feature that automatically moves [**Event Histories**](#event-history) from normal persistence to a blob store after the [**Workflow**](#workflow) retention period.

- The purpose of Archival is to be able to keep [**Event Histories**](#event-history) as long as needed while not overwhelming the persistence store.
- There are two reasons why you may want to keep [**Event Histories**](#event-history) after the retention period has passed:
  1. Compliance: For legal reasons, [**Event Histories**](#event-history) may need to be stored for a long period of time.
  2. Debugging: Older [**Event Histories**](#event-history) can be referenced to help with debugging.

## Client Stub

A Client Stub is a client-side proxy in the Java SDK which is used to make remote invocations on an entity that it represents.

- To start a [**Workflow**](#workflow), for example, a Stub object which represents the [**Workflow**](#workflow) is created through a special API. Then the Stub is used to start, query, or signal the corresponding [**Workflow**](#worker).
- The Go SDK does not make use of Client Stubs.


## Signal

A Signal is an external asynchronous request to a [**Workflow**](#workflow).

- A Signal can be used to deliver notifications or updates to a running [**Workflow**](#workflow) at any point in its existence.

Human Tasks

A lot of business processes involve human participants. The standard Temporal pattern for implementing an external interaction is to execute an Activity that creates a human task in an external system. It can be an email with a form, or a record in some external database, or a mobile app notification. When a user changes the status of the task, a signal is sent to the corresponding Workflow. For example, when the form is submitted, or a mobile app notification is acknowledged. Some tasks have multiple possible actions like claim, return, complete, reject. So multiple signals can be sent in relation to it.

Process Execution Alteration

Some business processes should change their behavior if some external event has happened. For example, while executing an order shipment Workflow, any change in item quantity could be delivered in a form of a signal.

Another example is a service deployment Workflow. While rolling out new software version to a Kubernetes cluster some problem was identified. A signal can be used to ask the Workflow to pause while the problem is investigated. Then either a continue or a rollback signal can be used to execute the appropriate action.

Synchronization

Temporal Workflows are strongly consistent so they can be used as a synchronization point for executing actions. For example, there is a requirement that all messages for a single user are processed sequentially but the underlying messaging infrastructure can deliver them in parallel. The Temporal solution would be to have a Workflow per user and signal it when an event is received. Then the Workflow would buffer all signals in an internal data structure and then call an Activity for every signal received. See the following [Stack Overflow answer](https://stackoverflow.com/a/56615120/1664318) for an example.

## Query

From the caller's point of view, a Query is a synchronous operation that is used to report the state of a [**Workflow**](#workflow).

- Query logic is implemented as code within a [**Workflow**](#workflow).
- A Query is inherently read only and cannot affect a Workflow state.

Synchronous Query

Workflow code is stateful with the Temporal framework preserving it over various software and hardware failures. The state is constantly mutated during Workflow execution. To expose this internal state to the external world Temporal provides a synchronous query feature. From the Workflow implementer point of view the query is exposed as a synchronous callback that is invoked by external entities. Multiple such callbacks can be provided per Workflow type exposing different information to different external systems.

To execute a query an external client calls a synchronous Temporal API providing _namespace, workflowId, query name_ and optional _query arguments_.

Query callbacks must be read-only not mutating the Workflow state in any way. The other limitation is that the query callback cannot contain any blocking code. Both above limitations rule out ability to invoke Activities from the query handlers.

Temporal team is currently working on implementing _update_ feature that would be similar to query in the way it is invoked, but would support Workflow state mutation and local Activity invocations.

Stack Trace Query

The Temporal client libraries expose some predefined queries out of the box. Currently the only supported built-in query is _stack_trace_. This query returns stacks of all Workflow owned threads. This is a great way to troubleshoot any Workflow in production.


## Task

A Task is the context needed to execute a specific [**Activity**](#activity) or [**Workflow**](#workflow) state transition.

- There are two types of tasks:
  1. [**Activity Task**](#activity-task)
  2. [**Workflow Task**](#workflow-task)
- A single [**Activity**](#activity) execution corresponds to a single [**Activity Task**](#activity-task), while a [**Workflow Execution**](#workflow-execution) employs multiple [**Workflow Tasks**](#workflow-task).

### Task Queue

A Task Queue is the mechanism by which any given Worker knows what to execute.
The Temporal Server places Tasks into a Task Queue.
The Task Queues are first in first out.
A Worker will engage in a long poll of the Task Queue that it listens to in order to pick up a Task.
A Workflow Execution can only be associated with a single Task Queue name, just as a Worker can only subscribe to a single Task Queue name.
The name of a Task Queue must be specified whenever a Workflow Execution or a Worker is started.

Logically, a Task Queue name logically represents both a Workflow Task Queue and an Activity Task Queue.

Activities are dispatched to workers through task queues. Task queues are queues that workers listen on. Task queues are highly dynamic and lightweight. They don't need to be explicitly registered. And it is okay to have one task queue per worker process. It is normal to have more than one Activity type to be invoked through a single task queue. And it is normal in some cases (like host routing) to invoke the same Activity type on multiple task queues.

Here are some use cases for employing multiple Activity task queues in a single Workflow:

- _Flow control_. A worker that consumes from a task queue asks for an Activity task only when it has available capacity. So workers are never overloaded by request spikes. If Activity executions are requested faster than workers can process them, they are backlogged in the task queue.
- _Throttling_. Each Activity worker can specify the maximum rate it is allowed to process Activities on a task queue. It does not exceed this limit even if it has spare capacity. There is also support for global task queue rate limiting. This limit works across all workers for the given task queue. It is frequently used to limit load on a downstream service that an Activity calls into.
- _Deploying a set of Activities independently_. Think about a service that hosts Activities and can be deployed independently from other Activities and Workflows. To send Activity tasks to this service, a separate task queue is needed.
- _Workers with different capabilities_. For example, workers on GPU boxes vs non GPU boxes. Having two separate task queues in this case allows Workflows to pick which one to send Activity an execution request to.
- _Routing Activity to a specific host_. For example, in the media encoding case the transform and upload Activity have to run on the same host as the download one.
- _Routing Activity to a specific process_. For example, some Activities load large data sets and caches it in the process. The Activities that rely on this data set should be routed to the same process.
- _Multiple priorities_. One task queue per priority and having a worker pool per priority.
- _Versioning_. A new backwards incompatible implementation of an Activity might use a different task queue.


There are a few different perspectives from which we can talk about Task Queues.

From a high level, we can say that a Task Queue is exactly what the name suggests.
It is a "first-in-first-out" queue for Tasks, where a Task is the context needed to execute a chunk of code that alters the "state" of a <a href={props.workflowLink}>Workflow</a>.

Task Queues are maintained by the [Temporal Server](/docs/server/introduction).
The Server places Tasks into a Task Queue to schedule, start, cancel, and complete parts of a Workflow and/or Activity, for example.
A <a href={props.workerLink}>Worker</a> engages in a long poll with a Task Queue, hungrily waiting for a Task to become available.
The Worker then executes what ever the Task tells the Worker to do.

From the perspective of a developer, using the SDK, Task Queues are one of the means by which you associate a Worker with a Workflow and/or Activity.
In this case, you can learn about how to implement Task Queues within the context of the language you are writing your application in:

- [Go](/docs/go/task-queues)
- [Java](/docs/java/task-queues)
- [PHP](/docs/php/task-queues)

From the perspective of the system's design and how everything works under the hood, things get a little bit more complex.

We intend to explain this in more detail in future system design and architecture docs.

Temporal Task Queues are a little bit different from commonly used queuing technologies.
The main difference being that they do not require explicit registration and are created on demand.
Task Queues are very lightweight and there is no limit to the total number of Task Queues that the system can handle.

There are multiple advantages of using a Task Queue to deliver Tasks to a Worker, instead of invoking actions via a synchronous RPC.

- Workers do not need to have any open ports, which is more secure.
- Workers do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Workers are down, messages simply persist in a Task Queue, waiting for the Workers to recover.
- A Worker polls for a message only when it has spare capacity, avoiding overloading itself.
- Task Queues enable a sort of automatic load balancing across a large number of Workers.
- Task Queues support server side throttling, which enables you to limit the Task dispatching rate to the pool of Workers while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call "Task routing", which is the routing of specific Tasks to specific Workers or even a specific process.

:::note

All Workers listening to a given Task Queue must have identical registration of Activities/Workflows.
The one exception to this is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.

:::

File processing tends to be one of the best examples of why you might need to route a Task to a specific process.

Let's say you have a Workflow with the following three Activities:

- Activity to download a file.
- Activity to process the file in some way.
- Activity to upload a file to another location.

In a real life scenario, you would want to have many Workers involved in order to scale the processing of many files simultaneously.

The first Activity, to download the file, could occur on any Worker.
However, the second and third Activities must be executed by a Worker on the same host where the first Activity downloaded the file.

You can use Task Queues and dedicated Workers to handle this scenario in an elegant way.

You can find implementation examples that illustrate this technique for the following languages:

- [Java file processing example](https://github.com/temporalio/samples-java/tree/master/src/main/java/io/temporal/samples/fileprocessing)
- [PHP file processing example](https://github.com/temporalio/samples-php/tree/master/app/src/FileProcessing)

The Go SDK comes with a [Session](/docs/go/sessions) feature that abstracts the need to explicitly route tasks for this use case.
The [Go file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing) showcases that as well.


### Task Token

A Task Token is a unique correlation Id for a Temporal [**Activity Execution**](#activity-execution).

- [**Activity**](#activity) completion calls take either a single Task Token, or the [**Namespace**](#namespace), [**Workflow Id**](#workflow-id), and [**Activity Id**](#activity-id) as a set of arguments.

## Long Running Activities

For long running Activities, we recommended that you specify a relatively short heartbeat timeout and constantly heartbeat. This way worker failures for even very long running Activities can be handled in a timely manner. An Activity that specifies the heartbeat timeout is expected to call the heartbeat method _periodically_ from its implementation.

A heartbeat request can include application specific payload. This is useful to save Activity execution progress. If an Activity times out due to a missed heartbeat, the next attempt to execute it can access that progress and continue its execution from that point.

Long running Activities can be used as a special case of leader election. Temporal timeouts use second resolution. So it is not a solution for realtime applications. But if it is okay to react to the process failure within a few seconds, then a Temporal heartbeat Activity is a good fit.

One common use case for such leader election is monitoring. An Activity executes an internal loop that periodically polls some API and checks for some condition. It also heartbeats on every iteration. If the condition is satisfied, the Activity completes which lets its Workflow to handle it. If the Activity worker dies, the Activity times out after the heartbeat interval is exceeded and is retried on a different worker. The same pattern works for polling for new files in Amazon S3 buckets or responses in REST or other synchronous APIs.

## Cancellation

A Workflow can request an Activity cancellation.
Currently the only way for an Activity to learn that it was cancelled is through heart beating.
The heartbeat request fails with a special error indicating that the Activity was cancelled.
Then it is up to the Activity implementation to perform all the necessary cleanup and report that it is done with it.
It is up to the Workflow implementation to decide if it wants to wait for the Activity cancellation confirmation or just proceed without waiting.

Another common case for Activity heartbeat failure is that the Workflow that invoked it is in a completed state. In this case an Activity is expected to perform cleanup as well.


## Asynchronous Activity Completion

By default an Activity is a function or a method depending on a client side library language. As soon as the function returns, an Activity completes. But in some cases an Activity implementation is asynchronous. For example it is forwarded to an external system through a message queue. And the reply comes through a different queue.

To support such use cases, Temporal allows Activity implementations that do not complete upon Activity function completions. A separate API should be used in this case to complete the Activity. This API can be called from any process, even in a different programming language, that the original Activity worker used.

## Temporal Server

The Temporal Server is highly scalable and multi-tenant, capable of running millions of Workflows simultaneously.
It employs various sharding techniques to ensure scalability internally.
And it is capable of scaling horizontally by running multiple instances on multiple hosts.

The Server itself does not execute application code, but instead tracks the state of it using queues, timers, and a database.

### Multi-cluster

The "Server" itself is actually a cluster of four services and a database.

Instances of the Server can run as independent processes or be grouped together into shared processes on one or more physical or virtual machines. But for live environments make sure each service is running independently, as they each have different scale out requirements and troubleshooting becomes easier.

### Namespace

Temporal is backed by a multi-tenant service and the unit of isolation is called a Namespace.

- By default a Temporal service is provisioned with a "default" Namespace. All APIs and tools, such as the UI and CLI, default to the "default" Namespace if it is not specified. So, if you are not planning to use multiple Namespaces, we recommend using the default one.
- [**Task Queue**](#task-queue) names as well as [**Workflow Ids**](#workflow-id) correspond to a specific Namespace. For example, when a Workflow is started, it is started within a specific Namespace.
- Temporal guarantees a unique [**Workflow Id**](#workflow-id) within a Namespace, and supports running [**Workflow Executions**](#workflow-execution) to use the same [**Workflow Id**](#workflow-id) if they are in different Namespaces.
- Various configuration options like the retention period or Archival destination are configured per Namespace as well through a special CRUD API or through [`tctl`](/docs/system-tools/tctl/).
- In a multi-cluster deployment, Namespace is a unit of fail-over.
- Each Namespace can only be active on a single Temporal cluster at a time. However, different Namespaces can be active in different clusters and can fail-over independently.

### Frontend service

The Frontend service exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto) that is used by applications to connect to the Server.

The Frontend service is responsible for all in-bound calls, including cross-dc related calls that are invoked by a remote cluster.

It talks to the Matching service, History service, Worker service, and the database.

It uses the grpcPort 7233 to host the service handler.
It uses port 6933 for membership related communication with other hosts.

### History service

The History service manages Workflow state transitions.
This service can scale internally by having multiple instances.

It talks to the Frontend service, Matching service, and the database.

It uses grpcPort 7234 to host the service handler.
It uses port 6934 for membership related communication.

### Matching service

The Matching service is responsible for hosting Task Queues for Task dispatching.
This service can scale internally by having multiple instances.

It talks to the Frontend service, History service, and the database.

It uses grpcPort 7235 to host the service handler.
It uses port 6935 for membership related communication.

### Worker service

The Worker service runs background processing for the replication queue, system Workflows, and in versions older than 1.5.0, the Kafka visibility processor.

It talks to the Frontend service.

It uses grpcPort 7239 to host the service handler.
It uses port 6939 for membership related communication.

### Persistence

Cassandra, MySQL, and PostgreSQL schemas are supported and thus can be used as the Server's database.

The database stores Tasks, Workflow data, Events, and visibility data.

![](/img/docs/temporal-server-database-simple.png)
