---
id: durability-through-replays
title: Understanding durability through Replays
description: History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
sidebar_label: Durability through Replays
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
  - replay
  - durable execution
---

If a regular function in Go crashes during execution, all of its state is lost. It can't be resumed, only restarted. From the developer's perspective, a Temporal Workflow resumes its execution at the point where the crash occurred, with all previous state intact, and continues on from there. You might wonder how it's able to achieve this, since there's no obvious checkpointing or state management in the code.

[History Replay](https://docs.temporal.io/dev-guide/go/testing#replay), sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution.

Temporal Workflow Execution works like so:

- The client application starts a Workflow Execution by calling the Temporal client SDK API like client.start_workflow() and passing the Workflow function to execute.
- This sends a command to the Temporal server to start the Workflow Execution. The server persists the Workflow state and sends back the WorkflowExecution handle.
- The client passes this WorkflowExecution to a Worker process to run it.
- The Worker loads the Workflow function definition and starts executing it step-by-step like a normal function.
- When the code hits an await on an async activity or signal, the Worker generates a Task based on that and returns execution back to the event loop.
- The Worker keeps polling the Temporal server for Tasks for that WorkflowExecution. When a Task is available, it executes the corresponding Activity function or Signal callback.
- Once the awaited Activity or Signal completes, the Workflow code resumes from where it left off and continues execution.
- This sequence continues until the Workflow function completes or hits a wait condition. The Worker persists the current state with Temporal server.
- Later, when a waited on condition is completed or a Task is available, the server notifies the Worker which loads the state and resumes Workflow execution.
- The Workflow code keeps running like this through different Workers until final completion. The Temporal server orchestrates persistence and hand-offs.

Certain Events in the history are a direct result of a particular Command issued by a Worker. For example, the `ScheduleActivityTask` Command results in an `ActivityTaskScheduled` Event, while the `StartTimer` Command results in a `TimerStarted` Event.

During Workflow Replay, the Worker uses this information to recover the state of the previous execution.

For example, if the `ScheduleActivityTask` Command has a corresponding `ActivityTaskScheduled` Event in the history, and this is followed by `ActivityTaskStarted` and `ActivityTaskCompleted` Events for that same Activity Type, it's clear that this Activity already ran successfully. In this case, the Worker does not issue the Command to the cluster requesting a new execution of the Activity. Instead, it assigns the result of the previous Activity Execution, which is stored in the Event History.

To further understand this concept, you can watch [How Temporal Provides Durable Execution](https://www.youtube.com/embed/5eNqspaNoxo?rel=0&iv_load_policy=3&modestbranding=1&showse) from our [Temporal 102](https://learn.temporal.io/courses/temporal_102/go) course.

The example application from this section generates eight different types of events:

- `WorkflowExecutionStarted`
- `WorkflowTaskScheduled`
- `WorkflowTaskStarted`
- `WorkflowTaskCompleted`
- `ActivityTaskScheduled`
- `ActivityTaskStarted`
- `ActivityTaskCompleted`
- `WorkflowExecutionCompleted`

For example, a `ScheduleActivityTask` command in SDK code generates an `ActivityTaskScheduled` Event server-side, and a `CompleteWorkflowExecution` command in the SDK generates a `WorkflowExecutionCompleted` Event. The Temporal API currently defines more than three dozen different types of Events.

Each logged Event defines one or more attributes used to store information specific to that Event, such as the error associated with a failed Activity or the duration of a Timer. Every Event has at least three attributes in common. The first is the Event ID, which uniquely identifies this Event within the History and also its position within the history. The second is the Event time, which is a timestamp representing when the Event occurred. The third is the Event Type, which specifies what kind of Event it is.

Events may also contain additional attributes that vary based on the Event Type. For example, the WorkflowExecutionStarted Event contains the Workflow Type and the data provided as input to at the start of execution. The `WorkflowExecutionCompleted` Event contains the result of that execution, while failed Workflows will end with a `WorkflowExecutionFailed` Event that contains the error returned by that execution.

For a complete list of events that can be produced by the Temporal Cluster, refer to the [Event Reference](https://docs.temporal.io/references/events). You can also watch [How Workflow Code Maps to Commands](https://www.youtube.com/embed/sjrZJEfe7NE?rel=0&iv_load_policy=3&modestbranding=1&showsearch=0&showinfo=0&wmode=transparent) and [How Commands Map to Events](https://www.youtube.com/embed/EcGcu-Q9sRw?rel=0&iv_load_policy=3&modestbranding=1&showsearch=0&showinfo=0&wmode=transparent) from our [Temporal 102](https://learn.temporal.io/courses/temporal_102/go) course, or refer to refer to [Let's Visualize a Workflow](https://temporal.io/blog/lets-visualize-a-workflow) on the Temporal blog.
