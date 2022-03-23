---
id: what-is-a-workflow-execution
title: What is a Workflow Execution?
sidebar_label: Workflow Execution
description: A Temporal Workflow Execution is a durable, scalable, reliable, and reactive function execution. It is a Temporal Application’s main unit of execution.
tags:
  - explanation
---

A Temporal Workflow Execution is a durable, reliable, and scalable function execution.
It is a Temporal Application’s main unit of execution.

- [How to spawn a Workflow Execution in Go](/docs/go/how-to-spawn-a-workflow-execution-in-go)
- [How to spawn a Workflow Execution in Java](/docs/java/how-to-spawn-a-workflow-execution-in-java)

Each Temporal Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and communicates with other Workflow Executions and the environment via message passing.

A Temporal Application can consist of millions to billions of Workflow Executions.
Workflow Executions are lightweight components.
A Workflow Execution consumes few compute resources; in fact, if a Workflow Execution is suspended, such as when it is in a waiting state, the Workflow Execution consumes no compute resources at all.

**Durability**

Durability is responsiveness over a period time.
A Workflow Execution is durable because it executes a Temporal Workflow Definition, also called a Temporal Workflow Function, your application code, effectively once and to completion—whether your code executes for seconds or years.
Durability is realized through the execution semantics of a Workflow Execution, which are carried out via Temporal's Event loop.

**Reliability**

Reliability is responsiveness in the presence of failure.
A Workflow Execution is reliable, because it is fully recoverable after a failure.
To be recoverable is the ability of a process to continue execution after the execution was suspended by a failure.
Reliability is realized through the execution semantics of a Workflow Execution, which are carried out via Temporal's Event loop.

**Scalability**

Scalability is responsiveness in the presence of load.
A Workflow Execution is scalable because the Temporal Platform is capable of supporting millions to billions of them concurrently.
This is realized in part due to the design and nature of a [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster) and in part due to the design and nature of [Worker Processes](/docs/concepts/what-is-a-worker-process).

### Commands

A Workflow Execution does just two things:

1. Issue [Commands](/docs/concepts/what-is-a-command)
2. Wait on an Awaitable provided from the generation of Commands.

![Command generation and waiting](/diagrams/workflow-execution-progession-simple.svg)

Commands are issued by the use of Workflow APIs in the [Workflow Definition](/docs/concepts/what-is-a-workflow-definition).

Whenever the Workflow Function is executed, Commands are generated.
The Worker Process supervises the Command generation and makes sure that it corresponds to the current Event History (See [Deterministic constraints](/docs/concepts/what-is-a-workflow-definition/#deterministic-constraints)).
The Worker Process batches the Commands and then suspends progress to send the Commands to the Cluster whenever the Workflow Function reaches a place where it can no longer progress without a result from a Awaitable.

Awaitables are provided when using APIs for the following:

- Spawning a [Child Workflow Execution](/docs/concepts/what-is-a-child-workflow-execution)
- Sending a [Signal](/docs/concepts/what-is-a-signal)
- Spawning an [Activity Execution](/docs/concepts/what-is-an-activity-execution)
- Requesting cancellation of another Workflow Execution
- Starting a Timer

### Status

A Workflow Execution may be either Open or Closed.

**Open**

- Running: The only Open status for a Workflow Execution, when Running the Workflow Execution is When a Workflow Execution is either actively progressing or suspended, waiting on something.

**Closed**

A Closed status means that the Workflow Execution has stopped progressing.

- Completed: The Workflow Execution has completed successfully.
- Continued-As-New: The Workflow Execution [Continued-As-New](/docs/concepts/what-is-continue-as-new)
- Terminated: The Workflow Execution was terminated.
- Cancelled: The Workflow Execution successfully handled a cancellation request.
- Failed: The Workflow Execution returned an error and failed.
- Timed Out: The Workflow Execution reached a timeout limit.

### Workflow Execution Chain

A Workflow Execution Chain is a sequence of Workflow Executions that share the same Workflow Id.
Each link in the Chain is often called a Workflow Run.
Each Workflow Run in the sequence is connected by one of the following:

- [Temporal Cron Job](/docs/concepts/what-is-a-temporal-cron-job)
- [Continue As New](/docs/concepts/what-is-continue-as-new)
* [Retries](/docs/concepts/what-is-a-retry-policy)

A Workflow Execution is uniquely identified by its [Namespace](/docs/concepts/what-is-a-namespace), [Workflow Id](/docs/concepts/what-is-a-workflow-id), and [Run Id](/docs/concepts/what-is-a-run-id).

The [Workflow Execution Timeout](/docs/concepts/what-is-a-workflow-execution-timeout) applies to a Workflow Execution Chain.
The [Workflow Run Timeout](/docs/concepts/what-is-a-workflow-run-timeout) applies to a single Workflow Execution (Workflow Run).

### Event loop

A Workflow Execution is made up of a set of [Events](/docs/concepts/what-is-an-event) called an [Event History](/docs/concepts/what-is-an-event-history).
Events are created by the Temporal Cluster in response to either Commands or actions requested by a Temporal Client (such as a request to spawn a Workflow Execution).

![Workflow Execution](/diagrams/workflow-execution-swim-lane-01.svg)

### Time constraints

**Is there a limit to how long Workflows can run?**

No, there is no time constraint on how long a Workflow Execution can be Running.

However, Workflow Executions intended to run indefinitely should be written with some care.
The Temporal Cluster stores the complete Event History for the entire lifecycle of a Workflow Execution.
There is a hard limit of 50,000 Events in a Workflow Execution Event History, as well as a hard limit of 50MB in terms of size.
The Temporal Cluster logs a warning at every 10,000 Events.

To prevent "runaway" Workflow Executions you can use the Workflow Execution Timeout and/or the Workflow Run Timeout.
A Workflow Execution Timeout can be used to limit the duration of Workflow Execution Chain, and a Workflow Run Timeout can be used to limit the duration an individual Workflow Execution (Run).

You can use the [Continue-As-New](/docs/concepts/what-is-continue-as-new) feature to create a new Workflow Execution.
The Workflow Execution spawned from Continue-As-New has the same Workflow Id, new Run Id, a fresh Event History, and is passed all the appropriate parameters.
For example, it may be reasonable to use Continue-As-New once per day for a long-running Workflow Execution that is generating a large Event History.
