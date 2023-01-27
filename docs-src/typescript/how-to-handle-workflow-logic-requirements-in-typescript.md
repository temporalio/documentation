---
id: how-to-handle-workflow-logic-requirements-in-typescript
title: How to handle Workflow logic requirements in TypeScript
sidebar_label: Workflow logic requirements
description: Handle Signal
tags:
  - developer-guide
  - sdk
  - typescript
---

In the Temporal TypeScript SDK, Workflows run in a deterministic sandboxed environment.
The code is bundled on Worker creation using Webpack, and any package can be imported as long as it does not reference Node.js or DOM APIs.

Because the Workflow sandbox can run only deterministic code, [Side Effects](/workflows#side-effect) and access to external state must be done through Activities.
This limitation also means that Workflow code cannot directly import the Activity Definition.
Activity Types can be imported, so they can be invoked in a type-safe manner.

To make the Workflow runtime deterministic, functions like `Math.random()`, `Date`, and `setTimeout()` are replaced by deterministic versions.

<!-- [`FinalizationRegistry`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry), and [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) are removed because v8's garbage collector is not deterministic. -->

The only way Workflows should interact with the outside world is through Activities.
When an Activity completes, its result is stored in the Event History to be replayed in case of a restored Workflow.

The use of the `Date.now()` function in the countdown timer example shows how date is deterministic in the Workflow.

<!--SNIPSTART typescript-updatable-timer-impl {"selectedLines": ["2-10"]}-->

[timer-examples/src/updatable-timer.ts](https://github.com/temporalio/samples-typescript/blob/master/timer-examples/src/updatable-timer.ts)

```ts
// usage
export async function countdownWorkflow(): Promise<void> {
  const target = Date.now() + 24 * 60 * 60 * 1000; // 1 day!!!
  const timer = new UpdatableTimer(target);
  console.log('timer set for: ' + new Date(target).toString());
  setHandler(setDeadlineSignal, (deadline) => {
    // send in new deadlines via Signal
    timer.deadline = deadline;
    console.log('timer now set for: ' + new Date(deadline).toString());
  });
  setHandler(timeLeftQuery, () => timer.deadline - Date.now());
  await timer; // if you send in a signal with a new time, this timer will resolve earlier!
  console.log('countdown done!');
}

// implementation
export class UpdatableTimer implements PromiseLike<void> {
  deadlineUpdated = false;
  #deadline: number;
  readonly promise: Promise<void>;

  constructor(deadline: number) {
    this.#deadline = deadline;
    this.promise = this.run();
    this.promise.catch(() => {
      // avoid unhandled rejection
    });
  }

  private async run(): Promise<void> {
    /* eslint-disable no-constant-condition */
    while (true) {
      this.deadlineUpdated = false;
      if (
        !(await condition(
          () => this.deadlineUpdated,
          this.#deadline - Date.now(),
        ))
      ) {
        break;
      }
    }
  }

  then<TResult1 = void, TResult2 = never>(
    onfulfilled?: (value: void) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>,
  ): PromiseLike<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  set deadline(value: number) {
    this.#deadline = value;
    this.deadlineUpdated = true;
  }

  get deadline(): number {
    return this.#deadline;
  }
}
```

<!--SNIPEND-->
