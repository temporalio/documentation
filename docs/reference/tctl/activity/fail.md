---
id: fail
title: tctl activity fail
description: How to fail an Activity Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl activity fail` command fails an [Activity Execution](/docs/content/what-is-an-activity-execution).

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify the [Workflow Id](/docs/content/what-is-a-workflow-id) of an [Activity Execution](/docs/content/what-is-an-activity-execution) to fail using tctl.

Aliases: `--wid`, `-w`

**Example**

```
tctl activity fail --workflow_id <id>
```

### `--run_id`

How to specify the [Run Id](/docs/content/what-is-a-run-id) of an [Activity Execution](/docs/content/what-is-an-activity-execution) to fail using tctl.

Aliases: `--rid`, `-r`

**Example**

```
tctl activity fail --run_id <id>
```

### `--activity_id`

How to specify the [Activity Id](/docs/content/what-is-an-activity-id) of an [Activity Execution](/docs/content/what-is-an-activity-execution) to fail using tctl.

Alias: `--aid`

**Example**

```
tctl activity fail --activity_id <id>
```

### `--reason`

How to specify the reason for failing an [Activity Execution](/docs/content/what-is-an-activity-execution) when using tctl.

**Example**

```
tctl activity fail --reason <value>
```

### `--detail`

How to specify details of the reason for failing an [Activity Execution](/docs/content/what-is-an-activity-execution) when using tctl.

**Example**

```
tctl activity fail --detail <value>
```

### `--identity`

How to specify the identity of the operator when using tctl to fail an [Activity Execution](/docs/content/what-is-an-activity-execution).

**Example**

```
tctl activity complete --identity <value>
```

## Related

- [`tctl activity`](../activity)
- [tctl reference](/docs/reference/tctl)
