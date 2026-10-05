---
id: schedule-missed-actions
title: Troubleshoot missed Schedule Actions
sidebar_label: Missed Schedule Actions
description: Diagnose missed or delayed Schedule Actions caused by overlap policies, buffering, cancellation, and Catchup Window expiry, with metrics and examples.
toc_max_heading_level: 4
tags:
  - Schedules
  - Metrics
  - Observability
  - Troubleshooting
---

When a [Schedule](/schedule) does not start a Workflow Execution at its expected time, check whether the Schedule is paused or its end time has passed.
An [Overlap Policy](/schedule#overlap-policy) can also skip or delay an Action, and a delayed Action can expire outside the [Catchup Window](/schedule#catchup-window).
Use the [common pitfalls](#common-pitfalls) below to recognize these behaviors, and use metrics and Schedule state to investigate missed Actions.

## Alert on missed catchup window

The Temporal Service emits a counter each time it skips a scheduled Action because it could not run it within the configured Catchup Window. Alert on any non-zero value.

### Temporal Cloud

Alert on [`temporal_cloud_v1_schedule_missed_catchup_window_count`](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_schedule_missed_catchup_window_count) grouped by `temporal_namespace`.

Example PromQL:

```
sum by (temporal_namespace) (
  increase(temporal_cloud_v1_schedule_missed_catchup_window_count[5m])
) > 0
```

### Self-hosted

Alert on [`schedule_missed_catchup_window`](/references/service-metrics#schedule_missed_catchup_window) grouped by `namespace`.

Example PromQL:

```
sum by (namespace) (
  increase(schedule_missed_catchup_window[5m])
) > 0
```

The metric is scoped to the Namespace, not to individual Schedules. A non-zero value tells you that at least one Schedule in the Namespace missed an Action, but not which one.

## Investigate which Schedule missed an Action

Once the alert fires, narrow your search down to the affected Schedule in two steps.

### 1. List Schedules in the Namespace

Enumerate the Schedules in the alerting Namespace:

```
temporal schedule list --namespace <your-namespace>
```

[`ListSchedules`](/cli/command-reference/schedule#list) returns Schedule Ids and summary information. It does not return per-Schedule miss counters, so use it only to produce the set of Schedule Ids to inspect.

### 2. Describe each Schedule

For each Schedule Id returned, run:

```
temporal schedule describe \
  --schedule-id <your-schedule-id> \
  --namespace <your-namespace>
```

[`DescribeSchedule`](/cli/command-reference/schedule#describe) returns full Schedule state, including the `info` block with cumulative counters. The relevant fields:

| Field | Meaning |
|-------|---------|
| `missedCatchupWindow` | Actions skipped because they could not run within the Catchup Window. Non-zero here identifies the Schedule responsible for the alert. |
| `overlapSkipped` | Actions skipped because the previous run was still in progress and the Overlap Policy is `Skip`. |
| `bufferDropped` | Buffered Actions dropped because the buffer was full under `BufferOne` or `BufferAll`. |
| `bufferSize` | Current depth of the Action buffer. |
| `recentActions` | Most recent Action times and results. |
| `runningWorkflows` | Workflow Executions currently running for this Schedule. |

Scripting the fan-out against the JSON output (`temporal schedule describe -o json`) is usually faster than inspecting each Schedule interactively.

## Interpret the result

Once you have identified the Schedule with a non-zero `missedCatchupWindow`, use the rest of the `DescribeSchedule` output to determine impact and root cause.

### Assess impact

- Compare `recentActions` to the Schedule's Spec to determine how many Actions were skipped and over what time period.
- If the Schedule uses the `Skip` Overlap Policy and the preceding run was long-running, the miss may reflect that run exceeding the Catchup Window, not a Service outage.
- For business-critical Schedules, [Backfill](/schedule#backfill) the skipped interval once the underlying cause is resolved.

### Common root causes

- **Service or Namespace outage longer than the Catchup Window.** The default Catchup Window is one year, so a miss typically means the Schedule is configured with a tighter window (minimum ten seconds) and the outage exceeded it.
- **Namespace rate limiting.** If scheduled starts are throttled, Actions can queue past the Catchup Window. Cross-check [`temporal_cloud_v1_schedule_rate_limited_count`](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_schedule_rate_limited_count) (Cloud) or [`schedule_rate_limited`](/references/service-metrics#schedule_rate_limited) (self-hosted) in the same time range.
- **Buffer overruns under `BufferAll`.** Long-running Workflow Executions under `BufferAll` can push buffered Actions past the Catchup Window. Cross-check [`temporal_cloud_v1_schedule_buffer_overruns_count`](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_schedule_buffer_overruns_count) (Cloud) or [`schedule_buffer_overruns`](/references/service-metrics#schedule_buffer_overruns) (self-hosted) and examine `bufferSize`.

### Remediate

- Widen the Catchup Window if the current value is tighter than your Service's worst-case unavailability. The trade-off is that more late Actions will fire during recovery.
- Revisit the Overlap Policy if runs routinely exceed the Spec interval. `BufferAll` and `Skip` have different failure modes under sustained delay.
- Increase Namespace throughput limits if rate limiting is the contributing factor.
- [Backfill](/schedule#backfill) the missed interval if the skipped Actions need to run.

## Common pitfalls

A scheduled time does not guarantee that a Workflow Execution starts.
An Action can be skipped by an Overlap Policy, expire outside the Catchup Window, exceed an internal buffer limit, or fail when the Service attempts to start the Workflow Execution.

### `Skip` is the default Overlap Policy

With `Skip`, every Action that overlaps an open Workflow Execution is intentionally discarded.
Skipped Actions are not retained for later execution.

For example, suppose a Schedule runs every five minutes and its first Workflow Execution takes 22 minutes:

```text
09:00  starts
09:05  overlaps and is skipped
09:10  overlaps and is skipped
09:15  overlaps and is skipped
09:20  overlaps and is skipped
09:22  the 09:00 Workflow Execution closes
09:25  starts
```

Only the `09:00` and `09:25` Actions start.
Use `BufferOne` or `BufferAll` if overlapping Actions must be retained, or `AllowAll` if they can run concurrently.

### `BufferOne` preserves the oldest waiting Action

`BufferOne` retains the first Action that overlaps an open Workflow Execution.
It does not replace that Action with the most recent one.
Additional Actions are skipped while the buffer is occupied.

```text
09:00  starts
09:05  is buffered
09:10  is skipped because the buffer is occupied
09:15  is skipped because the buffer is occupied
09:20  is skipped because the buffer is occupied
09:22  the 09:00 Workflow Execution closes
09:22  the 09:05 Action becomes eligible to start
```

The buffered Action must still be inside its Catchup Window when it becomes eligible on the current Scheduler implementation.
Older Scheduler implementations differ in this edge case and might still attempt to start an Action after it has waited beyond the window.
Configure the Catchup Window to include the maximum expected overlap delay.

### `BufferAll` can create a backlog

`BufferAll` starts only one non-overlapping Action after each preceding Workflow Execution closes.
If Workflow Executions take longer than the Schedule interval, the backlog grows faster than it drains.
Buffered Actions are subject to an internal safety limit of approximately 1,000 per Schedule by default.
The effective limit can vary by deployment and Scheduler implementation.
Actions can also expire outside the Catchup Window, so `BufferAll` should not be treated as an unlimited durable queue.

For example, with a five-minute Catchup Window:

```text
09:00  starts
09:05  is buffered
09:10  is buffered
09:15  is buffered
09:20  is buffered
09:22  the 09:00 Workflow Execution closes
```

At `09:22`, only the `09:20` Action is still inside the five-minute window.
On the current Scheduler implementation, the `09:05`, `09:10`, and `09:15` Actions expire, and the `09:20` Action starts.

### Cancellation is asynchronous

`CancelOther` requests cancellation and waits for the running Workflow Execution to close.
The Workflow must process the cancellation before the replacement can start.
If more Actions become due while cancellation is pending, the most recent waiting Action is selected after the running Workflow Execution closes.

```text
09:00  starts
09:05  requests cancellation of 09:00 and waits
09:10  becomes the newest waiting Action
09:15  becomes the newest waiting Action
09:20  becomes the newest waiting Action
09:22  the 09:00 Workflow Execution closes
09:22  the 09:20 Action becomes eligible to start
```

A slow or cancellation-resistant Workflow can therefore delay the replacement beyond its Catchup Window.
`TerminateOther` does not require Workflow cooperation, but task processing and closure-notification latency can still delay the replacement.

### `AllowAll` can create unbounded concurrency

`AllowAll` produces the fewest policy-related misses because every Action can start concurrently.
However, when Workflow Executions take longer than the Schedule interval, concurrency continually increases until executions begin to close.
Ensure that Workers, downstream systems, and Namespace limits can handle the maximum expected concurrency.

## Related reading

- [Schedule concept](/schedule)
- [Catchup Window](/schedule#catchup-window)
- [Temporal CLI schedule reference](/cli/command-reference/schedule)
- [Temporal Cloud OpenMetrics metrics reference](/cloud/metrics/openmetrics/metrics-reference)
- [Self-hosted Temporal Service metrics reference](/references/service-metrics)
