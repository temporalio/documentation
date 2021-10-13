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

The ability to set durable timers in Workflows is a core feature of Temporal that helps you write durable asynchronous code as easily as you do synchronous ones (often used closely with signals and queries).
Temporal offers you a small set of primitives that you can use to build reusable workflow libraries and utilities.

Some example design patterns are provided below to give you a head start.

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

This document only covers Workflow Timers.

- There is an unrelated [`sleep` utility function](https://nodejs.temporal.io/api/classes/activity.context/#sleep) available in Activity Context that is not durable, but is cancellation aware. See [the Activities docs for details](/docs/node/activities).
- Timers are unrelated to Cron Workflows, which are a Workflow option that you can set for recurring Workflows. See [the Workflows docs for details](/docs/node/workflows).
- If you need to block for an _indefinite_ period of time instead of a set time, you may want the `condition` API instead. See [the Signals and Queries docs for details](/docs/node/signals-queries).

:::

## API Examples

The core Timer APIs relevant to the Node.js SDK are:

- The [`setTimeout`](https://nodejs.temporal.io/api/namespaces/workflow/#timers) global works as normal in JavaScript.
  The Workflow's v8 isolate environment completely replaces it, including inside libraries that you use, to provide a complete JS runtime.
  We recommend using our `sleep` API instead of `setTimeout` because it supports cancellation (see below).
- [`sleep(timeout)`](https://nodejs.temporal.io/api/namespaces/workflow/#sleep): a cancellation-aware Promise wrapper for `setTimeout`, that accepts either a string or integer timeout.

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

## Timer Design Patterns

There are only a few Timer APIs, but the important part is knowing how to use them to model asynchronous business logic. Here are some examples we use the most; we welcome more if you can think of them!

### Racing Timers

Use `Promise.race` with Signals and Triggers to have a promise resolve at the earlier of either system time or human intervention.

<!-- SNIPSTART nodejs-oneclick-buy -->
<!--SNIPEND-->

### Reminder Timer pattern

A variant of the Race Timer pattern where the promise resolves IF no Signal is received:

- TODO: The sample starts a long running order processing operation and starts a Timer. If the processing time is too long, a notification email is "sent" to the user regarding the delay (the execution does not cancel). If the operation finishes before the Timer fires, then the Timer is cancelled.

<!-- SNIPSTART nodejs-timer-reminder-workflow -->
<!--SNIPEND-->

### Updatable Timer

Here is how you can build an updatable timer with `condition`:

<!-- SNIPSTART nodejs-updatable-timer-impl -->
<!-- SNIPEND-->

If you are working on a Workflow or utility library, please [get in touch on Slack](https://temporal.io/slack), we would love to help you and promote your work.

## Antipattern: Racing Sleep.then

Be careful when racing a chained `sleep`. This may cause bugs.

```js
await Promise.race([
  sleep('5s').then(() => (status = 'timed_out'),
  somethingElse.then(() => (status = 'processed')),
]);

if (status === 'processed') await complete(); // takes more than 5 seconds
// status = timed_out
```
