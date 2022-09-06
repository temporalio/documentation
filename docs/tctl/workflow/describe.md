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
This information can be used to locate a failed Workflow Execution, for example.

To find a Workflow with a given Run Id, refer to [`tctl workflow describeid`](/tctl/workflow/describeid).

`tctl workflow describe <modifiers>`

Alias: `d`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

### `--raw`

Print properties exactly as they are stored.

**Example**

```bash
tctl workflow describe --run-id <id>
```

### `--reset-points-only`

Show only events that are eligible for reset.

**Example**

```bash
tctl workflow describe --reset-points-only
```

### `--run-id`

Specify a [Run Id](/concepts/what-is-a-run-id).
If a Run Id is not provided, the command shows the latest Workflow Execution of that Workflow Id.

Alias: `--rid`

**Example**

```bash
tctl workflow describe --run-id <value>
```

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow describe --workflow-id <value>
```
