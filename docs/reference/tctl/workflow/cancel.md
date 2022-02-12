---
id: cancel
title: tctl workflow cancel
sidebar_label: cancel
description: How to cancel a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow cancel` command cancels a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

Canceling a running Workflow Execution records a `WorkflowExecutionCancelRequested` event in the History.
A new command task will be scheduled.
After cancellation, the Workflow Execution can perform cleanup work.

See also [`tctl workflow terminate`](./terminate.md).

`tctl workflow cancel [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow cancel --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow show --run_id <id>
```
