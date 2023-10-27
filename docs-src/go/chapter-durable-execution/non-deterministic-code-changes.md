---
id: non-deterministic-code-changes
title: Non-deterministic code changes
description: History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
sidebar_label: Durability through Replays
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
  - replay
  - durable execution
---

The most important thing to remember from this section is to have an application versioning plan whenever you are developing and maintaining a Temporal Application that will eventually deploy to a production environment.

We cover versioning APIs and versioning strategies in other parts of the dev guide, this chapter is dedicated to explaining the fundamentals so that you understand why and how to approach those strategies.

<!--TODO ^ update with links to those places -->

### The Event History

Let's inspect the Event History of one the recent backgroundcheck Workflows using the `temporal workflow show` command:

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace
```

You will see output similar to this:

```shell
Progress:
  ID          Time                     Type
   1  2023-10-25T20:28:03Z  WorkflowExecutionStarted
   2  2023-10-25T20:28:03Z  WorkflowTaskScheduled
   3  2023-10-25T20:28:03Z  WorkflowTaskStarted
   4  2023-10-25T20:28:03Z  WorkflowTaskCompleted
   5  2023-10-25T20:28:03Z  ActivityTaskScheduled
   6  2023-10-25T20:28:03Z  ActivityTaskStarted
   7  2023-10-25T20:28:03Z  ActivityTaskCompleted
   8  2023-10-25T20:28:03Z  WorkflowTaskScheduled
   9  2023-10-25T20:28:03Z  WorkflowTaskStarted
  10  2023-10-25T20:28:03Z  WorkflowTaskCompleted
  11  2023-10-25T20:28:03Z  WorkflowExecutionCompleted

Result:
  Status: COMPLETED
  Output: ["pass"]
```

The preceding output shows eleven Events in the Event History ordered in a particular sequence.
All Events are created by the Temporal Server in response to either a request coming from a Temporal Client, or a [Command](/concepts/what-is-a-command) coming from the Worker.

:::info Event reference

The [Event reference](/references/events) serves as a source of truth for all possible Events in the Workflow Execution Event History.

:::

Let's change the Workflow code to see how this affects the Event History.

### Examples of Changes That May Lead to Non-Deterministic Errors

- Adding or removing an Activity
- Switching the Activity Type used in a call to `ExecuteActivity`
- Adding or removing a Timer
- Altering the execution order of Activities or Timers relative to one another

### Examples of Changes That Do Not Lead to Non-Deterministic Errors

- Modifying statements in a Workflow Definition, such as logging statements, that do not affect the Commands generated during Workflow Execution
- Changing attributes in a `ActivityOptions` or `RetryPolicy`
- Modifying code inside of an Activity Definition
