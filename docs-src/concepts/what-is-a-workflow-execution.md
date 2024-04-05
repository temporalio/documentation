---
id: what-is-a-workflow-execution
title: What is a Workflow Execution?
sidebar_label: Workflow Execution
description: A Temporal Workflow Execution is a durable, scalable, reliable, and reactive function execution. It is the main unit of execution of a Temporal Application.
tags:
  - term
  - explanation
---

While the Workflow Definition is the code that defines the Workflow, the Workflow Execution is created by executing that code.
A Temporal Workflow Execution is a durable, reliable, and scalable function execution.
It is the main unit of execution of a [Temporal Application](/concepts/what-is-a-temporal-application).

- [How to start a Workflow Execution using tctl](/tctl-v1/workflow#start)
- [How to start a Workflow Execution using the Go SDK](/go/spawning-workflows)
- [How to start a Workflow Execution using the Java SDK](/java/how-to-spawn-a-workflow-execution-in-java)
- [How to start a Workflow Execution using the PHP SDK](/php/spawning-workflows)
- [How to start a Workflow Execution using the Python SDK](/python/spawning-workflows)
- [How to start a Workflow Execution using the TypeScript SDK](/typescript/spawning-workflows)

Each Temporal Workflow Execution has exclusive access to its local state.
It executes concurrently to all other Workflow Executions, and communicates with other Workflow Executions through [Signals](/concepts/what-is-a-signal) and the environment through [Activities](/concepts/what-is-an-activity).
While a single Workflow Execution has limits on size and throughput, a Temporal Application can consist of millions to billions of Workflow Executions.

**Durability**

Durability is the absence of an imposed time limit.

A Workflow Execution is durable because it executes a Temporal Workflow Definition (also called a Temporal Workflow Function), your application code, effectively once and to completion—whether your code executes for seconds or years.

**Reliability**

Reliability is responsiveness in the presence of failure.

A Workflow Execution is reliable, because it is fully recoverable after a failure.
The Temporal Platform ensures the state of the Workflow Execution persists in the face of failures and outages and resumes execution from the latest state.

**Scalability**

Scalability is responsiveness in the presence of load.

A single Workflow Execution is limited in size and throughput but is scalable because it can [Continue-As-New](/concepts/what-is-continue-as-new) in response to load.
A Temporal Application is scalable because the Temporal Platform is capable of supporting millions to billions of Workflow Executions executing concurrently, which is realized by the design and nature of the [Temporal Cluster](/concepts/what-is-a-temporal-cluster) and [Worker Processes](/concepts/what-is-a-worker-process).

### Replays

A Replay is the method by which a Workflow Execution resumes making progress. During a Replay the Commands that are generated are checked against an existing Event History. Replays are necessary and often happen to give the effect that Workflow Executions are resumable, reliable, and durable.

For more information, see [Deterministic constraints](/concepts/what-is-a-workflow-definition#deterministic-constraints).

If a failure occurs, the Workflow Execution picks up where the last recorded event occurred in the Event History.

- [How to use Replay APIs using the Go SDK](/go/replays)
- [How to use Replay APIs using the Java SDK](/java/replays)
- [How to use Replay APIs using the Python SDK](/python/replays)
- [How to use Replay APIs using the TypeScript SDK](/typescript/replays)

### Commands and awaitables

A Workflow Execution does two things:

1. Issue [Commands](/concepts/what-is-a-command).
2. Wait on an Awaitables (often called Futures).

![Command generation and waiting](/diagrams/workflow-execution-progession-simple.svg)

Commands are issued and Awaitables are provided by the use of Workflow APIs in the [Workflow Definition](/concepts/what-is-a-workflow-definition).

Commands are generated whenever the Workflow Function is executed.
The Worker Process supervises the Command generation and makes sure that it maps to the current Event History.
(For more information, see [Deterministic constraints](/concepts/what-is-a-workflow-definition#deterministic-constraints).)
The Worker Process batches the Commands and then suspends progress to send the Commands to the Cluster whenever the Workflow Function reaches a place where it can no longer progress without a result from an Awaitable.

A Workflow Execution may only ever block progress on an Awaitable that is provided through a Temporal SDK API.
Awaitables are provided when using APIs for the following:

- Awaiting: Progress can block using explicit "Await" APIs.
- Requesting cancellation of another Workflow Execution: Progress can block on confirmation that the other Workflow Execution is cancelled.
- Sending a [Signal](/concepts/what-is-a-signal): Progress can block on confirmation that the Signal sent.
- Spawning a [Child Workflow Execution](/concepts/what-is-a-child-workflow-execution): Progress can block on confirmation that the Child Workflow Execution started, and on the result of the Child Workflow Execution.
- Spawning an [Activity Execution](/concepts/what-is-an-activity-execution): Progress can block on the result of the Activity Execution.
- Starting a Timer: Progress can block until the Timer fires.

### Status

A Workflow Execution can be either _Open_ or _Closed_.

![Workflow Execution statuses](/diagrams/workflow-execution-statuses.svg)

#### Open

An _Open_ status means that the Workflow Execution is able to make progress.

- Running: The only Open status for a Workflow Execution.
  When the Workflow Execution is Running, it is either actively progressing or is waiting on something.

#### Closed

A _Closed_ status means that the Workflow Execution cannot make further progress because of one of the following reasons:

- Cancelled: The Workflow Execution successfully handled a cancellation request.
- Completed: The Workflow Execution has completed successfully.
- Continued-As-New: The Workflow Execution [Continued-As-New](/concepts/what-is-continue-as-new).
- Failed: The Workflow Execution returned an error and failed.
- Terminated: The Workflow Execution was terminated.
- Timed Out: The Workflow Execution reached a timeout limit.

### Workflow Execution Chain

A Workflow Execution Chain is a sequence of Workflow Executions that share the same Workflow Id.
Each link in the Chain is often called a Workflow Run.
Each Workflow Run in the sequence is connected by one of the following:

- [Continue-As-New](/concepts/what-is-continue-as-new)
- [Retries](/concepts/what-is-a-retry-policy)
- [Temporal Cron Job](/concepts/what-is-a-temporal-cron-job)

A Workflow Execution is uniquely identified by its [Namespace](/concepts/what-is-a-namespace), [Workflow Id](/concepts/what-is-a-workflow-id), and [Run Id](/concepts/what-is-a-run-id).

The [Workflow Execution Timeout](/concepts/what-is-a-workflow-execution-timeout) applies to a Workflow Execution Chain.
The [Workflow Run Timeout](/concepts/what-is-a-workflow-run-timeout) applies to a single Workflow Execution (Workflow Run).

### Event loop

A Workflow Execution is made up of a sequence of [Events](/concepts/what-is-an-event) called an [Event History](/concepts/what-is-an-event-history).
Events are created by the Temporal Cluster in response to either Commands or actions requested by a Temporal Client (such as a request to spawn a Workflow Execution).

![Workflow Execution](/diagrams/workflow-execution-swim-lane-01.svg)

### Time constraints

**Is there a limit to how long Workflows can run?**

No, there is no time constraint on how long a Workflow Execution can be Running.

However, Workflow Executions intended to run indefinitely should be written with some care.
The Temporal Cluster stores the complete Event History for the entire lifecycle of a Workflow Execution.
The Temporal Cluster logs a warning after 10Ki (10,240) Events and periodically logs additional warnings as new Events are added.
If the Event History exceeds 50Ki (51,200) Events, the Workflow Execution is terminated.

To prevent _runaway_ Workflow Executions, you can use the Workflow Execution Timeout, the Workflow Run Timeout, or both.
A Workflow Execution Timeout can be used to limit the duration of Workflow Execution Chain, and a Workflow Run Timeout can be used to limit the duration an individual Workflow Execution (Run).

You can use the [Continue-As-New](/concepts/what-is-continue-as-new) feature to close the current Workflow Execution and create a new Workflow Execution in a single atomic operation.
The Workflow Execution spawned from Continue-As-New has the same Workflow Id, a new Run Id, and a fresh Event History and is passed all the appropriate parameters.
For example, it may be reasonable to use Continue-As-New once per day for a long-running Workflow Execution that is generating a large Event History.

### Limits

There is no limit to the number of concurrent Workflow Executions, albeit you must abide by the Workflow Execution's Event History limit.

:::caution

As a precautionary measure, the Workflow Execution's Event History is limited to [51,200 Events](https://github.com/temporalio/temporal/blob/e3496b1c51bfaaae8142b78e4032cc791de8a76f/service/history/configs/config.go#L382) or [50 MB](https://github.com/temporalio/temporal/blob/e3496b1c51bfaaae8142b78e4032cc791de8a76f/service/history/configs/config.go#L380) and will warn you after 10,240 Events or 10 MB.

:::

There is also a limit to the number of certain types of incomplete operations.

Each in-progress Activity generates a metadata entry in the Workflow Execution's mutable state.
Too many entries in a single Workflow Execution's mutable state causes unstable persistence.
To protect the system, Temporal enforces a maximum number of incomplete Activities, Child Workflows, Signals, or Cancellation requests per Workflow Execution (by default, 2,000 for each type of operation).
Once the limit is reached for a type of operation, if the Workflow Execution attempts to start another operation of that type (by producing a `ScheduleActivityTask`, `StartChildWorkflowExecution`, `SignalExternalWorkflowExecution`, or `RequestCancelExternalWorkflowExecution` Command), it will be unable to (the Workflow Task Execution will fail and get retried).

These limits are set with the following [dynamic configuration keys](https://github.com/temporalio/temporal/blob/master/service/history/configs/config.go):

- `NumPendingActivitiesLimit`
- `NumPendingChildExecutionsLimit`
- `NumPendingSignalsLimit`
- `NumPendingCancelRequestsLimit`
