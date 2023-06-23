---
id: how-to-set-up-cassandra-visibility-store
title: How to set up Cassandra Visibility store
sidebar_label: Cassandra
description: You can set Cassandra as your Visibility store with any other supported Persistence databases.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - Support for Cassandra as a Visibility database will be deprecated from Temporal Server v1.21 onwards. Check [Server release notes](https://github.com/temporalio/temporal/releases) for updates.
  - We recommend migrating from Cassandra to any of the other supported databases for Visibility.
---

You can set Cassandra as your [Visibility store](/concepts/what-is-visibility).
Verify [supported versions](#supported-databases) before you proceed.

Advanced Visibility is not supported with Cassandra.

To enable advanced Visibility features, use any of the supported databases, such as MySQL, PostgreSQL, SQLite, or Elasticsearch, as your Visibility store.
We recommend using Elasticsearch for any Temporal Cluster setup that handles more than a few Workflow Executions because it supports the request load on the Visibility store and helps optimize performance.

To migrate from Cassandra to a supported SQL database, see [Migrate Visibility database](/cluster-deployment-guide#migrating-visibility-database).

**Persistence configuration**

Set your Cassandra Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `cass-visibility` and define the datastore configuration in your Temporal Cluster configuration YAML.

```yaml
#...
persistence:
  #...
  visibilityStore: cass-visibility
  #...
  datastores:
    default:
    #...
    cass-visibility:
      cassandra:
        hosts: "127.0.0.1"
        keyspace: "temporal_visibility"
#...
```

**Database schema and setup**

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the schemas defined (by supported versions) in https://github.com/temporalio/temporal/tree/master/schema/cassandra/visibility.

The following example shows how the [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script sets up your Visibility store.

```bash
#...
# set your Cassandra environment variables
: "${KEYSPACE:=temporal}"
: "${VISIBILITY_KEYSPACE:=temporal_visibility}"

: "${CASSANDRA_SEEDS:=}"
: "${CASSANDRA_PORT:=9042}"
: "${CASSANDRA_USER:=}"
: "${CASSANDRA_PASSWORD:=}"
: "${CASSANDRA_TLS_ENABLED:=}"
: "${CASSANDRA_CERT:=}"
: "${CASSANDRA_CERT_KEY:=}"
: "${CASSANDRA_CA:=}"
: "${CASSANDRA_REPLICATION_FACTOR:=1}"
#...
# set connection details
#...
# set up Cassandra schema
setup_cassandra_schema() {
  #...
  # use valid schema for the version of the database you want to set up for Visibility
    VISIBILITY_SCHEMA_DIR=${TEMPORAL_HOME}/schema/cassandra/visibility/versioned
    if [[ ${SKIP_DB_CREATE} != true ]]; then
        temporal-cassandra-tool --ep "${CASSANDRA_SEEDS}" create -k "${VISIBILITY_KEYSPACE}" --rf "${CASSANDRA_REPLICATION_FACTOR}"
    fi
    temporal-cassandra-tool --ep "${CASSANDRA_SEEDS}" -k "${VISIBILITY_KEYSPACE}" setup-schema -v 0.0
    temporal-cassandra-tool --ep "${CASSANDRA_SEEDS}" -k "${VISIBILITY_KEYSPACE}" update-schema -d "${VISIBILITY_SCHEMA_DIR}"
  #...
}
```
