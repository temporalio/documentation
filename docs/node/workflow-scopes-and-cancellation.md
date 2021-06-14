# Workflow scopes and Cancellation

In the Node SDK, Workflows are represented internally by a tree of scopes where the main function runs in the root scope.
Cancellation propagates from outer scopes to inner ones and is handled by catching `CancelledError`s
thrown by cancellable operations (see below).

Scopes are created using the [`CancellationScope`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope) constructor or the static helper methods
[`cancellable`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#cancellable-1),
[`nonCancellable`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#noncancellable),
and [`withTimeout`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#withtimeout).

When a `CancellationScope` is cancelled, it will propagate cancellation any child scopes and any cancellable operations created within it, such as:

- Activities
- Timers (created with the [`sleep`](https://nodejs.temporal.io/api/modules/workflow#sleep) function)
- [`Trigger`](https://nodejs.temporal.io/api/classes/workflow.trigger)s

## Examples

#### Cancel a timer from Workflow code

<!--SNIPSTART nodejs-cancel-a-timer-from-workflow-->
<!--SNIPEND-->

#### Alternatively the above can be written as

<!--SNIPSTART nodejs-cancel-a-timer-from-workflow-alternative-impl-->
<!--SNIPEND-->

#### Run multiple activities with a single deadline

<!--SNIPSTART nodejs-multiple-activities-single-timeout-workflow-->
<!--SNIPEND-->

#### `nonCancellable` prevents cancellation from propagating to children

<!--SNIPSTART nodejs-non-cancellable-shields-children-->
<!--SNIPEND-->

#### `cancelRequested` may be awaited upon in order to make Workflow aware of cancellation while waiting on `nonCancellable` scopes

<!--SNIPSTART nodejs-cancel-requested-with-non-cancellable-->
<!--SNIPEND-->

#### Handle Workflow cancellation by an external client while an Activity is running

<!--SNIPSTART nodejs-handle-external-workflow-cancellation-while-activity-running-->
<!--SNIPEND-->

#### Complex flows may be achieved by nesting cancellation scopes

<!--SNIPSTART nodejs-nested-cancellation-scopes-->
<!--SNIPEND-->

#### Sharing promises between scopes

Operations like timer and Activites are cancelled by the cancellation scope they were created in, the Promise returned by these operation may be awaited upon in different scopes.

<!--SNIPSTART nodejs-shared-promise-scopes-->
<!--SNIPEND-->

<!--SNIPSTART nodejs-shield-awaited-in-root-scope-->
<!--SNIPEND-->

#### Callbacks and cancellation scopes

Callbacks are not particularly useful in the Workflows because all meaningful asynchronous operations return a Promise.

In the odd case that user code utilizes callbacks, CancellationScope.cancelRequested can be used to subscribe to cancellation.

<!--SNIPSTART nodejs-cancellation-scopes-with-callbacks-->
<!--SNIPEND-->
