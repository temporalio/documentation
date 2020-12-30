---
id: server-architecture
title: Temporal Server architecture
sidebar_label: Architecture
---

## Overview

The Temporal Server is highly scalable and multi-tenant, capable of running millions of Workflows simultaneously.
It employs various sharding techniques to ensure scalability internally.
And it is capable of scaling horizontally by running multiple instances on multiple hosts.

The Server itself does not execute application code, but instead tracks the state of it using queues, timers, and a database.

<iframe allowfullscreen frameborder="0" width="100%" height="480px" src="https://lucid.app/documents/embeddedchart/b1d350aa-356f-476d-81e6-c805b5554686" id="QuZ1jPEWw4pf"></iframe>

## Server topology

The "Server" itself is actually a cluster of four services and a database.

<iframe allowfullscreen frameborder="0" width="100%" height="500px;" src="https://lucid.app/documents/embeddedchart/c28dc028-1a34-40e7-b785-f77622eb9a84" id="d0K15Ag98G_7"></iframe>

Instances of the Server can run as independent processes or be grouped together into shared processes on one or more physical or virtual machines. But for live environments make sure each service is running independently, as they each have different scale out requirements and troubleshooting becomes easier.

### Frontend service

The Frontend service exposes a strongly typed [Proto API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto) that is used by applications to connect to the Server.

The Frontend service is responsible for all in-bound calls, including cross-dc related calls that are invoked by a remote cluster.

It talks to the Matching service, History service, Worker service, and the database.

It uses the grpcPort 7233 to host the service handler.
It uses port 6933 for membership related communication with other hosts.

### History service

The History service manages Workflow state transitions.
This service can scale internally by having multiple instances.

It talks to the Frontend service, Matching service, and the database.

It uses grpcPort 7234 to host the service handler.
It uses port 6934 for membership related communication.

### Matching service

The Matching service is responsible for hosting Task Queues for Task dispatching.
This service can scale internally by having multiple instances.

It talks to the Frontend service, History service, and the database.

It uses grpcPort 7235 to host the service handler.
It uses port 6935 for membership related communication.

### Worker service

The Worker service runs background processing for the replication queue, system Workflows, and in versions older than 1.5.0, the Kafka visibility processor.

It talks to the Frontend service.

It uses grpcPort 7239 to host the service handler.
It uses port 6939 for membership related communication.

### Database

Cassandra, MySQL, and PostgreSQL schemas are supported and thus can be used as the Server's database.

The database stores Tasks, Workflow data, Events, and visibility data.

<iframe allowfullscreen frameborder="0" width="100%" height="250px" src="https://lucid.app/documents/embeddedchart/e88c7cca-b93e-48e0-a510-3ee77efad54e" id="hqZ1EgnXOpUk"></iframe>
