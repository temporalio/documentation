---
id: what-are-activity-events
title: What are Activity Events?
sidebar_label: Activity Events
description: There are seven Activity Events that are added to History at different points in an Activity Execution.
tags:
  - term
  - explanation
---

There are seven Activity-related [Events](/workflows#event) that are added to History at different points in an Activity Execution.

There are two important things to note when matching Activity Execution lifecycle to Activity Events:

- In Event names, "ActivityTask" refers to an [Activity Execution](/activities#activity-execution), not an [Activity Task](/tasks#activity-task).
- While the Activity is running and retrying, [ActivityTaskScheduled](/references/events#activitytaskscheduled) is the only Activity-related event in History: [ActivityTaskStarted](/references/events#activitytaskstarted) is written along with a terminal event like [ActivityTaskCompleted](/references/events#activitytaskcompleted) or [ActivityTaskFailed](/references/events#activitytaskfailed).

The Activity-related Events and points at which they're added to History are:

- After a [Workflow Task Execution](/concepts/what-is-an-activity-task-execution) reaches a line of code that starts/executes an Activity, the Worker sends the Activity type and arguments to the Cluster, and the Cluster adds an [ActivityTaskScheduled](/references/events#activitytaskscheduled) Event to History.
- When ActivityTaskScheduled is added to History, the Cluster adds a corresponding Activity Task to the Task Queue.
- A Worker polling that Task Queue picks up the Activity Task and runs the Activity function or method.
- If the Activity function returns, then the Worker reports completion to the Cluster, and the Cluster adds [ActivityTaskStarted](/references/events#activitytaskstarted) and [ActivityTaskCompleted](/references/events#activitytaskcompleted) to History.
- If the Activity function throws a [non-retryable Failure](/kb/failures#non-retryable), then the Cluster adds [ActivityTaskStarted](/references/events#activitytaskstarted) and [ActivityTaskFailed](/references/events#activitytaskfailed) to History.
- If the Activity function throws an Error or retryable Failure, the Cluster will schedule an Activity Task retry to be added to the Task Queue (unless you’ve reached the [Retry Policy](/retry-policies)’s Maximum Attempts, in which case the Cluster adds [ActivityTaskStarted](/references/events#activitytaskstarted) and [ActivityTaskFailed](/references/events#activitytaskfailed) to History).
- If the Activity’s [Start-to-Close Timeout](/activities#start-to-close-timeout) passes before the Activity function returns or throws, the Cluster will schedule a retry.
- If the Activity’s [Schedule-to-Close Timeout](/activities#schedule-to-close-timeout) passes before Activity Execution is complete, or if [Schedule-to-Start Timeout](/activities#schedule-to-start-timeout) passes before a Worker gets the Activity Task, the Cluster will write [ActivityTaskTimedOut](/references/events#activitytasktimedout) to History.
- If the Activity is [Cancelled](/activities#cancellation), the Cluster will write [ActivityTaskCancelRequested](/references/events#activitytaskcancelrequested) to History, and if the Activity accepts Cancellation, the Cluster will write [ActivityTaskCanceled](/references/events#activitytaskcanceled).
