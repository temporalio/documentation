---
id: merge
title: tctl admin dlq merge
sidebar_label: merge
description: Merging DLQ messages.
tags:
  - tctl
  - admin
---

The `tctl admib dlq merge` command allows dead-letter queue (DLQ) messages to be merged.

The messages must have TaskIds with an equal or lesser value than the given TaskId.

Alias: `m`

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
