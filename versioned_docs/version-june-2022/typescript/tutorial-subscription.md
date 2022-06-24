---
id: subscription-tutorial
title: TypeScript Workflow APIs Tutorial with a Subscription Example
sidebar_label: Subscription Tutorial
description: In this tutorial, we will tour all of the Workflow APIs you should know, primarily Signals, Queries, `condition`, and `sleep`, by building a realistic monthly subscription payments workflow that can be canceled and changed while it runs.
---

In this tutorial, we will tour all of the [Workflow APIs](/typescript/workflows#workflow-apis) you should know, primarily Signals, Queries, `condition`, and `sleep` (and eventually Child Workflows and `continueAsNew`), by building a realistic monthly subscription payments workflow that can be canceled and changed while it runs.

- The goal is to give you a more accessible introduction to these APIs by explaining them in context of a realistic application.
- We also give an example of how you break down project requirements into Activities and Workflow logic.

:::info Prerequisites

We assume that you have gone through our [Hello World tutorial](/typescript/hello-world) and understood the basics of getting a Temporal TypeScript SDK project up and running.

We don't assume knowledge of the Workflow APIs, but we do expect that you are reasonably comfortable with TypeScript/Node.js.

:::

We'll start out this project with the Hello World example, which you can always scaffold out with our Package Initializer:

```bash
npx @temporalio/create@latest subscription-tutorial --sample hello-world
```

**To skip straight to a fully working example, you can check our [Subscription Workflow repo](https://github.com/temporalio/subscription-workflow-project-template-typescript)** (it is slightly different from the code explained below, as this tutorial has been edited for readability and assumes you are comfortable with Node.js so the difference is immaterial).

## Project requirements

Our task is to write a Workflow for a limited time Subscription (eg a 36 month Phone plan) that satisfies these conditions:

1. When the user signs up, **send a welcome email** and start a free trial for `TrialPeriod`.
2. When the `TrialPeriod` expires, start the billing process
   - If the user cancels during the trial, **send a trial cancellation email**.
3. Billing Process:
   - As long as you have not exceeded `MaxBillingPeriods`,
   - **Charge the customer** for the `BillingPeriodChargeAmount`.
   - Then wait for the next `BillingPeriod`.
   - If the customer cancels during a billing period, **send a subscription cancellation email**.
   - If Subscription has ended normally (exceeded `MaxBillingPeriods` without cancellation), **send a subscription ended email**.
4. At any point while subscriptions are ongoing, be able to look up and change any customer's:
   - Amount Charged
   - Period number (for manual adjustments e.g. refunds)

Of course, this all has to be fault tolerant, scalable to millions of customers, testable, maintainable, observable... yada yada, that's... why you're here!

In future, we will extend this tutorial to look at what is needed for indefinitely long Subscriptions (Child Workflows and `continueAsNew`).

## Write the Activities

**Each of the bolded items in our requirements are actions involving the outside world** (charging customers, sending emails), so they should be written as [Activities](/typescript/activities).

Activities are not the focus of this tutorial so they are elided, but you may wish to write them first as they are self contained pieces of regular Node.js code, and you may discover more data model requirements in this process that impact how you write Workflows.

For now, we'll simply stub them out with `console.log`.

<!--SNIPSTART tsubscription-ts-activities {"enable_source_link": false}-->
<!--SNIPEND-->

## Write a simple Free Trial Workflow with `sleep`

A nice first subset of the requirements is to send the email, wait for the trial period, and then send the subscription ended email:

```ts
// /src/workflows.ts
import { sleep, proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { sendWelcomeEmail, sendSubscriptionOverEmail } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

export async function SubscriptionWorkflow(
  email: string,
  trialPeriod: string | number
) {
  await sendWelcomeEmail(email);
  await sleep(trialPeriod);
  await sendSubscriptionOverEmail(email);
}
```

Here we are using the `sleep` API for the first time.
It does what it says; defers execution for a preset time (note that it accepts both a string or number of milliseconds, [per its docs](/typescript/workflows#sleep)).

To test this out, you will also have to modify your Client code accordingly:

```ts
// /src/client.ts
import { SubscriptionWorkflow } from './workflows';

// etc...
const result = await client.execute(SubscriptionWorkflow, {
  workflowId: 'business-meaningful-id',
  taskQueue: 'tutorial',
  args: ['foo@bar.com', '30 seconds'],
});
```

Notice that the `args` are typechecked against the signature of `SubscriptionWorkflow`.
We also take the opportunity to specify the `workflowId`, which we recommend in production.

Check that you can run the Workflow (`npm run workflow`) and everything works as expected (if it is still printing "Hello Temporal", make sure you restart your Workers to pick up changes in your code, which you can automate with `npm run start.watch`).

From here on we expect that you are comfortable with making changes to Workflows and rerunning them to verify that they work as expected after each change.

:::note The importance of deferred execution

`sleep` is a simple, but powerful **durable timer**; under the hood, Temporal Server is persisting the sleep details to the database to be picked up later by the internal scheduler.
Test the fault tolerance of this by intentionally bringing down your Worker, or Temporal Server, during the `sleep`, and notice that it simply continues when the system is back up again.

:::

## Receive Cancellations with a Signal

Per Requirement 2, users can cancel during the trial.
The main way to send data in to a running Workflow is by "signalling" them.

There are two steps to implementing a Signal:

- Handle inside the Workflow
- Invoke from the Client

### Inside the Workflow

First we have to define the Signal, then set a handler for it.
The import code is starting to get a little verbose, so there are some optional couple of quality-of-life refactors you can do as well:

```ts
// /src/workflows.ts
import * as wf from '@temporalio/workflow'; // don't need to import everything
// import activity types

const acts = wf.proxyActivities<typeof activities>({
  // don't need to destructure activities
  startToCloseTimeout: '1 minute',
});

export const cancelSubscription = wf.defineSignal('cancelSignal'); // new

export async function SubscriptionWorkflow(
  email: string,
  trialPeriod: string | number
) {
  let isCanceled = false; // internal variable to track cancel state
  wf.setHandler(cancelSubscription, () => void (isCanceled = true)); // new
  await acts.sendWelcomeEmail(email);
  await wf.sleep(trialPeriod);
  if (isCanceled) {
    await acts.sendCancellationEmailDuringTrialPeriod(email); // new
  } else {
    await acts.sendSubscriptionOverEmail(email);
  }
}
```

### Invoke from the Client

To test your new Signal, you will need to write a new script that has a Client.
Copy over most of the code from your original starter to `cancel-subscription.ts`.

To invoke the Signal from here, we have to get a handle to the running Workflow Execution, and then `signal` it:

```ts
// cancel-subscription.ts
import { cancelSubscription } from '../workflows';
// ...

const handle = client.getHandle('business-meaningful-id'); // match the Workflow id
await handle.signal(cancelSubscription);
```

When you run this script while the main `client` script is running, you should be able to see the Signal registered in the Event History when you pull up the Workflow on Temporal Web.

**More importantly, there is a small bug with this code - the cancelation doesn't happen immediately when you cancel!**

## Using `condition` with timeouts

Where `sleep(ms)` defers execution for a fixed time, `condition` defers execution for an indefinite time until a given predicate function returns `true` ([per the docs](/typescript/workflows#condition)).
So a simple cancellation signal workflow could look like this:

```ts
// not suggested code - just for illustrative purposes
let isCanceled = false;
wf.setHandler(cancelSignal, () => void (isCanceled = true));

await acts.sendWelcomeEmail(email);
await wf.condition(() => isCanceled === true); // new! wait until isCanceled = true
await acts.sendCancellationEmailDuringTrialPeriod(email); // arrive here immediately after cancellation
```

However, we need to `Promise.race` this against the Trial Period to fulfil Requirement 2.
This is such a common need that we built it in as `condition`'s optional timeout argument:

```ts
// /src/workflows.ts
// ...
export async function SubscriptionWorkflow(
  email: string,
  trialPeriod: string | number
) {
  let isCanceled = false;
  wf.setHandler(cancelSignal, () => void (isCanceled = true)); // new
  await acts.sendWelcomeEmail(email);
  if (await wf.condition(() => isCanceled, trialPeriod)) {
    // reach here if predicate function is true
    await acts.sendCancellationEmailDuringTrialPeriod(email);
  } else {
    // reach here if timeout happens first
    await acts.sendSubscriptionOverEmail(email);
  }
}
```

Now when you run your `cancel-subscription` script you can see that the cancellation happens immediately.
And now you know the basics of writing asynchronous time- and Signal-based logic.
We have documented other patterns you are likely to use, like [sleepUntil](/typescript/workflows#sleep) and [Updatable Timers](/typescript/workflows#async-design-patterns).

## Data Model

We are about to start charging for money and adding more settable properties like `BillingPeriod` and `BillingPeriodChargeAmount`.
It's time to evolve the data model accordingly.
We'll define a shared type:

```ts
export type Customer = {
  email: string;
  trialPeriod: number;
  billingPeriod: number;
  maxBillingPeriods: number;
  initialBillingPeriodCharge: number;
  id: string;
};
```

And refactor our existing Workflow and Client code accordingly.
We'll spare you the gory details - you can always [check our repo](https://github.com/temporalio/subscription-workflow-project-template-typescript) if you like, but there is no right answer here.

## Write the Billing Process

We are now at Requirement 3:

> - As long as you have not exceeded `MaxBillingPeriods`,
> - **Charge the customer** for the `BillingPeriodChargeAmount`.
> - Then wait for the next `BillingPeriod`.
> - If the customer cancels during a billing period, **send a subscription cancellation email**.

You should have all you need for writing the billing process code here; you are encouraged to take the exercise of writing this yourself.

<details>
<summary>Check your answer with ours.
</summary>

```ts
// /src/workflows.ts
// ...
export async function SubscriptionWorkflow(customer: Customer) {
  let trialCanceled = false;
  wf.setHandler(cancelSignal, () => void (trialCanceled = true));
  await acts.sendWelcomeEmail(customer);
  if (await wf.condition(() => trialCanceled, trialPeriod)) {
    await acts.sendCancellationEmailDuringTrialPeriod(customer);
  } else {
    await BillingCycle(customer);
  }
}

// break out a workflow into smaller function for code organization
// this is NOT a child workflow!
async function BillingCycle(customer: Customer) {
  let isCanceled = false;
  wf.setHandler(cancelSignal, () => void (isCanceled = true)); // signals are reusable!
  await acts.chargeCustomerForBillingPeriod(customer);
  for (let num = 0; num < customer.maxBillingPeriods; num++) {
    // Wait 1 billing period to charge customer or if they cancel subscription
    // whichever comes first
    if (await wf.condition(() => isCanceled, customer.billingPeriod)) {
      // If customer cancelled their subscription send notification email
      await acts.sendCancellationEmailDuringActiveSubscription(customer);
      break;
    } else {
      await acts.chargeCustomerForBillingPeriod(customer);
    }
  }
  // if we get here the subscription period is over
  if (!isCanceled) await acts.sendSubscriptionOverEmail(customer);
}
```

</details>

Again, check that you can run your Workflow, and everything works as expected, including cancelling halfway through the trial or the billing periods.

## Queries and Reusable Functions

The last requirement is about being able to look up (and change) customer info.
The complement to Signals is Queries, where we can get data out of a running Workflow, and they have a very similar API:

```ts
// not suggested code - just for illustrative purposes
const amountChargedQuery = wf.defineQuery<number>('amountChargedQuery');
const updateAmountCharged = wf.defineSignal<number>('updateAmountCharged');

// inside Workflow
let amountCharged = customer.initialBillingPeriodCharge;
wf.setHandler(amountChargedQuery, () => amountCharged);
wf.setHandler(
  updateAmountCharged,
  (newAmount: number) => void (amountCharged = newAmount)
);
// do stuff with amountCharged
```

You can set up Signals and Queries and Handlers for every field, or perhaps just one set for the entire Customer object, it depends on your needs.
But these primitives can be flexibly rearranged (with specific inspiration from React Custom Hooks) to reduce boilerplate for your needs, [as we have documented](/typescript/workflows#signals-and-queries-design-patterns).

Knowledge check time - Write scripts with Temporal Clients for:

- making the queries
- signalling updates in charge amount

You can always [refer to our repo](https://github.com/temporalio/subscription-workflow-project-template-typescript/blob/main/src/scripts/query-billinginfo.ts) if you get stuck.

Note that Signal handlers cannot return data, and Query handlers must not mutate state. These restrictions and other notes on type safety are [prominently noted in their documentation](http://localhost:3000/docs/typescript/workflows#additional-signals-and-queries-notes).

## End Result

<details>
<summary>
One possible solution
</summary>

```ts
// /src/workflows.ts
// ...
export async function SubscriptionWorkflow(customer: Customer) {
  let trialCanceled = false;
  wf.setHandler(cancelSignal, () => void (trialCanceled = true));
  await acts.sendWelcomeEmail(customer.value.email);
  if (await wf.condition(() => trialCanceled, trialPeriod)) {
    await acts.sendCancellationEmailDuringTrialPeriod(customer.value.email);
  } else {
    await BillingCycle(customer);
  }
}

async function BillingCycle(_customer: Customer) {
  const customer = useState('customer', _customer); // wrapped up signals + queries + state
  const period = useState('period', 0); // same
  let isCanceled = false;
  wf.setHandler(cancelSignal, () => void (isCanceled = true));
  await acts.chargeCustomerForBillingPeriod(customer);
  for (; period.value < customer.value.maxBillingPeriods; period.value++) {
    // Wait 1 billing period to charge customer or if they cancel subscription
    // whichever comes first
    if (await wf.condition(() => isCanceled, customer.billingPeriod)) {
      // If customer cancelled their subscription send notification email
      await acts.sendCancellationEmailDuringActiveSubscription(customer);
      break;
    } else {
      await acts.chargeCustomerForBillingPeriod(customer);
    }
  }
  // if we get here the subscription period is over
  if (!isCanceled) await acts.sendSubscriptionOverEmail(customer);
}

// standard utility /docs/typescript/workflows#signals-and-queries-design-patterns
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
```

</details>

## Next Steps

You should now be able to write a Workflow that uses Signals, Queries, `sleep`, and `condition` interchangeably and confidently.
These are meant to be low level primitives, and it is entirely expected that you will build up reusable functions and libraries with APIs you prefer as you proceed.

Two paths from here:

- **Go Full Stack**: Integrate the manually-run Temporal Client scripts you have written here into an Express.js app, or serverless function.
  Our [Next.js Tutorial](/typescript/nextjs-tutorial) should help show you how to integrate this with a frontend app, and give indications on how to deploy.
- **Learn More**: Explore using [Child Workflows](/typescript/workflows#child-workflows) and [`continueAsNew`](/typescript/workflows#continueasnew) so that your subscriptions can keep running indefinitely.
