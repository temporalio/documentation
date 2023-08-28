---
id: how-to-send-a-signal-with-start-in-typescript
title: How to send a Signal with Start in TypeScript
sidebar_label: Send a Signal with Start
description: Send a Signal with Start
tags:
  - developer-guide
  - sdk
  - typescript
---

[`WorkflowClient.signalWithStart`](https://typescript.temporal.io/api/classes/client.WorkflowClient#signalwithstart)

```typescript
import { Client } from '@temporalio/client';
import { joinSignal, yourWorkflow } from './workflows';

const client = new Client();

await client.workflow.signalWithStart(yourWorkflow, {
  workflowId: 'workflow-id-123',
  taskQueue: 'my-taskqueue',
  args: [{ foo: 1 }],
  signal: joinSignal,
  signalArgs: [{ userId: 'user-1', groupId: 'group-1' }],
});
```
