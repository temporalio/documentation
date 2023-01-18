---
id: commands
title: Commands reference
sidebar_label: Commands
description: A Command is a requested action issued by a Worker to the Temporal Cluster after a Workflow Task Execution completes.
tags:
  - reference
---

A [Command](/concepts/what-is-a-command) is a requested action issued by a [Worker](/concepts/what-is-a-worker) to the [Temporal Cluster](/concepts/what-is-a-temporal-cluster) after a [Workflow Task Execution](/concepts/what-is-a-workflow-task-execution) completes.

The following is a complete list of possible Commands.

### CompleteWorkflowExecution

This Command is triggered when the Workflow Function Execution returns.
It indicates to the Cluster that the [Workflow Execution](/workflows#workflow-execution) is complete.
The corresponding [Event](/concepts/what-is-an-event) for this Command is one of the few Events that will be the last in a Workflow Execution [Event History](/concepts/what-is-an-event-history).

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionCompleted](/references/events/#workflowexecutioncompleted)

### ContinueAsNewWorkflowExecution

This Command is triggered when there is a call to [Continue-As-New](/concepts/what-is-continue-as-new) from within the [Workflow](/concepts/what-is-a-workflow).
The corresponding Event for this Command is one of the few Events that will be the last in a Workflow Execution Event History.

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionContinuedAsNew](/references/events/#workflowexecutioncontinuedasnew)

### FailWorkflowExecution

This Command is triggered when the Workflow Execution returns an error or an exception is thrown.

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionFailed](/references/events/#workflowexecutionfailed)

### CancelWorkflowExecution

This Command is triggered when the Workflow has successfully cleaned up after receiving a Cancellation Request (which will be present as [WorkflowExecutionCancelRequestedEvent](/references/events/#workflowexecutioncancelrequested) in the Event History).
The Corresponding Event for this Command is one of the few Events that will be the last in a Workflow Execution Event History.

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionCanceled](/references/events/#workflowexecutioncanceled)

### StartChildWorkflowExecution

This Command is triggered by a call to spawn a [Child Workflow Execution](/concepts/what-is-a-child-workflow-execution).

- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [ChildWorkflowExecutionStarted](/references/events/#childworkflowexecutionstarted)

By default, OSS users cannot have more than 50,000 pending Child Workflows.

### SignalExternalWorkflowExecution

This Command is triggered by a call to [Signal](/concepts/what-is-a-signal) another Workflow Execution.

- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [SignalExternalWorkflowExecutionInitiated](/references/events/#signalexternalworkflowexecutioninitiated)

By default, OSS users cannot have more than 50,000 pending Signals to other Workflows.

### RequestCancelExternalWorkflowExecution

This Command is triggered by a call to request cancellation of another Workflow Execution.

- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [RequestCancelExternalWorkflowExecutionInitiated](/references/events/#requestcancelexternalworkflowexecutioninitiated)

By default, OSS users cannot have more than 50,000 pending Signals to other Workflows.

### ScheduleActivityTask

This Command is triggered by a call to execute an [Activity](/concepts/what-is-an-activity).

- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [ActivityTaskScheduled](/references/events/#activitytaskscheduled)

By default, OSS users cannot schedule more than 50,000 Activities.

### RequestCancelActivityTask

This Command is triggered by a call to request the cancellation of an [Activity Task](/concepts/what-is-an-activity-task).

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [ActivityTaskCancelRequested](/references/events/#activitytaskcancelrequested)

### StartTimer

This Command is triggered by a call to start a Timer.

- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [TimerStarted](/references/events/#timerstarted)

### CancelTimer

This Command is triggered by a call to cancel a Timer.

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [TimerCanceled](/references/events/#timercanceled)

### RecordMarker

This Command is triggered by the SDK.

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [MarkerRecorded](/references/events/#markerrecorded)

### UpsertWorkflowSearchAttributes

This Command is triggered by a call to "upsert" Workflow [Search Attributes](/concepts/what-is-a-search-attribute).

- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [UpsertWorkflowSearchAttributes](/references/events/#upsertworkflowsearchattributes)
