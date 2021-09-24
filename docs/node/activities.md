# Activities

In Temporal, Activities are typically used to interact with external resources, like making an HTTP request.

- Unlike [Workflows](/docs/node/determinism), Activities execute in the standard Node.js environment, not an [isolate](https://www.npmjs.com/package/isolated-vm). So any code that needs to talk to the outside world needs to be in an Activity.
- Activities cannot be in the same file as Workflows (must be separately registered).
- Activities may be retried repeatedly, so you may need to use [idempotency keys](https://stripe.com/blog/idempotency) for critical side effects.

## How to write an Activity Function

Activities are "just functions".
Below is a simple Activity that accepts a string parameter, appends a word to it, and returns the result.

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

## How to import and use Activities

You can call the above `greet()` Activity in a Workflow as shown below, assuming that the `greet` function is in the `lib/activities.js` file.
Note that we only import the type of our activities, the TypeScript compiler will drop the import statement on compilation.

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The return value of `createActivityHandle` is a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object
with a `get` handler that returns a function that calls the Node SDK's internal `scheduleActivity()` function.

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

You can set a `retry` policy with [RetryOptions](https://nodejs.temporal.io/api/interfaces/worker.RetryOptions) that define how activity is retried in case of failure.

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

For a proper guide to each Retry Option, see the [RetryOptions API Reference](https://nodejs.temporal.io/api/interfaces/worker.RetryOptions).

### Misc. Activity Options

The full set of options are available in [the API reference](https://nodejs.temporal.io/api/interfaces/worker.ActivityOptions), but here are selected ones you might use:

| Activity Options | Description                                                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activityId`     | Identifier to use for tracking the activity in Workflow history. The `activityId` can be accessed by the activity function. Does not need to be unique. Defaults to an incremental sequence number. |
| `taskQueue`      | Task queue name. defaults to current worker task queue.                                                                                                                                             |

## How to register an Activity

All activities must be registered by a Worker, or you will get an error that looks like `"Activity function myActivity is not registered on this Worker"` when you try to invoke it from a Workflow.

- **Implicit registration**: By default, the Temporal Node SDK looks for any `.js` files in the `/activities` directory, and automatically registers any exported functions as Activities.
- **Explicit registration**: You can also choose to explicitly register activities in a Worker:

```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

// ...
const worker = await Worker.create({
  // ...
  activities, // explicit registration here
});
```

See [the Worker docs](/docs/node/workers) for more details.

## Sharing dependencies in Activity functions

Because Activities are "just" functions, you can also create functions that create Activities.
This is a helpful pattern for using closures to store expensive dependencies for sharing, for example database connections.

<!--SNIPSTART typescript-activity-with-deps {"enable_source_link": false}-->
<!--SNIPEND-->

When you register these in the Worker, pass your shared dependencies accordingly:

<!--SNIPSTART typescript-activity-deps-worker {"enable_source_link": false}-->
<!--SNIPEND-->

## Activity Context utilities

Temporal SDK also exports a [`Context`](https://nodejs.temporal.io/api/classes/activity.context/) class with useful features for activities: ` { Context } from '@temporalio/activity';`

| Activity Context properties            | Description                                                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Context.current().cancellationSignal` | An `AbortSignal` which can be used to cancel requests on Activity cancellation. Typically used by the fetch and child_process libraries but is supported by a few other libraries as well. |
| `Context.current().cancelled`          | Await this promise in an Activity to get notified of cancellation. This promise will never be resolved, it will only be rejected with a `CancelledFailure`.                                |
| `Context.current().heartbeat()`        | Send a heartbeat from an Activity.                                                                                                                                                         |
| `Context.current().info`               | Holds [information](https://nodejs.temporal.io/api/interfaces/activity.Info) about the current executing Activity                                                                          |
| `Context.current().sleep()`            | Helper function for sleeping in an Activity - resolves when deadline is reached or rejects when the Context is cancelled. Prefer this to `setTimeout`.                                     |

### Heartbeating

Long running activities should heartbeat their progress back to the Workflow for the dual purposes of reporting progress and earlier detection of stalled activities (with Heartbeat timeouts).

#### Example: Activity that fakes progress and can be cancelled

> Note that [`Context.current().sleep`](https://nodejs.temporal.io/api/classes/activity.context#sleep) is cancellation aware.

<!--SNIPSTART nodejs-activity-fake-progress-->
<!--SNIPEND-->

### Activity Cancellation

**Activities may be cancelled only if they emit heartbeats.**
A Workflow can request to cancel an Activity by cancelling its containing [cancellation scope](/docs/node/cancellation-scopes).

There are 2 ways to handle Activity cancellation:

1. Await on [`Context.current().cancelled`](https://nodejs.temporal.io/api/classes/activity.context#cancelled)
1. Pass the context's abort signal at [`Context.current().cancellationSignal`](https://nodejs.temporal.io/api/classes/activity.context#cancelled) to a library that supports it like `fetch`

[`heartbeat()`](https://nodejs.temporal.io/api/classes/activity.context/#heartbeat) in the Node.js SDK is a background operation and does not propagate errors to the caller, such as when the scheduling Workflow has already completed or the Activity has been closed by the server (due to timeout for instance). These errors are translated into cancellation and can be handled using the methods above.

#### Example: Sleep

The `sleep` method exported in `Context.current()` is comparable to a standard `sleep` function: `new Promise(resolve => setTimeout(resolve, sleepMS));` except that it also rejects if the activity is cancelled.

#### Example: Activity that makes a cancellable HTTP request

<!--SNIPSTART nodejs-activity-cancellable-fetch-->
<!--SNIPEND-->
