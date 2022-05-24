---
id: observeid
title: tctl workflow observeid
sidebar_label: observeid
description: How to show the progress of the Event History of a Workflow Execution for a specified Workflow Id and optional Run Id using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow observeid` command shows the progress of the [Event History](/concepts/what-is-an-event-history) of a [Workflow Execution](/concepts/what-is-a-workflow-execution) for the specified [Workflow Id](/concepts/what-is-a-workflow-id) and optional [Run Id](/concepts/what-is-a-run-id).

`tctl workflow observeid <workflow_id> [<run_id>] [<modifiers>]`

This command is a shortcut for `tctl workflow observe --workflow_id <workflowid> [--run_id <runid>]`.

The following modifiers control the behavior of the command.

### `--show_detail`

Show event details.

Alias: `--sd`

**Example**

```bash
tctl workflow observeid --show_detail
```

### `--max_field_length`

Specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```bash
tctl workflow observeid --max_field_length <length>
```
