---
id: troubleshooting
title: Troubleshooting Issues with the TypeScript SDK
sidebar_label: Troubleshooting
---

This document is a quick checklist of common user errors for your reference.

## Wrong Node.js version

If you find segfaults when you execute code in Workers:

```bash
98602 segmentation fault  npm start
```

This comes from running the wrong Node version.
This SDK explicitly only supports Node 14.x, or Node 16.4.1+ (not Node 14.0 to 16.4).

If you switch Node versions and now your Workers don't even run because of errors that look like this:

```bash
Error: The module '/YOUR_PATH/node_modules/isolated-vm/out/isolated_vm.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 93. This version of Node.js requires
NODE_MODULE_VERSION 88. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

That is because you are now running Workers with a different Node version than the modules were built with.
Rebuild them with `npm rebuild`.

## Two Locations to Watch

- Workflow Errors are reflected in Temporal Web
- Worker errors and logs are reflected in the terminal.

If something isn't behaving the way you expect, make sure to check both locations for helpful error messages.

## Stale Workflows

If you are developing Workflows and finding that code isn't executing as expected, the first place to look is whether old Workflows are still running.

If those old Workflows have the same name and are on the same task queue, Temporal will try to continue executing them on your new code by design.
You may get errors that make no sense to you because

- Temporal is trying to execute old Workflow code that no longer exists in your codebase, or
- your new Client code is expecting Temporal to execute old Workflow/Activity code it doesn't yet know about.

The biggest sign that this is happening is if you notice Temporal is acting non-deterministically.

If you need to terminate the old Workflows, you can do so with Temporal Web or `tctl`.

## Workflow/Activity registration errors

If your Workflows or Activities are not imported correctly or registered correctly, here are some errors we've seen:

- `ApplicationFailure: 'MyFunction' is not a function`
- `Workflow did not register a handler for MyQuery`

Please let us know if you have more error types to pattern match against.

## Webpack errors

The TypeScript SDK's [Worker](/docs/typescript/workers) bundles Workflows based on `workflowsPath` and their dependencies from `nodeModulesPaths` with [Webpack](https://webpack.js.org/) and run them inside v8 isolates.

If Webpack fails to create the bundle, the SDK will throw an error and emit webpack logs using the SDK's [logger](/docs/typescript/logging#logs-generated-by-sdk-components).

If you do not see Webpack output in your terminal make sure that you have not disabled SDK logging (see reference to `Core.install()` in the link above).

**A common mistake for newcomers to the TypeScript SDK is to try and use Node.js built-ins and modules in their Workflow code.**

Some common examples that will **not** work in the Workflow isolate:

<details>
<summary>
Importing node built-in modules
</summary>

:::danger Antipattern

```ts
import fs from 'fs';

const config = fs.readFileSync('config.json', 'utf8');
```

:::

This is invalid because reading from the filesystem is a non-deterministic operation, the file may change from the time of the original Workflow execution to when the Workflow is replayed.

You'll typically see an error in this form in the Webpack output:

```
2021-10-14T19:22:00.606Z [INFO] Module not found: Error: Can't resolve 'fs' in '/Users/you/your-project/src'
2021-10-14T19:22:00.606Z [INFO] resolve 'fs' in '/Users/you/your-project/src'
2021-10-14T19:22:00.606Z [INFO]   Parsed request is a module
2021-10-14T19:22:00.606Z [INFO]   using description file: /Users/you/your-project/package.json (relative path: ./src)
2021-10-14T19:22:00.606Z [INFO]     Field 'browser' doesn't contain a valid alias configuration
```

</details>

<details>
<summary>
Importing and calling Activities directly from Workflow code
</summary>

:::danger Antipattern

```ts
import { makeHTTPRequest } from './activities';

export async function myWorkflow(): Promise<string> {
  return await makeHTTPRequest('https://temporal.io');
}
```

:::

This is invalid because activity implementations should not be directly referenced by Workflow code.
Activities are used by Workflows in order make network calls and reading from the filesystem, operations which are non-deterministic by nature because they rely on external state.
Temporal records Activity results in the Workflow history and in case your Workflow is replayed, completed Activities will not be rerun, instead their recorded result will be delivered to the Workflow.

You'll typically see an error in this form in the Webpack output:

```
2021-10-14T19:46:52.731Z [INFO] ERROR in ./src/activities.ts 8:31-46
2021-10-14T19:46:52.731Z [INFO] Module not found: Error: Can't resolve 'http' in '/Users/you/your-project/src'
2021-10-14T19:46:52.731Z [INFO]
2021-10-14T19:46:52.731Z [INFO] BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
2021-10-14T19:46:52.731Z [INFO] This is no longer the case. Verify if you need this module and configure a polyfill for it.
2021-10-14T19:46:52.731Z [INFO]
2021-10-14T19:46:52.731Z [INFO] If you want to include a polyfill, you need to:
2021-10-14T19:46:52.731Z [INFO]         - add a fallback 'resolve.fallback: { "http": require.resolve("stream-http") }'
2021-10-14T19:46:52.731Z [INFO]         - install 'stream-http'
2021-10-14T19:46:52.731Z [INFO] If you don't want to include a polyfill, you can use an empty module like this:
2021-10-14T19:46:52.731Z [INFO]         resolve.fallback: { "http": false }
```

To properly call your Activities from Workflow code use `createActivityHandle` and make sure to only import the Activity types.

```ts
import { createActivityHandle } from '@temporalio/workflow';

import type * as activities from './activities';
const { makeHTTPRequest } = createActivityHandle<typeof activities>();

export async function myWorkflow(): Promise<string> {
  return await makeHTTPRequest('https://temporal.io');
}
```

</details>

## gRPC call timeouts (context deadline exceeded)

The opaque `context deadline exceeded` error comes from `gRPC`:

```
Error: 4 DEADLINE_EXCEEDED: context deadline exceeded
    at Object.callErrorFromStatus (/Users/swyx/Work/Temporal/samples-typescript/nextjs-oneclick/node_modules/@grpc/grpc-js/build/src/call.js:31:26)
    at Object.onReceiveStatus (/Users/swyx/Work/Temporal/samples-typescript/nextjs-oneclick/node_modules/@grpc/grpc-js/build/src/client.js:179:52)
    at Object.onReceiveStatus (/Users/swyx/Work/Temporal/samples-typescript/nextjs-oneclick/node_modules/@grpc/grpc-js/build/src/client-interceptors.js:336:141)
    at Object.onReceiveStatus (/Users/swyx/Work/Temporal/samples-typescript/nextjs-oneclick/node_modules/@grpc/grpc-js/build/src/client-interceptors.js:299:181)
    at /Users/swyx/Work/Temporal/samples-typescript/nextjs-oneclick/node_modules/@grpc/grpc-js/build/src/call-stream.js:145:78
    at processTicksAndRejections (node:internal/process/task_queues:78:11) {
  code: 4,
  details: 'context deadline exceeded',
  metadata: Metadata {
    internalRepr: Map(1) { 'content-type' => [Array] },
    options: {}
  },
  page: '/api/getBuyState'
}
```

This happens for a number of reasons: Network hiccups, timeouts that are too short, server overloaded.

This is not your fault and likely indicative of an SDK bug especially while it is in alpha. Please try to produce a minimal repro and we'll be glad to help.
