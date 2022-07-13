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

- [How to Heartbeat an Activity](/application-development-guide#activity-heartbeats)

Activity Heartbeats work in conjunction with a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout).

Activity Heartbeats are implemented within the Activity Definition.
Custom progress information can be included in the Heartbeat which can then be used by the Activity Execution should a retry occur.

An Activity Heartbeat can be recorded as often as needed (e.g. once a minute or every loop iteration).
It is often a good practice to Heartbeat on anything but the shortest Activity Function Execution.
Temporal SDKs control the rate at which Heartbeats are sent to the Cluster.

Heartbeating is not required from [Local Activities](/concepts/what-is-a-local-activity), and does nothing.

For _long-running_ Activities, we recommend using a relatively short Heartbeat Timeout and a frequent Heartbeat.
That way if a Worker fails it can be handled in a timely manner.

A Heartbeat can include an application layer payload that can be used to _save_ Activity Execution progress.
If an [Activity Task Execution](/concepts/what-is-an-activity-task-execution) times out due to a missed Heartbeat, the next Activity Task can access and continue with that payload.

**What Activities should Heartbeat?**

Heartbeating is best thought about not in terms of time, but in terms of "How do you know you are making progress"? If an operation is so short that it doesn't make any sense to say "I am still working on this", then don't heartbeat. Vice versa for longer operations.

- If your underlying task can report definite progress, that is ideal.
  However, do note that your Workflow cannot read this progress information while the Activity is still executing (or it would have to store it in Event History). You may report progress to external sources if you need it exposed to the user.
- Even without a "progress you may get something useful from just verifying that the Worker processing your Activity is at the very least "still alive" (has not run out of memory or silently crashed).

Suitable for Heartbeating:

- Read a large file from S3
- Run a ML training job on some local GPUs

Not suitable for Heartbeating:

- Reading a small file from disk
- Making a quick API call
