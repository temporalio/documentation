---
id: scan
title: tctl admin db scan
description: Scanning for corrupted executions in a database
tags:
  - reference
  - tctl
  - admin
  - db
---

The `tctl admin db scan` command scans concrete executions in a given database, and detects corrupted executions.

### Modifiers

#### `--db_engine value`
Type of DB engine to use

Default: cassandra
Value: cassandra, mysql, postgres

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

#### `--tls`
Enable TLS over the DB connection.

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

#### `--lower_shard_bound value`

#### `--upper_shard_bound value`

#### `--starting_rps value`
starting rps of database queries.

#### `--rps value`

#### `--pagesize value`

#### `--concurrency value`

#### `--report_rate value`