---
id: signals
title: Signals in Node
sidebar_label: Signals
---

## What is a Signal?

**Signals** provide a mechanism to send data directly into a running Workflow.

## When to use Signals

import WhenToSignals from '../content/when-to-use-signals.md'

<WhenToSignals />

## How to use Signals

### How to define a Signal

To add Signal handlers to a Workflow, add a `signals` property to the exported Workflow object:

<!--SNIPSTART nodejs-blocked-interface-->
<!--SNIPEND-->

### How to send a Signal

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
