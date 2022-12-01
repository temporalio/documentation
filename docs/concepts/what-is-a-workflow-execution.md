---
id: what-is-a-workflow-execution
title: What is a Workflow Execution?
sidebar_label: Workflow Execution
description: A Temporal Workflow Execution is a durable, scalable, reliable, and reactive function execution. It is the main unit of execution of a Temporal Application.
tags:
  - term
  - explanation
---

A Temporal Workflow Execution is a durable, reliable, and scalable function execution.
It is the main unit of execution of a [Temporal Application](/concepts/what-is-a-temporal-application).

- [How to start a Workflow Execution using an SDK](/application-development/foundations#start-workflow-execution)
- [How to start a Workflow Execution using tctl](/tctl-v1/workflow#start)

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

### Commands and awaitables

A Workflow Execution does two things:

1. Issue [Commands](/concepts/what-is-a-command).
2. Wait on an Awaitables (often called Futures).

![Command generation and waiting](/diagrams/workflow-execution-progession-simple.svg)

Commands are issued and Awaitables are provided by the use of Workflow APIs in the [Workflow Definition](/concepts/what-is-a-workflow-definition).

Commands are generated whenever the Workflow Function is executed.
The Worker Process supervises the Command generation and makes sure that it maps to the current Event History.
(For more information, see [Deterministic constraints](/concepts/what-is-a-workflow-definition/#deterministic-constraints).)
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

A Workflow Execution can be either Open or Closed.

![Workflow Execution statuses](/diagrams/workflow-execution-statuses.svg)

**Open**

- Running: The only Open status for a Workflow Execution.
  When the Workflow Execution is Running, it is either actively progressing or is waiting on something.

**Closed**

A Closed status means that the Workflow Execution cannot make further progress because of one of the following reasons:

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
There is a hard limit of 50,000 Events in a Workflow Execution Event History, as well as a hard limit of 50 MB in terms of size.
The Temporal Cluster logs a warning at every 10,000 Events.
When the Event History reaches 50,000 Events or the size limit of 50 MB, the Workflow Execution is forcefully terminated.

To prevent _runaway_ Workflow Executions, you can use the Workflow Execution Timeout, the Workflow Run Timeout, or both.
A Workflow Execution Timeout can be used to limit the duration of Workflow Execution Chain, and a Workflow Run Timeout can be used to limit the duration an individual Workflow Execution (Run).

You can use the [Continue-As-New](/concepts/what-is-continue-as-new) feature to close the current Workflow Execution and create a new Workflow Execution in a single atomic operation.
The Workflow Execution spawned from Continue-As-New has the same Workflow Id, a new Run Id, and a fresh Event History and is passed all the appropriate parameters.
For example, it may be reasonable to use Continue-As-New once per day for a long-running Workflow Execution that is generating a large Event History.
