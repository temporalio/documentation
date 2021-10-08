---
id: timers
title: Timers in Node
sidebar_label: Timers
---

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

This SDK and associated documentation is in an Alpha stage and may change at any time.

</CustomWarning>

## What is a Timer?

> ⚠️ This doc is yet to be finalised - what you see below is a VERY rough draft.

The ability to set durable timers in Workflows is a core feature of Temporal that helps you write durable asynchronous code as easily as you do synchronous ones.

The core Timer APIs relevant to the Node.js SDK are:

- [`setTimeout`](https://nodejs.temporal.io/api/namespaces/workflow/#timers) global: completely replaced by the Workflow's v8 isolate environment, including inside libraries that you use.
- [`sleep(time)`](https://nodejs.temporal.io/api/namespaces/workflow/#sleep): a more convenient Promise wrapper for setTimeout
- `condition(function)`: A promise that resolves when a supplied function returns true. Comparable to `Workflow.await` in other SDKs.

:::caution Preventing Confusion

Temporal Timers are only available in Workflow code.

- There is an unrelated [`sleep` utility function](https://nodejs.temporal.io/api/classes/activity.context/#sleep) available in Activity Context that is not durable, but is cancellation aware. See [the Activities docs for details](/docs/node/activities).
- Timers are unrelated to Cron Workflows, which are a Workflow option that you can set for recurring Workflows. See [the Workflows docs for details](/docs/node/workflows).

:::

## Why Durable Timers Are a Hard Problem

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

## API Examples

`setTimeout` works as normal in JavaScript.

### `sleep`

`sleep` uses the [ms](https://www.npmjs.com/package/ms) package to take either a string or number of milliseconds.

```ts
/**
 * Asynchronous sleep. Schedules a timer on the Temporal service.
 *
 * @param ms sleep duration - formatted string or number of milliseconds
 */
export function sleep(ms: number | string): Promise<void> {

// durably sleep for 30 days
import { condition, sleep } from '@temporalio/workflow';

await sleep("30 days")
await sleep(30 * 24 * 60 * 60 * 1000)
```

### `condition`


`condition` blocks until its given function evaluates to `true`, or optionally, a timeout expires. 
The timeout also uses the [ms](https://www.npmjs.com/package/ms) package to take either a string or number of milliseconds.

```ts
/**
 * Returns a Promise that resolves when `fn` evaluates to `true` or `timeout` expires.
 *
 * @param timeou - formatted string or number of milliseconds
 *
 * @returns a boolean indicating whether the condition was true before the timeout expires
 */
export function condition(timeout: number | string, fn: () => boolean): Promise<boolean>;

/**
 * Returns a Promise that resolves when `fn` evaluates to `true`.
 */
export function condition(fn: () => boolean): Promise<void>;


// await a condition to be true
import { condition } from '@temporalio/workflow';

let x = 0;
// do stuff with x, eg increment every time you receive a signal
await condition(() => x > 3)
// you only reach here when x > 3

// await earlier of condition to be true or 30 day timeout
await condition('30 days', () => x > 3)
```

## Timer Design Patterns

There are only a few Timer APIs, but the important part is knowing how to use them to model asynchronous businses logic. Here are some examples we use the most; we welcome more if you can think of them!

### Racing Timers

Use `Promise.race` with Signals and Triggers to have a promise resolve at the earlier of either system time or human intervention.

```ts
import { Trigger, createActivityHandle, sleep } from '@temporalio/workflow';
// // Only import the activity types
import type * as activities from '../activities';

const { checkoutItem, canceledPurchase } = createActivityHandle<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

type PurchaseState = 'PENDING' | 'CONFIRMED' | 'CANCELED';

export const OneClickBuy = (itemId: string) => {
  let itemToBuy = itemId;
  let purchaseState: PurchaseState = 'PENDING';
  const cancelTrigger = new Trigger<string>();
  return {
    signals: {
      cancelPurchase(cancelReason: string): void {
        cancelTrigger.reject(cancelReason);
      },
    },
    queries: {
      purchaseState(): null | PurchaseState {
        return purchaseState;
      },
    },
    async execute(): Promise<string> {
      try {
        await Promise.race([
          cancelTrigger,
          sleep(30 * 1000), // 30 seconds
        ]);
        return await checkoutItem(itemToBuy);
      } catch (err) {
        return await canceledPurchase(itemToBuy);
      }
    },
  };
};
```

Example usecases:

- One click purchases

### Reminder Timer pattern

A variant of the Race Timer pattern where the promise resolves IF no Signal is received:

- TODO: The sample starts a long running order processing operation and starts a Timer. If the processing time is too long, a notification email is "sent" to the user regarding the delay (the execution does not cancel). If the operation finishes before the Timer fires, then the Timer is cancelled.

<!-- SNIPSTART nodejs-timer-reminder-workflow -->
<!--SNIPEND-->

### Updatable Timer

TODO: adapt go sample: Updatable Timer: Demonstrates timer cancellation and use of a Selector to wait on a Future and a Channel simultaneously.
