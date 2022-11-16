---
id: observe
title: tctl workflow observe
sidebar_label: observe
description: How to show the progress of the Event History of a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow observe` command shows the progress of the [Event History](/concepts/what-is-an-event-history) of a [Workflow Execution](/concepts/what-is-a-workflow-execution).

See also [`tctl workflow observeid`](/tctl-v1/workflow/observeid).

`tctl workflow observe <modifiers>`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `-w`

**Example**

```bash
tctl workflow observe --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Alias: `-r`

**Example**

```bash
tctl workflow observe --run_id <id>
```

### `--show_detail`

Show event details.

**Example**

```bash
tctl workflow observe --show_detail
```

### `--max_field_length`

Specify the maximum length for each attribute field.
The default value is 0.

**Example**

```bash
tctl workflow observe --max_field_length <length>
```
