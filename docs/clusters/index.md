---
id: index
title: Temporal Cluster how-to guides
description: Temporal Cluster how-to guides.
---

- [What is a Temporal Cluster?](/docs/concepts/what-is-a-temporal-cluster)

- Read the [Server versions and dependencies](/docs/server/versions-and-dependencies) page to see which dependencies are supported with the version of the Server you are using.

### Running a Cluster

How and where you run a Cluster depends entirely on your use case, intended environment, and hosting infrastructure.

Choose from the following list to get started:

- [Quick installation for Temporal Application development](/docs/clusters/quick-install)
- [Deployment to a live (production) environment](/docs/server/production-deployment)

### Features

- [Namespaces](/docs/server/namespaces): Create basic logical separations within a Temporal cluster, or use Global Namespaces to enable failover across multi-cluster instances.
- [Security](/docs/server/security): Learn how to keep your self-hosted instance secure with encryption and pluggable auth protocols.
- [Advanced Workflow search](/docs/temporal-explained/visibility): Integrating Elasticsearch enables the use of customizable Search Attributes and complex search queries.
- Experimental features:
  - [Archival](/docs/server/archive-data): Want to back up your Workflow event history? You can with a cloud provider of your choice.
  - [Multi-cluster Replication](/docs/server/multi-cluster): Increase availability by asynchronously replicating workflows from an active cluster to other passive clusters.
