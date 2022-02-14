---
id: observe
title: tctl workflow observe
sidebar_label: observe
description: How to show the progress of the Event History of a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow observe` command shows the progress of the [Event History](/docs/concepts/what-is-an-event-history) of a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

See also [`tctl workflow observeid`](/docs/tctl/workflow/observeid.md).

`tctl workflow observe [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow observe --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow observe --run_id <id>
```

### `--show_detail`

How to show event details.

Alias: `--sd`

**Example**

```
tctl workflow observe --show_detail
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```
tctl workflow observe --max_field_length <length>
```
