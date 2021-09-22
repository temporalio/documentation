# Activities

In Temporal, Activities are typically used to interact with external resources, like making an HTTP request.

- Unlike [Workflows](/docs/node/determinism), Activities execute in the standard Node.js environment, not an [isolate](https://www.npmjs.com/package/isolated-vm). So any code that needs to talk to the outside world needs to be in an Activity.
- Activities cannot be in the same file as Workflows (must be separately registered).
- Activities may be retried repeatedly, so you may need to use [idempotency keys](https://stripe.com/blog/idempotency) for critical side effects.

## Overview

Below is a simple Activity that accepts a string parameter, appends a word to it, and returns the result.

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

## How to import and use Activities in Workflows

You can call the above `greet()` Activity in a Workflow as shown below, assuming that the `greet` function is in the `lib/activities.js` file.
Note that we only import the type of our activities, the TypeScript compiler will drop the import statement on compilation.

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The return value of `createActivityHandle` is a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object
with a `get` handler that returns a function that calls the Node SDK's internal `scheduleActivity()` function.

### Activity Options

The full set of options are available in [the API reference](https://nodejs.temporal.io/api/interfaces/worker.ActivityOptions), but here are selected ones you might use:

| Activity Options         | Description                                                                                                                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startToCloseTimeout`    | Maximum time of a single Activity execution attempt. We recommend always setting this.                                                                                                                                                                  |
| `scheduleToCloseTimeout` | Total time that a workflow is willing to wait for Activity to complete.                                                                                                                                                                                                          |
| `heartbeatTimeout`       | A best practice to set for long-running activities.                                                                                                                                                                                    |
| `retry`                  | [RetryOptions](https://nodejs.temporal.io/api/interfaces/worker.RetryOptions) that define how activity is retried in case of failure. If this is not set, then the server-defined default activity retry policy will be used. To ensure zero retries, set maximum attempts to 1. |
| `activityId`             | Identifier to use for tracking the activity in Workflow history. The `activityId` can be accessed by the activity function. Does not need to be unique. Defaults to an incremental sequence number.                                                                              |
| `taskQueue`              | Task queue name. defaults to current worker task queue.                                                                                                                                                                                                                          |

You can specify timeouts as number of milliseconds, or a string parsed to number of milliseconds by the [`ms`](https://www.npmjs.com/package/ms) package:

```
ms('2 days')   // 172800000
ms('1d')       // 86400000
ms('10h')      // 36000000
ms('2.5 hrs')  // 9000000
ms('2h')       // 7200000
ms('2 hours')  // 7200000
ms('1 minute') // 60000
ms('1m')       // 60000
ms('5s')       // 5000
ms('1y')       // 31557600000
ms('100')      // 100
```

To better understand Activity timeouts, refer to our blogpost on the [4 Types of Activity timeouts](https://docs.temporal.io/blog/activity-timeouts).

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

## Heartbeating

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

#### Example: Activity that makes a cancellable HTTP request

<!--SNIPSTART nodejs-activity-cancellable-fetch-->
<!--SNIPEND-->
