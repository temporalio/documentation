---
id: server-dependencies
title: Temporal server dependencies
sidebar_label: Dependencies
---

## Overview

This page details some of the requirements and dependencies needed to build and run an instance of Temporal.

All versions of Temporal require the following:

1. [Go 1.15+](https://golang.org/dl/)
2. [Go package dependencies](https://github.com/temporalio/temporal/blob/master/go.mod)

## Dependency matrix

The following table shows which versions of dependencies are supported with a specific version of Temporal.

Note that the only required dependency is a database, and there are multiple types of databases that are supported. Search is an optional feature and currently only ElasticSearch is supported. Event streaming software as a dependency is only required when ElasticSearch is being used or when Temporal is deployed across multiple data centers, however in future releases of Temporal, third party event streaming software will likely cease to be needed as dependency for both. Temporal emits metrics by default in a format that is supported by Prometheus. Monitoring and observing those metrics is optional. Any software that can pull metrics that supports the same format could be used, but we only ensure it works with Prometheus and Grafana versions.

Legend of tested and supported dependency versions:

- 🟩 &nbsp;**Cassandra v3.11**
- 🟪 &nbsp;**MySQL v5.7**
- 🟧 &nbsp;**PostgreSQL v9.6**
- 🟥 &nbsp;**ElasticSearch v6.8**
- 🟦 &nbsp;**Prometheus >= v2.0**
- 🟨 &nbsp;**Grafana >= v2.5**
- 🟫 &nbsp;**Kafka v2.1.1 & Zookeeper v3.4.6**


| Temporal version | Databases | Search | Event streaming | Monitoring | Observation |
|------------------|-----------|--------|-----------------|------------|-------------|
| 1.3.2            | 🟩 🟪 🟧 | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.3.1            | 🟩 🟪 🟧 | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.3.0            | 🟩 🟪 🟧 | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.2.2            | 🟩 🟪 🟧 | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.2.1            | 🟩 🟪 🟧 | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.1.1            | 🟩 🟪    | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.1.0            | 🟩 🟪    | 🟥     | 🟫              | 🟦        | 🟨          |
| 1.0.0            | 🟩 🟪    | 🟥     | 🟫              | 🟦        | 🟨          |

## How to use a different Temporal release version

To use a more recent version of Temporal, first [check to see](https://github.com/temporalio/temporal/releases) if an upgrade to the database schema is required. Newer binaries can not run with older database schemas. Some releases require changes to the schema, and some do not. If you are using a version that is older than 1.0.0, reach out to us at [community.temporal.io](http://community.temporal.io) to ask how to upgrade.

If you wish to use an older version of Temporal, you do not need to make schema changes as older binaries can operate with newer schemas. Note: we do not recommend using any version older than v1.0.0.

We ensure that any consecutive versions are compatible in terms of database schema upgrades, however there is no guarantee that schema changes between *any* 2 non-consecutive versions are compatible. Please reach out to us or check the forums at [community.temporal.io](http://community.temporal.io) for more information.

### Upgrade Cassandra schema

You can use the `temporal-cassandra-tool` to upgrade both the default and visibility schemas for your Cassandra DB:

**Example default schema upgrade:**

```
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

```
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

Use the `temporal-sql-tool`, which works similarly to the `temporal-cassandra-tool`.

Refer to this [Makefile](https://github.com/temporalio/temporal/blob/v1.3.2/Makefile#L367-L383) for context.

### Cluster Management

We recommend preparing a staging cluster and then do the following to verify the upgrade is successful:

1. Create simulation load on the staging cluster.
2. Upgrade the database schema in staging cluster.
3. Wait and observe for few minutes to verify that there is no unstable behavior from both the server and the simulation load logic.
4. Upgrade the server.
5. Now do the same to live environment cluster.
