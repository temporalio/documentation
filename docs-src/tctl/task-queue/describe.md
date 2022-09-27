---
id: describe
title: tctl taskqueue describe
sidebar_label: describe
description: How to describe the poller information of a Task Queue using tctl.
tags:
  - tctl
---

Alias: `desc`

The `tctl taskqueue describe` command describes the poller information of a [Task Queue](/concepts/what-is-a-task-queue).

`tctl taskqueue describe <modifiers>`

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--fields](/tctl/modifiers/fields)
- [--namespace](/tctl/modifiers/namespace)
- [--output](/tctl/modifiers/output)

<!--TaskQueue-->

import TaskQueue from '../../tctl/modifiers/task-queue.md'

<TaskQueue />

<!--TaskQueueType-->

import TQT from '../../tctl/modifiers/task-queue-type.md'

<TQT />

<!--TimeFormat-->

import TimeFormat from '../../tctl/modifiers/time-format.md'

<TimeFormat />
