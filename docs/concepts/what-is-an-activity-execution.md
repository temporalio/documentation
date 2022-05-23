---
id: what-is-an-activity-execution
title: What is an Activity Execution?
sidebar_label: Activity Execution
description: An Activity Execution is the full chain of Activity Task Executions.
tags:
  - explanation
---

An Activity Execution is the full chain of [Activity Task Executions](/concepts/what-is-an-activity-task-execution).

![Activity Execution](/diagrams/activity-execution.svg)

### Request Cancellation

A Workflow can request to cancel an Activity Execution.
When an Activity Execution is canceled, or its Workflow Execution has completed or failed, the context passed into its function is canceled, which also sets its channel’s closed state to `Done`.
An Activity can use that to perform any necessary cleanup and abort its execution.

Cancellation requests are only delivered to Activity Executions that Heartbeat:

- The Heartbeat request fails with a special error indicating that the Activity Execution is canceled.
  Heartbeats can also fail when the Workflow Execution that spawned it is in a completed state.
- The Activity should perform all necessary cleanup and report when it is done.
- The Workflow can decide if it wants to wait for the Activity cancellation confirmation or proceed without waiting.

**Implementation guides:**

- [How to spawn an Activity Execution in Go](/go/how-to-spawn-an-activity-execution-in-go)
