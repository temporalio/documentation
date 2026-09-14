---
id: request-cancel
title: Request Cancel for an Activity
sidebar_label: Request Cancel
description: Ask an Activity Execution to close gracefully so your code can clean up, and what to expect when an attempt is already running.
slug: /activity-operations/request-cancel
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Request Cancel asks an Activity Execution to close gracefully, giving your code a chance to clean up.

## When to Request Cancel

- A [Standalone Activity](/standalone-activity) is no longer needed, and you want it to stop at a safe point rather
  than be killed mid-attempt.
- A job was submitted in error, and you want the Activity to release the resources it has already acquired.

A [Workflow Activity](/workflow-activity) can't be canceled directly. It receives a cancellation request when its
Workflow is canceled, and from that point behaves the same way a Standalone Activity does.

## What happens when you Request Cancel an Activity

The Activity Execution transitions to `CancelRequested`.

- **If no attempt is running,** the execution closes immediately. This doesn't depend on the Activity Heartbeating.
- **If an attempt is running,** the request reaches your code through the Activity's
  [Heartbeat](/encyclopedia/detecting-activity-failures#activity-heartbeat). A Cancellation error is raised when the
  next Heartbeat response is received, and the Activity transitions to canceled status if your code lets that error
  propagate.
- **If the Activity doesn't Heartbeat,** it isn't interrupted mid-attempt. The request takes effect at the next attempt
  boundary, for example when the
  [Start-To-Close Timeout](/encyclopedia/detecting-activity-failures#start-to-close-timeout) elapses.

See [Cancellation](/activity-execution#cancellation) for how your Activity code accepts or ignores a Cancellation.

## CLI usage

```bash
temporal activity cancel \
  --activity-id my-activity \
  --reason "No longer needed"
```

See the [CLI reference for `temporal activity cancel`](/cli/command-reference/activity#cancel) for all options.

## Important considerations

- **A successful response means the request was accepted, not that the Activity stopped.** Your code may complete or
  fail non-retryably instead of honoring the request.
- **Cancellation can be requested only once.** Repeating the request doesn't deliver a second Cancellation.
- **Request Cancel takes precedence** over Reset and Pause. See [Successive operations](/activity-operations#successive-operations).
