---
tags:
  - temporal
  - community
posted_on_: 2022-03-01T00:00:00Z
slug: introducing-temporal-rest
title: 'Introducing Temporal-Rest'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.15
---

<!--truncate-->

You can use Temporal's long-lived Workflows to build [REST APIs without a conventional database](https://docs.temporal.io/blog/build-an-ecommerce-app-with-temporal-part-4-rest-api).
Instead of explicitly making network calls to store user data in a database, you can write Workflows that store user data locally, and rely on Temporal to persist the state of your Workflow.
While you can build a REST API on top of Temporal Workflows yourself, we created [temporal-rest](https://www.npmjs.com/package/temporal-rest) to make creating a RESTful API for your Workflows a one-liner with [ExpressJS](https://expressjs.com/).
In this blog post, I'll show how to use temporal-rest to create a couple of RESTful APIs backed by long-lived Workflows.

Counter API
-----------

The key idea of long-lived Workflows is that Workflow functions are _deterministic_, so Temporal can store the state of the Workflow by storing the Workflow's initial state and event history.
For example, below is a Workflow that stores a single numeric counter.
The Workflow listens for a Signal `increment` to increase the counter, and a Query `getCount` to get the current state of the counter.

```ts
import * as wf from '@temporalio/workflow';

exports.incrementSignal = wf.defineSignal('increment');
exports.getCountQuery = wf.defineQuery('getCount');

export async function counterWorkflow(): Promise<void> {
  let count = 0;

  wf.setHandler(exports.incrementSignal, () => ++count);
  wf.setHandler(exports.getCountQuery, () => count);

  // Wait forever
  await wf.condition(() => false);
}
```

`counterWorkflow()` should run in a separate Worker process.
To execute an instance of `counterWorkflow()`, you should create a Workflow handle from a separate function as shown below.

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import { counterWorkflow } from './workflows';

async function run() {
  const connection = new Connection({});
  const client = new WorkflowClient(connection.service, {});

  const handle = await client.start(counterWorkflow, {
    taskQueue: 'tutorial',
    workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
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

Running `counterWorkflow()` from a command line script is convenient for the sake of an example, but not very useful unless you're building a command line app.
Enter temporal-rest, which you can use to create an Express API for these Workflows.

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import * as workflows from './workflows';

import express from 'express';
import { createExpressMiddleware } from 'temporal-rest';

async function run() {
  const connection = new Connection({});
  const client = new WorkflowClient(connection.service, {});

  const app = express();

  app.use(createExpressMiddleware(workflows, client, 'tutorial'));

  await app.listen(3000);
  console.log('Listening on port 3000');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

The `createExpressMiddleware()` function creates an Express router with 3 endpoints:

1. `POST /workflow/counterWorkflow`: start a new instance of `counterWorkflow`
2. `GET /query/getCount/:workflowId`: execute the `getCount` Query on the Workflow with the given id
3. `PUT /signal/increment/:workflowId`: send an `increment` Signal to the Workflow with the given id

Below is an example of interacting with this API using [curl](https://thecodebarbarian.com/what-javascript-developers-should-know-about-curl.html).
A POST to `/workflow/counterWorkflow` creates a new Workflow instance and returns the id.
Then you can send a Signal to increment the counter, and execute a Query to get the current state of the counter.

```
$ curl -X POST http://localhost:3000/workflow/counterWorkflow
{"workflowId":"4cb1b1ea-b962-419e-840c-5c18ab5555a1"}$ 
$ curl "http://localhost:3000/query/getCount/4cb1b1ea-b962-419e-840c-5c18ab5555a1"
{"result":0}
$ curl -X PUT "http://localhost:3000/signal/increment/4cb1b1ea-b962-419e-840c-5c18ab5555a1"
{"ok":1}
$ curl "http://localhost:3000/query/getCount/4cb1b1ea-b962-419e-840c-5c18ab5555a1"
{"result":1}
```

Query and Signal Arguments
--------------------------

You can also pass arguments to Signals and Queries using temporal-rest.
By default, temporal-rest parses any JSON in the [Express request body](https://masteringjs.io/tutorials/express/body) and passes the parsed object as the first parameter to Signals, and passes the [Express query parameters](https://masteringjs.io/tutorials/express/query-parameters) as the first parameter to Queries.

For example, suppose your `counterWorkflow()` supports tracking multiple counters, each counter with a unique name.

```ts
import * as wf from '@temporalio/workflow';

exports.incrementSignal = wf.defineSignal('increment');
exports.getCountQuery = wf.defineQuery('getCount');

export async function counterWorkflow(): Promise<void> {
  const counters = new Map<string, number>();

  wf.setHandler(exports.incrementSignal, (args: { name: string }) => {
    const count = counters.get(args.name);
    if (count !== undefined) {
      counters.set(args.name,  + 1);
    } else {
      counters.set(args.name, 1);
    }
  });
  wf.setHandler(exports.getCountQuery, (args: { name: string }) => {
    if (!counters.has(args.name)) {
      return 0;
    }
    return counters.get(args.name);
  });

  // Wait forever
  await wf.condition(() => false);
}
```

To create a new counter with this Workflow, you need to send an `increment` signal with an object containing the counter's `name` as shown below.

```ts
const handle = await client.start(counterWorkflow, {
  taskQueue: 'tutorial',
  workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
});

// Increment a new counter
await handle.signal('increment', { name: 'test-counter' });

// Prints "1"
console.log(await handle.query('getCount', { name: 'test-counter' }));
// Prints "0" because there's no counter named 'other-counter'
console.log(await handle.query('getCount', { name: 'other-counter' }));
```

You can expose this Workflow via RESTful API using the same temporal-rest script as before.

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import * as workflows from './workflows';

import express from 'express';
import { createExpressMiddleware } from 'temporal-rest';

async function run() {
  const connection = new Connection({});
  const client = new WorkflowClient(connection.service, {});

  const app = express();

  app.use(createExpressMiddleware(workflows, client, 'tutorial'));

  await app.listen(3000);
  console.log('Listening on port 3000');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

To pass a parameter to the `increment` Signal, you should pass a JSON-encoded HTTP request body to the Signal's POST endpoint, and to pass a parameter to the `getCount` Query, you should add a query string to the Query's GET endpoint.
Below is an example using curl.

```
$ curl -X POST http://localhost:3000/workflow/counterWorkflow
{"workflowId":"cbc5924c-1afc-45e0-b7d6-e8fe1a250089"}
$ curl -X PUT -H "Content-Type: application/json" -d '{"name":"test-counter"}' http://localhost:3000/signal/increment/cbc5924c-1afc-45e0-b7d6-e8fe1a250089
{"ok":1}
$ curl http://localhost:3000/query/getCount/cbc5924c-1afc-45e0-b7d6-e8fe1a250089?name=test-counter
{"result":1}
$ curl http://localhost:3000/query/getCount/cbc5924c-1afc-45e0-b7d6-e8fe1a250089?name=other-counter
{"result":0}
```

Below is an alternative example of making requests to this API using the [Axios HTTP client](https://masteringjs.io/axios) in Node.js.

```ts
let res = await axios.post('http://localhost:3000/workflow/counterWorkflow');
console.log(res.data); // "{ workflowId: '5232d34e-1c65-4d38-8470-39ec03b0eb02' }"
const { workflowId } = res.data;

res = await axios.put('http://localhost:3000/signal/increment/' + workflowId, {
  name: 'test-counter'
});
console.log(res.data); // "{ ok: 1 }"

res = await axios.get('http://localhost:3000/query/getCount/' + workflowId, {
  params: { name: 'test-counter' }
});
console.log(res.data); // "{ result: 1 }"
```

Moving On
---------

Long-lived Workflows in Temporal let you build durable, scalable RESTful APIs without a traditional database.
The [temporal-rest](https://www.npmjs.com/package/temporal-rest) package removes the boilerplate of wrapping Temporal Workflows, Queries, and Signals in an API.
Just write your Workflows, and temporal-rest takes care of the Express API.
Try temporal-rest out and let us know what you think in the comments or on [GitHub issues](https://github.com/vkarpov15/temporal-rest/issues).