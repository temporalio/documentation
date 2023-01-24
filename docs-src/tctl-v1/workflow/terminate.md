---
id: terminate
title: tctl workflow terminate
sidebar_label: terminate
description: How to terminate a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow terminate` command terminates a [Workflow Execution](/workflows#workflow-execution).

Terminating a running Workflow Execution records a `WorkflowExecutionTerminated` event as the closing event in the History.
No more command tasks will be scheduled.

See also [`tctl workflow cancel`](/tctl-v1/workflow/cancel).

`tctl workflow terminate --query <modifiers>`

The following modifiers control the behavior of the command.

### --workflow_id

_Required modifier_

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `-w`

**Example**

```bash
tctl workflow terminate --workflow_id <id>
```

### --run_id

Specify a [Run Id](/concepts/what-is-a-run-id).

If `run_id` is not specified, `tctl` terminates the last Workflow Execution for the specified `workflow_id`.

Alias: `-r`

**Example**

```bash
tctl workflow terminate --run_id <id>
```

### --reason

Specify a reason for terminating the [Workflow Execution](/workflows#workflow-execution).

**Example**

```bash
tctl workflow terminate --workflow_id --reason <string>
```
