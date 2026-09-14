---
id: delete
title: Delete an Activity
sidebar_label: Delete
description: Terminate a Standalone Activity Execution if it's still running, then remove its record from the Temporal Service asynchronously.
slug: /activity-operations/delete
toc_max_heading_level: 4
tags:
  - Concepts
  - Activities
  - Temporal CLI
  - Job Queue
---

Delete terminates the Activity Execution if it's running, then deletes it asynchronously.

## When to Delete

- You need an Execution and its result removed before the Namespace
  [Retention Period](/temporal-service/temporal-server#retention-period) elapses.
- You want to free an Activity ID for reuse without waiting out retention. See
  [Activity ID Reuse Policy](/standalone-activity#activity-id-reuse-policy).

Delete isn't available for [Workflow Activities](/workflow-activity).

## What happens when you Delete an Activity

If the Execution is still running, it's terminated first, with the same semantics as [Terminate](/activity-operations/terminate): no
cleanup runs and progress is discarded. The Execution record is then removed asynchronously, so it may remain visible
briefly after the command returns.

Once deleted, the Execution no longer appears in `temporal activity describe` or `temporal activity list`, and its
Activity ID becomes available for reuse.

## CLI usage

```bash
temporal activity delete \
  --activity-id my-activity
```

See the [CLI reference for `temporal activity`](/cli/command-reference/activity) for all options.

## Important considerations

- **Delete is irreversible.** The Execution, its inputs, and its result are gone; there's no recovery.
- **Deletion is asynchronous.** A successful response means the request was accepted, not that the record is already
  removed.
