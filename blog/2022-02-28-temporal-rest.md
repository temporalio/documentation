---
tags:
  - temporal
  - community
posted_on_: 2022-02-28T00:00:00Z
slug: temporal-rest
title: 'REST APIs for every Temporal Workflow in one line of code'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.15
---

<!--truncate-->

I previously wrote about using Temporal's long-lived Workflows to build [REST APIs without a conventional database](https://docs.temporal.io/blog/build-an-ecommerce-app-with-temporal-part-4-rest-api), but the REST layer was written manually and with a lot of boilerplate.

While you can always build a REST API on top of Temporal Workflows yourself, I've now built [`temporal-rest`](https://www.npmjs.com/package/temporal-rest) to make creating a RESTful API for your Workflows a one-liner with [ExpressJS](https://expressjs.com/).
Just add middleware!

In this blog post, I'll show how you can use `temporal-rest` to easily create RESTful APIs backed by long-lived Workflows.

## Temporal without REST

The key idea of long-lived Workflows is that Workflow functions are _deterministic_, so Temporal can persist the state of the Workflow by storing the Workflow's initial state and event history.
For example, below is a Workflow that keeps a single numeric counter.
The Workflow listens for an `increment` Signal to increase the counter, and a `getCount` Query to get the current value of the counter.

```ts
import * as wf from '@temporalio/workflow';

export const incrementSignal = wf.defineSignal('increment');
export const getCountQuery = wf.defineQuery('getCount');

export async function counterWorkflow(): Promise<void> {
  let count = 0;

  wf.setHandler(exports.incrementSignal, () => ++count);
  wf.setHandler(exports.getCountQuery, () => count);

  // Wait forever
  await wf.condition(() => false);
}
```

To execute an instance of `counterWorkflow`, use `WorkflowClient` to start the Workflow:

```ts
import { WorkflowClient } from '@temporalio/client';
import { counterWorkflow } from './workflows';
import crypto from 'crypto';

async function run() {
  const client = new WorkflowClient();

  const handle = await client.start(counterWorkflow, {
    taskQueue: 'tutorial',
    // Usually, we use a business ID. In this example, we don't have one, so we generate an ID.
    workflowId: 'counter-' + crypto.randomUUID(),
  });

  // Increment the counter
  await handle.signal('increment');

  // Prints "1"
  console.log(await handle.query('getCount'));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
```

## Introducing `temporal-rest`

Running `counterWorkflow` from this command-line script is convenient for the sake of an example, but not very useful unless you're building a command-line app.
Enter `temporal-rest`, which you can use to create an Express API for `counterWorkflow`:

```ts
import { WorkflowClient } from '@temporalio/client';
import * as workflows from './workflows';

import express from 'express';
import { createExpressMiddleware } from 'temporal-rest';

async function run() {
  const client = new WorkflowClient();

  const app = express();

  app.use(createExpressMiddleware(workflows, client, 'tutorial')); // this is the oneliner that does all the work!

  await app.listen(3000);
  console.log('Listening on port 3000');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

The `createExpressMiddleware()` function creates an Express router with 3 endpoints:

1. `POST /workflow/counterWorkflow`: start a new instance of `counterWorkflow`.
2. `GET /query/getCount/:workflowId`: execute the `getCount` Query on the Workflow with the given ID.
3. `PUT /signal/increment/:workflowId`: send an `increment` Signal to the Workflow with the given ID.

Below is an example of interacting with this API using [`curl`](https://thecodebarbarian.com/what-javascript-developers-should-know-about-curl.html).
A POST to `/workflow/counterWorkflow` creates a new Workflow instance and returns the Workflow ID.
Then you can send a Signal to increment the counter, and execute a Query to get the current state of the counter:

```
$ curl -X POST http://localhost:3000/workflow/counterWorkflow
{"workflowId":"4cb1b1ea-b962-419e-840c-5c18ab5555a1"}$ 
$ curl "http://localhost:3000/query/getCount/4cb1b1ea-b962-419e-840c-5c18ab5555a1"
{"result":0}
$ curl -X PUT "http://localhost:3000/signal/increment/4cb1b1ea-b962-419e-840c-5c18ab5555a1"
{"received":true}
$ curl "http://localhost:3000/query/getCount/4cb1b1ea-b962-419e-840c-5c18ab5555a1"
{"result":1}
```

## REST endpoints for Queries and Signals

You can also invoke Signals and Queries with `temporal-rest`.
By default, `temporal-rest` parses any JSON in the [Express request body](https://masteringjs.io/tutorials/express/body) and passes the parsed object as the first parameter to Signals, and passes the [Express query parameters](https://masteringjs.io/tutorials/express/query-parameters) as the first parameter to Queries.

For example, suppose `counterWorkflow` supports tracking multiple counters, each one with a unique name:

```ts
import * as wf from '@temporalio/workflow';

export const incrementSignal = wf.defineSignal('increment');
export const getCountQuery = wf.defineQuery('getCount');

export async function counterWorkflow(): Promise<void> {
  const counters = new Map<string, number>();

  wf.setHandler(incrementSignal, (args: { name: string }) => {
    const count = counters.get(args.name);
    if (count !== undefined) {
      counters.set(args.name, count + 1);
    } else {
      counters.set(args.name, 1);
    }
  });
  wf.setHandler(getCountQuery, (args: { name: string }) => {
    if (!counters.has(args.name)) {
      return 0;
    }
    return counters.get(args.name);
  });

  // Wait forever
  await wf.condition(() => false);
}
```

To create a new counter with this Workflow, we would normally send an `increment` Signal with an object containing the counter's `name`:

```ts
const handle = await client.start(counterWorkflow, {
  taskQueue: 'tutorial',
  workflowId: 'counter-' + crypto.randomUUID(),
});

// Increment a new counter
await handle.signal('increment', { name: 'test-counter' });

console.log(await handle.query('getCount', { name: 'test-counter' }));
// => "1"

console.log(await handle.query('getCount', { name: 'other-counter' }));
// => "0" because there's no counter named 'other-counter'
```

Instead, we can now expose these Signals via a RESTful API with the `temporal-rest` middleware the same as we did above:

```ts
  app.use(createExpressMiddleware(workflows, client, 'tutorial'));
```

To pass a parameter to the `increment` Signal, we pass a JSON-encoded HTTP request body to the Signal's POST endpoint, and to pass a parameter to the `getCount` Query, we add a query string to the Query's GET endpoint.
Here's an example using `curl`:

```
$ curl -X POST http://localhost:3000/workflow/counterWorkflow
{"workflowId":"cbc5924c-1afc-45e0-b7d6-e8fe1a250089"}
$ curl -X PUT -H "Content-Type: application/json" -d '{"name":"test-counter"}' http://localhost:3000/signal/increment/cbc5924c-1afc-45e0-b7d6-e8fe1a250089
{"received":true}
$ curl http://localhost:3000/query/getCount/cbc5924c-1afc-45e0-b7d6-e8fe1a250089?name=test-counter
{"result":1}
$ curl http://localhost:3000/query/getCount/cbc5924c-1afc-45e0-b7d6-e8fe1a250089?name=other-counter
{"result":0}
```

Here's an alternative example of making requests to this API using the [Axios HTTP client](https://masteringjs.io/axios) in Node.js:

```ts
let res = await axios.post('http://localhost:3000/workflow/counterWorkflow');
console.log(res.data); // "{ workflowId: '5232d34e-1c65-4d38-8470-39ec03b0eb02' }"
const { workflowId } = res.data;

res = await axios.put('http://localhost:3000/signal/increment/' + workflowId, {
  name: 'test-counter'
});
console.log(res.data); // "{ received: true }"

res = await axios.get('http://localhost:3000/query/getCount/' + workflowId, {
  params: { name: 'test-counter' }
});
console.log(res.data); // "{ result: 1 }"
```

## Moving On

Long-lived Workflows in Temporal let you build durable, scalable RESTful APIs without a traditional database.
The [`temporal-rest`](https://www.npmjs.com/package/temporal-rest) package removes the boilerplate of wrapping Temporal Workflows, Queries, and Signals in an API.
Just write your Workflows, and `temporal-rest` takes care of the Express API.
Try `temporal-rest` out and let us know what you think in the comments or [GitHub issues](https://github.com/vkarpov15/temporal-rest/issues).
