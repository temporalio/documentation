---
id: workers
title: Workers
sidebar_label: Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Worker is a service that:

- hosts (registers) [Workflows](/docs/concepts/workflows) and [Activities](/docs/concepts/activities)
- listens to [Activity Task Queues](/docs/concepts/task-queues) by long polling

Workers should have access to the resources needed to perform the activities they implement, for example:

- network access for external API calls
- credentials for infrastructure provisioning
- specialized GPUs for machine learning tasks


> Note: if you need to process stateful work sequentially on the same machine, the Go SDK also offers a [Sessions API](https://docs.temporal.io/docs/go/sessions/).

See example Worker code for:

- [Go SDK](docs/go/workers)
- [Java SDK](docs/java/run-your-first-app-tutorial#the-worker)
- [PHP SDK](docs/php/workers)
- [Node SDK](docs/node/hello-world#worker)

## Workers are external to Temporal Server

In our tutorials, we show you how to run both the Temporal Server and one Worker on the same machine for local development.

However, a typical production Temporal deployment will have a **fleet** of Workers external to the main Temporal Server cluster. 
These can be independently managed by different developer teams, each registering their own sets of workflows and activities.

[![https://user-images.githubusercontent.com/6764957/113587567-8c9c9c00-9661-11eb-8614-576a68caa8f1.png](https://user-images.githubusercontent.com/6764957/113587567-8c9c9c00-9661-11eb-8614-576a68caa8f1.png)](https://docs.temporal.io/blog/workflow-engine-principles)

> Note: Temporal Server itself has [internal workers](https://docs.temporal.io/blog/workflow-engine-principles/#system-workflows-1910) for system workflows. 
> But this is not visible to the developer.

## Workers can be encrypted in transit and at rest

The external nature of workers works very well for data privacy concerns, because Temporal Server (including our managed Temporal Cloud version) doesn't run any Workflow or Activity code on its machines. 
It is solely responsible for orchestrating state transitions and dispatching messages to the next available Worker. 

While data transferred in the event histories is [secured by mTLS](https://docs.temporal.io/docs/server/security/#encryption-of-network-traffic), by default, it is still readable at rest in Temporal Server. 

Temporal offers a [Data Converter API](https://docs.temporal.io/docs/java/activities/#activity-interface) to solve this - you can customize the serialization of data going out of and coming back in to a Worker, with the net effect of guaranteeing that Temporal Server cannot read sensitive business data.
