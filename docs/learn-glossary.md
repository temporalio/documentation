---
id: learn-glossary
title: Glossary
---

Temporal conceptualizes software development in a unique way. There are very few products that share overlapping methodologies and concepts with Temporal.

Therefore, the following terms are re-defined within the context of the Temporal product, and used throughout the documentation and reference material to describe aspects of it.

### Activity

An Activity is a business-level function that implements your application logic, such as calling a service or transcoding a media file.

- An Activity usually implements a single well-defined action; it can be short or long running.
- An Activity can be implemented as a synchronous method or fully asynchronously involving multiple processes.
- An Activity can be retried indefinitely according to the provided exponential retry policy.
- If for any reason an Activity is not completed within the specified timeout, an error is reported to the [Workflow](#workflow) which decides how to handle it. There is no limit for an Activity duration.

### Acitity Id

An Activity Id is a UUID that corresponds to an Activity.

### Activity Task

A Task that contains invocation information for an [Activity](#activity) that is delivered to an [Activity Worker](#activity-worker) through and an [Activity Task Queue](#activity-task-queue).

- Upon receiving an [Activity Task](#activity-task), an [Activity Worker](#activity-worker) executes the corresponding [Activity](#activity).

### Activity Task Queue

[Task Queue](#task-queue) that is used to deliver [Activity Tasks](#activity-task) to [Activity Workers](#activity-worker)

### Activity Worker

An object that is executed in the client application and receives [Activity Tasks](#activity-task) from an [Activity Task Queue](#activity-task-queue) that it is subscribed to.

Once the [Activity Task](#activity-task) is received it invokes the corresponding [Activity](#activity).

### Archival

Archival is a feature that automatically moves [Event Histories](#event-history) from normal persistence to a blob store after the [Workflow](#workflow) retention period.

- The purpose of Archival is to be able to keep [Event Histories](#event-history) as long as needed while not overwhelming the persistence store.
- There are two reasons why you may want to keep [Event Histories]((#event-history)) after the retention period has passed:
  1. Compliance: For legal reasons, [Event Histories](#event-history) may need to be stored for a long period of time.
  2. Debugging: Older [Event Histories](#event-history) can be referenced to help with debugging.

### Client Stub

A Client Stub is a client-side proxy in the Java SDK which is used to make remote invocations on an entity that it represents.

- To start a [Workflow](#workflow), for example, a Stub object which represents the [Workflow](#workflow) is created through a special API. Then the Stub is used to start, query, or signal the corresponding [Workflow](#worker).
- The Go SDK does make use of a Client Stub.

### Command

Any action taken by the [Workflow](#workflow) durable function is called a Command.

- Scheduling an [Activity](#activity), canceling a child [Workflow](#workflow), or starting a timer are all Commands for example.
- A [Workflow Task](#workflow-task) contains an optional list of Commands.
- Every Command is recorded in the [Event History](#event-history) as an [Event](#event).

### Event

An Event is an indivisible operation performed by your application.

- For example, `activity_task_started`, `task_failed`, or `timer_canceled` are all Events.
- Events are recorded in the [Event History](#event-history).

### Event History

The Event History is an append-log of [Events](#event) for your application.

- Event History is durably persisted by the Temporal service, enabling seamless recovery of your application state from crashes or failures.
- It also serves as an audit log for debugging.

### Local Activity

A [Local Activity](/docs/learn-activities#local-activities) is an [Activity](#activity) that is invoked directly in the same process by Workflow code.

- While a Local Activity consumes less resources than a normal [Activity](#activity), it is subject to shorter durations and a lack of rate limiting.

### Namespace

Temporal is backed by a multi-tenant service and the unit of isolation is called a Namespace.

- Each Namespace acts as a such for [Task Queue](#task-queue) names as well as [Workflow Ids](#workflow-id). For example, when a Workflow is started, it is started in a specific Namespace.
- Temporal guarantees a unique [Workflow Id](#workflow-id) within a Namespace, and supports running [Workflow Executions](#workflow-execution) to use the same [Workflow Id](#workflow-id) if they are in different Namespaces.
- Various configuration options like the retention period or Archival destination are configured per Namespace as well through a special CRUD API or through [`tctl`](./learn-cli).
- In a multi-cluster deployment, Namespace is a unit of fail-over.
- Each Namespace can only be active on a single Temporal cluster at a time. However, different Namespaces can be active in different clusters and can fail-over independently.

### Query

A Query is a synchronous (from the caller's point of view) operation that is used to report the state of a [Workflow](#workflow).

- A Query is inherently read only and cannot affect a workflow state.

### Run Id

A Run Id is UUID that a Temporal service assigns to each Workflow run.

- If allowed by a configured policy, you might be able to re-execute a Workflow, after it has closed or failed, with the same [Workflow Id](#workflow-id).
- Each such re-execution is called a run. Run Id is used to uniquely identify a run even if it shares a Workflow Id with others.

### Signal

A Signal is an external asynchronous request to a [Workflow](#workflow).

- A Signal can be used to deliver notifications or updates to a running [Workflow](#workflow) at any point in its existence.

### Task

A Task is the context needed to execute a specific [Activity](#activity) or Workflow state transition.

- There are two types of tasks:
  1. [Activity Task](#activity-task)
  2. [Workflow Task](#workflow-task)
- A single [Activity](#activity) execution corresponds to a single [Activity Task](#activity-task), while a [Workflow Execution](#workflow-execution) employs multiple [Workflow Tasks](#workflow-task).

### Task Queue

Common name for [Activity Task Queues](#activity-task-queue) and [Workflow Task Queues](#workflow-task-queue)

### Task Token

A Task Token is a unique correlation Id for a Temporal [Activity](#activity).

- [Activity](#activity) completion calls take a Task Token, [Namespace](#namespace), [Workflow Id](#workflow-id), or [Activity Id](#activity-id) as an argument.

### Worker

A Worker, also known as a Worker service, is a service that hosts the [Workflow](#workflow) and [Activity](#activity) implementations.

- The Worker polls the Temporal service for [Tasks](#task), performs those [Tasks](#task), and communicates [Task](#task) execution results back to the Temporal service.
- Worker services are developed, deployed, and operated by Temporal customers.

### Workflow

A fault-oblivious stateful function that orchestrates activities.

- A Workflow has full control over which [Activities](#activity) are executed, and in which order.
- A Workflow must not affect the external world directly, only through [Activities]((#activity)).
- What makes Workflow code a Workflow is that its state is preserved by Temporal. Therefore any failure of a [Worker](#worker) process that hosts the Workflow code does not affect the [Workflow Execution](#workflow-execution). The Workflow continues as if these failures did not happen. At the same time, [Activities](#activity) can fail any moment for any reason.
- Because Workflow code is fully fault-oblivious, it is guaranteed to get notifications about [Activity](#activity) failures or timeouts and act accordingly.
- There is no limit to the duration of a Workflow.

### Workflow Execution

An instance of a [Workflow](#workflow).

- The instance can be in the process of executing or it could have already completed execution.

### Workflow Id

A unique identifier for a [Workflow Execution](#workflow-execution).

- Temporal guarantees the uniqueness of an Id within a [Namespace](#namespace).
- An attempt to start a [Workflow](#workflow) with a duplicate Id results in an **already started** error.

### Workflow Task

A Workflow Task is a [Task](#task) that contains invocation information for a [Workfow](#workflow).

- Every time a new external event that might affect a [Workflow](#workflow) state is recorded, a Workflow Task that contains it, is added to a [Workflow Task Queue](#workflow-task-queue) and then picked up by a [Workflow Worker](#worflow-worker).
- After the new event is handled, the Workflow Task is completed with a list of [Commands](#command).
- Handling of a Workflow Task is usually very fast and is not related to the duration of operations that the [Workflow](#workflow) invokes.

### Workflow Task Queue

[Task Queue](#task-queue) that is used to deliver [Workflow Tasks](#workflow-task) to [Workflow Workers](#workflow-worker)

### Workflow Worker

A [Worker](#worker) service that receives [Workflow Tasks](#workflow-task) from an [Workflow Task Queue](#workflow-task-queue) it is subscribed to.

- Whenever a [Task](#task) is received it is handled by a corresponding [Workflow](#workflow).
