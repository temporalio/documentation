---
id: describe
title: tctl taskqueue describe
sidebar_label: describe
description: How to describe the poller information of a Task Queue using tctl.
tags:
  - reference
  - tctl
---

The `tctl taskqueue describe` command describes the poller information of a [Task Queue](/docs/concepts/what-is-a-task-queue).

`tctl taskqueue describe --taskqueue <value> [<modifiers>]`

The following modifiers control the behavior of the command.

### `--taskqueue`

_Required modifier_

How to specify the description of the [Task Queue](/docs/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```
tctl taskqueue describe --taskqueue <value>
```

### `--taskqueuetype`

How to specify the type of the [Task Queue](/docs/concepts/what-is-a-task-queue). The type can be `workflow` or `activity`. The default is `workflow`.

Alias: `--tqt`

**Example**

```
tctl taskqueue describe --taskqueue <value> --taskqueuetype <type>
```
