---
id: clean
title: tctl admin db clean
sidebar_label: clean
description: How to clean up corrupted Workflows using tctl.
tags:
  - reference
  - tctl
  - admin
  - db
---

The `tctl admin db clean` command cleans corrupted [Workflow Executions](/workflows/#workflow-executions) from the targeted database.

### Modifiers

The modifiers below change the behavior of the command.

#### `--db_engine value`

Type of DB engine to use

Default: `cassandra`
Value: `cassandra` | `mysql` | `postgres`

#### `--db_address value`

Persistence address for the database.

Default: 127.0.0.1

#### `--db_port value`

Persistence port for the DB.

Default: 9042

#### `--username value`

Database username.

#### `--password value`

Database password.

#### `--keyspace value`

Database keyspace

Default: "temporal"

#### `--input_directory value`

The directory which contains the corrupted [Workflow Execution](/workflows/#workflow-executions) files from running [`scan`](/tctl/admin/db/scan).

#### `--lower_shard_bound value`

The minimum amount (inclusive) of corrupt shards to handle.

Default: 0

#### `--upper_shard_bound value`

The maximum amount (exclusive) of corrupt shards to handle.

Default: 16384

#### `--starting_rps value`

starting rps of database queries.

Default: 100

#### `--rps value`

Target rps of database queries.

Default: 7000

#### `--concurrency value`

Number of threads to handle a scan.

Default: 1000

#### `--report_rate value`

The number of shards handled between each emittance of progress.

Default: 10

::: note
Enable `--tls` before using any of the modifiers below.
:::

#### `--tls_cert_path value`

Where the tls client cert is located.

#### `--tls_key_path value`

Where the tls key is located.

#### `--tls_ca_path value`

Where the tls ca is located.

#### `--tls_server_name value`

The name of the Db tls server.

#### `--tls_disable_host_verification`

Disables verification of the DB tls hostname and server cert.
