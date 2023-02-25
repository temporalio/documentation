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
  - SQLite v3.31.0 and later.
---

You can set SQLite as your Visibility store with any other [supported Persistence databases](/concepts/what-is-a-temporal-cluster#dependency-versions).

Verify [supported versions](#supported-versions) before you proceed.

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

**Database schema and setup**

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the schemas defined (by suported versions) here: https://github.com/temporalio/temporal/blob/master/schema/sqlite/v3/visibility/schema.sql.

See [Temporalite](https://github.com/temporalio/temporalite/blob/main/server.go) setup for example on how to set up the SQLite schema.
