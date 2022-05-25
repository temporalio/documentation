---
id: how-to-upgrade-the-temporal-server-version
title: How to upgrade the Temporal Server version
sidebar_label: Upgrade Server
description: If a newer version of the Temporal Server is available, a notification appears in the Temporal Web UI.
tags:
  - how-to
---

If a newer version of the [Temporal Server](/concepts/what-is-the-temporal-server) is available, a notification appears in the Temporal Web UI.

:::info

If you are using a version that is older than 1.0.0, reach out to us at [community.temporal.io](http://community.temporal.io) to ask how to upgrade.

:::

First check to see if an upgrade to the database schema is required for the version you wish to upgrade to.
If a database schema upgrade is required, it will be called out directly in the [release notes](https://github.com/temporalio/temporal/releases).
Some releases require changes to the schema, and some do not.
We ensure that any consecutive versions are compatible in terms of database schema upgrades, features, and system behavior, however there is no guarantee that there is compatibility between _any_ 2 non-consecutive versions.

Use one of the upgrade tools to upgrade your database schema to be compatible with the Temporal Server version being upgraded to.

If you are using a schema tools version prior to 1.8.0, we strongly recommend _never_ using the "dryrun" (`-y`, or `--dryrun`) options in any of your schema update commands.
Using this option might lead to potential loss of data, as when using it will create a new database and drop your
existing one.
This flag was removed in the 1.8.0 release.

### Upgrade Cassandra schema

If you are using Cassandra for your Cluster's persistence, use the `temporal-cassandra-tool` to upgrade both the default and visibility schemas.

**Example default schema upgrade:**

```bash
temporal_v1.2.1 $ temporal-cassandra-tool \
   --tls \
   --tls-ca-file <...> \
   --user <cassandra-user> \
   --password <cassandra-password> \
   --endpoint <cassandra.example.com> \
   --keyspace temporal \
   --timeout 120 \
   update \
   --schema-dir ./schema/cassandra/temporal/versioned

```

**Example visibility schema upgrade:**

```bash
temporal_v1.2.1 $ temporal-cassandra-tool \
   --tls \
   --tls-ca-file <...> \
   --user <cassandra-user> \
   --password <cassandra-password> \
   --endpoint <cassandra.example.com> \
   --keyspace temporal_visibility \
   --timeout 120 \
   update \
   --schema-dir ./schema/cassandra/visibility/versioned

```

### Upgrade MySQL / PostgreSQL schema

If you are using MySQL or PostgreSQL use the `temporal-sql-tool`, which works similarly to the `temporal-cassandra-tool`.

Refer to this [Makefile](https://github.com/temporalio/temporal/blob/v1.4.1/Makefile#L367-L383) for context.

#### PostgreSQL

**Example default schema upgrade:**

```bash
./temporal-sql-tool \
	--tls \
	--tls-enable-host-verification \
	--tls-cert-file <path to your client cert> \
	--tls-key-file <path to your client key> \
	--tls-ca-file <path to your CA> \
	--ep localhost -p 5432 -u temporal -pw temporal --pl postgres --db temporal update-schema -d ./schema/postgresql/v96/temporal/versioned
```

**Example visibility schema upgrade:**

```bash
./temporal-sql-tool \
	--tls \
	--tls-enable-host-verification \
	--tls-cert-file <path to your client cert> \
	--tls-key-file <path to your client key> \
	--tls-ca-file <path to your CA> \
	--ep localhost -p 5432 -u temporal -pw temporal --pl postgres --db temporal_visibility update-schema -d ./schema/postgresql/v96/visibility/versioned
```

#### MySQL

**Example default schema upgrade:**

```bash
./temporal-sql-tool \
	--tls \
	--tls-enable-host-verification \
	--tls-cert-file <path to your client cert> \
	--tls-key-file <path to your client key> \
	--tls-ca-file <path to your CA> \
	--ep localhost -p 3036 -u root -pw root --pl mysql --db temporal update-schema -d ./schema/mysql/v57/temporal/versioned/
```

**Example visibility schema upgrade:**

```bash
./temporal-sql-tool \
	--tls \
	--tls-enable-host-verification \
	--tls-cert-file <path to your client cert> \
	--tls-key-file <path to your client key> \
	--tls-ca-file <path to your CA> \
	--ep localhost -p 3036 -u root -pw root --pl mysql --db temporal_visibility update-schema -d ./schema/mysql/v57/visibility/versioned/
```

### Roll-out technique

We recommend preparing a staging Cluster and then do the following to verify the upgrade is successful:

1. Create some simulation load on the staging cluster.
2. Upgrade the database schema in the staging cluster.
3. Wait and observe for a few minutes to verify that there is no unstable behavior from both the server and the simulation load logic.
4. Upgrade the server.
5. Now do the same to the live environment cluster.
