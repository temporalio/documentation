---
id: cancel
title: tctl workflow cancel
sidebar_label: cancel
description: How to cancel a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow cancel` command cancels a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Canceling a running Workflow Execution records a `WorkflowExecutionCancelRequested` event in the History.
A new command task will be scheduled.
After cancellation, the Workflow Execution can perform cleanup work.

See also [`tctl workflow terminate`](/tctl/workflow/terminate).

`tctl workflow cancel <modifiers>`

The following modifiers control the behavior of the command.

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow cancel --workflow-id <value>
```

### `--run-id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`

**Example**

```bash
tctl workflow cancel --run-id <value>
```
