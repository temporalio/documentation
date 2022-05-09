---
id: list_tasks
title: tctl admin shard list_tasks
description: listing tasks for a given shard Id and Task type
tags:
  - reference
  - tctl
  - admin
  - shard
---

The `tctl admin shard list_tasks` command will list the Tasks available for a given shard Id and Task type.

#### Modifiers
The modifiers below affect the output and behavior of the command.

### `--more`
Alias: `-m`

Lists more pages of list tasks.
The default setting is to list one page of 10 list tasks.

### `--pagesize value`
Alias: `--ps value`  

The size of the result page.
Default: 10

### `--target_cluster value`
Temporal cluster to use.
Default: "active"

### `--shard_id value`             
The ID of the shard 

Default: 0

### `--task_type value`
The type of Task.

Default: transfer
Values: transfer, timer, replication, visibility

### `--min_visibility_ts value`
      Task visibility min timestamp. Supported formats are '2006-01-02T15:04:05+07:00', raw UnixNano and time range (N<duration>), where 0 < N < 1000000 and duration (full-notation/short-notation) can be second/s, minute/m, hour/h, day/d, week/w, month/M or year/y. For example, '15minute' or '15m' implies last 15 minutes. (default: "2020-01-01T00:00:00+00:00")
### `--max_visibility_ts value`     
Task visibility max timestamp. Supported formats are '2006-01-02T15:04:05+07:00', raw UnixNano and time range (N<duration>), where 0 < N < 1000000 and duration (full-notation/short-notation) can be second/s, minute/m, hour/h, day/d, week/w, month/M or year/y. For example, '15minute' or '15m' implies last 15 minutes. (default: "2035-01-01T00:00:00+00:00")