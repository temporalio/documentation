---
tags:
  - temporal
  - community
posted_on_: 2021-09-22T00:00:00Z
slug: intro-to-isolated-vm
title: Introduction to isolated-vm in TypeScript
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.9.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--truncate-->

## Introduction

[Temporal's TypeScript SDK](/typescript/introduction) makes heavy use of V8 isolates via the [isolated-vm npm package](https://www.npmjs.com/package/isolated-vm) to ensure your [Workflows are deterministic](/typescript/determinism).
Each Workflow runs in an _isolate_ that prevents your Workflow code from directly accessing any logic that may break Workflow determinism, like reading from the file system or generating a random number.
In this blog post, I'll cover why the TypeScript SDK V8 isolates, sketch out how the TypeScript SDK uses isolates, and describe what that means for how you write Workflows in TypeScript.

## Why Isolates?

The key idea behind Temporal is that each Workflow is stored in the Temporal Server as an [_event history_](/blog/temporal-tips-tricks-1/#event-history).
Instead of storing the "current state" of each Workflow, Temporal instead stores the entire history of the Workflow.
That includes the Workflow's initial state, all Signals the Workflow has received, and the result of all Activities the Workflow executed.

The [Temporal Server](https://docs.temporal.io/clusters/) can pause the Workflow and resume it on a different Worker.
For example, the Workflow may be evicted from the [Worker's cache if the cache is out of space](https://docs.temporal.io/concepts/workflows/#faq).
To restore the Workflow, The Temporal Server will replay the Workflow function from the beginning using the same Signals and Activity results.
However, replaying event histories assumes that the Workflow is fully _deterministic_.
That means the Workflow will be in the exact same state given the same initial state and same sequence of events.

There are a lot of potential sources of non-determinism.
Some are obvious, some are more subtle.
For example, suppose you tried to write a Workflow that sleeps for a conditional amount of time based on the current time.

```ts
import { sleep } from '@temporalio/workflow';

export const sleepWorkflow = () => ({
  return {
    async execute(): Promise<void> {
      const start = Date.now();
      // Sleep until the end of the current second
      await sleep(1000 - start.valueOf() % 1000);
    }
  }
})
```

If `sleepWorkflow()` ran in vanilla Node.js, it would **not** be deterministic because `Date.now()` is not deterministic.
If the Temporal Server pauses the Workflow and later runs `execute()` to restart the Workflow, the Workflow will sleep for a different amount of time unless the Temporal Server happens to restart the Workflow at exactly the right time.

The Temporal TypeScript SDK runs your Workflow code in an isolate to remove sources of non-determinism.
Running in an isolate means each Workflow execution has its own memory, so there's no way for Workflows to share a singleton or any other form of shared state.
And the Temporal TypeScript SDK can replace commonly used non-deterministic built-ins, like the `Date` constructor, with Workflow-safe replacements.
For example, suppose you wrote a Workflow that printed out the `Date` constructor as a string as shown below.

```ts
export const testWorkflow = () => ({
  return {
    async execute(): Promise<Date> {
      console.log(Date.toString());
      return new Date();
    }
  }
})
```

Running `testWorkflow()` would print something like what you see below.
Notice that `Date()` is now a stub that pulls the current time from the Temporal TypeScript SDK's internal state, rather than the system time.

```
example 00363f1d-19c7-429f-aabb-6067b4df2bd2 > function () {
        return new OriginalDate(internals_1.state.now);
    }
```

## Getting Started with isolated-vm

The isolated-vm module allows you to create a new _isolate_, and execute a _script_ within the isolate with a given _context_.
Below is a "Hello, World" example of running a script within an isolate in isolated-vm.
For the purposes of this tutorial we'll use the sync versions of isolated-vm's `compileScript()`, `createContext()`, and `run()` functions for brevity.

```ts
import ivm from 'isolated-vm';

const code = `(function() { return 'Hello, Isolate!'; })()`;

const isolate = new ivm.Isolate({ memoryLimit: 8 /* MB */ });
const script = isolate.compileScriptSync(code);
const context = isolate.createContextSync();

// Prints "Hello, Isolate!"
console.log(script.runSync(context));
```

A [context](https://www.npmjs.com/package/isolated-vm#class-context-transferable) is an object that contains the global variables available to the script when it runs in the isolate.
You can share global values between runs by re-using the same context as shown below.

```ts
import ivm from 'isolated-vm';
  
const code = `++count;`;

const isolate = new ivm.Isolate({ memoryLimit: 8 /* MB */ });
const script = isolate.compileScriptSync(code);
const context = isolate.createContextSync();

context.evalSync('let count = 0;');

console.log(script.runSync(context)); // Prints "1"
console.log(script.runSync(context)); // Prints "2"
```

However, by creating a new context for every run, you can ensure that each `runSync()` call runs in an isolated environment, with no ability to interact with other `runSync()` calls.
That's how the [Temporal TypeScript SDK ensures Workflows can't interfere with each other](https://github.com/temporalio/sdk-typescript/blob/5a0f780b9cb4c0dae265c08ca99fbc1f58c4ab83/packages/worker/src/isolate-context-provider.ts#L32-L40).

How does the Temporal TypeScript SDK handle overwriting the `Date()` constructor?
The Temporal TypeScript SDK compiles your Workflows with [Webpack](https://www.npmjs.com/package/webpack) and creates an [entry script that overrides `Date()` before your Workflow starts](https://github.com/temporalio/sdk-typescript/blob/5a0f780b9cb4c0dae265c08ca99fbc1f58c4ab83/packages/worker/src/isolate-builder.ts#L89-L125).
Webpack also bundles dependencies, which means your Workflows can use `import` statements.

## Takeaways for Writing Workflows in TypeScript

The Temporal TypeScript SDK runs Workflows in a clean v8 runtime that has several globals stubbed out, including [`Math.random()`, `Date()`, `setTimeout()`, and `clearTimeout()`](https://github.com/temporalio/sdk-typescript/blob/004c2846fe4e4312eb2c424da477bc0c280d6c48/packages/workflow/src/worker-interface.ts).
In particular, accessing `WeakRef()`, and `FinalizationRegistry` throw errors, because garbage collection is non-deterministic.
The Temporal TypeScript SDK also explicitly prevents you from accessing several Node.js APIs, including `fs` and `http`.
For example, if you try to import `fs` in a Workflow, your worker will fail with the below error message at startup.

```
Module not found: Error: Can't resolve 'fs' in '/path/to/lib/workflows'
```

**Because of this, do not use any npm modules that read from the file system or make HTTP requests in your Workflows.**
Furthermore, because these npm modules are unlikely to check for Temporal's runtime environment, they will most likely crash with hard-to-read error messages.
For example, suppose you try to [make a GET request with Axios](https://masteringjs.io/tutorials/axios/get) from a Workflow as shown below.

```ts
import axios from 'axios';

// Don't make non-deterministic calls inside Workflows
export const httpWorkflow = () => {
  return {
    async execute(): Promise<void> {
      return await axios.get('http://httpbin.org/get');
    }
  }
}
```

The `await axios.get()` call will throw a `TypeError: adapter is not a function` error, because Axios doesn't recognize the Temporal Workflow isolate runtime.

If you need to use an npm module that interacts with the outside world, like Axios or [Mongoose](https://mongoosejs.com/), you should create an Activity that uses the npm module.
Activities run in the normal Node.js environment, **not** an isolate.

```ts
import axios from 'axios';

// Do place all side effects in Activities - Failures will be retried, use idempotency keys if necessary
export async function makeHTTPRequest(): Promise<void> {
  return await axios.get('http://httpbin.org/get');
}
```

## Moving On

The Temporal TypeScript SDK uses isolated-vm to ensure there's no way for developers to violate Workflow determinism.
Your Workflow will throw an error if you intentionally or unintentionally write some non-deterministic code.
This makes the TypeScript SDK different from some of Temporal's other SDKs, like the [Go SDK](https://docs.temporal.io/go/workflows#how-to-write-workflow-code), which currently rely on developers to avoid using language built-ins that violate determinism.
Workflow determinism is a critical assumption in Temporal, so making it impossible to accidentally break Workflow determinism is a major benefit of the Temporal TypeScript SDK.
