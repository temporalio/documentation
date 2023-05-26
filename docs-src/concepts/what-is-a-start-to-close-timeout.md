---
id: what-is-a-start-to-close-timeout
title: What is a Start-To-Close Timeout?
sidebar_label: Start-To-Close Timeout
description: A Start-To-Close Timeout is the maximum time allowed for a single Activity Task Execution.
tags:
  - term
  - explanation
  - timeouts
---

A Start-To-Close Timeout is the maximum time allowed for a single [Activity Task Execution](/concepts/what-is-an-activity-task-execution).

- [How to set a Start-To-Close Timeout using the Go SDK](/go/activity-timeouts)
- [How to set a Start-To-Close Timeout using the Java SDK](/java/activity-timeouts)
- [How to set a Start-To-Close Timeout using the PHP SDK](/php/activity-timeouts)
- [How to set a Start-To-Close Timeout using the Python SDK](/python/activity-timeouts)
- [How to set a Start-To-Close Timeout using the TypeScript SDK](/typescript/activity-timeouts)

**The default Start-To-Close Timeout is the same as the default [Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout).**

An Activity Execution must have either this timeout (Start-To-Close) or the [Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout) set.
We recommend always setting this timeout; however, make sure that Start-To-Close Timeout is always set to be longer than the maximum possible time for the Activity Execution to complete.
For long running Activity Executions, we recommend also using [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat) and [Heartbeat Timeouts](/concepts/what-is-a-heartbeat-timeout).

:::caution

We strongly recommend setting Start-To-Close Timeout.

The Temporal Server does not detect failures when a Worker loses communication with the Server or crashes.
Therefore, the Temporal Server relies on this timeout to force Activity retries.

:::

The main use case for the Start-To-Close timeout is to detect when a Worker crashes after it has started executing an Activity Task.

![Start-To-Close Timeout period](/diagrams/start-to-close-timeout.svg)

A [Retry Policy](/concepts/what-is-a-retry-policy) attached to an Activity Execution retries an Activity Task Execution.
Thus, the Start-To-Close Timeout is applied to each Activity Task Execution within an Activity Execution.

If the first Activity Task Execution returns an error the first time, then the full Activity Execution might look like this:

![Start-To-Close Timeout period with retries](/diagrams/start-to-close-timeout-with-retry.svg)

If this timeout is reached, the following actions occur:

- An [ActivityTaskTimedOut](/references/events/#activitytasktimedout) Event is written to the Workflow Execution's mutable state.
- If a Retry Policy dictates a retry, the Temporal Cluster schedules another Activity Task.
  - The attempt count increments by 1 in the Workflow Execution's mutable state.
  - The Start-To-Close Timeout timer is reset.
