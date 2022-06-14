---
id: delete
title: tctl admin workflow delete
sidebar_label: delete
description: Deleting the Workflow Execution.
tags:
  - reference
  - tctl
  - admin
  - workflow
---

Alias: `del`

The `tctl admin workflow delete` command deletes the current [Workflow Execution](/workflows/#workflow-execution) and the mutableState record.

## Modifiers

#### `--db_engine value`

The type of database (DB) engine to use.

Default: "cassandra"
Values: "cassandra", "mysql", "postgres"

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

#### `--url value`

URL of the Elasticsearch cluster.

Default: "http://127.0.0.1:9200"

#### `--es-username value`

Username for the Elasticsearch cluster.

#### `--es-password value`

Password for the Elasticsearch cluster.

#### `--version value`

The version of the Elasticsearch cluster for the Workflow.

Default: v7

Values: v6, v7

#### `--index value`

Elasticsearch index name.

#### `--workflow_id value`

Aliases: `--wid value`, `-w value`

The Id of the current Workflow.

#### `--run_id value`

Aliases: `--rid value`, `-r value`

The Id of the current run.

#### `--skip_errors`

Alias: `--serr`

Skip any errors that occur in the Workflow Execution.

#### `--tls`

Enables TLS over the database connection.

::: note

TLS must be enabled to use the modifiers below

:::

#### `--tls_cert_path value`

DB tls client cert path.

Note: tls must be enabled

#### `--tls_key_path value`

DB tls client key path

Note: tls must be enabled

#### `--tls_ca_path value`

DB tls client ca path

Note: tls must be enabled

#### `--tls_server_name value`

DB tls server name

Note: tls must be enabled

#### `--tls_disable_host_verification`

DB tls verify hostname and server cert

Note: tls must be enabled
