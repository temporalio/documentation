---
id: scan
title: tctl admin db scan
sidebar_label: scan
description: Scanning for corrupted executions in a database
tags:
  - reference
  - tctl
  - admin
  - db
---

The `tctl admin db scan` command scans concrete Workflow Executions in a given database, and detects corrupted ones.

### Modifiers

#### `--db_engine value`

Type of DB engine to use

Default: `cassandra`
Value: `cassandra` | `mysql` | `postgres`

#### `--db_address value`

Persistence address for the DB.

Default: 127.0.0.1

#### `--db_port value`

Persistence port for the DB.

Default: 9042

#### `--username value`

DB username.

#### `--password value`

DB password.

#### `--keyspace value`

DB keyspace

Default: "temporal"

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

#### `--pagesize value`

The size of the page used to query database executions.

Default: 500

#### `--concurrency value`

Number of threads to handle a scan.

Default: 1000

#### `--report_rate value`

The number of shards handled between each emittance of progress.

Default: 10

#### `--tls`

Enable TLS over the DB connection.

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
