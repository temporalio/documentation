---
id: system-architecture
title: System architecture
---

## Overview

Temporal is a highly scalable fault-oblivious stateful code platform. The fault-oblivious code is a next level of abstraction over commonly used techniques to achieve fault tolerance and durability.

A common Temporal-based application consists of a Temporal service, workflow and activity workers, and external clients.
Note that both types of workers as well as external clients are roles and can be collocated in a single application process if necessary.

## Temporal Service

![Temporal Overview](/img/docs/learn-topology-overview.png)

At the core of Temporal is a highly scalable multitentant service. The service exposes all its functionality through a strongly typed [Proto API](https://github.com/temporalio/temporal-proto/blob/master/workflowservice/service.proto).

Internally it depends on a persistent store. Currently, Apache Cassandra and MySQL stores are supported out of the box. For listing workflows using complex predicates, Elasticsearch cluster can be used.

Temporal service is responsible for keeping workflow state and associated durable timers. It maintains internal queues (called task queues) which are used to dispatch tasks to external workers.

Temporal service is multitentant. Therefore it is expected that multiple pools of workers implementing different use cases connect to the same service instance. For example, at Uber a single service is used by more than a hundred applications. At the same time some external customers deploy an instance of Temporal service per application. For local development, a local Temporal service instance configured through docker-compose is used.

![Temporal Overview](/img/docs/temporal-overview.svg)

## Workflow Worker

Temporal reuses terminology from _workflow automation_ namespace. So fault-oblivious stateful code is called workflow.

The Temporal service does not execute workflow code directly. The workflow code is hosted by an external (from the service point of view) _workflow worker_ process. These processes receive _decision tasks_ that contain events that the workflow is expected to handle from the Temporal service, delivers them to the workflow code, and communicates workflow _decisions_ back to the service.

As workflow code is external to the service, it can be implemented in any language that can talk service Thrift API. Currently Java and Go clients are production ready. While Python and C# clients are under development. Let us know if you are interested in contributing a client in your preferred language.

The Temporal service API doesn't impose any specific workflow definition language. So a specific worker can be implemented to execute practically any existing workflow specification. The model the Temporal team chose to support out of the box is based on the idea of durable function. Durable functions are as close as possible to application business logic with minimal plumbing required.

## Activity Worker

Workflow fault-oblivious code is immune to infrastructure failures. But it has to communicate with the imperfect external world where failures are common. All communication to the external world is done through activities. Activities are pieces of code that can perform any application-specific action like calling a service, updating a database record, or downloading a file from Amazon S3. Temporal activities are very feature-rich compared to queuing systems. Example features are task routing to specific processes, infinite retries, heartbeats, and unlimited execution time.

Activities are hosted by _activity worker_ processes that receive _activity tasks_ from the Temporal service, invoke correspondent activity implementations and report back task completion statuses.

## External Clients

Workflow and activity workers host workflow and activity code. But to create a workflow instance (an execution in Temporal terminology) the `StartWorkflowExecution` Temporal service API call should be used. Usually, workflows are started by outside entities like UIs, microservices or CLIs.

These entities can also:

- notify workflows about asynchronous external events in the form of signals
- synchronously query workflow state
- synchronously wait for a workflow completion
- cancel, terminate, restart, and reset workflows
- search for specific workflows using list API
