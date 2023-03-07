---
id: how-to-set-up-sqlite-visibility-store
title: How to set up SQLite Visibility store
sidebar_label: SQLite
description: You can set SQLite as your Visibility store with any other supported Persistence databases.
tags:
  - operation-guide
  - filtered-lists
  - visibility
ssdi:
  - SQLite v3.31.0 and later
---

You can set SQLite as your [Visibility store](/concepts/what-is-visibility).
Verify [supported versions](/clusters/how-to-set-up-visibility-in-a-temporal-cluster#supported-databases) before you proceed.

Temporal only support in-memory database with SQLite; this means that the database is automatically created when Temporal Server starts and is destroyed when Temporal Server stops.

You can change the configuration to use file-based database so that it is preserved when Temporal Server stops. However, note that if using a file-based SQLite database, upgrading your database schema to enable Advanced Visibility features is not supported; in this case, you will have to delete the database and create it again to upgrade.

If using SQLite v3.31.0 and later as your Visibility store with Temporal Server v1.20 and later, any [custom Search Attributes](/concepts/what-is-a-search-attribute#custom-search-attributes) that you create must be associated with a Namespace in that Cluster. See [Search Attributes](/application-development/observability#visibility) for details.

**Persistence configuration**

Set your SQLite Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `sqlite-visibility` and define the datastore configuration in your Temporal Cluster Configuration YAML.

```yaml
persistence:
  # ...
  visibilityStore: sqlite-visibility
  # ...
  datastores:
    # ...
    sqlite-visibility:
      sql:
        user: 'username_for_auth'
        password: 'password_for_auth'
        pluginName: 'sqlite'
        databaseName: 'default'
        connectAddr: 'localhost'
        connectProtocol: 'tcp'
        connectAttributes:
          mode: 'memory'
          cache: 'private'
        maxConns: 1
        maxIdleConns: 1
        maxConnLifetime: '1h'
        tls:
          enabled: false
          caFile: ''
          certFile: ''
          keyFile: ''
          enableHostVerification: false
          serverName: ''
```

SQLite (v3.31.0 and later) has Advanced Visiibility enabled by default.

**Database schema and setup**

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the schemas defined (by suported versions) here: https://github.com/temporalio/temporal/blob/master/schema/sqlite/v3/visibility/schema.sql.

See [Temporalite](https://github.com/temporalio/temporalite/blob/main/server.go) setup for example on how to set up the SQLite schema.
