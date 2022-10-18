---
id: scan
title: tctl admin db scan
sidebar_label: scan
description: Scanning for corrupted executions in a database
tags:
  - tctl
  - admin
  - db
---

The `tctl admin db scan` command scans concrete Workflow Executions in a given database, and detects corrupted ones.

#### --db_engine

Type of DB engine to use

Default: `cassandra`
Value: `cassandra` | `mysql` | `postgres`

#### --db_address

Persistence address for the DB.

Default: 127.0.0.1

#### --db_port

Persistence port for the DB.

Default: 9042

#### --username

DB username.

#### --password

DB password.

#### --keyspace

DB keyspace

Default: "temporal"

#### --lower_shard_bound value

The minimum amount (inclusive) of corrupt shards to handle.

Default: 0

#### --upper_shard_bound

The maximum amount (exclusive) of corrupt shards to handle.

Default: 16384

#### --starting_rps

starting rps of database queries.

Default: 100

#### --rps value

Target rps of database queries.

Default: 7000

#### --pagesize

The size of the page used to query database executions.

Default: 500

#### --concurrency

Number of threads to handle a scan.

Default: 1000

#### --report_rate

The number of shards handled between each emittance of progress.

Default: 10

#### --tls

Enable TLS over the DB connection.

:::note

Enable `--tls` before using any of the following modifiers.

:::

#### --tls_cert_path

Where the tls client cert is located.

#### --tls_key_path

Where the tls key is located.

#### --tls_ca_path

Where the tls ca is located.

#### --tls_server_name

The name of the Db tls server.

#### --tls_disable_host_verification

Disables verification of the DB tls hostname and server cert.
