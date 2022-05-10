---
id: describe-task
title: tctl admin shard describe-task
description: displaying information on a Task within a shard
tags:
  - reference
  - tctl
  - admin
  - shard
---

The `tctl admin shard describe-task` command describes a specified Task's Task Id, Task type, shard Id, and task visibility timestamp.

Alias: `-dt`

## Modifiers

The modifiers below control the output and behavior of the command. Enter all modifiers after the command as such:

`tctl admin shard describe-task [<modifiers>]`

### `--db-engine value`

The type of database (DB) engine for the shard to use.

Default: "cassandra"
Values: "cassandra", "mysql", "postgres"

<!-- todo: examples -->

### `--db-address value`

Persistence address for the database.

Default: 127.0.0.1

### `--db-port value`

Persistence port for the database.

Default: 9042

### `--username value`

Username entered into the database.

### `--password value`

Password entered into the database.

### `--keyspace value`

Keyspace for the database.

default: "temporal"

### `--tls`

Enables TLS over the database connection.

### `--tls-cert-path value`

DB tls client cert path.

Note: tls must be enabled

### `--tls-key-path value`

DB tls client key path

Note: tls must be enabled

### `--tls-ca-path value`

DB tls client ca path

Note: tls must be enabled

### `--tls-server-name value`

DB tls server name

Note: tls must be enabled

### `--tls-disable-host-verification`

DB tls verify hostname and server cert

Note: tls must be enabled

### `--shard-id value`

Identifies the specified shard.

Default: 0

### `--task-id value`

Describes the task.

Default: 0

### `--task-type value`

The kind of Task that is targeted within a shard.

Default: transfer
Values: transfer, timer, replication

### `--task-timestamp value`

Task visibility timestamp in nanoseconds

Default: 0

### `--target-cluster value`

Temporal cluster for the shard to use.

Default: "active"
