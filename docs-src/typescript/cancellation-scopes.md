# Cancellation Scopes

In the TypeScript SDK, Workflows are represented internally by a tree of **Cancellation Scopes**, each with cancellation behaviors you can specify.
Everything runs in the "root" scope by default.

Scopes are created using the [`CancellationScope`](https://typescript.temporal.io/api/classes/workflow.CancellationScope) constructor, or one of 3 static helpers:

- [`cancellable(fn)`](https://typescript.temporal.io/api/classes/workflow.CancellationScope#cancellable-1): children are automatically cancelled when their containing scope is cancelled.
  - Equivalent to `new CancellationScope().run(fn)`.
- [`nonCancellable(fn)`](https://typescript.temporal.io/api/classes/workflow.CancellationScope#noncancellable): prevents cancellation from propagating to children.
  - Equivalent to `new CancellationScope({ cancellable: false }).run(fn)`.
- [`withTimeout(timeoutMs, fn)`](https://typescript.temporal.io/api/classes/workflow.CancellationScope#withtimeout): if timeout triggers before `fn` resolves the scope will be cancelled, triggering cancellation of enclosed operations, such as activities and timers.
  - Equivalent to `new CancellationScope({ cancellable: true, timeout: timeoutMs }).run(fn)`.

Cancellations are applied to _cancellation scopes_, which can encompass an entire Workflow or just part of one.
Scopes can be nested, and cancellation propagates from outer scopes to inner ones.
A Workflow's `main` function runs in the outermost scope.
Cancellations are handled by catching `CancelledFailure`s thrown by _cancellable operations_ (see below).

`CancellationScope.run()` and the static helpers mentioned above all return native JS Promises, so you can use the familiar Promise APIs like `Promise.all` and `Promise.race` to model your async logic.
Other APIs you can use:

- `CancellationScope.current()`: get the current scope
- `scope.cancel()`: cancel all operations inside a `scope`
- `scope.run(fn)`: run an async function within a `scope`, returns the result of `fn`
- `scope.cancelRequested`: a promise that resolves when a scope cancellation is requested, e.g. when Workflow code calls `cancel()` or the entire Workflow is cancelled by an external client.

When a `CancellationScope` is cancelled, it propagates cancellation in any child scopes and of any _cancellable operations_ created within it, such as:

- Activities
- Timers (created with the [`sleep`](https://typescript.temporal.io/api/namespaces/workflow#sleep) function)
- [`Trigger`](https://typescript.temporal.io/api/classes/workflow.Trigger)s

### [CancelledFailure](/typescript/handling-failure/#cancelledfailure)

`Timer`s and `Trigger`s throw `CancelledFailure` when cancelled while Activities and Child Workflows throw `ActivityFailure` and `ChildWorkflowFailure` with cause set to `CancelledFailure`.
One exception is when an Activity or Child Workflow is scheduled in an already cancelled scope (or workflow) in which case they'll propagate the `CancelledFailure` that was thrown to cancel the scope.

In order to simplify checking for cancellation, use the [`isCancellation(err)`](https://typescript.temporal.io/api/namespaces/workflow#iscancellation) function.

## Internal cancellation example

<!--SNIPSTART typescript-cancel-a-timer-from-workflow-->
[packages/test/src/workflows/cancel-timer-immediately.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/cancel-timer-immediately.ts)
```ts
import { CancelledFailure, CancellationScope, sleep } from '@temporalio/workflow';

export async function cancelTimer(): Promise<void> {
  // Timers and Activities are automatically cancelled when their containing scope is cancelled.
  try {
    await CancellationScope.cancellable(async () => {
      const promise = sleep(1); // <-- Will be cancelled because it is attached to this closure's scope
      CancellationScope.current().cancel();
      await promise; // <-- Promise must be awaited in order for `cancellable` to throw
    });
  } catch (e) {
    if (e instanceof CancelledFailure) {
      console.log('Timer cancelled 👍');
    } else {
      throw e; // <-- Fail the workflow
    }
  }
}
```
<!--SNIPEND-->

Alternatively, the preceding can be written as:

<!--SNIPSTART typescript-cancel-a-timer-from-workflow-alternative-impl-->
[packages/test/src/workflows/cancel-timer-immediately-alternative-impl.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/cancel-timer-immediately-alternative-impl.ts)
```ts
import { CancelledFailure, CancellationScope, sleep } from '@temporalio/workflow';

export async function cancelTimerAltImpl(): Promise<void> {
  try {
    const scope = new CancellationScope();
    const promise = scope.run(() => sleep(1));
    scope.cancel(); // <-- Cancel the timer created in scope
    await promise; // <-- Throws CancelledFailure
  } catch (e) {
    if (e instanceof CancelledFailure) {
      console.log('Timer cancelled 👍');
    } else {
      throw e; // <-- Fail the workflow
    }
  }
}
```
<!--SNIPEND-->

## External cancellation example

Handle Workflow cancellation by an external client while an Activity is running:

<!-- TODO: add a sample here of how this Workflow could be cancelled using a WorkflowHandle -->

<!--SNIPSTART typescript-handle-external-workflow-cancellation-while-activity-running-->
[packages/test/src/workflows/handle-external-workflow-cancellation-while-activity-running.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/handle-external-workflow-cancellation-while-activity-running.ts)
```ts
import { CancellationScope, proxyActivities, isCancellation } from '@temporalio/workflow';
import type * as activities from '../activities';

const { httpPostJSON, cleanup } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10m',
});

export async function handleExternalWorkflowCancellationWhileActivityRunning(url: string, data: any): Promise<void> {
  try {
    await httpPostJSON(url, data);
  } catch (err) {
    if (isCancellation(err)) {
      console.log('Workflow cancelled');
      // Cleanup logic must be in a nonCancellable scope
      // If we'd run cleanup outside of a nonCancellable scope it would've been cancelled
      // before being started because the Workflow's root scope is cancelled.
      await CancellationScope.nonCancellable(() => cleanup(url));
    }
    throw err; // <-- Fail the Workflow
  }
}
```
<!--SNIPEND-->

## `nonCancellable` example

`CancellationScope.nonCancellable` prevents cancellation from propagating to children:

<!--SNIPSTART typescript-non-cancellable-shields-children-->
[packages/test/src/workflows/non-cancellable-shields-children.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/non-cancellable-shields-children.ts)
```ts
import { CancellationScope, proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { httpGetJSON } = proxyActivities<typeof activities>({ startToCloseTimeout: '10m' });

export async function nonCancellable(url: string): Promise<any> {
  // Prevent Activity from being cancelled and await completion.
  // Note that the Workflow is completely oblivious and impervious to cancellation in this example.
  return CancellationScope.nonCancellable(() => httpGetJSON(url));
}
```
<!--SNIPEND-->

## `withTimeout` example

A very common operation is to cancel one or more activities if a deadline elapses, `withTimeout` creates a `CancellationScope` that is automatically cancelled after a given timeout.

<!--SNIPSTART typescript-multiple-activities-single-timeout-workflow-->
[packages/test/src/workflows/multiple-activities-single-timeout.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/multiple-activities-single-timeout.ts)
```ts
import { CancellationScope, proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

export function multipleActivitiesSingleTimeout(urls: string[], timeoutMs: number): Promise<any> {
  const { httpGetJSON } = proxyActivities<typeof activities>({
    startToCloseTimeout: timeoutMs,
  });

  // If timeout triggers before all activities complete
  // the Workflow will fail with a CancelledError.
  return CancellationScope.withTimeout(timeoutMs, () => Promise.all(urls.map((url) => httpGetJSON(url))));
}
```
<!--SNIPEND-->

## `scope.cancelRequested`

You can await `cancelRequested` to make Workflow aware of cancellation while waiting on `nonCancellable` scopes:

<!--SNIPSTART typescript-cancel-requested-with-non-cancellable-->
[packages/test/src/workflows/cancel-requested-with-non-cancellable.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/cancel-requested-with-non-cancellable.ts)
```ts
import { CancellationScope, CancelledFailure, proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { httpGetJSON } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10m',
});

export async function resumeAfterCancellation(url: string): Promise<any> {
  let result: any = undefined;
  const scope = new CancellationScope({ cancellable: false });
  const promise = scope.run(() => httpGetJSON(url));
  try {
    result = await Promise.race([scope.cancelRequested, promise]);
  } catch (err) {
    if (!(err instanceof CancelledFailure)) {
      throw err;
    }
    // Prevent Workflow from completing so Activity can complete
    result = await promise;
  }
  return result;
}
```
<!--SNIPEND-->

## CancellationScopes and callbacks

Callbacks are not particularly useful in Workflows because all meaningful asynchronous operations return Promises.
In the rare case that user code utilizes callbacks and needs to handle cancellation, a callback can be used to consume the `CancellationScope.cancelRequested` `Promise`.

<!--SNIPSTART typescript-cancellation-scopes-with-callbacks-->
[packages/test/src/workflows/cancellation-scopes-with-callbacks.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/cancellation-scopes-with-callbacks.ts)
```ts
import { CancellationScope } from '@temporalio/workflow';

function doSomething(callback: () => any) {
  setTimeout(callback, 10);
}

export async function cancellationScopesWithCallbacks(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    doSomething(resolve);
    CancellationScope.current().cancelRequested.catch(reject);
  });
}
```
<!--SNIPEND-->

## Nesting Cancellation Scopes

Complex flows may be achieved by nesting cancellation scopes:

<!--SNIPSTART typescript-nested-cancellation-scopes-->
[packages/test/src/workflows/nested-cancellation.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/nested-cancellation.ts)
```ts
import { CancellationScope, proxyActivities, isCancellation } from '@temporalio/workflow';

import type * as activities from '../activities';

const { setup, httpPostJSON, cleanup } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10m',
});

export async function nestedCancellation(url: string): Promise<void> {
  await CancellationScope.cancellable(async () => {
    await CancellationScope.nonCancellable(() => setup());
    try {
      await CancellationScope.withTimeout(1000, () => httpPostJSON(url, { some: 'data' }));
    } catch (err) {
      if (isCancellation(err)) {
        await CancellationScope.nonCancellable(() => cleanup(url));
      }
      throw err;
    }
  });
}
```
<!--SNIPEND-->

## Sharing promises between scopes

Operations like timers and Activities are cancelled by the cancellation scope they were created in. Promises returned by these operations can be awaited in different scopes.

<!--SNIPSTART typescript-shared-promise-scopes-->
[packages/test/src/workflows/shared-promise-scopes.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/shared-promise-scopes.ts)
```ts
import { CancellationScope, proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { httpGetJSON } = proxyActivities<typeof activities>({ startToCloseTimeout: '10m' });

export async function sharedScopes(): Promise<any> {
  // Start activities in the root scope
  const p1 = httpGetJSON('http://url1.ninja');
  const p2 = httpGetJSON('http://url2.ninja');

  const scopePromise = CancellationScope.cancellable(async () => {
    const first = await Promise.race([p1, p2]);
    // Does not cancel activity1 or activity2 as they're linked to the root scope
    CancellationScope.current().cancel();
    return first;
  });
  return await scopePromise;
  // The Activity that did not complete will effectively be cancelled when
  // Workflow completes unless the Activity is awaited:
  // await Promise.all([p1, p2]);
}
```
<!--SNIPEND-->

<!--SNIPSTART typescript-shield-awaited-in-root-scope-->
[packages/test/src/workflows/shield-awaited-in-root-scope.ts](https://github.com/temporalio/sdk-typescript/blob/master/packages/test/src/workflows/shield-awaited-in-root-scope.ts)
```ts
import { CancellationScope, proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { httpGetJSON } = proxyActivities<typeof activities>({ startToCloseTimeout: '10m' });

export async function shieldAwaitedInRootScope(): Promise<any> {
  let p: Promise<any> | undefined = undefined;

  await CancellationScope.nonCancellable(async () => {
    p = httpGetJSON('http://example.com'); // <-- Start activity in nonCancellable scope without awaiting completion
  });
  // Activity is shielded from cancellation even though it is awaited in the cancellable root scope
  return p;
}
```
<!--SNIPEND-->
