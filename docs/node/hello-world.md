---
id: hello-world
title: Hello World Walkthrough in Node
sidebar_label: Hello World Walkthrough
---

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

The Node SDK and associated documentation is in an Alpha stage and may change at any time.

</CustomWarning>

In this tutorial, we'll go over the different components that make up a Temporal project.
All of the code on this page is included in our package initializer skeleton, which we set up in [Getting started](/docs/node/introduction/#getting-started).

The SDK steers developers to write their Workflows and Activities in TypeScript but vanilla JS is also supported.

### Activities

[API reference](https://nodejs.temporal.io/api/namespaces/activity)

Activities are called from Workflows in order to run non-deterministic code.

Any async function can be used as an Activity as long as its parameters and return value can be (de)serialized using a [DataConverter](https://nodejs.temporal.io/api/interfaces/common.DataConverter). Activities run in the Node.js execution environment, they can be cancelled and report heartbeats.

`src/activities.ts`

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflows

[API reference](https://nodejs.temporal.io/api/namespaces/workflow)

In the Node.js SDK, each Workflow execution is run in a separate V8 isolate context in order to provide a [deterministic runtime](/docs/node/determinism).

A Workflow is defined as an async function, in its body you may set listeners for processing [Signals](/docs/concepts/signals) and responding to [Queries](/docs/concepts/queries).

The snippet below uses `createActivityHandle` to create a function that, when called, schedules an Activity in the system.

`src/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

### Worker

[API reference](https://nodejs.temporal.io/api/namespaces/worker)

The Worker connects to Temporal Server and runs Workflows and Activities.
See the list of [WorkerOptions](https://nodejs.temporal.io/api/interfaces/worker.workeroptions) for customizing Worker creation.

`src/worker.ts`

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

### Client

[API reference](https://nodejs.temporal.io/api/namespaces/client)

The [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient) class is used to interact with existing Workflows or to start new ones.

It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

`src/exec-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

### Testing

There is no official test suite for Workflows and Activities yet.

- Since Activities are async functions, they should be testable as long as you avoid using [Context](https://nodejs.temporal.io/api/classes/activity.context) or are able to mock it.
- You can test Workflows by running them with a [WorkflowClient](https://nodejs.temporal.io/api/classes/client.workflowclient).
- Check [the SDK's own tests](https://github.com/temporalio/sdk-node/tree/52f67499860526cd180912797dc3e6d7fa4fc78f/packages/test/src) for more examples.
