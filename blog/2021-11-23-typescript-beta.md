---
tags:
  - Temporal
  - TypeScript
posted_on_: 2021-11-23T00:00:09Z
slug: typescript-beta
title: Introducing the Temporal TypeScript SDK
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.13.0
---

After 493 commits, hundreds of user questions, and a year of active research and development, we are excited to announce the public beta of [our TypeScript SDK](https://temporal.io/ts)!

<!--truncate-->

## Bottom Line Up Front

The Temporal TypeScript SDK lets you write highly scalable and reliable long-running workflows without being a distributed systems expert. It is designed with TypeScript-first developer experience in mind, but works equally well with JavaScript. 

- Docs: [https://temporal.io/ts](https://temporal.io/ts)
- [SDK source on GitHub](https://github.com/temporalio/sdk-typescript)  (give us a star!)

You can get started by: 

- running `npx @temporalio/create@latest` if you prefer developing locally with Docker, or 
- using our [prebuilt Gitpod environment](https://gitpod.io/#https://github.com/temporalio/samples-typescript/) for cloud development.
 
The minimum Node.js version is 14 but we recommend using 16.4.1 and up.

When you spin up a project, you will notice a single `temporalio` dependency, which actually bundles 4 other dependencies you will use:

- `@temporalio/workflow` for Workflow APIs
- `@temporalio/activity` for Activity APIs
- `@temporalio/worker` for Worker APIs
- `@temporalio/client` for Client APIs

These represent the 4 core APIs you need to know to be productive with Temporal.

## Workflows and Workflow APIs

Workflows are async functions that can orchestrate Activities and access special Workflow APIs, subject to deterministic limitations. They start as "just functions":

```tsx
export async function exampleWorkflow(name: string) {
  return `Hello ${name}`;
}
```

To do anything interesting like calling activities or setting timers, you need to import our Workflow APIs as the `@temporalio/workflow` package.

```tsx
import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

// explained later
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function exampleWorkflow(name: string) {
  greet(`Hello ${name}, see you in a month`); // call activity
  sleep('30 days'); // set durable timer
  greet(`Hi again, ${name}!`);
}
```

The full Workflow and Workflow API docs are [here](https://docs.temporal.io/typescript/workflows).

## Activities

Activities are the only way to interact with external resources in Temporal, such as making an HTTP request or accessing the file system. They also start as "just functions":

```tsx
export async function greet(text: string): {
  console.log(text);
}
```

Activities run in the standard Node.js environment with none of the Workflow restrictions. For the most part this means you can safely copy-paste over existing Node.js code. The primary benefit is the robust system of retries and timeouts you get when doing so. When Activities are called inside Workflows, you can declaratively set retries and timeouts that set clear boundaries around Activity reliability:

```tsx
// Sample of typical options you can set
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30s', // recommended
  scheduleToCloseTimeout: '5m', // useful
  retry: {
    // default retry policy if not specified
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: 100 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});
```

The full Activity docs are [here](https://docs.temporal.io/typescript/activities) - there are a few more [Context utility](https://docs.temporal.io/typescript/activities#activity-context-utilities) functions exposed as `@temporalio/activity`.

## Workers

A Worker is a process that connects to the Temporal Server, polls for Tasks sent from Clients, and executes **[Workflows](https://docs.temporal.io/typescript/workflows)** and **[Activities](https://docs.temporal.io/typescript/activities)** in response. An application can have as many Worker Processes as needed to meet scalability and reliability requirements.

A standard Worker looks like this:

```tsx
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'tutorial',
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

The full Worker docs are [here](https://docs.temporal.io/typescript/workers). In production, you will also want to [prebundle your Workflows](https://docs.temporal.io/typescript/production-deploy/#pre-build-code) and [configure connection strings and security options](https://docs.temporal.io/typescript/security#encryption-in-transit-with-mtls).

## Client

Workflow Clients are embedded in your application code (even including serverless Next.js API Routes), and connect to Temporal Server via gRPC. They are the only way to schedule new Workflow Executions with Temporal Server.

```tsx
import { WorkflowClient } from '@temporalio/client';
import { exampleWorkflow } from './workflows';

const client = new WorkflowClient();
const handle = await client.start(exampleWorkflow, {
  workflowId: 'business-meaningful-id',
  taskQueue: 'tutorial',
  args: ['foo', 'bar', 'baz'], // this is typechecked
});
```

The full Client docs are [here](https://docs.temporal.io/typescript/clients). 

## Next Steps

The 4 concepts of Workflow, Activity, Worker, and Client are a simple but powerful way to break down any distributed system design that you may need. 

- If you would like to run code and understand this yourself, check [our Hello World tutorial](https://docs.temporal.io/typescript/hello-world).
- If you prefer a long form, guided Workshop with Q&A, [join our upcoming Intro Workshop on Nov 30](https://lu.ma/temporalintro)!

> 2022 Edit - The workshop recording is up on YouTube!!

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=CeHSmv8oF_4' />
