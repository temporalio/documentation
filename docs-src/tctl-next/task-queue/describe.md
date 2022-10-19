---
id: describe
title: tctl task-queue describe
sidebar_label: describe
description: How to describe the Workers that have recently polled on a Task Queue using tctl.
tags:
  - tctl
---

Alias: `desc`

The `tctl task-queue describe` command describes the poller information of a [Task Queue](/concepts/what-is-a-task-queue).

`tctl task-queue describe <modifiers>`

The Server records the last time a Worker sent a poll request.
Poll requests can last up to a minute, so a `LastAccessTime` less than a minute ago is normal.
If it's over a minute ago, then likely either the Worker is at capacity (all Workflow and Activity slots are full) or it has shut down.
Once it has been 5 minutes since the last poll request, the Worker will no longer appear on the list.

The following modifiers are supported and control the behavior of the command.
`--task-queue` is required.

- [--fields](/tctl-next/modifiers#--fields)
- [--namespace](/tctl-next/modifiers#--namespace)
- [--output](/tctl-next/modifiers#--output)
- [--task-queue](/tctl-next/modifiers#--task-queue)
- [--task-queue-type](/tctl-next/modifiers#--task-queue-type)
- [--time-format](/tctl-next/modifiers#--time-format)
