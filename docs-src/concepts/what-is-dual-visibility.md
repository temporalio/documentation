---
id: what-is-dual-visibility
title: What is Dual Visibility?
sidebar_label: Dual Visibility
description: Dual Visibility is a feature that allows you to set a secondary Visibility store in your Temporal Cluster to facilitate migrating your Visibility data from one database to another.
tags:
  - term
  - explanation
  - filtered-lists
  - visibility
---

Dual Visibility is a feature that allows you to set a secondary Visibility store in addition to a primary store in your Temporal Cluster.
Setting up Dual Visibility enables smoother migration of your Visibility data from one database to another.
For example, if you have Cassandra configured as your Visibility database, you can set up a supported SQL database as your secondary Visibility store and migrate your data before .

A Dual visibility setup requires two configurations:

- **Primary Visibility**: This is a required primary Visibility store where Visibility data is written to and read from by default. The primary Visibility store is set with the `visibilityStore` configuration key in your Temporal Cluster.
- **Secondary Visibility**: This is an optional additional Visibility store that is a secondary storage for your Visibility data. The secondary Visibility store is set with the `secondaryVisibilityStore` configuration key in your Temporal Cluster.

The following combinations are allowed in a Dual Visbility setting.

| Primary                     | Secondary                       |
| --------------------------- | ------------------------------- |
| Standard (Cassandra or SQL) | Advanced (SQL or Elasticsearch) |
| Advanced (SQL)              | Advanced (SQL)                  |
| Advanced (Elasticsearch)    | Advanced (Elasticsearch)        |

With Dual Visibility, you can read from only one Visibility store at a time, but can configure your Temporal Cluster to write to primary only, secondary only, or to both primary and secondary Visibility stores.
When migrating from one Visibility store database to another, set up the database you want to migrate to as your secondary Visibility store.

You can plan your migration using specific dynamic configuration keys that help you transition your read and write operations from the primary to the secondary Visibility store.
For details on migrating your Visibility store databases, see [Setting up Dual Visibility](//clusters/how-to-set-up-dual-visibility).
