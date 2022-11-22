---
id: describe
title: tctl workflow describe
sidebar_label: describe
description: How to show information about a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow describe` command shows information about a [Workflow Execution](/concepts/what-is-a-workflow-execution).
This information can be used to locate a failed Workflow Execution, for example.

To find a Workflow with a given Run Id, refer to [`tctl workflow describeid`](/tctl-v1/workflow/describeid).

`tctl workflow describe <modifiers>`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

### `--workflow_id`

**This is a required modifier.**

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `-w`

**Example**

```bash
tctl workflow describe --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).
If a Run Id is not provided, the command will show the latest Workflow Execution of that Workflow Id.

Alias: `-r`

**Example**

```bash
tctl workflow describe --run_id <id>
```

### `--print_raw`

Print properties exactly as they are stored.

**Example**

```bash
tctl workflow describe --print_raw
```

### `--reset_points_only`

Show only events that are eligible for reset.
If successful, the command returns the Run Id of all deployments, and the times at which the Events were created.

**Example**

```bash
tctl workflow describe --reset_points_only
```
