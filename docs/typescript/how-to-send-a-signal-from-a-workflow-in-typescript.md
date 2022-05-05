---
id: how-to-send-a-signal-from-a-workflow-in-typescript
title: How to send a Signal from Workflow in Typescript
sidebar_label: Send a Signal from Workflow
description: Send a Signal from Workflow
tags:
  - developer-guide
  - sdk
  - typescript
---

First, define your Signal that can be sent to the Workflow.

```typescript
const update = wf.defineSignal<number>('update');
```

Then create your Workflow. In this example, our Worklfow charges a user every month.

```typescript
async function SubscriptionWorkflow(id: string, amount: number) {
  wf.setHandler(update, (newAmt) => (amount = newAmt));
  while (true) {
    await charge(id, amount);
    await sleepTilNextMonth();
  }
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
The update handler is a function that takes a number and returns a numer. That number is used to update the amount the customer is charge.
