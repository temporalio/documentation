---
id: activity-heartbeats
title: How to Heartbeat an Activity
sidebar_label: Activity Heartbeats
description: An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
tags:
  - guide-context
---

An [Activity Heartbeat](/concepts/what-is-an-activity-heartbeat) is a ping from the [Worker Process](/concepts/what-is-a-worker-process) that is executing the Activity to the [Temporal Cluster](/concepts/what-is-a-temporal-cluster).
Each Heartbeat informs the Temporal Cluster that the [Activity Execution](/concepts/what-is-an-activity-execution) is making progress and the Worker has not crashed.
If the Cluster does not receive a Heartbeat within a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout) time period, the Activity will be considered failed and another [Activity Task Execution](/concepts/what-is-an-activity-task-execution) may be scheduled according to the Retry Policy.

Heartbeats may not always be sent to the Cluster—they may be [throttled](/concepts/what-is-an-activity-heartbeat#throttling) by the Worker.

Activity Cancellations are delivered to Activities from the Cluster when they Heartbeat. Activities that don't Heartbeat can't receive a Cancellation.
Heartbeat throttling may lead to Cancellation getting delivered later than expected.

Heartbeats can contain a `details` field describing the Activity's current progress.
If an Activity gets retried, the Activity can access the `details` from the last Heartbeat that was sent to the Cluster.
