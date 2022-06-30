---
id: observe
title: tctl workflow observe
sidebar_label: observe
description: How to show the progress of the Event History of a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow observe` command shows the progress of the [Event History](/concepts/what-is-an-event-history) of a [Workflow Execution](/concepts/what-is-a-workflow-execution).

See also [`tctl workflow observeid`](/tctl/workflow/observeid).

`tctl workflow observe [<modifiers>]`

Alias: `o`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow observe --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```bash
tctl workflow observe --run_id <id>
```

### `--show_detail`

Show event details.

Alias: `--sd`

**Example**

```bash
tctl workflow observe --show_detail
```

### `--max_field_length`

Specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```bash
tctl workflow observe --max_field_length <length>
```
