---
id: purge
title: tctl admin dlq purge
sidebar_label: purge
description: Deleting DLQ messages.
tags:
  - reference
  - tctl
  - admin
---

The `tctl admin dlq purge` command deletes DLQ messages that have a Task Id equal to or less than the provided Task Id.

## Modifiers

#### `--dlq_type value`

Alias: `--dt value`

The type of DLQ to manage.

Options: namespace, history

#### `--cluster value`

Source cluster for the DLQ.

#### `--shard_id value`

ShardId provided for the command.

#### `--last_message_id value`

Identifies the last read message.

Default: 0
