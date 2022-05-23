---
id: list-partition
title: tctl task-queue list-partition
sidebar_label: list-partition
description: How to list Task Queue partitions and the hostname for partitions using tctl.
tags:
  - reference
  - tctl
---

The `tctl task-queue list-partition` command lists the partitions of a [Task Queue](/concepts/what-is-a-task-queue) and the hostname for the partitions.

`tctl task-queue list-partition --task-queue <value>`

The following modifier controls the behavior of the command.

### `task-queue`

_Required modifier_

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl task-queue list-partition --task-queue <value>
```
