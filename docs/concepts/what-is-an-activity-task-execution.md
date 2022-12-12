---
id: what-is-an-activity-task-execution
title: What is an Activity Task Execution?
sidebar_label: Activity Task Execution
description: An Activity Task Execution is the execution of an Activity Type.
tags:
  - term
  - explanation
---

An Activity Task Execution occurs when a [Worker](/concepts/what-is-a-worker-entity) uses the context provided in the [Activity Task](/concepts/what-is-an-activity-task) and executes the [Activity Definition](/concepts/what-is-an-activity-definition) (also known as the Activity Function).

The [ActivityTaskScheduled Event](/references/events#activitytaskscheduled) corresponds to when the Temporal Cluster puts the Activity Task into the Task Queue.

The [ActivityTaskStarted Event](/references/events#activitytaskstarted) corresponds to when the Worker picks up the Activity Task from the Task Queue.

Either [ActivityTaskCompleted](/references/events#activitytaskcompleted) or one of the other Closed Activity Task Events corresponds to when the Worker has yielded back to the Temporal Cluster.

The API to schedule an Activity Execution provides an "effectively once" experience, even though there may be several Activity Task Executions that take place to successfully complete an Activity.

Once an Activity Task finishes execution, the Worker responds to the Cluster with a specific Event:

- ActivityTaskCanceled
- ActivityTaskCompleted
- ActivityTaskFailed
- ActivityTaskTerminated
- ActivityTaskTimedOut
