---
id: signals-queries
title: Signals and Queries in Node
sidebar_label: Signals and Queries
---

<details>
<summary>
  <a href="/docs/concepts/signals">Signals</a> are a way to send data IN to a running Workflow.
</summary>

import WhenToSignals from '../content/when-to-use-signals.md'

<WhenToSignals />

</details>

<details>
<summary>
  <a href="/docs/concepts/queries">Queries</a> are a way to read data OUT from a running Workflow.
</summary>

- Queries can receive arguments, and return data, but must not mutate Workflow state.
- If a Query is made to a completed Workflow, the final value is returned.

</details>

Signals and Queries are almost always used together.
If you wanted to send data in while a Workflow is running, you probably will want to read data out.

## How to define and receive Signals and Queries

- To add a Signal to a Workflow, call `defineSignal` with a name, and then attach a listener with `setListener`.
- To add a Query to a Workflow, call `defineQuery` with a name, and then attach a listener with `setListener`.

<!--SNIPSTART nodejs-blocked-workflow-->
<!--SNIPEND-->

## How to send Signals and make Queries

- You invoke a Signal with `workflow.signal(signal, ...args)`.
  You can refer to it either by string name, or by exact definition.
- You make a Query with `workflow.query(query, ...args)`.
  You can refer to it either by string name, or by exact definition.

```js
const client = new WorkflowClient();
const workflow = client.createWorkflowHandle(myWorkflow, {
  taskQueue: 'test',
});
await workflow.start();

// these two are exactly equivalent
await workflow.signal(unblock, ...args); // using the Signal Definition from `defineSignal`
await workflow.signal('unblock', ...args); // using the Signal name

// these two are exactly equivalent
let state = await workflow.query(isBlocked, ...args);
let state = await workflow.query('isBlocked', ...args);
```

## The `condition` API

`condition(timeout?, function)` returns a promise that resolves when a supplied function returns `true` or if an (optional) `timeout` happens first.
This API is comparable to `Workflow.await` in other SDKs and often used to wait for Signals.

The timeout also uses the [ms](https://www.npmjs.com/package/ms) package to take either a string or number of milliseconds.

```ts
/**
 * Returns a Promise that resolves when `fn` evaluates to `true` or `timeout` expires.
 *
 * @param timeout - formatted string or number of milliseconds
 *
 * @returns a boolean indicating whether the condition was true before the timeout expires
 */
export function condition(
  timeout: number | string,
  fn: () => boolean
): Promise<boolean>;

// Returns a Promise that resolves when `fn` evaluates to `true`.
export function condition(fn: () => boolean): Promise<void>;

// Usage
import { condition } from '@temporalio/workflow';

let x = 0;
// do stuff with x, eg increment every time you receive a signal
await condition(() => x > 3);
// you only reach here when x > 3

// await earlier of condition to be true or 30 day timeout
await condition('30 days', () => x > 3);
```

:::warning `condition` Antipattern

No time based condition functions are allowed in your function as this is very error prone.
Use the optional `timeout` arg or a `sleep` timer.

:::

## Advanced Notes

### Queries

> 🚨 WARNING: NEVER mutate Workflow state inside a query! This would be a source of non-determinism.

:::danger How NOT to write a Query

This mutates Workflow state - do not do this:

```js
export function badExample() {
  let someState = 123;
  setListener(query, () => {
    return someState++; // bad! don't do this!
  });
}
```

:::

### Signals

:::info Notes on Signals

`workflow.signal` returns a Promise that only resolves when Temporal Server has persisted receipt of the Signal, before the Workflow's Signal handler is called.
This Promise resolves with no value; **Signal handlers cannot return data to the caller.**

:::

:::info No Synchronous Updates

A common request is for a Signal to be invoked with a bad argument, causing a validation error.
However Temporal has no way to surface the error to the external invocation.
Signals and Queries are always asynchronous, in other words, **a Signal always succeeds**.

The solution to this is "Synchronous Update" and we plan to add it in future.

For now [the best workaround](https://community.temporal.io/t/signalling-system-human-driven-workflows/160/2) is to use a Query to return Workflow state after signaling.
Temporal guarantees read-after-write consistency of Signals-followed-by-Queries.

:::

### `signalWithStart`

If you're not sure if a Workflow is running, you can `signalWithStart` a Workflow to send it a Signal and optionally start the Workflow if it is not running.
Arguments for both are sent as needed.

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
```

### Triggers

[Triggers](https://nodejs.temporal.io/api/classes/workflow.trigger) are a concept unique to the Temporal Node.js SDK. They may be deprecated in future.

Triggers, like Promises, can be awaited and expose a `then` method. Unlike Promises they are triggered when their `resolve` or `reject` methods are called.

`Trigger` is `CancellationScope`-aware. It is linked to the current scope on construction and throws when that scope is cancelled.
