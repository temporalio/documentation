---
id: what-is-asynchronous-activity-completion
title: What is Asynchronous Activity Completion?
sidebar_label: Asynchronous Activity Completion
description: Asynchronous Activity Completion occurs when an external system provides the final result of a computation, started by an Activity, to the Temporal System.
tags:
  - explanation
---

Asynchronous Activity Completion is a feature that enables an Activity Function to return without causing the Activity Execution to complete.
The Temporal Client can then be used to both Heartbeat Activity Execution progress and eventually provide a result if needed.

- [How to complete an Activity Asynchronously](/application-development-guide#async-activity-completion)

#### When to use

The intended use-case for this feature is when an external system has the final result of a computation, started by an Activity.

Consider sending Heartbeats from the Temporal Client only if the external process is unreliable.

Consider using [Signals](/concepts/what-is-a-signal) to return data back to a Workflow Execution if there is a human in the process loop.
The reason is that a human in the loop means multiple steps in the process.
The first is the Activity Function that stores state in an external system and at least one other step where a human would “complete” the activity.
If the first step fails, you want to detect that quickly and retry instead of waiting for the entire process, which could be significantly longer when humans are involved.
