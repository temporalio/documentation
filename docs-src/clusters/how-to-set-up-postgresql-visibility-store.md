---
id: how-to-set-up-postgresql-visibility-store
title: How to set up PostgreSQL Visibility store
sidebar_label: PostgreSQL
description: You can set PostgreSQL as your Visibility store with any other supported Persistence databases.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - PostgreSQL v9.6 and later.
  - With Temporal Cluster version 1.20 and later, advanced Visibility is available on PostgreSQL v12 and later.
  - Support for PostgreSQL v9.6 through v11 will be deprecated for all Temporal Server versions after v1.20; we recommend upgrading to PostgreSQL 12 or later.
---

You can set PostgreSQL as your [Visibility store](/concepts/what-is-visibility).
Verify [supported versions](/clusters/how-to-set-up-visibility-in-a-temporal-cluster#supported-databases) before you proceed.

If using PostgreSQL v12 or later as your Visibility store with Temporal Server v1.20 and later, any [custom Search Attributes](/concepts/what-is-a-search-attribute#custom-search-attributes) that you create must be associated with a Namespace in that Cluster.

**Persistence configuration**

Set your PostgreSQL Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `postgres-visibility` and define the datastore configuration in your Temporal Cluster configuration YAML.

```yaml
#...
persistence:
  #...
  visibilityStore: postgres-visibility
  #...
  datastores:
    default:
    #...
    postgres-visibility:
      sql:
        pluginName: "postgres12" # For PostgreSQL v12 and later. If using PostgreSQL v9.6 or earlier, use "postgresql" plugin.
        databaseName: "temporal_visibility"
        connectAddr: " " # remote address of this database; for example, 127.0.0.0:5432
        connectProtocol: " " # protocol example: tcp
        user: "username_for_auth"
        password: "password_for_auth"
        maxConns: 2
        maxIdleConns: 2
        maxConnLifetime: "1h"
#...
```

To enable advanced Visibility features on your PostgreSQL Visibility store, upgrade to PostgreSQL v12 or later with Temporal Server v1.20 or later.
See [Upgrade Server](/clusters/how-to-upgrade-the-temporal-server-version) for details on how to upgrade your Temporal Server and database schemas.

**Database schema and setup**

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the schemas defined (by supported versions):

- [PostgreSQL v12 and later](https://github.com/temporalio/temporal/tree/master/schema/postgresql/v12/visibility)
- [PostgreSQL v9.6 and later](https://github.com/temporalio/temporal/tree/master/schema/postgresql/v96/visibility)

The following example shows how the [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script sets up your PostgreSQL Visibility store.

```bash
#...
# set your PostgreSQL environment variables
: "${DBNAME:=temporal}"
: "${VISIBILITY_DBNAME:=temporal_visibility}"
: "${DB_PORT:=}"
: "${POSTGRES_SEEDS:=}"
: "${POSTGRES_USER:=}"
: "${POSTGRES_PWD:=}"

#... set connection details
# set up PostgreSQL schema
setup_postgres_schema() {
    #...

    # use valid schema for the version of the database you want to set up for Visibility
    VISIBILITY_SCHEMA_DIR=${TEMPORAL_HOME}/schema/postgresql/${POSTGRES_VERSION_DIR}/visibility/versioned
    if [[ ${VISIBILITY_DBNAME} != "${POSTGRES_USER}" && ${SKIP_DB_CREATE} != true ]]; then
        temporal-sql-tool --plugin postgres --ep "${POSTGRES_SEEDS}" -u "${POSTGRES_USER}" -p "${DB_PORT}" --db "${VISIBILITY_DBNAME}" create
    fi
    temporal-sql-tool --plugin postgres --ep "${POSTGRES_SEEDS}" -u "${POSTGRES_USER}" -p "${DB_PORT}" --db "${VISIBILITY_DBNAME}" update-schema -d "${VISIBILITY_SCHEMA_DIR}"
  #...
}
```

Note that the script uses [temporal-sql-tool](https://github.com/temporalio/temporal/blob/3b982585bf0124839e697952df4bba01fe4d9543/tools/sql/main.go) to run the setup.
