---
id: fail
title: tctl activity fail
sidebar_label: fail
description: How to fail an Activity Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl activity fail` command fails an [Activity Execution](/concepts/what-is-an-activity-execution).

`tctl activity fail [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify the [Workflow Id](/concepts/what-is-a-workflow-id) of an [Activity Execution](/concepts/what-is-an-activity-execution) to fail.

Aliases: `--wid`, `-w`

**Example**

```bash
tctl activity fail --workflow_id <id>
```

### `--run_id`

Specify the [Run Id](/concepts/what-is-a-run-id) of an [Activity Execution](/concepts/what-is-an-activity-execution) to fail.

Aliases: `--rid`, `-r`

**Example**

```bash
tctl activity fail --run_id <id>
```

### `--activity_id`

Specify the [Activity Id](/concepts/what-is-an-activity-id) of an [Activity Execution](/concepts/what-is-an-activity-execution) to fail.

Alias: `--aid`

**Example**

```bash
tctl activity fail --activity_id <id>
```

### `--reason`

Specify the reason for failing an [Activity Execution](/concepts/what-is-an-activity-execution).

**Example**

```bash
tctl activity fail --reason <value>
```

### `--detail`

Specify details of the reason for failing an [Activity Execution](/concepts/what-is-an-activity-execution).

**Example**

```bash
tctl activity fail --detail <value>
```

### `--identity`

Specify the identity of the operator when using tctl to fail an [Activity Execution](/concepts/what-is-an-activity-execution).

**Example**

```bash
tctl activity complete --identity <value>
```
