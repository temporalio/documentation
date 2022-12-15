---
id: cancel
title: tctl workflow cancel
sidebar_label: cancel
description: How to cancel a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow cancel --query` command cancels a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Canceling a running Workflow Execution records a `WorkflowExecutionCancelRequested` event in the History.
A new command task will be scheduled.
After cancellation, the Workflow Execution can perform cleanup work.

See also [`tctl workflow terminate --query`](/tctl-v1/workflow/terminate).

`tctl workflow cancel --query <query> <modifiers>`

The following modifiers control the behavior of the command.

### --workflow_id

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `-w`

**Example**

```bash
tctl workflow cancel --workflow_id <id>
```

### --run_id

Specify a [Run Id](/concepts/what-is-a-run-id).

Alias: `-r`

**Example**

```bash
tctl workflow cancel --run_id <id>
```
