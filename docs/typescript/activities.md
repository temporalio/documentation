---
id: activities
title: Activities in TypeScript
sidebar_label: Activities
---

> **@temporalio/activity** [![NPM](https://img.shields.io/npm/v/@temporalio/activity)](https://www.npmjs.com/package/@temporalio/activity) [API reference](https://typescript.temporal.io/api/namespaces/activity) | [GitHub source](https://github.com/temporalio/sdk-typescript/tree/main/packages/activity)

**Activities are the only way to interact with external resources in Temporal**, like making an HTTP request or accessing the file system.

- Unlike [Workflows](/docs/typescript/determinism), Activities execute in the standard TypeScript environment, not an [isolate](https://www.npmjs.com/package/isolated-vm). So any code that needs to talk to the outside world needs to be in an Activity.
- Activities cannot be in the same file as Workflows (must be separately registered).
- Activities may be retried repeatedly, so you may need to use [idempotency keys](https://stripe.com/blog/idempotency) for critical side effects.

## How to write an Activity Function

Activities are "just functions".
Below is a simple Activity that accepts a string parameter and returns a string.

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

You may `import { Context } from '@temporalio/activity'` which offers useful utilities for Activity functions such as sleeping, heartbeating, cancellation, and retrieving metadata (see [docs on Activity Context utilities](#activity-context-utilities) below).

## How to import and use Activities in a Workflow

You must first retrieve an Activity from an "Activity Handle" before you can call it.
Note that we only import the type of our activities, the TypeScript compiler will drop the import statement on compilation.

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The return value of `createActivityHandle` is a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object
with a `get` handler that returns a function that calls the TypeScript SDK's internal `scheduleActivity()` function.

Activities are Promises and you may retrieve multiple Activities from the same handle if they all share the same timeouts/retries/options:

```ts
export async function Workflow(name: string): Promise<string> {
  const { act1, act2, act3 } = createActivityHandle<typeof activities>({
    scheduleToCloseTimeout: '1 minute',
    taskQueue: uniqueTaskQueue,
  });
  await act1();
  await Promise.all([act2, act3]);
}
```

:::caution Wrong way to import activities

You may be tempted to import activities directly instead of using `createActivityHandle`:

```ts
import { greet } from './activities';
// error when you try to use the function in your code
greet('Hello world');
```

This will result in a Webpack error, because the Temporal Worker will try to bundle this as part of the Workflow.
Make sure you're using `createActivityHandle` to retrieve an Activity rather than calling the function directly.
This indirection comes from the fact that Activities are run in the regular Node.js environment, not the deterministic `vm` where Workflows are run.

See also our [docs on Webpack troubleshooting](/docs/typescript/troubleshooting/).

:::

### Using pure ESM Node Modules

The TypeScript ecosystem is increasingly moving towards publishing ES Modules over CommonJS, for example `node-fetch@3` is ESM while `node-fetch@2` is CJS.
If you are importing a pure ESM dependency, see our [fetch ESM](https://github.com/temporalio/samples-typescript/tree/main/fetch-esm) sample for necessary config changes you will need:

- `package.json` must have `"type": "module"` attribute
- `tsconfig.json` should output in `esnext` format
- Imports [must](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions) include the `.js` file extension

## Activity Options

When you write `createActivityHandle`, there are [a range of options](https://typescript.temporal.io/api/interfaces/worker.activityoptions/) you can set, the most important of which are Timeouts and Retries.

You can also specify `namespace`, `taskQueue`, `cancellationType`, and `activityId`, but most users will not need these.

### Activity Timeouts

Timeouts and Retries are the most immediate benefit of moving code onto Temporal.
There are [four Activity Timeouts](https://docs.temporal.io/blog/activity-timeouts) you can set.
When a Timeout happens, your activity will be retried according to your [`RetryPolicy`](https://docs.temporal.io/docs/content/what-is-a-retry-policy/).

- `startToCloseTimeout`: Maximum time of a single Activity execution attempt. We recommend always setting this. [More info](https://docs.temporal.io/docs/content/what-is-a-start-to-close-timeout/)
- `scheduleToCloseTimeout`: Total time that a workflow is willing to wait for Activity to complete. [More info](https://docs.temporal.io/docs/content/what-is-a-schedule-to-close-timeout/)
- `heartbeatTimeout`: A best practice to set for long-running activities. [More info](https://docs.temporal.io/docs/content/what-is-a-heartbeat-timeout/)
- `scheduleToStartTimeout`: Not recommended; Only for task routing. [More info](https://docs.temporal.io/docs/content/what-is-a-schedule-to-start-timeout/)

You can specify timeouts as number of milliseconds, or a string to be parsed to number of milliseconds by the [`ms`](https://www.npmjs.com/package/ms) package:

```ts
// Example 1
const { greet } = createActivityHandle<typeof activities>({
  startToCloseTimeout: '1 minute', // translates to 60000 ms
});

// Example 2
const { longRunningActivity } = createActivityHandle<typeof activities>({
  scheduleToCloseTimeout: '5m', // translates to 300000 ms
  startToCloseTimeout: '30s', // translates to 30000 ms
  heartbeatTimeout: 10000, // equivalent to '10 seconds'
});
```

### Activity Retry Policy

You can set a `retry` policy with [RetryOptions](https://typescript.temporal.io/api/interfaces/worker.RetryOptions) that define how activity is retried in case of failure.

```ts
// Example 1 - default
const { greet } = createActivityHandle<typeof activities>({
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
const { greet } = createActivityHandle<typeof activities>({
  startToCloseTimeout: '20s',
  retry: {
    // guarantee no retries
    maximumAttempts: 1,
  },
});

// Example 3 - linear retries up to 5x
const { greet } = createActivityHandle<typeof activities>({
  startToCloseTimeout: '20s',
  retry: {
    // retry every 1s, no exponential backoff
    backoffCoefficient: 1,
    // max 5 attempts
    maximumAttempts: 5,
  },
});
```

For a proper guide to each Retry Option, see the [RetryOptions API Reference](https://typescript.temporal.io/api/interfaces/worker.RetryOptions).

## How to register an Activity on a Worker

All activities must be registered by a Worker, or you will get an error that looks like `"Activity function myActivity is not registered on this Worker"` when you try to invoke it from a Workflow.

```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

// ...
const worker = await Worker.create({
  // ...
  activities, // explicit registration here
});
```

See [the Worker docs](/docs/typescript/workers) for more details.

## Sharing dependencies in Activity functions

Because Activities are "just" functions, you can also create functions that create Activities.
This is a helpful pattern for using closures to store expensive dependencies for sharing, for example database connections.

<!--SNIPSTART typescript-activity-with-deps {"enable_source_link": false}-->
<!--SNIPEND-->

When you register these in the Worker, pass your shared dependencies accordingly:

<!--SNIPSTART typescript-activity-deps-worker {"enable_source_link": false}-->
<!--SNIPEND-->

## Activity Context utilities

Temporal SDK also exports a [`Context`](https://typescript.temporal.io/api/classes/activity.context/) class with useful features for activities: `import { Context } from '@temporalio/activity'`

| Activity Context properties            | Description                                                                                                                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Context.current().cancellationSignal` | An `AbortSignal` which can be used to cancel requests on Activity cancellation. Typically used by the `fetch` and `child_process` libraries but is supported by a few other libraries as well. |
| `Context.current().cancelled`          | Await this promise in an Activity to get notified of cancellation. This promise will never be resolved, it will only be rejected with a `CancelledFailure`.                                    |
| `Context.current().heartbeat()`        | Send a heartbeat from an Activity.                                                                                                                                                             |
| `Context.current().info`               | Holds [information](https://typescript.temporal.io/api/interfaces/activity.Info) about the current executing Activity                                                                              |
| `Context.current().sleep()`            | Helper function for sleeping in an Activity - resolves when deadline is reached or rejects when the Context is cancelled. Prefer this to `setTimeout`.                                         |

### Heartbeating

Long running activities should heartbeat their progress back to the Workflow for the dual purposes of reporting progress and earlier detection of stalled activities (with Heartbeat timeouts).

<details>
<summary>
What activities should heartbeat?
</summary>

Heartbeating is best thought about not in terms of time, but in terms of "How do you know you are making progress"?

- If an operation is so short that it doesn't make any sense to say "i'm still working on this", then don't heartbeat.
- If an operation takes long enough that you can say "I am still working on this", then do.

If your underlying task can report definite progress, that is ideal.
However you may get something useful from just verifying that the Worker processing your Activity is at the very least "still alive" (has not run out of memory or silently crashed).
If your activity `StartToClose` has a 1 hour timeout, even if there is no progress to report, the heartbeat would give the Server a signal that it is still alive and could retry earlier. Otherwise, server would have to wait for 1hour before retry.

Suitable for heartbeating:

- Read a large file from S3
- Run a ML training job on some local GPUs

Not suitable for heatbeating:

- Reading a small file from disk
- Making a quick API call

</details>

TODO: document how to retrieve heartbeat payload.

#### Example: Activity that fakes progress and can be cancelled

The [`sleep`](https://typescript.temporal.io/api/classes/activity.context#sleep) method exposed in `Context.current()` is comparable to a standard `sleep` function: `new Promise(resolve => setTimeout(resolve, sleepMS));` except that it also rejects if the activity is cancelled.

<!--SNIPSTART nodejs-activity-fake-progress-->
<!--SNIPEND-->

### Activity Cancellation

**Activities may be cancelled only if they emit heartbeats.**
A Workflow can request to cancel an Activity by cancelling its containing [cancellation scope](/docs/typescript/cancellation-scopes).

There are 2 ways to handle Activity cancellation:

1. Await on [`Context.current().cancelled`](https://typescript.temporal.io/api/classes/activity.context#cancelled)
1. Pass the context's abort signal at [`Context.current().cancellationSignal`](https://typescript.temporal.io/api/classes/activity.context#cancelled) to a library that supports it like `fetch`

[`heartbeat()`](https://typescript.temporal.io/api/classes/activity.context/#heartbeat) in the TypeScript SDK is a background operation and does not propagate errors to the caller, such as when the scheduling Workflow has already completed or the Activity has been closed by the server (due to timeout for instance). These errors are translated into cancellation and can be handled using the methods above.

#### Example: Activity that makes a cancellable HTTP request

<!--SNIPSTART nodejs-activity-cancellable-fetch-->
<!--SNIPEND-->

## Local Activities

Temporal has an optimization feature called Local Activities.
The TypeScript SDK has not yet implemented this feature.
