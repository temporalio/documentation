---
id: what-is-a-frontend-service
title: What is a Frontend Service?
description: The Frontend Service is a stateless gateway service that exposes a strongly typed Proto API. The Frontend Service is responsible for rate limiting, authorizing, validating, and routing all inbound calls.
sidebar_label: Frontend Service
tags:
  - term
---

The Frontend Service is a stateless gateway service that exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto).
The Frontend Service is responsible for rate limiting, authorizing, validating, and routing all inbound calls.

![Frontend Service](/diagrams/temporal-frontend-service.svg)

Types of inbound calls include the following:

- [Namespace](/concepts/what-is-a-namespace) CRUD
- External events
- Worker polls
- [Visibility](/concepts/what-is-visibility) requests
- [tctl](/tctl-v1) (the Temporal CLI) operations
- Calls from a remote Cluster related to [Multi-Cluster Replication](/concepts/what-is-multi-cluster-replication)

Every inbound request related to a Workflow Execution must have a Workflow Id, which is hashed for routing purposes.
The Frontend Service has access to the hash rings that maintain service membership information, including how many nodes (instances of each service) are in the Cluster.

Inbound call rate limiting is applied per host and per namespace.

The Frontend Service talks to the Matching Service, History Service, Worker Service, the database, and Elasticsearch (if in use).

- It uses the grpcPort 7233 to host the service handler.
- It uses port 6933 for membership-related communication.

Ports are configurable in the Cluster configuration.
