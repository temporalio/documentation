---
id: sqlite
title: Set up SQLite Visibility store
sidebar_label: SQLite
slug: /self-hosted-guide/visibility/sqlite
description: How to set up a SQLite Visibility store for a self-hosted Temporal Service.
toc_max_heading_level: 4
tags:
  - Temporal Service
  - Self-hosting
  - Visibility
---

:::tip Support, stability, and dependency info

- SQLite v3.31.0 and later.

:::

You can set SQLite as your [Visibility store](/temporal-service/visibility). Verify
[supported versions](/self-hosted-guide/visibility) before you proceed.

Temporal supports only an in-memory database with SQLite; this means that the database is automatically created when
Temporal Server starts and is destroyed when Temporal Server stops.

You can change the configuration to use a file-based database so that it is preserved when Temporal Server stops.
However, if you use a file-based SQLite database, upgrading your database schema to enable advanced Visibility features
is not supported; in this case, you must delete the database and create it again to upgrade.

If using SQLite v3.31.0 and later as your Visibility store with Temporal Server v1.20 and later, any
[custom Search Attributes](/search-attribute#custom-search-attribute) that you create must be associated with a
Namespace in that Temporal Service.

## Persistence configuration

Set your SQLite Visibility store name in the `visibilityStore` parameter in your Persistence configuration, and then
define the Visibility store configuration under `datastores`.

The following example shows how to set a Visibility store `sqlite-visibility` and define the datastore configuration in
your Temporal Service configuration YAML.

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

SQLite (v3.31.0 and later) has advanced Visibility enabled by default.

## Database schema and setup

Visibility data is stored in a database table called `executions_visibility` that must be set up according to the
schemas defined (by supported versions) in
https://github.com/temporalio/temporal/blob/main/schema/sqlite/v3/visibility/schema.sql.

For an example of setting up the SQLite schema, see
[Temporalite](https://github.com/temporalio/temporalite/blob/main/server.go) setup.
