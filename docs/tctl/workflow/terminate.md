---
id: terminate
title: tctl workflow terminate
sidebar_label: terminate
description: How to terminate a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow terminate` command terminates a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

Terminating a running Workflow Execution records a `WorkflowExecutionTerminated` event as the closing event in the History.
No more command tasks will be scheduled.

See also [`tctl workflow cancel`](/docs/tctl/workflow/cancel).

`tctl workflow terminate [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow terminate --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow terminate --run_id <id>
```

### `--reason`

How to specify a reason for terminating the [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

Alias: `--re`

**Example**

```
tctl workflow terminate --reason <string>
```
