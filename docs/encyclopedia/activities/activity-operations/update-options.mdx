---
id: update-options
title: Update Activity Options
sidebar_label: Update Options
description: Change an Activity's timeouts, Retry Policy, or Task Queue while it runs, without restarting the Execution or losing retry state.
slug: /activity-operations/update-options
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Update Options changes an Activity's runtime configuration without restarting it.

## When to Update Options

- The [Schedule-To-Close Timeout](/encyclopedia/detecting-activity-failures#schedule-to-close-timeout) is about to
  expire on a Paused Activity, and you need to extend it before Unpausing.
- An Activity's [Retry Policy](/encyclopedia/retry-policies) needs tuning based on observed failure patterns (for
  example, increasing the backoff interval or maximum attempts).
- You want to move an Activity to a different [Task Queue](/task-queue) to route it to a specific set of
  [Workers](/workers).
- You need to restore an Activity's original configuration after a temporary override.

## What happens when you Update an Activity's Options

You can change [timeouts](/encyclopedia/detecting-activity-failures) (Schedule-To-Close, Start-To-Close,
Schedule-To-Start, Heartbeat), Retry Policy (initial interval, maximum interval, backoff coefficient, maximum attempts),
and Task Queue. Only the fields you specify are changed. All other options remain unchanged.

- **If the Activity is waiting for retry (scheduled),** the new options take effect immediately. Any pending retry timer
  is regenerated with the updated configuration.
- **If the Activity is currently running,** the new options are stored but take effect on the next execution. The
  in-flight execution isn't interrupted.
- **If the Activity is Paused,** the new options are stored immediately. They take effect when the Activity is Unpaused
  and the next execution starts.
- **Workflow code has no visibility into Activity Operations.** Update Options doesn't produce an Event History event,
  so the Workflow can't detect or react to it. See [Observability](/activity-operations#observability).

Update Options is idempotent. Updating an Activity with the same values it already has produces no change. Updating
options on an Activity that has already completed returns an error.

## CLI usage

```bash
temporal activity update-options \
  --workflow-id my-workflow \
  --activity-id my-activity \
  --schedule-to-close-timeout 24h
```

To target a Standalone Activity, omit `--workflow-id`:

```bash
temporal activity update-options \
  --activity-id my-activity \
  --schedule-to-close-timeout 24h
```

See the [CLI reference for `temporal activity update-options`](/cli/command-reference/activity#update-options) for all
options, including Retry Policy and Task Queue.

## Important considerations

- **Changes to a running Activity take effect on the next execution, not the current one.** If you need the change to
  apply immediately, the Activity must finish or fail its current execution first.
- **`--restore-original-options` is batch-only.** This flag only works with `--query`. It's silently ignored in
  single-workflow mode. It can't be combined with other option changes in the same command.
- **Restoring original options requires a stored snapshot.** For Activities that started before your Temporal Service
  supported Activity Operations, no snapshot exists and the request is rejected.
