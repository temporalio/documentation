---
id: what-is-a-history-service
title: What is a History Service?
description: The History Service is responsible for persisting Workflow Execution state and determining what to do next to progress the Workflow Execution through History Shards.
sidebar_label: History Service
tags:
  - term
---

The History Service is responsible for persisting Workflow Execution state to the Workflow History.
When the Workflow Execution is able to progress, the History Service adds a Task with the Workflow's updated history to the Task Queue.
From there, a Worker can poll for work, receive this updated history, and resume execution.

![Block diagram of how the History Service relates to the other services of the Temporal Server and to a Temporal Cluster](/diagrams/temporal-history-service.svg)

The total number of History Service processes can be between 1 and the total number of [History Shards](/concepts/what-is-a-history-shard).
An individual History Service can support many History Shards.
Temporal recommends starting at a ratio of 1 History Service process for every 500 History Shards.

Although the total number of History Shards remains static for the life of the Cluster, the number of History Service processess can change.

The History Service talks to the Matching Service and the database.

- It uses grpcPort 7234 to host the service handler.
- It uses port 6934 for membership-related communication.

Ports are configurable in the Cluster configuration.
