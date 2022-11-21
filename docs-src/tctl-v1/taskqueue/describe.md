---
id: describe
title: tctl taskqueue describe
sidebar_label: describe
description: How to describe the poller information of a Task Queue using tctl.
tags:
  - tctl
---

The `tctl taskqueue describe` command describes the poller information of a [Task Queue](/concepts/what-is-a-task-queue).

`tctl taskqueue describe <modifiers> <value>`

The following modifiers control the behavior of the command.

### `--taskqueue`

_Required modifier_

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--t`

**Example**

```bash
tctl taskqueue describe --taskqueue <value>
```

### `--taskqueuetype`

Specify the type of a [Task Queue](/concepts/what-is-a-task-queue).
The type can be `workflow` or `activity`.
The default is `workflow`.

**Example**

```bash
tctl taskqueue describe --taskqueue <value> --taskqueuetype <type>
```
