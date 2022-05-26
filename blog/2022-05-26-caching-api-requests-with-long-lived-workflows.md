---
tags:
  - temporal
  - community
posted_on_: 2022-05-26T00:00:00Z
slug: caching-api-requests-with-long-lived-workflows
title: 'Caching API Requests With Long-Lived Workflows in Temporal'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.15
---

<!--truncate-->

A [Temporal Workflow Execution](/workflows#workflow-executions) has no time limit.
You can write a Workflow that runs forever, storing some state and responding to Signals and Queries, as long as you remember to use [Continue-As-New](/workflows#continue-as-new).
One neat use case for long-lived Workflows is caching API requests.

For example, suppose you want to display prices in various currencies based on cached exchange rates.
Exchange rate APIs are often expensive for high volumes of requests, so caching can be worthwhile as long as stale data isn't a problem for your use case.
You can create a single Temporal Workflow that makes one API request per day to get the latest exchange rates for a set of currencies and stores the most recent result, with no explicit database calls or cron jobs.
In this blog post, I'll describe how you can write an API caching Workflow for the [moneyconvert.net API](https://moneyconvert.net/) with the Temporal TypeScript SDK.
You can find the full source code for this example in [vkarpov/temporal-api-caching-example](https://github.com/vkarpov15/temporal-api-caching-example) on GitHub.

## Getting Started

When you make an HTTP GET request to https://cdn.moneyconvert.net/api/latest.json, the API returns JSON that looks like the following:

```
{
  "table": "latest",
  "rates": {
    "AED": 3.6731,
    "AFN": 87.249991,
    "ALL": 114.227196,
    "AMD": 473.915796,
    ...
  },
  "lastupdate": "2022-05-11T00:46:04.483000+00:00"
}
```

Because Temporal Workflows must be deterministic, you can't make an API request directly from a Workflow.
You need to create an Activity that makes an API request, and call that Activity from your Workflow.
Following is an [`activities.ts`](https://github.com/vkarpov15/temporal-api-caching-example/blob/main/src/activities.ts) file that makes an HTTP request to the preceding API endpoint and returns the exchange rates.

```ts
import axios from 'axios';

export async function getExchangeRates(): Promise<any> {
  const res = await axios.get('https://cdn.moneyconvert.net/api/latest.json');
  return res.data.rates;
};
```

Next, let's write a Workflow that calls this Activity once per day.
With Temporal Workflows, you can simply write a `while (true) {}` loop with a [JavaScript sleep](https://masteringjs.io/tutorials/fundamentals/sleep) that pauses the Workflow until the next time you need to refresh exchange rates.
Writing the Workflow this way might seem counterintuitive, because we've all had to learn over the course of our careers that writing applications isn't this easy.
But, with Temporal, it actually is this easy!

```ts
import {
  defineQuery,
  proxyActivities,
  setHandler,
  sleep
} from '@temporalio/workflow';
import type * as activities from './activities';

const { getExchangeRates } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const getExchangeRatesQuery = defineQuery<any, [string]>('getExchangeRates');

export async function exchangeRatesWorkflow(): Promise<any> {
  let rates: any = null;

  // Register a query handler that allows querying for the current rates
  setHandler(getExchangeRatesQuery, () => rates);

  while (true) {
    // Get the latest rates
    rates = await getExchangeRates();

    // Sleep until tomorrow at 12pm server time, and then get the rates again
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setHours(12, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // @ts-ignore
    await sleep(tomorrow - today);
  }
}
```

That's the entire Workflow for caching exchange rates.
The full source code is available in [this GitHub repo](https://github.com/vkarpov15/temporal-api-caching-example).
Notice that the code has no explicit references to a database or job queue.
This Workflow is almost pure business logic, with a minimum of references to frameworks or services.

To run this Workflow, you can run a `start-workflow.ts` script as shown below.
This script starts a Workflow and exits, leaving the Workflow running on the Worker.
Note that only one Workflow with a given `workflowId` can run at any given time, so the following code also ensures that only one copy of this Workflow is running at any particular time.

```ts
import { WorkflowClient } from '@temporalio/client';
import { exchangeRatesWorkflow } from '../workflows';

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function run() {
  const client = new WorkflowClient();

  const handle = await client.start(exchangeRatesWorkflow, {
    taskQueue: 'exchange-rates',
    workflowId: 'exchange-rates-workflow',
  });
  console.log(`Started workflow ${handle.workflowId}`);
}
```

This Workflow is missing one key detail: a [Continue-As-New](/workflows#continue-as-new).
There's more about that later in this blog post.

## Storing Historical Data

You can do more than just store the latest exchange rates.
You can also store previous exchange rates.
For example, suppose you want to store up to 30 days worth of historical exchange rates.
You can store the rates in an in-memory JavaScript map in your Workflow, as shown in the following code.

```ts
const maxNumRates = 30;

export async function exchangeRatesWorkflow(): Promise<any> {
  const ratesByDay = new Map<string, any>();

  // Allow querying exchange rates by day
  setHandler(getExchangeRatesQuery, (date: string) => {
    return ratesByDay.get(date);
  });

  while (true) {
    const exchangeRates = await getExchangeRates();
    const today = new Date();
    // Store today's exchange rates
    ratesByDay.set(toYYYYMMDD(today), exchangeRates);
    console.log(toYYYYMMDD(today), exchangeRates);

    // Delete the oldest key if we have more than 30 entries
    const keys = Array.from(ratesByDay.keys());
    if (keys.length > maxNumRates) {
      ratesByDay.delete(keys[0]);
    }

    // Wait until tomorrow at 12pm to refresh the exchange rates
    const tomorrow = new Date(today);
    tomorrow.setHours(12, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // @ts-ignore
    await sleep(tomorrow - today);
  }
}
```

Temporal makes `ratesByDay` durable, even though `ratesByDay` is just a normal JavaScript variable.
That's because Temporal stores the entire history of events for this Workflow.
If the machine running `exchangeRatesWorkflow()` crashes, Temporal can resume the Workflow on another machine by replaying the entire event history.

## Continue-As-New

The `exchangeRatesWorkflow` can run for an unlimited period of time: days, months, even years.
However, Temporal caps a Workflow at 50,000 events. (See the [Time constraints](/workflows#time-constraints) section in [Temporal Workflows](/workflows).)
In the `exchangeRatesWorkflow`, four events are fired at every iteration of the `while` loop, assuming no API errors.

1. `EVENT_TYPE_TIMER_FIRED`: the `setTimeout()` resolved and it's time to refresh the exchange rates
2. `EVENT_TYPE_ACTIVITY_TASK_STARTED`: the `getExchangeRates()` activity started executing
3. `EVENT_TYPE_ACTIVITY_TASK_COMPLETED`: the `getExchangeRates()` activity completed successfully
4. `EVENT_TYPE_TIMER_STARTED`: the Workflow used `setTimeout()` to pause until tomorrow

With one API request per day, the `exchangeRatesWorkflow()` can run for almost 12,500 days (approximately 34 years) before running into the 50,000 event limit.
However, you should still handle this limit.
And that's what Continue-As-New is for.

You can think of Continue-As-New as restarting your Workflow from an initial state.
The only data that `exchangeRatesWorkflow()` needs to respond to queries is the `ratesByDay` map, so `exchangeRatesWorkflow()` needs to Continue-As-New with a serialized version of the `ratesByDay` map.
The `exchangeRatesWorkflow()` also needs to be able to resume from a previous state.
Continue-As-New just calls `exchangeRatesWorkflow()` with an initial state.
Following is the `exchangeRatesWorkflow()` workflow with an extra `storedRatesByDay` parameter that will contain the serialized Workflow state after a Continue-As-New.

```ts
const maxNumRates = 30;
const maxIterations = 10000;

// `storedRatesByDay` contains the serialized data from Continue-As-New, if available. Otherwise, just an
// empty array.
export async function exchangeRatesWorkflow(storedRatesByDay: Array<[string, any]> = []): Promise<any> {
  const ratesByDay = new Map<string, any>(storedRatesByDay);
  setHandler(getExchangeRatesQuery, (date: string) => {
    return ratesByDay.get(date)
  });

  // Max out at 10k iterations so we don't get too close to the 50k event limit
  for (let i = 0; i < maxIterations; ++i) {
    const exchangeRates = await getExchangeRates();
    const today = new Date();
    ratesByDay.set(toYYYYMMDD(today), exchangeRates);

    tomorrow.setHours(12, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // @ts-ignore
    await sleep(tomorrow - today);
  }

  // After 10k iterations, trigger a Continue-As-New and finish the Workflow
  const state = Array.from(ratesByDay.entries());
  await continueAsNew<typeof exchangeRatesWorkflow>(state);
}
```

## Moving On

Temporal Workflows make it easy to build stateful caching layers for APIs.
With Temporal, you just write the business logic.
Temporal handles persisting the data, ensuring only one copy of the Workflow is running, and allowing clients to query the cached API data.
Next time you need to build a tool that pings an API on a regular schedule, try building it with Temporal.