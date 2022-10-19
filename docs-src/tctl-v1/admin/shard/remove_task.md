---
id: remove_task
title: tctl admin shard remove_task
sidebar_label: remove_task
description: removing a Task with given information
tags:
  - tctl
  - admin
  - shard
---

The `tctl admin shard remove_task` command removes a Task from the shard.

`tctl admin shard remove_task [command options] [arguments...]`

The Task removed must have values that matches what is given in the command line.

Alias: `rmtk`

The modifiers below change the behavior of the command.

#### `--shard_id value`

The shardId for the Task to be removed.

Default: 0

#### `--task_id value`

The taskId for the Task to be removed.

Default: 0

#### `--task_type value`

The type of Task to remove.

Default: transfer

Values: transfer, timer, replication

#### `--task_timestamp value`

The task visibility timestamp, given in nanoseconds.

Default: 0
