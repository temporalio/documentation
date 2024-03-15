---
id: non-deterministic-code-changes
title: Non-deterministic code changes
description: History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
sidebar_label: Durability through Replays
tags:
  - java sdk
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
   1  2023-11-08T21:58:50Z  WorkflowExecutionStarted
   2  2023-11-08T21:58:50Z  WorkflowTaskScheduled
   3  2023-11-08T21:58:50Z  WorkflowTaskStarted
   4  2023-11-08T21:58:50Z  WorkflowTaskCompleted
   5  2023-11-08T21:58:50Z  TimerStarted
   6  2023-11-08T21:59:50Z  TimerFired
   7  2023-11-08T21:59:50Z  WorkflowTaskScheduled
   8  2023-11-08T21:59:50Z  WorkflowTaskStarted
   9  2023-11-08T21:59:50Z  WorkflowTaskCompleted
  10  2023-11-08T21:59:50Z  ActivityTaskScheduled
  11  2023-11-08T21:59:50Z  ActivityTaskStarted
  12  2023-11-08T21:59:50Z  ActivityTaskCompleted
  13  2023-11-08T21:59:50Z  WorkflowTaskScheduled
  14  2023-11-08T21:59:50Z  WorkflowTaskStarted
  15  2023-11-08T21:59:50Z  WorkflowTaskCompleted
  16  2023-11-08T21:59:50Z  WorkflowExecutionCompleted

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
- `TimerStarted`: This Event schedules a durable timer and records it in the Event History.
- `TimerFired`: After the time specified in the Timer has passed, the Timer fires, resuming execution.
- `WorkflowTaskScheduled`: The Workflow resumes progress and records a `WorkflowTaskScheduled` event to drive progress forward.
- `WorkflowTaskStarted`: The Workflow will continue executing when an available Worker polls the Temporal Cluster and picks up the task to be executed. Once the Worker has begun it issues a `WorkflowTaskStarted` command to the cluster.
- `WorkflowTaskCompleted`: The Workflow progresses until it reaches a line that issues a Command to the Temporal Cluster. The Workflow suspends execution as it made as much progress as it could.
- `ActivityTaskScheduled`: This Event indicates that a request to execute an Activity was made, in this instance a call to the `SSNTraceActivity`, and the Worker sent the [`ScheduleActivityTask`](/references/commands#scheduleactivitytask) Command to the Server.
- `ActivityTaskStarted`: This Event indicates that the Worker successfully polled the Activity Task and started evaluating Activity code.
  The ActivityTaskStarted event is written into Workflow history when your activity completes or fails after all of its retries.
  It may be counter-intuitive that this happens after the terminal Event (like [ActivityTaskCompleted](/references/events#activitytaskcompleted) or [ActivityTaskFailed](/references/events#activitytaskfailed)).
  Don't be misled into thinking that the activity is failing to start.
  See [When does Temporal write the ActivityTaskStarted event into Workflow history?](https://community.temporal.io/t/when-does-temporal-write-the-activitytaskstarted-event-into-workflow-history/6162) for more details.
- `ActivityTaskCompleted`: This Event indicates that the Worker completed evaluation of the Activity code and returned any results to the Server.
  In response, the Server schedules another Workflow Task to finish evaluating the Workflow code resulting in the remaining Events, `WorkflowTaskScheduled`.`WorkflowTaskStarted`, `WorkflowTaskCompleted`, `WorkflowExecutionCompleted`.

:::info Event reference

The [Event reference](/references/events) serves as a source of truth for all possible Events in the Workflow Execution's Event History and the data that is stored in them.

:::
