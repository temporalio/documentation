---
id: workflows
title: Workflows in TypeScript
sidebar_label: Workflows
---

> **@temporalio/workflow** [![NPM](https://img.shields.io/npm/v/@temporalio/workflow)](https://www.npmjs.com/package/@temporalio/workflow) [API reference](https://typescript.temporal.io/api/namespaces/workflow) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/workflow)

**Workflows are async functions that can orchestrate Activities and access special Workflow APIs, subject to deterministic limitations**.

Each Workflow function has two parts:

- The function name is known as the **Workflow Type**.
- The function implementation code (body) is known as the **Workflow Definition**.

Each Workflow Definition is bundled with any third party dependencies, and registered by Workflow Type in a [Worker](/docs/typescript/workers).
A Workflow function only becomes a **Workflow Execution** (instance) when started from a [**Workflow Client**](/docs/typescript/client) using its Workflow Type.

<!-- todo: we need a diagram here to show the relationship -->

## How to write a Workflow function

Workflow Definitions are "just functions", which can store state, and orchestrate [Activity functions](/docs/typescript/activities).

<!--SNIPSTART typescript-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The snippet above uses `createActivityHandle` to create functions that, when called, schedule a `greet` Activity in the system to say "Hello World".

### Workflow Limitations

Workflow code must be [deterministic](/docs/typescript/determinism), and the TypeScript SDK replaces common sources of nondeterminism for you, like `Date.now()`, `Math.random`, and `setTimeout` (we recommend using our [`sleep`](/docs/typescript/workflows#sleep) API instead).
However, there are other important limitations:

- No Node built-ins like `process` or the `path` and `fs` modules
- No filesystem access
- No network access

These constraints don't apply inside Activities.
**If you need to ping an API, or access the filesystem (e.g. for building a CI/CD system), move that code into Activities.**

## How to Start and Cancel Workflows

See the [TypeScript SDK Client docs](/docs/typescript/client) for how to use `WorkflowHandle`s to start, cancel, signal, query, describe and more.

## Workflow APIs

The `@temporalio/workflow` package exports all the useful primitives that you can use in Workflows. See the [API reference](https://typescript.temporal.io/api/namespaces/workflow) for the full list, but the main ones are:

| APIs                         | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `defineSignal`/`defineQuery` | [Signal and Query](#signals-and-queries) Workflows while they are running                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `sleep`                      | Primitive to build durable [Timers](#timers)                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `condition`                  | Block until a [`condition`](#condition) is true. Often used with Signals                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `createActivityHandle`       | Make idempotent side effects (like making a HTTP request) with Activities ([see Activities doc](/docs/typescript/activities))                                                                                                                                                                                                                                                                                                                                                              |
| `createChildWorkflowHandle`  | Spawn new [Child Workflows](#child-workflows) with the ability to cancel                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `continueAsNew`              | Truncate Event History for [infinitely long running Workflows](#infinite-workflows)                                                                                                                                                                                                                                                                                                                                                                                                        |
| `patched`/`deprecatePatch`   | Migrate Workflows to new versions ([see Patching doc](/docs/typescript/patching))                                                                                                                                                                                                                                                                                                                                                                                                          |
| `uuid4`                      | Generate an RFC compliant V4 [uuid](https://typescript.temporal.io/api/namespaces/workflow/#uuid4) without needing to call an Activity or Side Effect.                                                                                                                                                                                                                                                                                                                                     |
| APIs for advanced users      | including [`workflowInfo`](https://typescript.temporal.io/api/namespaces/workflow#workflowinfo), [`isCancellation`](https://typescript.temporal.io/api/namespaces/workflow#iscancellation), [`dependencies`](/docs/typescript/external-dependencies), [Cancellation Scopes](/docs/typescript/cancellation-scopes), [Failure](/docs/typescript/handling-failure), and [`createExternalWorkflowHandle`](https://typescript.temporal.io/api/namespaces/workflow#createexternalworkflowhandle) |

We fully expect that developers will bundle these into their own reusable Workflow libraries.
If you do, please [get in touch on Slack](https://temporal.io/slack), we would love to work with you and promote your work.

## Signals and Queries

<!-- note to docs writers: specify id so that #signals and #queries anchor tags still work -->

<details id="signals">
<summary>
  <a href="/docs/concepts/signals">Signals</a> are a way to send data IN to a running Workflow.
</summary>

import WhenToSignals from '../content/when-to-use-signals.md'

<WhenToSignals />

</details>

<details id="queries">
<summary>
  <a href="/docs/concepts/queries">Queries</a> are a way to read data OUT from a running Workflow.
</summary>

**Queries are a fully asynchronous mechanism for getting data out of a running Workflow** (as opposed to waiting for the Workflow to complete and return a value, or calling an Activity from inside a Workflow to communicate with the outside world).

- **Queries must not mutate Workflow state.** This would cause non-determinism errors in Temporal.
- Queries typically return data, but can also receive arguments to modify what data is returned.
- Queries are often used to check the execution state of a long running Workflow that can be signaled.
- If a Query is made to a completed Workflow, the final value is returned.

</details>

Signals and Queries are almost always used together.
If you wanted to send data in, you probably will want to read data out.

### How to define and receive Signals and Queries

- To add a Signal to a Workflow, call [`defineSignal`](https://typescript.temporal.io/api/namespaces/workflow/#definesignal) with a name, and then attach a listener with `setListener`.
- To add a Query to a Workflow, call [`defineQuery`](https://typescript.temporal.io/api/namespaces/workflow/#definequery) with a name, and then attach a listener with `setListener`.

<!--SNIPSTART typescript-blocked-workflow-->
<!--SNIPEND-->

Listeners for both Signals and Queries can take arguments, which can be used inside `setListener` to mutate state or compute return values respectively.

<details>
  <summary>
    Why <em>NOT</em> <code>new Signal</code> and <code>new Query</code>?
  </summary>

The semantic of `defineSignal`/`defineQuery` is intentional, in that they return Signal/Query **Definitions**, not unique instances of Signals and Queries themselves.
Signals/Queries are only instantiated with `setListener` and are specific to a particular Workflow Execution.

These distinctions may seem minor, but they model how Temporal works under the hood, because Signals and Queries are messages identified by "just strings" and don't have meaning independent of the Workflow having a listener to handle them.

</details>
<details>
  <summary>
    Why <code>setListener</code> and not OTHER_API?
  </summary>

We named it `setListener` instead of `subscribe` because Signals/Queries can only have one listener at a time, whereas `subscribe` could imply an Observable with multiple consumers.
If you are familiar with Rxjs, you are free to wrap your Signal and Query into Observables if you wish, or you could dynamically reassign the listener based on your business logic/Workflow state.

</details>

### How to send Signals and make Queries

- You invoke a Signal with `workflow.signal(signal, ...args)`. A Signal has no return value by definition.
- You make a Query with `workflow.query(query, ...args)`. A Query needs a return value, but can also take args.
- You can refer to either by string name, but you will lose type safety.

```ts
const increment =
  defineSignal<[number /* more args can be added here */]>('increment');
const count = defineQuery<number /*, Arg[] can be added here */>('count');

// these two are equivalent
await handle.signal(increment, 1);
await handle.signal<[number]>('increment', 1);

// these two are equivalent
let state = await handle.query(count);
let state = await handle.query<number>('count');
```

### Type-safety for Signals and Queries

The Signals and Queries API has been designed with type safety in mind:

- `wf.defineQuery<Ret, Args>(name): QueryDefinition<Ret, Args>`
- `wf.defineSignal<Args>(name): SignalDefinition<Args>`
- `WorkflowHandle.query<Ret, Args>(def, ...args): Promise<Ret>`
- `WorkflowHandle.signal<Args>(def, ...args): Promise<Ret>`

You can either:

- Define the argument type (and, for Queries, the return type) up front and import it for type inference with the `WorkflowHandle`
- Define the expected type at the call site when you invoke the Signal/Query.

```ts
const increment =
  defineSignal<[number /* more args can be added here */]>('increment');
const count = defineQuery<number /*, Arg[] can be added here */>('count');

// type safety inferred from definitions
await handle.signal(increment, 1);
await handle.signal(increment); // Expected 2 arguments, but got 1.
await handle.signal(increment, '1'); // Argument of type 'string' is not assignable to parameter of type 'number'

// common problems when you lack type safety
await handle.signal('increment'); // No TS error but insufficient arguments
await handle.signal('increment', '1'); // No TS error but sending in wrong type

// add type safety at callsite
await handle.signal<[number]>('increment'); // Expected 2 arguments, but got 1.
let state = await handle.query<number, [string]>('print', 'Count: ');
```

### Notes on Signals

`WorkflowHandle.signal` returns a Promise that only resolves when Temporal Server has persisted receipt of the Signal, before the Workflow's Signal handler is called.
This Promise resolves with no value; **Signal handlers cannot return data to the caller.**

:::info No Synchronous Updates

A common request is for a Signal to be invoked with a bad argument, causing a validation error.
However Temporal has no way to surface the error to the external invocation.
Signals and Queries are always asynchronous, in other words, **a Signal always succeeds**.

The solution to this is "Synchronous Update" and we plan to add it in future.

For now [the best workaround](https://community.temporal.io/t/signalling-system-human-driven-workflows/160/2) is to use a Query to return Workflow state after signaling.
Temporal guarantees read-after-write consistency of Signals-followed-by-Queries.

:::

### Notes on Queries

> 🚨 WARNING: NEVER mutate Workflow state inside a query! This would be a source of non-determinism.

:::danger How NOT to write a Query

This mutates Workflow state - do not do this:

```ts
export function badExample() {
  let someState = 123;
  setListener(query, () => {
    return someState++; // bad! don't do this!
  });
}
```

:::

### Reusing Signals and Queries in Libraries

Because Signal and Query Definitions are separate from Workflow Definitions, we can now compose them together:

```js
// basic reusable Workflow component
export async function unblocked() {
  let isBlocked = true;
  setListener(unblockSignal, () => (isBlocked = false));
  setListener(isBlockedQuery, () => isBlocked);
  await condition(() => !isBlocked);
}

// usage: signals can be sent to each Workflow separately
export async function myWorkflow1() {
  await unblocked();
}
export async function myWorkflow2() {
  await unblocked();
}
```

Another example of componentization can be found in our [code samples](https://github.com/temporalio/samples-typescript/blob/854c78955601a6b63aa8ea412cfb5eaf61bd78ee/expense/src/workflows.ts#L19).

### `signalWithStart`

If you're not sure if a Workflow is running, you can `signalWithStart` a Workflow to send it a Signal and optionally start the Workflow if it is not running.
Arguments for both are sent as needed.

```ts
// Signal With Start
const client = new WorkflowClient();
await workflow.signalWithStart(MyWorkflow, {
  args: [arg1, arg2],
  signal: MySignal,
  signalArgs: [arg3, arg4],
  workflowId,
});
```

### Triggers

[Triggers](https://typescript.temporal.io/api/classes/workflow.trigger) are a concept unique to the Temporal TypeScript SDK. They may be deprecated in future.

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

### `condition` Anti-patterns

:::warning `condition` Antipatterns

- No time based condition functions are allowed in your function as this is very error prone.
  Use the optional `timeout` arg or a `sleep` timer.
- `condition` only accepts **synchronous** functions that return a boolean.
  Do not put async functions, like Activities, inside the `condition` function.

:::

<!-- TODO: insert snippet showing real usage of condition -->

## Timers

Timers help you write durable asynchronous code in Temporal.
Temporal offers you just two primitives — `setTimeout` and `sleep` — that you can use to build reusable workflow libraries and utilities:

- The [`setTimeout`](https://typescript.temporal.io/api/namespaces/workflow/#timers) global works as normal in JavaScript.
  The Workflow's v8 isolate environment completely replaces it, including inside libraries that you use, to provide a complete JS runtime.
  We recommend using our `sleep` API instead of `setTimeout` because it supports cancellation (see below).
- [`sleep(timeout)`](https://typescript.temporal.io/api/namespaces/workflow/#sleep): a cancellation-aware Promise wrapper for `setTimeout`, that accepts either a string or integer timeout.

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

</details>

:::caution Preventing Confusion

This section only covers Workflow Timers.

- There is an unrelated [`sleep` utility function](https://typescript.temporal.io/api/classes/activity.context/#sleep) available in **Activity Context** that is not durable, but is cancellation aware. See [the Activities docs for details](/docs/typescript/activities).
- Timers are unrelated to **Cron Workflows**, which are a Workflow option that you can set for recurring Workflows. See [the Workflows docs for details](/docs/typescript/workflows).
- If you need to block for an _indefinite_ period of time instead of a set time, you want the `condition` API instead of a timer. See [`condition` docs](#condition).

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

You can read more on [the Cancellation Scopes doc](/docs/typescript/cancellation-scopes).

### Timer design patterns

There are only two Timer APIs, but the important part is knowing how to use them to model asynchronous business logic. Here are some examples we use the most; we welcome more if you can think of them!

<details>
<summary>
Racing Timers
</summary>

Use `Promise.race` with Signals and Triggers to have a promise resolve at the earlier of either system time or human intervention.

<!-- SNIPSTART typescript-oneclick-buy -->
<!--SNIPEND-->

You can invert this to create a Reminder pattern where the promise resolves IF no Signal is received.

:::warning Antipattern: Racing Sleep.then

Be careful when racing a chained `sleep`. This may cause bugs.

```js
await Promise.race([
  sleep('5s').then(() => (status = 'timed_out')),
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

<!-- SNIPSTART typescript-updatable-timer-impl -->
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

- Child Workflows have access to all Workflow APIs, but are subject to [Workflow Limitations](/docs/typescript/workflows#workflow-limitations). Activities have the inverse pros and cons.
- Child Workflows can continue on if their Parent is canceled, with a [ParentClosePolicy](/docs/content/what-is-a-parent-close-policy/) of `ABANDON`, whereas Activities are _always_ canceled when their Workflow is canceled (they may react to a [cancellationSignal](/docs/typescript/activities#activity-cancellation) for cleanup if canceled). The decision is roughly analogous to spawning a child process in a terminal to do work vs doing work in the same process.
- Temporal tracks all state changes within Child Workflows in Event History, whereas only the input, output, and retry attempts of Activities are tracked.

Activities usually model a single operation on the external world. Workflows are modeling composite operations that consist of multiple activities or other child workflows.

**When in doubt, use Activities.**

</details>

To execute a child workflow and await its completion:

<!--SNIPSTART typescript-child-workflow-->
<!--SNIPEND-->

[`createChildWorkflowHandle`](https://typescript.temporal.io/api/api/namespaces/workflow#newchildworkflowhandle) returns a [`ChildWorkflowHandle`](https://typescript.temporal.io/api/interfaces/workflow.ChildWorkflowHandle) that can be used to start a new child Workflow, signal it and await its completion.

Child Workflow Option fields automatically inherit their values from the Parent Workflow Options if they are not explicitly set.

Child Workflow executions are [`CancellationScope`](/docs/typescript/cancellation-scopes) aware and will automatically be cancelled when their containing scope is cancelled.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/docs/content/what-is-a-child-workflow-execution","explanation"]
]}
/>

### Parent Close Policy

import PCP from '../content/what-is-a-parent-close-policy.md'

<PCP />

## Infinite Workflows

### Why `ContinueAsNew` is needed

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

### The `continueAsNew` API

Use the [`continueAsNew`](https://typescript.temporal.io/api/namespaces/workflow#continueasnew) API to instruct the TypeScript SDK to restart `loopingWorkflow` with a new starting value and a new event history.

<!-- TODO: convert to sample -->

```ts
import { continueAsNew, sleep } from '@temporalio/workflow';

export async function loopingWorkflow(iteration = 0): Promise<void> {
  if (iteration === 10) {
    return;
  }
  console.log('Running Workflow iteration:', iteration);
  await sleep(1000);
  // Must match the arguments expected by `loopingWorkflow`
  await continueAsNew<typeof loopingWorkflow>(iteration + 1);
  // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
}
```

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow (or different Task Queue) using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/namespaces/workflow/#makecontinueasnewfunc).

If you need to know whether a Workflow was started via `continueAsNew`, you can pass an optional last argument as true:

```ts
import { continueAsNew } from '@temporalio/workflow';

export async function loopingWorkflow(
  foo: any,
  isContinuedAsNew: boolean
): Promise<void> {
  // some logic based on foo, branching on isContinuedAsNew

  (await continueAsNew)<typeof loopingWorkflow>(foo, true);
}
```
