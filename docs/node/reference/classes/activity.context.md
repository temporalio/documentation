# Class: Context

[activity](../modules/activity.md).Context

Activity Context manager.

Call `Context.current()` from activity code in order to send heartbeats and get notified of activity cancellation.

## Table of contents

### Properties

- [cancellationSignal](activity.context.md#cancellationsignal)
- [cancelled](activity.context.md#cancelled)
- [heartbeat](activity.context.md#heartbeat)

### Methods

- [current](activity.context.md#current)

## Properties

### cancellationSignal

• `Readonly` **cancellationSignal**: *AbortSignal*

An `AbortSignal` which can be used to cancel requests on activity cancellation.

Typically used by the [fetch](https://www.npmjs.com/package/node-fetch#request-cancellation-with-abortsignal) and [child_process](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) libraries but is supported by a few other libraries as well.

___

### cancelled

• `Readonly` **cancelled**: *Promise*<never\>

Await this promise in an activity to get notified of cancellation.

This promise will never be resolved, it will only be rejected with a [CancellationError](activity.cancellationerror.md).

___

### heartbeat

• `Readonly` **heartbeat**: (`details`: *any*) => *void*

Send a heartbeat from an activity.

If an Activity times out, the last value of details is included in the ActivityTimeoutException delivered to a Workflow. Then the Workflow can pass the details to the next Activity invocation. This acts as a periodic checkpoint mechanism for the progress of an Activity.

#### Type declaration:

▸ (`details`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`details` | *any* |

**Returns:** *void*

## Methods

### current

▸ `Static`**current**(): [*Context*](activity.context.md)

Gets the context of the current activity.

Uses [AsyncLocalStorage](https://nodejs.org/docs/latest-v14.x/api/async_hooks.html#async_hooks_class_asynclocalstorage) under the hood to make it accessible in nested callbacks and promises.

**Returns:** [*Context*](activity.context.md)
