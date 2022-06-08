---
id: describe_task
title: tctl admin shard describe_task
sidebar_label: describe_task
description: displaying information on a Task within a shard
tags:
  - reference
  - tctl
  - admin
  - shard
---

The `tctl admin shard describe_task` command describes a specified Task's Task Id, Task type, shard Id, and task visibility timestamp.

Alias: `-dt`

## Modifiers

The modifiers below control the output and behavior of the command. Enter all modifiers after the command as such:

`tctl admin shard describe_task [<modifiers>]`

#### `--db_engine value`

The type of database (DB) engine for the shard to use.

Default: "cassandra"

Values: "cassandra", "mysql", "postgres"

<!-- todo: examples -->

#### `--db_address value`

Persistence address for the database.

Default: 127.0.0.1

#### `--db_port value`

Persistence port for the database.

Default: 9042

#### `--username value`

Username entered into the database.

#### `--password value`

Password entered into the database.

#### `--keyspace value`

Keyspace for the database.

default: "temporal"

#### `--tls`

Enables TLS over the database connection.

#### `--tls_cert_path value`

DB tls client cert path.

Note: tls must be enabled

#### `--tls_server_name value`

DB tls server name

Note: tls must be enabled

#### `--tls_disable_host_verification`

DB tls verify hostname and server cert

Note: tls must be enabled

#### `--shard_id value`

Identifies the specified shard.

Default: 0

#### `--task_id value`

Describes the task.

Default: 0

#### `--task_type value`

The kind of Task that is targeted within a shard.

Default: transfer

Values: transfer, timer, replication

#### `--task_timestamp value`

Task visibility timestamp in nanoseconds

Default: 0

#### `--target_cluster value`

Temporal cluster for the shard to use.

Default: "active"
