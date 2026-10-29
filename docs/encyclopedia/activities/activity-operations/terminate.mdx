---
id: terminate
title: Terminate an Activity
sidebar_label: Terminate
description: Forcefully close a Standalone Activity Execution immediately, with no opportunity for your Activity code to clean up first.
slug: /activity-operations/terminate
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Terminate forcefully closes an Activity Execution with no opportunity for your code to clean up.

## When to Terminate

- A [Standalone Activity](/standalone-activity) is stuck or misbehaving and you need it closed now, whether or not it
  Heartbeats.
- A Request Cancel was already sent and the Activity didn't honor it.

Terminate isn't available for [Workflow Activities](/workflow-activity), because the Workflow owns the execution's
lifetime.

## What happens when you Terminate an Activity

The Activity Execution closes immediately and discards its progress. Activity code can't see or respond to a
termination, so no cleanup runs and no Cancellation error is raised. Unlike Request Cancel, this doesn't depend on the
Activity Heartbeating, and it can't be declined by your code.

The Execution and its result remain visible to `temporal activity describe` and `temporal activity list` for the
Namespace [Retention Period](/temporal-service/temporal-server#retention-period). To remove the record sooner, use
[Delete](/activity-operations/delete).

## CLI usage

```bash
temporal activity terminate \
  --activity-id my-activity \
  --reason "Bad input"
```

`--reason` defaults to a message naming the current user. See the
[CLI reference for `temporal activity terminate`](/cli/command-reference/activity#terminate) for all options.

## Important considerations

- **Terminate discards Activity progress unconditionally.** Prefer [Request Cancel](/activity-operations/request-cancel) when your code
  needs to release resources or record a checkpoint.
- **Terminating doesn't delete the record.** The closed Execution stays queryable until the Retention Period elapses.
