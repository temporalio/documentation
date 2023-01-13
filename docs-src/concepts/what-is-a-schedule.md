---
id: what-is-a-schedule
title: What is a Schedule
sidebar_label: Schedule
description: A Schedule enables the scheduling of Workflow Executions.
tags:
  - term
  - explanation
ssdi:
  - Introduced in Temporal Server version 1.17.0
  - Available in tctl v1.17 and Temporal CLI
  - Available in Temporal Cloud via tctl and CLI
---

A Schedule contains instructions for starting a [Workflow Execution](/workflows#workflow-execution) at specific times.
Schedules provide a more flexible and user-friendly approach than [Temporal Cron Jobs](/concepts/what-is-a-temporal-cron-job).

- [How to enable Schedules](#limitations)
- [How to operate Schedules using tctl](/tctl-v1/schedule#)

A Schedule has an identity and is independent of a Workflow Execution.
This differs from a Temporal Cron Job, which relies on a cron schedule as a property of the Workflow Execution.

### Action

The Action of a Schedule is where the Workflow Execution properties are established, such as Workflow Type, Task Queue, parameters, and timeouts.

Workflow Executions started by a Schedule have the following additional properties:

- The Action's timestamp is appended to the Workflow Id.
- The `TemporalScheduledStartTime` [Search Attribute](/concepts/what-is-a-search-attribute) is added to the Workflow Execution.
  The value is the Action's timestamp.
- The `TemporalScheduledById` Search Attribute is added to the Workflow Execution.
  The value is the Schedule Id.

### Spec

The Schedule Spec describes when the Action is taken.
There are two kinds of Schedule Spec:

- A simple interval, like "every 30 minutes" (aligned to start at the Unix epoch, and optionally including a phase offset).
- A calendar-based expression, similar to the "cron expressions" supported by lots of software, including the older Temporal Cron feature.

These two kinds have multiple representations, depending on the interface or SDK you're using, but they all support the same features.

In tctl, for example, an interval is specified as a string like `45m` to mean every 45 minutes, or `6h/5h` to mean every 6 hours but at the start of the fifth hour within each period.

In tctl, a calendar expression can be specified as either a traditional cron string with five (or six or seven) positional fields, or as JSON with named fields:

```json
{
  "year": "2022",
  "month": "Jan,Apr,Jul,Oct",
  "dayOfMonth": "1,15",
  "hour": "11-14"
}
```

The following calendar JSON fields are available:

- `year`
- `month`
- `dayOfMonth`
- `dayOfWeek`
- `hour`
- `minute`
- `second`
- `comment`

Each field can contain a comma-separated list of ranges (or the `*` wildcard), and each range can include a slash followed by a skip value.
The `hour`, `minute`, and `second` fields default to `0` while the others default to `*`, so you can describe many useful specs with only a few fields.

For `month`, names of months may be used instead of integers (case-insensitive, abbreviations permitted).
For `dayOfWeek`, day-of-week names may be used.

The `comment` field is optional and can be used to include a free-form description of the intent of the calendar spec, useful for complicated specs.

No matter which form you supply, calendar and interval specs are converted to canonical representations.
What you see when you "describe" or "list" a Schedule might not look exactly like what you entered, but it has the same meaning.

Other Spec features:

**Multiple intervals/calendar expressions:** A Spec can have combinations of multiple intervals and/or calendar expressions to define a specific Schedule.

**Time bounds:** Provide an absolute start or end time (or both) with a Spec to ensure that no actions are taken before the start time or after the end time.

**Exclusions:** A Spec can contain exclusions in the form of zero or more calendar expressions.
This can be used to express scheduling like "each Monday at noon except for holidays.
You'll have to provide your own set of exclusions and include it in each schedule; there are no pre-defined sets.
(This feature isn't currently exposed in tctl or the Temporal Web UI.)

**Jitter:** If given, a random offset between zero and the maximum jitter is added to each Action time (but bounded by the time until the next scheduled Action).

**Time zones:** By default, calendar-based expressions are interpreted in UTC.
Temporal recommends using UTC to avoid various surprising properties of time zones.
If you don't want to use UTC, you can provide the name of a time zone.
The time zone definition is loaded on the Temporal Server Worker Service from either disk or the fallback embedded in the binary.

For more operational control, embed the contents of the time zone database file in the Schedule Spec itself.
(Note: this isn't currently exposed in tctl or the web UI.)

### Pause

A Schedule can be Paused.
When a Schedule is Paused, the Spec has no effect.
However, you can still force manual actions by using the [tctl schedule trigger](/tctl-v1/schedule#trigger) command.

To assist communication among developers and operators, a “notes” field can be updated on pause or resume to store an explanation for the current state.

### Backfill

A Schedule can be Backfilled.
When a Schedule is Backfilled, all the Actions that would have been taken over a specified time period are taken now (in parallel if the `AllowAll` [Overlap Policy](#overlap-policy) is used; sequentially if `BufferAll` is used).
You might use this to fill in runs from a time period when the Schedule was paused due to an external condition that's now resolved, or a period before the Schedule was created.

### Limit number of Actions

A Schedule can be limited to a certain number of scheduled Actions (that is, not trigger immediately).
After that it will act as if it were paused.

### Policies

A Schedule supports a set of Policies that enable customizing behavior.

#### Overlap Policy

The Overlap Policy controls what happens when it is time to start a Workflow Execution but a previously started Workflow Execution is still running.
The following options are available:

- `Skip`: **Default**.
  Nothing happens; the Workflow Execution is not started.
- `BufferOne`: Starts the Workflow Execution as soon as the current one completes.
  The buffer is limited to one.
  If another Workflow Execution is supposed to start, but one is already in the buffer, only the one in the buffer eventually starts.
- `BufferAll`: Allows an unlimited number of Workflows to buffer.
  They are started sequentially.
- `CancelOther`: Cancels the running Workflow Execution, and then starts the new one after the old one completes cancellation.
- `TerminateOther`: Terminates the running Workflow Execution and starts the new one immediately.
- `AllowAll` Starts any number of concurrent Workflow Executions.
  With this policy (and only this policy), more than one Workflow Execution, started by the Schedule, can run simultaneously.

#### Catchup Window

The Temporal Cluster might be down or unavailable at the time when a Schedule should take an Action.
When it comes back up, the Catchup Window controls which missed Actions should be taken at that point.
The default is one minute, which means that the Schedule attempts to take any Actions that wouldn't be more than one minute late.
An outage that lasts longer than the Catchup Window could lead to missed Actions.
(But you can always [Backfill](#backfill).)

#### Pause-on-failure

If this policy is set, a Workflow Execution started by a Schedule that ends with a failure or timeout (but not Cancellation or Termination) causes the Schedule to automatically pause.

Note that with the `AllowAll` Overlap Policy, this pause might not apply to the next Workflow Execution, because the next Workflow Execution might have started before the failed one finished.
It applies only to Workflow Executions that were scheduled to start after the failed one finished.

### Last completion result

A Workflow started by a Schedule can obtain the completion result from the most recent successful run.
(How you do this depends on the SDK you're using.)

For overlap policies that don't allow overlap, “the most recent successful run” is straightforward to define.
For the `AllowAll` policy, it refers to the run that completed most recently, at the time that the run in question is started.
Consider the following overlapping runs:

```
time -------------------------------------------->
 A     |----------------------|
 B               |-------|
 C                          |---------------|
 D                                |--------------T
```

If D asks for the last completion result at time T, it gets the result of A.
Not B, even though B started more recently, because A completed later.
And not C, even though C completed after A, because the result for D is captured when D is started, not when it's queried.

Failures and timeouts do not affect the last completion result.

### Last failure

A Workflow started by a Schedule can obtain the details of the failure of the most recent run that ended at the time when the Workflow in question was started. Unlike last completion result, a _successful_ run _does_ reset the last failure.

### Limitations

:::info Experimental

The Scheduled Workflows feature is available in Temporal Server version 1.18.

Internally, a Schedule is implemented as a Workflow.
If you're using Advanced Visibility (Elasticsearch), these Workflow Executions are hidden from normal views.
If you're using Standard Visibility, they are visible, though there's no need to interact with them directly.

:::

Native support for Schedules in language SDKs is coming soon.
For now, `tctl` and the web UI are the main interfaces to Schedules.
For advanced use, you can also use the gRPC API by getting a `WorkflowServiceClient` object from the SDK and calling methods such as `CreateSchedule`.
