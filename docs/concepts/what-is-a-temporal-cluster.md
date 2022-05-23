---
id: what-is-a-temporal-cluster
title: What is a Temporal Cluster?
sidebar_label: Temporal Cluster
description: A Temporal Cluster is the Temporal Server paired with persistence.
tags:
  - explanation
---

A Temporal Cluster is the group of services, known as the [Temporal Server](/concepts/what-is-the-temporal-server), combined with persistence stores, that together act as a component of the Temporal Platform.

![A Temporal Cluster (Server + persistence)](/diagrams/temporal-cluster.svg)

- [How to quickly install a Temporal Cluster for testing and development](/clusters/quick-install)

#### Persistence

A Temporal Cluster's only required dependency for basic operation is a database.

![Persistence](/diagrams/temporal-database.svg)

Cassandra, MySQL, and PostgreSQL schemas are supported and thus can be used as the Server's database.

The database stores the following types of data:

- Tasks: Tasks to be dispatched.
- State of Workflow Executions:
  - Execution table: A capture of the mutable state of Workflow Executions.
  - History table: An append only log of Workflow Execution History Events.
- Namespace metadata: Metadata of each Namespace in the Cluster.
- Visibility data: Enables operations like "show all running Workflow Executions".
  For production environments, we recommend using Elasticsearch.

An Elasticsearch database can be added to enable [Advanced Visibility](/concepts/what-is-advanced-visibility).
