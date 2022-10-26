---
id: list_tasks
title: tctl admin shard list_tasks
sidebar_label: list_tasks
description: listing tasks for a given shard Id and Task type
tags:
  - tctl
  - admin
  - shard
---

The `tctl admin shard list_tasks` command will list the Tasks available for a given shard Id and Task type.

The modifiers below affect the output and behavior of the command.

#### `--more`

Alias: `-m`

Lists more pages of list tasks.
The default setting is to list one page of 10 list tasks.

#### `--pagesize value`

Alias: `--ps value`

The size of the result page.
Default: 10

#### `--target_cluster value`

Temporal cluster to use.
Default: "active"

#### `--shard_id value`

The ID of the shard

Default: 0

#### `--task_type value`

The type of Task.

Default: transfer
Values: transfer, timer, replication, visibility

#### `--min_visibility_ts value`

The minimum value that can be set as a Task Visibility timestamp.

Supported formats include:

- '2006-01-02T15:04:05+07:00'
- Raw UnixNano
- Time range (N-duration), where 0 < N < 1000000 and duration (full-notation/short-notation) can be:
  - second/s
  - minute/m
  - week/w
  - month/m
  - year/y

#### `--max_visibility_ts value`

The maximum value that can be set as a Task Visibility timestamp.

Supported formats:

- '2006-01-02T15:04:05+07:00'
- Raw UnixNano
- Time range (N-duration), where 0 < N < 1000000 and duration (full-notation/short-notation) can be:
  - second/s
  - minute/m
  - week/w
  - month/m
  - year/y
