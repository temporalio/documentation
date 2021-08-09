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

```ts
// interface
import {Workflow} from "@temporalio/workflow";
export interface Interruptable extends Workflow {
  main(): void;
  signals: {
    interrupt(reason: string): void;
  };
}
```

### How to send a Signal

You invoke a Signal with `workflow.signal.signalName(args)`. In the above case, we called our Signal `interrupt`, so we call `workflow.signal.interrupt("some string")`:

```ts
const client = new WorkflowClient();
const workflow = client.stub<Interruptable>("interrupt-signal", {
  taskQueue: "test",
});
await workflow.start();
await workflow.signal.interrupt("some string");
```

### How to receive a Signal

Signal handlers can return either `void` or `Promise<void>`. You may schedule Activities and Timers from a Signal handler.

```ts
// implementation
import {Interruptable} from "../interfaces";

let interrupt: (reason?: any) => void | undefined;

const signals = {
  // Interrupt main by rejecting the awaited Promise
  interrupt(reason: string): void {
    if (interrupt !== undefined) {
      interrupt(new Error(reason));
    }
  },
};

async function main(): Promise<void> {
  // When this Promise is rejected the Workflow execution will fail
  await new Promise<never>((_resolve, reject) => {
    interrupt = reject;
  });
}

export const workflow: Interruptable = {main, signals};
```

## Triggers

[Triggers](https://nodejs.temporal.io/api/classes/workflow.trigger) are a concept unique to the Temporal Node SDK. They allow you to wait for a Signal to be received. Inside the Signal, the Trigger is resolved, which allows the Workflow to continue, or rejected, which throws an error.

Triggers have a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-like API which exposes `resolve` and `reject` methods.

```ts
import {Trigger, CancelledError} from "@temporalio/workflow";
import {Blocked} from "../interfaces";

const unblocked = new Trigger<void>();

const signals = {
  unblock(): void {
    unblocked.resolve(); // Trigger exposes resolve method
  },
};

async function main(): Promise<void> {
  try {
    console.log("Blocked");
    await unblocked; // works because Trigger is Promise-like
    console.log("Unblocked");
  } catch (err) {
    if (!(err instanceof CancelledError)) {
      throw err;
    }
    console.log("Cancelled");
  }
}

export const workflow: Blocked = {main, signals};
```

`Trigger` is `CancellationScope`-aware. It is linked to the current scope on construction and throws when that scope is cancelled.
