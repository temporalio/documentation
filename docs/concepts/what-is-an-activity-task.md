---
id: what-is-an-activity-task
title: What is an Activity Task?
sidebar_label: Activity Task
description: An Activity Task contains the context needed to make an Activity Task Execution.
tags:
  - explanation
---

An Activity Task contains the context needed to proceed with an [Activity Task Execution](/docs/concepts/what-is-an-activity-task-execution).

Activity Tasks are meant to run an [Activity Definition](/docs/concepts/what-is-an-activity-definition) once. Should this fail, the Activity Task is retried until it's completed successfully.

#### Scheduling Activity Tasks

Activity Tasks are assigned to an Activity Task Queue upon an [ActivityTaskScheduled Event](/docs/concepts/what-is-an-activity-task#scheduling-activity-tasks). Once a Task is executed, an Activity's Events are run until the Activity successfully completes.

#### Context Events

Activity Tasks contain Events that contain what's needed to execute the Activity. These events are found within the Activity Task's [Context](/docs/concepts/what-is-an-activity-task#context-events).

[event explanation?]

ActivityTaskScheduled prepares the Activity for execution. ActivityTaskStarted begins the Activity.

Upon completion, the Activity Task responds to the cluster with an Event status of _success_ or _failure_.

[failure events may have retry?]
