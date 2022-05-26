---
id: what-is-a-temporal-cluster
title: What is a Temporal Cluster?
sidebar_label: Temporal Cluster
description: A Temporal Cluster is the Temporal Server paired with persistence.
tags:
  - explanation
---

A Temporal Cluster is the group of services, known as the [Temporal Server](/concepts/what-is-the-temporal-server), combined with persistence stores, that together act as a component of the Temporal Platform.

- [How to quickly install a Temporal Cluster for testing and development](/clusters/quick-install)
- [Cluster deployment guide](/cluster-deployment-guide)

![A Temporal Cluster (Server + persistence)](/diagrams/temporal-cluster.svg)

#### Persistence

A Temporal Cluster's only required dependency for basic operation is a database.
Multiple types of databases that are supported.

![Persistence](/diagrams/temporal-database.svg)

The database stores the following types of data:

- Tasks: Tasks to be dispatched.
- State of Workflow Executions:
  - Execution table: A capture of the mutable state of Workflow Executions.
  - History table: An append only log of Workflow Execution History Events.
- Namespace metadata: Metadata of each Namespace in the Cluster.
- Visibility data: Enables operations like "show all running Workflow Executions".
  For production environments, we recommend using Elasticsearch.

An Elasticsearch database can be added to enable [Advanced Visibility](/concepts/what-is-advanced-visibility).

**Versions**

Temporal tests compatibility by spanning the **minimum** and **maximum** stable non-EOL major versions for each supported database.
As of time of writing, these specific versions are used in our test pipelines and actively tested before we release any version of Temporal:

- **Cassandra v3.11 and v4.0**
- **PostgreSQL v10.18 and v13.4**
- **MySQL v5.7 and v8.0** (specifically 8.0.19+ due to a bug)

We update these support ranges once a year.
The release notes of each Temporal Server declare when we plan to drop support for database versions reaching End of Life.

- Because Temporal Server primarily relies on core database functionality, we do not expect compatibility to break often.
  Temporal has no opinions on database upgrade paths; as long as you can upgrade your database according to each project's specifications, Temporal should work with any version within supported ranges.
- We do not run tests with vendors like Vitess and CockroachDB, so you rely on their compatibility claims if you use them.
  Feel free to discuss them with fellow users [in our forum](https://community.temporal.io/).
- Temporal is [working on official SQLite v3.x persistence](https://github.com/temporalio/temporal/pulls?q=is%3Apr+sort%3Aupdated-desc+sqlite), but this is meant only for development and testing, not production usage.
  Cassandra, MySQL, and PostgreSQL schemas are supported and thus can be used as the Server's database.

#### Monitoring & observation

Temporal emits metrics by default in a format that is supported by Prometheus.
Monitoring and observing those metrics is optional.
Any software that can pull metrics that supports the same format could be used, but we ensure it works with Prometheus and Grafana versions only.

- **Prometheus >= v2.0**
- **Grafana >= v2.5**

#### Visibility

Temporal has built-in [Visibility](/concepts/what-is-visibility) features.
To enhance this feature, Temporal supports an [integration with Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).

- Elasticsearch v7.10 is supported from Temporal version 1.7.0 onwards
- Elasticsearch v6.8 is supported in all Temporal versions
- Both versions are explicitly supported with AWS Elasticsearch
