---
id: what-is-a-temporal-cluster
title: What is a Temporal Cluster?
sidebar_label: Temporal Cluster
description: A Temporal Cluster is the Temporal Server paired with persistence.
tags:
  - explanation
---

A Temporal Cluster is the Temporal Server paired with persistence.

- [How to quickly install the Temporal Cluster using Docker Compose](/docs/clusters/quick-install/#docker-compose)
- [How to deploy the Temporal Server to Kubernetes for testing and development](/docs/clusters/quick-install/#helm-charts)

### Temporal Server

The Temporal Server consists of four independently scalable services:

- Frontend gateway: for rate limiting, routing, authorizing
- History subsystem: maintains data (mutable state, queues, and timers)
- Matching subsystem: hosts Task Queues for dispatching
- Worker service: for internal background workflows

![A Temporal Cluster (Server + persistence)](/diagrams/temporal-cluster.svg)

For example, a real life production deployment can have 5 Frontend, 15 History, 17 Matching, and 3 Worker services per cluster.

The Temporal Server services can run independently or be grouped together into shared processes on one or more physical or virtual machines.
For live (production) environments we recommend that each service runs independently, as each one has different scaling requirements, and troubleshooting becomes easier.
The History, Matching, and Worker services can scale horizontally within a Cluster.
The Frontend Service scales differently than the others, because it has no sharding/partitioning, it is just stateless.

Each service is aware of the others, including scaled instances, through a membership protocol via [Ringpop](https://github.com/temporalio/ringpop-go).

#### Frontend Service

The Frontend Service is a stateless gateway service that exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto).
The Frontend Service is responsible for rate limiting, authorizing, validating, and routing all in-bound calls.

![Frontend Service](/diagrams/temporal-frontend-service.svg)

Types of inbound calls include the following:

- Domain CRUD
- External events
- Worker polls
- Visibility requests
- Admin operations via the CLI
- [Multi-cluster Replication](/docs/server/multi-cluster) related calls from a remote Cluster

Every inbound request related to a Workflow Execution must have a Workflow Id, which becomes hashed for routing purposes.
The Frontend Service has access to the hash rings that maintain service membership information, including how many nodes (instances of each service) are in the Cluster.

Inbound call rate limiting is applied per host and per namespace.

The Frontend service talks to the Matching service, History service, Worker service, the database, and Elasticsearch (if in use).

- It uses the grpcPort 7233 to host the service handler.
- It uses port 6933 for membership related communication.

#### History service

The History Service tracks the state of Workflow Executions.

![History Service](/diagrams/temporal-history-service.svg)

The History Service scales horizontally via individual shards, configured during the Cluster's creation.
The number of shards remains static for the life of the Cluster (so you should plan to scale and over-provision).

Each shard maintains data (routing Ids, mutable state) and queues.
A History shard maintains four types of queues:

- Transfer queue: transfers internal tasks to the Matching Service.
  Whenever a new Workflow Task needs to be scheduled, the History Service transactionally dispatches it to the Matching Service.
- Timer queues: durably persists Timers.
- Replicator queue: asynchronously replicates Workflow Executions from active Clusters to other passive Clusters (experimental Multi-Cluster feature).
- Visibility queue: pushes data to the visibility index (ElasticSearch).

The History service talks to the Matching Service and the Database.

- It uses grpcPort 7234 to host the service handler.
- It uses port 6934 for membership related communication.

#### Matching service

The Matching Service is responsible for hosting Task Queues for Task dispatching.

![Matching Service](/diagrams/temporal-matching-service.svg)

It is responsible for matching Workers to Tasks and routing new tasks to the appropriate queue.
This service can scale internally by having multiple instances.

It talks to the Frontend service, History service, and the database.

- It uses grpcPort 7235 to host the service handler.
- It uses port 6935 for membership related communication.

#### Worker service

The Worker Service runs background processing for the replication queue, system Workflows, and in versions older than 1.5.0, the Kafka visibility processor.

![Worker Service](/diagrams/temporal-worker-service.svg)

It talks to the Frontend service.

- It uses port 6939 for membership related communication.

### Database

The database provides storage for the system.

![Persistence](/diagrams/temporal-database.svg)

Cassandra, MySQL, and PostgreSQL schemas are supported and thus can be used as the Server's database.

The database stores the following types of data:

- Tasks: Tasks to be dispatched.
- State of Workflow Executions:
  - Execution table: A capture of the mutable state of Workflow Executions.
  - History table: An append only log of Workflow Execution History Events.
- Namespace metadata: Metadata of each Namespace in the Cluster.
- Visibility data: Enables operations like "show all running Workflow Executions".
  For production environments, we recommend using ElasticSearch.
