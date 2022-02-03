---
id: complete
title: tctl activity complete
sidebar_label: complete
description: How to provide a result and complete an Activity Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl activity complete` command completes an [Activity Execution](/docs/content/what-is-an-activity-execution).

`tctl activity complete [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify the [Workflow Id](/docs/content/what-is-a-workflow-id) of an [Activity Execution](/docs/content/what-is-an-activity-execution) to complete using tctl.

Aliases: `--wid`, `-w`

**Example**

```
tctl activity complete --workflow_id <id>
```

### `--run_id`

How to specify the [Run Id](/docs/content/what-is-a-run-id) of an [Activity Execution](/docs/content/what-is-an-activity-execution) to complete using tctl.

Aliases: `--rid`, `-r`

**Example**

```
tctl activity complete --run_id <id>
```

### `--activity_id`

How to specify the [Activity Id](/docs/content/what-is-an-activity-id) of an [Activity Execution](/docs/content/what-is-an-activity-execution) to complete using tctl.

Alias: `--aid`

**Example**

```
tctl activity complete --activity_id <id>
```

### `--result`

How to specify the result of an [Activity Execution](/docs/content/what-is-an-activity-execution) when using tctl to complete the Activity Execution.

**Example**

```
tctl activity complete --result <value>
```

### `--identity`

How to specify the identity of the operator when using tctl to complete an [Activity Execution](/docs/content/what-is-an-activity-execution).

**Example**

```
tctl activity complete --identity <value>
```
