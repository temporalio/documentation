---
id: workflow-apis
title: Workflow APIs in Node
sidebar_label: Workflow APIs
---

> **@temporalio/workflow** [![NPM](https://img.shields.io/npm/v/@temporalio/workflow)](https://www.npmjs.com/package/@temporalio/workflow) [API reference](https://nodejs.temporal.io/api/namespaces/workflow) | [GitHub source](https://github.com/temporalio/sdk-node/tree/main/packages/workflow)

This package exports all the useful primitives that you can use in Workflows. See the [API reference](https://nodejs.temporal.io/api/namespaces/workflow) for the full list, but the main ones are:

| APIs                         | Purpose                                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `defineSignal`/`defineQuery` | [Signal and Query](#signals-and-queries) Workflows while they are running                                                  |
| `sleep`                      | Primitive to build durable [Timers](#timers)                                                                               |
| `condition`                  | Block until a [`condition`](#condition) is true. Often used with Signals                                                   |
| `createActivityHandle`       | Make idempotent side effects (like making a HTTP request) with Activities ([documented separately](/docs/node/activities)) |
| `createChildWorkflowHandle`  | Spawn new [Child Workflows](#child-workflows) with the ability to cancel                                                   |
| `continueAsNew`              | Truncate Event History for [infinitely long running Workflows](#infinite-workflows)                                        |
| `patched`/`deprecatePatch`   | Migrate Workflows to new versions ([documented separately](/docs/node/versioning))                                         |

We fully expect that developers will bundle these into their own reusable Workflow libraries.
If you do, please [get in touch on Slack](https://temporal.io/slack), we would love to work with you and promote your work.

## Signals and Queries

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
If you wanted to send data in, you probably will want to read data out.

### How to define and receive Signals and Queries

- To add a Signal to a Workflow, call `defineSignal` with a name, and then attach a listener with `setListener`.
- To add a Query to a Workflow, call `defineQuery` with a name, and then attach a listener with `setListener`.

<!--SNIPSTART nodejs-blocked-workflow-->
<!--SNIPEND-->

### How to send Signals and make Queries

- You invoke a Signal with `workflow.signal(signal, ...args)`.
  You can refer to it either by string name, or by exact definition.
- You make a Query with `workflow.query(query, ...args)`.
  You can refer to it either by string name, or by exact definition.

```js
const client = new WorkflowClient();
const handle = client.createWorkflowHandle(myWorkflow, {
  taskQueue: 'test',
});
await handle.start();

// these two are exactly equivalent
await handle.signal(unblock, ...args); // using the Signal Definition from `defineSignal`
await handle.signal('unblock', ...args); // using the Signal name

// these two are exactly equivalent
let state = await handle.query(isBlocked, ...args);
let state = await handle.query('isBlocked', ...args);
```

### Advanced Notes

#### Queries

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

#### Signals

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

#### `signalWithStart`

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

#### Triggers

[Triggers](https://nodejs.temporal.io/api/classes/workflow.trigger) are a concept unique to the Temporal Node.js SDK. They may be deprecated in future.

Triggers, like Promises, can be awaited and expose a `then` method. Unlike Promises they are triggered when their `resolve` or `reject` methods are called.

`Trigger` is `CancellationScope`-aware. It is linked to the current scope on construction and throws when that scope is cancelled.

## `condition`

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

## Timers

Timers help you write durable asynchronous code in Temporal.
Temporal offers you just two primitives — `setTimeout` and `sleep` — that you can use to build reusable workflow libraries and utilities:

- The [`setTimeout`](https://nodejs.temporal.io/api/namespaces/workflow/#timers) global works as normal in JavaScript.
  The Workflow's v8 isolate environment completely replaces it, including inside libraries that you use, to provide a complete JS runtime.
  We recommend using our `sleep` API instead of `setTimeout` because it supports cancellation (see below).
- [`sleep(timeout)`](https://nodejs.temporal.io/api/namespaces/workflow/#sleep): a cancellation-aware Promise wrapper for `setTimeout`, that accepts either a string or integer timeout.

<details>
<summary>
Why Durable Timers Are a Hard Problem
</summary>

JavaScript has a `setTimeout`, which seems relatively unremarkable.
However, they are held in memory - if your system goes down, those timers are gone.

A lot of careful code is required to make these timeouts fully reliable (aka recoverable in case of outage.)
Beyond that, further engineering is needed to scale this - imagine 100,000 independently running timers in your system, firing every minute.
That is the kind of scale Temporal handles.

<!-- Note: these are notes from Maxim - we should build out examples and recommend this as best practice in future.
When writing Workflows with timers, you need to take care that it handles jumps of time.
What we mean by "handling jumps": if you had timers that were supposed to go off at 1.15, 1.30, and 1.45pm, and your system goes down from 1pm to 2pm, then at 2pm when the system comes back up all 3 timers will fire at once. If your workflow code relies on the timers resolving in precise order, write these checks yourself.
-->

You can read more about [Temporal Node SDK's Determinism here](/docs/node/determinism).

</details>

:::caution Disambiguating Confusion

This section only covers Workflow Timers.

- There is an unrelated [`sleep` utility function](https://nodejs.temporal.io/api/classes/activity.context/#sleep) available in Activity Context that is not durable, but is cancellation aware. See [the Activities docs for details](/docs/node/activities).
- Timers are unrelated to Cron Workflows, which are a Workflow option that you can set for recurring Workflows. See [the Workflows docs for details](/docs/node/workflows).
- If you need to block for an _indefinite_ period of time instead of a set time, you may want the `condition` API instead. See [the Workflow APIs docs for details](/docs/node/workflow-apis).

:::

### `sleep`

`sleep` uses the [ms](https://www.npmjs.com/package/ms) package to take either a string or number of milliseconds, and returns a promise that you can `await`.

```ts
/**
 * Asynchronous sleep. Schedules a timer on the Temporal service.
 *
 * @param ms sleep duration - formatted string or number of milliseconds
 */
export function sleep(ms: number | string): Promise<void>;

// durably sleep for 30 days
import { sleep } from '@temporalio/workflow';

await sleep('30 days'); // string API
await sleep(30 * 24 * 60 * 60 * 1000); // numerical API
```

`sleep` is cancellation-aware, meaning that when the workflow gets cancelled, the `sleep` timer is canceled and the promise is rejected:

```ts
await sleep('30 days').catch(() => {
  // clean up code if workflow is canceled during sleep
});
```

You can read more on [the Cancellation Scopes doc](/docs/node/cancellation-scopes).

### Timer Design Patterns

There are only two Timer APIs, but the important part is knowing how to use them to model asynchronous business logic. Here are some examples we use the most; we welcome more if you can think of them!

<details>
<summary>
Racing Timers
</summary>

Use `Promise.race` with Signals and Triggers to have a promise resolve at the earlier of either system time or human intervention.

<!-- SNIPSTART nodejs-oneclick-buy -->
<!--SNIPEND-->

You can invert this to create a Reminder pattern where the promise resolves IF no Signal is received.

:::warning Antipattern: Racing Sleep.then

Be careful when racing a chained `sleep`. This may cause bugs.

```js
await Promise.race([
  sleep('5s').then(() => (status = 'timed_out'),
  somethingElse.then(() => (status = 'processed')),
]);

if (status === 'processed') await complete(); // takes more than 5 seconds
// status = timed_out
```

:::

</details>

<details>
<summary>
Updatable Timer
</summary>

Here is how you can build an updatable timer with `condition`:

<!-- SNIPSTART nodejs-updatable-timer-impl -->
<!-- SNIPEND-->

</details>

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

<details>
<summary>
Child Workflows vs Activities
</summary>

Child Workflows and Activities are both started from Workflows, so you may feel confused about when to use which.
Here are some important differences:

- Child Workflows have access to all Workflow APIs, but are subject to [Workflow Limitations](/docs/node/workflows#workflow-limitations). Activities have the inverse pros and cons.
- Child Workflows can continue on if their Parent is canceled, with a [ParentClosePolicy](/docs/content/what-is-a-parent-close-policy/) of `ABANDON`, whereas Activities are _always_ canceled when their Workflow is canceled (they may react to a [cancellationSignal](/docs/node/activities#activity-cancellation) for cleanup if canceled).
- Temporal tracks all state changes within Child Workflows in Event History, whereas only the input, output, and retry attempts of Activities are tracked.

Activities usually model a single operation on the external world. Workflows are modeling composite operations that consist of multiple activities or other child workflows.
**When in doubt, use Activities.**

</details>

To execute a child workflow and await its completion:

<!--SNIPSTART nodejs-child-workflow-->
<!--SNIPEND-->

[`createChildWorkflowHandle`](https://nodejs.temporal.io/api/api/namespaces/workflow#newchildworkflowhandle) returns a [`ChildWorkflowHandle`](https://nodejs.temporal.io/api/interfaces/workflow.ChildWorkflowHandle) that can be used to start a new child Workflow, signal it and await its completion.

Child Workflow executions are [`CancellationScope`](/docs/node/cancellation-scopes) aware and will automatically be cancelled when their containing scope is cancelled.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/docs/content/what-is-a-child-workflow-execution","explanation"],  
]}
/>

## Infinite Workflows

### Why `ContinueAsNew` is needed

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

### The `ContinueAsNew` API

Use the [`continueAsNew`](https://nodejs.temporal.io/api/namespaces/workflow#continueasnew) API to instruct the Node SDK to restart `loopingWorkflow` with a new starting value and a new event history.

```ts
import { continueAsNew, sleep } from '@temporalio/workflow';

export async function loopingWorkflow(iteration = 0) {
  return {
    async execute() {
      if (iteration === 10) {
        return;
      }
      console.log('Running Workflow iteration:', iteration);
      await sleep(1000);
      // Must match the arguments expected by `loopingWorkflow`
      await continueAsNew<typeof loopingWorkflow>(iteration + 1);
      // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
    },
  };
}
```

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow (or different Task Queue) using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/namespaces/workflow/#makecontinueasnewfunc).
