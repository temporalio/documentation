---
id: hello-world
title: Hello World Walkthrough in TypeScript
sidebar_label: Typescript
description: In this tutorial, we'll go over the different components that make up the Temporal Hello World code sample.
---

In this tutorial, we'll go over the different components that make up a Temporal project.
All of the code on this page is included in our Hello World sample, which we set up in our [Getting Started](/typescript/introduction/#getting-started) (we recommend [following along on GitPod](https://gitpod.io/#https://github.com/temporalio/samples-typescript/)).

The SDK steers developers to write their Workflows and Activities in TypeScript but vanilla JS is also supported.

### Activity

[@temporalio/activity API reference](https://typescript.temporal.io/api/namespaces/activity)

Activities are called from Workflows in order to run non-deterministic code.

Any async function can be used as an Activity as long as its parameters and return value are serializable.
Activities run in the Node.js execution environment, meaning you can easily port over any existing code into an Activity and it should work.

`src/activities.ts`

<!--SNIPSTART typescript-hello-activity {"enable_source_link": false}-->
```ts
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```
<!--SNIPEND-->

### Workflow

[@temporalio/workflow API reference](https://typescript.temporal.io/api/namespaces/workflow)

In the TypeScript SDK, each Workflow execution is run in a separate V8 isolate context in order to provide a [deterministic runtime](/typescript/determinism).

A Workflow is also an async function, but it has access to special Workflow APIs like [Signals](/concepts/what-is-a-signal), [Queries](/concepts/what-is-a-query), Timers, and Child Workflows.

The snippet below uses `proxyActivities` to create a function that, when called, schedules an Activity in the system.

`src/workflows.ts`

<!--SNIPSTART typescript-hello-workflow {"enable_source_link": false}-->
```ts
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```
<!--SNIPEND-->

### Worker

[@temporalio/worker API reference](https://typescript.temporal.io/api/namespaces/worker)

The Worker hosts Workflows and Activities, connects to Temporal Server, and continually polls a Task Queue for Commands coming from Clients (see below).
See the list of [WorkerOptions](https://typescript.temporal.io/api/interfaces/worker.workeroptions) for customizing Worker creation.

`src/worker.ts`

<!--SNIPSTART typescript-hello-worker {"enable_source_link": false}-->
```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'hello-world',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/docs/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `tutorial` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
<!--SNIPEND-->

### Client

[@temporalio/client API reference](https://typescript.temporal.io/api/namespaces/client)

The [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.workflowclient) class is used to interact with existing Workflows or to start new ones.

It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

`src/client.ts`

<!--SNIPSTART typescript-hello-client {"enable_source_link": false}-->
```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const connection = new Connection({
    // // Connect to localhost with default ConnectionOptions.
    // // In production, pass options to the Connection constructor to configure TLS and other settings:
    // address: 'foo.bar.tmprl.cloud', // as provisioned
    // tls: {} // as provisioned
  });

  const client = new WorkflowClient(connection.service, {
    // namespace: 'default', // change if you have a different namespace
  });

  const handle = await client.start(example, {
    args: ['Temporal'], // type inference works! args: [name: string]
    taskQueue: 'hello-world',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
<!--SNIPEND-->

### Testing

There is no official test suite for Workflows and Activities yet.

- Since Activities are async functions, they should be testable as long as you avoid using [Context](https://typescript.temporal.io/api/classes/activity.context) or are able to mock it.
- You can test Workflows by running them with a [WorkflowClient](https://typescript.temporal.io/api/classes/client.workflowclient).
- Check [the SDK's own tests](https://github.com/temporalio/sdk-typescript/tree/52f67499860526cd180912797dc3e6d7fa4fc78f/packages/test/src) for more examples.

## Next Steps

You should now be familiar with the Hello World project, which is the main way we encourage scaffolding out new projects.

Two paths from here:

- **Go Full Stack**: Integrate the manually-run Temporal Client scripts you have into an Express.js app, or serverless function.
  Our [Next.js Tutorial](/typescript/nextjs-tutorial) should help show you how to integrate with the frontend, and give indications on how to deploy.
- **Learn More**: Explore using Signals, Queries and Timers in our [Subscription Workflow tutorial](/typescript/subscription-tutorial/).
