---
id: what-is-an-activity
title: What is an Activity?
sidebar_label: Activity
description: In day-to-day conversations, the term "Activity" frequently denotes either an Activity Type, an Activity Definition, or an Activity Execution.
tags:
  - explanation
---

In day-to-day conversations, the term _Activity_ frequently denotes either an [Activity Definition](/concepts/what-is-an-activity-definition), an [Activity Type](/concepts/what-is-an-activity-type), or an [Activity Execution](/concepts/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

An Activity is a normal function or object method that executes a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email.

Workflow code orchestrates the execution of Activities, persisting the results.
If an Activity Function Execution fails, any future execution starts from initial state (with the exception of Heartbeats).
Therefore an Activity function is allowed to contain any code without restrictions.

Activity Functions are executed by Worker Processes.
When the Activity Function returns, the Worker sends the results back to the Temporal Cluster as part of the ActivityTaskCompleted Event.
The Event is added to the Workflow Execution's Event History.
