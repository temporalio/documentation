---
id: commands
title: Command reference
description: A Command is a requested action issued by a Worker to the Temporal Cluster, after the Worker has finished completing the execution of a Workflow Task.
tags:
  - reference
  - explanation
---

### What is a Command?

A Command is a requested action issued by a Worker to the Temporal Cluster, after the Worker has finished completing the execution of a Workflow Task.

The action that the Cluster takes is recorded in the Workflow Execution's Event History as an Event.

During the execution of a Workflow Task there may be several Commands that are generated.
The Commands are batched and sent to the Cluster as part of the Workflow Task completion request, after the Workflow Task has progressed as far as it can.

### CompleteWorkflowExecution

- Description: This Command is triggered when the last Workflow Task of the Workflow Execution has finished executing successfully.
Often this is when the last line of code in a Workflow Definition has been execution.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionComplete](/docs/reference/events/#workflowexecutioncompleted)

### ContinueAsNewWorkflowExecution

- Description: This Command is triggered when there is a call to ContinueAsNew from within the Workflow.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionContinuedAsNew](docs/reference/events/#workflowexecutioncontinuedasnew)

### FailWorkflowExecution

- Description: This is triggered when the Workflow Execution returns an error or an exception is thrown.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionFailed](/docs/reference/events/#workflowexecutionfailed)

### CancelWorkflowExecution

Note: CancelWorkflowExecution is another way to complete workflow after the CancellationRequested event was received.

- Description: ?
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: ?

### StartChildWorkflowExecution

- Description: Call to Execute a Child Workflow.
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [ChildWorkflowExecutionStarted](/docs/reference/events/#childworkflowexecutionstarted)

### SignalExternalWorkflowExecution

- Description: Call to Signal another Workflow
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [SignalExternalWorkflowExecutionInitiated](/docs/reference/events/#signalexternalworkflowexecutioninitiated)

### RequestCancelExternalWorkflowExecution

- Description: Call to request cancellation of another Workflow
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [RequestCancelExternalWorkflowExecutionInitiated](/docs/reference/events/#requestcancelexternalworkflowexecutioninitiated)

### ScheduleActivityTask

- Description: Call to execute an Activity
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [ActivityTaskScheduled](/docs/reference/events/#activitytaskscheduled)

### RequestCancelActivityTask

- Description: Call to request the cancellation of an Activity Task
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [ActivityTaskCancelRequested](/docs/reference/events/#activitytaskcancelrequested)

### StartTimer

- Description: Call to start a Timer
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [TimerStarted](/docs/reference/events/#timerstarted)

### CancelTimer

- Description: Call to cancel a Timer
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [TimerCanceled](/docs/reference/events/#timercanceled)

### RecordMarker

- Description: ?
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [MarkerRecorded](/docs/reference/events/#markerrecorded)

### UpsertWorkflowSearchAttributes

- Description: Call to upsert Workflow Search Attributes
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [UpsertWorkflowSearchAttributes](/docs/reference/events/#upsertworkflowsearchattributes)
