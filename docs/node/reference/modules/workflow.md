# Namespace: workflow

This library provides tools required for authoring workflows.

## Usage
See the [tutorial](https://docs.temporal.io/docs/node/hello-world#workflows) for writing your first workflow.

### Timers

The recommended way of scheduling timers is by using the [sleep](workflow.md#sleep) function.
We've replaced `setTimeout` and `clearTimeout` with deterministic versions so these are also usable but have a limitation that they don't play well with [cancellation scopes](https://docs.temporal.io/docs/node/workflow-scopes-and-cancellation).

<!--SNIPSTART nodejs-sleep-workflow-->
<!--SNIPEND-->

### Activities

To schedule activities in the system, simply import an activity function from any registered activity file and call it like a normal function, the Temporal workflow runtime will replace the imported function with a stub which will schedules an activity.

Activities run with the worker's configured [activityDefaults](../interfaces/worker.workeroptions.md#activitydefaults), use [Context.configure](../classes/workflow.contextimpl.md#configure) in order to customize the [activity options](workflow.md#activityoptions).

<!--SNIPSTART nodejs-schedule-activity-workflow-->
<!--SNIPEND-->

### Deterministic built-ins
It is safe to call `Math.random()` and `Date()` in workflow code as they are replaced with deterministic versions. We also provide a deterministic [uuid4](workflow.md#uuid4) function for convenience.

### [Cancellation and scopes](https://docs.temporal.io/docs/node/workflow-scopes-and-cancellation)
- [cancel](workflow.md#cancel)
- [shield](workflow.md#shield)
- [cancellationScope](workflow.md#cancellationscope)

## Table of contents

### References

- [ActivityOptions](workflow.md#activityoptions)
- [LocalActivityOptions](workflow.md#localactivityoptions)
- [RemoteActivityOptions](workflow.md#remoteactivityoptions)
- [RetryOptions](workflow.md#retryoptions)

### Classes

- [CancellationError](../classes/workflow.cancellationerror.md)
- [ContextImpl](../classes/workflow.contextimpl.md)
- [DeterminismViolationError](../classes/workflow.determinismviolationerror.md)

### Interfaces

- [ActivityFunction](../interfaces/workflow.activityfunction.md)
- [Workflow](../interfaces/workflow.workflow-1.md)

### Type aliases

- [CancellationSource](workflow.md#cancellationsource)

### Variables

- [Context](workflow.md#context)

### Functions

- [cancel](workflow.md#cancel)
- [cancellationScope](workflow.md#cancellationscope)
- [shield](workflow.md#shield)
- [sleep](workflow.md#sleep)
- [uuid4](workflow.md#uuid4)

## References

### ActivityOptions

Re-exports: [ActivityOptions](worker.md#activityoptions)

___

### LocalActivityOptions

Re-exports: [LocalActivityOptions](../interfaces/worker.localactivityoptions.md)

___

### RemoteActivityOptions

Re-exports: [RemoteActivityOptions](../interfaces/worker.remoteactivityoptions.md)

___

### RetryOptions

Re-exports: [RetryOptions](../interfaces/worker.retryoptions.md)

## Type aliases

### CancellationSource

Ƭ **CancellationSource**: *internal* \| *external*

Used to denote where the cancellation was originated

- external - The workflow was cancelled by an external API call
- internal - Cancellation was requested by using `cancel` from within a workflow

## Variables

### Context

• `Const` **Context**: [*ContextImpl*](../classes/workflow.contextimpl.md)

Holds context of current running workflow

## Functions

### cancel

▸ **cancel**(`promise`: *Promise*<any\>, `reason?`: *string*): *void*

Cancel a scope created by an activity, timer or cancellationScope.

**`see`** [Workflow scopes and cancellation](https://docs.temporal.io/docs/node/workflow-scopes-and-cancellation)

#### Parameters:

Name | Type |
:------ | :------ |
`promise` | *Promise*<any\> |
`reason?` | *string* |

**Returns:** *void*

___

### cancellationScope

▸ **cancellationScope**<T\>(`fn`: () => *Promise*<T\>): *Promise*<T\>

Wraps Promise returned from `fn` with a cancellation scope.
The returned Promise may be be cancelled with `cancel()` and will be cancelled
if a parent scope is cancelled, e.g. when the entire workflow is cancelled.

**`see`** [Workflow scopes and cancellation](https://docs.temporal.io/docs/node/workflow-scopes-and-cancellation)

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`fn` | () => *Promise*<T\> |

**Returns:** *Promise*<T\>

___

### shield

▸ **shield**<T\>(`fn`: () => *Promise*<T\>, `throwOnCancellation?`: *boolean*): *Promise*<T\>

Wraps the Promise returned from `fn` with a shielded scope.
Any child scopes of this scope will *not* be cancelled if `shield` is cancelled.
By default `shield` throws the original [CancellationError](../classes/workflow.cancellationerror.md) in order for any awaiter
to immediately be notified of the cancellation.

**`see`** [Workflow scopes and cancellation](https://docs.temporal.io/docs/node/workflow-scopes-and-cancellation)

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fn` | () => *Promise*<T\> | - |
`throwOnCancellation?` | *boolean* | Pass false in case the result of the shielded `Promise` is needed despite cancellation. To see if the workflow was cancelled while waiting, check `Context.cancelled`.   |

**Returns:** *Promise*<T\>

___

### sleep

▸ **sleep**(`ms`: *number*): *Promise*<void\>

Asynchronous sleep.

Schedules a timer on the Temporal service.
The returned promise is [cancellable](workflow.md#cancel).

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ms` | *number* | milliseconds to sleep for    |

**Returns:** *Promise*<void\>

___

### uuid4

▸ **uuid4**(): *string*

Generate an RFC compliant V4 uuid.
Uses the workflow's deterministic PRNG making it safe for use within a workflow.
This function is cryptograpically insecure.
See the [stackoverflow discussion](https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid).

**Returns:** *string*
