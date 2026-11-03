---
id: commands
title: Temporal Commands reference
sidebar_label: Commands
description: Reference for every Command a Worker can issue to the Temporal Service after completing a Workflow Task, including its corresponding Event.
toc_max_heading_level: 4
tags:
  - Reference
---

A [Command](/workflow-execution#command) is an action a [Worker](/workers#worker) requests from the [Temporal Service](/temporal-service) when it completes a [Workflow Task Execution](/tasks#workflow-task-execution).
The SDK generates Commands from your Workflow code, such as a call to execute an Activity or start a Timer.
The Temporal Service records an [Event](/workflow-execution/event#event) in the [Event History](/workflow-execution/event#event-history) for each Command.

Commands are defined in the [`CommandType` enum](https://github.com/temporalio/api/blob/master/temporal/api/enums/v1/command_type.proto) and [command messages](https://github.com/temporalio/api/blob/master/temporal/api/command/v1/message.proto) of the Temporal gRPC API.

Each Command on this page lists the following:

- **Awaitable:** Whether the Workflow can wait on the result of the Command.
- **Corresponding Event:** The Event the Temporal Service records for the Command.
- **Limit:** The default maximum number of pending operations of this type per Workflow Execution, if one applies.
  When a Workflow Execution reaches the limit, the Workflow Task fails and is retried.
  See [Workflow Execution limits](/workflow-execution/limits#workflow-execution-limits).

## Workflow Execution close Commands

Each of these Commands closes the Workflow Execution.
Its corresponding Event is the last Event in the Event History.

### CompleteWorkflowExecution

The Worker issues this Command when the Workflow Function returns.

- Awaitable: No
- Corresponding Event: [WorkflowExecutionCompleted](/references/events#workflowexecutioncompleted)

### ContinueAsNewWorkflowExecution

The Worker issues this Command when the Workflow calls [Continue-As-New](/workflow-execution/continue-as-new).

- Awaitable: No
- Corresponding Event: [WorkflowExecutionContinuedAsNew](/references/events#workflowexecutioncontinuedasnew)

### FailWorkflowExecution

The Worker issues this Command when the Workflow returns an error or throws an exception that fails the Workflow Execution.

- Awaitable: No
- Corresponding Event: [WorkflowExecutionFailed](/references/events#workflowexecutionfailed)

### CancelWorkflowExecution

The Worker issues this Command when the Workflow finishes cleaning up after a Cancellation Request.
The request appears in the Event History as a [WorkflowExecutionCancelRequested](/references/events#workflowexecutioncancelrequested) Event.

- Awaitable: No
- Corresponding Event: [WorkflowExecutionCanceled](/references/events#workflowexecutioncanceled)

## Activity Commands

### ScheduleActivityTask

The Worker issues this Command when the Workflow calls an [Activity](/activities).

- Awaitable: Yes
- Corresponding Event: [ActivityTaskScheduled](/references/events#activitytaskscheduled)
- Limit: 2,000 pending Activities

### RequestCancelActivityTask

The Worker issues this Command when the Workflow requests cancellation of an [Activity Task](/tasks#activity-task).

- Awaitable: No
- Corresponding Event: [ActivityTaskCancelRequested](/references/events#activitytaskcancelrequested)

## Timer Commands

### StartTimer

The Worker issues this Command when the Workflow starts a Timer, such as a call to sleep.

- Awaitable: Yes
- Corresponding Event: [TimerStarted](/references/events#timerstarted)

### CancelTimer

The Worker issues this Command when the Workflow cancels a Timer.

- Awaitable: No
- Corresponding Event: [TimerCanceled](/references/events#timercanceled)

## Child and external Workflow Commands

### StartChildWorkflowExecution

The Worker issues this Command when the Workflow starts a [Child Workflow Execution](/child-workflows).

- Awaitable: Yes
- Corresponding Event: [StartChildWorkflowExecutionInitiated](/references/events#startchildworkflowexecutioninitiated)
- Limit: 2,000 pending Child Workflows

### SignalExternalWorkflowExecution

The Worker issues this Command when the Workflow [sends a Signal](/sending-messages#sending-signals) to another Workflow Execution.

- Awaitable: Yes
- Corresponding Event: [SignalExternalWorkflowExecutionInitiated](/references/events#signalexternalworkflowexecutioninitiated)
- Limit: 2,000 pending Signals to other Workflows

### RequestCancelExternalWorkflowExecution

The Worker issues this Command when the Workflow requests cancellation of another Workflow Execution.

- Awaitable: Yes
- Corresponding Event: [RequestCancelExternalWorkflowExecutionInitiated](/references/events#requestcancelexternalworkflowexecutioninitiated)
- Limit: 2,000 pending Cancellation Requests to other Workflows

## Nexus Commands

### ScheduleNexusOperation

The Worker issues this Command when the caller Workflow executes a Nexus Operation.

- Awaitable: Yes
- Corresponding Event: [NexusOperationScheduled](/references/events#nexusoperationscheduled)
- Limit: 30 pending Nexus Operations.
  See [Nexus Operation limits](/workflow-execution/limits#workflow-execution-nexus-operation-limits).

### RequestCancelNexusOperation

The Worker issues this Command when the caller Workflow requests cancellation of a Nexus Operation.

- Awaitable: No
- Corresponding Event: [NexusOperationCancelRequested](/references/events#nexusoperationcancelrequested)

## Workflow metadata and SDK Commands

### RecordMarker

The SDK issues this Command to record data it needs to replay the Workflow deterministically, such as the result of a Side Effect, a Local Activity, or a version check.
Your Workflow code doesn't issue it directly.

- Awaitable: No
- Corresponding Event: [MarkerRecorded](/references/events#markerrecorded)

### UpsertWorkflowSearchAttributes

The Worker issues this Command when the Workflow adds or updates its [Search Attributes](/search-attribute).

- Awaitable: No
- Corresponding Event: [UpsertWorkflowSearchAttributes](/references/events#upsertworkflowsearchattributes)

### ModifyWorkflowProperties

The Worker issues this Command when the Workflow adds or updates its Memo.
The new values merge with the existing Memo.

- Awaitable: No
- Corresponding Event: [WorkflowPropertiesModified](/references/events#workflowpropertiesmodified)

### ProtocolMessage {/* #protocolmessagecommand */}

The Worker issues this Command to keep protocol messages, such as responses to Updates, in order with the Workflow's other Commands.

The Command points to a protocol message, and the Temporal Service creates the Event from that message.
The Command alone doesn't determine the resulting Event type.
For Updates, the Events are [WorkflowExecutionUpdateAccepted](/references/events#workflowexecutionupdateacceptedevent) and [WorkflowExecutionUpdateCompleted](/references/events#workflowexecutionupdatecompletedevent).
