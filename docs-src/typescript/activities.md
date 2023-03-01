---
id: activities
title: Activities in TypeScript
sidebar_label: Activities
description: Activities are the only way to interact with external resources in Temporal, like making an HTTP request or accessing the file system. Unlike Workflows, Activities execute in the standard Node.js environment.
---

**`@temporalio/activity`** [![NPM](https://img.shields.io/npm/v/@temporalio/activity)](https://www.npmjs.com/package/@temporalio/activity) [API reference](https://typescript.temporal.io/api/namespaces/activity) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/activity)

> _Background reading: [Activities in Temporal](/activities)_

**Activities are the only way to interact with external resources in Temporal**, such as making an HTTP request or accessing the file system.

- Unlike [Workflows](/typescript/determinism), Activities execute in the standard Node.js environment. Any code that needs to talk to the outside world needs to be in an Activity, not a Workflow.
- **Separate from Workflows**: Activities cannot be in the same file as Workflows and must be separately registered (see below for [How to register an Activity on a Worker](#how-to-register-an-activity-on-a-worker))
- **Idempotency**: Activities may be retried repeatedly, so you may need to use [idempotency keys](https://stripe.com/blog/idempotency) for critical side effects.
- The `'@temporalio/activity'` package offers useful utilities for Activity functions such as sleeping, Heartbeating, cancellation, and retrieving metadata (see [docs on Activity Context utilities](#activity-context-utilities) below).

## How to write an Activity Function

Activities are _simply functions_.
Below is a simple Activity that accepts a string parameter and returns a string:

<!--SNIPSTART typescript-hello-activity {"enable_source_link": false}-->
```ts
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```
<!--SNIPEND-->

## How to import and use Activities in a Workflow

You must first retrieve an Activity from an "Activity Handle" before you can call it.
Note that we only import the type of our activities, the TypeScript compiler will drop the import statement on compilation.

<!--SNIPSTART typescript-hello-workflow {"enable_source_link": false}-->
```ts
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```
<!--SNIPEND-->

:::danger Wrong way to import activities

You may be tempted to import activities directly instead of using `proxyActivities`:

```ts
import { greet } from './activities';
// error when you try to use the function in your code
greet('Hello world');
```

This will result in a Webpack error, because the Temporal Worker will try to bundle this as part of the Workflow.
Make sure you're using `proxyActivities` to retrieve an Activity rather than calling the function directly.
This indirection comes from the fact that Activities are run in the regular Node.js environment, not the deterministic `vm` where Workflows are run.

See also our [docs on Webpack troubleshooting](/typescript/troubleshooting/).

:::

The return value of `proxyActivities` is not a normal object, it is a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object that calls the TypeScript SDK's internal `scheduleActivity()` function when you reference an activity.
This is necessary due to the decoupled nature of Workflows and Activities, but also allows strong typing from a single import, and some nice patterns we explain below.

### Activity Options

When you call `proxyActivities` in a Workflow function, there are [a range of ActivityOptions](https://typescript.temporal.io/api/interfaces/common.ActivityOptions) you can set:

```ts
// Sample of typical options you can set while creating a proxy for the `greet` Activity
const { greet } = proxyActivities<typeof activities>({
  // recommended
  startToCloseTimeout: '30s',
  // useful
  scheduleToCloseTimeout: '5m',
  // The below is a Retry Policy. It is used to retry the Activity if it fails.
  retry: {
    // These are the values of the Default Retry Policy
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: 100 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});
```

We explain the Timeouts and Retries below. You can also specify `taskQueue`, `cancellationType`, and `activityId`, but most users will not need these.

### Activity Timeouts

Timeouts and Retries are the most immediate benefit of moving code onto Temporal.
There are [four Activity Timeouts](https://temporal.io/blog/activity-timeouts) you can set.
When a Timeout happens, your activity will be retried according to your [`RetryPolicy`](/concepts/what-is-a-retry-policy/).

- `startToCloseTimeout`: Maximum time of a single Activity Execution attempt. **We recommend always setting this**. [More info](/concepts/what-is-a-start-to-close-timeout/)
- `scheduleToCloseTimeout`: Total time that a Workflow is willing to wait for Activity to complete. [More info](/concepts/what-is-a-schedule-to-close-timeout/)
- `heartbeatTimeout`: A best practice to set for long-running activities. [More info](/concepts/what-is-a-heartbeat-timeout/)
- `scheduleToStartTimeout`: Not recommended; Only for task routing. [More info](/concepts/what-is-a-schedule-to-start-timeout/)

You can specify timeouts as number of milliseconds, or a string to be parsed to number of milliseconds by the [`ms`](https://www.npmjs.com/package/ms) package:

```ts
// Example 1
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute', // translates to 60000 ms
});

// Example 2
const { longRunningActivity } = proxyActivities<typeof activities>({
  // translates to 300000 ms
  scheduleToCloseTimeout: '5m',
  // translates to 30000 ms
  startToCloseTimeout: '30s',
  // equivalent to '10 seconds'
  heartbeatTimeout: 10000,
});
```

### Activity Retry Policy

You can set a `retry` policy with [RetryPolicy](https://typescript.temporal.io/api/interfaces/client.RetryPolicy/) that define how activity is retried in case of failure.

```ts
// Example 1 - default
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '20s',
  retry: {
    // default retry policy if not specified
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: 100 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});

// Example 2 - no retries
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '20s',
  retry: {
    // guarantee no retries
    maximumAttempts: 1,
  },
});

// Example 3 - linear retries up to 5x
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '20s',
  retry: {
    // retry every 1s, no exponential backoff
    backoffCoefficient: 1,
    // max 5 attempts
    maximumAttempts: 5,
  },
});
```

For a proper guide to each Retry Option, see the [RetryPolicy API Reference](https://typescript.temporal.io/api/interfaces/client.RetryPolicy/).

As you customize your Workflow errors to be more descriptive, advanced users will want to become familiar with [Temporal's Failure classes](/typescript/handling-failure).

## How to register an Activity on a Worker

All activities must be registered by a Worker, or you will get an error that looks like `"Activity function yourActivity is not registered on this Worker"` when you try to invoke it from a Workflow.

```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

// ...
const worker = await Worker.create({
  // ...
  activities,
});
```

:::tip Sticky Activities

**Any matching Worker can pick up your Activity**, meaning your Activities are not guaranteed to execute on the same machine if you have a fleet of Workers.
You can route tasks to specific machines with the [Sticky Queues pattern](/typescript/workers#example-sticky-queues).

:::

Advanced users can also register [Activity Interceptors](/typescript/interceptors) here.
For more on Activity and Workflow registration, see [the Worker docs](/typescript/workers) for more details.

### Using pure ESM Node Modules

The JavaScript ecosystem is increasingly moving towards publishing ES Modules over CommonJS, for example `node-fetch@3` is ESM while `node-fetch@2` is CJS.

**If you are importing a pure ESM dependency, see our [fetch ESM](https://github.com/temporalio/samples-typescript/tree/main/fetch-esm) sample** for necessary config changes you will need:

- `package.json` must have `"type": "module"` attribute
- `tsconfig.json` should output in `esnext` format
- Imports [must](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions) include the `.js` file extension

## Important Design Patterns

Here are some important (and frequently asked) patterns for using our Activities APIs, to illustrate common needs and usecases.

### Sharing dependencies in Activity functions (Dependency Injection)

Because Activities are "just" functions, you can also create functions that create Activities.
This is a helpful pattern for using closures to:

- store expensive dependencies for sharing, such as database connections
- injecting secret keys (such as environment variables) from the Worker to the Activity

<!--SNIPSTART typescript-activity-with-deps-->
[activities-dependency-injection/src/activities.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-dependency-injection/src/activities.ts)
```ts
export interface DB {
  get(key: string): Promise<string>;
}

export const createActivities = (db: DB) => ({
  async greet(msg: string): Promise<string> {
    const name = await db.get('name'); // simulate read from db
    return `${msg}: ${name}`;
  },
  async greet_es(mensaje: string): Promise<string> {
    const name = await db.get('name'); // simulate read from db
    return `${mensaje}: ${name}`;
  },
});
```
<!--SNIPEND-->

<details>
  <summary>See full example</summary>

When you register these in the Worker, pass your shared dependencies accordingly:

<!--SNIPSTART typescript-activity-deps-worker {"enable_source_link": false}-->
```ts
import { createActivities } from './activities';

async function run() {
  // Mock DB connection initialization in Worker
  const db = {
    async get(_key: string) {
      return 'Temporal';
    },
  };

  const worker = await Worker.create({
    taskQueue: 'dependency-injection',
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(db),
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
<!--SNIPEND-->

Since Activities are always referenced by name, inside the Workflow they can be proxied as normal, though the types need some adjustment:

<!--SNIPSTART typescript-activity-deps-workflow-->
[activities-dependency-injection/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-dependency-injection/src/workflows.ts)
```ts
import type { createActivities } from './activities';

// Note usage of ReturnType<> generic since createActivities is a factory function
const { greet, greet_es } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '30 seconds',
});
```
<!--SNIPEND-->

</details>

### Importing multiple Activities at once

You may proxy multiple Activities from the same `proxyActivities` call if you want them to share the same timeouts/retries/options:

```ts
export async function Workflow(name: string): Promise<string> {
  // destructuring multiple activities with the same options
  const { act1, act2, act3 } = proxyActivities<typeof activities>();
  /* activityOptions */
  await act1();
  await Promise.all([act2, act3]);
}
```

### Dynamically referencing Activities

Since, under the hood, Activities are only referenced by their string name, you can reference them dynamically if needed:

```js
export async function DynamicWorkflow(activityName, ...args) {
  const acts = proxyActivities(/* activityOptions */);

  // these are equivalent
  await acts.activity1();
  await acts['activity1']();

  // dynamic reference to activities using activityName
  let result = await acts[activityName](...args);
}
```

Type safety is still supported here, but you are encouraged to validate and handle mismatches in Activity names. An invalid Activity name will lead to a `NotFoundError` with a message that looks like:

```
ApplicationFailure: Activity function actC is not registered on this Worker, available activities: ["actA", "actB"]
```

## Activity Context utilities

Temporal SDK also exports a [`Context`](https://typescript.temporal.io/api/classes/activity.Context/) class with useful features for activities: `import { Context } from '@temporalio/activity'`

| Activity Context properties            | Description                                                                                                                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Context.current().cancellationSignal` | An `AbortSignal` which can be used to cancel requests on Activity cancellation. Typically used by the `fetch` and `child_process` libraries but is supported by a few other libraries as well. |
| `Context.current().cancelled`          | Await this promise in an Activity to get notified of cancellation. This promise will never be resolved; it will only be rejected with a `CancelledFailure`.                                    |
| `Context.current().heartbeat()`        | Send a Heartbeat from an Activity.                                                                                                                                                             |
| `Context.current().info`               | Holds [information](https://typescript.temporal.io/api/interfaces/activity.Info) about the current executing Activity                                                                          |
| `Context.current().sleep()`            | Helper function for sleeping in an Activity - resolves when deadline is reached or rejects when the Context is cancelled. Prefer this to `setTimeout`.                                         |

### Heartbeating

Long running activities should Heartbeat their progress back to the Workflow for earlier detection of stalled activities (with Heartbeat timeouts) and resuming stalled activities from checkpoints (with Heartbeat details).

<details>
<summary>
What activities should Heartbeat?
</summary>

Heartbeating is best thought about not in terms of time, but in terms of "How do you know you are making progress"? If an operation is so short that it doesn't make any sense to say "I am still working on this", then don't heartbeat. Vice versa for longer operations.

- If your underlying task can report definite progress, that is ideal.
  - However, do note that your Workflow cannot read this progress information while the Activity is still executing (or it would have to store it in Event History). You may report progress to external sources if you need it exposed to the user.
- Even without a "progress you may get something useful from just verifying that the Worker processing your Activity is at the very least "still alive" (has not run out of memory or silently crashed).

Suitable for Heartbeating:

- Read a large file from S3
- Run a ML training job on some local GPUs

Not suitable for Heartbeating:

- Reading a small file from disk
- Making a quick API call

</details>

```ts
// activity implementation
export async function example(sleepIntervalMs = 1000): Promise<void> {
  for (let progress = 1; progress <= 1000; ++progress) {
    await Context.current().sleep(sleepIntervalMs);
    Context.current().heartbeat();
  }
}

// workflow code calling activity
const { example } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 hour',
  heartbeatTimeout: '10s',
});
```

Without Heartbeating, if your activity `StartToCloseTimeout` is 1 hour and the activity stalled, or activity worker died, Temporal would have to wait out the 1 hour before retrying.
But if you used the Heartbeat API, set a `heartbeatTimeout` for 10 seconds, the absence of Heartbeats in the `heartbeatTimeout` window would inform the Server that the Activity has stalled and should be retried right away rather than at the end of the `StartToCloseTimeout`.

The second major benefit of Heartbeating is being able to resume from failure by check pointing data as `heartbeatDetails`.
Extending the example above:

```ts
export async function example(sleepIntervalMs = 1000): Promise<void> {
  const startingPoint = Context.current().info.heartbeatDetails || 1; // allow for resuming from heartbeat
  for (let progress = startingPoint; progress <= 100; ++progress) {
    await Context.current().sleep(sleepIntervalMs);
    Context.current().heartbeat(progress);
  }
}
```

This way, if the Activity Worker experiences a `heartbeatTimeout`, when a retry happens, it will pick up where the previous attempt left off.

### Activity Cancellation

Activity Cancellation is an optional capability that lets you do graceful cleanup if it's originating Workflow is canceled. There are some additional usage notes:

- Activities may be cancelled only if they emit heartbeats.
- A Workflow can request to cancel an Activity by cancelling its containing [cancellation scope](/typescript/cancellation-scopes).

There are 3 ways to handle Activity cancellation:

1. Await on [`Context.current().cancelled`](https://typescript.temporal.io/api/classes/activity.Context#cancelled)
2. Catch a [`CancelledFailure`](/typescript/handling-failure/) while awaiting "cancellation-aware" APIs like `Context.current().sleep`. Errors can be validated with the `isCancellation(err)` utility function (see example below)
3. Pass the context's abort Signal at [`Context.current().cancellationSignal`](https://typescript.temporal.io/api/classes/activity.Context#cancelled) to a library that supports it like `fetch`

[`heartbeat()`](https://typescript.temporal.io/api/classes/activity.Context/#heartbeat) in the TypeScript SDK is a background operation and does not propagate errors to the caller, such as when the scheduling Workflow has already completed or the Activity has been closed by the Server (due to timeout for instance). These errors are translated into cancellation and can be handled using the methods above.

#### Example: Activity that fakes progress and can be cancelled

The [`sleep`](https://typescript.temporal.io/api/classes/activity.Context#sleep) method exposed in `Context.current()` is comparable to a standard `sleep` function: `new Promise(resolve => setTimeout(resolve, sleepMS));` except that it also rejects if the Activity is cancelled.

<!--SNIPSTART typescript-activity-fake-progress-->
[activities-cancellation-heartbeating/src/activities.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-cancellation-heartbeating/src/activities.ts)
```ts
import { CancelledFailure, Context } from '@temporalio/activity';

export async function fakeProgress(sleepIntervalMs = 1000): Promise<void> {
  try {
    // allow for resuming from heartbeat
    const startingPoint = Context.current().info.heartbeatDetails || 1;
    console.log('Starting activity at progress:', startingPoint);
    for (let progress = startingPoint; progress <= 100; ++progress) {
      // simple utility to sleep in activity for given interval or throw if Activity is cancelled
      // don't confuse with Workflow.sleep which is only used in Workflow functions!
      console.log('Progress:', progress);
      await Context.current().sleep(sleepIntervalMs);
      Context.current().heartbeat(progress);
    }
  } catch (err) {
    if (err instanceof CancelledFailure) {
      console.log('Fake progress activity cancelled', err.message);
      // Cleanup
    }
    throw err;
  }
}
```
<!--SNIPEND-->

#### Example: Activity that makes a cancellable HTTP request with cancellationSignal

The [`Context.current().cancellationSignal`](https://typescript.temporal.io/api/classes/activity.Context#cancellationsignal) returns an `AbortSignal` that is typically used by the `node_fetch` and `child_process` libraries but is supported by a few other libraries as well as the Web-standard [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal).

<!--SNIPSTART typescript-activity-cancellable-fetch-->
[activities-examples/src/activities/cancellable-fetch.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-examples/src/activities/cancellable-fetch.ts)
```ts
import fetch from 'node-fetch';
import { Context } from '@temporalio/activity';

export async function cancellableFetch(url: string): Promise<Uint8Array> {
  const response = await fetch(url, { signal: Context.current().cancellationSignal });
  const contentLengthHeader = response.headers.get('Content-Length');
  if (contentLengthHeader === null) {
    throw new Error('expected Content-Length header to be set');
  }
  const contentLength = parseInt(contentLengthHeader);
  let bytesRead = 0;
  const chunks: Buffer[] = [];

  for await (const chunk of response.body) {
    if (!(chunk instanceof Buffer)) {
      throw new TypeError('Expected Buffer');
    }
    bytesRead += chunk.length;
    chunks.push(chunk);
    Context.current().heartbeat(bytesRead / contentLength);
  }
  return Buffer.concat(chunks);
}
```
<!--SNIPEND-->

## Advanced Features

These are Activity features that most users will not need, but are available for advanced users.
Please get in touch with us if you find the need for them.

### Activity Interceptors

Interceptors are a mechanism for users to modify inbound and outbound SDK calls. Interceptors are commonly used to add tracing and authorization to the scheduling and execution of Workflows and Activities, but you can also use them to run code after an Activity failure (and before the next retry). See the [Interceptors docs](/typescript/interceptors) and the [SDK API Reference](https://typescript.temporal.io/api/interfaces/worker.ActivityInboundCallsInterceptor) for more information.

### Async Activity Completion

Normally, an Activity is started and ended in the same Worker, for example a short HTTP call.
However, sometimes you may want to record an Activity completion in a different process than when you started it.

> If you are modeling human actions, we recommend using Signals rather than Async Activity Completion.
> This is because Activities only have one timeout and, if your Activity is split into two steps, one for kicking off the process (for example, storing information in the data base), and one for human based resolution, it's best to use the timeout to detect failure in the former, so it can be retried by the system.

Async Activity completion is done through a two-step process:

- Throw a `CompleteAsyncError` from an Activity
- Use a `AsyncCompletionClient` to mark it as completed, failed, or more.

You can [read the tests](https://github.com/temporalio/sdk-typescript/blob/7d47f501cb56cced27118b5f0abb320cc0ba03ef/packages/test/src/test-async-completion.ts#L40-L98) for more information.

### Local Activities (experimental)

Temporal has an optimization feature called Local Activities.

This document is still a WIP. For more details, see [What is a Local Activity?](/concepts/what-is-a-local-activity/)

To call Local Activities in TS, use [`proxyLocalActivities`](https://typescript.temporal.io/api/namespaces/workflow/#proxylocalactivities).

```ts
import * as workflow from '@temporalio/workflow';

const { getEnvVar } = workflow.proxyLocalActivities({
  startToCloseTimeout: '2 seconds',
});

export async function yourWorkflow(): Promise<void> {
  const someSetting = await getEnvVar('SOME_SETTING');
  // ...
}
```

Local Activities must be registered with the Worker the same way non-local Activities are.
