---
id: how-to-set-a-workflow-id-in-typescript
title: How to set a Workflow Id in Typescript
sidebar_label: Set a Workflow Id
description: Set a Workflow Id
tags:
  - developer-guide
  - sdk
  - typescript
---

You can set a Workflow Id in the Client of a Workflow.

```typescript
const handle = await client.start(example, {
  workflowId: 'yourWorkflowId',
  taskQueue: 'yourTaskQueue',
  args: ['your', 'arg', 'uments'],
});
```

This starts a new Client with the given Workflow Id, Task Queue name, and an argument.

```typescript
const handle = await client.start(example, {
  args: ['Temporal'], // type inference works! args: [name: string]
  taskQueue: 'your-task-queue',
  // in practice, use a meaningful business id, eg customerId or transactionId
  workflowId: 'your-workflow-id-',
});
```

Connect to a Client with `client.start()` and any arguments. Then specify your `taskQueue` and set your `workflowId` to a meaningful business identifier.
