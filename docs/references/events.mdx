---
id: events
title: Temporal Events reference
sidebar_label: Events
description: Event types the Temporal Service records in a Workflow Execution's Event History, with when each one occurs and the attributes it carries.
toc_max_heading_level: 4
tags:
  - Reference
---

An [Event](/workflow-execution/event#event) is a record in the [Event History](/workflow-execution/event#event-history) of a [Workflow Execution](/workflow-execution).
The [Temporal Service](/temporal-service) records Events in response to [Commands](/references/commands) from a [Worker](/workers#worker) and to requests from outside the Workflow, such as a Signal or a cancellation request.
The SDK replays the Event History to recreate Workflow state.

Events are defined in the [`EventType` enum](https://github.com/temporalio/api/blob/master/temporal/api/enums/v1/event_type.proto) and [history messages](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto) of the Temporal gRPC API.
Each table on this page lists the attributes you're most likely to need when reading an Event History.
For the complete set of attributes, see the history messages.

When an Event comes from a Command, its entry lists the **Command**.
The Event's `workflow_task_completed_event_id` attribute points to the [WorkflowTaskCompleted](#workflowtaskcompleted) Event of the Workflow Task that sent the Command.

## Common Event fields

Every Event has these fields, in addition to the attributes for its type.

| Field         | Description                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| event_id      | The position of the Event in the Event History, starting at 1.                                                   |
| event_time    | The time the Temporal Service recorded the Event.                                                                 |
| event_type    | The type of the Event, such as `EVENT_TYPE_WORKFLOW_EXECUTION_STARTED`.                                           |
| user_metadata | A summary and details for the Event, carried over from the Command or Client call, such as a Timer summary.       |
| links         | Links to related entities, such as the Workflow Execution or Nexus Operation that started this Workflow Execution. |

## Workflow Execution Events

These Events record the lifecycle of the Workflow Execution.
WorkflowExecutionCompleted, WorkflowExecutionFailed, WorkflowExecutionTimedOut, WorkflowExecutionCanceled, WorkflowExecutionTerminated, and WorkflowExecutionContinuedAsNew close the Workflow Execution.
Each of them is the last Event in the Event History.

### WorkflowExecutionStarted

The first Event in every Event History.
The Temporal Service records it when it accepts a request to start the Workflow Execution.

| Field                              | Description                                                                                                                                               |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workflow_type                      | The [Workflow Type](/workflow-definition#workflow-type).                                                                                                  |
| workflow_id                        | The [Workflow ID](/workflow-execution/workflowid-runid#workflow-id).                                                                                      |
| parent_workflow_namespace          | The [Namespace](/namespaces) of the parent Workflow Execution, if this is a [Child Workflow](/child-workflows).                                           |
| parent_workflow_execution          | The Workflow ID and Run ID of the parent Workflow Execution, if this is a Child Workflow.                                                                 |
| parent_initiated_event_id          | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event in the parent's Event History.                     |
| task_queue                         | The [Task Queue](/task-queue) the Workflow Tasks are sent to.                                                                                             |
| input                              | The Workflow arguments. The SDK deserializes them and passes them to the Workflow Function.                                                               |
| workflow_execution_timeout         | The [Workflow Execution Timeout](/encyclopedia/detecting-workflow-failures#workflow-execution-timeout), which covers retries and Continue-As-New.          |
| workflow_run_timeout               | The [Workflow Run Timeout](/encyclopedia/detecting-workflow-failures#workflow-run-timeout) for a single run.                                              |
| workflow_task_timeout              | The [Workflow Task Timeout](/encyclopedia/detecting-workflow-failures#workflow-task-timeout) for a single Workflow Task.                                   |
| continued_execution_run_id         | The [Run ID](/workflow-execution/workflowid-runid#run-id) of the previous run, if this run started from Continue-As-New, a retry, or a Cron Schedule.     |
| initiator                          | What started this run from a previous one: the Workflow (Continue-As-New), a Retry Policy, or a Cron Schedule.                                            |
| continued_failure                  | The failure of the previous run, if this run is a retry.                                                                                                  |
| last_completion_result             | The result of the most recent completed run, for Cron and retried Workflow Executions.                                                                    |
| original_execution_run_id          | The Run ID when this Event was recorded. A [Reset](/workflow-execution/event#reset) changes the Run ID but keeps this value.                              |
| identity                           | The identity of the Client that requested the start.                                                                                                      |
| first_execution_run_id             | The first Run ID in the chain of [Continue-As-New](/workflow-execution/continue-as-new), retry, Cron, and Reset runs.                                     |
| retry_policy                       | The [Retry Policy](/encyclopedia/retry-policies) of the Workflow Execution, if one was set.                                                               |
| attempt                            | The attempt number of this run, starting at 1.                                                                                                            |
| workflow_execution_expiration_time | The time at which the Workflow Execution times out. Passed unchanged to later runs.                                                                       |
| cron_schedule                      | The [Cron Schedule](/cron-job), if one was set.                                                                                                           |
| first_workflow_task_backoff        | For a Cron Workflow, the time between when this run was scheduled and when its first Workflow Task runs.                                                  |
| memo                               | The [Memo](/workflow-execution#memo): non-indexed information about the Workflow Execution.                                                               |
| search_attributes                  | The [Search Attributes](/search-attribute) set at start.                                                                                                  |
| prev_auto_reset_points             | The Reset points carried over from the previous run.                                                                                                      |
| header                             | Headers the Client set, such as context propagation data.                                                                                                 |
| completion_callbacks               | Callbacks the Temporal Service calls when the Workflow Execution closes, such as for a Nexus Operation backed by this Workflow.                            |
| versioning_override                | The [Versioning Override](/worker-versioning) applied at start, if any.                                                                                   |
| priority                           | The [Priority](/develop/task-queue-priority-fairness) metadata of the Workflow Execution.                                                                 |

### WorkflowExecutionCompleted

The Workflow Execution completed successfully.

- Command: [CompleteWorkflowExecution](/references/commands#completeworkflowexecution)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| result                           | The serialized return value of the Workflow Function.                                             |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| new_execution_run_id             | The Run ID of the next run, if a [Cron Schedule](/cron-job) started one.                          |

### WorkflowExecutionFailed

The Workflow Execution failed because the Workflow returned an error or threw an exception.

- Command: [FailWorkflowExecution](/references/commands#failworkflowexecution)

| Field                            | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| failure                          | The serialized Workflow failure.                                                                                     |
| retry_state                      | Whether the Temporal Service retries the Workflow Execution and, if not, why.                                       |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                    |
| new_execution_run_id             | The Run ID of the next run, if a Cron Schedule or a [Retry Policy](/encyclopedia/retry-policies) started one.        |

### WorkflowExecutionTimedOut

The Workflow Execution didn't complete within its [Workflow Execution Timeout](/encyclopedia/detecting-workflow-failures#workflow-execution-timeout) or [Workflow Run Timeout](/encyclopedia/detecting-workflow-failures#workflow-run-timeout).

| Field                | Description                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| retry_state          | Whether the Temporal Service retries the Workflow Execution and, if not, why.                                |
| new_execution_run_id | The Run ID of the next run, if a Cron Schedule or a [Retry Policy](/encyclopedia/retry-policies) started one. |

### WorkflowExecutionCancelRequested

A Client or another Workflow requested cancellation of the Workflow Execution.
The Workflow can handle the request and clean up before it completes as canceled.

| Field                       | Description                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cause                       | The reason given for the cancellation request.                                                                                                                   |
| external_initiated_event_id | The Event ID of the [RequestCancelExternalWorkflowExecutionInitiated](#requestcancelexternalworkflowexecutioninitiated) Event, if another Workflow sent the request. |
| external_workflow_execution | The Workflow ID and Run ID of the Workflow Execution that sent the request, if any.                                                                              |
| identity                    | The identity of the Client or Worker that requested cancellation.                                                                                                |

### WorkflowExecutionCanceled

The Workflow finished cleaning up after a cancellation request, and the Workflow Execution closed as canceled.

- Command: [CancelWorkflowExecution](/references/commands#cancelworkflowexecution)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| details                          | Additional information the Workflow reported on cancellation.                                     |

### WorkflowExecutionSignaled

The Workflow Execution received a [Signal](/sending-messages#sending-signals).

| Field                       | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| signal_name                 | The name of the Signal.                                                                    |
| input                       | The Signal arguments. The SDK deserializes them and passes them to the Signal handler.    |
| identity                    | The identity of the Client or Worker that sent the Signal.                                 |
| header                      | Headers the sender set, copied into the [Workflow Task](/tasks#workflow-task).             |
| external_workflow_execution | The Workflow ID and Run ID of the Workflow Execution that sent the Signal, if any.         |

### WorkflowExecutionTerminated

The Workflow Execution was forcefully terminated, usually through a call to the terminate Workflow Execution API.
The Workflow code doesn't run again, and no cleanup happens.

| Field    | Description                                               |
| -------- | --------------------------------------------------------- |
| reason   | The reason the Client gave for termination.               |
| details  | Additional information provided with the termination.     |
| identity | The identity of the Client that requested termination.    |

### WorkflowExecutionContinuedAsNew

The Workflow called [Continue-As-New](/workflow-execution/continue-as-new).
The Temporal Service closes this run and starts a new run with the same Workflow ID in the same transaction.

- Command: [ContinueAsNewWorkflowExecution](/references/commands#continueasnewworkflowexecution)

| Field                            | Description                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| new_execution_run_id             | The Run ID of the new run.                                                                                               |
| workflow_type                    | The Workflow Type of the new run.                                                                                        |
| task_queue                       | The Task Queue of the new run.                                                                                           |
| input                            | The arguments for the new run.                                                                                           |
| workflow_run_timeout             | The Workflow Run Timeout of the new run.                                                                                 |
| workflow_task_timeout            | The Workflow Task Timeout of the new run.                                                                                |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                        |
| backoff_start_interval           | How long the Temporal Service waits before it schedules the first Workflow Task of the new run.                          |
| initiator                        | What started the new run: the Workflow (Continue-As-New), a Retry Policy, or a Cron Schedule.                            |
| last_completion_result           | The result of the most recent completed run, which the SDK makes available to the new run.                               |
| header                           | Headers passed to the new run.                                                                                           |
| memo                             | The Memo of the new run.                                                                                                 |
| search_attributes                | The [Search Attributes](/search-attribute) of the new run.                                                               |

### WorkflowExecutionOptionsUpdated

A Client updated the options of the running Workflow Execution, such as a Versioning Override or Priority.
The Temporal Service also records this Event when it attaches a request ID or completion callbacks to a running Workflow Execution.

| Field                         | Description                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| versioning_override           | The [Versioning Override](/worker-versioning) set by this update. Ignored if empty or if `unset_versioning_override` is true. |
| unset_versioning_override     | Whether this update removed the Versioning Override.                                                                           |
| attached_request_id           | A request ID attached to the Workflow Execution. Later requests with the same request ID are deduplicated.                     |
| attached_completion_callbacks | Completion callbacks attached to the Workflow Execution.                                                                       |
| identity                      | The identity of the Client that requested the update.                                                                          |
| priority                      | The full [Priority](/develop/task-queue-priority-fairness) set by this update. Ignored if empty.                              |

### WorkflowExecutionPaused

A Client [paused](/cli/command-reference/workflow#pause) the Workflow Execution.
Workflow Execution pause is experimental.

| Field      | Description                                         |
| ---------- | --------------------------------------------------- |
| identity   | The identity of the Client that paused the Workflow Execution. |
| reason     | The reason given for the pause.                     |
| request_id | The request ID of the pause request.                |

### WorkflowExecutionUnpaused

A Client [unpaused](/cli/command-reference/workflow#unpause) a paused Workflow Execution.
Workflow Execution pause is experimental.

| Field      | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| identity   | The identity of the Client that unpaused the Workflow Execution. |
| reason     | The reason given for unpausing.                                   |
| request_id | The request ID of the unpause request.                            |

## Workflow Task Events

These Events record each [Workflow Task](/tasks#workflow-task): scheduling it, a Worker picking it up, and how it ended.

### WorkflowTaskScheduled

The Temporal Service scheduled a Workflow Task because the Workflow has new Events to process.

| Field                  | Description                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| task_queue             | The [Task Queue](/task-queue) the Workflow Task was sent to. This can be a Sticky Task Queue. |
| start_to_close_timeout | How long the Worker has to process the Workflow Task after it picks it up.                     |
| attempt                | The attempt number of this Workflow Task, starting at 1.                                       |

### WorkflowTaskStarted

A Worker picked up the Workflow Task and is processing the new Events.

| Field                   | Description                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| scheduled_event_id      | The Event ID of the [WorkflowTaskScheduled](#workflowtaskscheduled) Event for this Workflow Task.                              |
| identity                | The identity of the Worker that picked up the Workflow Task.                                                                   |
| request_id              | The identifier of the request that started the Workflow Task.                                                                  |
| suggest_continue_as_new | Whether the Temporal Service suggests that the Workflow call [Continue-As-New](/workflow-execution/continue-as-new) soon.       |
| history_size_bytes      | The size of the Event History in bytes. The Workflow can use it to decide when to call Continue-As-New.                         |

### WorkflowTaskCompleted

The Worker finished the Workflow Task and sent its [Commands](/references/commands) to the Temporal Service.
The Events for those Commands follow this Event, such as:

- [ActivityTaskScheduled](#activitytaskscheduled)
- [TimerStarted](#timerstarted)
- [UpsertWorkflowSearchAttributes](#upsertworkflowsearchattributes)
- [MarkerRecorded](#markerrecorded)
- [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated)
- [RequestCancelExternalWorkflowExecutionInitiated](#requestcancelexternalworkflowexecutioninitiated)
- [SignalExternalWorkflowExecutionInitiated](#signalexternalworkflowexecutioninitiated)
- [WorkflowExecutionCompleted](#workflowexecutioncompleted)
- [WorkflowExecutionFailed](#workflowexecutionfailed)
- [WorkflowExecutionCanceled](#workflowexecutioncanceled)
- [WorkflowExecutionContinuedAsNew](#workflowexecutioncontinuedasnew)

| Field                  | Description                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| scheduled_event_id     | The Event ID of the [WorkflowTaskScheduled](#workflowtaskscheduled) Event for this Workflow Task.             |
| started_event_id       | The Event ID of the [WorkflowTaskStarted](#workflowtaskstarted) Event for this Workflow Task.                 |
| identity               | The identity of the Worker that completed the Workflow Task.                                                  |
| sdk_metadata           | Data the SDK records for its own use, such as the SDK flags it used. The Temporal Service doesn't read it.    |
| versioning_behavior    | The [versioning behavior](/worker-versioning) the Worker sent. Unspecified if the Worker isn't versioned.     |
| worker_deployment_name | The name of the Worker Deployment that completed the Workflow Task.                                           |
| deployment_version     | The Worker Deployment Version that completed the Workflow Task.                                               |

### WorkflowTaskTimedOut

The Workflow Task hit a [Workflow Task Timeout](/encyclopedia/detecting-workflow-failures#workflow-task-timeout).
Either no Worker with the Workflow in its cache was available to pick up the Workflow Task, or the Worker took too long to process it.

| Field              | Description                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| scheduled_event_id | The Event ID of the [WorkflowTaskScheduled](#workflowtaskscheduled) Event for this Workflow Task. |
| started_event_id   | The Event ID of the [WorkflowTaskStarted](#workflowtaskstarted) Event for this Workflow Task.     |
| timeout_type       | The type of timeout, such as Start-To-Close or Schedule-To-Start.                                 |

### WorkflowTaskFailed

The Workflow Task failed, and the Temporal Service retries it.
A common cause is a [non-deterministic](/workflow-definition#non-deterministic-change) change to the Workflow code.
A Workflow [Reset](/workflow-execution/event#reset) also records this Event.
For each cause and how to resolve it, see the [Workflow Task errors reference](/references/workflow-task-errors).

| Field              | Description                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| scheduled_event_id | The Event ID of the [WorkflowTaskScheduled](#workflowtaskscheduled) Event for this Workflow Task.                                   |
| started_event_id   | The Event ID of the [WorkflowTaskStarted](#workflowtaskstarted) Event for this Workflow Task.                                       |
| cause              | The [Workflow Task failure cause](/references/workflow-task-errors).                                                                |
| failure            | The details of the failure.                                                                                                         |
| identity           | The identity of the Worker that failed the Workflow Task. Set to `history-service` when the Temporal Service generated the failure. |
| base_run_id        | For a Reset, the Run ID of the original Workflow Execution.                                                                         |
| new_run_id         | For a Reset, the Run ID of the new Workflow Execution.                                                                              |
| fork_event_version | For a Reset, the version of the Event where the history branch was forked. Used by Multi-Cluster Replication.                       |

## Activity Events

These Events record each [Activity Execution](/activity-execution) the Workflow schedules.

### ActivityTaskScheduled

The Workflow scheduled an [Activity Task](/tasks#activity-task).
A Worker polling the Task Queue picks it up and runs the Activity.

- Command: [ScheduleActivityTask](/references/commands#scheduleactivitytask)

| Field                            | Description                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| activity_id                      | The Activity ID, assigned by the Worker or set in the Workflow code.                                                                                               |
| activity_type                    | The [Activity Type](/activity-definition#activity-type).                                                                                                           |
| task_queue                       | The [Task Queue](/task-queue) the Activity Task was sent to.                                                                                                       |
| header                           | Headers the Workflow set, such as context propagation data.                                                                                                        |
| input                            | The Activity arguments. The SDK deserializes them and passes them to the Activity Function.                                                                        |
| schedule_to_close_timeout        | The [Schedule-To-Close Timeout](/encyclopedia/detecting-activity-failures#schedule-to-close-timeout): how long the Workflow waits for the Activity, including retries. |
| schedule_to_start_timeout        | The [Schedule-To-Start Timeout](/encyclopedia/detecting-activity-failures#schedule-to-start-timeout): how long the Activity Task can wait in the Task Queue. Not retried. |
| start_to_close_timeout           | The [Start-To-Close Timeout](/encyclopedia/detecting-activity-failures#start-to-close-timeout): the maximum time for one attempt after a Worker picks it up. Retried.  |
| heartbeat_timeout                | The [Heartbeat Timeout](/encyclopedia/detecting-activity-failures#heartbeat-timeout): the maximum time between Activity Heartbeats.                                 |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                                                                  |
| retry_policy                     | The [Retry Policy](/encyclopedia/retry-policies) of the Activity. Retries stop when the Schedule-To-Close Timeout is reached.                                      |
| priority                         | The [Priority](/develop/task-queue-priority-fairness) metadata of the Activity. Unset values are inherited from the Workflow.                                      |

### ActivityTaskStarted

A Worker picked up the Activity Task.
The Temporal Service records this Event when it dispatches the Activity Task to the Worker, not when the Worker starts running it.

The Temporal Service doesn't write this Event to the Event History until the Activity Execution closes, for example with [ActivityTaskCompleted](#activitytaskcompleted) or [ActivityTaskFailed](#activitytaskfailed).
If the Activity is retried, the Event reflects the last attempt.

| Field              | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| scheduled_event_id | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity. |
| identity           | The identity of the Worker that picked up the Activity Task.                                  |
| request_id         | The identifier of the request that started the Activity Task.                                 |
| attempt            | The attempt number, starting at 1.                                                            |
| last_failure       | The failure of the previous attempt, if the Activity was retried.                             |

### ActivityTaskCompleted

The Activity Execution completed successfully.

| Field              | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| result             | The serialized return value of the Activity Function.                                         |
| scheduled_event_id | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity. |
| started_event_id   | The Event ID of the [ActivityTaskStarted](#activitytaskstarted) Event for this Activity.     |
| identity           | The identity of the Worker that completed the Activity Task.                                  |

### ActivityTaskFailed

The Activity Execution failed, and the Temporal Service won't retry it.

| Field              | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| failure            | The serialized Activity failure.                                                              |
| scheduled_event_id | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity. |
| started_event_id   | The Event ID of the [ActivityTaskStarted](#activitytaskstarted) Event for this Activity.     |
| identity           | The identity of the Worker that failed the Activity Task.                                     |
| retry_state        | Why the Temporal Service won't retry the Activity, such as reaching the maximum attempts.     |

### ActivityTaskTimedOut

The Activity Execution hit an [Activity timeout](/encyclopedia/detecting-activity-failures), and the Temporal Service won't retry it.

| Field              | Description                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| failure            | A Timeout Failure that holds the timeout type, such as Start-To-Close or Schedule-To-Close. If an earlier attempt failed, that failure is set as its cause. |
| scheduled_event_id | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity.                                                                |
| started_event_id   | The Event ID of the [ActivityTaskStarted](#activitytaskstarted) Event for this Activity.                                                                    |
| retry_state        | Why the Temporal Service won't retry the Activity, such as the timeout being reached.                                                                        |

### ActivityTaskCancelRequested

The Workflow requested [cancellation](/activity-execution#cancellation) of the Activity.
The Activity learns about the request the next time it Heartbeats.

- Command: [RequestCancelActivityTask](/references/commands#requestcancelactivitytask)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| scheduled_event_id               | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity.     |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |

### ActivityTaskCanceled

The Activity Execution was [canceled](/activity-execution#cancellation).

| Field                            | Description                                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| details                          | Additional information the Activity reported when it confirmed cancellation.                                    |
| latest_cancel_requested_event_id | The Event ID of the most recent [ActivityTaskCancelRequested](#activitytaskcancelrequested) Event for this Activity. |
| scheduled_event_id               | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity.                   |
| started_event_id                 | The Event ID of the [ActivityTaskStarted](#activitytaskstarted) Event for this Activity.                       |
| identity                         | The identity of the Worker that canceled the Activity.                                                          |

### ActivityPropertiesModifiedExternally

Code outside the Workflow changed a property of an Activity that was already scheduled, such as its Retry Policy.

| Field              | Description                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| scheduled_event_id | The Event ID of the [ActivityTaskScheduled](#activitytaskscheduled) Event for this Activity.          |
| new_retry_policy   | The Retry Policy that replaces the Activity's Retry Policy. The attempt count is kept.                 |

## Timer Events

### TimerStarted

The Workflow started a Timer, such as with a call to sleep.

- Command: [StartTimer](/references/commands#starttimer)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| timer_id                         | The Timer ID, assigned by the Worker or set in the Workflow code.                                 |
| start_to_fire_timeout            | How long until the Timer fires.                                                                   |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |

### TimerFired

The Timer fired.

| Field            | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| timer_id         | The Timer ID from the [TimerStarted](#timerstarted) Event.          |
| started_event_id | The Event ID of the [TimerStarted](#timerstarted) Event.            |

### TimerCanceled

The Workflow canceled the Timer before it fired.

- Command: [CancelTimer](/references/commands#canceltimer)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| timer_id                         | The Timer ID from the [TimerStarted](#timerstarted) Event.                                        |
| started_event_id                 | The Event ID of the [TimerStarted](#timerstarted) Event.                                          |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| identity                         | The identity of the Worker that canceled the Timer.                                               |

## Child Workflow Events

These Events appear in the parent Workflow's Event History.
The [Child Workflow Execution](/child-workflows) has its own Event History, which starts with [WorkflowExecutionStarted](#workflowexecutionstarted).

### StartChildWorkflowExecutionInitiated

The parent Workflow requested that the Temporal Service start a Child Workflow Execution.

- Command: [StartChildWorkflowExecution](/references/commands#startchildworkflowexecution)

| Field                            | Description                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| namespace                        | The [Namespace](/namespaces) of the Child Workflow.                                                          |
| workflow_id                      | The Workflow ID of the Child Workflow.                                                                       |
| workflow_type                    | The Workflow Type of the Child Workflow.                                                                     |
| task_queue                       | The Task Queue of the Child Workflow.                                                                        |
| input                            | The arguments for the Child Workflow.                                                                        |
| parent_close_policy              | The [Parent Close Policy](/parent-close-policy) of the Child Workflow.                                       |
| workflow_id_reuse_policy         | The [Workflow ID Reuse Policy](/workflow-execution/workflowid-runid#workflow-id-reuse-policy) of the Child Workflow. |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.            |

### StartChildWorkflowExecutionFailed

The Temporal Service couldn't start the Child Workflow Execution, usually because a Workflow Execution with the same Workflow ID already exists.

| Field                            | Description                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| namespace                        | The Namespace of the Child Workflow.                                                                                |
| workflow_id                      | The Workflow ID of the Child Workflow.                                                                              |
| workflow_type                    | The Workflow Type of the Child Workflow.                                                                            |
| cause                            | Why the start failed, such as the Workflow ID already being in use or the Namespace not being found.                |
| initiated_event_id               | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event.            |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                   |

### ChildWorkflowExecutionStarted

The Child Workflow Execution started.
The Child Workflow's own Event History records a [WorkflowExecutionStarted](#workflowexecutionstarted) Event.

| Field              | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| namespace          | The Namespace of the Child Workflow.                                                                     |
| initiated_event_id | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event. |
| workflow_execution | The Workflow ID and Run ID of the Child Workflow Execution.                                              |
| workflow_type      | The Workflow Type of the Child Workflow.                                                                 |
| header             | Headers passed to the Child Workflow.                                                                    |

### ChildWorkflowExecutionCompleted

The Child Workflow Execution completed successfully.
The Child Workflow's own Event History records a [WorkflowExecutionCompleted](#workflowexecutioncompleted) Event.

| Field              | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| result             | The serialized result of the Child Workflow.                                                             |
| namespace          | The Namespace of the Child Workflow.                                                                     |
| workflow_execution | The Workflow ID and Run ID of the Child Workflow Execution.                                              |
| workflow_type      | The Workflow Type of the Child Workflow.                                                                 |
| initiated_event_id | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event. |
| started_event_id   | The Event ID of the [ChildWorkflowExecutionStarted](#childworkflowexecutionstarted) Event.               |

### ChildWorkflowExecutionFailed

The Child Workflow Execution failed.
The Child Workflow's own Event History records a [WorkflowExecutionFailed](#workflowexecutionfailed) Event.

| Field              | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| failure            | The serialized Child Workflow failure.                                                                   |
| namespace          | The Namespace of the Child Workflow.                                                                     |
| workflow_execution | The Workflow ID and Run ID of the Child Workflow Execution.                                              |
| workflow_type      | The Workflow Type of the Child Workflow.                                                                 |
| initiated_event_id | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event. |
| started_event_id   | The Event ID of the [ChildWorkflowExecutionStarted](#childworkflowexecutionstarted) Event.               |
| retry_state        | Whether the Temporal Service retries the Child Workflow Execution and, if not, why.                      |

### ChildWorkflowExecutionCanceled

The Child Workflow Execution was canceled.
The Child Workflow's own Event History records a [WorkflowExecutionCanceled](#workflowexecutioncanceled) Event.

| Field              | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| details            | Additional information the Child Workflow reported on cancellation.                                      |
| namespace          | The Namespace of the Child Workflow.                                                                     |
| workflow_execution | The Workflow ID and Run ID of the Child Workflow Execution.                                              |
| workflow_type      | The Workflow Type of the Child Workflow.                                                                 |
| initiated_event_id | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event. |
| started_event_id   | The Event ID of the [ChildWorkflowExecutionStarted](#childworkflowexecutionstarted) Event.               |

### ChildWorkflowExecutionTimedOut

The Child Workflow Execution timed out.
The Child Workflow's own Event History records a [WorkflowExecutionTimedOut](#workflowexecutiontimedout) Event.

| Field              | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| namespace          | The Namespace of the Child Workflow.                                                                     |
| workflow_execution | The Workflow ID and Run ID of the Child Workflow Execution.                                              |
| workflow_type      | The Workflow Type of the Child Workflow.                                                                 |
| initiated_event_id | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event. |
| started_event_id   | The Event ID of the [ChildWorkflowExecutionStarted](#childworkflowexecutionstarted) Event.               |
| retry_state        | Whether the Temporal Service retries the Child Workflow Execution and, if not, why.                      |

### ChildWorkflowExecutionTerminated

The Child Workflow Execution was terminated.
The Child Workflow's own Event History records a [WorkflowExecutionTerminated](#workflowexecutionterminated) Event.

| Field              | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| namespace          | The Namespace of the Child Workflow.                                                                     |
| workflow_execution | The Workflow ID and Run ID of the Child Workflow Execution.                                              |
| workflow_type      | The Workflow Type of the Child Workflow.                                                                 |
| initiated_event_id | The Event ID of the [StartChildWorkflowExecutionInitiated](#startchildworkflowexecutioninitiated) Event. |
| started_event_id   | The Event ID of the [ChildWorkflowExecutionStarted](#childworkflowexecutionstarted) Event.               |

## External Workflow Events

These Events record requests the Workflow sends to other Workflow Executions.

### RequestCancelExternalWorkflowExecutionInitiated

The Workflow requested that the Temporal Service cancel another Workflow Execution.

- Command: [RequestCancelExternalWorkflowExecution](/references/commands#requestcancelexternalworkflowexecution)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| namespace                        | The [Namespace](/namespaces) of the Workflow Execution to cancel.                                 |
| workflow_execution               | The Workflow ID and Run ID of the Workflow Execution to cancel.                                   |
| child_workflow_only              | Whether the target must be a Child Workflow of the Workflow that sent the request.                 |
| reason                           | The reason given for the cancellation request.                                                    |

### RequestCancelExternalWorkflowExecutionFailed

The Temporal Service couldn't deliver the cancellation request, usually because it couldn't find the target Workflow Execution.

| Field                            | Description                                                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| cause                            | Why the request failed, such as the target Workflow Execution or Namespace not being found.                                         |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                                   |
| namespace                        | The Namespace of the target Workflow Execution.                                                                                     |
| workflow_execution               | The Workflow ID and Run ID of the target Workflow Execution.                                                                        |
| initiated_event_id               | The Event ID of the [RequestCancelExternalWorkflowExecutionInitiated](#requestcancelexternalworkflowexecutioninitiated) Event.      |

### ExternalWorkflowExecutionCancelRequested

The Temporal Service delivered the cancellation request to the target Workflow Execution.
The target's Event History records a [WorkflowExecutionCancelRequested](#workflowexecutioncancelrequested) Event.

| Field              | Description                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| initiated_event_id | The Event ID of the [RequestCancelExternalWorkflowExecutionInitiated](#requestcancelexternalworkflowexecutioninitiated) Event. |
| namespace          | The Namespace of the target Workflow Execution.                                                                                |
| workflow_execution | The Workflow ID and Run ID of the target Workflow Execution.                                                                   |

### SignalExternalWorkflowExecutionInitiated

The Workflow requested that the Temporal Service [Signal](/sending-messages#sending-signals) another Workflow Execution.

- Command: [SignalExternalWorkflowExecution](/references/commands#signalexternalworkflowexecution)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| namespace                        | The [Namespace](/namespaces) of the Workflow Execution to Signal.                                 |
| workflow_execution               | The Workflow ID and Run ID of the Workflow Execution to Signal.                                   |
| signal_name                      | The name of the Signal.                                                                           |
| input                            | The Signal arguments.                                                                             |
| child_workflow_only              | Whether the target must be a Child Workflow of the Workflow that sent the Signal.                  |
| header                           | Headers passed to the target Workflow Execution with the Signal.                                  |

### SignalExternalWorkflowExecutionFailed

The Temporal Service couldn't deliver the Signal, usually because it couldn't find the target Workflow Execution.

| Field                            | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| cause                            | Why the Signal failed, such as the target Workflow Execution not being found.                                        |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                    |
| namespace                        | The Namespace of the target Workflow Execution.                                                                      |
| workflow_execution               | The Workflow ID and Run ID of the target Workflow Execution.                                                         |
| initiated_event_id               | The Event ID of the [SignalExternalWorkflowExecutionInitiated](#signalexternalworkflowexecutioninitiated) Event.     |

### ExternalWorkflowExecutionSignaled

The Temporal Service delivered the Signal to the target Workflow Execution.
The target's Event History records a [WorkflowExecutionSignaled](#workflowexecutionsignaled) Event.

| Field              | Description                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| initiated_event_id | The Event ID of the [SignalExternalWorkflowExecutionInitiated](#signalexternalworkflowexecutioninitiated) Event. |
| namespace          | The Namespace of the target Workflow Execution.                                                                  |
| workflow_execution | The Workflow ID and Run ID of the target Workflow Execution.                                                     |

## Workflow Update Events

These Events record [Workflow Updates](/sending-messages#sending-updates).
A rejected Update doesn't produce an Event.

- Command: [ProtocolMessage](/references/commands#protocolmessagecommand), for WorkflowExecutionUpdateAccepted and WorkflowExecutionUpdateCompleted

### WorkflowExecutionUpdateAdmitted

The Temporal Service reapplied an Update during a [Reset](/workflow-execution/event#reset) or replication.
Most Updates don't produce this Event.

| Field   | Description                                     |
| ------- | ----------------------------------------------- |
| request | The Update request.                             |
| origin  | Why the Temporal Service recorded this Event.   |

### WorkflowExecutionUpdateAccepted {/* #workflowexecutionupdateacceptedevent */}

The Workflow accepted an Update, which means the Update passed its validator, if one is defined.
Sending an Update doesn't produce an Event, so this Event stores the original request.

| Field                                | Description                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| protocol_instance_id                 | The identifier of the Update protocol instance that produced this Event.                      |
| accepted_request_message_id          | The identifier of the request message. The Worker uses it to recreate the message on replay. |
| accepted_request_sequencing_event_id | The Event ID after which the Update runs.                                                     |
| accepted_request                     | The Update request: its input and metadata.                                                   |

### WorkflowExecutionUpdateCompleted {/* #workflowexecutionupdatecompletedevent */}

The Workflow ran an Update to completion.

| Field             | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| meta              | The Update metadata from the original request, including the Update ID.                                         |
| accepted_event_id | The Event ID of the [WorkflowExecutionUpdateAccepted](#workflowexecutionupdateacceptedevent) Event.             |
| outcome           | The result of the Update handler: a success value or a failure.                                                 |

## Nexus Operation Events

These Events appear in the caller Workflow's Event History.

### NexusOperationScheduled

The caller Workflow scheduled a Nexus Operation.
The caller's [Nexus Machinery](/glossary#nexus-machinery) then tries to start it.

- Command: [ScheduleNexusOperation](/references/commands#schedulenexusoperation)

| Field                            | Description                                                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| endpoint                         | The Nexus Endpoint name. It must exist in the Endpoint registry.                                                                                    |
| service                          | The Nexus Service name.                                                                                                                             |
| operation                        | The Nexus Operation name.                                                                                                                           |
| input                            | The Operation input. A handler backed by Temporal receives the original Payload.                                                                    |
| schedule_to_close_timeout        | How long the caller waits for the Operation to complete. The Temporal Service retries calls within this time.                                       |
| nexus_header                     | Headers sent with the Nexus request. These aren't Temporal headers; they can go to Operations outside Temporal.                                     |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                                                   |
| request_id                       | A unique identifier the Temporal Service generated for the Operation. It's sent with every start request as an idempotency key.                     |
| endpoint_id                      | The Endpoint ID when this Event was recorded. The Temporal Service uses it if the Endpoint is renamed later.                                        |

### NexusOperationStarted

The Nexus handler started an asynchronous Nexus Operation, such as one backed by a Workflow.
Synchronous Operations don't produce this Event. They move directly to [NexusOperationCompleted](#nexusoperationcompleted) or another final Event, such as [NexusOperationFailed](#nexusoperationfailed).

| Field              | Description                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| scheduled_event_id | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event for this Operation.              |
| operation_token    | The Operation token the handler returned in its start response. The caller uses it to cancel the Operation.    |
| request_id         | The request ID allocated when the Operation was scheduled.                                                      |

### NexusOperationCompleted

The Nexus Operation completed successfully.
Both synchronous and asynchronous Operations record their result with this Event.

| Field              | Description                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| scheduled_event_id | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event. It identifies the Operation.                 |
| result             | The serialized result from the handler, delivered in a synchronous response or through a completion callback.                |
| request_id         | The request ID allocated when the Operation was scheduled.                                                                   |

### NexusOperationFailed

The Nexus Operation failed.
Both synchronous and asynchronous Operations record a failure with this Event.
For example, a handler responds synchronously with a non-retryable error, or the Workflow behind an asynchronous Operation fails with [WorkflowExecutionFailed](#workflowexecutionfailed).

| Field              | Description                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| scheduled_event_id | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event. It identifies the Operation. |
| failure            | The failure details: a `NexusOperationFailureInfo` that wraps an `ApplicationFailureInfo`.                   |
| request_id         | The request ID allocated when the Operation was scheduled.                                                   |

### NexusOperationTimedOut

The Nexus Operation didn't complete within its Schedule-To-Close Timeout.

| Field              | Description                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| scheduled_event_id | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event. It identifies the Operation. |
| failure            | The failure details: a `NexusOperationFailureInfo` that wraps a `CanceledFailureInfo`.                       |
| request_id         | The request ID allocated when the Operation was scheduled.                                                   |

### NexusOperationCancelRequested

The caller Workflow requested cancellation of the Nexus Operation.

- Command: [RequestCancelNexusOperation](/references/commands#requestcancelnexusoperation)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| scheduled_event_id               | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event for this Operation. |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |

### NexusOperationCancelRequestCompleted

The Temporal Service delivered the cancellation request to the Nexus handler.

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| requested_event_id               | The Event ID of the [NexusOperationCancelRequested](#nexusoperationcancelrequested) Event.        |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| scheduled_event_id               | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event for this Operation. |

### NexusOperationCancelRequestFailed

The cancellation request to the Nexus handler resulted in an error.

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| requested_event_id               | The Event ID of the [NexusOperationCancelRequested](#nexusoperationcancelrequested) Event.        |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| failure                          | The failure details: a `NexusOperationFailureInfo` that wraps a `CanceledFailureInfo`.            |
| scheduled_event_id               | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event for this Operation. |

### NexusOperationCanceled

The Nexus Operation completed as canceled.
This can happen with or without a cancellation request from the caller Workflow.

| Field              | Description                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| scheduled_event_id | The Event ID of the [NexusOperationScheduled](#nexusoperationscheduled) Event. It identifies the Operation. |
| failure            | The cancellation details.                                                                                    |
| request_id         | The request ID allocated when the Operation was scheduled.                                                   |

## Workflow metadata and SDK Events

### MarkerRecorded

The SDK recorded data it needs to replay the Workflow deterministically, such as the result of a Side Effect, a Local Activity, or a version check.
The Temporal Service stores the Marker without interpreting it.

- Command: [RecordMarker](/references/commands#recordmarker)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| marker_name                      | The kind of Marker, such as Local Activity or Side Effect. Each SDK defines its own names.        |
| details                          | The serialized data recorded in the Marker.                                                       |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| header                           | Headers recorded with the Marker.                                                                 |
| failure                          | The failure, if the recorded operation failed, such as a failed Local Activity.                   |

### UpsertWorkflowSearchAttributes

The Workflow added or updated its [Search Attributes](/search-attribute).
The Temporal Service updates the Visibility store with the new values.

- Command: [UpsertWorkflowSearchAttributes](/references/commands#upsertworkflowsearchattributes)

| Field                            | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command. |
| search_attributes                | The Search Attributes the Workflow added or updated.                                              |

### WorkflowPropertiesModified

The Workflow added or updated its [Memo](/workflow-execution#memo).

- Command: [ModifyWorkflowProperties](/references/commands#modifyworkflowproperties)

| Field                            | Description                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| workflow_task_completed_event_id | The Event ID of the [WorkflowTaskCompleted](#workflowtaskcompleted) Event that sent the Command.                 |
| upserted_memo                    | The Memo values to merge with the existing Memo. A key with an empty Payload deletes that key.                    |
