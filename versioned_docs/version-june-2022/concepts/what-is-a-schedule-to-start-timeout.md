---
id: what-is-a-schedule-to-start-timeout
title: What is a Schedule-To-Start Timeout?
sidebar_label: Schedule-To-Start Timeout
description: A Schedule-To-Start Timeout is the maximum amount of time that is allowed from when an Activity Task is placed in a Task Queue to when a Worker picks it up from the Task Queue.
tags:
  - explanation
  - timeouts
---

A Schedule-To-Start Timeout is the maximum amount of time that is allowed from when an [Activity Task](/concepts/what-is-an-activity-task) is scheduled (that is, placed in a Task Queue) to when a [Worker](/concepts/what-is-a-worker) starts (that is, picks up from the Task Queue) that Activity Task.
In other words, it's a limit for how long an Activity Task can be enqueued.

[How to set a Schedule-To-Start Timeout in Go](/go/how-to-set-a-schedule-to-start-timeout-in-go)

The moment that the Task is picked by the Worker from the Task Queue is considered to be the start of the Activity Task for the purposes of the Schedule-To-Start Timeout and associated metrics.
This definition of "Start" avoids issues that a clock difference between the Temporal Cluster and a Worker might create.

![Schedule-To-Start Timeout period](/diagrams/schedule-to-start-timeout.svg)

"Schedule" in Schedule-To-Start and Schedule-To-Close have different frequency guarantees.

The Schedule-To-Start Timeout is enforced for each Activity Task, whereas the Schedule-To-Close Timeout is enforced once per Activity Execution.
Thus, "Schedule" in Schedule-To-Start refers to the scheduling moment of _every_ Activity Task in the sequence of Activity Tasks that make up the Activity Execution, while
"Schedule" in Schedule-To-Close refers to the _first_ Activity Task in that sequence.

A [Retry Policy](/concepts/what-is-a-retry-policy) attached to an Activity Execution retries an Activity Task.

![Start-To-Close Timeout period with retries](/diagrams/schedule-to-start-timeout-with-retry.svg)

This timeout has two primary use cases:

1. Detect whether an individual Worker has crashed.
2. Detect whether the fleet of Workers polling the Task Queue is not able to keep up with the rate of Activity Tasks.

**The default Schedule-To-Start Timeout is ∞ (infinity).**

If this timeout is used, we recommend setting this timeout to the maximum time a Workflow Execution is willing to wait for an Activity Execution in the presence of all possible Worker outages, and have a concrete plan in place to reroute Activity Tasks to a different Task Queue.
This timeout **does not** trigger any retries regardless of the Retry Policy, as a retry would place the Activity Task back into the same Task Queue.
We do not recommend using this timeout unless you know what you are doing.

In most cases, we recommend monitoring the `temporal_activity_schedule_to_start_latency` metric to know when Workers slow down picking up Activity Tasks, instead of setting this timeout.
