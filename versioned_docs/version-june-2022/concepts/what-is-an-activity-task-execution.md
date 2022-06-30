---
id: what-is-an-activity-task-execution
title: What is an Activity Task Execution?
sidebar_label: Activity Task Execution
description: An Activity Task Execution is the execution of an Activity Type.
tags:
  - explanation
---

An Activity Task Execution is when the Worker uses the Context provided from the [Activity Task](/concepts/what-is-an-activity-task) and executes the [Activity Definition](/concepts/what-is-an-activity-definition) (also known as the Activity Function).

The [ActivityTaskScheduled Event](/concepts/what-is-an-event#activitytaskscheduled) corresponds to when the Temporal Cluster puts the Activity Task into the Task Queue.

The [ActivityTaskStarted Event](/concepts/what-is-an-event#activitytaskstarted) corresponds to when the Worker picks up the Activity Task from the Task Queue.

Either [ActivityTaskCompleted](/concepts/what-is-an-event#activitytaskcompleted) or one of the other Closed Activity Task Events corresponds to when the Worker has yielded back to the Temporal Cluster.

The API to schedule an Activity Execution provides an "effectively once" experience, even though there may be several Activity Task Executions that take place to successfully complete an Activity.

Once an Activity Task finishes execution, the Worker responds to the Cluster with a specific Event:

- ActivityTaskCompleted
- ActivityTaskFailed
- ActivityTaskTimedOut
- ActivityTaskCanceled
- ActivityTaskTerminated
