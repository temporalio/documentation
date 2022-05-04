This function takes two function, a Workflow Id and an amount to charge the card.
The following code is a Workflow that charges a card twice, 30 days apart.

```typescript
import { sleep } from '@temporalio/workflow';

async funtion MyWorkflow(id, amount) {
    await  chargeCard(id, amount);
    await wf.sleep('30 days') // durable
    await chargeCard(id, amount);
}
```

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
