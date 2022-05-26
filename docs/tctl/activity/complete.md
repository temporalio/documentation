---
id: complete
title: tctl activity complete
sidebar_label: complete
description: How to provide a result and complete an Activity Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl activity complete` command completes an [Activity Execution](/concepts/what-is-an-activity-execution).

`tctl activity complete [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify the [Workflow Id](/concepts/what-is-a-workflow-id) of an [Activity Execution](/concepts/what-is-an-activity-execution) to complete.

Aliases: `--wid`, `-w`

**Example**

```bash
tctl activity complete --workflow_id <id>
```

### `--run_id`

Specify the [Run Id](/concepts/what-is-a-run-id) of an [Activity Execution](/concepts/what-is-an-activity-execution) to complete.

Aliases: `--rid`, `-r`

**Example**

```bash
tctl activity complete --run_id <id>
```

### `--activity_id`

Specify the [Activity Id](/concepts/what-is-an-activity-id) of an [Activity Execution](/concepts/what-is-an-activity-execution) to complete.

Alias: `--aid`

**Example**

```bash
tctl activity complete --activity_id <id>
```

### `--result`

Specify the result of an [Activity Execution](/concepts/what-is-an-activity-execution) when using tctl to complete the Activity Execution.

**Example**

```bash
tctl activity complete --result <value>
```

### `--identity`

Specify the identity of the operator when using tctl to complete an [Activity Execution](/concepts/what-is-an-activity-execution).

**Example**

```bash
tctl activity complete --identity <value>
```
