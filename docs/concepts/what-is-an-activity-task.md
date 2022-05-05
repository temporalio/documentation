---
id: what-is-an-activity-task
title: What is an Activity Task?
sidebar_label: Activity Task
description: An Activity Task contains the context needed to make an Activity Task Execution.
tags:
  - explanation
---

An Activity Task contains the context needed to proceed with an [Activity Task Execution](/docs/concepts/what-is-an-activity-task-execution).
From the API, users see an Activity being executed and assume that it runs once.

Activity Tasks contain Events that are needed to execute the Activity. These events are found within the Activity Task's `Context`.

Upon completion, the Activity Task responds to the cluster with a specific Event:

- ActivityTaskCompleted
- ActivityTaskFailed
- ActivityTaskTimedOut
- ActivityTaskCanceled
- ActivityTaskTerminated
