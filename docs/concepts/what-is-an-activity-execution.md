---
id: what-is-an-activity-execution
title: What is an Activity Execution?
sidebar_label: Activity Execution
description: An Activity Execution is the full chain of Activity Task Executions.
tags:
  - term
  - explanation
---

An Activity Execution is the full chain of [Activity Task Executions](/concepts/what-is-an-activity-task-execution).

- [How to spawn an Activity Execution](/application-development/foundations#activity-execution)

![Activity Execution](/diagrams/activity-execution.svg)

By default, an Activity Execution has no time limit.
Activity Execution [timeouts](/application-development/features#activity-timeouts) and [retry policies](/concepts/what-is-a-retry-policy) can be customized.

If an Activity Execution fails (because it exhausted all retries, threw a [non-retryable error](/concepts/what-is-a-retry-policy#non-retryable-errors), or was canceled), the error is returned to the [Workflow](/workflows), which decides how to handle it.

### Cancellation

Activity Cancellation:

- lets the Activity know it doesn't need to keep doing work, and
- gives the Activity time to clean up any resources it has created.

Activities can only receive Cancellation if they emit Heartbeats or are Local Activities (which can't heartbeat but receive Cancellation anyway).

An Activity may receive Cancellation if:

- The Activity or Activity's Workflow was requested to be Cancelled and the Activity's Cancellation type was **not** set to `ABANDON`.
- The Worker has started to shut down.
- The Activity was considered failed by the Server because any of the Activity timeouts have triggered (for example, the Server didn't receive a heartbeat within the Activity's Heartbeat timeout). The [Cancelled Failure](/concepts/what-is-a-failure#cancelled-failure) that the Activity receives will have `message: 'TIMED_OUT'`.
- An Activity sends a Heartbeat but the Heartbeat details can't be converted by the Worker's configured [Data Converter](/concepts/what-is-a-data-converter).
- The Workflow Run reached a [Closed state](/workflows#status), in which case the Cancelled Failure will have `message: 'NOT_FOUND'`.

The reason for the Cancellation is in the Cancelled Failure's `message` field.

There are different ways to receive Cancellation depending on the SDK. <!-- TODO link to dev guide -->
An Activity may accept or ignore Cancellation:

- To allow Cancellation to happen, let the Cancellation Failure propagate.
- To ignore Cancellation, catch it and continue executing.

The Workflow can also decide if it wants to wait for the Activity Cancellation to be accepted or to proceed without waiting.

Cancellation can only be requested a single time.
If you try to cancel your Activity Execution more than once, it will not receive more than one Cancellation request.
