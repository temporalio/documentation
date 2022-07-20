---
id: read
title: tctl admin dlq read
sidebar_label: read
description: Reading DLQ messages.
tags:
  - reference
  - tctl
  - admin
---

The `tctl admin dlq read` command reads out messages from the dead-letter queue (DLQ).

---

## Modifiers

#### `--dlq_type value`

Alias: `--dt value`

The type of DLQ to manage.

Options: namespace, history

#### `--cluster value`

Source cluster for the DLQ.

#### `--shard_id value`

ShardId provided for the command.

#### `--max_message_count value`

The maximum number of messages to fethc.

Default: 0

#### `--last_message_id value`

Identifies the last read message.

Default: 0

#### `--output_filename value`

Provides a file to write output to.

Output is written to stdout on default.
