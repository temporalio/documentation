---
id: failures
title: Failures in Node
sidebar_label: Failures
---

Failure classes are used by Temporal to represent failures across the different SDKs for both Activities and Workflows.

Failures are serializable over network and chainable to enable root cause analysis anywhere in the failure chain. If, for example, a Node.js Workflow starts a Java Child Workflow which calls an Activity in Golang and that activity fails, the Node.js Workflow will throw a `ChildWorkflowFailure` with `cause` set to `ActivityFailure` with `cause` set to `ApplicationFailure` representing the error that occured in the Golang Activity.

Outside of Workflow code, failure classes are attached to the `cause` of [`WorkflowExecutionFailedError`](https://nodejs.temporal.io/api/classes/client.workflowexecutionfailederror) which is thrown when executing a Workflow with a [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient/) or [`WorkflowStub`](https://nodejs.temporal.io/api/interfaces/client.workflowstub/).

Failures are also used to represent [cancellation](/docs/node/cancellation-scopes#cancelledfailure) of Activities and Child Workflows.

## Failure classes

### [TemporalFailure](https://nodejs.temporal.io/api/classes/client.temporalfailure)

The base class of all other failure classes in the SDK.

### [ApplicationFailure](https://nodejs.temporal.io/api/classes/client.applicationfailure)

Application failure is used to communicate application specific failures between Workflows and Activities.

Throw this exception to have full control over type and details if the exception delivered to the caller Workflow or client.

Any unhandled exception which doesn't extend [`TemporalFailure`](#temporalfailure) is converted to an instance of this class before being returned to a caller.

### [CancelledFailure](https://nodejs.temporal.io/api/classes/client.cancelledfailure)

Thrown in a Workflow when a cancellation scope or the entire Workflow has been cancelled or set as the cause for when a child Workflow or Activity has been cancelled.

In an Activity it may be thrown if the Activity was requested to be cancelled, more on that [here](/docs/node/activities#activity-cancellation).

### [ActivityFailure](https://nodejs.temporal.io/api/classes/client.activityfailure)

Contains information about an Activity failure. Always contains the original reason for the failure as its cause. For example if an Activity timed out the cause is set to `TimeoutFailure`.

**This exception is expected to be thrown only by the framework code.**

### [ChildWorkflowFailure](https://nodejs.temporal.io/api/classes/client.childworkflowfailure)

Contains information about a child Workflow failure. Always contains the original reason for the
failure as its cause. For example if a child workflow was terminated the cause is set to `TerminatedFailure`.

**This exception is expected to be thrown only by the framework code.**

### [TimeoutFailure](https://nodejs.temporal.io/api/classes/client.timeoutfailure)

Used to represent timeouts of Activities and Workflows.

When an activity times out, the last heartbeat details it emitted is attached to this failure.

### [TerminatedFailure](https://nodejs.temporal.io/api/classes/client.terminatedfailure)

Used as the cause for when a Workflow has been terminated.

### [ServerFailure](https://nodejs.temporal.io/api/classes/client.serverfailure)

Used for exceptions originated at the Temporal service.

## Failures and retries

Activities and Workflows scheduled in the system have a configurable [retry policy](https://nodejs.temporal.io/api/interfaces/proto.coresdk.common.iretrypolicy), within it there's an array of `nonRetryableErrorTypes`.

When a Workflow or Activity fails with an unhandled error, Temporal checks if the error name is present in the array of `nonRetryableErrorTypes` and stops retrying if there's a match.

Workflows and Activities may throw [`ApplicationFailure.nonRetryable`](https://nodejs.temporal.io/api/classes/client.applicationfailure#nonretryable-1) to expressly prevent retries.
