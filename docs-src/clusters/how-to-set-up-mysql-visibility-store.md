---
id: how-to-set-up-mysql-visibility-store
title: How to set up MySQL Visibility store
sidebar_label: MySQL
description: You can set MySQL (v5.7 and later) as your Visibility store.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - MySQL v5.7 and later.
  - Support for MySQL v5.7 will be deprecated for all Temporal Server versions after v1.20.
  - With Temporal Server version 1.20 and later, Advanced Visibility is available on MySQL v8.0.17 and later.
---

You can set MySQL as your [Visibility store](/concepts/what-is-visibility).
Verify [supported versions](/clusters/how-to-set-up-visibility-in-a-temporal-cluster#supported-databases) before you proceed.

If using MySQL v8.0.17 or later as your Visibility store with Temporal Server v1.20 and later, any [custom Search Attributes](/concepts/what-is-a-search-attribute#custom-search-attributes) that you create must be associated with a Namespace in that Cluster.

**Persistence configuration**

Set your MySQL Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `mysql-visibility` and define the datastore configuration in your Temporal Cluster Configuration YAML.

```yaml
#...
persistence:
  #...
  visibilityStore: mysql-visibility
  #...
  datastores:
    default:
      #...
    mysql-visibility:
      sql:
        pluginName: "mysql" # if using MySQL 8.0.17 or later with Temporal Server v1.20, use "mysql8" plugin for Advanced Visibility capabilities
        databaseName: "temporal_visibility"
        connectAddr: " " # remote address of this database; for example, 127.0.0.0:3306
        connectProtocol: " " # protocol example: tcp
        user: "username_for_auth"
        password: "password_for_auth"
        maxConns: 2
        maxIdleConns: 2
        maxConnLifetime: "1h"
#...
```

For details on the configuration parameters and values, see [Cluster configuration](/references/configuration#sql).

To enable Advanced Visibility features on your MySQL Visibility store, upgrade to MySQL v8.0.17 or later with Temporal Server v1.20 or later.
See [Upgrade Server](/clusters/how-to-upgrade-the-temporal-server-version) on how to upgrade your Temporal Server and database schemas.

For example configuration templates, see [MySQL Visibility store configuration](https://github.com/temporalio/temporal/blob/master/config/development-mysql.yaml).

**Database schema and setup**

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the schemas defined (by supported versions) in the following:

- [MySQL v5.7 and later](https://github.com/temporalio/temporal/tree/master/schema/mysql/v57/visibility)
- [MySQL v8.0.17 and later](https://github.com/temporalio/temporal/tree/master/schema/mysql/v8/visibility)

The following example shows how the [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script sets up your Visibility store.

```bash
#...
# set your MySQL environment variables
: "${DBNAME:=temporal}"
: "${VISIBILITY_DBNAME:=temporal_visibility}"
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

Note that the script uses [temporal-sql-tool](https://github.com/temporalio/temporal/blob/3b982585bf0124839e697952df4bba01fe4d9543/tools/sql/main.go) to run the setup.
