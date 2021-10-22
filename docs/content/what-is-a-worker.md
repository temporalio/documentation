---
id: what-is-a-worker
title: What is a Worker?
description: A Worker Process is responsible for listening on a Task Queue, dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Server with the results.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'
import CenteredImage from "../components/CenteredImage.js"

> In day-to-day conversations, the term Worker is used to denote both a Worker Program and a Worker Process.
Temporal documentation aims to be explicit and differentiate between them.

<CenteredImage
imagePath="/diagrams/worker-and-server-component.svg"
title="Component diagram of a Worker Process and the Temporal Server"
/>

A Worker Process is responsible for polling a [Task Queue](/docs/content/what-is-a-task-queue), dequeueing a [Task](/docs/content/what-is-a-task), executing your code in response to a Task, and responding to the [Temporal Server](#) with the results.

:::note Formal definition

More formally, a Worker Process is any process that implements the [Task Queue Protocol](#) and the [Task Execution Protocol](#):

- A Worker Process is a Workflow Worker Process if that process implements the [Workflow Task Queue Protocol](#) and executes the [Workflow Task Execution Protocol](#) to make progress on a [Workflow Execution](#).
  A Workflow Worker Process can listen on an arbitrary number of Workflow Task Queues and can execute an arbitrary number of Workflow Tasks.
- A Worker Process is an Activity Worker Process if that process implements the [Activity Task Queue Protocol](#) and executes the [Activity Task Processing Protocol](#) to make progress on an [Activity Execution](#).
  An Activity Worker Process can listen on an arbitrary number of Activity Task Queues and can execute an arbitrary number of Activity Tasks.

:::

Temporal application developers are responsible for developing and operating Worker Processes.
An application can have as many Worker Processes as needed to meet scalability and reliability requirements.

A Worker Process can be both a Workflow Worker Process and an Activity Worker Process.

<CenteredImage
imagePath="/diagrams/worker-and-server-entity-relationship.svg"
imageSize="100"
title="Entity relationship diagram (meta model) of Worker Processes, Task Queues, and Tasks"
/>

<RelatedReadList
readlist={[
["How to develop a Worker Program in Go","/docs/go/how-to-develop-a-worker-program-in-go", "developer guide"],
["How to develop a Worker Program in Java","/docs/content/how-to-develop-a-worker-program-in-java","developer guide"],
["How to develop a Worker Program in TypeScript","/docs/content/how-to-develop-a-worker-program-in-typescript","developer guide"],
["How to develop a Worker Program in PHP","/docs/content/how-to-develop-a-worker-program-in-php","developer guide"],
]}
/>

<!-- TODO
["What is a Task","#","explanation"],
["What is a Task Queue","#","explanation"],
["How to operate Worker Processes","#","operation guide"], -->

Workers must have access to any resources needed to execute the actions defined in Activities, such as the following:

- Network access for external API calls.
- Credentials for infrastructure provisioning.
- Specialized GPUs for machine learning utilities.




See example Worker code for:

- [Go SDK](/docs/go/workers)
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
