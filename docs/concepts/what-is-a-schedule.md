---
id: what-is-a-schedule
title: What is a Schedule
sidebar_label: Schedule
description: A Schedule enables the scheduling of Workflow Executions.
tags:
  - explanation
  - term
---

A Schedule contains instructions for starting a [Workflow Execution](/concepts/what-is-a-workflow-execution) at specific times, and is meant to be a more flexible and user friendly approach over [Temporal Cron Jobs](/concepts/what-is-a-temporal-cron-job).

- [How to enable Schedules](#how-to-enable-schedules)
- [How to operate Schedules using tctl](/tctl/schedule/)

A Schedule has identity, and is independent of a Workflow Execution.
This is different from Temporal Cron Jobs, which rely on a cron schedule as a property of the Workflow Execution.

### Action

The Action of a Schedule is where the Workflow Execution properties are established, such as Workflow Type, Task Queue, parameters, Timeouts, etc.

Workflow Executions started by a Schedule have the following additional properties:

- The Action's timestamp is appended to the Workflow Id
- The `TemporalScheduledStartTime` [Search Attribute](/concepts/what-is-a-search-attribute) is added to the Workflow Execution.
  The Action's timestamp is the value.
- The `TemporalScheduledById` Search Attribute is added to the Workflow Execution.
  The Schedule Id is the value.

### Spec

There are two ways to express a Schedule Spec:

1. A simple interval, like "every 30 minutes" (measured from the unix epoch, and optionally including a phase offset).
2. A calendar-based expression, similar to "cron expressions" supported by lots of software, including the older Temporal Cron feature.

Calendar expressions are given as separate named fields.

For example in tctl, they can be provided as JSON:

```json
{"year": "2022", "month": "*/3", "dayOfMonth": "1,15", "hour": "11-14"}
```

The following calendar fields are available:

- `year`
- `month`
- `dayOfMonth`
- `dayOfWeek`
- `hour`
- `minute`
- `second`

Each field may contain a comma-separated list of ranges (or `*`), and each range may include a skip value following a slash.

For `month`, names of months may be used instead of integers (case-insensitive, abbreviations permitted).
For `dayOfWeek`, day of week names may be used.

Other Spec features:

**Multiple intervals/calendar expressions:** A Spec can have combinations of multiple intervals and/or calendar expressions to define a specific Schedule.

**Time bounds:** Provide an absolute start or end time (or both) with a Spec to ensure that no actions are taken before the start time or after the end time.

**Exclusions:** A Spec can contain exclusions in the form of zero or more calendar expressions.
This can be used to express scheduling like "each Monday at noon except for holidays.
You'll have to provide your own set of exclusions and include it in each schedule, there are no pre-defined sets.
(Note: this isn't currently exposed in tctl or the web UI.)

**Jitter:** If given, a random offset between zero and the maximum jitter is added to each Action time (but bounded by the time until the next scheduled Action).

**Time zones:** By default, calendar-based expressions are interpreted in UTC.
Temporal recommends using UTC to avoid various surprising properties of time zones.
If you don't want to use UTC, you may provide the name of a time zone to apply them instead.
The time zone definition will be loaded on the Temporal Server Worker Service from either disk or the fallback embedded in the binary.

For more operational control, embed the contents of the time zone database file in the Schedule Spec itself.
(Note: this isn't currently exposed in tctl or the web UI.)

### Pausing

A Schedule may be Paused.
When a Schedule is Paused, the Spec has no effect.
However, you can still force manual actions, see [trigger immediately](/tctl/schedule/trigger).

To assist communication among developers and operators, there's a “notes” field that can be updated on pause/resume to store an explanation for the current state.

### Limiting number of Actions

A Schedule may be limited to a certain number of Actions (i.e. not trigger immediately).
After that it will act as if it was Paused.

### Policies

A Schedule supports a set of Policies that enable customizing behavior.

#### Overlap Policy

The Overlap Policy controls what happens when it is time to start a Workflow Execution but a previously started Workflow Execution is still running.
The following options are available:

- `Skip`: **Default**.
  Nothing happens – the Workflow Execution is not started.
- `BufferOne`: Starts the Workflow Execution as soon as the current one completes. The buffer is limited to one.
  If another Workflow Execution is supposed to start, but there is already one in the buffer, only the one in the buffer eventually starts.
- `BufferAll`: Allows an unlimited number of Workflows to buffer.
  They are started sequentially.
- `CancelOther`: Cancels the running Workflow Execution, and then starts the new one after the old one completes cancellation.
- `TerminateOther`: Terminates the running Workflow Execution and starts the new one immediately.
- `AllowAll` Starts any number of concurrent Workflow Executions.
  With this policy (and only this policy), there may be more than one Workflow Execution, started by the Schedule, running simultaneously.

#### Catchup Window

It may happen that the Temporal Cluster itself is down or unavailable at the time when a Schedule should take an Action.
When it comes back up, the Catchup Window controls which missed actions should be taken at that point.
The default is one minute, which means that the Schedule will attempt to take any actions that wouldn't be more than one minute late.
An outage that lasts longer than the catchup window could lead to missed actions (But you can always Backfill).

#### Pause-on-failure

If this policy is set, a Workflow Execution started by a Schedule that ends with a failure or timeout (but not Cancellation or Termination) will cause the Schedule to automatically pause.

Note that with the `AllowAll` overlap policy, this pause might not apply to the next Run, because the next run might have started before the failed run finished.
It applies only to Runs that were Scheduled to start after the failed Run finished.

### Last completion result

A Workflow started by a Schedule can obtain the completion result from the most recent successful run. (How you do this depends on which SDK you're using.)

For overlap policies that don't allow overlap, “the most recent successful run” is straightforward to define.
For the `AllowAll` policy, it refers to the run that completed most recently, at the time that the run in question is started.
That is, given the overlapping runs below:

```
time -------------------------------------------->
 A     |----------------------|
 B               |-------|
 C                          |---------------|
 D                                |--------------T
```

If D asks for the last completion result at time T, it will get the result of A.
Not B, even though B started more recently, because A completed later. And not C, even though C completed after A, because the result for D is captured when D is started, not when it's queried.

Failures and timeouts do not affect the last completion result.

### Last failure

A Workflow started by a Schedule can obtain the details of the failure of the most recent run that ended at the time when the Workflow in question was started. Unlike last completion result, a _successful_ run _does_ reset the last failure.

### How to enable Schedules

:::info Experimental

The Scheduled Workflows feature is available in Temporal Server version 1.17.
However the feature is in an experimental stage and is disabled by default.

Internally, a Schedule is implemented as a Workflow.
These implementation Workflow Executions are visible to you as you navigate the Web UI and use tctl, though you should not interact with it directly.

In later versions the implementation Workflows will cease to be visible by default.

:::

**Requirements**

- Temporal Server version 1.17 or later.
- [Advanced Visibility](/concepts/what-is-advanced-visibility) optional.
- The following dynamic config values:

```yaml
frontend.enableSchedules:
  - value: true
worker.enableScheduler:
  - value: true
matching.numTaskqueueReadPartitions:
  - value: 1
    constraints:
      taskQueueName: temporal-sys-scheduler-tq
matching.numTaskqueueWritePartitions:
  - value: 1
    constraints:
      taskQueueName: temporal-sys-scheduler-tq
```

Only the first two are required; the second two are suggested because by default, only one Worker will run per Task Queue, so more than one partition is not useful.
Setting the Task Queue to use one partition will reduce latency.

If you're familiar with Dynamic Config, you may also constrain these settings by Namespace, as makes sense for your installation.
