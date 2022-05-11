---
id: how-to-define-workflow-parameters-in-typescript
title: How to define workflow parameters in Typescript
sidebar_label: Define Workflow parameters
description: Define Workflow parameters
tags:
  - developer-guide
  - sdk
  - typescript
---

A Task Queue is a dynamic queue in Temporal polled by one or more Workers.

When scheduling a Workflow, a `taskQueue` must be specified.

```typescript
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection();
const client = new WorkflowClient();
const result = await client.execute(myWorkflow, {
  taskQueue: 'your-task-queue', // required
  workflowId: 'your-workflow-id', // required
});
```

When creating a Worker, you must pass the `taskQueue` option to the `Worker.create()` function.

```typescript
const worker = await Worker.create({
  activities, // imported elsewhere
  taskQueue: 'your-task-queue',
});
```

Optionally, in Workflow code, when calling an Activity, you can specify the Task Queue by passing the `taskQueue` option to `proxyActivities()`, `startChild`, or `executeChild`. If you do not specify a `taskQueue`, then the TypeScript SDK places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.
