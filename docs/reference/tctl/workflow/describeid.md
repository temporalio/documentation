---
id: describeid
title: tctl workflow describeid
sidebar_label: describeid
description: How to show information about a Workflow Execution for a specified Workflow Id and optional Run Id using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow describeid` command shows information about a [Workflow Execution](/docs/content/what-is-a-workflow-execution) for the specified [Workflow Id](/docs/content/what-is-a-workflow-id) and optional [Run Id](/docs/content/what-is-a-run-id).

`tctl workflow describeid <workflow_id> [<run_id>] [<modifiers>]`

This command is a shortcut for `tctl workflow describe --workflow_id <workflowid> [--run_id <runid>]`.

The following modifiers control the behavior of the command.

### `--print_raw`

How to print properties exactly as they are stored.

Alias: `--praw`

**Example**

```
tctl workflow describeid <workflow_id> --run_id <id>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow describeid <workflow_id> --reset_points_only
```
