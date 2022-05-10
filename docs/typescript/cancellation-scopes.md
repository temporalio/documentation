# Cancellation Scopes

In the TypeScript SDK, Workflows are represented internally by a tree of **Cancellation Scopes**, each with cancellation behaviors you can specify.
Everything runs in the "root" scope by default.

Scopes are created using the [`CancellationScope`](https://typescript.temporal.io/api/classes/workflow.cancellationscope) constructor, or one of 3 static helpers:

- [`cancellable(fn)`](https://typescript.temporal.io/api/classes/workflow.cancellationscope#cancellable-1): children are automatically cancelled when their containing scope is cancelled.
  - Equivalent to `new CancellationScope().run(fn)`.
- [`nonCancellable(fn)`](https://typescript.temporal.io/api/classes/workflow.cancellationscope#noncancellable): prevents cancellation from propagating to children.
  - Equivalent to `new CancellationScope({ cancellable: false }).run(fn)`.
- [`withTimeout(timeoutMs, fn)`](https://typescript.temporal.io/api/classes/workflow.cancellationscope#withtimeout): if timeout triggers before `fn` resolves the scope will be cancelled, triggering cancellation of enclosed operations, such as activities and timers.
  - Equivalent to `new CancellationScope({ cancellable: true, timeout: timeoutMs }).run(fn)`.

Cancellations are applied to _cancellation scopes_, which can encompass an entire workflow or just part of one. Scopes can be nested, and cancellation propagates from outer scopes to inner ones. A Workflow's `main` function runs in the outermost scope. Cancellations are handled by catching `CancelledFailure`s thrown by _cancellable operations_ (see below).

`CancellationScope.run()` and the static helpers mentioned above all return native JS Promises, so you can use the familiar Promise APIs like `Promise.all` and `Promise.race` to model your async logic.
Other APIs you can use:

- `CancellationScope.current()`: get the current scope
- `scope.cancel()`: cancel all operations inside a `scope`
- `scope.run(fn)`: run an async function within a `scope`, returns the result of `fn`
- `scope.cancelRequested`: a promise that resolves when a scope cancellation is requested, e.g. when Workflow code calls `cancel()` or the entire Workflow is cancelled by an external client.

When a `CancellationScope` is cancelled, it propagates cancellation in any child scopes and of any _cancellable operations_ created within it, such as:

- Activities
- Timers (created with the [`sleep`](https://typescript.temporal.io/api/namespaces/workflow#sleep) function)
- [`Trigger`](https://typescript.temporal.io/api/classes/workflow.trigger)s

### [CancelledFailure](/typescript/handling-failure/#cancelledfailure)

`Timer`s and `Trigger`s throw `CancelledFailure` when cancelled while Activities and Child Workflows throw `ActivityFailure` and `ChildWorkflowFailure` with cause set to `CancelledFailure`.
One exception is when an Activity or Child Workflow is scheduled in an already cancelled scope (or workflow) in which case they'll propagate the `CancelledFailure` that was thrown to cancel the scope.

In order to simplify checking for cancellation, use the [`isCancellation(err)`](https://typescript.temporal.io/api/namespaces/workflow#iscancellation) function.

## Internal cancellation example

<!--SNIPSTART typescript-cancel-a-timer-from-workflow-->
<!--SNIPEND-->

Alternatively, the preceding can be written as:

<!--SNIPSTART typescript-cancel-a-timer-from-workflow-alternative-impl-->
<!--SNIPEND-->

## External cancellation example

Handle Workflow cancellation by an external client while an Activity is running:

<!-- TODO: add a sample here of how this Workflow could be cancelled using a WorkflowHandle -->

<!--SNIPSTART typescript-handle-external-workflow-cancellation-while-activity-running-->
<!--SNIPEND-->

## `nonCancellable` example

`CancellationScope.nonCancellable` prevents cancellation from propagating to children:

<!--SNIPSTART typescript-non-cancellable-shields-children-->
<!--SNIPEND-->

## `withTimeout` example

A very common operation is to cancel one or more activities if a deadline elapses, `withTimeout` creates a `CancellationScope` that is automatically cancelled after a given timeout.

<!--SNIPSTART typescript-multiple-activities-single-timeout-workflow-->
<!--SNIPEND-->

## `scope.cancelRequested`

You can await `cancelRequested` to make Workflow aware of cancellation while waiting on `nonCancellable` scopes:

<!--SNIPSTART typescript-cancel-requested-with-non-cancellable-->
<!--SNIPEND-->

## CancellationScopes and callbacks

Callbacks are not particularly useful in Workflows because all meaningful asynchronous operations return Promises.
In the rare case that user code utilizes callbacks and needs to handle cancellation, a callback can be used to consume the `CancellationScope.cancelRequested` `Promise`.

<!--SNIPSTART typescript-cancellation-scopes-with-callbacks-->
<!--SNIPEND-->

## Nesting Cancellation Scopes

Complex flows may be achieved by nesting cancellation scopes:

<!--SNIPSTART typescript-nested-cancellation-scopes-->
<!--SNIPEND-->

## Sharing promises between scopes

Operations like timers and Activities are cancelled by the cancellation scope they were created in. Promises returned by these operations can be awaited in different scopes.

<!--SNIPSTART typescript-shared-promise-scopes-->
<!--SNIPEND-->

<!--SNIPSTART typescript-shield-awaited-in-root-scope-->
<!--SNIPEND-->
