---
id: what-is-the-temporal-server
title: What is the Temporal Server?
description: The Temporal Server is a scalable multi-tenant entity made up of individually scalable services, that is capable of handling millions to billions of Workflows Executions concurrently.
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

The Temporal Server is a highly scalable multi-tenant system that is capable of tracking the state of millions to billions of Workflows Executions concurrently.

An instance of the Temporal Server is a group of individually scalable services.
These processes can run independently or be grouped together into shared processes on one or more physical or virtual machines.
For live (production) environments we recommend that each service is running independently, as they have different scale out requirements and troubleshooting becomes easier.
The Temporal Server employs various sharding techniques to ensure internal scalability.
An instance of the Server is often referred to as a Cluster.

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

### Frontend Service

The Frontend service exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto).

The Frontend service is responsible for all in-bound calls, including [Multi-cluster Replication](/docs/server/multi-cluster) related calls that are invoked by a remote cluster.

It talks to the Matching service, History service, Worker service, and the database.

It uses the grpcPort 7233 to host the service handler.
It uses port 6933 for membership related communication with other hosts.

### History service

The History Service manages Workflow state transitions.
This service can scale internally by having multiple instances.

It talks to the Frontend service, Matching service, and the database.

It uses grpcPort 7234 to host the service handler.
It uses port 6934 for membership related communication.

### Matching service

The Matching Service is responsible for hosting Task Queues for Task dispatching.
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

The database stores Tasks, Workflow data, Events, and visibility data.

<RelatedReadList
readlist={[
["How to quickly install the Temporal Server", "/docs/content/how-to-quickly-install-the-temporal-server", "developer guide"],
["How to deploy the Temporal Server to Kubernetes for testing and development", "how-to-deploy-temporal-to-kubernetes-for-testing-and-development", "developer guide"],
]}
/>
