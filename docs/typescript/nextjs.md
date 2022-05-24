---
id: nextjs-tutorial
title: Integrating Temporal into an Existing Next.js Application
sidebar_label: Next.js Tutorial
description: In this tutorial, we'll talk about how Temporal integrates into an existing Next.js application using Next.js API routes. This gives you the ability to write full-stack, long-running applications end to end in TypeScript.
---

In this tutorial, we'll talk about how Temporal integrates into an **existing Next.js application** using Next.js API routes.
This gives you the ability to write full-stack, long-running applications end to end in TypeScript.

:::info Notes to user

This tutorial is written for a reasonably experienced TypeScript/Next.js developer.
Whether you are using [Gatsby Functions](https://www.gatsbyjs.com/docs/reference/functions/), [Blitz.js API Routes](https://blitzjs.com/docs/api-routes) or just have a standard Express.js app, you should be able to adapt this tutorial with only minor modifications.
If you run into trouble, you are welcome to reach out on the [Temporal Slack](https://temporal.io/slack) for help, but we cannot promise help with non-Temporal build tooling related questions.

**To skip straight to a fully working example, you can check our [samples-typescript repo](https://github.com/temporalio/samples-typescript/tree/main/nextjs-ecommerce-oneclick)**, which you can also clone from scratch with [package initializer](/typescript/package-initializer) skeleton:

```bash
npx @temporalio/create@latest nextjs-temporal-app --sample nextjs-ecommerce-oneclick
```

- We go through the setup assuming you want to use TypeScript.
  You should be able to skip some steps if you want to use vanilla JavaScript.
- We also assume that you have [Temporal's prerequisites](/typescript/introduction#getting-started) already set up.
- Temporal doesn't prescribe folder structure; feel free to ignore or modify these instructions per your own needs.

:::

## Add Temporal to your Next.js project

You can install Temporal's packages with a single dependency, then set up folders and files for your Workflow, Activity, and Worker code:

```bash
npm i temporalio # in Next.js project root
mkdir -p temporal/src # create folder, recursively
cd temporal
touch src/worker.ts src/workflows.ts src/activities.ts
```

<details>
<summary>

Configure TypeScript to compile from `temporal/src` to `temporal/lib` with a `tsconfig.json`.

</summary>

Sample `tsconfig.json` to get you started:

```js
// /temporal/tsconfig.json
{
  "extends": "@tsconfig/node16/tsconfig.json", // optional but nice to have
  "version": "4.4.2",
  "compilerOptions": {
    "emitDecoratorMetadata": false,
    "experimentalDecorators": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "rootDir": "./src",
    "outDir": "./lib"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

</details>

<details>
<summary>

For convenience, you may want to set up some npm scripts to run the builds in your project root `package.json`.

</summary>

```js
// /package.json
  "scripts": {
    "dev": "npm-run-all -l build:temporal --parallel dev:temporal dev:next start:worker",
    "dev:next": "next dev",
    "dev:temporal": "tsc --build --watch ./temporal/tsconfig.json",
    "build:next": "next build",
    "build:temporal": "tsc --build ./temporal/tsconfig.json",
    "start": "npm run dev",
    "start:worker": "nodemon ./temporal/lib/worker",
    "lint": "eslint ."
  },
```

In the above example we use `npm-run-all` and `nodemon` so that we are able to do 4 things:

- build Temporal once
- start Next.js locally
- start a Temporal Worker
- rebuild Temporal files on change

in a single `npm run dev` command.

</details>

## Write your first Workflow, Activity and Worker

Inside of `/temporal/src/activities.ts` we'll write a simple Activity function to start with:

```ts
// /temporal/src/activities.ts
import { Context } from '@temporalio/activity';

export async function purchase(id: string): Promise<string> {
  console.log(`Purchased ${id}!`);
  return Context.current().info.activityId;
}
```

Activities are the only way to interact with the outside world in Temporal (e.g. making API requests, or accessing the filesystem).
See the [Activities docs](/typescript/activities) for more info.

Inside of `/temporal/src/workflows.ts` we'll write a Workflow function that calls this Activity:

```ts
// /temporal/src/workflows.ts
import { proxyActivities } from '@temporalio/workflow';
import { sleep } from '@temporalio/workflow';
import type * as activities from './activities'; // purely for type safety

const { purchase } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function OneClickBuy(id: string): Promise<string> {
  const result = await purchase(id); // calling the activity
  await sleep('10 seconds'); // demo use of timer
  console.log(`Activity ID: ${result} executed!`);
}
```

Workflow code is bundled and run inside a [deterministic v8 isolate](/typescript/determinism) so we can persist and replay every state change.
This is why Workflow code must be separate from Activity code, and why we have to `proxyActivities` instead of directly importing them.
Workflows also have access to a special set of [Workflow APIs](/typescript/workflows#workflow-apis) which we recommend exploring next.

With your Workflows and Activities done, you can now write the Worker that will host both and poll the `tutorial` Task Queue:

```ts
// /temporal/src/worker.ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

run().catch((err) => console.log(err));

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'), // passed to Webpack for bundling
    activities, // directly imported in Node.js
    taskQueue: 'tutorial',
  });
  await worker.run();
}
```

See the full [Worker docs](/typescript/workers) for more info.
You should now be able to run your Worker with `npm run build:temporal && npm run start:worker`, but it's not very exciting because you have no way to start a Workflow yet.

:::tip Pro tip

You actually _can_ start a Workflow with [`tctl`](/tctl/workflow/start) with just a Worker running, and no Client code written!
It is out of scope for this tutorial but try to `brew install tctl` and then `tctl workflow run --tq tutorial --wt OneClickBuy --et 60 -i '"Temporal CLI"'` if you enjoy developing with CLIs.

:::

## Write a Temporal Client inside a Next.js API Route

We will use Next.js API routes to expose a serverless endpoint that can be called by our frontend and then communicate with Temporal on the backend:

```bash
# in Next.js project root
mkdir pages/api
touch pages/api/startBuy.ts
```

Now we will create a Client and start a Workflow Execution:

```ts
// pages/api/startBuy.ts
import { Connection, WorkflowClient } from '@temporalio/client';
import { OneClickBuy } from '../../temporal/lib/workflows.js';

export default async function startBuy(req, res) {
  const { itemId } = req.body; // TODO: validate itemId and req.method
  const client = new WorkflowClient();
  const handle = await client.start(OneClickBuy, {
    workflowId: 'business-meaningful-id',
    taskQueue: 'tutorial', // must match the taskQueue polled by Worker above
    args: [itemId],
    // workflowId: // TODO: use business-meaningful user/transaction ID here
  }); // kick off the purchase async

  res.status(200).json({ workflowId: handle.workflowId });
}
```

Now if you have Next.js and Temporal running, you can at least start a Workflow Execution:

```bash
npm run dev # start Temporal and Next.js in parallel
curl -d '{"itemId":"item123"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/startBuy
```

The terminal that has your Temporal Worker will print `Purchased item123` if everything is working properly.

## Call the API Route from the Next.js frontend

If you are an experienced React/Next.js dev you should know what to do here.
For tutorial purposes we will just assume you have an `itemId` to use here; in real life you are likely to pull this from some other data source like Shopify or a database.

```ts
// /pages/index.ts or whatever page you are on
// inside event handler
fetch('/api/startBuy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ itemId }),
});
```

We recommend tracking the state of this API call and possibly toasting success, [per our sample code](https://github.com/temporalio/samples-typescript/blob/1f76cb6f78ef494074b937268c14fcc078e36956/nextjs-ecommerce-oneclick/pages/index.tsx#L143), but of course it is up to you what UX you want to provide.

## Deploying your Temporal + Next.js app

Your Next.js app, including Next.js API Routes with Temporal Clients in them, can be deployed anywhere Next.js can be deployed, including in serverless environments like Vercel or Netlify.

:::important

However, your Temporal Workers **must** be deployed in traditional "serverful" environments (e.g. with EC2, Digital Ocean or Render, not a serverless environment).

:::

**Both Temporal Clients and Temporal Workers must be configured to communicate with a Temporal Server instance**, whether self-hosted or Temporal Cloud.
You will need to configure gRPC connection address, namespace, and mTLS cert and key (strongly recommended).

```ts
// before Worker.create call in worker.ts
const connection = await NativeConnection.create({
  address,
  tls: {
    serverNameOverride,
    serverRootCACertificate,
    clientCertPair: {
      crt: fs.readFileSync(clientCertPath),
      key: fs.readFileSync(clientKeyPath),
    },
  },
});

// inside each Client call inside API Route
const connection = new Connection({
  address,
  tls: {
    serverNameOverride,
    serverRootCACertificate,
    clientCertPair: {
      crt: fs.readFileSync(clientCertPath),
      key: fs.readFileSync(clientKeyPath),
    },
  },
});
```

[See the mTLS tutorial](/typescript/security#mtls-tutorial) for full details, or get in touch with us on Slack if you have reached this stage.

## Production Concerns

As you move into production with your app, please review our docs on:

- [Securing](/typescript/security)
- [Testing](/typescript/testing)
- [Patching](/typescript/patching) (aka migrating code to new versions)
- [Logging](/typescript/logging)
- [Production Deploy Checklist](/typescript/production-deploy)

You will also want to have a plan for **monitoring and scaling your Temporal Workers** that host and execute your Activity and Workflow code (separately from monitoring and scaling Temporal Server itself).

## Next Steps

At this point, you have a working full stack example of a Temporal Workflow running inside your Next.js app.

You can explore adding [Signals and Queries](/typescript/workflows/#signals-and-queries) to your Workflow, then adding a new API Route to call them.
You can choose to set up one API Route per Signal or Query, or have one API Route handle all of them, Temporal has no opinion on how you set up routing.

Again, for a fully working example, you can check our [samples-typescript repo](https://github.com/temporalio/samples-typescript/tree/main/nextjs-ecommerce-oneclick).
