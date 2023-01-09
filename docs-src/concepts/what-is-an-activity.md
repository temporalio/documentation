---
id: what-is-an-activity
title: What is an Activity?
sidebar_label: Activity
description: In day-to-day conversations, the term "Activity" frequently denotes either an Activity Type, an Activity Definition, or an Activity Execution.
tags:
  - term
  - explanation
---

In day-to-day conversations, the term _Activity_ frequently denotes either an [Activity Definition](/concepts/what-is-an-activity-definition), an [Activity Type](/concepts/what-is-an-activity-type), or an [Activity Execution](/concepts/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

Temporal recommends that Activities are idempotent. Activities are idempotent if multiple applications of that operation do not change the state of the system beyond the initial application.

Workflow code orchestrates the execution of Activities, persisting the results.
If an Activity Function Execution fails, any future execution starts from initial state (except Heartbeats).
Therefore, an Activity function is allowed to contain any code without restrictions.

Activity Functions are executed by Worker Processes.
When the Activity Function returns, the Worker sends the results back to the Temporal Cluster as part of the `ActivityTaskCompleted` Event.
The Event is added to the Workflow Execution's Event History.
