---
id: introduction
title: Introduction to Temporal
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LanguageLinkTabs from '../components/LanguageLinkTabs.js'
import RelatedRead from '../components/RelatedRead.js'

:::caution

This page is a work in progress!

:::

import WhatIsTemporal from '../content/what-is-temporal.md'

<WhatIsTemporal
heading=""
/>

## What is a Workflow?

In day-to-day conversations, the term "Workflow" frequently denotes either a [Workflow Prototype](#what-is-a-workflow-prototype) or a [Workflow Execution](#what-is-a-workflow-execution). This document is explicit and differentiates between Prototype and Execution.

<img class="docs-image-centered docs-image-max-width-50" src="/img/prototype-execution-cardinality.png" />

### Workflow Prototype

Coming soon!

### Workflow Definition

Coming soon!

### Workflow Execution

A Workflow Execution is a Reentrant Process; that is, a resumable, recoverable, and reactive process:

- Resumable: Ability of a process to continue execution after execution was suspended on an await-able.
- Recoverable: Ability of a process to continue execution after execution was suspended on a failure.
- Reactive: Ability of a process to react to external events.

<img class="docs-image-centered docs-image-max-width-50" src="/img/reentrant.png" />
<img class="docs-image-centered docs-image-max-width-50" src="/img/suspended.png" />

Each Workflow Execution has a set of properties that define its behavior.
Many of these properties can be a set in Workflow Execution Options.

### Workflow Id

A unique identifier for a [Workflow Execution](#workflow-execution).

- Temporal guarantees the uniqueness of an Id within a [Namespace](#namespace).
- An attempt to start a [Workflow](#workflow) with a duplicate Id results in an **already started** error if there is another open Workflow execution. However, this behavior depends on the `WorkflowIdReusePolicy` flag; if set to `ALLOW_DUPLICATE`, it is possible to start a new execution with the same Workflow Id.

### Run Id

A UUID that a Temporal service assigns to each [Workflow](#workflow) run.

- Temporal guarantees that only one [Workflow Execution](#workflow-execution) with a given [Workflow Id](#workflow-id) can be open at a time. But after the [Workflow Execution](#workflow-execution) has completed, if allowed by a configured policy, you might be able to re-execute a [Workflow](#workflow) after it has closed or failed, using the same [Workflow Id](#workflow-id).
- Each such re-execution is called a run. Run Id is used to uniquely identify a run even if it shares a [Workflow Id](#workflow-id) with others.

## What are Workflow Execution Options?

Each SDK provides an API for customizing the properties of a Workflow Execution.
The only property that is required to be set by the application developer is the name of the [Task Queue](#task-queue).
All other properties either have defaults or are not required to be set.

The following is a full list of all properties that can be customized for a Workflow Execution:

- [Task Queue](#task-queue)
- [Workflow Execution Timeout](#workflow-execution-timeout)
- [Workflow Run Timeout](#workflow-run-timeout)
- [Workflow Task Timeout](#workflow-task-timeout)
- [Namespace](#namespace)
- [Workflow Id](#workflow-id)
- [Workflow Id Reuse Policy](#workflow-id-reuse-policy)
- [Wait For Cancellation](#wait-for-cancellation)
- [Data Converter](#data-converter)
- [Retry Policy](#what-is-a-retry-policy)
- [Cron Schedule](#cron-schedule)
- [Context Propagators](#context-propagators)
- [Memo](#memo)
- [Search Attributes](#search-attributes)
- [Parent Close Policy](#parent-close-policy)

<LanguageLinkTabs
goText="How to provide Workflow Options in Go"
goGoTo="#"
javaText="How to provide Workflow Options in Java"
javaGoTo="#"
nodeText="How to provide Workflow Options in Node.js"
nodeGoTo="#"
phpText= "How to provide Workflow Options in PHP"
phpGoTo="#"
/>

## What are the timeout properties of a Workflow Execution?

A Workflow Execution has three unique timeout properties.
A timeout property sets the maximum interval that is acceptable between two expected actions that must take place.
Each timeout property has a default value, but can be customized in [Workflow Execution Options](#what-are-workflow-options)

### Workflow Execution Timeout

This is the maximum time that a Workflow Execution can be executing for (have an Open status) including retries and any usage of [Continue As New](#continue-as-new).
**The default value is set to 10 years.**
If this timeout is reached then the Workflow Execution will change to a Timed Out status.

This timeout is most commonly used for stopping the execution of a [cron scheduled Workflow](#cron-schedule) after a certain amount of time has passed. This timeout is different from the [Workflow Run timeout](#workflow-run-timeout).

### Workflow Run Timeout

This is the maximum amount of time that a single Workflow Run is restricted to.
**The default is set to the same value as the [Execution timeout](#execution-timeout).**

This timeout is most commonly used to limit the execution time of a single [cron scheduled Workflow Execution](#cron-schedule).
If this timeout is reached and there is an associated Retry Policy, the Workflow will be retried before any scheduling occurs.
If there is no Retry Policy then the Workflow will be scheduled per the [cron schedule](#cron-schedule).

### Workflow Task Timeout

This is the maximum amount of time that the Server will wait for the Worker to start processing a [Workflow Task](#workflow-task) after the Task has been pulled from the Task Queue.
**The default value is 10 seconds.**

This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value would be to accommodate a Workflow Execution that has a very long Workflow Execution History that could take longer than 10 seconds for the Worker to load.

### Workflow Task

A [Task](#task) that contains invocation information for a [Workfow](#workflow).

- Every time a new external event that might affect a [Workflow](#workflow) state is recorded, a Workflow Task that contains the event is added to a [Task Queue](#task-queue) and then picked up by a [Workflow Worker](#worker).
- After the new event is handled, the Workflow Task is completed with a list of [Commands](#command).
- Handling of a Workflow Task is usually very fast and is not related to the duration of operations that the [Workflow](#workflow) invokes.

### Workflow Task Execution

Coming soon.

## Activity

A business-level function that implements your application logic, such as calling a service or transcoding a media file.

- An Activity usually implements a single well-defined action; it can be short or long running.
- An Activity can be implemented as a synchronous method or fully asynchronously involving multiple processes.
- An Activity can be retried indefinitely according to the provided exponential retry policy.
- If for any reason an Activity is not completed within the specified timeout, an error is reported to the [Workflow](#workflow), which decides how to handle it. The duration of an Activity has no limit.
- Activities support an [Activity Heartbeat](#activity-heartbeat) that helps to identify timeouts faster in case the Activity execution fails.

### Activity Execution

Coming soon.

### Activity Task

A [Task](#task) that contains invocation information for an [Activity](#activity) that is delivered to an [Activity Worker](#worker) through a [Task Queue](#task-queue).

- Upon receiving an [Activity Task](#activity-task), an [Activity Worker](#worker) executes the corresponding [Activity](#activity).

### Activity Task Execution

Coming soon.

### Activity Id

A unique Id that identifies an [Activity](#activity) that is executing. The Id can be generated by the system, or it can be provided by the Workflow code that invoked the [Activity](#activity). An Activity Id can be used to complete the [Activity](#activity) asynchronously.

### Activity Heartbeat

Provides to the Temporal server the status of an [Activity Task](#activity-task) that is being executed.

- Activity Heartbeats help ensure that [Activity](#activity) execution failures and timeouts are identified quickly.
- Activity Heartbeats are implemented in code and are recorded at the discretion of the [Workflow](#workflow) implementation.
- Custom [Activity](#activity) progress information can be included in an Activity Heartbeat and can be used when the [Activity](#activity) is retried.

### Local Activity

An [Activity](#activity) that is invoked directly in the same process by Workflow code.

- Although a Local Activity consumes less resources than a normal [Activity](#activity), it is subject to shorter durations and a lack of rate limiting.

import WhatIsARetryPolicy from '../content/what-is-a-retry-policy.md'

<WhatIsARetryPolicy
heading="##"
/>

## Event

For each [Workflow](#workflow), Temporal tracks two types of Events:

1. [Command](#command) Events.
2. Everything else.

- Command Events are events that correspond to [Commands](#command) produced by the [Workflow Worker](#worker).
- All other events represent various external occurrences that the [Workflow] is expected to react to, such as an [Activity](#activity) completion, a timer firing, or a cancellation request.
- All Events are recorded in the [Event History](#event-history).

## Event History

An append-log of [Events](#event) for your application.

- Event History is durably persisted by the Temporal service, enabling seamless recovery of your application state from crashes or failures.
- It also serves as an audit log for debugging.

## Command

Any action requested by the [Workflow](#workflow) durable function.

- Scheduling an [Activity](#activity), canceling a child [Workflow](#workflow), or starting a timer are all examples of Commands.
- A [Workflow Task](#workflow-task) contains an optional list of Commands.
- A [Worker](#worker) executing a [Workflow](#workflow) generates a list of Commands as a result of a [Workflow Task](#workflow-task). This list is sent to the Temporal service as part of the [Workflow Task](#workflow-task) completion request.
- Every Command is recorded in the [Event History](#event-history) as an [Event](#event). For example, the `StartTimer` command is recorded as a corresponding `TimerStarted` event.

## Archival

A feature that automatically moves [Event Histories](#event-history) from normal persistence to a blob store after the [Workflow](#workflow) retention period.

- The purpose of Archival is to keep [Event Histories](#event-history) as long as needed while not overwhelming the persistence store.
- You might want to keep [Event Histories](#event-history) after the retention period has passed for two reasons:
  1. Compliance: For legal reasons, [Event Histories](#event-history) may need to be stored for a long period of time.
  2. Debugging: Older [Event Histories](#event-history) can be referenced to help with debugging.

## Client Stub

A client-side proxy in the Java SDK that is used to make remote invocations on an entity that it represents.

- To start a [Workflow](#workflow), for example, a Stub object that represents the [Workflow](#workflow) is created through a special API. Then the Stub is used to start, query, or signal the corresponding [Workflow](#worker).
- The Go SDK does not use Client Stubs.

## Namespace

The unit of isolation within Temporal, which is backed by a multi-tenant service.

- By default, a Temporal service is provisioned with a "default" Namespace. All APIs and tools, such as the UI and CLI, default to the "default" Namespace if it is not specified. So, if you are not planning to use multiple Namespaces, we recommend using the default one.
- [Task Queue](#task-queue) names and [Workflow Ids](#workflow-id) correspond to a specific Namespace. For example, when a [Workflow](#workflow) is started, it starts within a specific Namespace.
- Temporal guarantees a unique [Workflow Id](#workflow-id) within a Namespace. Temporal supports running [Workflow Executions](#workflow-execution) that use the same [Workflow Id](#workflow-id) if they are in different Namespaces.
- Various configuration options like the retention period or [Archival](#archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/docs/system-tools/tctl/).
- In a multi-cluster deployment, Namespace is a unit of fail-over.
- Each Namespace can be active on only a single Temporal cluster at a time. However, different Namespaces can be active in different clusters and can fail-over independently.

## Query

From the caller's point of view, a synchronous operation that is used to report the state of a [Workflow](#workflow).

- Query logic is implemented as code within a [Workflow](#workflow).
- A Query is inherently read-only and cannot affect a [Workflow](#workflow) state.

## Signal

An external asynchronous request to a [Workflow](#workflow).

- A Signal can be used to deliver notifications or updates to a running [Workflow](#workflow) at any point in its existence.

## Task

The context needed to execute a specific [Activity](#activity) or [Workflow](#workflow) state transition.

- There are two types of tasks:
  - [Activity Task](#activity-task)
  - [Workflow Task](#workflow-task)
- A single [Activity](#activity) execution corresponds to a single [Activity Task](#activity-task), while a [Workflow Execution](#workflow-execution) employs multiple [Workflow Tasks](#workflow-task).

### Task Queue

A queue that a [Worker](#worker) subscribes to and polls to pick up tasks to execute.

- Each Task Queue is capable of queuing [Activity Tasks](#activity-task) and [Workflow Tasks](#workflow-task).
- Task Queues rely on the same persistent storage as the rest of the Temporal service. (Task Queues are not based on other technologies such as Kafka.)

### Task Token

A unique correlation Id for a Temporal [Activity](#activity).

- [Activity](#activity) completion calls take either a single Task Token, or the [Namespace](#namespace), [Workflow Id](#workflow-id), and [Activity Id](#activity-id) as a set of arguments.

## Worker

A service that hosts the [Workflow](#workflow) and [Activity](#activity) implementations.

- A single Worker actually contains both an [Activity Worker](#worker) and a [Workflow Worker](#worker), abstracting the logical separation and having the ability to execute both types of tasks.
- The Worker polls the Temporal service for [Tasks](#task), performs those [Tasks](#task), and communicates [Task](#task) execution results back to the Temporal service.
- Worker services are developed, deployed, and operated by Temporal customers.
