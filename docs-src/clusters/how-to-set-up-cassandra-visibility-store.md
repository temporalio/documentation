---
id: how-to-set-up-cassandra-visibility-store
title: How to set up Cassandra Visibility store
sidebar_label: Cassandra
description: You can set Cassandra as your Visibility store with any other supported Persistence databases.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

You can set Cassandra as your [Visibility store](/concepts/what-is-visibility).

Verify [supported versions](#supported-versions) before you proceed.

Advanced Visibility is not supported with Cassandra. To enable Advanced Visibility features, use any of the supported databases, such as MySQL, PostgreSQL, SQLite, or Elasticsearch as your .
We recommend using Elasticsearch for any Temporal Cluster setup that handles more than a few Workflow Executions, as it takes on the request load on the Visibility store and helps optimize performance.

**Persistence configuration**

Set your Cassandra Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `cass-visibility` and define the datastore configuration in your Temporal Cluster Configuration YAML.

```yaml
#...
persistence:
  #...
  visibilityStore: cass-visibility
  advancedVisibilityStore: es-visibility
  #...
  datastores:
    default:
    #...
    cass-visibility:
      cassandra:
        hosts: '127.0.0.1'
        keyspace: 'temporal_visibility'
    es-visibility:
      elasticsearch:
        version: 'v7'
        logLevel: 'error'
        url:
          scheme: 'http'
          host: '127.0.0.1:9200'
        indices:
          visibility: temporal_visibility_v1_dev_other
          # secondary_visibility: temporal_visibility_v2_dev
        closeIdleConnectionsInterval: 15s
#...
```

In this example, we also set Elasticsearch for Advanced Visibility with Cassandra as the Visibility store.

**Database schema and setup**

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the schemas defined (by suported versions) here: https://github.com/temporalio/temporal/tree/master/schema/cassandra/visibility.

The following example shows how the [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script is used to setup your Visibility store.

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
  # use valid schema for the version of the database you want to set up for Visibility.
    VISIBILITY_SCHEMA_DIR=${TEMPORAL_HOME}/schema/cassandra/visibility/versioned
    if [[ ${SKIP_DB_CREATE} != true ]]; then
        temporal-cassandra-tool --ep "${CASSANDRA_SEEDS}" create -k "${VISIBILITY_KEYSPACE}" --rf "${CASSANDRA_REPLICATION_FACTOR}"
    fi
    temporal-cassandra-tool --ep "${CASSANDRA_SEEDS}" -k "${VISIBILITY_KEYSPACE}" setup-schema -v 0.0
    temporal-cassandra-tool --ep "${CASSANDRA_SEEDS}" -k "${VISIBILITY_KEYSPACE}" update-schema -d "${VISIBILITY_SCHEMA_DIR}"
  #...
}
```
