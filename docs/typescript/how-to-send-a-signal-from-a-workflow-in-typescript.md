---
id: how-to-send-a-signal-from-a-workflow-in-typescript
title: How to send a Signal from Workflow in TypeScript
sidebar_label: Send a Signal from Workflow
description: Send a Signal from Workflow
tags:
  - developer-guide
  - sdk
  - typescript
---

[`getExternalWorkflowHandle`](https://typescript.temporal.io/api/namespaces/workflow#getexternalworkflowhandle)

```typescript
import { getExternalWorkflowHandle } from '@temporalio/workflow';
import { joinSignal } from './other-workflow';

export async function myWorkflowThatSignals() {
  const handle = getExternalWorkflowHandle('workflow-id-123');
  await handle.signal(joinSignal, { userId: 'user-1', groupId: 'group-1' });
}
```

Then send your Signal to the Workflow.

```typescript
await handle.signal(update, 300);
```

The following is the implemented code that sends a Signal from a Workflow.

```typescript
// Defining a signal that can be sent to the workflow.
const update = wf.defineSignal<number>('update');
// workflow
async function SubscriptionWorkflow(id: string, amount: number) {
  wf.setHandler(update, (newAmt) => (amount = newAmt));
  while (true) {
    await charge(id, amount);
    await sleepTilNextMonth();
  }
}
// from client
await handle.signal(update, 300);
```

Every month, a customer will be charged an amount specified by the update handler.
The update handler is a function that takes a number and returns a number. That number is used to update the amount the customer is charge.

