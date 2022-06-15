---
id: scheduled-workflows
title: Scheduled Workflows
sidebar_label: Scheduled Workflows
description: Overview of Scheduled Workflows.
toc_max_heading_level: 4
---

Scheduled workflows are a new way to have a workflow run periodically or
according to a regular schedule. They are much more flexible and have more
features than the existing `CronSchedule` feature.

## Using scheduled workflows as an experimental feature

Scheduled workflows are released as an experimental feature in server version
1.17, and disabled by default. To use them:

- Upgrade your Temporal Server to 1.17 or later.
- Upgrade tctl to [TODO: not released yet] or later.
- Upgrade the web UI to [TODO: not released yet] or later.
- For now, we recommend that you use Advanced Visibility (i.e. Elasticsearch),
  otherwise you won't be able to see schedule details when listing schedules.
- Add or merge a few things in to your dynamic config:

```
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

Only the first two are required; the second two are suggested because by
default, only one worker will run per task queue, so more than one partition is
not useful. Setting the task queue to use one partition will reduce latency.

If you're familiar with dynamic config, you may also constrain these settings by
namespace, as makes sense for your installation.

:::info
Internally, a Schedule is actually implemented as a workflow. Currently (in
version 1.17), that workflow will be visible to you as you navigate the web UI
and use tctl, although there should be no need to interact with it directly. In
later versions we plan to hide these "implementation detail" workflows from the
UI.
:::

## Concepts

A Schedule is a durable entity persisted by the Temporal Server, that has
instructions for starting a specified workflow at specified times. (Note: This
is different from the existing CronSchedule feature, which treats the schedule
as a property of workflows.) This lets you manipulate a Schedule and the
workflows that it starts independently.

A Schedule has an Id, similar to a Workflow Id.

A Schedule configuration contains two main parts: what to do, and when to do it.
The "what to do" part is called the Action, and the "when to do it" is called
the Spec.

### Spec

There are two ways to express a Schedule Spec:

1. A simple interval, like "every 30 minutes" (measured from the unix epoch, and
   optionally including a phase offset).
2. A calendar-based expression, similar to "cron expressions" supported by lots
   of software, including the older Temporal Cron feature.

Calendar expressions are given as separate named fields. In tctl, they can be
provided as json, e.g.

```json
{"year":"2022","month":"*/3","dayOfMonth":"1,15","hour":"11-14"}
```

to avoid any confusion about field count and order. The available fields are:
`year`, `month`, `dayOfMonth`, `dayOfWeek`, `hour`, `minute`, `second`. Each
field may contain a comma-separated list of ranges (or `*`), and each range may
include a skip value following a slash.

For `month`, names of months may be used instead of integers (case-insensitive,
abbreviations permitted). For `dayOfWeek`, day of week names may be used.

Other available features:

**Multiple intervals/calendar expressions:** a Spec can be the union of zero or
more of each of those types.

**Time bounds:** an absolute start or end time (or both) can be provided. No actions
will be taken before the start time or after the end time.

**Exclusions:** a Spec can contain exclusions in the form of zero or more calendar
expressions. This can be used to express things like "each Monday at noon except
for holidays". You'll have to provide your own set of exclusions and include it
in each schedule, there are no pre-defined sets. (Note: this isn't currently
exposed in tctl or the web UI.)

**Jitter:** if given, a random offset between zero and the maximum jitter is added
to each action time (but bounded by the time until the next scheduled action).

**Time zones:** By default, calendar-based expressions are interpreted in UTC. We
recommend using UTC to avoid various surprising properties of time zones. If you
don't want to use UTC, you may provide the name of a time zone to interpret them
in instead. The time zone definition will be loaded from disk on the Temporal
Server Worker, or the fallback embedded in the binary.

For even greater operational control, you may embed the contents of the time
zone database file in the Schedule Spec itself. (Note: this isn't currently
exposed in tctl or the web UI.)

### Action

A Schedule Action currently can currently only start a Workflow (we may allow
other actions in the future). All the usual options for starting Workflows are
available: Workflow Type, Task Queue Name, inputs, timeouts, Retry Policy, etc.

The Workflows started by a Schedule are identical except for two things:

- The Workflow Id of the Workflow that's started will be created by taking the
  configured Workflow Id and appending the timestamp of the action time.

- The Workflow will be given a Search Attribute `TemporalScheduledStartTime`,
  with the action time as the value.

Additionally, the Search Attribute `TemporalScheduledById` will be set to the
Schedule Id. (Note that Search Attributes are only available when using Advanced
Visibility.)

### State

#### Paused

A Schedule may be paused: in this state, it won't take any actions based on its
Spec (but you can still force manual actions, see below for "trigger
immediately").

To assist communication among developers and operators, there's a “notes” field
that can be updated on pause/unpause to store an explanation for the current
state.

#### Limited actions

A Schedule may be limited to a certain number of scheduled actions (i.e. not
trigger immediately). After that it will act as if it was paused.

### Policies

In addition to the Spec and the Action, a Schedule has some policies that allow
customizing the behavior:

#### Overlap policy

The overlap policy controls what happens when it's time to start a workflow and
a previously-started workflow is already running. There are six options:

- `Skip` (default) means don't start anything. When the workflow completes, the
  next scheduled event after that time will be considered.
- `BufferOne` means start the workflow again soon as the current one completes,
  but only buffer one workflow in this way. If another workflow is supposed to
  start when the workflow is running, and one is already buffered, then only the
  first one will be started after the running workflow finishes.
- `BufferAll` means buffer up any number of workflows to all happen sequentially,
  immediately after the running workflow completes.
- `CancelOther` means cancel the running workflow, and then start the new one
  after the old one completes cancellation.
- `TerminateOther` means terminate the running workflow and start the new one
  immediately.
- `AllowAll` means start any number of concurrent workflows. With this policy
  (and only this policy), there may be more than one workflow started by the
  Schedule running simultaneously.

#### Catchup window

It may happen that the Temporal Server itself is down or unavailable at the time
when a Schedule should take an action. When it comes back up, the catchup window
controls which missed actions should be taken at that point. The default is one
minute, which means that the Schedule will attempt to take any actions that
wouldn't be more than one minute late. An outage that lasts longer than the
catchup window could lead to missed actions. (But you can always backfill, see
below.)

#### Pause-on-failure

If this policy is set, a workflow started by a Schedule that ends with a failure
or timeout (but not cancellation or terminate) will cause the Schedule to
automatically pause.

Note that with the `AllowAll` overlap policy, this pause might not apply to the
next run, because the next run might have started before the failed run
finished. It will apply to only to runs that were scheduled to start after the
failed run finished.

## Operations

### Create

With tctl, create a Schedule like this:

```shell
$ tctl config set version next   # ensure you're using the new tctl
$ tctl schedule create \
    --sid 'my-schedule-id' \
    --interval '5h/15m' \
    --cal '{"dayOfWeek":"Fri","hour":"11","minute":"3"}' \
    --overlap-policy 'BufferAll' \
    --wid 'my-workflow-id' \
    --tq 'my-task-queue' \
    --type 'MyWorkflowType'
```

This Schedule will take action every 5 hours at 15 minutes past the hour, and
also at 11:03 on Fridays. It will start a Workflow `MyWorkflowType` on task
queue `my-task-queue`, giving it an Id like
`my-workflow-id-2022-06-17T11:03:00Z`. Workflows will not be run in parallel,
but will be buffered to run sequentially if they would otherwise overlap.

See `tctl schedule create --help` for the full set of available options.

Web UI: TBD

### Update

Any part of the Schedule configuration can be updated at any time. `tctl
schedule update` takes the same options as `tctl schedule create` and replaces
the entire configuration of the schedule with what's provided. (This means if
you want to change just one value, you have to provide everything else again.)

Web UI: TBD

### Describe

```shell
$ tctl schedule describe --sid 'my-schedule-id'
```

displays the current Schedule configuration as well as extra information about
past, current, and future runs.

Web UI: TBD

### Delete

A Schedule may be deleted. Deleting a Schedule **does not** affect any Workflows
started by the Schedule. If you would also like to terminate Workflows started
by the Schedule, you can identify them using a Search Attribute as described
below and do a batch terminate or manually terminate them all.

```shell
$ tctl schedule delete --sid 'my-schedule-id'
```

Web UI: TBD

### Pause/unpause

Using tctl:

```shell
$ tctl schedule toggle --sid 'my-schedule-id' --pause --reason "paused because the database is down"
$ tctl schedule toggle --sid 'my-schedule-id' --unpause --reason "the database is back up"
```

Web UI: TBD

### Trigger immediately

It's a common desire to want a Schedule to start one Workflow run immediately,
regardless of its configured Spec.

You can make this request with tctl:

```shell
$ tctl schedule trigger --sid 'my-schedule-id'
```

Note that the action that it takes is subject to the overlap policy of the
Schedule by default: if the overlap policy is `Skip` and there already is a
Workflow running, the immediately-triggered run will be skipped! Likewise, if
the overlap policy is `BufferAll`, the triggered run will be buffered behind one
or more runs. If you really want it to run right now, you can override the
overlap policy for this request:

```shell
$ tctl schedule trigger --sid 'my-schedule-id' --overlap-policy 'AllowAll'
```

Web UI: TBD

### Backfill

Backfilling a Schedule means having it do now what it would have done over a
specified time range (generally in the past, although it won't prevent you from
giving a time range in the future). You might use this to fill in runs from a
time period when the Schedule was paused due to an external condition that's now
resolved, or a period before the Schedule was created.

With tctl:

```shell
$ tctl schedule backfill --sid 'my-schedule-id'   \
  --overlap-policy 'BufferAll'                    \
  --start-time '2022-05-01T00:00:00Z'             \
  --end-time   '2022-05-31T23:59:59Z'
```

Note that similarly to trigger immediately, you probably want to override the
overlap policy. `AllowAll` would run all the backfilled workflows at once, while
`BufferAll` would run them sequentially. (The other policies don't make much
sense in this context.)

Web UI: TBD

### Listing schedules

tctl:

```shell
$ tctl schedule list
```

Web UI: Use the “Schedules” tab on the left sidebar.

Note that if you're using Standard Visibility, listing Schedules will currently
only include Schedule Ids and no other information. We plan to address this in
the future.


## Other tips and tricks

### Last completion result

A Workflow started by a Schedule can obtain the completion result from the most
recent successful run. (How you do this depends on which SDK you're using.)

For overlap policies that don't allow overlap, “the most recent successful run”
is straightforward to define. For the `AllowAll` policy, it refers to the run
that completed most recently, at the time that the run in question is started.
That is, given the overlapping runs below:

```
time -------------------------------------------->
 A     |----------------------|
 B               |-------|
 C                          |---------------|
 D                                |--------------T
```

If D asks for the last completion result at time T, it will get the result of A.
Not B, even though B started more recently, because A completed later. And not
C, even though C completed after A, because the result for D is captured when D
is started, not when it's queried.

Failures and timeouts do not affect the last completion result.

### Last failure

A Workflow started by a Schedule can obtain the details of the failure of the
most recent run that ended at the time when the Workflow in question was
started. Unlike last completion result, a _successful_ run _does_ reset the last
failure.

