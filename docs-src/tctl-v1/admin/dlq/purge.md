---
id: purge
title: tctl admin dlq purge
sidebar_label: purge
description: Deleting DLQ messages.
tags:
  - tctl
  - admin
---

The `tctl admin dlq purge` command deletes DLQ messages that have a Task Id equal to or less than the provided Task Id.

Alias: `p`

#### --dlq_type

Alias: `--dt value`

The type of DLQ to manage.

Options: namespace, history

#### --cluster

Source cluster for the DLQ.

#### --shard_id

ShardId provided for the command.

#### --last_message_id

Identifies the last read message.

Default: 0
