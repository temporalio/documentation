---
id: what-is-the-temporal-server
title: What is the Temporal Server?
sidebar_label: Temporal Server
description: The Temporal Server is a grouping of four horizontally scalable services.
tags:
  - explanation
---

The Temporal Server consists of four independently scalable services:

- Frontend gateway: for rate limiting, routing, authorizing
- History subsystem: maintains data (mutable state, queues, and timers)
- Matching subsystem: hosts Task Queues for dispatching
- Worker service: for internal background workflows

For example, a real-life production deployment can have 5 Frontend, 15 History, 17 Matching, and 3 Worker services per cluster.

The Temporal Server services can run independently or be grouped together into shared processes on one or more physical or virtual machines.
For live (production) environments, we recommend that each service runs independently, because each one has different scaling requirements and troubleshooting becomes easier.
The History, Matching, and Worker services can scale horizontally within a Cluster.
The Frontend Service scales differently than the others because it has no sharding or partitioning; it is just stateless.

Each service is aware of the others, including scaled instances, through a membership protocol via [Ringpop](https://github.com/temporalio/ringpop-go).

#### Versions and support

All Temporal Server releases abide by the [Semantic Versioning Specification](https://semver.org/).

Fairly precise upgrade paths and support have been established starting from Temporal `v1.7.0`.

We provide maintenance support for previously published minor and major versions by continuing to release critical bug fixes related to security, the prevention of data loss, and reliability, whenever they are found.

We aim to publish incremental upgrade guides for each minor and major version, which include specifics about dependency upgrades that we have tested for (such as Cassandra 3.0 -> 3.11).

We offer maintenance support of the last three **minor** versions after a release and do not plan to "backport" patches beyond that.

We offer maintenance support of **major** versions for at least 12 months after a GA release, and we provide at least 6 months' notice before EOL/deprecating support.

#### Dependencies

Temporal offers official support for, and is tested against, dependencies with the exact versions described in the `go.mod` file of the corresponding release tag.
(For example, [v1.5.1](https://github.com/temporalio/temporal/tree/v1.5.1) dependencies are documented in [the go.mod for v1.5.1](https://github.com/temporalio/temporal/blob/v1.5.1/go.mod).)

#### Frontend Service

The Frontend Service is a stateless gateway service that exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto).
The Frontend Service is responsible for rate limiting, authorizing, validating, and routing all inbound calls.

![Frontend Service](/diagrams/temporal-frontend-service.svg)

Types of inbound calls include the following:

- Domain CRUD
- External events
- Worker polls
- Visibility requests
- Admin operations via [tctl](/tctl) (the Temporal CLI)
- Calls from a remote Cluster related to [Multi-Cluster Replication](/concepts/what-is-multi-cluster-replication)

Every inbound request related to a Workflow Execution must have a Workflow Id, which is hashed for routing purposes.
The Frontend Service has access to the hash rings that maintain service membership information, including how many nodes (instances of each service) are in the Cluster.

Inbound call rate limiting is applied per host and per namespace.

The Frontend service talks to the Matching service, History service, Worker service, the database, and Elasticsearch (if in use).

- It uses the grpcPort 7233 to host the service handler.
- It uses port 6933 for membership-related communication.

#### History service

The History Service tracks the state of Workflow Executions.

![History Service](/diagrams/temporal-history-service.svg)

The History Service scales horizontally via individual shards, configured during the Cluster's creation.
The number of shards remains static for the life of the Cluster (so you should plan to scale and over-provision).

Each shard maintains data (routing identifiers, mutable state) and queues.
A History shard maintains four types of queues:

- Transfer queue: transfers internal tasks to the Matching Service.
  Whenever a new Workflow Task needs to be scheduled, the History Service transactionally dispatches it to the Matching Service.
- Timer queues: durably persists Timers.
- Replicator queue: asynchronously replicates Workflow Executions from active Clusters to other passive Clusters (experimental Multi-Cluster feature).
- Visibility queue: pushes data to the visibility index (Elasticsearch).

The History service talks to the Matching Service and the Database.

- It uses grpcPort 7234 to host the service handler.
- It uses port 6934 for membership-related communication.

#### Matching service

The Matching Service is responsible for hosting Task Queues for Task dispatching.

![Matching Service](/diagrams/temporal-matching-service.svg)

It is responsible for matching Workers to Tasks and routing new Tasks to the appropriate queue.
This service can scale internally by having multiple instances.

It talks to the Frontend service, History service, and the database.

- It uses grpcPort 7235 to host the service handler.
- It uses port 6935 for membership related communication.

#### Worker service

The Worker Service runs background processing for the replication queue, system Workflows, and (in versions older than 1.5.0) the Kafka visibility processor.

![Worker Service](/diagrams/temporal-worker-service.svg)

It talks to the Frontend service.

- It uses port 6939 for membership-related communication.
