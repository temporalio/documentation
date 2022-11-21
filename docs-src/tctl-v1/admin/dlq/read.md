---
id: read
title: tctl admin dlq read
sidebar_label: read
description: Reading DLQ messages.
tags:
  - tctl
  - admin
---

The `tctl admin dlq read` command reads out messages from the dead-letter queue (DLQ).

---

#### --dlq_type

The type of DLQ to manage.

Options: namespace, history

#### --cluster

Source cluster for the DLQ.

#### --shard_id

ShardId provided for the command.

#### --max_message_count

The maximum number of messages to fethc.

Default: 0

#### --last_message_id

Identifies the last read message.

Default: 0

#### --output_filename

Provides a file to write output to.

Output is written to stdout on default.
