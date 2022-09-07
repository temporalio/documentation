---
id: what-is-a-history-service
title: What is a History Service?
description: The History Service is responsible for persisting Workflow Execution state and determining what to do next to progress the Workflow Execution through History Shards.
sidebar_label: History Service
tags:
  - term
---

The History Service is responsible for persisting Workflow Execution state and determining what to do next to progress the Workflow Execution through [History Shards](/concepts/what-is-a-history-shard).

![History Service](/diagrams/temporal-history-service.svg)

The total number of History Services may increase between 1 and the total number of History Shards.
Additionally an individual History Service can support a large number of History Shards.
Temporal recommends starting at a ratio of 1 History Service for each 500 History Shards.

While the total number of History Shards remains static for the life of the Cluster the number of History Services can change.

The History Service talks to the Matching Service and the database.

- It uses grpcPort 7234 to host the service handler.
- It uses port 6934 for membership-related communication.
