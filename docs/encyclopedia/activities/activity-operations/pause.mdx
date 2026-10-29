---
id: pause
title: Pause an Activity
sidebar_label: Pause
description: Stop an Activity's retries without closing the Execution, detect a Pause from Activity code, and resume it later with Unpause.
slug: /activity-operations/pause
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Pause stops the Temporal Service from scheduling new retries of an [Activity Execution](/activity-execution).

## When to Pause

- An Activity is calling an external service that's experiencing issues, and you want to stop retries until the service
  recovers.
- You need to inspect or change configuration before the Activity retries.
- You're rolling out a new Worker version and want to hold specific Activities until the deploy is complete.

## What happens when you Pause an Activity

- **Pausing an Activity doesn't affect the parent Workflow.** The Workflow continues Running, and
  [Signals, Queries, and Updates](/encyclopedia/workflow-message-passing) on the parent Workflow are unaffected.
- **No further retries are scheduled.** The Temporal Service stops scheduling retries. This is enforced server-side, not
  by the SDK.
- **Workflow code has no visibility into Activity Operations.** Pause doesn't produce an Event History event, so the
  Workflow can't detect or react to it. See [Observability](/activity-operations#observability).
- **[Heartbeating](/encyclopedia/detecting-activity-failures#activity-heartbeat) determines whether the in-flight
  execution is interrupted:**
  - **Activities with Heartbeat** are interrupted on their next Heartbeat. The SDK raises a Pause-specific error, and
    the Activity can catch this to clean up resources before exiting.
  - **Activities without Heartbeat** continue running to completion. If the execution succeeds, the result is delivered
    to the Workflow normally. If it fails, no retry is scheduled. Pause takes effect after the in-flight execution ends.
- **Pause is idempotent.** Pausing an already-Paused Activity has no effect. Pausing a completed Activity returns an
  error.

## CLI usage

```bash
temporal activity pause \
  --workflow-id my-workflow \
  --activity-id my-activity \
  --reason "Downstream API is down, pausing until recovery"
```

To target a Standalone Activity, omit `--workflow-id`:

```bash
temporal activity pause \
  --activity-id my-activity \
  --reason "Downstream API is down, pausing until recovery"
```

See the [CLI reference for `temporal activity pause`](/cli/command-reference/activity#pause) for all options.

## Detect Pause in Activity code

Activities with Heartbeat can detect that an interruption was caused by Pause rather than a timeout or Workflow
Cancellation. A Paused Activity resumes later. A Cancelled Activity doesn't. Your Activity code may need to handle these
cases differently, for example releasing held resources on Pause while preserving them on Cancellation, or vice versa.

| SDK        | Version  | How to detect Pause                                                  |
| ---------- | -------- | -------------------------------------------------------------------- |
| Go         | v1.34.0+ | Catch `activity.ErrActivityPaused`                                   |
| Java       | v1.29.0+ | Catch `ActivityPausedException`                                      |
| TypeScript | v1.12.3+ | Check `cancellationDetails.paused === true`                          |
| Python     | v1.12.0+ | Check `cancellation_details().paused` on `asyncio.CancelledError`    |
| .NET       | v1.7.0+  | Check `CancellationDetails.IsPaused` on `OperationCanceledException` |

## Interaction with Workflow Pause

[Workflow Pause](/encyclopedia/workflow/workflow-pause) and Activity Pause are independent. Both stop Activity retries,
but they must be Unpaused separately.

- Workflow Pause blocks retries but doesn't interrupt in-flight executions via Heartbeat. Activity Pause does.
- If both are active, both must be Unpaused before the Activity resumes.

## Important considerations

- **A Paused Activity can still time out.** Pause doesn't stop or extend the
  [Schedule-To-Close Timeout](/encyclopedia/detecting-activity-failures#schedule-to-close-timeout). Use
  [`update-options`](/activity-operations/update-options) to adjust the timeout if needed.
- **Pause won't interrupt an Activity that doesn't Heartbeat.** The current execution runs to completion, which could
  take up to the full [Start-To-Close Timeout](/encyclopedia/detecting-activity-failures#start-to-close-timeout).

## Limitations

- **Pause operates on individual Activities.** There's no `--query` flag on `pause`, so there's no batch form. To pause
  multiple Activities, issue separate commands for each Activity ID. See [Batch operations](/activity-operations#batch-operations).
- **No Namespace-wide query for Paused Workflow Activities.** You must know the Workflow ID. See
  [Observability](/activity-operations#observability).
