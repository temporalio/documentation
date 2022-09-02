---
id: terminate
title: tctl workflow terminate
sidebar_label: terminate
description: How to terminate a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow terminate` command terminates a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Terminating a running Workflow Execution records a `WorkflowExecutionTerminated` event as the closing event in the History.
No more command tasks will be scheduled.

See also [`tctl workflow cancel`](/tctl/workflow/cancel).

`tctl workflow terminate <modifiers>`

The following modifiers control the behavior of the command.

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow terminate --workflow-id <value>
```

### `--run-id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`

**Example**

```bash
tctl workflow terminate --run-id <value>
```

### `--reason`

Specify a reason for terminating the [Workflow Execution](/concepts/what-is-a-workflow-execution).

Alias: `-r`

**Example**

```bash
tctl workflow terminate --reason <value>
```
