---
id: what-is-the-temporal-server
title: What is the Temporal Server?
sidebar_label: Temporal Server
description: The Temporal Server is a grouping of four horizontally scalable services.
tags:
  - term
  - explanation
---

The Temporal Server consists of four independently scalable services:

- Frontend gateway: for rate limiting, routing, authorizing.
- History subsystem: maintains data (mutable state, queues, and timers).
- Matching subsystem: hosts Task Queues for dispatching.
- Worker Service: for internal background Workflows.

For example, a real-life production deployment can have 5 Frontend, 15 History, 17 Matching, and 3 Worker Services per cluster.

The Temporal Server services can run independently or be grouped together into shared processes on one or more physical or virtual machines.
For live (production) environments, we recommend that each service runs independently, because each one has different scaling requirements and troubleshooting becomes easier.
The History, Matching, and Worker Services can scale horizontally within a Cluster.
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
