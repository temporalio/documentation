---
id: describe
title: tctl task-queue describe
sidebar_label: describe
description: How to describe the poller information of a Task Queue using tctl.
tags:
  - reference
  - tctl
---

The `tctl task-queue describe` command describes the poller information of a [Task Queue](/docs/concepts/what-is-a-task-queue).

`tctl task-queue describe --task-queue <value> [<modifiers>]`

Alias: `d`

The following modifiers control the behavior of the command.

### `--task-queue`

_Required modifier_

Specify a [Task Queue](/docs/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl task-queue describe --task-queue <value>
```

### `--task-queue-type`

Specify the type of a [Task Queue](/docs/concepts/what-is-a-task-queue).
The type can be `workflow` or `activity`.
The default is `workflow`.

Alias: `--tqt`

**Example**

```bash
tctl task-queue describe --task-queue <value> --task-queue-type <type>
```
