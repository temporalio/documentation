---
id: describe
title: temporal task-queue describe
sidebar_label: describe
description: Describes the Workers that have recently polled on this Task Queue.
tags:
  - cli
---

The `temporal task-queue describe` command provides [poller](/dev-guide/worker-performance#poller-count) information for a given [Task Queue](/concepts/what-is-a-task-queue).

The [Server](/concepts/what-is-the-temporal-server) records the last time of each poll request.
Should `LastAccessTime` exceeds one minute, it's likely that the Worker is at capacity (all Workflow and Activity slots are full) or that the Worker has shut down.
[Workers](/concepts/what-is-a-worker) are removed if 5 minutes have passed since the last poll request.

With this command, information about the Task Queue can be returned to troubleshoot server issues.

`temporal task-queue describe --task-queue=MyTaskQueue --task-queue-type="activity"`

Use the options listed below to modify what this command returns.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--task-queue](/cli/cmd-options/task-queue)

- [--task-queue-type](/cli/cmd-options/task-queue-type)

- [--time-format](/cli/cmd-options/time-format)
