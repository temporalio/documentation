---
id: task-queues
title: Task Queues in Node
sidebar_label: Task Queues
---

## What is a Task Queue?

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/java/workflows"
workerLink="/docs/java/workers"
/>

## How to use Task Queues

In Node, a Task Queue is represented in code by name, as a `string`.
There are 3 places where the name of the Task Queue is supplied by the developer.

1. When starting a Workflow, you must pass the `taskQueue` option to the [Connection's `workflow()` method](https://nodejs.temporal.io/api/classes/client.connection#workflow).

```typescript
const workflow = connection.workflow("my-workflow", {
  taskQueue: "my-task-queue",
});

const result = await workflow.start();
```

2. When creating a Worker, you must pass the `taskQueue` option to the [`Worker.create()` function](https://nodejs.temporal.io/api/classes/worker.worker-1#create).

```typescript
const worker = await Worker.create({
  workDir: __dirname,
  taskQueue: "my-task-queue",
});
```

3. Optionally, when calling an Activity, you can specify the task queue by passing the `taskQueue` option to `Context.configure()`. If you do not specify a `taskQueue`, then the Node SDK places Activity Tasks in the same Task Queue as the Workflow Task Queue.

```typescript
import {Context} from "@temporalio/workflow";
import {greet} from "@activities/greet";

const greetWithCustomTaskQueue = Context.configure(greet, {
  taskQueue: "my-other-task-queue",
  startToCloseTimeout: "1s",
});

async function main(): Promise<void> {
  await greetWithCustomTaskQueue("World");
}

export const workflow = {main};
```
