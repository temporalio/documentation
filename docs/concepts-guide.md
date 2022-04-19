---
id: concepts-guide
title: Temporal conceptual guide
sidebar_label: Concepts guide
description: This guide is meant to be a comprehensive overview of Temporal concepts.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Temporal

Temporal is a scalable and reliable runtime for Reentrant Processes called [Temporal Workflow Executions](/docs/concepts/what-is-a-workflow-execution).

<!-- TODO content more appropriate for blog
:::note [Temporal's tenth rule](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule)

Any sufficiently complex distributed system contains an ad-hoc, informally-specified, bug-ridden, slow implementation of half of temporal.io.

:::
-->

![The Temporal System](/diagrams/temporal-system-simple.svg)

### Temporal Platform

The Temporal Platform consists of a [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster) and [Worker Processes](/docs/concepts/what-is-a-worker-process).
Together these components create a runtime for Workflow Executions.

![The Temporal Platform (runtime)](/diagrams/temporal-platform-simple.svg)

The Temporal Cluster is open source and can be operated by you.
The Temporal Cloud is a set of Clusters operated by us.

Worker Processes are hosted by you and execute your code.
They communicate with a Temporal Cluster via gRPC.

### Temporal Application

A Temporal Application is a set of [Temporal Workflow Executions](/docs/concepts/what-is-a-workflow-execution).
Each Temporal Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and communicates with other Workflow Executions and the environment via message passing.

A Temporal Application can consist of millions to billions of Workflow Executions.
Workflow Executions are lightweight components.
A Workflow Execution consumes few compute resources; in fact, if a Workflow Execution is suspended, such as when it is in a waiting state, the Workflow Execution consumes no compute resources at all.

**Reentrant Process**

A Temporal Workflow Execution is a Reentrant Process. A Reentrant Process is resumable, recoverable, and reactive.

- Resumable: Ability of a process to continue execution after execution was suspended on an _awaitable_.
- Recoverable: Ability of a process to continue execution after execution was suspended on a _failure_.
- Reactive: Ability of a process to react to external events.

Therefore, a Temporal Workflow Execution executes a [Temporal Workflow Definition](/docs/concepts/what-is-a-workflow-definition), also called a Temporal Workflow Function, your application code, exactly once and to completion—whether your code executes for seconds or years, in the presence of arbitrary load and arbitrary failures.

### Temporal SDK

A Temporal SDK is a language-specific library that offers APIs to do the following:

1. Construct and use a [Temporal Client](#what-is-a-temporal-client)
2. Develop [Workflow Definitions](/docs/concepts/what-is-a-workflow-definition)
3. Develop [Worker Programs](/docs/concepts/what-is-a-worker-program)

A Temporal SDK enables you to write your application code using the full power of the programming language, while the Temporal Platform handles the durability, reliability, and scalability of the application.

Temporal currently offers the following SDKs:

- [How to use the Go SDK](/docs/go/)
- [How to use the Java SDK](/docs/java/)
- [How to use the PHP SDK](/docs/php/introduction)
- [How to use the TypeScript SDK](/docs/typescript/introduction)

### What is a Temporal Client?

A Temporal Client is available in each SDK and provides a set of APIs to communicate with a [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster).

The most common operations that a Temporal Client enables you to perform are the following:

- Start a Workflow Execution.
- Get the result of Workflow Execution.
- Signal a Workflow Execution.
- Query a Workflow Execution.
- List Workflow Executions.

### SDK metrics

- [SDK metrics reference](/docs/reference/sdk-metrics)

## Workflows

In day-to-day conversations, the term _Workflow_ frequently denotes either a [Workflow Type](/docs/concepts/what-is-a-workflow-type), a [Workflow Definition](/docs/concepts/what-is-a-workflow-definition), or a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).
Temporal documentation aims to be explicit and differentiate between them.

### Workflow Definition

A Workflow Definition is the code that defines the constraints of a Workflow Execution.

A Workflow Definition is often also referred to as a Workflow Function.
In Temporal's documentation, a Workflow Definition refers to the source for the instance of a Workflow Execution, while a Workflow Function refers to the source for the instance of a Workflow Function Execution.

A Workflow Execution effectively executes once to completion, while a Workflow Function Execution occurs many times during the life of a Workflow Execution.

We strongly recommend that you write a Workflow Definition in a language that has a corresponding Temporal SDK.

- [How to develop a Workflow Definition in Go](/docs/go/how-to-develop-a-workflow-definition-in-go)
- [How to develop a Workflow Definition in Java](/docs/java/how-to-develop-a-workflow-definition-in-java)
- [How to develop a Workflow Definition in PHP](/docs/php/workflows)
- [How to develop a Workflow Definition in TypeScript](/docs/typescript/workflows/#how-to-write-a-workflow-function)

### Deterministic constraints

A critical aspect of developing Workflow Definitions is ensuring they exhibit certain deterministic traits – that is, making sure that the same Commands are emitted in the same sequence, whenever a corresponding Workflow Function Execution (instance of the Function Definition) is re-executed.

The execution semantics of a Workflow Execution include the re-execution of a Workflow Function.
The use of Workflow APIs in the function is what generates [Commands](/docs/concepts/what-is-a-command).
Commands tell the Cluster which Events to create and add to the Workflow Execution's Event History.
When a Workflow Function executes, the Commands that are emitted are compared with the existing Event History.
If a corresponding Event already exists within the Event History that maps to the generation of that Command in the same sequence, and some specific metadata of that Command matches with some specific metadata of the Event, then the Function Execution progresses.

For example, using an SDKs "Execute Activity" API generates the [ScheduleActivityTask](/docs/concepts/what-is-a-command#scheduleactivitytask) Command.
When this API is called upon re-execution, that Command is compared with the Event that is in the same location within the sequence.
The Event in the sequence must be an [ActivityTaskScheduled](/docs/concepts/what-is-an-event/#activitytaskscheduled) Event, where the Activity Name and the Task Queue name are the same as what is in the Command.

If a generated Command doesn't match what it needs to in the existing Event History, then the Workflow Execution returns a _non-deterministic_ error.

The following are the two reasons why a Command might be generated out of sequence or the wrong Command might be generated altogether:

1. Code changes are made to a Workflow Definition that is in use by a running Workflow Execution.
2. There is intrinsic non-deterministic logic (such as inline random branching).

#### Code changes can cause non-deterministic behavior

The Workflow Definition can change in very limited ways once there is a Workflow Execution depending on it.
To alleviate non-deterministic issues that arise from code changes, we recommend using [Workflow Versioning](#what-is-workflow-versioning).

For example, let's say we have a Workflow Definition that defines the following sequence:

1. Start and wait on a Timer/sleep
2. Spawn and wait on an Activity Execution
3. Complete

We start a Worker and spawn a Workflow Execution that uses that Workflow Definition.
The Worker would emit the [StartTimer](/docs/concepts/what-is-a-command/#starttimer) Command and the Workflow Execution would become suspended.

Before the Timer is up, we change the Workflow Definition to the following sequence:

1. Spawn and wait on an Activity Execution
2. Start and wait on a Timer/sleep
3. Complete

When the Timer fires, the next Workflow Task will cause the Workflow Function to re-execute.
The first Command the Worker sees would be be ScheduleActivityTask Command, which wouldn't match up to the expected [TimerStarted](/docs/concepts/what-is-an-event#timerstarted) Event.

The Workflow Execution would fail, and return the non-determinism error.

The following are examples of minor changes that would not result in non-determinism errors when re-executing a History which already contain the Events:

- Changing the duration of a Timer.
- Changing the arguments to:
  - The Activity Options in a call to spawn an Activity Execution (local or nonlocal).
  - The Child Workflow Options in a call to spawn a Child Workflow Execution.
  - Call to Signal an External Workflow Execution.

#### Intrinsic non-deterministic logic

Intrinsic non-determinism is when a Workflow Function Execution might emit a different sequence of Commands on re-execution, regardless of whether all the input parameters are the same.

For example, a Workflow Definition can not have inline logic that branches (emits a different Command sequence) based off a local time setting or a random number.
In the representative pseudocode below, the `local_clock()` function returns the local time, rather than Temporal-defined time:

```text
fn my_workflow() {
  if local_clock().is_before("12pm") {
    await workflow.sleep(duration_until("12pm"))
  } else {
    await my_afternoon_activity()
  }
}
```

Each Temporal SDK offers APIs that enable Workflow Definitions to have logic that gets and uses time, random numbers, and data from unreliable resources.
When those APIs are used, the results are stored as part of the Event History, which means that a re-executed Workflow Function will issue the same sequence of Commands, even if there is branching involved.

In other words, all operations that do not purely mutate the Workflow Execution's state should occur through a Temporal SDK API.

### What is Workflow Versioning?

The Workflow Versioning feature enables the creation of logical branching inside a Workflow Definition based on a developer specified version identifier.
This feature is useful for Workflow Definition logic needs to be updated, but there are running Workflow Executions that currently depends on it.
It is important to note that a practical way to handle different versions of Workflow Definitions, without using the versioning API, is to run the different versions on separate Task Queues.

- [How to version Workflow Definitions in Go](/docs/go/versioning)
- [How to version Workflow Definitions in Java](/docs/java/versioning)
- [How to version Workflow Definitions in TypeScript](/docs/typescript/patching)

### Handling unreliable Worker Processes

You do not handle Worker Process failure or restarts in a Workflow Definition.

Workflow Function Executions are completely oblivious to the Worker Process in terms of failures or downtime.
The Temporal Platform ensures that the state of a Workflow Execution is recovered and progress resumes if there is an outage of either Worker Processes or the Temporal Cluster itself.
The only reason a Workflow Execution might fail is due to the code throwing an error or exception, not because of underlying infrastructure outages.

<Tabs
defaultValue="go"
groupId="site-lang"
values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'},{label: 'PHP', value: 'php'},{label: 'Typescript', value: 'typescript'},]}>

<TabItem value="go">


In the Temporal Go SDK programming model, a [Workflow Definition](/docs/concepts/what-is-a-workflow-definition) is an exportable function.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

### Workflow parameters in Go

The first parameter of a Go-based Workflow Definition must be of the [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#Context) type, as it is used by the Temporal Go SDK to pass around Workflow Execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow) package.

```go
import (
    "go.temporal.io/sdk/workflow"
)

func YourWorkflowDefinition(ctx workflow.Context, param string) error {
  // ...
}
```

The `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference between `workflow.Context` and `context.Context` is that the `Done()` function, provided by `workflow.Context`, returns `workflow.Channel` instead of the standard Go `chan`.

The second parameter, `string`, is a custom parameter that is passed to the Workflow when it is invoked.
A Workflow Definition may support multiple custom parameters, or none.
However, the best practice is to pass a single parameter that is of a `struct` type so there can be some backward compatibility if new parameters are added.

```go
type YourWorkflowParam struct {
  WorkflowParamFieldOne string
  WorkflowParamFieldTwo int
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  // ...
}
```

All Workflow Definition parameters must be serializable, which means that parameters can’t be channels, functions, variadic, or unsafe pointers.

### Workflow return values in Go

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.

```go
type YourWorkflowResponse struct{
  WorkflowResultFieldOne string
  WorkflowResultFieldTwo int
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  if err != nil {
    return "", err
  }
  responseVar := YourWorkflowResponse {
    FieldOne: "super",
    FieldTwo: 1,
  }
  return responseVar, nil
}
```

A Workflow Definition written in Go can return both a custom value and an error.
However, it is not possible to receive both a custom value and an error in the calling process as is normal in Go.
The caller will receive either one or the other.
Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be [Terminated](#) and any custom return values will be ignored by the system.

### Workflow logic requirements in Go

Workflow Definition code cannot directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized.
  Instead you can collect the keys of the map, sort them, and then iterate over the sorted keys to access the map.
  This technique provides deterministic results.
  You can also use a Side Effect or an Activity to process the map instead.
- Call an external API, conduct a file I/O operation, talk to another service, etc. (Use an Activity for these.)

Additionally the Temporal Go SDK offers APIs to handle equivalent Go constructs:

- `workflow.Now()` This is a replacement for `time.Now()`.
- `workflow.Sleep()` This is a replacement for `time.Sleep()`.
- `workflow.GetLogger()` This ensures that the provided logger does not duplicate logs during a replay.
- `workflow.Go()` This is a replacement for the `go` statement.
- `workflow.Channel` This is a replacement for the native `chan` type.
  Temporal provides support for both buffered and unbuffered channels.
- `workflow.Selector` This is a replacement for the `select` statement. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page
- `workflow.Context` This is a replacement for `context.Context`. Learn more on the [Go SDK Context Propagation](https://docs.temporal.io/docs/go/tracing) page.


</TabItem>
<TabItem value="java">

Content is not available

</TabItem>
<TabItem value="php">

Content is not available

</TabItem>
<TabItem value="typescript">

Content is not available

</TabItem>
</Tabs>

### Workflow Type

A Workflow Type is a name that maps to a Workflow Definition.

- A single Workflow Type can be instantiated as multiple Workflow Executions.
- A Workflow Type is scoped by a Task Queue.
  It is acceptable to have the same Workflow Type name map to different Workflow definitions if they are using completely different Workers.

![Workflow Type cardinality with Workflow Definitions and Workflow Executions](/diagrams/workflow-type-cardinality.svg)

### Workflow Execution

A Workflow Execution is a Reentrant Process; that is, a resumable, recoverable, and reactive process:

- Resumable: Ability of a process to continue execution after execution was suspended on an await-able.
- Recoverable: Ability of a process to continue execution after execution was suspended on a failure.
- Reactive: Ability of a process to react to external events.

A Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and can communicate with other Workflow Executions using Signals.

A Workflow Execution is either Running or Closed.
When a Workflow Execution is Running, it is either actively progressing or suspended, awaiting on something.

![Workflow Execution Running status](/diagrams/workflow-execution-running-status.svg)

A Closed status means that the Workflow Execution has finished progressing, and has either Completed successfully, Continued As New, Failed, Timed Out, been Canceled, or Terminated.

![Workflow Execution statuses](/diagrams/workflow-execution-statuses.svg)

A Workflow Execution is uniquely identified by its [Namespace](/docs/concepts/what-is-a-namespace), [Workflow Id](/docs/concepts/what-is-a-workflow-id), and [Run Id](/docs/concepts/what-is-a-run-id).

The Workflow Id can be used to create a 1:1 mapping between a Workflow Execution and some other resource, such as a customer Id, order Id, or host Id.

**Is there a limit to how long Workflows can run?**

It's sometimes necessary to limit the amount of time that a specific Workflow can run.
Though, unlike [Activities](/docs/concepts/what-is-an-activity), Workflow timeouts are available primarily to protect the system from "runaway" Workflows that may end up consuming too many resources, and not intended to be used as a part of the business logic.
There are a few important things to consider with Workflow timeout settings:

1. When a Workflow times out, it is terminated without any notifications available to another application.
2. You should always account for possible outages, such that if your Workers go down for an hour, all of your Workflows won't time out.
   Start with infinite timeouts.
3. The SDKs come equipped with timers and sleep APIs that can be used directly inside of Workflows to handle business logic related timeouts.

Workflows intended to run indefinitely should be written with some care.
Temporal stores the complete event history for the entire lifecycle of a Workflow Execution.
There is a maximum limit of 50,000 events that is enforced by the Server, and you should try to avoid getting close to this limit; The Temporal Server puts out a warning at every 10,000 events.

The idiomatic way to handle indefinitely running Workflows is to use the "Continue-as-new" feature, which is available in all SDKs.
For example, a reasonable cutoff point might be once a day for high volume Workflows.

The "Continue-as-new" feature completes the current Workflow execution and automatically starts a new execution with the same Workflow Id, but different run Id, passing it the appropriate parameters for it to continue.
This keeps the event history within limits, but continues the logic execution.

**How can I load test Workflow Executions?**

The [Temporal stress testing blog post](https://docs.temporal.io/blog/temporal-deep-dive-stress-testing) covers many scenarios under which we test Workflow Executions.

**Implementation guides:**

- [How to spawn a Workflow Execution in Go](/docs/go/how-to-spawn-a-workflow-execution-in-go)

### Workflow Execution Timeout

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

![Workflow Execution Timeout period](/diagrams/workflow-execution-timeout.svg)

**The default value is ∞ (infinite).**
If this timeout is reached, the Workflow Execution changes to a Timed Out status.
This timeout is different from the [Workflow Run Timeout](/docs/concepts/what-is-a-workflow-run-timeout).
This timeout is most commonly used for stopping the execution of a [Temporal Cron Job](/docs/concepts/what-is-a-temporal-cron-job) after a certain amount of time has passed.

- [How to set a Workflow Execution Timeout in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#workflowexecutiontimeout)

### Workflow Run Timeout

A Workflow Run Timeout is the maximum amount of time that a single Workflow Run is restricted to.

![Workflow Run Timeout period](/diagrams/workflow-run-timeout.svg)

**The default is set to the same value as the [Workflow Execution Timeout](/docs/concepts/what-is-a-workflow-execution-timeout).**
This timeout is most commonly used to limit the execution time of a single [Temporal Cron Job Execution](/docs/concepts/what-is-a-temporal-cron-job).

If the Workflow Run Timeout is reached, the Temporal Server automatically Terminates the Workflow Execution.

**Implementation guides:**

- [How to set a Workflow Run Timeout in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#workflowruntimeout)

### Workflow Id

A Workflow Id is a customizable, application-level identifier for a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) that is unique to an Open Workflow Execution within a [Namespace](/docs/server/namespaces).

A Workflow Id is often a business-level customer ID or order ID.

A [Workflow Id Reuse Policy](/docs/concepts/what-is-a-workflow-id-reuse-policy) can be used to manage whether a Workflow Id can be re-used.

It is never possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution.
An attempt to spawn a Workflow Execution with a Workflow Id that is the same as the Id of a currently Open Workflow Execution results in a "Workflow execution already started" error.

You may assign a custom Workflow Id to a Workflow.
This Id is meant for business level identification such as a customer Id or an order Id.
The Temporal Server enforces the uniqueness of the Id, within a [Namespace](/docs/concepts/what-is-a-namespace) based on the Workflow Id re-use policy.

Any attempt to start a Workflow that has the same Id of a Workflow with a re-use policy that does not allow it, is going to fail with a "Workflow execution already started" error.

:::note
It is not possible to have two open Workflows with the same Workflow Id, regardless of the re-use policy.
The re-use policy applies only to closed Workflows.
:::

A Workflow is uniquely identified by its [Namespace](/docs/concepts/what-is-a-namespace), Workflow Id, and [Run Id](/docs/concepts/what-is-a-run-id).

### Workflow Id Reuse Policy

A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

It is never possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution.
An attempt to spawn a Workflow Execution with a Workflow Id that is the same as the Id of a currently Open Workflow Execution results in a "Workflow execution already started" error.

A Workflow Id Reuse Policy has three possible values:

- **Allow Duplicate** The Workflow Execution is allowed to exist regardless of the Closed status of a previous Workflow Execution with the same Workflow Id.
  **This is the default policy, if one is not specified.**
  Use this when it is OK to have a Workflow Execution with the same Workflow Id as a previous, but now Closed, Workflow Execution.
- **Allow Duplicate Failed Only**: The Workflow Execution is allowed to exist only if a previous Workflow Execution with the same Workflow Id does not have a Completed status.
  Use this policy when there is a need to re-execute a Failed, Timed Out, Terminated or Cancelled Workflow Execution and guarantee that the Completed Workflow Execution will not be re-executed.
- **Reject Duplicate**: The Workflow Execution cannot exist if a previous Workflow Execution has the same Workflow Id, regardless of the Closed status.
  Use this when there can only be one Workflow Execution per Workflow Id within a Namespace for the given retention period.

A Workflow Id Reuse Policy applies only if a Closed Workflow Execution with the same Workflow Id exists within the Retention Period of the associated Namespace.
For example, if the Namespace's retention period is 30 days, a Workflow Id Reuse Policy can only compare the Workflow Id of the spawning Workflow Execution against the Closed Workflow Executions for the last 30 days.

If there is an attempt to spawn a Workflow Execution with a Workflow Id Reuse Policy that won't allow it the Server will prevent the Workflow Execution from spawning.

### Run Id

A Run Id is a globally unique, platform-level identifier for a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

Temporal guarantees that only one Workflow Execution with a given [Workflow Id](/docs/concepts/what-is-a-workflow-id) can be in an Open state at any given time.
But when a Workflow Execution reaches a Closed state, it is possible to have another Workflow Execution in an Open state with the same Workflow Id.
For example, a Temporal Cron Job is a chain of Workflow Executions that all have the same Workflow Id.
Each Workflow Execution within the chain is considered a "Run".

A Run Id uniquely identifies a Workflow Execution even if it shares a Workflow Id with other Workflow Executions.

### Workflow Task

A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.

- Every time a new external event that might affect a Workflow state is recorded, a Workflow Task that contains the event is added to a Task Queue and then picked up by a Workflow Worker.
- After the new event is handled, the Workflow Task is completed with a list of [Commands](/docs/concepts/what-is-a-command).
- Handling of a Workflow Task is usually very fast and is not related to the duration of operations that the Workflow invokes.

### Workflow Task Execution

A Workflow Task Execution is when a Worker picks up a Worker Task and uses it to make progress on the execution of a Workflow function.

### Workflow Task Timeout

A Workflow Task Timeout is the maximum amount of time allowed for a [Worker](/docs/concepts/what-is-a-worker) to execute a [Workflow Task](/docs/concepts/what-is-a-workflow-task) after the Worker has pulled that Workflow Task from the [Task Queue](/docs/concepts/what-is-a-task-queue).

![Workflow Task Timeout period](/diagrams/workflow-task-timeout.svg)

**The default value is 10 seconds.**
This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value would be to accommodate a Workflow Execution that has a very long Workflow Execution History that could take longer than 10 seconds for the Worker to load.

**Implementation guides:**

- [How to set a Workflow Task Timeout in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#workflowtasktimeout)

## Activities

In day-to-day conversations, the term _Activity_ frequently denotes either an [Activity Type](/docs/concepts/what-is-an-activity-type), an [Activity Definition](/docs/concepts/what-is-an-activity-definition), or an [Activity Execution](/docs/concepts/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

The purpose of an Activity is to execute a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email.

#### Activities calling Activities

For some use cases, having an Activity call another Activity might seem convenient.
We generally recommend not doing so. Activities are regular functions, so calling one directly is not seen—and therefore not logged—by the Temporal Server.

Instead, move logic out of the Activities and have the parent Workflow use the result of one Activity to call the other Activity.

Fault-oblivious stateful Workflow code is the core abstraction of Temporal.
But, due to deterministic execution requirements, they are not allowed to call any external API directly.
Instead they orchestrate execution of Activities.
In its simplest form, a Temporal Activity is a function or an object method in one of the supported languages.
Temporal does not recover Activity state in case of failures.
Therefore an Activity function is allowed to contain any code without restrictions.

Activities are invoked asynchronously through task queues.
A task queue is essentially a queue used to store an Activity task until it is picked up by an available worker.
The worker processes an Activity by invoking its implementation function.
When the function returns, the worker reports the result back to the Temporal service which in turn notifies the Workflow about completion.
It is possible to implement an Activity fully asynchronously by completing it from a different process.

- An Activity can be implemented as a synchronous method or fully asynchronously involving multiple processes.
- An Activity can be retried indefinitely according to the provided exponential retry policy.
- If for any reason an Activity is not completed within the specified timeout, an error is reported to the [Workflow](#workflow), which decides how to handle it. The duration of an Activity has no limit.
- Activities support an [Activity Heartbeat](#activity-heartbeat) that helps to identify timeouts faster in case the Activity execution fails.

Temporal does not impose any system limit on Activity duration. It is up to the application to choose the timeouts for its execution.

Activities are dispatched to workers through task queues.
Task queues are queues that workers listen on.
Task queues are highly dynamic and lightweight.
They don't need to be explicitly registered. And it is okay to have one task queue per worker process. It is normal to have more than one Activity type to be invoked through a single task queue. And it is normal in some cases (like host routing) to invoke the same Activity type on multiple task queues.

Here are some use cases for employing multiple Activity task queues in a single Workflow:

- _Flow control_. A worker that consumes from a task queue asks for an Activity task only when it has available capacity. So workers are never overloaded by request spikes. If Activity executions are requested faster than workers can process them, they are backlogged in the task queue.
- _Throttling_. Each Activity worker can specify the maximum rate it is allowed to process Activities on a task queue. It does not exceed this limit even if it has spare capacity. There is also support for global task queue rate limiting. This limit works across all workers for the given task queue. It is frequently used to limit load on a downstream service that an Activity calls into.
- _Deploying a set of Activities independently_. Think about a service that hosts Activities and can be deployed independently from other Activities and Workflows. To send Activity tasks to this service, a separate task queue is needed.
- _Workers with different capabilities_. For example, workers on GPU boxes vs non GPU boxes. Having two separate task queues in this case allows Workflows to pick which one to send Activity an execution request to.
- _Routing Activity to a specific host_. For example, in the media encoding case the transform and upload Activity have to run on the same host as the download one.
- _Routing Activity to a specific process_. For example, some Activities load large data sets and cache them in the process. The Activities that rely on this data set should be routed to the same process.
- _Multiple priorities_. One task queue per priority and having a worker pool per priority.
- _Versioning_. A new backwards incompatible implementation of an Activity might use a different task queue.

For long running Activities, we recommend that you specify a relatively short heartbeat timeout and constantly heartbeat. This way worker failures for even very long running Activities can be handled in a timely manner. An Activity that specifies the heartbeat timeout is expected to call the heartbeat method _periodically_ from its implementation.

A heartbeat request can include application specific payload. This is useful to save Activity execution progress. If an Activity times out due to a missed heartbeat, the next attempt to execute it can access that progress and continue its execution from that point.

Long running Activities can be used as a special case of leader election. Temporal timeouts use second resolution. So it is not a solution for realtime applications. But if it is okay to react to the process failure within a few seconds, then a Temporal heartbeat Activity is a good fit.

One common use case for such leader election is monitoring. An Activity executes an internal loop that periodically polls some API and checks for some condition. It also heartbeats on every iteration. If the condition is satisfied, the Activity completes which lets its Workflow to handle it. If the Activity worker dies, the Activity times out after the heartbeat interval is exceeded and is retried on a different worker. The same pattern works for polling for new files in Amazon S3 buckets or responses in REST or other synchronous APIs.

note Cancellations are not immediate

`ctx.Done()` is only signaled when a heartbeat is sent to the service.
Temporal's SDK throttles this so a heartbeat may not be sent to the service until 80% of the heartbeat timeout has elapsed.

For example, if your heartbeat timeout is 20 seconds, `ctx.Done()` will not be signaled until 80% of 20 seconds (~16 seconds) has elapsed.
To increase or decrease the delay of cancelation, modify the heartbeat timeout defined for the activity context.

#### Asynchronous Activity Completion

Asynchronous Activity Completion occurs when the final result of a computation, started by an Activity, is provided to the Temporal System from an external system.

By default, an Activity is a function or method (depending on the language) that completes as soon as the function or method returns. But in some cases an Activity implementation is asynchronous. For example, the action could be forwarded to an external system through a message queue, and the result could come through a different queue.

To support such use cases, Temporal allows Activity implementations that do not complete upon Activity function completions. A separate API should be used in this case to complete the Activity. This API can be called from any process, even in a different programming language, that the original Activity worker used.

### Activity Execution

An Activity Execution is the full chain of [Activity Task Executions](/docs/concepts/what-is-an-activity-task-execution).

![Activity Execution](/diagrams/activity-execution.svg)

### Request Cancellation

A Workflow can request to cancel an Activity Execution.
When an Activity Execution is canceled, or its Workflow Execution has completed or failed, the context passed into its function is canceled, which also sets its channel’s closed state to `Done`.
An Activity can use that to perform any necessary cleanup and abort its execution.

Cancellation requests are only delivered to Activity Executions that Heartbeat:

- The Heartbeat request fails with a special error indicating that the Activity Execution is canceled.
  Heartbeats can also fail when the Workflow Execution that spawned it is in a completed state.
- The Activity should perform all necessary cleanup and report when it is done.
- The Workflow can decide if it wants to wait for the Activity cancellation confirmation or proceed without waiting.

**Implementation guides:**

- [How to spawn an Activity Execution in Go](/docs/go/how-to-spawn-an-activity-execution-in-go)

### Activity Definition

An Activity Definition is the code that defines the constraints of an [Activity Task Execution](/docs/concepts/what-is-an-activity-task-execution).

We strongly recommend that you develop an Activity Definition in a language that has a corresponding Temporal SDK.

**Implementation guides:**

- [How to develop an Activity Definition in Go](/docs/go/how-to-develop-an-activity-definition-in-go)

### Activity Type

An Activity Type is the mapping of a name to an Activity Definition.

Activity Types are scoped via Task Queues.

### Activity Id

A unique Id that identifies an [Activity Execution](/docs/concepts/what-is-an-activity-execution).
The Id can be generated by the system, or it can be provided by the Workflow code that spawns the Activity Execution.
An Activity Id can be used to complete the Activity asynchronously.

### Schedule-To-Start Timeout

A Schedule-To-Start Timeout is the maximum amount of time that is allowed from when an [Activity Task](/docs/concepts/what-is-an-activity-task) is scheduled (that is, placed in a Task Queue) to when a [Worker](/docs/concepts/what-is-a-worker) starts (that is, picks up from the Task Queue) that Activity Task.
In other words, it's a limit for how long an Activity Task can be enqueued.

The moment that the Task is picked by the Worker from the Task Queue is considered to be the start of the Activity Task for the purposes of the Schedule-To-Start Timeout and associated metrics.
This definition of "Start" avoids issues that a clock difference between the Temporal Cluster and a Worker might create.

![Schedule-To-Start Timeout period](/diagrams/schedule-to-start-timeout.svg)

"Schedule" in Schedule-To-Start and Schedule-To-Close have different frequency guarantees.

The Schedule-To-Start Timeout is enforced for each Activity Task, whereas the Schedule-To-Close Timeout is enforced once per Activity Execution.
Thus, "Schedule" in Schedule-To-Start refers to the scheduling moment of _every_ Activity Task in the sequence of Activity Tasks that make up the Activity Execution, while
"Schedule" in Schedule-To-Close refers to the _first_ Activity Task in that sequence.

A [Retry Policy](/docs/concepts/what-is-a-retry-policy) attached to an Activity Execution retries an Activity Task.

![Start-To-Close Timeout period with retries](/diagrams/schedule-to-start-timeout-with-retry.svg)

This timeout has two primary use cases:

1. Detect whether an individual Worker has crashed.
2. Detect whether the fleet of Workers polling the Task Queue is not able to keep up with the rate of Activity Tasks.

**The default Schedule-To-Start Timeout is ∞ (infinity).**

If this timeout is used, we recommend setting this timeout to the maximum time a Workflow Execution is willing to wait for an Activity Execution in the presence of all possible Worker outages, and have a concrete plan in place to reroute Activity Tasks to a different Task Queue.
This timeout **does not** trigger any retries regardless of the Retry Policy, as a retry would place the Activity Task back into the same Task Queue.
We do not recommend using this timeout unless you know what you are doing.

In most cases, we recommend monitoring the `temporal_activity_schedule_to_start_latency` metric to know when Workers slow down picking up Activity Tasks, instead of setting this timeout.

**Implementation guides:**

[How to set a Schedule-To-Start Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#scheduletostarttimeout)

### Start-To-Close Timeout

A Start-To-Close Timeout is the maximum time allowed for a single [Activity Task Execution](/docs/concepts/what-is-an-activity-task-execution).

**The default Start-To-Close Timeout is the same as the default [Schedule-To-Close Timeout](/docs/concepts/what-is-a-schedule-to-close-timeout).**

An Activity Execution must have either this timeout (Start-To-Close) or the [Schedule-To-Close Timeout](/docs/concepts/what-is-a-schedule-to-close-timeout) set.
We recommend always setting this timeout; however, make sure that it is always set to be longer than the maximum possible time for the Activity Execution to take place.
For long running Activity Executions, we recommend also using [Activity Heartbeats](/docs/concepts/what-is-an-activity-heartbeat) and [Heartbeat Timeouts](/docs/concepts/what-is-a-heartbeat-timeout).

The main use case for the Start-To-Close timeout is to detect when a Worker crashes after it has started executing an Activity Task.

![Start-To-Close Timeout period](/diagrams/start-to-close-timeout.svg)

A [Retry Policy](/docs/concepts/what-is-a-retry-policy) attached to an Activity Execution retries an Activity Task Execution.
Thus the Start-To-Close Timeout is applied to each Activity Task Execution within an Activity Execution.

If the first Activity Task Execution returns an error the first time, then the full Activity Execution might look like this:

![Start-To-Close Timeout period with retries](/diagrams/start-to-close-timeout-with-retry.svg)

If this timeout is reached, the following actions occur:

- An [ActivityTaskTimedOut](/docs/concepts/what-is-an-event/#activitytasktimedout) Event is written to the Workflow Execution's mutable state.
- If a Retry Policy dictates a retry, the Temporal Cluster schedules another Activity Task.
  - The attempt count increments by 1 in the Workflow Execution's mutable state.
  - The Start-To-Close Timeout timer is reset.

**Implementation guides:**

- [How to set a Start-To-Close Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#starttoclosetimeout)

### Schedule-To-Close Timeout

A Schedule-To-Close Timeout is the maximum amount of time allowed for the overall [Activity Execution](/docs/concepts/what-is-an-activity-execution), from when the first [Activity Task](/docs/concepts/what-is-an-activity-task) is scheduled to when the last Activity Task, in the chain of Activity Tasks that make up the Activity Execution, reaches a Closed status.

![Schedule-To-Close Timeout period](/diagrams/schedule-to-close-timeout.svg)

Example Schedule-To-Close Timeout period for an Activity Execution that has a chain Activity Task Executions:

![Schedule-To-Close Timeout period with a retry](/diagrams/schedule-to-close-timeout-with-retry.svg)

**The default Schedule-To-Close Timeout is ∞ (infinity).**

An Activity Execution must have either this timeout (Schedule-To-Close) or [Start-To-Close](/docs/concepts/what-is-a-start-to-close-timeout) set.
By default, an Activity Execution Retry Policy dictates that retries will occur for up to 10 years.
This timeout can be used to reduce the overall time that has elapsed, without altering the default Retry Policy.

**Implementation guides:**

- [How to set a Schedule-To-Close Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#scheduletoclosetimeout)

### Activity Heartbeats

An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
Each ping informs the Temporal Cluster that the Activity Execution is making progress and the Worker has not crashed.

Activity Heartbeats work in conjunction with a [Heartbeat Timeout](/docs/concepts/what-is-a-heartbeat-timeout).

Activity Heartbeats are implemented within the Activity Definition.
Custom progress information can be included in the Heartbeat which can then be used by the Activity Execution should a retry occur.

An Activity Heartbeat can be recorded as often as needed (e.g. once a minute or every loop iteration).
Temporal SDKs control the rate at which Heartbeats are sent to the Cluster.

Heartbeating is not required from [Local Activities](/docs/concepts/what-is-a-local-activity), and does nothing.

- [How to Heartbeat an Activity in Go](/docs/go/how-to-heartbeat-an-activity-in-go)

### Heartbeat Timeout

A Heartbeat Timeout is the maximum time between [Activity Heartbeats](/docs/concepts/what-is-an-activity-heartbeat).

![Heartbeat Timeout periods](/diagrams/heartbeat-timeout.svg)

If this timeout is reached, the Activity Execution changes to a Failed status, and will retry if a Retry Policy dictates it.

- [How to set a Heartbeat Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#heartbeattimeout)

## Retry Policy

A Retry Policy is a collection of attributes that instructs the Temporal Server how to retry a failure of a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) or an [Activity Task Execution](/docs/concepts/what-is-an-activity-task-execution).
(Retry Policies do not apply to [Workflow Task Executions](/docs/concepts/what-is-a-workflow-task-execution), which always retry indefinitely.)

**Implementation guides:**

- [How to set a Retry Policy for a Workflow Execution in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#retrypolicy)
- [How to set a custom Retry Policy for Activity Task Executions in Go](/docs/go/how-to-set-activityoptions-in-go/#retrypolicy)

<!-- ![Diagram that shows the retry interval and its formula](/img/retry-interval-diagram.png) -->

### Default behavior

- **Workflow Execution**: When a Workflow Execution is spawned, it is not associated with a default Retry Policy and thus does not retry by default.
  The intention is that a Workflow Definition should be written to never fail due to intermittent issues; an Activity is designed to handle such issues.

- **Activity Execution**: When an Activity Execution is spawned, it is associated with a default Retry Policy, and thus Activity Task Executions are retried by default.
  When an Activity Task Execution is retried, the Cluster places a new [Activity Task](/docs/concepts/what-is-an-activity-task) into its respective [Activity Task Queue](/docs/concepts/what-is-a-task-queue), which results in a new Activity Task Execution.

### Custom Retry Policy

To use a custom Retry Policy, provide it as an options parameter when starting a Workflow Execution or Activity Execution.
Only certain scenarios merit starting a Workflow Execution with a custom Retry Policy, such as the following:

- A [Temporal Cron Job](/docs/concepts/what-is-a-temporal-cron-job) or some other stateless, always-running Workflow Execution that can benefit from retries.
- A file-processing or media-encoding Workflow Execution that downloads files to a host.

### Properties

#### Default values for Retry Policy

```
Initial Interval     = 1 second
Backoff Coefficient  = 2.0
Maximum Interval     = ∞
Maximum Attempts     = ∞
Non-Retryable Errors = []
```

#### Initial Interval

- **Description**: Amount of time that must elapse before the first retry occurs.
  - **The default value is 1 second.**
- **Use case**: This is used as the base interval time for the [Backoff Coefficient](#backoff-coefficient) to multiply against.

#### Backoff Coefficient

- **Description**: The value dictates how much the _retry interval_ increases.
  - **The default value is 2.0.**
  - A backoff coefficient of 1.0 means that the retry interval always equals the [Initial Interval](#initial-interval).
- **Use case**: Use this attribute to increase the interval between retries.
  By having a backoff coefficient greater than 1.0, the first few retries happen relatively quickly to overcome intermittent failures, but subsequent retries happen farther and farther apart to account for longer outages.
  Use the [Maximum Interval](#maximum-interval) attribute to prevent the coefficient from increasing the retry interval too much.

#### Maximum Interval

- **Description**: Specifies the maximum interval between retries.
  - **The default value is 100 times the [Initial Interval](#initial-interval).**
- **Use case**: This attribute is useful for [Backoff Coefficients](#backoff-coefficient) that are greater than 1.0 because it prevents the retry interval from growing infinitely.

#### Maximum Attempts

- **Description**: Specifies the maximum number of execution attempts that can be made in the presence of failures.
  - **The default is unlimited.**
  - If this limit is exceeded, the execution fails without retrying again. When this happens an error is returned.
  - Setting the value to 0 also means unlimited.
  - Setting the value to 1 means a single execution attempt and no retries.
  - Setting the value to a negative integer results in an error when the execution is invoked.
- **Use case**: Use this attribute to ensure that retries do not continue indefinitely.
  However, in the majority of cases, we recommend relying on the Workflow Execution Timeout, in the case of [Workflows](#workflow), or Schedule-To-Close Timeout, in the case of [Activities](#activity), to limit the total duration of retries instead of using this attribute.

#### Non-Retryable Errors

- **Description**: Specifies errors that shouldn't be retried.
  - **Default is none.**
  - If one of those errors occurs, the [Activity Task Execution](#activity-task-execution) or [Workflow Execution](#workflow-execution) is not retried.
- **Use case**: There may be errors that you know of that should not trigger a retry.
  In this case you can specify them such that if they occur, the given execution will not be retried.

### Retry interval

The wait time before a retry is the _retry interval_. A retry interval is the smaller of two values:

- The [Initial Interval](#initial-interval) multiplied by the [Backoff Coefficient](#backoff-coefficient) raised to the power of the number of retries.
- The [Maximum Interval](#maximum-interval).

### Event History

There are some subtle nuances to how Events are recorded to an Event History when a Retry Policy comes into play.

- For an Activity Execution, the [ActivityTaskStarted](/docs/concepts/what-is-an-event#activitytaskstarted) Event will not show up in the Workflow Execution Event History until the Activity Execution has completed or failed (having exhausted all retries).
  This is to avoid filling the Event History with noise.
  Use the Describe API to get a pending Activity Execution's attempt count.

- For a Workflow Execution with a Retry Policy, if the Workflow Execution fails, the Workflow Execution will [Continue-As-New](/docs/concepts/what-is-continue-as-new) and the associated Event is written to the Event History.
  The [WorkflowExecutionContinuedAsNew](/docs/concepts/what-is-an-event#workflowexecutioncontinuedasnew) Event will have an "initiator" field that will specify the Retry Policy as the value and the new Run Id for the next retry attempt.
  The new Workflow Execution is created immediately.
  But the first Workflow Task won't be scheduled until the backoff duration is exhausted.
  That duration is recorded as the `firstWorkflowTaskBackoff` field of the new run's `WorkflowExecutionStartedEventAttributes` event.

## Workers

In day-to-day conversations, the term Worker is used to denote either a [Worker Program](/docs/concepts/what-is-a-worker-program), a [Worker Process](/docs/concepts/what-is-a-worker-process), or a [Worker Entity](/docs/concepts/what-is-a-worker-entity).
Temporal documentation aims to be explicit and differentiate between them.

### Worker Program

A Worker Program is the static code that defines the constraints of the Worker Process, developed using the APIs of a Temporal SDK.

**Implementation guides:**

- [How to develop a Worker Program in Go](/docs/go/how-to-develop-a-worker-program-in-go)
- [How to develop a Worker Program in Java](/docs/java/how-to-develop-a-worker-program-in-java)
- [How to develop a Worker Program in PHP](/docs/php/how-to-develop-a-worker-program-in-php)
- [How to develop a Worker Program in TypeScript](/docs/typescript/how-to-develop-a-worker-program-in-typescript)

### Worker Process

![Component diagram of a Worker Process and the Temporal Server](/diagrams/worker-and-server-component.svg)

A Worker Process is responsible for polling a [Task Queue](/docs/concepts/what-is-a-task-queue), dequeueing a [Task](/docs/concepts/what-is-a-task), executing your code in response to a Task, and responding to the [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster) with the results.

More formally, a Worker Process is any process that implements the Task Queue Protocol and the Task Execution Protocol.

- A Worker Process is a Workflow Worker Process if the process implements the Workflow Task Queue Protocol and executes the Workflow Task Execution Protocol to make progress on a Workflow Execution.
  A Workflow Worker Process can listen on an arbitrary number of Workflow Task Queues and can execute an arbitrary number of Workflow Tasks.
- A Worker Process is an Activity Worker Process if the process implements the Activity Task Queue Protocol and executes the Activity Task Processing Protocol to make progress on an Activity Execution.
  An Activity Worker Process can listen on an arbitrary number of Activity Task Queues and can execute an arbitrary number of Activity Tasks.

**Worker Processes are external to a Temporal Cluster.**
Temporal Application developers are responsible for developing [Worker Programs](/docs/concepts/what-is-a-worker-program) and operating Worker Processes.
Said another way, the [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster) (including the Temporal Cloud) doesn't execute any of your code (Workflow & Activity Definitions) on Temporal Cluster machines. The Cluster is solely responsible for orchestrating state transitions and providing Tasks to the next available Worker Entity.

While data transferred in Event Histories is [secured by mTLS](https://docs.temporal.io/docs/server/security/#encryption-of-network-traffic), by default, it is still readable at rest in the Temporal Cluster.

To solve this, Temporal SDKs offer a [Data Converter API](/docs/concepts/what-is-a-data-converter) that you can use to customize the serialization of data going out of and coming back in to a Worker Entity, with the net effect of guaranteeing that the Temporal Cluster cannot read sensitive business data.

In many of our tutorials, we show you how to run both a Temporal Cluster and one Worker on the same machine for local development.
However, a production-grade Temporal Application typically has a _fleet_ of Worker Processes, all running on hosts external to the Temporal Cluster.
A Temporal Application can have as many Worker Processes as needed.

A Worker Process can be both a Workflow Worker Process and an Activity Worker Process.
Many SDKs support the ability to have multiple Worker Entities in a single Worker Process.
(Worker entity creation and management differ between SDKs.)
A single Worker Entity can listen to only a single Task Queue.
But if a Worker Process has multiple Worker Entities, the Worker Process could be listening to multiple Task Queues.

![Entity relationship diagram (meta model) of Worker Processes, Task Queues, and Tasks](/diagrams/worker-and-server-entity-relationship.svg)

Worker Processes executing Activity Tasks must have access to any resources needed to execute the actions that are defined in Activity Definitions, such as the following:

- Network access for external API calls.
- Credentials for infrastructure provisioning.
- Specialized GPUs for machine learning utilities.

The Temporal Cluster itself has [internal workers](https://docs.temporal.io/blog/workflow-engine-principles/#system-workflows-1910) for system Workflow Executions.
However, these internal workers are not visible to the developer.

### Worker Entity

A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.

A Worker Entity listens and polls on a single Task Queue.
A Worker Entity contains both a Workflow Worker and an Activity Worker so that it may make progress of either a Workflow Execution or an Activity Execution.

**Can a Worker handle more Workflow Executions than its cache size or number of supported threads?**

Yes it can.
However, the tradeoff is added latency.

Workers are stateless, so any Workflow Execution in a blocked state can be safely removed from a Worker.
Later on, it can be resurrected on the same or different Worker when the need arises (in the form of an external event).
Therefore, a single Worker can handle millions of open Workflow Executions, assuming it can handle the update rate and that a slightly higher latency is not a concern.

**Operation guides:**

- [How to tune Workers](/docs/operation/how-to-tune-workers)

## Tasks

A Task is the context that a Worker needs to progress with a specific [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) or [Activity Execution](/docs/concepts/what-is-an-activity-execution).

There are two types of Tasks:

- [Activity Task](/docs/concepts/what-is-an-activity-task)
- [Workflow Task](/docs/concepts/what-is-a-workflow-task)

### Task Queues

A Task Queue is a lightweight, dynamically allocated queue that one or more [Worker Entities](/docs/concepts/what-is-a-worker-entity) poll for [Tasks](/docs/concepts/what-is-a-task).

Task Queues do not have any ordering guarantees.
It is possible to have a Task that stays in a Task Queue for a period of time, if there is a backlog that wasn't drained for that time.

There are two types of Task Queues, Activity Task Queues and Workflow Task Queues.
But one of each can exist with the same Task Queue name.

![Task Queue component](/diagrams/task-queue.svg)

Task Queues are very lightweight components.

- Task Queues do not require explicit registration but instead are created on demand when a Workflow Execution or Activity spawns or when a Worker Process subscribes to it.
- There is no limit to the number of Task Queues a Temporal Application can use or a Temporal Cluster can maintain.

Workers poll for Tasks in Task Queues via synchronous RPC.
This implementation offers several benefits:

- Worker Processes do not need to have any open ports, which is more secure.
- Worker Processes do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Worker Processes are down, messages simply persist in a Task Queue, waiting for the Worker Processes to recover.
- A Worker Process polls for a message only when it has spare capacity, avoiding overloading itself.
- In effect, Task Queues enable load balancing across a large number of Worker Processes.
- Task Queues support server-side throttling, which enables you to limit the Task dispatching rate to the pool of Worker Processes while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call [Task Routing](/docs/concepts/what-is-task-routing), which is the routing of specific Tasks to specific Worker Processes or even a specific process.

All Workers listening to a given Task Queue must have identical registrations of Activities and/or Workflows.
The one exception is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.

### Where to set Task Queues?

There are four places where the name of the Task Queue can be set by the developer.

1. A Task Queue must be set when spawning a Workflow Execution:

- [How to set `StartWorkflowOptions` in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#taskqueue)
- [How to spawn a Workflow Execution using tctl](/docs/tctl/workflow/start#--taskqueue)

2. A Task Queue name must be set when starting a Worker Entity:

- [How to develop a Worker Program in Go](/docs/go/how-to-develop-a-worker-program-in-go)
- [How to develop a Worker Program in Java](/docs/java/how-to-develop-a-worker-program-in-java)
- [How to develop a Worker Program in PHP](/docs/php/how-to-develop-a-worker-program-in-php)
- [How to develop a Worker Program in TypeScript](/docs/typescript/how-to-develop-a-worker-program-in-typescript)

Note that all Worker Entities listening to the same Task Queue name must be registered to handle the exact same Workflows Types and Activity Types.

If a Worker Entity polls a Task for a Workflow Type or Activity Type it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow Execution to fail.

3. A Task Queue name can be provided when spawning an Activity Execution:

This is optional.
An Activity Execution inherits the Task Queue name from its Workflow Execution if one is not provided.

- [How to set `ActivityOptions` in Go](/docs/go/how-to-set-activityoptions-in-go/#taskqueue)

4. A Task Queue name can be provided when spawning a Child Workflow Execution:

This is optional.
A Child Workflow Execution inherits the Task Queue name from its Parent Workflow Execution if one is not provided.

- [How to set `ChildWorkflowOptions` in Go](#)

### Sticky Execution

A Sticky Execution is when a Worker Entity caches the Workflow Execution Event History and creates a dedicated Task Queue to listen on.

A Sticky Execution occurs after a Worker Entity completes the first Workflow Task in the chain of Workflow Tasks for the Workflow Execution.

The Worker Entity caches the Workflow Execution Event History and begins polling the dedicated Task Queue for Workflow Tasks that contain updates, rather than the entire Event History.

If the Worker Entity does not pick up a Workflow Task from the dedicated Task Queue in an appropriate amount of time, the Cluster will resume Scheduling Workflow Tasks on the original Task Queue.
Another Worker Entity can then resume the Workflow Execution, and can set up its own Sticky Execution for future Workflow Tasks.

- [How to set a `StickyScheduleToStartTimeout` on a Worker Entity in Go](/docs/go/how-to-set-workeroptions-in-go/#stickyscheduletostarttimeout)

Sticky Executions are the default behavior of the Temporal Platform.

### Task Routing

Task Routing is when a Task Queue is paired with one or more Workers, primarily for Activity Task Executions.

In some use cases, such as file processing or machine learning model training, an Activity Task must be routed to a specific Worker Process or Worker Entity.
For example, suppose that you have a Workflow with the following three separate Activities:

- Download a file.
- Process the file in some way.
- Upload a file to another location.

The first Activity, to download the file, could occur on any Worker on any host.
However, the second and third Activities must be executed by a Worker on the same host where the first Activity downloaded the file.

In a real-life scenario, you might have many Worker Processes scaled over many hosts.
You would need to develop your Temporal Application to route Tasks to specific Worker Processes when needed.

Code samples:

- [Java file processing example](https://github.com/temporalio/samples-java/tree/master/src/main/java/io/temporal/samples/fileprocessing)
- [PHP file processing example](https://github.com/temporalio/samples-php/tree/master/app/src/FileProcessing)
- [Go file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing)

### Sessions

Some SDKs provide a Session API that provides a straightforward way to ensure that Activity Tasks are executed with the same Worker without requiring you to manually specify Task Queue names.
It also includes features like **concurrent session limitations** and **worker failure detection**.

- [How to create Worker Sessions in Go](/docs/go/how-to-create-a-worker-session-in-go)

## Signals

A Signal is an external asynchronous request to a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

A Signal is meant to deliver data to a running Workflow Execution which can be used to change variable values and the state of Workflow Execution.
A Signal can not return data to the caller, use [Queries](/docs/concepts/what-is-a-query) for that.
A Signal can be sent using a Temporal Client or from within a Workflow.
When a Signal is sent, it is received by the Cluster and recorded as an Event to the Workflow Execution Event History.
The Cluster will deduplicate Signals and use the first Signal with a particular Id.
The next scheduled Workflow Task contains the Signal Event.

A Signal is a message with a unique Id.
A Signal must include a destination (Namespace + Workflow Id).

A Signal Header includes the following:

- Recipient: Workflow Execution (Namespace + Workflow Id)
- Id: The unique Id of the Signal.
- Name: The queue in which the Signal will be added.

A Signal Body includes the following:

- Any encodable data.

Workflow functions listen for Signals by the Signal name.
Signals are delivered in the order they are received.
Workflow Execution can optionally await on a single Signal name or multiple Signal names.

If you are using Signals with the Go SDK, you should make sure to do an asynchronous drain on the Signal channel or the Signals will be lost.

**Implementation guides:**

- [How to send a Signal to a Workflow Execution in Go](/docs/go/how-to-send-a-signal-to-a-workflow-execution-in-go)
- [How to handle a Signal in a Workflow in Go](/docs/go/how-to-handle-a-signal-in-a-workflow-in-go)
- [How to use Signals in Java](/docs/java/signals)
- [How to use Signals in PHP](/docs/php/signals)

## Queries

A Query is a synchronous operation that is used to report the state of a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

The state of a running Workflow Execution is constantly changing.
Queries are available to expose the internal Workflow Execution state to the external world.

- A Query is a synchronous call from a Temporal Client.
- A Query can carry arguments to specify which data it is requesting, as every Workflow can expose data to multiple types of Queries.
- A Query must never mutate the state of the Workflow Execution.
- If a Query is sent to a completed Workflow Execution, the final value is returned.
- Query handling logic is implemented as code within the Workflow.
  Query handling logic must be **read-only** and cannot change the Workflow Execution state in any way, or contain any blocking code.
  This means that Query handling logic can not spawn Activity Executions.

In many SDKs the Temporal Client exposes a predefined `_stack_track_` Query that returns the stack trace of all the threads owned by that Workflow Execution.
This is a great way to troubleshoot a Workflow Execution in production.

### Stack Trace Query

There is a built-in Query type named `__stack_trace`.
If a Workflow Execution has been stuck at a state for longer than an expected period of time, you can send a Query to return the current call stack. The `__stack_trace` Query name does not require special handling in your Workflow code.

### Consistent Query

A Query can be one of two consistency levels, _eventual_ and _strong_.
Consider if you were to send a Signal to a Workflow Execution with the intent to update its state, and then immediately send a Query to get the state.

#### Eventual consistency

The Query may or may not return the updated state that quickly.
However, there is a guarantee that eventually the Query would return the actual state.
This is what it means for a query to be eventually consistent.

#### Strong consistency

Query has another consistency level called strong consistency.
A strongly consistent Query is guaranteed to return the state, which includes all Events that came before the Query was issued.
An Event is considered to have come before a Query if the call creating the Event returned success before the Query was issued.
Events that are created while the Query is outstanding may or may not be reflected in the Workflow state the Query result is based on.

When sending a strongly consistent Query you should expect higher latency than an eventually consistent Query.

**Implementation guides:**

- [How to send a Query to a Workflow Execution in Go](/docs/go/how-to-send-a-query-to-a-workflow-execution-in-go)
- [How to handle a Query in a Workflow in Go](/docs/go/how-to-handle-a-query-in-a-workflow-in-go)
- [How to use Queries in Java](/docs/java/queries)
- [How to use Queries in PHP](/docs/php/queries)
- [How to send a Query to a Workflow Execution using tctl](/docs/tctl/workflow/query)

## Child Workflows

A Child Workflow Execution is a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) that is spawned from within another Workflow.

A Workflow Execution can be both a Parent and a Child Workflow Execution because any Workflow can spawn another Workflow.

![Parent & Child Workflow Execution entity relationship](/diagrams/parent-child-workflow-execution-relationship.svg)

A Parent Workflow Execution must await on the Child Workflow Execution to spawn.
The Parent can optionally await on the result of the Child Workflow Execution.
Consider the Child's [Parent Close Policy](/docs/concepts/what-is-a-parent-close-policy) if the Parent does not await on the result of the Child, which includes any use of Continue-As-New by the Parent.

When a Parent Workflow Execution reaches a Closed status, the Cluster propagates Cancellation Requests or Terminations to Child Workflow Executions depending on the Child's Parent Close Policy.

If a Child Workflow Execution uses Continue-As-New, from the Parent Workflow Execution's perspective the entire chain of Runs is treated as a single execution.

![Parent & Child Workflow Execution entity relationship with Continue As New](/diagrams/parent-child-workflow-execution-with-continue-as-new.svg)

### When to use Child Workflows

**Consider Workflow Execution Event History size limits.**

An individual Workflow Execution has an [Event History](/docs/concepts/what-is-an-event-history) size limit, which imposes a couple of considerations for using Child Workflows.

On one hand, because Child Workflow Executions have their own Event Histories, they are often used to partition large workloads into smaller chunks.
For example, a single Workflow Execution does not have enough space in its Event History to spawn 100,000 [Activity Executions](/docs/concepts/what-is-an-activity-execution).
But a Parent Workflow Execution can spawn 1000 Child Workflow Executions that each spawn 1000 Activity Executions to achieve a total of 1,000,000 Activity Executions.

On the other hand, because a Parent Workflow Execution Event History contains [Events](/docs/concepts/what-is-an-event) that correspond to the status of the Child Workflow Execution, a single Parent should not spawn more than 1000 Child Workflow Executions.

In general, however, Child Workflow Executions result in more overall Events recorded in Event Histories than Activities.
Because each entry in an Event History is a "cost" in terms of compute resources, this could become a factor in very large workloads.
Therefore, we recommend starting with a single Workflow implementation that uses Activities until there is a clear need for Child Workflows.

**Consider each Child Workflow Execution as a separate service.**

Because a Child Workflow Execution can be processed by a completely separate set of [Workers](/docs/concepts/what-is-a-worker) than the Parent Workflow Execution, it can act as an entirely separate service.
However, this also means that a Parent Workflow Execution and a Child Workflow Execution do not share any local state.
As all Workflow Executions, they can communicate only via asynchronous [Signals](/docs/concepts/what-is-a-signal).

**Consider that a single Child Workflow Execution can represent a single resource.**

As all Workflow Executions, a Child Workflow Execution can create a 1:1 mapping with a resource.
For example, a Workflow that manages host upgrades could spawn a Child Workflow Execution per host.

**Implementation guides:**

- [How to spawn a Child Workflow Execution in Go](/docs/go/how-to-spawn-a-child-workflow-execution-in-go)

## Temporal Cron Jobs

A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

![Temporal Cron Job timeline](/diagrams/temporal-cron-job.svg)

A Temporal Cron Job is similar to a classic unix cron job.
Just as a unix cron job accepts a command and a schedule on which to execute that command, a Cron Schedule can be provided with the call to spawn a Workflow Execution.
If a Cron Schedule is provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule.

Each Workflow Execution within the series is considered a Run.

- Each Run receives the same input parameters as the initial Run.
- Each Run inherits the same Workflow Options as the initial Run.

The Temporal Server spawns the first Workflow Execution in the chain of Runs immediately.
However, it calculates and applies a backoff so that the first Workflow Task of the Workflow Execution does not get placed into a Task Queue until the scheduled time.
After each Run Completes, Fails, or Times Out, the same thing happens: the next run will be created immediately, but with a backoff.

The Temporal Server spawns the next Run only after the current Run has Completed, Failed, or Timed Out.
This means that, if a Retry Policy has also been provided, and a Run Fails or Times Out, the Run will first be retried per the Retry Policy until the Run Completes or the Retry Policy has been exhausted.
If the next Run, per the Cron Schedule, is due to spawn while the current Run is still Open (including retries), the Server skips the next scheduled Run.
A [Workflow Run Timeout](/docs/concepts/what-is-a-workflow-run-timeout) is used to limit the maximum amount of time of individual Runs.
Again, if the Workflow Run Timeout is reached and there is an associated Retry Policy, the Workflow is retried before the next Cron Scheduled spawn occurs.

![Temporal Cron Job Run Failure with a Retry Policy](/diagrams/temporal-cron-job-failure-with-retry.svg)

### Cron Schedules

Cron Schedules are interpreted in UTC time by default.

The Cron Schedule is provided as a string and must follow one of two specifications:

**Classic specification**

This is what the "classic" specification looks like:

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

For example, `15 8 * * *` causes a Workflow Execution to spawn daily at 8:15 AM UTC.
Use the [crontab guru site](https://crontab.guru/) to test your cron expressions.

### `robfig` predefined schedules and intervals

You can also pass any of the [predefined schedules](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-Predefined_schedules) or [intervals](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-Intervals) described in the [`robfig/cron` documentation](https://pkg.go.dev/github.com/robfig/cron/v3).

```
Schedules              | Description                                | Equivalent To
-----                  | -----------                                | -------------
@yearly (or @annually) | Run once a year, midnight, Jan. 1st        | 0 0 1 1 *
@monthly               | Run once a month, midnight, first of month | 0 0 1 * *
@weekly                | Run once a week, midnight between Sat/Sun  | 0 0 * * 0
@daily (or @midnight)  | Run once a day, midnight                   | 0 0 * * *
@hourly                | Run once an hour, beginning of hour        | 0 * * * *
```

For example, "@weekly" causes a Workflow Execution to spawn once a week at midnight between Saturday and Sunday.

Intervals just take a string that can be accepted by [time.ParseDuration](http://golang.org/pkg/time/#ParseDuration).

```
@every <duration>
```

### Time zones

_This feature only applies in Temporal 1.15 and up_

You can change the time zone that a Cron Schedule is interpreted in by prefixing the specification with `CRON_TZ=America/New_York ` (or your [desired time zone from tz](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)). `CRON_TZ=America/New_York 15 8 * * *` therefore spawns a Workflow Execution every day at 8:15 AM New York time, subject to caveats listed below.

Consider that using time zones in production introduces a surprising amount of complexity and failure modes!
**If at all possible, we recommend specifying Cron Schedules in UTC (the default)**.

If you need to use time zones, here are a few edge cases to keep in mind:

- **Beware Daylight Saving Time**: If a Temporal Cron Job is scheduled around the time when daylight saving time (DST) begins or ends (for example, `30 2 * * *`), **it might run zero, one, or two times in a day**! The Cron library that we use does not do any special handling of DST transitions. Avoid schedules that include times that fall within DST transition periods.
  - For example, in the US, DST begins at 2 AM. When you "fall back," the clock goes `1:59 … 1:00 … 1:01 … 1:59 … 2:00 … 2:01 AM` and any Cron jobs that fall in that 1 AM hour are fired again. The inverse happens when clocks "spring forward" for DST, and Cron jobs that fall in the 2 AM hour are skipped.
  - In other time zones like Chile and Iran, DST "spring forward" is at midnight. 11:59 PM is followed by 1 AM, which means `00:00:00` never happens.
- **Self Hosting note**: If you manage your own Temporal Cluster, you are responsible for ensuring that it has access to current `tzdata` files. The official Docker images are built with [tzdata](https://docs.w3cub.com/go/time/tzdata/index) installed (provided by Alpine Linux), but ultimately you should be aware of how tzdata is deployed and updated in your infrastructure.
- **Updating Temporal**: If you use the official Docker images, note that an upgrade of the Temporal Cluster may include an update to the tzdata files, which may change the meaning of your Cron Schedule. You should be aware of upcoming changes to the definitions of the time zones you use, particularly around daylight saving time start/end dates.
- **Absolute Time Fixed at Start**: The absolute start time of the next Run is computed and stored in the database when the previous Run completes, and is not recomputed. This means that if you have a Cron Schedule that runs very infrequently, and the definition of the time zone changes between one Run and the next, the Run might happen at the wrong time. For example, `CRON_TZ=America/Los_Angeles 0 12 11 11 *` means "noon in Los Angeles on November 11" (normally not in DST). If at some point the government makes any changes (for example, move the end of DST one week later, or stay on permanent DST year-round), the meaning of that specification changes. In that first year, the Run happens at the wrong time, because it was computed using the older definition.

### How to stop a Temporal Cron Job

A Temporal Cron Job does not stop spawning Runs until it has been Terminated or until the [Workflow Execution Timeout](/docs/concepts/what-is-a-workflow-execution-timeout) is reached.

A Cancellation Request affects only the current Run.

Use the Workflow Id in any requests to Cancel or Terminate.

**Implementation guides:**

- [How to set a Cron Schedule in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#cronschedule)
- [How to set a Cron Schedule in Java](/docs/java/distributed-cron)
- [How to set a Cron Schedule in PHP](/docs/php/distributed-cron)
- [How to set a Cron Schedule in Typescript](/docs/typescript/clients)

## Temporal Cron Jobs

A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

![Temporal Cron Job timeline](/diagrams/temporal-cron-job.svg)

A Temporal Cron Job is similar to a classic unix cron job.
Just as a unix cron job accepts a command and a schedule on which to execute that command, a Cron Schedule can be provided with the call to spawn a Workflow Execution.
If a Cron Schedule is provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule.

Each Workflow Execution within the series is considered a Run.

- Each Run receives the same input parameters as the initial Run.
- Each Run inherits the same Workflow Options as the initial Run.

The Temporal Server spawns the first Workflow Execution in the chain of Runs immediately.
However, it calculates and applies a backoff so that the first Workflow Task of the Workflow Execution does not get placed into a Task Queue until the scheduled time.
After each Run Completes, Fails, or Times Out, the same thing happens: the next run will be created immediately, but with a backoff.

The Temporal Server spawns the next Run only after the current Run has Completed, Failed, or Timed Out.
This means that, if a Retry Policy has also been provided, and a Run Fails or Times Out, the Run will first be retried per the Retry Policy until the Run Completes or the Retry Policy has been exhausted.
If the next Run, per the Cron Schedule, is due to spawn while the current Run is still Open (including retries), the Server skips the next scheduled Run.
A [Workflow Run Timeout](/docs/concepts/what-is-a-workflow-run-timeout) is used to limit the maximum amount of time of individual Runs.
Again, if the Workflow Run Timeout is reached and there is an associated Retry Policy, the Workflow is retried before the next Cron Scheduled spawn occurs.

![Temporal Cron Job Run Failure with a Retry Policy](/diagrams/temporal-cron-job-failure-with-retry.svg)

### Cron Schedules

Cron Schedules are interpreted in UTC time by default.

The Cron Schedule is provided as a string and must follow one of two specifications:

**Classic specification**

This is what the "classic" specification looks like:

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

For example, `15 8 * * *` causes a Workflow Execution to spawn daily at 8:15 AM UTC.
Use the [crontab guru site](https://crontab.guru/) to test your cron expressions.

### `robfig` predefined schedules and intervals

You can also pass any of the [predefined schedules](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-Predefined_schedules) or [intervals](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-Intervals) described in the [`robfig/cron` documentation](https://pkg.go.dev/github.com/robfig/cron/v3).

```
Schedules              | Description                                | Equivalent To
-----                  | -----------                                | -------------
@yearly (or @annually) | Run once a year, midnight, Jan. 1st        | 0 0 1 1 *
@monthly               | Run once a month, midnight, first of month | 0 0 1 * *
@weekly                | Run once a week, midnight between Sat/Sun  | 0 0 * * 0
@daily (or @midnight)  | Run once a day, midnight                   | 0 0 * * *
@hourly                | Run once an hour, beginning of hour        | 0 * * * *
```

For example, "@weekly" causes a Workflow Execution to spawn once a week at midnight between Saturday and Sunday.

Intervals just take a string that can be accepted by [time.ParseDuration](http://golang.org/pkg/time/#ParseDuration).

```
@every <duration>
```

### Time zones

_This feature only applies in Temporal 1.15 and up_

You can change the time zone that a Cron Schedule is interpreted in by prefixing the specification with `CRON_TZ=America/New_York ` (or your [desired time zone from tz](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)). `CRON_TZ=America/New_York 15 8 * * *` therefore spawns a Workflow Execution every day at 8:15 AM New York time, subject to caveats listed below.

Consider that using time zones in production introduces a surprising amount of complexity and failure modes!
**If at all possible, we recommend specifying Cron Schedules in UTC (the default)**.

If you need to use time zones, here are a few edge cases to keep in mind:

- **Beware Daylight Saving Time**: If a Temporal Cron Job is scheduled around the time when daylight saving time (DST) begins or ends (for example, `30 2 * * *`), **it might run zero, one, or two times in a day**! The Cron library that we use does not do any special handling of DST transitions. Avoid schedules that include times that fall within DST transition periods.
  - For example, in the US, DST begins at 2 AM. When you "fall back," the clock goes `1:59 … 1:00 … 1:01 … 1:59 … 2:00 … 2:01 AM` and any Cron jobs that fall in that 1 AM hour are fired again. The inverse happens when clocks "spring forward" for DST, and Cron jobs that fall in the 2 AM hour are skipped.
  - In other time zones like Chile and Iran, DST "spring forward" is at midnight. 11:59 PM is followed by 1 AM, which means `00:00:00` never happens.
- **Self Hosting note**: If you manage your own Temporal Cluster, you are responsible for ensuring that it has access to current `tzdata` files. The official Docker images are built with [tzdata](https://docs.w3cub.com/go/time/tzdata/index) installed (provided by Alpine Linux), but ultimately you should be aware of how tzdata is deployed and updated in your infrastructure.
- **Updating Temporal**: If you use the official Docker images, note that an upgrade of the Temporal Cluster may include an update to the tzdata files, which may change the meaning of your Cron Schedule. You should be aware of upcoming changes to the definitions of the time zones you use, particularly around daylight saving time start/end dates.
- **Absolute Time Fixed at Start**: The absolute start time of the next Run is computed and stored in the database when the previous Run completes, and is not recomputed. This means that if you have a Cron Schedule that runs very infrequently, and the definition of the time zone changes between one Run and the next, the Run might happen at the wrong time. For example, `CRON_TZ=America/Los_Angeles 0 12 11 11 *` means "noon in Los Angeles on November 11" (normally not in DST). If at some point the government makes any changes (for example, move the end of DST one week later, or stay on permanent DST year-round), the meaning of that specification changes. In that first year, the Run happens at the wrong time, because it was computed using the older definition.

### How to stop a Temporal Cron Job

A Temporal Cron Job does not stop spawning Runs until it has been Terminated or until the [Workflow Execution Timeout](/docs/concepts/what-is-a-workflow-execution-timeout) is reached.

A Cancellation Request affects only the current Run.

Use the Workflow Id in any requests to Cancel or Terminate.

**Implementation guides:**

- [How to set a Cron Schedule in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#cronschedule)
- [How to set a Cron Schedule in Java](/docs/java/distributed-cron)
- [How to set a Cron Schedule in PHP](/docs/php/distributed-cron)
- [How to set a Cron Schedule in Typescript](/docs/typescript/clients)

## Visibility

The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

### Standard Visibility

Standard Visibility, within the Temporal Platform, is the subsystem and APIs that list Workflow Executions by a predefined set of filters.

Open Workflow Executions can be filtered by a time constraint and either a Workflow Type, Workflow Id, or Run Id.

Closed Workflow Executions can be filtered by a time constraint and either a Workflow Type, Workflow Id, Run Id, or Execution Status (Completed, Failed, Timed Out, Terminated, Canceled, or Continued-As-New).

### Advanced Visibility

Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions through a custom SQL-like [List Filter](/docs/concepts/what-is-a-list-filter).

To use Advanced Visibility, your Temporal Cluster must be [integrated with Elasticsearch](/docs/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).
We highly recommend operating a Temporal Cluster with Elasticsearch for any use case that spawns more than just a few Workflow Executions.
Elasticsearch takes on the Visibility request load, relieving potential performance issues.

### List Filters

A List Filter is the SQL-like string that is provided as the parameter to an [Advanced Visibility](/docs/concepts/what-is-advanced-visibility) List API.

The following is an example List Filter:

```
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00") order by StartTime desc
```

[More example List Filters](#example-list-filters)

A List Filter contains [Search Attribute](/docs/concepts/what-is-a-search-attribute) names, Search Attribute values, and Operators.

- The following operators are supported in List Filters:

  - **AND, OR, ()**
  - **=, !=, >, >=, <, <=**
  - **IN**
  - **BETWEEN ... AND**
  - **ORDER BY**

- A List Filter applies to a single Namespace.

- The range of a List Filter timestamp (StartTime, CloseTime, ExecutionTime) cannot exceed 9223372036854775807 (that is, maxInt64 - 1001).

- A List Filter that uses a time range has a resolution of 1 ms on Elasticsearch 6 and 1 ns on Elasticsearch 7.

- List Filter Search Attribute names are case sensitive.

- An Advanced List Filter API may take longer than expected if it is retrieving a large number of Workflow Executions (more than 10 million).

- A `ListWorkflow` API supports pagination.
  Use the page token in the following call to retrieve the next page; continue until the page token is `null`/`nil`.

- To efficiently count the number of Workflow Executions, use the `CountWorkflow` API.

### Example List Filters

```sql
WorkflowId = '<workflow-id>'
```

```sql
WorkflowId = '<workflow-id>' or WorkflowId = '<another-workflow-id>'
```

```sql
WorkflowId = '<workflow-id>' order by StartTime desc
```

```sql
WorkflowId = '<workflow-id>' and ExecutionStatus = 'Running'
```

```sql
WorkflowId = '<workflow-id>' or ExecutionStatus = 'Running'
```

```sql
WorkflowId = '<workflow-id>' and StartTime > '2021-08-22T15:04:05+00:00'
```

```sql
ExecutionTime between '2021-08-22T15:04:05+00:00' and '2021-08-28T15:04:05+00:00'
```

```sql
ExecutionTime < '2021-08-28T15:04:05+00:00' or ExecutionTime > '2021-08-22T15:04:05+00:00'
```

```sql
order by ExecutionTime
```

```sql
order by StartTime desc, CloseTime asc
```

```sql
order by CustomIntField asc
```

**Implementation guides:**

- [How to list and filter Workflow Executions with a List Filter using tctl](/docs/tctl/workflow/list#--query)
- [How to use a List Filter in the Web UI](/docs/web-ui/how-to-use-a-list-filter-in-the-temporal-web-ui)

### Search Attributes

A Search Attribute is an indexed field used in a [List Filter](/docs/concepts/what-is-a-list-filter) to filter a list of Workflow Executions that have the Search Attribute in their metadata.

If a Temporal Cluster does not have Elasticsearch integrated, but a Workflow Execution is spawned and tagged with Search Attributes, no errors occur.
However, you won't be able to use Advanced Visibility List APIs and List Filters to find and list the Workflow Execution.

When using [Continue-As-New](/docs/concepts/what-is-continue-as-new) or a [Temporal Cron Job](/docs/concepts/what-is-a-temporal-cron-job), Search Attributes are carried over to the new Run by default.

### Default Search Attributes

A Temporal Cluster that is integrated with Elasticsearch has a set of default Search Attributes already available.
These Search Attributes are created when the initial index is created.

| NAME                  | TYPE     |
| --------------------- | -------- |
| BatcherNamespace      | Keyword  |
| BatcherUser           | Keyword  |
| BinaryChecksums       | Keyword  |
| CloseTime             | Datetime |
| ExecutionDuration     | Int      |
| ExecutionStatus       | Keyword  |
| ExecutionTime         | Datetime |
| HistoryLength         | Int      |
| RunId                 | Keyword  |
| StartTime             | Datetime |
| StateTransitionCount  | Int      |
| TaskQueue             | Keyword  |
| TemporalChangeVersion | Keyword  |
| WorkflowId            | Keyword  |
| WorkflowType          | Keyword  |

- All default Search Attributes are reserved and read-only.
  (You cannot create a custom one with the same name or alter the existing one.)

- ExecutionStatus values correspond to Workflow Execution Statuses: Running, Completed, Failed, Canceled, Terminated, ContinuedAsNew, TimedOut.

- StartTime, CloseTime, and ExecutionTime are stored as dates but are supported by queries that use either EpochTime in nanoseconds or a string in [RFC3339Nano format](https://pkg.go.dev/time#pkg-constants) (such as "2006-01-02T15:04:05.999999999Z07:00").

- ExecutionDuration is stored in nanoseconds but is supported by queries that use integers in nanoseconds, [Golang duration format](https://pkg.go.dev/time#ParseDuration), or "hh:mm:ss" format.

- CloseTime, HistoryLength, StateTransitionCount, and ExecutionDuration are present only in a Closed Workflow Execution.

- ExecutionTime can differ from StartTime in retry and cron use cases.

### Custom Search Attributes

Custom Search Attributes can be [added to a Temporal Cluster only by using `tctl`](/docs/tctl/how-to-add-a-custom-search-attribute-to-a-cluster-using-tctl).
Adding a Search Attribute makes it available to use with Workflow Executions within that Cluster.

There is no hard limit on the number of attributes you can add.
However, we recommend enforcing the following limits:

- Number of Search Attributes: 100 per Workflow
- Size of each value: 2 KB per value
- Total size of names and values: 40 KB per Workflow

:::note

Due to Elasticsearch limitations, you can only add Search Attributes.
It is not possible to rename Search Attributes or remove them from the index schema.

:::

The [temporalio/auto-setup](https://hub.docker.com/r/temporalio/auto-setup) Docker image uses a pre-defined set of custom Search Attributes that are handy for testing.
Their names indicate their types:

- CustomTextField
- CustomKeywordField
- CustomIntField
- CustomDoubleField
- CustomBoolField
- CustomDatetimeField

### Types

Search Attributes must be one of the following types:

- Text
- Keyword
- Int
- Double
- Bool
- Datetime

Note:

- **Double** is backed up by `scaled_float` Elasticsearch type with scale factor 10000 (4 decimal digits).
- **Datetime** is backed up by `date` type with milliseconds precision in Elasticsearch 6 and `date_nanos` type with nanoseconds precision in Elasticsearch 7.
- **Int** is 64-bit integer (`long` Elasticsearch type).
- **Keyword** and **Text** types are concepts taken from Elasticsearch. Each word in a **Text** is considered a searchable keyword.
  For a UUID, that can be problematic because Elasticsearch indexes each portion of the UUID separately.
  To have the whole string considered as a searchable keyword, use the **Keyword** type.
  For example, if the key `ProductId` has the value of `2dd29ab7-2dd8-4668-83e0-89cae261cfb1`:
  - As a **Keyword** it would be matched only by `ProductId = "2dd29ab7-2dd8-4668-83e0-89cae261cfb1`.
  - As a **Text** it would be matched by `ProductId = 2dd8`, which could cause unwanted matches.
- The **Text** type cannot be used in the "Order By" clause.

- [How to view Search Attributes using tctl](/docs/tctl/cluster/list-search-attributes)

### Search Attributes as Workflow Execution metadata

To actually have results from the use of a [List Filter](/docs/concepts/what-is-a-list-filter), Search Attributes must be added to a Workflow Execution as metadata.
How to do this entirely depends on the method by which you spawn the Workflow Execution:

- [How to set Search Attributes as Workflow Execution metadata in Go](/docs/go/how-to-set-startworkflowoptions-in-go/#searchattributes)

