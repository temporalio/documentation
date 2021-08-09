---
id: workers
title: Workers in Node
sidebar_label: Workers
---

## What is a Worker?

A Worker is an object that connects to the Temporal Server and executes Workflows and [Activities](/docs/node/activities) from [Task Queues](/docs/node/task-queues).
Workers are run on user-controlled hosts.
You can use the `@temporalio/worker` package's `Worker` class to create and run as many Workers as your use case demands, across any number of hosts.

Workers poll [Task Queues](/docs/node/task-queues) for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.

As a developer, running Workers is a fairly simple procedure because the Node SDK handles all of the communication between the Worker and the Temporal Server behind the scenes.

## How to start a Worker

To start a Worker, you need to pass the following two options to the `Worker.create()` function:

1. The `workDir`. The Node SDK will automatically register:

- Activities from any `.js` files in `workDir + '/../activities'`
- Workflows from any `.js` files in `workDir + '/../workflows'`

2. The `taskQueue` the Worker should poll.

Below is an example of starting a Worker that polls the Task Queue named 'tutorial'.

```typescript
import {Worker} from "@temporalio/worker";

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

async function main() {
  const worker = await Worker.create({
    workDir: __dirname,
    taskQueue: "test",
  });
  await worker.run();
}
```

In the above example, the Node SDK will look for `.js` files in `../workflows` that export a `workflow` property, and register their `main` property as Workflows.
For example, suppose `../workflows/example.js`, relative to `workDir`, contains the below code.

```typescript
async function main(): Promise<string> {
  return "Hello, World!";
}

export const workflow = {main};
```

The `Worker.create()` call will automatically register a Workflow named 'example' that returns the string 'Hello, World'.
