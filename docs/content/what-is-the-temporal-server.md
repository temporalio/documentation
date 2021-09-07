---
id: what-is-the-temporal-server
title: What is the Temporal Server?
description: The Temporal Server is a scalable multi-tenant entity made up of individually scalable services, that is capable of handling millions to billions of Workflows Executions concurrently.
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

The Temporal Server is a highly scalable multi-tenant system that is capable of tracking the state of millions to billions of Workflows Executions concurrently.

An instance of the Temporal Server is called a Cluster.
A Temporal Cluster consists of several services and a database.

<CenteredImage
imagePath="/diagrams/temporal-server-cluster.svg"
imageSize="75"
title="The Temporal Server (Cluster)"
/>

The processes can run independently or be grouped together into shared processes on one or more physical or virtual machines.
For live (production) environments we recommend that each service runs independently, as each one has different scaling requirements, and troubleshooting becomes easier.
A Temporal Cluster can scale in what is called [Multi-Cluster Replication].

<!-- TODO <RelatedReadList
readlist={[
["What is Multi-Cluster Replication", "/docs/content/what-is-multi-cluster-replication"]
]}
/> -->

<CenteredImage
imagePath="/diagrams/temporal-system-entity-relationship.svg"
imageSize="100"
title="The Temporal Server topology"
/>

Each service is aware of the others, including scaled instances, through a membership protocol.

### Frontend Service

The Frontend service exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto).

The Frontend service is responsible for all in-bound calls, including [Multi-cluster Replication](/docs/server/multi-cluster) related calls from a remote Cluster.

The Frontend service talks to the Matching service, History service, Worker service, and the database.

It uses the grpcPort 7233 to host the service handler.
It uses port 6933 for membership related communication with other hosts.

### History service

The History Service tracks the state of Workflow Executions.
Whenever a new Workflow Task needs to be scheduled, the History Server transactionally dispatches it to Matching via a transfer queue.

The History Service scales horizontally via individual shards, configured during the Cluster's creation and remains static for the life of the Cluster (so you should plan for scale and over-provision).

Each shard holds data (routing ID's, mutable state) and queues:
	- Transfer queue: Every time we do an update, we have to do a single transaction that updates the state of a workflow and creates a task to be dispatched
	- Timer queues: every time a Timer API is called, History creates a task to durably persist the timer
	- Replicator queue: only used for the experimental Multi-Cluster feature

It uses grpcPort 7234 to host the service handler.
It uses port 6934 for membership related communication.

### Matching service

The Matching Service is responsible for hosting Task Queues for Task dispatching.
It is responsible for matching Workers to Tasks and routing new tasks to the appropriate queue.
This service can scale internally by having multiple instances.

It talks to the Frontend service, History service, and the database.

It uses grpcPort 7235 to host the service handler.
It uses port 6935 for membership related communication.

### Worker service

The Worker Service runs background processing for the replication queue, system Workflows, and in versions older than 1.5.0, the Kafka visibility processor.

It talks to the Frontend service.

It uses grpcPort 7239 to host the service handler.
It uses port 6939 for membership related communication.

### Database

Cassandra, MySQL, and PostgreSQL schemas are supported and thus can be used as the Server's database.

The database stores:

 - **Tasks**: handling task dispatch
 - **Workflow state**:
	- **Execution** table: captures the mutable state tracked by Workflows
	- **History** table: an append only log of events
 - **Metadata**: for namespaces
 - **Visibility data**: driving operations like "show all open workflow executions". In production we recommend using ElasticSearch for high throughput usage.

<RelatedReadList
readlist={[
["How to quickly install the Temporal Server", "/docs/content/how-to-quickly-install-the-temporal-server", "developer guide"],
["How to deploy the Temporal Server to Kubernetes for testing and development", "how-to-deploy-temporal-to-kubernetes-for-testing-and-development", "developer guide"],
]}
/>
