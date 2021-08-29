# Activities

In Temporal, Activities are typically used to interact with external resources, like making an HTTP request.
Unlike [Workflows](/docs/node/determinism), Activities execute in the standard Node.js environment, not an [isolate](https://www.npmjs.com/package/isolated-vm).
So any code that needs to talk to the outside world needs to be in an Activity.

### Overview

Below is a simple Activity that accepts a string parameter, appends a word to it, and returns the result.
The Temporal Node SDK looks for any `.js` files in the `lib/activities` directory, and automatically registers any exported functions as Activities.

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

### Importing and Using

You can call the above `greet()` Activity in a Workflow as shown below, assuming that the `greet` function is in the `lib/activities.js` file.
Note that we only import the type of our activities, the TypeScript compiler will drop the import statement on compilation.

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The return value of `setupActivities` is a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object
with a `get` handler that returns a function that calls the Node SDK's internal `scheduleActivity()` function.

## Heartbeating

Long running activities should heartbeat their progress back to the Workflow.

### Activity Cancellation

A Workflow can request to cancel an Activity by cancelling its containing [cancellation scope](/docs/node/cancellation-scopes).

Activities may be cancelled only if they emit heartbeats.
There are 2 ways to handle Activity cancellation:

1. Await on [`Context.current().cancelled`](https://nodejs.temporal.io/api/classes/activity.context#cancelled)
1. Pass the context's abort signal at [`Context.current().cancellationSignal`](https://nodejs.temporal.io/api/classes/activity.context#cancelled) to a library that supports it like `fetch`

[`heartbeat()`](https://nodejs.temporal.io/api/classes/activity.context/#heartbeat) in the Node.js SDK is a background operation and does not propagate errors to the caller, such as when the scheduling Workflow has already completed or the Activity has been closed by the server (due to timeout for instance). These errors are translated into cancellation and can be handled using the methods above.

### Examples

#### An Activity that fakes progress and can be cancelled

> Note that [`Context.current().sleep`](https://nodejs.temporal.io/api/classes/activity.context#sleep) is cancellation aware.

<!--SNIPSTART nodejs-activity-fake-progress-->
<!--SNIPEND-->

#### An Activity that makes a cancellable HTTP request

<!--SNIPSTART nodejs-activity-cancellable-fetch-->
<!--SNIPEND-->
