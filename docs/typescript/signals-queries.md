---
id: signals-queries
title: Signals and Queries in Node
sidebar_label: Signals and Queries
---

[**Signals**](/docs/concepts/signals) are a way to send data IN to a running Workflow.

- If a Workflow isn't running when a Signal is sent, we can send a `signalWithStart` to start a Workflow and send a Signal simultaneously.

[**Queries**](/docs/concepts/queries) are a way to read data OUT from a running Workflow.

- If a Query is made to a completed Workflow, the final value is returned.

## Signals

import WhenToSignals from '../content/when-to-use-signals.md'

<WhenToSignals />

### How to use Signals

#### How to define a Signal

To add Signal handlers to a Workflow, add a `signals` property to the exported Workflow object:

<!--SNIPSTART nodejs-blocked-interface-->
<!--SNIPEND-->

#### How to send a Signal

You invoke a Signal with `workflow.signal.signalName(...args)`. In the above case, we called our Signal `unblock`, so we call `workflow.signal.unblock()`:

```ts
const client = new WorkflowClient();
const workflow = client.createWorkflowHandle(unblockWithSignal, {
  taskQueue: 'test',
});
await workflow.start();
await workflow.signal.unblock();
```

`workflow.signal.unblock('some string')` resolves when Temporal Server has persisted receipt of the Signal, before the Workflow's Signal handler is called. Signal handlers cannot return data to the caller.

### How to send a Signal and start a Workflow simultaneously

If you're not sure if a Workflow is running, you can `signalWithStart` a Workflow to send it a Signal and optionally start the Workflow if it is not running.

```ts
// Signal With Start
const client = new WorkflowClient();
let workflow = client.createWorkflowHandle(
  interruptSignal, // which Workflow to start
  { taskQueue: 'test' }
);
await workflow.signalWithStart(
  'interrupt', // which Signal to send
  ['interrupted from signalWithStart'], // arguments to send with Signal
  [] // arguments to start the Workflow if needed
);
//

// `interruptSignal` Workflow implementation with `interrupt` signal
let interrupt: (reason?: any) => void | undefined;

const signals = {
  // Interrupt execute by rejecting the awaited Promise
  interrupt(reason: string): void {
    if (interrupt !== undefined) {
      interrupt(new Error(reason));
    }
  },
};

async function execute(): Promise<void> {
  // When this Promise is rejected the Workflow execution will fail
  await new Promise<never>((_resolve, reject) => {
    interrupt = reject;
  });
}

export const interruptSignal = () => ({ execute, signals });
```

### How to receive a Signal

Signal handlers should either have a `void` return type, like in the below example, or a `Promise<void>` return type for `async` handlers (you may want to `await` async operations like Activities and Timers).

> Note that this example is a simplification of the recommended way to handle Signals (see [Triggers](#triggers) section below) since the Workflow cannot be cancelled unless it awaits a [cancellable operation](/docs/node/cancellation-scopes).

```ts
import { Blocked } from '../interfaces';

export const unblockWithSignal: Blocked = () => {
  let blocked = true;
  let unblock: () => void;

  return {
    signals: {
      // Unblock execute by resolving the awaited Promise
      unblock(): void {
        if (unblock !== undefined) {
          unblock();
        }
      },
    },
    queries: {
      isBlocked(): boolean {
        return blocked;
      },
    },
    async execute(): Promise<void> {
      // This Promise is resolved when the Workflow handles the unblock signal.
      await new Promise<void>((resolve, _reject) => {
        unblock = resolve;
      });
      blocked = false;
    },
  };
};
```

## Triggers

[Triggers](https://nodejs.temporal.io/api/classes/workflow.trigger) are a concept unique to the Temporal Node.js SDK.

Triggers, like Promises, can be awaited and expose a `then` method. Unlike Promises they are triggered when their `resolve` or `reject` methods are called.

`Trigger` is `CancellationScope`-aware. It is linked to the current scope on construction and throws when that scope is cancelled.

We can replace the callback with a Trigger in the example above to allow the Workflow to be cancelled:

<!--SNIPSTART nodejs-blocked-workflow-->
<!--SNIPEND-->

## Queries

### How to define a Query

To add Query handlers to a Workflow, add a `queries` property to the exported Workflow object:

<!--SNIPSTART nodejs-blocked-interface-->
<!--SNIPEND-->

### How to handle a Query

Query handlers can return any value.

> 🚨 WARNING: NEVER mutate Workflow state inside a query! This would be a source of non-determinism.

<!--SNIPSTART nodejs-blocked-workflow-->
<!--SNIPEND-->

:::danger How NOT to write a Query

This mutates Workflow state - do not do this:

```ts
export const unblockOrCancel: Blocked = () => {
  let blocked = true;
  let someState = 123;

  return {
    queries: {
      isBlocked(): boolean {
        someState++; // bad! don't do this!
        return blocked;
      },
    },
    // ...
  };
};
```

:::

### How to make a Query

> NOTE: You may query both running and completed Workflows.

Use the name of the function you defined:

```ts
const client = new WorkflowClient();
const workflow = client.createWorkflowHandle(unblockOrCancel, {
  taskQueue: 'test',
});
await workflow.start();
await workflow.query.isBlocked(); // this gets data out of the Workflow
```
