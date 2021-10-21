---
id: handling-failure
title: Handling Failures in Node
sidebar_label: Handling Failures
---

Failures in Temporal are structured and typed. They represent a variety of failure scenarios across the different SDKs and the server.

In the TypeScript SDK, failures are represented by [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) classes. They can be caught in both Workflow code and non-Workflow code.

<details>
<summary>
Failures are serializable over the network and chainable to enable root-cause analysis anywhere in the failure chain.
</summary>

If, for example, a TypeScript Workflow starts a Java Child Workflow which calls an Activity in Golang and that activity fails, the TypeScript Workflow will throw a `ChildWorkflowFailure` with `cause` set to an `ActivityFailure`, and the `ActivityFailure`'s `cause` is set to `ApplicationFailure`, which represents the error that occurred in the Golang Activity.

<!--TODO: use snipsync-->

```ts
import { createChildWorkflowHandle } from '@temporalio/workflow';
import {
  ActivityFailure,
  ApplicationFailure,
  ChildWorkflowFailure,
} from '@temporalio/common';

// Define the TypeScript version of the Java Workflow interface
// to get a type safe child WorkflowHandle
export type JavaWorkflow = () => Promise<void>;

async function myWorkflow(): Promise<void> {
  const child = createChildWorkflowHandle<JavaWorkflow>(
    'RunAnActivityWorkflow'
  );
  try {
    await child.execute();
  } catch (err) {
    if (
      err instanceof ChildWorkflowFailure &&
      err.cause instanceof ActivityFailure &&
      err.cause.cause instanceof ApplicationFailure
    ) {
      console.log(
        'Child workflow failure root cause was a failed activity',
        err.cause.cause.message
      );
    }
    throw err;
  }
}
```

</details>

<details>
<summary>
Failures are also used to represent <a href="/docs/typescript/cancellation-scopes#cancelledfailure">cancellation</a> of Activities and Child Workflows.
</summary>

As explained above, cancellation might not be the immediate cause of failure—it might happen further down the chain. Use the [`isCancellation`](https://nodejs.temporal.io/api/namespaces/workflow/#iscancellation) helper function to inspect the chain recursively and look for a `CancelledFailure`.

```ts
import {
  CancellationScope,
  createActivityHandle,
  isCancellation,
} from '@temporalio/workflow';
import * as activities from '../activities';

export function myWorkflow(urls: string[], timeoutMs: number): Promise<any[]> {
  const { httpGetJSON } = createActivityHandle<typeof activities>({
    scheduleToCloseTimeout: timeoutMs,
  });

  try {
    return CancellationScope.withTimeout(timeoutMs, () =>
      Promise.all(urls.map((url) => httpGetJSON(url)))
    );
  } catch (err) {
    if (isCancellation(err)) {
      console.log('Deadline exceeded while waiting for activities to complete');
    }
    throw err;
  }
}
```

</details>

Outside of Workflow code, failure classes are attached to the `cause` of [`WorkflowExecutionFailedError`](https://nodejs.temporal.io/api/classes/client.workflowexecutionfailederror), which is thrown when executing a Workflow with a [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient/) or [`WorkflowHandle`](https://nodejs.temporal.io/api/interfaces/client.workflowhandle/).

## Failures and retries

Activities and Workflows scheduled in the system have a configurable [retry policy](https://nodejs.temporal.io/api/interfaces/proto.coresdk.common.iretrypolicy), which many contain an array of `nonRetryableErrorTypes`.

When a Workflow or Activity fails with an unhandled error, Temporal checks if the error name is present in the array of `nonRetryableErrorTypes` and stops retrying if there's a match.

Workflows and Activities may also throw [`ApplicationFailure.nonRetryable`](https://nodejs.temporal.io/api/classes/client.applicationfailure#nonretryable-1) to expressly prevent retries.

## Failure classes

### [TemporalFailure](https://nodejs.temporal.io/api/classes/client.temporalfailure)

The base class of all other failure classes in the SDK.

### [ApplicationFailure](https://nodejs.temporal.io/api/classes/client.applicationfailure)

`ApplicationFailure` is used to communicate application-specific failures between Workflows and Activities.

Throw this exception to have full control over type and details of the exception delivered to the caller Workflow or client.

Any unhandled exception that doesn't extend [`TemporalFailure`](#temporalfailure) is converted to an instance of `ApplicationFailure` before being returned to a caller.

### [CancelledFailure](https://nodejs.temporal.io/api/classes/client.cancelledfailure)

`CancelledFailure` is thrown in a Workflow when a cancellation scope or the entire Workflow has been cancelled or set as the cause for when a child Workflow or Activity has been cancelled.

In an Activity, it may be thrown if the Activity was requested to be cancelled. More on activity cancellation [here](/docs/typescript/activities#activity-cancellation).

### [ActivityFailure](https://nodejs.temporal.io/api/classes/client.activityfailure)

Contains information about an Activity failure. Always contains the original reason for the failure as its cause. For example, if an Activity timed out, the cause is set to `TimeoutFailure`.

**This exception is expected to be thrown only by the framework code.**

### [ChildWorkflowFailure](https://nodejs.temporal.io/api/classes/client.childworkflowfailure)

Contains information about a child Workflow failure. Always contains the original reason for the
failure as its cause. For example, if a child workflow was terminated, the cause is set to `TerminatedFailure`.

**This exception is expected to be thrown only by the framework code.**

### [TimeoutFailure](https://nodejs.temporal.io/api/classes/client.timeoutfailure)

Used to represent timeouts of Activities and Workflows.

When an activity times out, the last heartbeat details it emitted is attached to this failure.

### [TerminatedFailure](https://nodejs.temporal.io/api/classes/client.terminatedfailure)

Used as the cause for when a Workflow has been terminated.

### [ServerFailure](https://nodejs.temporal.io/api/classes/client.serverfailure)

Used for exceptions originated at the Temporal service.
