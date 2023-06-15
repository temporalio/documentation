---
id: how-to-define-signals-and-queries-statically-or-dynamically
title: How to define Signals and Queries statically or dynamically
description: Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
sidebar_label: Static and dynamic Signals and Queries
tags:
  - guide-context
---

- Handlers for both Signals and Queries can take arguments, which can be used inside `setHandler` logic.
- Only Signal Handlers can mutate state, and only Query Handlers can return values.

### Define Signals and Queries statically

If you know the name of your Signals and Queries upfront, we recommend declaring them outside the Workflow Definition.

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

This technique helps provide type safety because you can export the type signature of the Signal or Query to be called by the Client.

### Define Signals and Queries dynamically

For more flexible use cases, you might want a dynamic Signal (such as a generated ID).
You can handle it in two ways:

- Avoid making it dynamic by collapsing all Signals into one handler and move the ID to the payload.
- Actually make the Signal name dynamic by inlining the Signal definition per handler.

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

**Why not "new Signal" and "new Query"?**

The semantic of `defineSignal` and `defineQuery` is intentional.
They return Signal and Query **definitions**, not unique instances of Signals and Queries themselves
The following is their [entire source code](https://github.com/temporalio/sdk-typescript/blob/fc658d3760e6653aec47732ab17a0062b7dd23fc/packages/workflow/src/workflow.ts#L883-L907):

```ts
/**
 * Define a signal method for a Workflow.
 */
export function defineSignal<Args extends any[] = []>(
  name: string,
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
  name: string,
): QueryDefinition<Ret, Args> {
  return {
    type: 'query',
    name,
  };
}
```

Signals and Queries are instantiated only in `setHandler` and are specific to particular Workflow Executions.

These distinctions might seem minor, but they model how Temporal works under the hood, because Signals and Queries are messages identified by "just strings" and don't have meaning independent of the Workflow having a listener to handle them.
This will be clearer if you refer to the Client-side APIs.

**Why setHandler and not OTHER_API?**

We named it `setHandler` instead of `subscribe` because a Signal or Query can have only one "handler" at a time, whereas `subscribe` could imply an Observable with multiple consumers and is a higher-level construct.

```ts
wf.setHandler(MySignal, handlerFn1);
wf.setHandler(MySignal, handlerFn2); // replaces handlerFn1
```

If you are familiar with [RxJS](https://rxjs.dev/), you are free to wrap your Signals and Queries into Observables if you want, or you could dynamically reassign the listener based on your business logic or Workflow state.

</details>
