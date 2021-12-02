---
id: workflows
title: Workflows in TypeScript
sidebar_label: Workflows
description: Workflows are async functions that can orchestrate Activities and access special Workflow APIs, subject to deterministic limitations.
---

import RelatedReadList from '../components/RelatedReadList.js'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> **@temporalio/workflow** [![NPM](https://img.shields.io/npm/v/@temporalio/workflow)](https://www.npmjs.com/package/@temporalio/workflow) [API reference](https://typescript.temporal.io/api/namespaces/workflow) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/workflow)

**Workflows are async functions that can orchestrate Activities and access special Workflow APIs, subject to deterministic limitations**.

Each Workflow function has two parts:

- The function name is known as the **Workflow Type**.
- The function implementation code (body) is known as the **Workflow Definition**.

Each Workflow Definition is bundled with any third party dependencies, and registered by Workflow Type in a [Worker](/docs/typescript/workers).
A Workflow function becomes a **Workflow Execution** (instance) only when started from a [**Workflow Client**](/docs/typescript/clients) using its Workflow Type.

<!-- todo: we need a diagram here to show the relationship -->

## How to write a Workflow function

Workflow Definitions are "just functions", which can store state, and orchestrate [Activity functions](/docs/typescript/activities).

<!--SNIPSTART typescript-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The snippet above uses `proxyActivities` to create functions that, when called, schedule a `greet` Activity in the system to say "Hello World".

### Workflow Limitations

Workflow code must be [deterministic](/docs/typescript/determinism), and the TypeScript SDK replaces common sources of nondeterminism for you, like `Date.now()`, `Math.random`, and `setTimeout` (we recommend using our [`sleep`](/docs/typescript/workflows#sleep) API instead).
However, there are other important limitations:

- No Node built-ins like `process` or the `path` and `fs` modules
- No filesystem access
- No network access

These constraints don't apply inside Activities.
**If you need to ping an API, or access the filesystem (e.g. for building a CI/CD system), move that code into Activities.**

## How to Start and Cancel Workflows

See the [TypeScript SDK Client docs](/docs/typescript/clients) for how to use `WorkflowHandle`s to start, cancel, signal, query, describe and more.

### Workflow Options

Workflows have options that determine what Task Queue they run on, what Search Attributes they are tagged with, Cron schedule, and more, but they are only set in the Temporal Client call (i.e. when you start or execute a Workflow) rather than _inside_ the Workflow code itself.

Please see the [Temporal Client docs](/docs/typescript/clients) or the [API Reference](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) for more info on Workflow Options.

## Workflow APIs

The `@temporalio/workflow` package exports all the useful primitives that you can use in Workflows. See the [API reference](https://typescript.temporal.io/api/namespaces/workflow) for the full list, but the main ones are:

| APIs                         | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `proxyActivities`            | Make idempotent side effects (like making a HTTP request) with Activities ([see Activities doc](/docs/typescript/activities))                                                                                                                                                                                                                                                                                            |
| `defineSignal`/`defineQuery` | [Signal and Query](#signals-and-queries) Workflows while they are running                                                                                                                                                                                                                                                                                                                                                |
| `sleep`                      | Defer execution by [sleeping](#sleep) for fixed time                                                                                                                                                                                                                                                                                                                                                                     |
| `condition`                  | Defer execution until a [`condition`](#condition) is true, with optional timeout                                                                                                                                                                                                                                                                                                                                         |
| `startChild`/`executeChild`  | Spawn new [Child Workflows](#child-workflows) with customizable ParentClosePolicy                                                                                                                                                                                                                                                                                                                                        |
| `continueAsNew`              | Truncate Event History for [infinitely long running Workflows](#infinite-workflows)                                                                                                                                                                                                                                                                                                                                      |
| `patched`/`deprecatePatch`   | Migrate Workflows to new versions ([see Patching doc](/docs/typescript/patching))                                                                                                                                                                                                                                                                                                                                        |
| `uuid4`                      | Generate an RFC compliant V4 [uuid](https://typescript.temporal.io/api/namespaces/workflow/#uuid4) without needing to call an Activity or Side Effect.                                                                                                                                                                                                                                                                   |
| APIs for advanced users      | including [`workflowInfo`](https://typescript.temporal.io/api/namespaces/workflow#workflowinfo) (to retrieve Workflow metadata), Workflow data [`Sinks`](/docs/typescript/logging), [Cancellation Scopes](/docs/typescript/cancellation-scopes), [Failure types](/docs/typescript/handling-failure), and [`getExternalWorkflowHandle`](https://typescript.temporal.io/api/namespaces/workflow#getexternalworkflowhandle) |

We fully expect that developers will bundle these into their own reusable Workflow libraries.
If you do, please [get in touch on Slack](https://temporal.io/slack), we would love to work with you and promote your work.

The rest of this document explains the major Workflow APIs you should know:

- Signals and Queries: `defineSignal`, `defineQuery`, and `setHandler`
- Deferred Execution: `sleep` and `condition`
- Child Workflows: `startChild` and `executeChild`
- Infinite Workflows: `continueAsNew`

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
Since both involve communicating with a Workflow, using them is a two step process:

1. add them inside the Workflow code
2. call them from the Client code

### How to define Signals and Queries inside a Workflow

- To add a Signal to a Workflow, call [`defineSignal`](https://typescript.temporal.io/api/namespaces/workflow/#definesignal) with a name, and then attach a listener with `setHandler`.
- To add a Query to a Workflow, call [`defineQuery`](https://typescript.temporal.io/api/namespaces/workflow/#definequery) with a name, and then attach a listener with `setHandler`.
- Handlers for both Signals and Queries can take arguments, which can be used inside `setHandler` logic.
- Only Signal Handlers can mutate state, and only Query Handlers can return values.

### Define Signals and Queries Statically

If you know the name of your signals and queries upfront, you can define them separately from where you handle them.
This helps provide type safety, since you can export the type signature of the signal or query to be called on the clientside.

<!--SNIPSTART typescript-blocked-workflow-->
<!--SNIPEND-->

### Define Signals and Queries Dynamically

For more flexible usecases, you may want a dynamic signal (such as a generated ID).
You may handle it in two ways:

- avoid making it dynamic by collapsing all signals in one handler and move the ID to the payload, or
- actually make the signal name dynamic by inlining the signal definition per handler.

```ts
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
```

<details>
  <summary>
    API Design FAQs
  </summary>

#### Why not `new Signal` and `new Query`?

The semantic of `defineSignal`/`defineQuery` is intentional, in that they return Signal/Query **Definitions**, not unique instances of Signals and Queries themselves. [View source](https://github.com/temporalio/sdk-typescript/blob/fc658d3760e6653aec47732ab17a0062b7dd23fc/packages/workflow/src/workflow.ts#L884-L907):

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
This will be clearer if you refer to to the Client-side APIs below.

#### Why `setHandler` and not OTHER_API?

We named it `setHandler` instead of `subscribe` because Signals/Queries can only have one "handler" at a time, whereas `subscribe` could imply an Observable with multiple consumers, and is a higher level construct.

```ts
setHandler(MySignal, handlerFn1);
setHandler(MySignal, handlerFn2); // replaces handlerFn1
```

If you are familiar with Rxjs, you are free to wrap your Signal and Query into Observables if you wish, or you could dynamically reassign the listener based on your business logic/Workflow state.

</details>

### How to invoke Signals and Queries from a Client

Sending Signals and making Queries requires having a Workflow handle from a [Temporal Client](/docs/typescript/clients).

- You send a Signal with `handle.signal(signal, ...args)`. A Signal has no return value by definition.
- You make a Query with `handle.query(query, ...args)`. A Query needs a return value, but can also take args.
- You can refer to either by string name, which is useful for dynamic reference, but you will lose type inference.

```ts
// // inside Workflow code (or Client code)
const increment = defineSignal<[number]>('increment');
const count = defineQuery<number /*, Arg[] can be added here */>('count');

// // inside Client code
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
import {
  defineSignal,
  defineQuery,
  setHandler,
  sleep,
} from '@temporalio/workflows';

function useState<T = any>(name: string, initialValue: T) {
  const signal = defineSignal<[T]>(name);
  const query = defineQuery<T>(name);
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
  setHandler(store.signal, (newValue: T) => {
    // console.log('updating ', name, newValue) // optional but useful for debugging
    state = store.value;
  });
  setHandler(store.query, () => store.value);
  while (true) {
    console.log('sleeping for ', store.value);
    sleep(store.value++ * 100); // you can mutate the value as well
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
function MyWorkflow(signallable: boolean, signalNames: string[]) {
  // conditional setting of handlers
  if (signallable) {
    setHandler(MySignal, handler);
  }

  // set same handler for an array of signals by name
  signalNames.forEach((name) => setHandler(name, handler));

  // signal handler that sets signal handlers
  // // would be nice to send a function but we can't because it is not serializable
  setHandler(MySignal, (handlerName) => {
    setHandler(handlerName, handlers[handlerName]);
  });
}
```

### Additional Signals and Queries Notes

#### Type-safety for Signals and Queries

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

#### Notes on Signals

- Signal handlers are only guaranteed to be called in order **per Signal Type**, not across all of them.
  If you need strict ordering across multiple Signals, combine them into one Signal Type and use a `switch` statement.
- `WorkflowHandle.signal` resolves as soon as Temporal Server has persisted the Signal, before the Workflow's Signal handler is called.
- `WorkflowHandle.signal` Promise resolves with no value; **Signal handlers cannot return data to the caller.**
- **No Synchronous Updates**.
  Users often want Signals to return a value, for example, a validation error.
  However Temporal has no way to surface any error to the external invocation.
  Signals are always asynchronous, in other words, **a Signal always succeeds**.
  Long term, the solution to this is "Synchronous Update" and we plan to add it in future.

For now [the best workaround](https://community.temporal.io/t/signalling-system-human-driven-workflows/160/2) is to use a Query to return Workflow state after signaling.
Temporal guarantees read-after-write consistency of Signals-followed-by-Queries.

#### Notes on Queries

> 🚨 WARNING: NEVER mutate Workflow state inside a query! This would be a source of non-determinism.

:::danger How NOT to write a Query

This mutates Workflow state - do not do this:

```ts
export function badExample() {
  let someState = 123;
  setHandler(query, () => {
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
  setHandler(unblockSignal, () => (isBlocked = false));
  setHandler(isBlockedQuery, () => isBlocked);
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
  workflowId,
  args: [arg1, arg2],
  signal: MySignal,
  signalArgs: [arg3, arg4],
});
```

See the [Workflow Client](/docs/typescript/workflows) docs for more notes on how starting Workflows and Workflow Options look like.

## Deferred Execution

`sleep` and `condition` help you write durable asynchronous code in Temporal by offering an easy to use Promise-like API, but deferring, persisting, and resuming execution behind the scenes.

The Temporal Workflow's v8 isolate environment completely replaces the JavaScript [`setTimeout`](https://typescript.temporal.io/api/namespaces/workflow/#timers) global including inside libraries that you use, to provide a complete JS runtime.
We recommend using our [`sleep(timeout)`](https://typescript.temporal.io/api/namespaces/workflow/#sleep) API instead, as it is a cancellation-aware Promise wrapper for `setTimeout`.

<details>
<summary>
Why Durable Timers Are a Hard Problem
</summary>

JavaScript has a `setTimeout`, which seems relatively straightforward.
However, they are held in memory - if your system goes down, those timers are gone.

A lot of careful code is required to make these timeouts fully reliable (aka recoverable in case of outage.)
Beyond that, further engineering is needed to scale this - imagine 100,000 independently running timers in your system, firing every minute.
That is the kind of scale Temporal handles.

<!-- Note: these are rough Durable Timer notes from Maxim - we should build out examples and really hit home why you want to use us rather than write your own, in future.
When writing Workflows with timers, you need to take care that it handles jumps of time.
What we mean by "handling jumps": if you had timers that were supposed to go off at 1.15, 1.30, and 1.45pm, and your system goes down from 1pm to 2pm, then at 2pm when the system comes back up all 3 timers will fire at once. If your workflow code relies on the timers resolving in precise order, write these checks yourself.
-->

</details>

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

You can convert a string representation of a future date with `date-fns`:

```ts
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

async function sleepUntil(futureDate, fromDate = new Date()) {
  const timeUntilDate = differenceInMilliseconds(
    new Date(futureDate),
    fromDate
  );
  return sleep(timeUntilDate);
}

sleepUntil('30 Sep ' + (new Date().getFullYear() + 1)); // wake up when September ends
sleepUntil('5 Nov 2022 00:12:34 GMT'); // wake up at specific time and timezone
```

You can check the valid ISO string formats on [MDN's Date docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse). The upcoming [ECMAScript Temporal API](https://tc39.es/proposal-temporal/docs/index.html) will offer more time utilities natively in JavaScript, alongside unfortunate name collision for Temporal developers.

`sleep` is cancellation-aware, meaning that when the workflow gets cancelled, the `sleep` timer is canceled and the promise is rejected:

```ts
await sleep('30 days').catch(() => {
  // clean up code if workflow is canceled during sleep
});
```

You can read more on [the Cancellation Scopes doc](/docs/typescript/cancellation-scopes).

:::caution Preventing Confusion: Workflow sleep vs Activity sleep

There is an unrelated [`sleep` utility function](https://typescript.temporal.io/api/classes/activity.context/#sleep) available in **Activity Context** that is not durable, but is cancellation aware. See [the Activities docs for details](/docs/typescript/activities).

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
import { condition, setHandler } from '@temporalio/workflow';

let x = 0;
// do stuff with x, eg increment every time you receive a signal
await condition(() => x > 3);
// you only reach here when x > 3

// await either x > 3 or 30 minute timeout, whichever comes first
if (await condition(() => x > 3, '30 mins')) {
  // reach here if predicate true
} else {
  // reach here if timed out
}

// track user progress with condition
export async function trackStepChanges(): Promise<void> {
  let step = 0;
  setHandler(updateStep, (s) => void (step = s));
  setHandler(getStep, () => step);
  await condition(() => step === 1);
  await condition(() => step === 2);
}
```

<details>
<summary>Example usage in our Next.js One-Click Buy code sample</summary>

`condition` only returns true when the function evaluates to `true`; if the `condition` resolves as `false`, then a timeout has occurred.
This leads to some nice patterns, like placing `await condition` inside an `if`:

<!--SNIPSTART typescript-oneclick-buy-->
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
// usage
export async function countdownWorkflow(): Promise<void> {
  const target = Date.now() + 24 * 60 * 60 * 1000; // 1 day!!!
  const timer = new UpdatableTimer(target);
  console.log('timer set for: ' + new Date(target).toString());
  setListener(setDeadlineSignal, (deadline) => {
    // send in new deadlines via Signal
    timer.deadline = deadline;
    console.log('timer now set for: ' + new Date(deadline).toString());
  });
  setListener(timeLeftQuery, () => timer.deadline - Date.now());
  await timer; // if you send in a signal with a new time, this timer will resolve earlier!
  console.log('countdown done!');
}

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
        !(await condition(
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

In most cases, you should now be able to use `condition` instead of Triggers, and we may deprecate Triggers in future..

## Child Workflows

Besides Activities, a Workflow can also start other, "Child" Workflows.
Child Workflows have a subset of APIs from [Temporal Clients](/docs/typescript/clients), including how to start/execute/handle Workflows.

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

You should use [cancellationScopes](/docs/typescript/cancellation-scopes) if you need to cancel Child Workflows.

[`executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#executechild) starts a child workflow and awaits (blocks until) its completion:

<!--SNIPSTART typescript-child-workflow-->
<!--SNIPEND-->

To control any running Workflow from inside a Workflow, use [`getExternalWorkflowHandle(workflowId)`](https://typescript.temporal.io/api/namespaces/workflow/#getexternalworkflowhandle).

```ts
import { getExternalWorkflowHandle, workflowInfo } from '@temporalio/workflow';

export async function terminateWorkflow() {
  const { workflowId } = workflowInfo(); // no await needed
  const handle = await getExternalWorkflowHandle(workflowId);
  await handle.terminate();
}
```

Special Notes:

- Child Workflow options automatically inherit their values from the Parent Workflow options if they are not explicitly set. They have two advanced options unique to Child Workflows:
  - [`cancellationType`](https://typescript.temporal.io/api/enums/proto.coresdk.child_workflow.ChildWorkflowCancellationType): Controls at which point to throw the CanceledFailure exception when a child workflow is cancelled
  - `parentClosePolicy`: Explained below
- Child Workflow executions are [`CancellationScope`](/docs/typescript/cancellation-scopes) aware and will automatically be cancelled when their containing scope is cancelled.

<details>
<summary>
When to use Child Workflows vs Activities
</summary>

Child Workflows and Activities are both started from Workflows, so you may feel confused about when to use which.
Here are some important differences:

- Child Workflows have access to all Workflow APIs, but are subject to [Workflow Limitations](/docs/typescript/workflows#workflow-limitations). Activities have the inverse pros and cons.
- Child Workflows can continue on if their Parent is canceled, with a [ParentClosePolicy](/docs/content/what-is-a-parent-close-policy/) of `ABANDON`, whereas Activities are _always_ canceled when their Workflow is canceled (they may react to a [cancellationSignal](/docs/typescript/activities#activity-cancellation) for cleanup if canceled). The decision is roughly analogous to spawning a child process in a terminal to do work vs doing work in the same process.
- Temporal tracks all state changes within Child Workflows in Event History, whereas only the input, output, and retry attempts of Activities are tracked.

Activities usually model a single operation on the external world. Workflows are modeling composite operations that consist of multiple activities or other child workflows.

**When in doubt, use Activities.**

</details>

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/docs/content/what-is-a-child-workflow-execution","explanation"]
]}
/>

### Parent Close Policy

import PCP from '../content/what-is-a-parent-close-policy.md'

<PCP />

## Infinite Workflows

<details>
<summary>Why ContinueAsNew is needed
</summary>

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

</details>

### The `continueAsNew` API

Use the [`continueAsNew`](https://typescript.temporal.io/api/namespaces/workflow#continueasnew) API to instruct the TypeScript SDK to restart a Workflow with a new starting value and a new event history.

<!--SNIPSTART typescript-continue-as-new-workflow-->
<!--SNIPEND-->

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow (or different Task Queue) using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/namespaces/workflow/#makecontinueasnewfunc).

If you need to know whether a Workflow was started via `continueAsNew`, you can pass an optional last argument as true:

```ts
export async function loopingWorkflow(foo: any, isContinued?: boolean) {
  // some logic based on foo, branching on isContinued

  (await continueAsNew)<typeof loopingWorkflow>(foo, true);
}
```
