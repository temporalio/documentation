---
id: event-types
title: Event type reference
sidebar_label: Event types reference
---

Event types are defined in the Server API [event_type.proto](https://github.com/temporalio/api/blob/master/temporal/api/enums/v1/event_type.proto) file.
If you are new to debugging and monitoring your Workflows, check the relevant sections in our [production deployment guide](https://docs.temporal.io/docs/server/production-deployment).

#### EVENT_TYPE_UNSPECIFIED

This event type is a place holder and should never appear in a Workflow execution history.

#### EVENT_TYPE_WORKFLOW_EXECUTION_STARTED

This event type indicates that the workflow execution is started / triggered and contains Workflow execution inputs, as well as Workflow timeout configurations.

#### EVENT_TYPE_WORKFLOW_EXECUTION_COMPLETED

This event type indicates that the Workflow execution has successfully completed and contains Workflow execution results.

#### EVENT_TYPE_WORKFLOW_EXECUTION_FAILED

This event type indicates that the Workflow execution has unsuccessfully completed and contains the Workflow execution error.

#### EVENT_TYPE_WORKFLOW_EXECUTION_TIMED_OUT

This event type indicates that the Workflow execution has timed out by the Temporal Server due to the Workflow having not been completed within timeout settings.

#### EVENT_TYPE_WORKFLOW_EXECUTION_CANCEL_REQUESTED

This event type indicates that a request has been made to cancel the Workflow execution.

#### EVENT_TYPE_WORKFLOW_EXECUTION_CANCELED

This event type indicates that the client has confirmed the cancellation request and the Workflow execution has been cancelled.

#### EVENT_TYPE_WORKFLOW_EXECUTION_SIGNALED

This event type indicates the Workflow has received a Signal event.
The event type contains the Signal name, as well as a Signal payload.

#### EVENT_TYPE_WORKFLOW_EXECUTION_TERMINATED

This event type indicates that the Workflow execution has been forcefully terminated and that likely the terminate Workflow API was called.

#### EVENT_TYPE_WORKFLOW_EXECUTION_CONTINUED_AS_NEW

This event type indicates that the Workflow has successfully completed and a new Workflow has been started within the same transaction.
This event type contains last Workflow execution results as well as new Workflow execution inputs.

#### EVENT_TYPE_WORKFLOW_TASK_SCHEDULED

This event type indicates that the Workflow Task has been scheduled.
The SDK client should now be able to process any new history events.

#### EVENT_TYPE_WORKFLOW_TASK_STARTED

This event type indicates that the Workflow Task has started.
The SDK client has picked up the Workflow Task and is processing new history events.

#### EVENT_TYPE_WORKFLOW_TASK_COMPLETED

This event type indicates that the Workflow Task completed.
The SDK client picked up the Workflow Task, processed new history events, and may or may not ask the Temporal Server to do additional work.
It is possible for the following events to still occur:

- [EVENT_TYPE_ACTIVITY_TASK_SCHEDULED](#event_type_activity_task_scheduled)
- [EVENT_TYPE_TIMER_STARTED](#event_type_timer_started)
- [EVENT_TYPE_UPSERT_WORKFLOW_SEARCH_ATTRIBUTES](#event_type_upsert_workflow_search_attributes)
- [EVENT_TYPE_MARKER_RECORDED](#event_type_marker_recorded)
- [EVENT_TYPE_START_CHILD_WORKFLOW_EXECUTION_INITIATED](#event_type_start_child_workflow_execution_initiated)
- [EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED](#event_type_request_cancel_external_workflow_execution_initiated)
- [EVENT_TYPE_SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED](#event_type_signal_external_workflow_execution_initiated)
- [EVENT_TYPE_WORKFLOW_EXECUTION_COMPLETED](#event_type_workflow_execution_completed)
- [EVENT_TYPE_WORKFLOW_EXECUTION_FAILED](#event_type_workflow_execution_failed)
- [EVENT_TYPE_WORKFLOW_EXECUTION_CANCELED](#event_type_workflow_execution_canceled)
- [EVENT_TYPE_WORKFLOW_EXECUTION_CONTINUED_AS_NEW](#event_type_workflow_execution_continued_as_new)

#### EVENT_TYPE_WORKFLOW_TASK_TIMED_OUT

This event type indicates that the Workflow Task encountered a timeout.
Either an SDK client with a local cache was not available at the time, or it took too long for the SDK client to process the task.

#### EVENT_TYPE_WORKFLOW_TASK_FAILED

This event type indicates that the Workflow Task encountered a failure.
Usually this means that the Workflow was non-deterministic.
However, the Workflow reset functionality also uses this event.

#### EVENT_TYPE_ACTIVITY_TASK_SCHEDULED

This event type indicates that an Activity Task was scheduled.
The SDK client should pick up this activity task and execute.
This event type contains activity inputs, as well as activity timeout configurations.

#### EVENT_TYPE_ACTIVITY_TASK_STARTED

This event type indicates that the Activity Task has started executing.
The SDK client has picked up the Activity Task and is processing the Activity invocation.

#### EVENT_TYPE_ACTIVITY_TASK_COMPLETED

This event type indicates that the Activity Task has completed.
The SDK client has picked up and successfully completed the Activity Task.
This event type contains Activity execution results.

#### EVENT_TYPE_ACTIVITY_TASK_FAILED

This event type indicates that the Activity Task has completed.
The SDK picked up the Activity Task but unsuccessfully completed it.
This event type contains Activity execution errors.

#### EVENT_TYPE_ACTIVITY_TASK_TIMED_OUT

This event type indicates that the Activity has timed out according to the Temporal Server, due to the Activity having not completed within the timeout settings.

#### EVENT_TYPE_ACTIVITY_TASK_CANCEL_REQUESTED

This event type indicates that a request to cancel the Activity has occurred.
The SDK client will be able to confirm cancellation of an Activity during an Activity heartbeat.

#### EVENT_TYPE_ACTIVITY_TASK_CANCELED

This event type indicates that the Activity has been cancelled.

#### EVENT_TYPE_TIMER_STARTED

This event type indicates a timer has started.

#### EVENT_TYPE_TIMER_FIRED

This event type indicates a timer has fired.

#### EVENT_TYPE_TIMER_CANCELED

This event type indicates a Timer has been cancelled.

#### EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED

This event type indicates that a Workflow has requested that the Temporal Server try to cancel another Workflow.

#### EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_FAILED

This event type indicates that Temporal Server could not cancel the targeted Workflow.
This is usually because the target Workflow could not be found.

#### EVENT_TYPE_EXTERNAL_WORKFLOW_EXECUTION_CANCEL_REQUESTED

This event type indicates that the Temporal Server has successfully requested the cancellation of the target Workflow.

#### EVENT_TYPE_EXTERNAL_WORKFLOW_EXECUTION_SIGNALED

This event type indicates that the Temporal Server has successfully Signaled the targeted Workflow.

#### EVENT_TYPE_MARKER_RECORDED

This event type is transparent to the Temporal Server.
The Server will only store it and will not try to understand it.
The SDK client may use it for local activities or side effects.

#### EVENT_TYPE_START_CHILD_WORKFLOW_EXECUTION_INITIATED

This event type indicates that the Temporal Server will try to start a child Workflow.

#### EVENT_TYPE_START_CHILD_WORKFLOW_EXECUTION_FAILED

This event type indicates a child Workflow execution cannot be started / triggered.
It is usually due to a child Workflow ID collision.

#### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_STARTED

This event type indicates a child Workflow execution has successfully started / triggered.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_STARTED](#event_type_workflow_execution_started) to be recorded for the Workflow that has started.

#### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_COMPLETED

This event type indicates that the child Workflow execution has successfully completed.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_COMPLETED](#event_type_workflow_execution_completed) to be recorded for the Workflow that has completed.

#### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_FAILED

This event type indicates that the child Workflow execution has unsuccessfully completed.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_FAILED](#event_type_workflow_execution_failed) to be recorded for the Workflow that has failed.

#### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_CANCELED

This event type indicates that the child Workflow execution has been cancelled.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_CANCELED](#event_type_workflow_execution_canceled) to be recorded for the Workflow that was canceled.

#### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_TIMED_OUT

This event type indicates that the child Workflow execution has timed out by the Temporal Server.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_TIMED_OUT](#event_type_workflow_execution_timed_out) to be recorded for the Workflow that timed out.

#### EVENT_TYPE_CHILD_WORKFLOW_EXECUTION_TERMINATED

This event type indicates that the child Workflow execution has been terminated.
This would also cause the [EVENT_TYPE_WORKFLOW_EXECUTION_TERMINATED](#event_type_workflow_execution_terminated) to be recorded for the Workflow that was terminated.

#### EVENT_TYPE_SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED

This event type indicates that the Temporal Server will try to Signal the targeted Workflow.
This event type contains the Signal name, as well as a Signal payload.

#### EVENT_TYPE_SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_FAILED

This event type indicates that the Temporal Server cannot Signal the targeted Workflow, usually because the Workflow could not be found.

#### EVENT_TYPE_UPSERT_WORKFLOW_SEARCH_ATTRIBUTES

This event type indicates that the Workflow search attributes should be updated and synchronized with the visibility store.
