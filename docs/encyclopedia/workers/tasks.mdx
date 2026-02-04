---
id: tasks
title: Tasks
sidebar_label: Tasks
description: Learn about the types of Tasks in Temporal and their role in Workflow and Activity Executions.
slug: /tasks
toc_max_heading_level: 4
keywords:
  - tasks
  - activity task
  - workflow task
tags:
  - Tasks
  - Concepts
---

This page discusses the following:

- [Task](#task)
- [Workflow Task](#workflow-task)
  - [When are Workflow Tasks scheduled?](#when-workflow-tasks-scheduled)
  - [How does a Worker process a Workflow Task?](#how-worker-processes-workflow-task)
  - [How does the SDK know which code to run?](#how-sdk-knows-code)
  - [Workflow Tasks and Determinism](#workflow-tasks-determinism)
  - [Performance characteristics](#workflow-task-performance)
- [Workflow Task Execution](#workflow-task-execution)
- [Workflow Task Failures vs Workflow Execution Failures](#workflow-task-failures-vs-execution-failures)
- [Activity Task](#activity-task)
- [Activity Task Execution](#activity-task-execution)
- [Nexus Task](#nexus-task)
- [Nexus Task Execution](#nexus-task-execution)

## What is a Task? {#task}

A Task is the context that a Worker needs to progress with a specific [Workflow Execution](/workflow-execution),
[Activity Execution](/activity-execution), or a [Nexus Task Execution](#nexus-task-execution).

There are three types of Tasks:

- [Workflow Task](#workflow-task)
- [Activity Task](#activity-task)
- [Nexus Task](#nexus-task)

## What is a Workflow Task? {#workflow-task}

A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.

### When are Workflow Tasks scheduled? {#when-workflow-tasks-scheduled}

The Temporal Service creates and schedules a new Workflow Task whenever one of the following occurs:

- The Workflow Execution is started
- A Signal is sent to the Workflow
- An Update is sent to the Workflow
- An Activity completes (successfully or with a failure)
- A Timer fires
- A Child Workflow completes
- A Workflow Task fails and needs to be retried

Any event that might affect the Workflow's state triggers a new Workflow Task. The Workflow Task bundles together all
new events that have occurred since the last Workflow Task completed.

### How does a Worker process a Workflow Task? {#how-worker-processes-workflow-task}

When a Worker picks up a Workflow Task, it replays the entire Workflow Execution from the beginning using the Event
History.

- The Worker receives the Workflow Task, which contains the complete Event History for the Workflow Execution
- The Workflow Worker replays the Workflow code from the start, using the Event History to recreate the Workflow's state
- During replay, previously executed operations (like Activity calls or Timers) return their results immediately from
  the Event History instead of executing again
- The replay continues until the Worker reaches a point where it needs to make new progress (a new Activity to schedule,
  a new Timer to set, etc.)
- The Workflow code executes any new decisions and generates Commands
- The Worker sends these Commands back to the Temporal Service, completing the Workflow Task
- The Temporal Service persists the Commands as new Events in the Event History

This replay mechanism makes Temporal Workflows durable and fault-tolerant. If a Worker crashes mid-execution, another
Worker can pick up the Workflow Task and replay the entire history to reconstruct the exact state before continuing

### What is a Workflow Task Execution? {#workflow-task-execution}

A Workflow Task Execution occurs when a [Worker](/workers#worker-entity) picks up a [Workflow Task](#workflow-task) and
uses it to make progress on the execution of a [Workflow Definition](/workflow-definition) (also known as a Workflow
function).

Workflow Task Execution is typically very fast (milliseconds). The Worker replays code and makes decisions based on the
Event History. No actual I/O operations occur during replay (Activity results come from history). The time spent in a
Workflow Task is unrelated to how long Activities or Timers take.

## Workflow Task Failures vs Workflow Execution Failures {#workflow-task-failures-vs-execution-failures}

Understanding the difference between Workflow Task failures and Workflow Execution failures is essential to working with
Temporal at a deeper level.

**Workflow Task failure** means a Worker can't successfully process a Workflow Task due to infrastructure, Workflow
code, or execution environment issues (not business logic). Common causes include non-determinism, unhandled exceptions,
task timeouts, invalid Commands, or bad binary checksums. The Service automatically retries the task with exponential
backoff, and the Workflow Execution stays Open until a task completes, an operator terminates it, or the Workflow
Execution Timeout is reached. Fixes typically involve correcting code, scaling Workers, or resolving infrastructure
problems.

**Workflow Execution failure** means the Workflow's business logic determines it can't complete. It occurs when Workflow
code throws or returns an error, an Activity failure propagates uncaught, or an external system terminates/cancels the
Workflow. The Workflow closes with a Failed status and does not automatically retry; if a Retry Policy is configured,
the Service starts a new Run with the same Workflow ID and continues retrying until success or exhaustion. Each retry is
a separate Run with its own Event History.

The table summarizes the differences:

| Aspect              | Workflow Task Failure                                  | Workflow Execution Failure                                  |
| ------------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| **What failed**     | Infrastructure or Workflow code has a bug              | Business logic determined the Workflow cannot succeed       |
| **Workflow state**  | Workflow Execution remains Open                        | Workflow Execution closes (Failed, Terminated, etc.)        |
| **Automatic retry** | Always retried automatically by the Service            | Only retried if a Workflow Retry Policy is configured       |
| **Event History**   | Same Event History continues to grow                   | Each retry run has a separate Event History                 |
| **How to resolve**  | Fix code/infrastructure and redeploy                   | May require business logic changes or external intervention |
| **Visibility**      | Shows as Workflow Task failures in history and metrics | Shows as a Failed Workflow Execution in the UI              |

**Workflow Task failure example:** A new deployment introduces non-determinism, existing Workflows fail Workflow Tasks,
and the executions stay Open and retry. After deploying a fix, the Workflows automatically continue.

**Workflow Execution failure example:** A payment Activity fails due to a declined card, the failure propagates
uncaught, and the Workflow closes as Failed. The customer updates payment details and restarts the order.

## What is an Activity Task? {#activity-task}

An Activity Task contains the context needed to proceed with an [Activity Task Execution](#activity-task-execution).
Activity Tasks largely represent the Activity Task Scheduled Event, which contains the data needed to execute an
Activity Function.

If Heartbeat data is being passed, an Activity Task will also contain the latest Heartbeat details.

### What is an Activity Task Execution? {#activity-task-execution}

An Activity Task Execution occurs when a [Worker](/workers#worker-entity) uses the context provided from the
[Activity Task](#activity-task) and executes the [Activity Definition](/activity-definition) (also known as the Activity
Function).

The [ActivityTaskScheduled Event](/references/events#activitytaskscheduled) corresponds to when the Temporal Service
puts the Activity Task into the Task Queue.

The [ActivityTaskStarted Event](/references/events#activitytaskstarted) corresponds to when the Worker picks up the
Activity Task from the Task Queue.

Either [ActivityTaskCompleted](/references/events#activitytaskcompleted) or one of the other Closed Activity Task Events
corresponds to when the Worker has yielded back to the Temporal Service.

The API to schedule an Activity Execution provides an "effectively once" experience, even though there may be several
Activity Task Executions that take place to successfully complete an Activity.

Once an Activity Task finishes execution, the Worker responds to the Temporal Service with a specific Event:

- ActivityTaskCanceled
- ActivityTaskCompleted
- ActivityTaskFailed
- ActivityTaskTerminated
- ActivityTaskTimedOut

## What is a Nexus Task? {#nexus-task}

A Nexus Task represents a single Nexus request to start or cancel a Nexus Operation. The Nexus Task includes details
such as the Nexus Service and Nexus Operation names, and other information required to process the Nexus request. The
Temporal Worker triggers the registered Operation handler based on the Nexus task information.

### What is a Nexus Task Execution? {#nexus-task-execution}

A Nexus Task Execution occurs when a Worker uses the context provided from the Nexus Task and executes an action
associated with a Nexus Operation which commonly includes starting a Nexus Operation using it's Nexus Operation handler
plus many additional actions that may be performed on a Nexus Operation.

The NexusOperationScheduled Event corresponds to when the Temporal Service records the Workflow's intent to schedule an
operation.

The NexusOperationStarted Event corresponds to when the Worker picks up the Nexus Task from the Task Queue, starts an
asynchronous Nexus Operation, and returns an Operation token to the caller indicating the asynchronous Nexus Operation
has started.

Either NexusOperationCompleted or one of the other Closed Nexus Operation Events corresponds to when the Nexus Operation
has reached a final state due to successfully completing the operation or unsuccessfully completing the operation in the
case of a failure, timeout, or cancellation.

A Nexus Operation Execution appears to the caller Workflow as a single RPC, while under the hood the Temporal Service
may issue several Nexus Tasks to attempt to start the Operation. Hence, a Nexus Operation Handler implementation should
be idempotent. The WorkflowRunOperation provided by the SDK leverages Workflow ID based deduplication to ensure
idempotency and provide an "effectively once" experience.

A Nexus Task Execution completes when a Worker responds to the Temporal Service with either a RespondNexusTaskCompleted
or RespondNexusTaskFailed call, or when the Task times out.

The Temporal Service interprets the outcome and determines whether to retry the Task or record the progress in a History
Event:

- NexusTaskCompleted
- NexusTaskFailed
