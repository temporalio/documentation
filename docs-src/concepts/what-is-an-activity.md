---
id: what-is-an-activity
title: What is an Activity?
sidebar_label: Activity
description: In day-to-day conversation, the term "Activity" denotes an Activity Type, Activity Definition, or Activity Execution.
tags:
  - term
  - explanation
---

In day-to-day conversation, the term _Activity_ denotes an [Activity Definition](/concepts/what-is-an-activity-definition), [Activity Type](/concepts/what-is-an-activity-type), or [Activity Execution](/concepts/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

An Activity is a normal function or method that executes a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email message.
Activity code can be non-deterministic.
We recommend that it be [idempotent](/concepts/what-is-an-activity-definition#idempotency).

Workflow code orchestrates the execution of Activities, persisting the results.
If an Activity Function Execution fails, any future execution starts from initial state (except [Heartbeats](/concepts/what-is-an-activity-heartbeat)).

Activity Functions are executed by Worker Processes.
When the Activity Function returns, the Worker sends the results back to the Temporal Cluster as part of the [ActivityTaskCompleted](/references/events#activitytaskcompleted) Event.
The Event is added to the Workflow Execution's Event History.
For other Activity-related Events, see [Activity Events](/workflows#activity-events).
