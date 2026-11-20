---
id: upgrade-server
title: Upgrade the Temporal Server
sidebar_label: Upgrade server
description:
  Rolling, in-place Temporal Server upgrades one minor version at a time, with schema updates first, verification
  metrics, rollback, and Multi-Cluster order.
slug: /self-hosted-guide/upgrade-server
toc_max_heading_level: 4
tags:
  - Temporal Service
  - Self-hosting
---

## How to upgrade the Temporal Server version {/* #upgrade-server */}

If a newer version of the [Temporal Server](/temporal-service/temporal-server) is available, a notification appears in
the Temporal Web UI.

A Temporal Server upgrade is an in-place rolling upgrade with two parts: update the database schemas, then roll out the
new server binary to each service a few instances at a time. Clients keep connecting to the same Frontend address, and
running Workflow Executions keep running through the upgrade. Callers can see brief, retryable latency while History
Service instances restart and Shards move between them.

Run at least two instances of each service (Frontend, History, Matching, and Worker) so the others keep serving while
one restarts. Don't split traffic between two Temporal Services on different versions, and don't use
[Multi-Cluster Replication](/self-hosted-guide/multi-cluster-replication) to upgrade. Upgrade each Temporal Service in
place.

:::info

If you are using a version that is older than 1.0.0, reach out to us at
[community.temporal.io](http://community.temporal.io) to ask how to upgrade.

:::

### Plan your upgrade path

Upgrade one minor version at a time:

1. Upgrade to the latest patch release of your current minor version.
2. Upgrade to the next minor version, at its latest patch release.
3. Repeat until you reach your target version.

For example, to go from v1.20.0 to v1.22.0, upgrade `v1.20.0` → `v1.20.5` → `v1.21.6` → `v1.22.0`. v1.20.5 and v1.21.6
are the latest patch releases of their minor versions. You skip the patch releases in between, but not the minor
version in between.

Each step on the path is a full upgrade: update the schemas, then roll out the binary. The Temporal Server doesn't
enforce this path, but it's the tested and supported one. A version can run version-gated work at startup, such as
background data migrations, that a jump across several minor versions would skip.

Before you start, read the [release notes](https://github.com/temporalio/temporal/releases) for every version on your
path, including the patch releases you skip. A release note can require an intermediate version or an extra step. If
one does, follow it instead of this path.

If your Visibility store is PostgreSQL and your path crosses v1.30 or v1.31, plan for the
[PostgreSQL Visibility table rebuild](#postgresql).

### Before you upgrade

- Test the full upgrade on a staging Temporal Service first. Run representative load against it, update the schemas,
  roll out the binary, and watch for unstable behavior from both the Temporal Service and your load before you upgrade
  production.
- Schedule the production upgrade for a low-traffic window, away from known peaks.

### Run the upgrade

For each version on your upgrade path:

1. **Update the persistence schema.** Use the schema tool for your database, shown in the following sections, with the
   tool and schema files from the version you're upgrading to. One run applies every intermediate schema version in
   order. Run it on every upgrade, before you roll out the binary.
2. **Update the Visibility schema** the same way.
3. **Roll out the new binary, one service at a time.** Finish each service's rolling restart and confirm it's healthy
   before you start the next. The Temporal Server doesn't require a service order. A common order is Frontend, Worker,
   Matching, then History, because the History Service is the most disruptive to restart.
4. **[Verify the upgrade](#verify-the-upgrade)** before you move to the next version on your path.

Each service instance checks the schema version at startup. If the schema is older than the binary expects, the
instance doesn't start and logs an error like the following. The prefix is `cassandra` or `sql`, depending on your
database.

```text
cassandra schema version compatibility check failed: version mismatch for keyspace/database: "temporal". Expected version: 1.13 cannot be greater than Actual version: 1.12
```

No data is affected. Update the schema and restart the instance.

Keep `persistence.numHistoryShards` the same in your static configuration. The Shard count is fixed when the Temporal
Service is first set up. If the configured value differs, the Temporal Server uses the stored count and logs a warning.

### Upgrade Cassandra schema

If you are using Cassandra for your Temporal Service's persistence, use the `temporal-cassandra-tool` to upgrade both
the default Persistence and Visibility schemas.

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

### Upgrade Elasticsearch schema

If you are using Elasticsearch for your Temporal Service's Visibility, use the `temporal-elasticsearch-tool` to upgrade
the schema.

**Example schema upgrade:**

```bash
echo "Updating index mappings: $ES_VISIBILITY_INDEX"
temporal-elasticsearch-tool \
  --endpoint "$ES_SCHEME://$ES_HOST:$ES_PORT" \
  --user "$ES_USER" \
  --password "$ES_PWD" \
  update-schema \
  --index "$ES_VISIBILITY_INDEX"
```

### Upgrade PostgreSQL or MySQL schema

If you are using MySQL or PostgreSQL use the `temporal-sql-tool`, which works similarly to the
`temporal-cassandra-tool`.

Refer to this [Makefile](https://github.com/temporalio/temporal/blob/v1.4.1/Makefile#L367-L383) for context.

#### PostgreSQL

:::caution PostgreSQL Visibility table rebuild in v1.30 and v1.31

The v1.30 and v1.31 Visibility schema updates for PostgreSQL rebuild the whole `executions_visibility` table. On a table
with tens of millions of rows, a rebuild can take hours and uses a lot of database CPU. The table is locked while it
runs, so listing and searching Workflow Executions can be slow or fail. Running Workflow Executions continue, and no
data is lost. Don't stop the update partway through, because it starts over.

- Use the schema tool and files from v1.30.5 or later and from v1.31.3 or later. Earlier patch releases of v1.30 and
  v1.31 run extra rebuilds. Upgrading from v1.29 or earlier to v1.31 still takes two rebuilds.
- Run the update in a maintenance window, not during high traffic.
- Make sure the database has free space of up to twice the size of the Visibility table before you start.

MySQL doesn't rebuild the table for these changes.

:::

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

If you're upgrading PostgreSQL to v12 or later to enable advanced Visibility features with Temporal Server v1.20,
upgrade your PostgreSQL version first, and then run `temporal-sql-tool` with the `postgres12` plugin, as shown in the
following example:

```bash
./temporal-sql-tool \
  --tls \
  --tls-enable-host-verification \
  --tls-cert-file <path to your client cert> \
  --tls-key-file <path to your client key> \
  --tls-ca-file <path to your CA> \
  --ep localhost -p 5432 -u temporal -pw temporal --pl postgres12 --db temporal_visibility update-schema -d ./schema/postgresql/v12/visibility/versioned
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

If you're upgrading MySQL to v8.0.17 or later to enable advanced Visibility features with Temporal Server v1.20, upgrade
your MySQL version first, and then run `temporal-sql-tool` with the `mysql8` plugin, as shown in the following example:

```bash
./temporal-sql-tool \
  --tls \
  --tls-enable-host-verification \
  --tls-cert-file <path to your client cert> \
  --tls-key-file <path to your client key> \
  --tls-ca-file <path to your CA> \
  --ep localhost -p 5432 -u temporal -pw temporal --pl mysql8 --db temporal_visibility update-schema -d ./schema/mysql/v8/visibility/versioned.
```

### Verify the upgrade

After each service's rollout, and again when the upgrade is complete, confirm that these
[Temporal Service metrics](/references/service-metrics) settle. For counters, check the recent rate of increase, not
the cumulative value, which stays above zero after a recovery.

| Metric                                                                  | Type      | Healthy after the rollout                                                       |
| ----------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------- |
| `numshards_gauge`                                                       | Gauge     | Back to the full Shard count and steady                                         |
| `service_errors_shard_ownership_lost`                                   | Counter   | Rate spikes briefly during the rollout, then drops to near zero                 |
| [`service_latency`](/references/service-metrics#service_latency)       | Histogram | Back to the pre-upgrade baseline                                                |
| `service_errors_resource_exhausted`                                     | Counter   | Rate near zero. A rising rate means the Temporal Service is throttling requests. |
| [`persistence_errors`](/references/service-metrics#persistence_errors) | Counter   | Rate near zero                                                                  |
| `task_schedule_to_start_latency`                                        | Histogram | Back to the pre-upgrade baseline                                                |
| [`no_poller_tasks`](/references/service-metrics#no_poller_tasks)       | Counter   | Rate zero on active Task Queues. A rising rate means Workers haven't reconnected. |

If any of these stays high, pause the rollout and investigate before you restart more instances. Don't start the
next version on your path until they settle.

### Roll back an upgrade

If the new version has a problem after the rollout, roll back the binary, not the schema:

- Leave the schema at its upgraded version. The schema tools only move forward. Don't reverse a schema update by hand.
- Roll out the binary for the version you upgraded from. A binary starts against a schema that's newer than it
  expects, and refuses to start only against an older one. Rolling back the binary doesn't change Workflow data.
- Roll back one minor version at a time. Compatibility holds between adjacent minor versions.

### Upgrade with Multi-Cluster Replication

With [Multi-Cluster Replication](/self-hosted-guide/multi-cluster-replication), each Temporal Service has its own
database and binaries. Run the full upgrade, schemas and binary, on each Temporal Service separately.

Upgrade the passive Temporal Service before the active one. A newer version can add replication task types that an
older version doesn't recognize and drops, so keep the receiver at least as new as the sender:

1. Upgrade the passive Temporal Service: schemas, then binary.
2. Wait for replication lag to return to normal.
3. Upgrade the active Temporal Service: schemas, then binary.

This order assumes one Temporal Service is active for every Global Namespace. Active and passive are set per Global
Namespace, so if your Global Namespaces are active on different Temporal Services, replication runs in both directions
and neither order keeps every receiver at least as new as its sender.

The Temporal Server doesn't enforce this order. Don't fail over or hand over a Global Namespace while an upgrade is in
progress.
