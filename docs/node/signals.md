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
const workflow = client.stub<Blocked>("blocked", {taskQueue: "test"});
await workflow.start();
await workflow.signal.unblock("some string");
```

### How to receive a Signal

Signal handlers can be either synchronous or asynchronous, in this example, our Signal handler only modifies a variable so its return type can be `void`. You may schedule and await async operations like Activities and Timers from a Signal handler in which case its return type would change to `Promise<void>`.

> Note that this example is a simplification of the recommended way to handle Signals [below](#triggers) since the Workflow cannot be cancelled unless it awaits a [cancellable operation](/docs/node/cancellation-scopes).

```ts
// implementation
import {Blocked} from "../interfaces";

let unblock: () => void;

const signals = {
  // Unblock main by resolving the awaited Promise
  unblock(): void {
    if (unblock !== undefined) {
      unblock();
    }
  },
};

async function main(): Promise<void> {
  // This Promise is resolved when the Workflow handles the unblock signal.
  await new Promise<void>((resolve, _reject) => {
    unblock = resolve;
  });
}

export const workflow: Blocked = {main, signals};
```

## Triggers

[Triggers](https://nodejs.temporal.io/api/classes/workflow.trigger) are a concept unique to the Temporal Node.js SDK.

Triggers, like Promises, can be awaited and expose a `then` method. Unlike Promises they are triggered when their `resolve` or `reject` methods are called.

`Trigger` is `CancellationScope`-aware. It is linked to the current scope on construction and throws when that scope is cancelled.

We can replace the callback with a Trigger in the example above to allow the Workflow to be cancelled:

<!--SNIPSTART nodejs-blocked-workflow-->
<!--SNIPEND-->
