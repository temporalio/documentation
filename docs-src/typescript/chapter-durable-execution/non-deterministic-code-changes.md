---
id: non-deterministic-code-changes
title: Non-deterministic code changes
description: History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
sidebar_label: Durability through Replays
tags:
  - typescript sdk
  - developer-guide-doc-type
  - event history
  - replay
  - durable execution
---

The most important thing to take away from the section is to make sure you have an application versioning plan whenever you are developing and maintaining a Temporal Application that will eventually deploy to a production environment.

Versioning APIs and versioning strategies are covered in other parts of the developer's guide, this chapter sets the stage to understand why and how to approach those strategies.

<!--TODO ^ update with links to those places -->

### The Event History

Inspect the Event History of a recent Background Check Workflow using the `temporal workflow show` command:

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace
```

You should see output similar to this:

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

Let's take a closer look:

- `WorkflowExecutionStarted`: This Event is created in response to the request to start the Workflow Execution.
- `WorkflowTaskScheduled`: This Event indicates a Workflow Task is in the Task Queue.
- `WorkflowTaskStarted`: This Event indicates that a Worker successfully polled the Task and started evaluating Workflow code.
- `WorkflowTaskCompleted`: This Event indicates that the Worker suspended execution and made as much progress that it could.
- `ActivityTaskScheduled`: This Event indicates that the ExecuteActivity API was called and the Worker sent the [`ScheduleActivityTask`](/references/commands#scheduleactivitytask) Command to the Server.
- `ActivityTaskStarted`: This Event indicates that the Worker successfully polled the Activity Task and started evaluating Activity code.
  Visit the [Events](references/events.md) page to learn how and when this event is written into Workflow history.
  The process can be counter-intuitive.
- `ActivityTaskCompleted`: This Event indicates that the Worker completed evaluation of the Activity code and returned any results to the Server.
  In response, the Server schedules another Workflow Task to finish evaluating the Workflow code resulting in the remaining Events, `WorkflowTaskScheduled`.`WorkflowTaskStarted`, `WorkflowTaskCompleted`, `WorkflowExecutionCompleted`.

:::info Event reference

The [Event reference](/references/events) serves as a source of truth for all possible Events in the Workflow Execution's Event History and the data that is stored in them.

:::
