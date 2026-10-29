---
id: unpause
title: Unpause an Activity
sidebar_label: Unpause
description: Resume a Paused Activity Execution so its next attempt starts immediately, with options to reset retry state as it resumes.
slug: /activity-operations/unpause
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Unpause resumes a Paused Activity Execution.

## When to Unpause

- The downstream service or dependency that caused you to Pause has recovered.
- A code deploy or configuration change is complete and the Activity is safe to retry.
- You Paused an Activity for investigation and are ready to let it proceed.

## What happens when you Unpause an Activity

- **The Activity is rescheduled immediately.** Any remaining retry backoff is discarded. The next execution starts right
  away.
- **Attempt count, Heartbeat details, and timeouts are preserved.** The Activity resumes from where it left off. Use
  [Reset](/activity-operations/reset) to restart from attempt 1.

Unpause is idempotent. Unpausing an Activity that isn't Paused has no effect. Unpausing an Activity that has already
completed returns an error.

## CLI usage

```bash
temporal activity unpause \
  --workflow-id my-workflow \
  --activity-id my-activity
```

To target a Standalone Activity, omit `--workflow-id`:

```bash
temporal activity unpause \
  --activity-id my-activity
```

See the [CLI reference for `temporal activity unpause`](/cli/command-reference/activity#unpause) for all options.

## Important considerations

- **Unpausing many Activities at once can overwhelm downstream services.** If you Paused multiple Activities because a
  service was down, Unpausing them all at the same time sends all retries simultaneously. Consider Unpausing in batches
  to avoid overwhelming a recovering service.
- **Unpausing doesn't override Workflow Pause.** If the parent Workflow is also Paused, Unpausing the Activity alone
  isn't enough. Both must be Unpaused before the Activity resumes. See
  [Interaction with Workflow Pause](/activity-operations/pause#interaction-with-workflow-pause).
- **Unpausing doesn't reset the attempt count.** The Activity retries from its current attempt number. Use
  [Reset](/activity-operations/reset) to restart from attempt 1.
- **A Paused Activity can time out before you Unpause it.** The
  [Schedule-To-Close Timeout](/encyclopedia/detecting-activity-failures#schedule-to-close-timeout) isn't stopped or
  extended while Paused. Use [`update-options`](/activity-operations/update-options) to extend the timeout before Unpausing if needed.
- **Unpause doesn't interrupt or duplicate an in-flight execution.** If an Activity without Heartbeat is still running
  when you Unpause, it continues to completion. The Temporal Service doesn't schedule a concurrent execution. If the
  in-flight execution fails, the next retry proceeds normally.
