---
id: versions-and-dependencies
title: Temporal Server versions and dependencies
sidebar_label: Versions & dependencies
---

## Overview

This page details some of the version specific requirements and dependencies needed to build and run an instance of Temporal.

If you are just running the Go binary, Go is not required.

But if you are building Temporal or running it from source, [Go v1.16+ is required](https://github.com/temporalio/temporal/blob/master/CONTRIBUTING.md).

## Server versioning and support policy

- All Temporal Server releases abide by the [Semantic Versioning Specification](https://semver.org/).
- Fairly precise upgrade paths and support have been established starting from Temporal `v1.7.0`.
- We provide maintenance support for previously published minor and major versions by continuing to release critical bug fixes related to security, the prevention of data loss, and reliability, whenever they are found.

**Temporal Server OSS**

- We aim to publish incremental upgrade guides for each minor and major version, which will include specifics around dependency upgrades that we have tested for (e.g. Cassandra 3.0 -> 3.11).
- We will offer maintenance support of the last 3 **minor** versions after a release, and do not plan to "backport" patches beyond that.
- We will offer maintenance support of **major** versions for at least 12 months after a GA release, and provide at least 6 months' notice before EOL/deprecating support.

**Temporal Cloud**

> Interested in a Temporal as a service? [Sign up for Temporal Cloud and join our monthly events](https://docs.temporal.io/#cloud)!

- All customers will automatically be upgraded to the latest minor version.
- Maintenance support, for major versions, will be provided for at least 18 months after a GA release, and there will be at least 6 months' notice before EOL/deprecating support.

This versioning policy is intended to serve as a minimum set of guidelines for customers who rely on us for their critical business operations. If you have any further questions, please do not hesitate to reach out via community or customer channels.

## Dependencies

Temporal offers official support for, and is tested against, dependencies with the exact versions described in the `go.mod` file of corresponding release tag (Example, [v1.5.1](https://github.com/temporalio/temporal/tree/v1.5.1) dependencies are documented in [the go.mod for v1.5.1](https://github.com/temporalio/temporal/blob/v1.5.1/go.mod)).

### Persistence

The only required Temporal Server dependency is a database, and there are multiple types of databases that are supported.
Temporal tests compatibility by spanning the **minimum** and **maximum** stable non-EOL major versions for each supported database.
As of time of writing, these specific versions used in our test pipelines and actively tested before we release any version of Temporal:

- **Cassandra v3.11 and v4.0**
- **PostgreSQL v10.18 and v13.4**
- **MySQL v5.7 and v8.0** (specifically 8.0.19+ due to a bug)

We will update these support ranges once a year and the release notes of each Temporal Server will declare when we plan to drop support for database versions reaching End of Life.
Since Temporal Server primarily relies on core database functionality, we do not expect compatibility to break often.

- We only rely on core database features, so compatibility should not break often. Temporal has no opinions on database upgrade paths; as long as you can upgrade your database according to each project's specifications, Temporal should work with any version within supported ranges.
- We do not run tests with vendors like Vitess and CockroachDB, so you rely on their compatibility claims if you use them. Please feel free to discuss them with fellow users [in our forum](https://community.temporal.io/).
- Temporal is [working on official SQLite v3.x persistence](https://github.com/temporalio/temporal/pulls?q=is%3Apr+sort%3Aupdated-desc+sqlite), but this is only meant for development and testing, not production usage.

### Workflow search

Temporal has built-in Workflow search functionality.
To enhance this feature, Temporal supports an [integration with Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).

- Elasticsearch v7.10 is supported from Temporal version 1.7.0 onwards
- Elasticsearch v6.8 is supported in all Temporal versions
- Both versions are explicitly supported with AWS Elasticsearch

### Monitoring & observation

Temporal emits metrics by default in a format that is supported by Prometheus. Monitoring and observing those metrics is optional. Any software that can pull metrics that supports the same format could be used, but we only ensure it works with Prometheus and Grafana versions.

- **Prometheus >= v2.0**
- **Grafana >= v2.5**

## Upgrading your version of Temporal

If a newer version of Temporal is available, a notification appears in the Temporal Web UI.

To use a more recent version of Temporal, first [check to see](https://github.com/temporalio/temporal/releases) if an upgrade to the database schema is required. Newer binaries can not run with older database schemas. Some releases require changes to the schema, and some do not. If you are using a version that is older than 1.0.0, reach out to us at [community.temporal.io](http://community.temporal.io) to ask how to upgrade.

We ensure that any consecutive versions are compatible in terms of database schema upgrades, features, and system behavior, however there is no guarantee that there is compatibility between _any_ 2 non-consecutive versions. Please reach out to us or check the forums at [community.temporal.io](http://community.temporal.io) for more information.

If you are using a schema tools version prior to 1.8.0, we strongly recommend _never_ using the "dryrun" (`-y`, or `--dryrun`) options in any of your schema update commands.
Using this option might lead to potential loss of data, as when using it will create a new database and drop your
existing one. This flag was removed in the 1.8.0 release.

### Upgrading Cassandra schema

You can use the `temporal-cassandra-tool` to upgrade both the default and visibility schemas for your Cassandra DB:

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

### Upgrading MySQL / PostgreSQL schema

Use the `temporal-sql-tool`, which works similarly to the `temporal-cassandra-tool`.

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

### Managing cluster

We recommend preparing a staging cluster and then do the following to verify the upgrade is successful:

1. Create some simulation load on the staging cluster.
2. Upgrade the database schema in the staging cluster.
3. Wait and observe for a few minutes to verify that there is no unstable behavior from both the server and the simulation load logic.
4. Upgrade the server.
5. Now do the same to the live environment cluster.
