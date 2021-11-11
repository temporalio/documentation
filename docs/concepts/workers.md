---
id: workers
title: Workers
sidebar_label: Workers
---

A Worker is a service that does the following:

- Hosts executable [Workflow](/docs/concepts/workflows) and/or [Activity](/docs/concepts/activities) code. (Either can be hosted independently)
- Listens to [Task Queues](/docs/concepts/task-queues) via long polling.

Workers must have access to any resources needed to execute the actions defined in Activities, such as the following:

- Network access for external API calls.
- Credentials for infrastructure provisioning.
- Specialized GPUs for machine learning utilities.

:::note

If you need to process work sequentially on the same machine, the Go SDK also offers a [Sessions API](https://docs.temporal.io/docs/go/sessions/).

:::

See example Worker code for:

- [Go SDK](/docs/go/how-to-develop-a-worker-program-in-go)
- [Java SDK](/docs/java/run-your-first-app-tutorial/#the-worker)
- [PHP SDK](/docs/php/workers)
- [TypeScript SDK](/docs/typescript/hello-world/#worker)

Note that [Temporal also supports a polyglot programming model](https://github.com/tsurdilo/temporal-polyglot) because you can start workflows by string name and send signals between workflows, including across namespace boundaries.
This means that workflows can be run independently of teams maintaining microservices in different languages.

## Workers are external to the Temporal Server

In our tutorials, we show you how to run both the Temporal Server and one Worker on the same machine for local development.

However, a typical production Temporal deployment will have a **fleet** of Workers external to the main Temporal Server cluster.
These can be independently managed by different developer teams, each registering their own sets of Workflows and Activities.

:::note

Temporal Server itself has [internal workers](https://docs.temporal.io/blog/workflow-engine-principles/#system-workflows-1910) for system workflows.
But this is not visible to the developer.

:::

## Workers can be encrypted in transit and at rest

The external nature of Workers works very well for data privacy concerns, because the Temporal Server (including our managed Temporal Cloud version) doesn't run any Workflow or Activity code on its machines.
It is solely responsible for orchestrating state transitions and dispatching messages to the next available Worker.

While data transferred in the event histories is [secured by mTLS](https://docs.temporal.io/docs/server/security/#encryption-of-network-traffic), by default, it is still readable at rest in the Temporal Server.

To solve this, Temporal SDKs offer a [Data Converter API](/docs/content/what-is-a-data-converter) that you can use to customize the serialization of data going out of and coming back in to a Worker, with the net effect of guaranteeing that the Temporal Server cannot read sensitive business data.
