---
id: describe
title: tctl workflow describe
sidebar_label: describe
description: How to show information about a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow describe` command shows information about a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

See also [`tctl workflow describeid`](/docs/tctl/workflow/describeid).

`tctl workflow describe [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow describe --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow describe --run_id <id>
```

### `--print_raw`

How to print properties exactly as they are stored.

Alias: `--praw`

**Example**

```
tctl workflow describe --run_id <id>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow describe --reset_points_only
```
