---
id: what-is-an-activity-execution
title: What is an Activity Execution?
sidebar_label: Activity Execution
description: An Activity Execution is the full chain of Activity Task Executions.
tags:
  - explanation
---

An Activity Execution is the full chain of [Activity Task Executions](/concepts/what-is-an-activity-task-execution).

- [How to spawn an Activity Execution](/application-development-guide#start-activity-execution)

![Activity Execution](/diagrams/activity-execution.svg)

An Activity Execution has no time limit.
Activity Execution time limits and retries can be optimized for each situation within the Temporal Application.

If for any reason an Activity Execution does not complete (exhausts all retries), the error is returned to the [Workflow](/workflows), which decides how to handle it.

### Request Cancellation

A Workflow can request to cancel an Activity Execution.
When an Activity Execution is canceled, or its Workflow Execution has completed or failed, the context passed into its function is canceled, which also sets its channel’s closed state to `Done`.
An Activity can use that to perform any necessary cleanup and abort its execution.

Cancellation requests are only delivered to Activity Executions that Heartbeat:

- The Heartbeat request fails with a special error indicating that the Activity Execution is canceled.
  Heartbeats can also fail when the Workflow Execution that spawned it is in a completed state.
- The Activity should perform all necessary cleanup and report when it is done.
- The Workflow can decide if it wants to wait for the Activity cancellation confirmation or proceed without waiting.
