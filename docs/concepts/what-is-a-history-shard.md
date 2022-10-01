---
id: what-is-a-history-shard
title: What is a History Shard?
description: A History Shard is an important unit within a Temporal Cluster by which the scale of concurrent Workflow Execution throughput can be measured.
sidebar_label: History Shard
tags:
  - term
---

A History Shard is an important unit within a Temporal Cluster by which the scale of concurrent Workflow Execution throughput can be measured.

Each History Shard maps to a single persistence partition.
A History Shard assumes that only be one concurrent operation can be within a partition at a time.
In essence, the number of History Shards represents the number of concurrent database operations that can occur for a Cluster.
This means that the number of History Shards in a Temporal Cluster plays a significant role in the performance of your Temporal Application.

Before integrating a database, the total number of History Shards for the Temporal Cluster must be chosen and set in the Cluster's configuration (see [persistence](/references/configuration#persistence)).
After the Shard count is configured and the database integrated, the total number of History Shards for the Cluster cannot be changed.

In theory, a Temporal Cluster can operate with an unlimited number of History Shards, but each History Shard adds compute overhead to the Cluster.
Temporal Clusters have operated successfully using anywhere from 1 to 128K History Shards, with each Shard responsible for tens of thousands of Workflow Executions.
One Shard is useful only in small scale setups designed for testing, while 128k Shards is useful only in very large scale production environments.
The correct number of History Shards for any given Cluster depends entirely on the Temporal Application that it is supporting and the type of database.

A History Shard is represented as a hashed integer.
Each Workflow Execution is automatically assigned to a History Shard.
The assignment algorithm hashes Workflow Execution metadata such as Workflow Id and Namespace and uses that value to match a History Shard.

Each History Shard maintains the Workflow Execution Event History, Workflow Execution mutable state, and the following internal Task Queues:

- Internal Transfer Task Queue: Transfers internal tasks to the Matching Service.
  Whenever a new Workflow Task needs to be scheduled, the History Service's Transfer Task Queue Processor transactionally dispatches it to the Matching Service.
- Internal Timer Task Queue: Durably persists Timers.
- Internal Replicator Task Queue: Asynchronously replicates Workflow Executions from active Clusters to other passive Clusters.
  (Relies on the experimental Multi-Cluster feature.)
- Internal Visibility Task Queue: Pushes data to the [Advanced Visibility](/concepts/what-is-advanced-visibility) index.
