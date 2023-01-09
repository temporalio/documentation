---
id: what-is-a-matching-service
title: What is a Matching Service?
description: The Matching Service is responsible for hosting external Task Queues for Task dispatching.
sidebar_label: Matching Service
tags:
  - term
---

The Matching Service is responsible for hosting user-facing [Task Queues](/concepts/what-is-a-task-queue) for Task dispatching.

![Matching Service](/diagrams/temporal-matching-service.svg)

It is responsible for matching Workers to Tasks and routing new Tasks to the appropriate queue.
This service can scale internally by having multiple instances.

It talks to the Frontend Service, History Service, and the database.

- It uses grpcPort 7235 to host the service handler.
- It uses port 6935 for membership related communication.

Ports are configurable in the Cluster configuration.
