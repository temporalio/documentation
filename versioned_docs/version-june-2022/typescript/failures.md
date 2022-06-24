---
id: handling-failure
title: Handling Failures in TypeScript
sidebar_label: Handling Failures
description: Failures in Temporal are structured and typed. They represent a variety of failure scenarios across the different SDKs and the server.
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
import { executeChild } from '@temporalio/workflow';
import {
  ActivityFailure,
  ApplicationFailure,
  ChildWorkflowFailure,
} from '@temporalio/common';

// Define the TypeScript version of the Java Workflow interface
// to get a type safe child WorkflowHandle
export type JavaWorkflow = () => Promise<void>;

async function myWorkflow(): Promise<void> {
  try {
    await executeChild<JavaWorkflow>('RunAnActivityWorkflow');
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

Outside of Workflow code, failure classes are attached to the `cause` of [`WorkflowFailedError`](https://typescript.temporal.io/api/classes/client.workflowfailederror), which is thrown when executing a Workflow with a [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.workflowclient/) or [`WorkflowHandle`](https://typescript.temporal.io/api/interfaces/client.workflowhandle/).

## Failures and retries

Activities and Workflows scheduled in the system have a configurable [retry policy](https://typescript.temporal.io/api/interfaces/proto.coresdk.common.iretrypolicy), which many contain an array of `nonRetryableErrorTypes`.

When a Workflow or Activity fails with an unhandled error, Temporal checks if the error name is present in the array of `nonRetryableErrorTypes` and stops retrying if there's a match.

Workflows and Activities may also throw [`ApplicationFailure.nonRetryable`](https://typescript.temporal.io/api/classes/client.applicationfailure#nonretryable-1) to expressly prevent retries.

Propagated Activity and child Workflow failures are considered retryable and will be retried according to the parent Workflow's retry policy.

The expected behavior is:

- Non retryable application failure -> fails the workflow and cannot be retried
- Retryable application failure -> fails the workflow and can be retried according to the retry policy
- Other TemporalFailures -> same as retryable application failure
- Any other error -> fails the workflow task and can be retried

> Note: Before TypeScript SDK v0.17.0, throwing any error in a Workflow would cause the Workflow execution to fail - in other words, all errors were "retryable". The semantics of this was corrected in v0.17.

### Pattern: Wrapping Errors with Interceptors

To make other error types fail the workflow, use the `WorkflowInboundCallsInterceptor` methods (`execute` and `handleSignal`) to catch errors thrown from the Workflow and convert them to `ApplicationFailures`, e.g:

```ts
async function wrapError<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof MySpecialRetryableError) {
      throw ApplicationFailure.retryable(
        err.message,
        'MySpecialRetryableError'
      ); // can also make this nonRetryable if that is the intent. remember to change the error name.
    }
    throw err;
  }
}

class WorkflowErrorInterceptor implements WorkflowInboundCallsInterceptor {
  async execute(
    input: WorkflowExecuteInput,
    next: Next<WorkflowInboundCallsInterceptor, 'execute'>
  ): Promise<unknown> {
    return await wrapError(() => next(input));
  }

  async handleSignal(
    input: SignalInput,
    next: Next<WorkflowInboundCallsInterceptor, 'handleSignal'>
  ): Promise<void> {
    return await wrapError(() => next(input));
  }
}
```

## `isCancellation` utility

Failures are also used to represent [cancellation](/typescript/cancellation-scopes#cancelledfailure) of Activities and Child Workflows.

As explained above, cancellation might not be the immediate cause of failure — it might happen further down the chain. Use the [`isCancellation`](https://typescript.temporal.io/api/namespaces/workflow/#iscancellation) helper function to inspect the chain recursively and look for a `CancelledFailure`.

```ts
import {
  CancellationScope,
  proxyActivities,
  isCancellation,
} from '@temporalio/workflow';
import * as activities from '../activities';

export function myWorkflow(urls: string[], timeoutMs: number): Promise<any[]> {
  const { httpGetJSON } = proxyActivities<typeof activities>({
    scheduleToCloseTimeout: timeoutMs,
  });

  try {
    return await CancellationScope.withTimeout(timeoutMs, () =>
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

## Failure classes reference

### [TemporalFailure](https://typescript.temporal.io/api/classes/client.temporalfailure)

The base class of all other failure classes in the SDK.

### [ApplicationFailure](https://typescript.temporal.io/api/classes/client.applicationfailure)

`ApplicationFailure` is used to communicate application-specific failures between Workflows and Activities.

Throw this exception to have full control over type and details of the exception delivered to the caller Workflow or client.

Any unhandled exception that doesn't extend [`TemporalFailure`](#temporalfailure) is converted to an instance of `ApplicationFailure` before being returned to a caller.

### [CancelledFailure](https://typescript.temporal.io/api/classes/client.cancelledfailure)

`CancelledFailure` is thrown in a Workflow when a cancellation scope or the entire Workflow has been cancelled or set as the cause for when a child Workflow or Activity has been cancelled.

In an Activity, it may be thrown if the Activity was requested to be cancelled. More on activity cancellation [here](/typescript/activities#activity-cancellation).

### [ActivityFailure](https://typescript.temporal.io/api/classes/client.activityfailure)

Contains information about an Activity failure. Always contains the original reason for the failure as its cause. For example, if an Activity timed out, the cause is set to `TimeoutFailure`.

**This exception is expected to be thrown only by the framework code.**

### [ChildWorkflowFailure](https://typescript.temporal.io/api/classes/client.childworkflowfailure)

Contains information about a child Workflow failure. Always contains the original reason for the
failure as its cause. For example, if a child workflow was terminated, the cause is set to `TerminatedFailure`.

**This exception is expected to be thrown only by the framework code.**

### [TimeoutFailure](https://typescript.temporal.io/api/classes/client.timeoutfailure)

Used to represent timeouts of Activities and Workflows.

When an activity times out, the last heartbeat details it emitted is attached to this failure.

### [TerminatedFailure](https://typescript.temporal.io/api/classes/client.terminatedfailure)

Used as the cause for when a Workflow has been terminated.

### [ServerFailure](https://typescript.temporal.io/api/classes/client.serverfailure)

Used for exceptions originated at the Temporal service.
