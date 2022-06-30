---
id: describe
title: tctl workflow describe
sidebar_label: describe
description: How to show information about a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow describe` command shows information about a [Workflow Execution](/concepts/what-is-a-workflow-execution).

See also [`tctl workflow describeid`](/tctl/workflow/describeid).

`tctl workflow describe [<modifiers>]`

Alias: `d`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow describe --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```bash
tctl workflow describe --run_id <id>
```

### `--print_raw`

Print properties exactly as they are stored.

Alias: `--praw`

**Example**

```bash
tctl workflow describe --run_id <id>
```

### `--reset_points_only`

Show only events that are eligible for reset.

**Example**

```bash
tctl workflow describe --reset_points_only
```
