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
The code is bundled on Worker creation using Webpack, and can import any package as long as it does not reference Node.js or DOM APIs.

:::note

If you use a library that references a Node.js or DOM API, ensure that they're not used at runtime.
For more information, see [`ignoreModules`](https://typescript.temporal.io/api/interfaces/worker.BundleOptions#ignoremodules).

:::

Because the Workflow sandbox can run only deterministic code, side effects and access to external state must be done through Activities.
This limitation also means that Workflow code cannot directly import the [Activity Definition](/concepts/what-is-an-activity-definition).
Activity Types can be imported, so they can be invoked in a type-safe manner.

To make the Workflow runtime deterministic, functions like `Math.random()`, `Date`, and `setTimeout()` are replaced by deterministic versions.

<!-- [`FinalizationRegistry`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry), and [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) are removed because v8's garbage collector is not deterministic. -->

The only way Workflows should interact with the outside world is through Activities.
Activity outputs are recorded in the Event History, so it can be read deterministically by the Workflow.

<details><summary>Example</summary>

The use of the `sleep()` function in the code example shows how date is deterministic in the Workflow.

```typescript
import { sleep } from '@temporalio/workflow';

// this prints the *exact* same timestamp repeatedly
for (let x = 0; x < 10; ++x) {
  console.log(Date.now());
}

// this prints timestamps increasing roughly 1s each iteration
for (let x = 0; x < 10; ++x) {
  await sleep('1 second');
  console.log(Date.now());
}
```

</details>
