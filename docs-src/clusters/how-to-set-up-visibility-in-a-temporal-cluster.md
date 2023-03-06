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

[Visibility](/concepts/what-is-visibility) storage is set up as a part of your [Persistence store](/concept/what-is-a-temporal-cluster#persistence) to enable listing and filtering details about Worklfow Executions that exist on your Temporal Cluster.

Visibility store is required in a Temporal Cluster setup as it is used by Temporal WebUI and `tctl` to pull Workflow Execution data, and enables features like batch operations on a group of Workflow Executions.

With the Visibility store, you can use [List Filters](/concepts/what-is-a-list-filter) with [Search Attributes](/concepts/what-is-a-search-attribute) to list and filter Workflow Executions that you want to review.
Setting up Advanced Visibility enables access to creating and using multiple custom Search Attributes with your List Filters. See [Search Attributes](/concepts/what-is-a-search-attribute) for details.

Note that if you use MySQL, PostgreSQL, or SQLite as your Visibility store, Temporal Server version 1.20 and later supports Advanced Visibility features on MySQL (version 8.0.17 and later), PostgreSQL (version 12 and later) and SQLite (v3.31.0 and later), in addition to Elasticsearch.

To enable Advanced Visibility on your SQL databases, ensure that you do the following:

- [Upgrade your Temporal Server](/clusters/how-to-upgrade-the-temporal-server-version) to version 1.20.
- [Update your database schemas](/clusters/how-to-upgrade-the-temporal-server-version#upgrade-mysql-or-postgresql-schema) for MySQL to version 8.0.17 (or later), PostgreSQL version 12 (or later), or SQLite to v3.31.0 (or later).

#### Supported databases

The following databases are supported as Visibility stores:

- MySQL v5.7 and later. Use v8.0.17 (or later) with Temporal Server v1.20 or later.
- PostgreSQL v9.6 and later. Use v12 (or later) with Temporal Server v1.20 or later.
- SQLite v3.31.0 and later.
- Cassandra
- Elasticsearch [supported versions](/concepts/what-is-a-temporal-cluster#visibility)
  - We recommend operating a Temporal Cluster with Elasticsearch for any use case that spawns more than a few Workflow Executions.
  - You can set Elasticsearch as your Visibility store or set it is specifically for Advanced Visibility with a different Visibility store.

You can use any combination of the supported databases for your Persistence and Visibility stores.
