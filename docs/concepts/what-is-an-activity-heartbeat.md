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

- [How to Heartbeat an Activity](/application-development/features#activity-heartbeats)

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

Heartbeating is best thought about not in terms of time, but in terms of "How do you know you are making progress"?
For short-term operations, progress updates are not a requirement.
However, checking the progress and status of Activities that run over long periods is almost always useful.

Consider the following when setting Activity Hearbeats:

- Your underlying task must be able to report definite progress.
  Note that your Workflow cannot read this progress information while the Activity is still executing (or it would have to store it in Event History).
  You can report progress to external sources if you need it exposed to the user.

- Your Activity Execution is long-running, and you need to verify whether the Worker that is processing your Activity is still alive and has not run out of memory or silently crashed.

For example, the following scenarios are suitable for Heartbeating:

- Reading a large file from Amazon S3.
- Running a ML training job on some local GPUs.

And the following scenarios are not suitable for Heartbeating:

- Making a quick API call.
- Reading a small file from disk.
