---
id: merge
title: tctl admin dlq merge
sidebar_label: merge
description: Merging DLQ messages.
tags:
  - reference
  - tctl
  - admin
---

The `tctl admib dlq merge` command allows dead-letter queue (DLQ) messages to be merged.

The messages must have TaskIds with an equal or lesser value than the given TaskId.

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
