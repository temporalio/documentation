---
id: how-to-set-up-dual-visibility
title: How to set up Dual Visibility
sidebar_label: Dual Visibility
description: To enable Dual Visibility, set up a secondary Visibility store with your primary Visibility, and configure your Temporal Cluster to enable read and/or write operations on the secondary Visibility store.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - Supported from Temporal Server v1.21 onwards.
---

To enable [Dual Visibility](/concepts/what-is-dual-visibility), set up a secondary Visibility store with your primary Visibility store, and configure your Temporal Cluster to enable read and/or write operations on the secondary Visibility store.

With Dual Visibility, you can read from only one Visibility store at a time, but can configure your Temporal Cluster to write to primary only, secondary only, or to both primary and secondary stores.

#### Set up secondary Visibility store

Set the secondary store with the `secondaryVisibilityStore` configuration key in your Persistence configuration, and then define the secondary Visibility store configuration under `datastores`.

You can configure any of the [supported databases](/self-hosted/how-to-set-up-visibility-in-a-temporal-cluster#supported-databases) as your secondary store.

Examples:

To configure MySQL as a secondary store with Cassandra as your primary store, do the following.

```yaml
persistence:
  visibilityStore: cass-visibility # This is your primary Visibility store
  secondaryVisibilityStore: mysql-visibility # This is your secondary Visibility store
  datastores:
    cass-visibility:
      cassandra:
        hosts: "127.0.0.1"
        keyspace: "temporal_primary_visibility"
    mysql-visibility:
      sql:
        pluginName: "mysql8" # Verify supported versions. Use a version of SQL that supports advanced Visibility.
        databaseName: "temporal_secondary_visibility"
        connectAddr: "127.0.0.1:3306"
        connectProtocol: "tcp"
        user: "temporal"
        password: "temporal"
```

To configure Elasticsearch as both your primary and secondary store, use the configuration key `elasticsearch.indices.secondary_visibility`, as shown in the following example.

```yaml
persistence:
  visibilityStore: es-visibility
  datastores:
    es-visibility:
      elasticsearch:
        version: "v7"
        logLevel: "error"
        url:
          scheme: "http"
          host: "127.0.0.1:9200"
        indices:
          visibility: temporal_visibility_v1
          secondary_visibility: temporal_visibility_v1_new
        closeIdleConnectionsInterval: 15s
```

#### Database schema and setup

The database schema and setup for a secondary store depends on the database you plan to use.

- [MySQL](/self-hosted/how-to-set-up-mysql-visibility-store)
- [PostgresSQL](/self-hosted/how-to-set-up-postgresql-visibility-store)
- [SQLite](/self-hosted/how-to-set-up-sqlite-visibility-store)
- [Elasticsearch](/self-hosted/how-to-integrate-elasticsearch-into-a-temporal-cluster)

For the Cassandra and MySQL configuration in the previous example, an example setup script would be as follows.

```bash
#...
# set your Cassandra environment variables
: "${KEYSPACE:=temporal}"
: "${VISIBILITY_KEYSPACE:=temporal_primary_visibility}"

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
#...
# set your MySQL environment variables
: "${DBNAME:=temporal}"
: "${VISIBILITY_DBNAME:=temporal_secondary_visibility}"
: "${DB_PORT:=}"
: "${MYSQL_SEEDS:=}"
: "${MYSQL_USER:=}"
: "${MYSQL_PWD:=}"
: "${MYSQL_TX_ISOLATION_COMPAT:=false}"

#...
# set connection details
#...
# set up MySQL schema
setup_mysql_schema() {
    #...
    # use valid schema for the version of the database you want to set up for Visibility
    VISIBILITY_SCHEMA_DIR=${TEMPORAL_HOME}/schema/mysql/${MYSQL_VERSION_DIR}/visibility/versioned
    if [[ ${SKIP_DB_CREATE} != true ]]; then
        temporal-sql-tool --ep "${MYSQL_SEEDS}" -u "${MYSQL_USER}" -p "${DB_PORT}" "${MYSQL_CONNECT_ATTR[@]}" --db "${VISIBILITY_DBNAME}" create
    fi
    temporal-sql-tool --ep "${MYSQL_SEEDS}" -u "${MYSQL_USER}" -p "${DB_PORT}" "${MYSQL_CONNECT_ATTR[@]}" --db "${VISIBILITY_DBNAME}" setup-schema -v 0.0
    temporal-sql-tool --ep "${MYSQL_SEEDS}" -u "${MYSQL_USER}" -p "${DB_PORT}" "${MYSQL_CONNECT_ATTR[@]}" --db "${VISIBILITY_DBNAME}" update-schema -d "${VISIBILITY_SCHEMA_DIR}"
#...
}
```

For Elasticsearch as both primary and secondary Visibility store configuration in the previous example, an example setup script would be as follows.

```bash
#...
# Elasticsearch
: "${ENABLE_ES:=false}"
: "${ES_SCHEME:=http}"
: "${ES_SEEDS:=}"
: "${ES_PORT:=9200}"
: "${ES_USER:=}"
: "${ES_PWD:=}"
: "${ES_VERSION:=v7}"
: "${ES_VIS_INDEX:=temporal_visibility_v1_dev}"
: "${ES_SEC_VIS_INDEX:=temporal_visibility_v1_new}"
: "${ES_SCHEMA_SETUP_TIMEOUT_IN_SECONDS:=0}"

#...

# Validate your ES environment
#...
# Wait for ES to start
#...
# Set up Elasticsearch index
setup_es_index() {
    ES_SERVER="${ES_SCHEME}://${ES_SEEDS%%,*}:${ES_PORT}"
    # ES_SERVER is the URL of Elasticsearch server i.e. "http://localhost:9200".
    SETTINGS_URL="${ES_SERVER}/_cluster/settings"
    SETTINGS_FILE=${TEMPORAL_HOME}/schema/elasticsearch/visibility/cluster_settings_${ES_VERSION}.json
    TEMPLATE_URL="${ES_SERVER}/_template/temporal_visibility_v1_template"
    SCHEMA_FILE=${TEMPORAL_HOME}/schema/elasticsearch/visibility/index_template_${ES_VERSION}.json
    INDEX_URL="${ES_SERVER}/${ES_VIS_INDEX}"
    curl --fail --user "${ES_USER}":"${ES_PWD}" -X PUT "${SETTINGS_URL}" -H "Content-Type: application/json" --data-binary "@${SETTINGS_FILE}" --write-out "\n"
    curl --fail --user "${ES_USER}":"${ES_PWD}" -X PUT "${TEMPLATE_URL}" -H 'Content-Type: application/json' --data-binary "@${SCHEMA_FILE}" --write-out "\n"
    curl --user "${ES_USER}":"${ES_PWD}" -X PUT "${INDEX_URL}" --write-out "\n"

    # Checks for and sets up Elasticsearch as a secondary Visibility store
    if [[ ! -z "${ES_SEC_VIS_INDEX}" ]]; then
      SEC_INDEX_URL="${ES_SERVER}/${ES_SEC_VIS_INDEX}"
      curl --user "${ES_USER}":"${ES_PWD}" -X PUT "${SEC_INDEX_URL}" --write-out "\n"
    fi
}
```

#### Update Cluster configuration

With the primary and secondary stores set, update the `system.secondaryVisibilityWritingMode` and `system.enableReadFromSecondaryVisibility` configuration keys in your self-hosted Cluster's dynamic configuration YAML file to enable read and/or write operations to the secondary Visibility store.

For example, to enable write operations to both primary and secondary stores, but disable reading from the secondary store, use the following.

```yaml
system.secondaryVisibilityWritingMode:
  - value: "dual"
    constraints: {}
system.enableReadFromSecondaryVisibility:
  - value: false
    constraints: {}
```

For details on the configuration options, see:

- [Secondary Visibility dynamic configuration reference](/references/dynamic-configuration#secondary-visibility-settings)
- [Migrating Visibility databases](self-hosted/how-to-migrate-visibility-database)
