---
id: what-is-an-activity-heartbeat
title: What is an Activity Heartbeat?
sidebar_label: Activity Heartbeat
description: An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster. Each ping informs the Temporal Cluster that the Activity Execution is making progress and the Worker has not crashed.
tags:
  - explanation
---

An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
Each ping informs the Temporal Cluster that the Activity Execution is making progress and the Worker has not crashed.

Activity Heartbeats work in conjunction with a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout).

Activity Heartbeats are implemented within the Activity Definition.
Custom progress information can be included in the Heartbeat which can then be used by the Activity Execution should a retry occur.

An Activity Heartbeat can be recorded as often as needed (e.g. once a minute or every loop iteration).
Temporal SDKs control the rate at which Heartbeats are sent to the Cluster.

Heartbeating is not required from [Local Activities](/concepts/what-is-a-local-activity), and does nothing.

- [How to Heartbeat an Activity in Go](/go/how-to-heartbeat-an-activity-in-go)
