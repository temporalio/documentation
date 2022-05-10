---
id: workflows
title: Workflows in TypeScript
sidebar_label: Workflows
description: Workflows are async functions that can orchestrate Activities and access special Workflow APIs, subject to deterministic limitations.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedReadList, {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as WhatIsASignal from '../concepts/what-is-a-signal.md'
import * as WhatIsAQuery from '../concepts/what-is-a-query.md'

**`@temporalio/workflow`** [![NPM](https://img.shields.io/npm/v/@temporalio/workflow)](https://www.npmjs.com/package/@temporalio/workflow) [API reference](https://typescript.temporal.io/api/namespaces/workflow) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/workflow)

> _Background reading: [Workflows in Temporal](/temporal-explained/workflows)_

**Workflows are async functions that can orchestrate Activities and access special Workflow APIs, subject to deterministic limitations**.

Each Workflow function has two parts:

- The function name is known as the **Workflow Type**.
- The function implementation code (body) is known as the **Workflow Definition**.

Each Workflow Definition is bundled with any third party dependencies, and registered by Workflow Type in a [Worker](/typescript/workers).
A Workflow function becomes a **Workflow Execution** (instance) only when started from a [**Workflow Client**](/typescript/clients) using its Workflow Type.

<!-- todo: we need a diagram here to show the relationship -->

## How to write a Workflow function

Workflow Definitions are "just functions", which can store state, and orchestrate [Activity functions](/typescript/activities).

<!--SNIPSTART typescript-hello-workflow {"enable_source_link": false}-->
```ts
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```
<!--SNIPEND-->

The snippet above uses `proxyActivities` to create functions that, when called, schedule a `greet` Activity in the system to say "Hello World".

A Workflow function can have multiple parameters, but we encourage you to use a single object parameter, as that helps with backward compatibility:

```ts
type ExampleArgs = {
  name: string;
};

export async function example(
  args: ExampleArgs
): Promise<{ greeting: string }> {
  const greeting = await greet(args.name);
  return { greeting };
}
```

### Workflow Limitations

Workflow code must be [deterministic](/typescript/determinism), and the TypeScript SDK replaces common sources of nondeterminism for you, like `Date.now()`, `Math.random`, and `setTimeout` (we recommend using our [`sleep`](/typescript/workflows#sleep) API instead).
However, there are other important limitations:

- No Node built-ins like `process` or the `path` and `fs` modules
- No filesystem access
- No network access

These constraints don't apply inside Activities.
**If you need to ping an API, or access the filesystem (e.g. for building a CI/CD system), move that code into Activities.**

## How to Start and Cancel Workflows

See the [TypeScript SDK Client docs](/typescript/clients) for how to use `WorkflowHandle`s to start, cancel, signal, query, describe and more.

### Workflow Options

Workflows have options that determine what Task Queue they run on, what Search Attributes they are tagged with, Cron schedule, and more, but they are only set in the Temporal Client call (i.e. when you start or execute a Workflow) rather than _inside_ the Workflow code itself.

Please see the [Temporal Client docs](/typescript/clients) or the [API Reference](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) for more info on Workflow Options.

## Workflow APIs

The `@temporalio/workflow` package exports all the useful primitives that you can use in Workflows. See the [API reference](https://typescript.temporal.io/api/namespaces/workflow) for the full list, but the main ones are:

| APIs                         | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `proxyActivities`            | Make idempotent side effects (like making a HTTP request) with Activities ([see Activities doc](/typescript/activities))                                                                                                                                                                                                                                                                                            |
| `defineSignal`/`defineQuery` | [Signal and Query](#signals-and-queries) Workflows while they are running                                                                                                                                                                                                                                                                                                                                                |
| `sleep`                      | Defer execution by [sleeping](#sleep) for fixed time                                                                                                                                                                                                                                                                                                                                                                     |
| `condition`                  | Defer execution until a [`condition`](#condition) is true, with optional timeout                                                                                                                                                                                                                                                                                                                                         |
| `startChild`/`executeChild`  | Spawn new [Child Workflows](#child-workflows) with customizable ParentClosePolicy                                                                                                                                                                                                                                                                                                                                        |
| `continueAsNew`              | Truncate Event History for [Entity Workflows](#entity-workflows)                                                                                                                                                                                                                                                                                                                                                         |
| `patched`/`deprecatePatch`   | Migrate Workflows to new versions ([see Patching doc](/typescript/patching))                                                                                                                                                                                                                                                                                                                                        |
| `uuid4`                      | Generate an RFC compliant V4 [uuid](https://typescript.temporal.io/api/namespaces/workflow/#uuid4) without needing to call an Activity or Side Effect.                                                                                                                                                                                                                                                                   |
| APIs for advanced users      | including [`workflowInfo`](https://typescript.temporal.io/api/namespaces/workflow#workflowinfo) (to retrieve Workflow metadata), Workflow data [`Sinks`](/typescript/logging), [Cancellation Scopes](/typescript/cancellation-scopes), [Failure types](/typescript/handling-failure), and [`getExternalWorkflowHandle`](https://typescript.temporal.io/api/namespaces/workflow#getexternalworkflowhandle) |

You can import them individually or as a group:

```js
// Option 1
import { sleep } from '@temporalio/workflow';

// Option 2
import * as wf from '@temporalio/workflow';
```

We fully expect that developers will bundle these into their own reusable Workflow libraries.
If you do, please [get in touch on Slack](https://temporal.io/slack), we would love to work with you and promote your work.

The rest of this document explains the major Workflow APIs you should know:

- Signals and Queries: `defineSignal`, `defineQuery`, and `setHandler`
- Deferred Execution: `sleep` and `condition`
- Child Workflows: `startChild` and `executeChild`
- Entity (indefinitely long-running) Workflows: `continueAsNew`

## Signals and Queries

> _Background reading: [Signals and Queries in Temporal](/temporal-explained/signals-and-queries)_

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsASignal} />
  <RelatedReadItem page={WhatIsAQuery} />
</RelatedReadContainer>

#### How to define and receive Signals and Queries

### Define Signals and Queries inside a Workflow

- To add a Signal to a Workflow, call [`defineSignal`](https://typescript.temporal.io/api/namespaces/workflow/#definesignal) with a name, and then attach a listener with `setHandler`.
- To add a Query to a Workflow, call [`defineQuery`](https://typescript.temporal.io/api/namespaces/workflow/#definequery) with a name, and then attach a listener with `setHandler`.
- Handlers for both Signals and Queries can take arguments, which can be used inside `setHandler` logic.
- Only Signal Handlers can mutate state, and only Query Handlers can return values.

#### Define Signals and Queries Statically

If you know the name of your signals and queries upfront, we recommend declaring them outside of the Workflow Definition.

<!--SNIPSTART typescript-blocked-workflow-->
[signals-queries/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/signals-queries/src/workflows.ts)
```ts
import * as wf from '@temporalio/workflow';

export const unblockSignal = wf.defineSignal('unblock');
export const isBlockedQuery = wf.defineQuery<boolean>('isBlocked');

export async function unblockOrCancel(): Promise<void> {
  let isBlocked = true;
  wf.setHandler(unblockSignal, () => void (isBlocked = false));
  wf.setHandler(isBlockedQuery, () => isBlocked);
  console.log('Blocked');
  try {
    await wf.condition(() => !isBlocked);
    console.log('Unblocked');
  } catch (err) {
    if (err instanceof wf.CancelledFailure) {
      console.log('Cancelled');
    }
    throw err;
  }
}
```
<!--SNIPEND-->

This helps provide type safety, since you can export the type signature of the signal or query to be called on the clientside.

#### Define Signals and Queries Dynamically

For more flexible usecases, you may want a dynamic Signal (such as a generated ID).
You may handle it in two ways:

- avoid making it dynamic by collapsing all signals in one handler and move the ID to the payload, or
- actually make the Signal name dynamic by inlining the Signal definition per handler.

```ts
import * as wf from '@temporalio/workflow';

// "fat handler" solution
wf.setHandler(`genericSignal`, (payload) => {
  switch (payload.taskId) {
    case taskAId:
      // do task A things
      break;
    case taskBId:
      // do task B things
      break;
    default:
      throw new Error('Unexpected task.');
  }
});

// "inline definition" solution
wf.setHandler(wf.defineSignal(`task-${taskAId}`), (payload) => {
  /* do task A things */
});
wf.setHandler(wf.defineSignal(`task-${taskBId}`), (payload) => {
  /* do task B things */
});

// utility "inline definition" helper
const inlineSignal = (signalName, handler) =>
  wf.setHandler(wf.defineSignal(signalName), handler);
inlineSignal(`task-${taskBId}`, (payload) => {
  /* do task B things */
});
```

<details>
  <summary>
    API Design FAQs
  </summary>

#### Why not `new Signal` and `new Query`?

The semantic of `defineSignal`/`defineQuery` is intentional, in that they return Signal/Query **Definitions**, not unique instances of Signals and Queries themselves. [This is their entire source code](https://github.com/temporalio/sdk-typescript/blob/fc658d3760e6653aec47732ab17a0062b7dd23fc/packages/workflow/src/workflow.ts#L884-L907):

```ts
/**
 * Define a signal method for a Workflow.
 */
export function defineSignal<Args extends any[] = []>(
  name: string
): SignalDefinition<Args> {
  return {
    type: 'signal',
    name,
  };
}

/**
 * Define a query method for a Workflow.
 */
export function defineQuery<Ret, Args extends any[] = []>(
  name: string
): QueryDefinition<Ret, Args> {
  return {
    type: 'query',
    name,
  };
}
```

Signals/Queries are only instantiated in `setHandler` and are specific to a particular Workflow Execution.

These distinctions may seem minor, but they model how Temporal works under the hood, because Signals and Queries are messages identified by "just strings" and don't have meaning independent of the Workflow having a listener to handle them.
This will be clearer if you refer to the Client-side APIs below.

#### Why `setHandler` and not OTHER_API?

We named it `setHandler` instead of `subscribe` because Signals/Queries can only have one "handler" at a time, whereas `subscribe` could imply an Observable with multiple consumers, and is a higher level construct.

```ts
wf.setHandler(MySignal, handlerFn1);
wf.setHandler(MySignal, handlerFn2); // replaces handlerFn1
```

If you are familiar with [RxJS](https://rxjs.dev/), you are free to wrap your Signal and Query into Observables if you wish, or you could dynamically reassign the listener based on your business logic or Workflow state.

</details>

### Invoke Signals and Queries from a Client

Sending Signals and making Queries requires having a Workflow handle from a [Temporal Client](/typescript/clients).

- You send a Signal with `handle.signal(signal, ...args)`. A Signal has no return value by definition.
- You make a Query with `handle.query(query, ...args)`. A Query needs a return value, but can also take args.
- You can refer to either by string name, which is useful for dynamic reference, but you will lose type inference.

```ts
// // inside Client code! not Workflow code!
import { increment, count } from './workflow';

// init client code omitted - see Client docs
const handle = client.getHandle(workflowId);

// these three are equivalent
await handle.signal(increment, 1);
await handle.signal<[number]>('increment', 1);
await client.getHandle(workflowId).signal(increment, 1);

// these three are equivalent
let state = await handle.query(count);
let state = await handle.query<number>('count');
let state = await client.getHandle(workflowId).query(count);
```

By design of these Workflow handles, two different Workflows can use the same Signal or Query and there is still no ambiguity, because you always have to specify which Workflow you are signalling (`workflowHandle1.signal(MySignal)` vs `workflowHandle2.signal(MySignal)`).

### Signals and Queries design patterns

Because Signals and Queries are intentionally flexible, you can wrap them up into reusable functions:

<Tabs
defaultValue="export"
values={[
{label: 'Exportable', value: 'export'},
{label: 'Concise', value: 'short'},
]
}>

<TabItem value="export">

```ts
// implementation of queryable + signallable State in Workflow file
import * as wf from '@temporalio/workflow';

function useState<T = any>(name: string, initialValue: T) {
  const signal = wf.defineSignal<[T]>(name);
  const query = wf.defineQuery<T>(name);
  let state: T = initialValue;
  return {
    signal,
    query,
    get value() {
      // need to use closure because function doesn't rerun unlike React Hooks
      return state;
    },
    set value(newVal: T) {
      state = newVal;
    },
  };
}

// usage in Workflow file
const store = useState('my-store', 10);
function MyWorkflow() {
  wf.setHandler(store.signal, (newValue: T) => {
    // console.log('updating', newValue) // optional but useful for debugging
    store.value = newValue;
  });
  wf.setHandler(store.query, () => store.value);
  while (true) {
    console.log('sleeping for ', store.value);
    wf.sleep(store.value++ * 100); // you can mutate the value as well
  }
}

// usage in Client file
await handle.signal(store.signal, 30);
const storeState = handle.query<number>(store.query); // 30
```

</TabItem>
<TabItem value="short">

```ts
// alternative, more concise but slightly less safe implementation
import * as wf from '@temporalio/workflows';

function useState<T = any>(name: string, initialValue: T) {
  const signal = wf.defineSignal<[T]>(name);
  const query = wf.defineQuery<T>(name);
  let state: T = initialValue;
  wf.setHandler(signal, (newVal: T) => void (newVal = state));
  wf.setHandler(query, () => state);
  return {
    signal,
    query,
    get value() {
      return state;
    },
    set value(newVal: T) {
      state = newVal;
    },
  };
}

// usage in Workflow file
function MyWorkflow() {
  const store = useState('my-store', 10); // needs to be inside because function uses setHandler
  while (true) {
    console.log('sleeping for ', store.value);
    wf.sleep(store.value++ * 100); // you can mutate the value as well
  }
}

// usage in Client file
await handle.signal('my-store', 30);
const storeState = handle.query<number>('my-store'); // 30
```

</TabItem>
</Tabs>

You can even conditionally set handlers, or set handlers inside handlers:

```ts
import * as wf from '@temporalio/workflow';
function MyWorkflow(signallable: boolean, signalNames: string[]) {
  // conditional setting of handlers
  if (signallable) {
    wf.setHandler(MySignal, handler);
  }

  // set same handler for an array of signals by name
  signalNames.forEach((name) => wf.setHandler(name, handler));

  // signal handler that sets signal handlers
  // // would be nice to send a function but we can't because it is not serializable
  wf.setHandler(MySignal, (handlerName) => {
    wf.setHandler(handlerName, handlers[handlerName]);
  });
}
```

### Additional Signals and Queries Notes

#### Type-safety for Signals and Queries

The Signals and Queries API has been designed with type safety in mind:

- `wf.defineQuery<Ret, Args>(name): QueryDefinition<Ret, Args>`
- `wf.defineSignal<Args>(name): SignalDefinition<Args>`
- `handle.query<Ret, Args>(def, ...args): Promise<Ret>`
- `handle.signal<Args>(def, ...args): Promise<Ret>`

You can either:

- Define the argument type (and, for Queries, the return type) up front and import it for type inference with the `WorkflowHandle`
- Define the expected type at the call site when you invoke the Signal/Query.

```ts
const increment =
  wf.defineSignal<[number /* more args can be added here */]>('increment');
const count = wf.defineQuery<number /*, Arg[] can be added here */>('count');

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

#### Notes on Signals

- Signal handlers are only guaranteed to be called in order **per Signal Type**, not across all of them.
  If you need strict ordering across multiple Signals, either:
  - Combine them into one Signal Type and use a `switch` statement.
  - Register handlers statically (call `setHandler` outside of the Workflow function).
- `WorkflowHandle.signal` resolves as soon as Temporal Server has persisted the Signal, before the Workflow's Signal handler is called.
- `WorkflowHandle.signal` Promise resolves with no value; **Signal handlers cannot return data to the caller.**
- **No Synchronous Updates**.
  Users often want Signals to return a value, for example, a validation error.
  However Temporal has no way to surface any error to the external invocation.
  Signals are always asynchronous, in other words, **a Signal always succeeds**.
  Long term, the solution to this is "Synchronous Update" and [it is under active development](https://github.com/temporalio/proposals/pull/53).

For now [the best workaround](https://community.temporal.io/t/signalling-system-human-driven-workflows/160/2) is to use a Query to return Workflow state after signaling.
Temporal guarantees read-after-write consistency of Signals-followed-by-Queries.

#### Notes on Queries

> 🚨 WARNING: NEVER mutate Workflow state inside a query! Generating Commands in Query handlers can lead to unexpected behaviors on subsequent executions.

:::danger How NOT to write a Query

This mutates Workflow state - do not do this:

```ts
export function badExample() {
  let someState = 123;
  wf.setHandler(query, () => {
    return someState++; // bad! don't do this!
  });
}
```

:::

#### Reusing Signals and Queries in Libraries

Because Signal and Query Definitions are separate from Workflow Definitions, we can now compose them together:

```ts
// basic reusable Workflow component
export async function unblocked() {
  let isBlocked = true;
  wf.setHandler(unblockSignal, () => (isBlocked = false));
  wf.setHandler(isBlockedQuery, () => isBlocked);
  await wf.condition(() => !isBlocked);
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
// Signal With Start in Client file
const client = new WorkflowClient();
await client.signalWithStart(MyWorkflow, {
  workflowId,
  args: [arg1, arg2],
  signal: MySignal,
  signalArgs: [arg3, arg4],
});
```

See the [Workflow Client](/typescript/clients/#workflow-options) docs for more notes on how starting Workflows and Workflow Options look like.

## Deferred Execution

`sleep` and `condition` help you write durable asynchronous code in Temporal by offering an easy to use Promise-like API, but deferring, persisting, and resuming execution behind the scenes.

- In other words, they do not "lock" the process, allowing one Worker to concurrently process hundreds of Workflows that sleep and await arbitrary conditions.
- They are also "cancellation aware", allowing for graceful cleanup if the Workflow they are linked to is canceled.
  For more information, see [Cancellation Scopes](/typescript/cancellation-scopes).

The Workflow's V8 isolate environment completely replaces the JavaScript [`setTimeout`](https://typescript.temporal.io/api/namespaces/workflow/#timers) global, including inside libraries that you use, to provide a complete JavaScript runtime.
We recommend using our [`sleep(timeout)`](https://typescript.temporal.io/api/namespaces/workflow/#sleep) API instead, because it is a cancellation-aware Promise wrapper for `setTimeout`.

<details>
<summary>
Why Durable Timers Are a Hard Problem
</summary>

JavaScript has a `setTimeout`, which seems relatively straightforward.
However, they are held in memory - if your system goes down, those timers are gone.

A lot of careful code is required to make these timeouts fully reliable (aka recoverable in case of outage) and cancellation aware.

<!-- Note: these are rough Durable Timer notes from Maxim - we should build out examples and really hit home why you want to use us rather than write your own, in future.
When writing Workflows with timers, you need to take care that it handles jumps of time.
What we mean by "handling jumps": if you had timers that were supposed to go off at 1.15, 1.30, and 1.45pm, and your system goes down from 1pm to 2pm, then at 2pm when the system comes back up all 3 timers will fire at once. If your workflow code relies on the timers resolving in precise order, write these checks yourself.
-->

Beyond that, further engineering is needed to scale this - imagine 100,000 independently running timers in your system, firing every minute.
That is the kind of scale Temporal handles.

</details>

### `sleep`

`sleep` sets a durable timer for a fixed time period (an "Updatable Timer" pattern is documented below).
It uses the [ms](https://www.npmjs.com/package/ms) package to take either a string or number of milliseconds, and returns a promise that you can `await` and `catch` when the Workflow Execution is cancelled.

```ts
import { sleep } from '@temporalio/workflow';

await sleep('30 days'); // string API
await sleep(30 * 24 * 60 * 60 * 1000); // numerical API

// `sleep` is cancellation-aware
// when workflow gets canceled during sleep, promise is rejected
await sleep('30 days').catch(() => {
  // clean up code if workflow is canceled during sleep
});

// NOT VALID
await sleep('1 month'); // ms package doesnt support "months" https://github.com/vercel/ms/issues/57
// use date-fns and sleepUntil instead, see below
```

With this primitive, you can build other abstractions. For example, a `sleepUntil` function that converts absolute time to relative time with `date-fns`:

```ts
import * as wf from '@temporalio/workflow';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

async function sleepUntil(futureDate, fromDate = new Date()) {
  const timeUntilDate = differenceInMilliseconds(
    new Date(futureDate),
    fromDate
  );
  return wf.sleep(timeUntilDate);
}

sleepUntil('30 Sep ' + (new Date().getFullYear() + 1)); // wake up when September ends
sleepUntil('5 Nov 2022 00:12:34 GMT'); // wake up at specific time and timezone
```

You can check the valid ISO string formats on [MDN's Date docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse). The upcoming [ECMAScript Temporal API](https://tc39.es/proposal-temporal/docs/index.html) will offer more time utilities natively in JavaScript, alongside unfortunate name collision for Temporal developers.

:::caution Preventing Confusion: Workflow sleep vs Activity sleep

There is an unrelated [`sleep` utility function](https://typescript.temporal.io/api/classes/activity.context/#sleep) available in **Activity Context** that is not durable, but is cancellation aware. See [the Activities docs for details](/typescript/activities).

:::

### `condition`

The `condition(fn, timeout?)` API returns a promise that resolves:

- `true` when the given predicate function (**must be synchronous**) returns `true` or
- (optional) `false` if a timeout (given as a string or number of milliseconds) happens first.

This API is comparable to `Workflow.await` in other SDKs and often used to wait for Signals, since Signals are the main way to asynchronously update internal Workflow state (looped Activities are another).

The timeout also uses the [ms](https://www.npmjs.com/package/ms) package to take either a string or number of milliseconds.

```ts
// type signature
export function condition(
  fn: () => boolean,
  timeout: number | string
): Promise<boolean>;
export function condition(fn: () => boolean): Promise<void>;

// Usage
import * as wf from '@temporalio/workflow';

let x = 0;
// do stuff with x, eg increment every time you receive a signal
await wf.condition(() => x > 3);
// you only reach here when x > 3

// await either x > 3 or 30 minute timeout, whichever comes first
if (await wf.condition(() => x > 3, '30 mins')) {
  // reach here if predicate true
} else {
  // reach here if timed out
}

// track user progress with condition
export async function trackStepChanges(): Promise<void> {
  let step = 0;
  wf.setHandler(updateStep, (s) => void (step = s));
  wf.setHandler(getStep, () => step);
  await wf.condition(() => step === 1);
  await wf.condition(() => step === 2);
}
```

<details>
<summary>Example usage in our Next.js One-Click Buy code sample</summary>

`condition` only returns true when the function evaluates to `true`; if the `condition` resolves as `false`, then a timeout has occurred.
This leads to some nice patterns, like placing `await condition` inside an `if`:

<!--SNIPSTART typescript-oneclick-buy-->
[nextjs-ecommerce-oneclick/temporal/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/nextjs-ecommerce-oneclick/temporal/src/workflows.ts)
```ts
export async function OneClickBuy(itemId: string) {
  const itemToBuy = itemId;
  let purchaseState: PurchaseState = 'PURCHASE_PENDING';
  wf.setHandler(cancelPurchase, () => void (purchaseState = 'PURCHASE_CANCELED'));
  wf.setHandler(purchaseStateQuery, () => purchaseState);
  if (await wf.condition(() => purchaseState === 'PURCHASE_CANCELED', '5s')) {
    return await canceledPurchase(itemToBuy);
  } else {
    purchaseState = 'PURCHASE_CONFIRMED';
    return await checkoutItem(itemToBuy);
  }
}
```
<!--SNIPEND-->

</details>

:::warning `condition` Antipatterns

- No time based condition functions are allowed in your function as this is very error prone.
  Use the optional `timeout` arg or a `sleep` timer.
- `condition` only accepts **synchronous** functions that return a boolean.
  Do not put async functions, like Activities, inside the `condition` function.

:::

<!--TODO: give an idea of what the bad code looks like and why its bad-->

### Async design patterns

The real value of `sleep` and `condition` is in knowing how to use them to model asynchronous business logic.
Here are some examples we use the most; we welcome more if you can think of them!

<details>
<summary>
Racing Timers
</summary>

Use `Promise.race` with Timers to dynamically adjust delays.

```ts
export async function processOrderWorkflow({
  orderProcessingMS,
  sendDelayedEmailTimeoutMS,
}: ProcessOrderOptions): Promise<void> {
  let processing = true;
  const processOrderPromise = processOrder(orderProcessingMS).then(() => {
    processing = false;
  });

  await Promise.race([processOrderPromise, sleep(sendDelayedEmailTimeoutMS)]);

  if (processing) {
    await sendNotificationEmail();
    await processOrderPromise;
  }
}
```

</details>
<details>
<summary>
Racing Signals
</summary>

Use `Promise.race` with Signals and Triggers to have a promise resolve at the earlier of either system time or human intervention.

```ts
import { Trigger, sleep, defineSignal } from '@temporalio/workflow';

const userInteraction = new Trigger<boolean>();
const completeUserInteraction = defineSignal('completeUserInteraction');

export async function myWorkflow(userId: string) {
  setHandler(completeUserInteraction, () => userInteraction.resolve(true)); // programmatic resolve
  const userInteracted = await Promise.race([
    userInteraction,
    sleep('30 days'),
  ]);
  if (!userInteracted) {
    await sendReminderEmail(userId);
  }
}
```

You can invert this to create a Reminder pattern where the promise resolves IF no Signal is received.

:::warning Antipattern: Racing sleep.then

Be careful when racing a chained `sleep`. This may cause bugs because the chained `.then` will still continue to execute.

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

```ts
import * as wf from '@temporalio/workflow';

// usage
export async function countdownWorkflow(): Promise<void> {
  const target = Date.now() + 24 * 60 * 60 * 1000; // 1 day!!!
  const timer = new UpdatableTimer(target);
  console.log('timer set for: ' + new Date(target).toString());
  wf.setHandler(setDeadlineSignal, (deadline) => {
    // send in new deadlines via Signal
    timer.deadline = deadline;
    console.log('timer now set for: ' + new Date(deadline).toString());
  });
  wf.setHandler(timeLeftQuery, () => timer.deadline - Date.now());
  await timer; // if you send in a signal with a new time, this timer will resolve earlier!
  console.log('countdown done!');
}
```

This is available in the third party [`temporal-time-utils`](https://www.npmjs.com/package/temporal-time-utils#user-content-updatabletimer) package where you can also see the implementation:

```ts
// implementation
export class UpdatableTimer implements PromiseLike<void> {
  deadlineUpdated = false;
  #deadline: number;

  constructor(deadline: number) {
    this.#deadline = deadline;
  }

  private async run(): Promise<void> {
    /* eslint-disable no-constant-condition */
    while (true) {
      this.deadlineUpdated = false;
      if (
        !(await wf.condition(
          () => this.deadlineUpdated,
          this.#deadline - Date.now()
        ))
      ) {
        break;
      }
    }
  }

  then<TResult1 = void, TResult2 = never>(
    onfulfilled?: (value: void) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
  ): PromiseLike<TResult1 | TResult2> {
    return this.run().then(onfulfilled, onrejected);
  }

  set deadline(value: number) {
    this.#deadline = value;
    this.deadlineUpdated = true;
  }

  get deadline(): number {
    return this.#deadline;
  }
}
```

</details>

### Triggers

[Triggers](https://typescript.temporal.io/api/classes/workflow.trigger) are an experimental Promise-like concept in the TypeScript SDK.

Triggers, like Promises, can be awaited and expose a `then` method.
Unlike Promises, they export `resolve` or `reject` methods, so you can programmatically control them.

<details>
<summary>
Trigger Code Example
</summary>

```ts
import { Trigger, sleep, defineSignal } from '@temporalio/workflow';

const userInteraction = new Trigger<boolean>();
const completeUserInteraction = defineSignal('completeUserInteraction');

export async function myWorkflow(userId: string) {
  setHandler(completeUserInteraction, () => userInteraction.resolve(true)); // programmatic resolve
  const userInteracted = await Promise.race([
    userInteraction,
    sleep('30 days'),
  ]);
  if (!userInteracted) {
    await sendReminderEmail(userId);
  }
}
```

`Trigger` is `CancellationScope`-aware. It is linked to the current scope on construction and throws when that scope is cancelled.

</details>

In most cases, you should now be able to use `condition` instead of Triggers, and we may deprecate Triggers in future.

## Child Workflows

Besides Activities, a Workflow can also start other, "Child" Workflows.
Child Workflows have a subset of APIs from [Temporal Clients](/typescript/clients), including how to start/execute/handle Workflows.

[`startChild`](https://typescript.temporal.io/api/namespaces/workflow/#startchild) starts a child workflow without awaiting completion, and returns a [`ChildWorkflowHandle`](https://typescript.temporal.io/api/interfaces/workflow.ChildWorkflowHandle):

```ts
import { startChild } from '@temporalio/workflow';

export async function parentWorkflow(names: string[]) {
  const childHandle = await startChild(childWorkflow, {
    args: [name],
    // workflowId, // add business-meaningful workflow id here
    // // regular workflow options apply here, with two additions (defaults shown):
    // cancellationType: ChildWorkflowCancellationType.WAIT_CANCELLATION_COMPLETED,
    // parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_TERMINATE
  });
  // you can use childHandle to signal or get result here
  await childHandle.signal('anySignal');
  const result = childHandle.result();
  // you can use childHandle to signal, query, cancel, terminate, or get result here
}
```

You should use [cancellationScopes](/typescript/cancellation-scopes) if you need to cancel Child Workflows.

[`executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#executechild) starts a child workflow and awaits (blocks until) its completion:

<!--SNIPSTART typescript-child-workflow-->
[child-workflows/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/child-workflows/src/workflows.ts)
```ts
import { executeChild } from '@temporalio/workflow';

export async function parentWorkflow(...names: string[]): Promise<string> {
  const responseArray = await Promise.all(
    names.map((name) =>
      executeChild(childWorkflow, {
        args: [name],
        // workflowId, // add business-meaningful workflow id here
        // // regular workflow options apply here, with two additions (defaults shown):
        // cancellationType: ChildWorkflowCancellationType.WAIT_CANCELLATION_COMPLETED,
        // parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_TERMINATE
      })
    )
  );
  return responseArray.join('\n');
}
```
<!--SNIPEND-->

To control any running Workflow from inside a Workflow, use [`getExternalWorkflowHandle(workflowId)`](https://typescript.temporal.io/api/namespaces/workflow/#getexternalworkflowhandle).

```ts
import { getExternalWorkflowHandle, workflowInfo } from '@temporalio/workflow';

export async function terminateWorkflow() {
  const { workflowId } = workflowInfo(); // no await needed
  const handle = getExternalWorkflowHandle(workflowId); // sync function, not async
  await handle.cancel();
}
```

Special Notes:

- Child Workflow options automatically inherit their values from the Parent Workflow options if they are not explicitly set. They have two advanced options unique to Child Workflows:
  - [`cancellationType`](https://typescript.temporal.io/api/enums/proto.coresdk.child_workflow.ChildWorkflowCancellationType): Controls at which point to throw the CanceledFailure exception when a child workflow is cancelled
  - `parentClosePolicy`: Explained below
- Child Workflow executions are [`CancellationScope`](/typescript/cancellation-scopes) aware and will automatically be cancelled when their containing scope is cancelled.

<details>
<summary>
When to use Child Workflows vs Activities
</summary>

Child Workflows and Activities are both started from Workflows, so you may feel confused about when to use which.
Here are some important differences:

- Child Workflows have access to all Workflow APIs, but are subject to [Workflow Limitations](/typescript/workflows#workflow-limitations). Activities have the inverse pros and cons.
- Child Workflows can continue on if their Parent is canceled, with a [ParentClosePolicy](/concepts/what-is-a-parent-close-policy/) of `ABANDON`, whereas Activities are _always_ canceled when their Workflow is canceled (they may react to a [cancellationSignal](/typescript/activities#activity-cancellation) for cleanup if canceled). The decision is roughly analogous to spawning a child process in a terminal to do work vs doing work in the same process.
- Temporal tracks all state changes within Child Workflows in Event History, whereas only the input, output, and retry attempts of Activities are tracked.

Activities usually model a single operation on the external world. Workflows are modeling composite operations that consist of multiple activities or other child workflows.

**When in doubt, use Activities.**

</details>

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/concepts/what-is-a-child-workflow-execution","explanation"]
]}
/>

### Parent Close Policy

import PCP from '../concepts/what-is-a-parent-close-policy.md'

<PCP />

<span id="continueasnew" />

## `continueAsNew`

We need to call `continueAsNew` before our Workflow hits the 50,000 Event limit. [Events](../concepts/what-is-an-event) are generated when a Workflow does various things involving Temporal Server, including calling an Activity, receiving a Signal, or calling `sleep`, but not handling a Query.

<details>
<summary>More info</summary>

[What is Continue-As-New?](/concepts/what-is-continue-as-new)

</details>

[`continueAsNew`](https://typescript.temporal.io/api/namespaces/workflow#continueasnew) stops the current Workflow Execution and starts another one with new arguments and an empty Event History. Note that this is done immediately, so make sure that your Signal handlers have finished running before calling `continueAsNew`.

<!--SNIPSTART typescript-continue-as-new-workflow-->
[continue-as-new/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/continue-as-new/src/workflows.ts)
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
<!--SNIPEND-->

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow (or different Task Queue) using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/namespaces/workflow/#makecontinueasnewfunc).

If you need to know whether a Workflow was started via `continueAsNew`, you can pass an optional last argument as true:

```ts
export async function loopingWorkflow(foo: any, isContinued?: boolean) {
  // some logic based on foo, branching on isContinued

  (await continueAsNew)<typeof loopingWorkflow>(foo, true);
}
```

### Don't overuse

You should not try to call `continueAsNew` too often - if at all!
It's primary purpose is to truncate event history, which if too large may slow down your workflows and eventually cause an error. Calling it too frequently to be preemptive can cause other performance issues as each new Workflow Execution has overhead.

Temporal's default limits are set to warn you at 10,000 events in a single Workflow Execution, and error at 50,000.
This is sufficient for:

- If executing one activity a day, it can support an infinite loop for over 2 decades (27 years)
- If executing one activity an hour, it can support an infinite loop for over 1 year (417 days)
- If executing one activity a minute, it can support an infinite loop for over 1 week (7 days)

without even resorting to `continueAsNew`.

Our recommendation is to size it to continue as new between once a day to once a week, to ensure old version branches can be removed in a timely manner.

### Example

Here is a simple pattern that we recommend to represent a single entity. It keeps track of the number of iterations regardless of frequency, and calls `continueAsNew` while properly handling pending updates from Signals.

```tsx
interface Input {
  /* define your workflow input type here */
}
interface Update {
  /* define your workflow update type here */
}

const MAX_ITERATIONS = 1;

export async function entityWorkflow(
  input: Input,
  isNew = true
): Promise<void> {
  try {
    const pendingUpdates = Array<Update>();
    setHandler(updateSignal, (updateCommand) => {
      pendingUpdates.push(updateCommand);
    });

    if (isNew) {
      await setup(input);
    }

    for (let iteration = 1; iteration <= MAX_ITERATIONS; ++iteration) {
      // Ensure that we don't block the Workflow Execution forever waiting
      // for updates, which means that it will eventually Continue-As-New
      // even if it does not receive updates.
      await condition(() => pendingUpdates.length > 0, '1 day');

      while (pendingUpdates.length) {
        const update = pendingUpdates.shift();
        await runAnActivityOrChildWorkflow(update);
      }
    }
  } catch (err) {
    if (isCancellation(err)) {
      await CancellationScope.nonCancellable(async () => {
        await cleanup();
      });
    }
    throw err;
  }
  await continueAsNew<typeof entityWorkflow>(input, false);
}
```

<span id="putting-it-all-together-schedule-workflow-example" />

## Putting it all together

Individually, the core Workflow APIs (Signals/Queries, sleep/condition, startChild/executeChild, and continueAsNew) are interesting, but they become truly powerful when wielded together.

We can illustrate this by building an example Workflow that combines them.

### Schedule Workflow Example

One common request from users is for more powerful alternatives to [Cron Workflows](/typescript/clients#scheduling-cron-workflows). We can try implementing them with the Workflow API primitives we have learned here.

Some desirable requirements:

- One Parent Workflow that schedules `ChildWorkflow`s based on either a:
  - Cron string (with timezone support, eg "at 8am every day")
  - or "unaligned" sleep period (eg "every 3 hours")
- Allows setting:
  - a random "jitter" period to spread out execution
  - a maximum number of invocations, or have the schedules end by a set date
  - a "paused" or "running" state (that can also be queried)
- Allows querying:
  - the expected times of the next N invocations
  - the number of invocations so far
- Allows manual trigger at any point

Take some time to think about how you would implement these features, and then look at our suggested solution below.

<details>
<summary>Example CronScheduleWorkflow
</summary>

The desired clientside usage would look something like this:

```ts
// client.ts
const handle = await client.start(MyScheduleWorkflow, {
  args: [
    {
      cronParser: {
        expression: '0 8 * * *', // every day 8am
        options: {
          currentDate: '2016-03-27 00:00:01',
          endDate: new Date('Wed, 26 Dec 2012 14:40:00 UTC'),
          tz: 'Europe/Athens',
        },
      },
      maxInvocations: 500,
      jitterMs: 1000,
      userId, // defined elsewhere
    },
  ],
  taskQueue: 'scheduler',
  workflowId: 'schedule-for-' + userId,
});
```

This Workflow would want a `sleepUntil` timer at its core to power the scheduling - ideal for implementing clock-aligned "run at a set time" semantics. Temporal doesn't export `sleepUntil` for you - you can write your own with some simple time math.

```ts
import * as wf from '@temporalio/workflow';
import parser from 'cron-parser';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

// example atomic unit of work you are scheduling, can be workflow or activity or whatever
async function spawnChild(
  userId: string,
  nextTime: string,
  invocation: number
) {
  return wf.executeChild(childWorkflow, {
    args: [userId],
    workflowId: `childWorkflow-${invocation}-${nextTime}`,
    // // regular workflow options apply here, with two additions (defaults shown):
    // cancellationType: ChildWorkflowCancellationType.WAIT_CANCELLATION_COMPLETED,
    // parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_TERMINATE
  });
}

export async function sleepUntil(futureDate: string, fromDate = new Date()) {
  const timeUntilDate = differenceInMilliseconds(
    new Date(futureDate),
    fromDate
  );
  return wf.sleep(timeUntilDate);
}

// queries
export const numInvocationsQuery = wf.defineQuery('numInvocationsQuery');
export const futureScheduleQuery = wf.defineQuery('futureScheduleQuery');
export const manualTriggerSignal = wf.defineSignal('manualTriggerSignal');
export type ScheduleWorkflowState = 'RUNNING' | 'PAUSED' | 'STOPPED';
export const stateSignal =
  wf.defineSignal<[ScheduleWorkflowState]>('stateSignal');
export const stateQuery = wf.defineQuery<ScheduleWorkflowState>('stateQuery');

export async function CronScheduleWorkflow(
  args: {
    cronParser: {
      expression: string;
      options: parser.ParserOptions;
    };
    callbackFn: (nextTime?: string, invocations?: number) => Promise<void>;
    maxInvocations?: number;
    jitterMs?: number;
    userId?: string;
  },
  invocations = 1
) {
  // signal and query handlers
  wf.setHandler(numInvocationsQuery, () => invocations);
  wf.setHandler(manualTriggerSignal, () =>
    spawnChild(userId, nextTime.toString(), invocations++)
  );
  let scheduleWorkflowState = 'RUNNING' as ScheduleWorkflowState;
  wf.setHandler(stateQuery, () => scheduleWorkflowState);
  wf.setHandler(stateSignal, (state) => void (scheduleWorkflowState = state));

  const interval = parser.parseExpression(
    args.cronParser.expression,
    args.cronParser.options
  );
  const nextTime = interval.next().toString();
  wf.setHandler(futureScheduleQuery, (numEntriesInFutureSchedule?: number) => {
    const interval = parser.parseExpression(
      args.cronParser.expression,
      args.cronParser.options
    ); // reset interval
    return {
      futureSchedule: genNextTimes(numEntriesInFutureSchedule, () =>
        interval.next().toString()
      ),
      timeLeft: differenceInMilliseconds(new Date(nextTime), new Date()),
    };
  });

  // timer logic
  try {
    await sleepUntil(nextTime);
    if (args.jitterMs) {
      await wf.sleep(Math.floor(Math.random() * (args.jitterMs + 1)));
    }
    if (scheduleWorkflowState === 'PAUSED') {
      await wf.condition(() => scheduleWorkflowState === 'RUNNING');
    }
    await spawnChild(userId, nextTime.toString(), invocations); // no need to increment invocations bc relying on continueAsNew for that
    if (args.maxInvocations && args.maxInvocations > invocations) {
      await wf.continueAsNew<typeof CronScheduleWorkflow>(
        args,
        invocations + 1
      );
    } else {
      scheduleWorkflowState = 'STOPPED';
    }
  } catch (err) {
    if (wf.isCancellation(err)) scheduleWorkflowState = 'STOPPED';
    else throw err;
  }
}

// shared
function genNextTimes<T extends string | Date>(
  number = 5,
  getNextTimes: () => T
): T[] {
  const times = [];
  for (let i = 0; i < number; i++) {
    times.push(getNextTimes());
  }
  return times;
}
```

</details>

You can extend or add features as you please. For example, notice that we only implemented a very trivial cancellation cleanup step. By default, if a Parent Workflow is cancelled, all child workflows will be cancelled as well. What if you wanted them to carry on to completion? (Hint: check the `ParentClosePolicy`).

### Workflow Utility Libraries

As you build up strong opinions of how you'd like to compose behavior, you may want to publish reusable Temporal utility function or Temporal Workflow libraries. Let us know and we'd be happy to feature them here!

- [temporal-time-utils](https://www.npmjs.com/package/temporal-time-utils): Contains reusable versions of `sleepUntil`, `UpdatableTimer`, and `ScheduleWorkflow` described on this page.

Just keep in mind the difference between utility functions (deterministic, uses Workflow APIs but have to be inlined into Workflows rather than used standalone) and Workflow functions (can be used standalone, and subject to all Workflow limitations, including that all args and results must be JSON-serializable.)
