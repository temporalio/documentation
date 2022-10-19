---
id: clean
title: tctl admin db clean
sidebar_label: clean
description: How to clean up corrupted Workflows using tctl.
tags:
  - tctl
  - admin
  - db
---

The `tctl admin db clean` command cleans corrupted [Workflow Executions](/workflows/#workflow-executions) from the targeted database.

The modifiers below change the behavior of the command.

#### --db_engine

Type of DB engine to use

Default: `cassandra`
Value: `cassandra` | `mysql` | `postgres`

#### --db_address

Persistence address for the database.

Default: 127.0.0.1

#### --db_port

Persistence port for the DB.

Default: 9042

#### --username

Database username.

#### --password

Database password.

#### --keyspace

Database keyspace

Default: "temporal"

#### --input_directory

The directory which contains the corrupted [Workflow Execution](/workflows/#workflow-executions) files from running [`scan`](/tctl-v1/admin/db/scan).

#### --lower_shard_bound

The minimum amount (inclusive) of corrupt shards to handle.

Default: 0

#### --upper_shard_bound

The maximum amount (exclusive) of corrupt shards to handle.

Default: 16384

#### --starting_rps

starting rps of database queries.

Default: 100

#### --rps

Target rps of database queries.

Default: 7000

#### --concurrency

Number of threads to handle a scan.

Default: 1000

#### --report_rate

The number of shards handled between each emittance of progress.

Default: 10

:::note

Enable `--tls` before using any of the following modifiers.

:::

#### --tls_cert_path

Where the tls client cert is located.

#### --tls_key_path

Where the tls key is located.

#### --tls_ca_pat

Where the tls ca is located.

#### --tls_server_name

The name of the Db tls server.

#### --tls_disable_host_verification

Disables verification of the DB tls hostname and server cert.
