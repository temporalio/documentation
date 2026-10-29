---
id: reset
title: Reset an Activity
sidebar_label: Reset
description: Clear an Activity's retry state and schedule a fresh attempt, including what happens when an attempt is already running.
slug: /activity-operations/reset
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Reset clears an Activity's retry state and schedules a fresh execution.

## When to Reset

- An Activity has exhausted most of its retries, and you want to give it a fresh set after fixing the underlying issue.
- A Paused Activity needs to start clean after a configuration change or code deploy.
- You want to clear accumulated retry backoff and retry immediately instead of waiting for the next backoff interval.
- A batch of Activities failed due to a transient issue and you want to restart them all with staggered jitter.

## What happens when you Reset an Activity

- **The attempt count resets to 1.** The Activity gets a full set of retry attempts regardless of how many it had used.
- **Heartbeat details are preserved.** The new attempt starts with the last recorded Heartbeat details available, so
  your code can use a checkpoint it previously saved in Heartbeat details. Pass `--clear-heartbeat-details` to discard
  them instead.
- **Per-attempt timeouts are re-armed.** They restart for the new attempt rather than being removed.
- **Retry backoff is discarded.** If the Activity is between attempts, waiting out a backoff, the new attempt is
  dispatched right away. If an attempt is running, see
  [Reset while an attempt is running](#reset-while-an-attempt-is-running).
- **If the Activity is Paused, Reset also Unpauses it.** Use `--keep-paused` to Reset the attempt count without resuming
  execution. With `--keep-paused`, the attempt count is reset but the Activity stays Paused. No retry is scheduled
  until you [Unpause](/activity-operations/unpause) separately.
- **Resetting an Activity doesn't affect the parent Workflow.** The Workflow continues Running, and Signals, Queries,
  and Updates on the parent Workflow are unaffected.
- **Workflow code has no visibility into Activity Operations.** Reset doesn't produce an Event History event, so the
  Workflow can't detect or react to it. See [Observability](/activity-operations#observability).
- **Reset is idempotent.** Resetting an Activity that's already at attempt 1 with no backoff has no effect. Resetting a
  completed Activity returns an error.

### Reset while an attempt is running

Reset is handled cooperatively.

- The reset request is delivered to the running attempt through the Activity's
  [Heartbeat](/encyclopedia/detecting-activity-failures#activity-heartbeat), if the Activity heartbeats.
- Your Worker can accept the request and stop processing the current attempt, or carry on and complete the Activity
  successfully.
- The Temporal Service processes the reset once the current attempt finishes, including by hitting its
  [Start-To-Close Timeout](/encyclopedia/detecting-activity-failures#start-to-close-timeout). A new attempt then
  starts and a new Activity Task is dispatched to a Worker.

Reset never dispatches a new attempt while one is still running, and it never runs two attempts concurrently. This is
the same for Workflow Activities and Standalone Activities.

## CLI usage

```bash
temporal activity reset \
  --workflow-id my-workflow \
  --activity-id my-activity

# Reset retry state but don't resume yet
temporal activity reset \
  --workflow-id my-workflow \
  --activity-id my-activity \
  --keep-paused
```

To target a Standalone Activity, omit `--workflow-id`:

```bash
temporal activity reset \
  --activity-id my-activity
```

See the [CLI reference for `temporal activity reset`](/cli/command-reference/activity#reset) for all options.

## Detect Reset in Activity code

Activities with Heartbeat can detect that an interruption was caused by Reset rather than a timeout or Workflow
Cancellation. A Reset Activity is retried from attempt 1. A Cancelled Activity isn't. Your Activity code may need to
handle these cases differently, for example saving partial progress on Reset while discarding it on Cancellation.

| SDK        | How to detect Reset                                                                |
| ---------- | ---------------------------------------------------------------------------------- |
| Go         | `activity.GetCancellationDetails(ctx).Cause()` returns `activity.ErrActivityReset` |
| Java       | Catch `ActivityResetException`                                                     |
| TypeScript | Catch `ApplicationFailure` with `error.type === "ActivityReset"`                   |
| Python     | Check `cancellation_details().reset` on `asyncio.CancelledError`                   |
| .NET       | Check `CancellationDetails.IsReset` on `OperationCanceledException`                |

## Important considerations

- **A Reset Activity can still time out.** Reset doesn't restart the
  [Schedule-To-Close Timeout](/encyclopedia/detecting-activity-failures#schedule-to-close-timeout). The deadline is
  calculated from when the Activity was originally scheduled. Use [`update-options`](/activity-operations/update-options) to extend the
  timeout before or after Reset.
- **Heartbeat details survive a Reset.** If your Activity uses Heartbeat details for progress tracking, the new attempt
  still has the last recorded details, so your code can use a checkpoint it previously saved in them. Pass
  `--clear-heartbeat-details` when you want the new attempt to start over from the beginning.
- **Reset won't reach an Activity that doesn't Heartbeat.** The request has no way to be delivered, so the current
  attempt runs to completion, which could take up to the full
  [Start-To-Close Timeout](/encyclopedia/detecting-activity-failures#start-to-close-timeout). The reset still applies
  afterwards, if the Activity is still Open. See
  [Reset while an attempt is running](#reset-while-an-attempt-is-running).
- **`--restore-original-options` restores the Activity's original configuration.** It reverts timeouts, Retry Policy,
  and Task Queue to the values from when the Activity was first scheduled.
- **Bulk Reset can overwhelm downstream services.** When using `--query` to Reset Activities across many Workflows, use
  `--jitter` to stagger the restart times.
