---
id: how-to-set-up-visibility-in-a-temporal-cluster
title: How to set up Visibility in a Temporal Cluster
sidebar_label: Visibility store
description: Visibility storage is set up as a part of your Persistence store to enable listing and filtering details about Worklfow Executions that exist on your Temporal Cluster.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

A [Visibility](/concepts/what-is-visibility) store is set up as a part of your [Persistence store](/concepts/what-is-a-temporal-cluster#persistence) to enable listing and filtering details about Workflow Executions that exist on your Temporal Cluster.

A Visibility store is required in a Temporal Cluster setup because it is used by Temporal Web UI and CLI to pull Workflow Execution data and enables features like batch operations on a group of Workflow Executions.

With the Visibility store, you can use [List Filters](/concepts/what-is-a-list-filter) with [Search Attributes](/concepts/what-is-a-search-attribute) to list and filter Workflow Executions that you want to review.

Setting up [advanced Visibility](/concepts/what-is-advanced-visibility) enables access to creating and using multiple custom Search Attributes with your List Filters.

For details, see [Search Attributes](/concepts/what-is-a-search-attribute).

Note that if you use MySQL, PostgreSQL, or SQLite as your Visibility store, Temporal Server version 1.20 and later supports advanced Visibility features on MySQL (version 8.0.17 and later), PostgreSQL (version 12 and later) and SQLite (v3.31.0 and later), in addition to Elasticsearch.

To enable advanced Visibility on your SQL databases, ensure that you do the following:

- [Upgrade your Temporal Server](/clusters/how-to-upgrade-the-temporal-server-version) to version 1.20 or later.
- [Update your database schemas](/clusters/how-to-upgrade-the-temporal-server-version#upgrade-mysql-or-postgresql-schema) for MySQL to version 8.0.17 (or later), PostgreSQL to version 12 (or later), or SQLite to v3.31.0 (or later).

Beginning with Temporal Server v1.21, you can set up a secondary Visibility store in your Temporal Cluster to enable [Dual Visibility](/concepts/what-is-dual-visibility).
This is useful for migrating your Visibility store database.

#### Supported databases

The following databases are supported as Visibility stores:

- [MySQL](/clusters/how-to-set-up-mysql-visibility-store) v5.7 and later.
  Use v8.0.17 (or later) with Temporal Server v1.20 or later for advanced Visibility capabilities.
  Because standard Visibility is deprecated beginning with Temporal Server v1.21, support for older versions of MySQL will be dropped.
- [PostgreSQL](/clusters/how-to-set-up-postgresql-visibility-store) v9.6 and later.
  Use v12 (or later) with Temporal Server v1.20 or later for advanced Visibility capabilities.
  Because standard Visibility is deprecated beginning with Temporal Server v1.21, support for older versions of PostgreSQL will be dropped.
- [SQLite](/clusters/how-to-set-up-sqlite-visibility-store) v3.31.0 and later for advanced Visibility capabilities.
- [Cassandra](/clusters/how-to-set-up-cassandra-visibility-store).
  Support for Cassandra as a Visibility database is deprecated beginning with Temporal Server v1.21.
  For updates, check the [Temporal Server release notes](https://github.com/temporalio/temporal/releases).
- [Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster) supported versions.
  We recommend operating a Temporal Cluster with Elasticsearch as your Visibility store for any use case that spawns more than a few Workflow Executions.

You can use any combination of the supported databases for your Persistence and Visibility stores.
