---
id: troubleshooting
title: Troubleshooting Issues with the TypeScript SDK
sidebar_label: Troubleshooting
description: This document is a quick checklist of common user errors for your reference.
---

This document is a quick checklist of common user errors for your reference.

## Wrong Node.js version

If you find segfaults when you execute code in Workers:

```bash
98602 segmentation fault  npm start
```

This comes from running the wrong Node version.
This SDK explicitly only supports Node 14.x, or Node 16.4.1+ (not Node 14.0 to 16.4).

<!-- delete in jan 2022 if not useful anymore -->
<!-- If you switch Node versions and now your Workers don't even run because of errors that look like this:

```bash
Error: The module '/YOUR_PATH/node_modules/isolated-vm/out/isolated_vm.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 93. This version of Node.js requires
NODE_MODULE_VERSION 88. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

That is because you are now running Workers with a different Node version than the modules were built with.
Rebuild them with `npm rebuild`. -->

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

The biggest sign that this is happening is if you notice Temporal is acting non-deterministically: running the same Workflow twice gets different results.

Stale workflows are usually a non-issue because the errors generated are just noise from code you no longer want to run.
If you need to terminate old stale Workflows, you can do so with Temporal Web or `tctl`.

## Workflow/Activity registration errors

**If your Workflows or Activities are not imported or spelled correctly**, here are some errors we've seen:

- `ApplicationFailure: 'MyFunction' is not a function`
- `Workflow did not register a handler for MyQuery`

Double check that your Workers are registering the right Workflow and Activity Definitions (function names) on the right Task Queues.

**If you are running Temporal in a monorepo**, then your `node_modules` may be in a different location than where Temporal expects to find it by default, which results in errors like:

```bash
[ERROR] Module not found: Error: Can't resolve '@temporalio/workflow/lib/worker-interface.js' in '/src'
```

Our [Next.js tutorial](/docs/typescript/nextjs-tutorial) is written for people setting up Temporal **within an existing monorepo** which may be of use here.

When you pass a `workflowsPath`, our Webpack config tries to find `node_modules` relative to it and expects `temporalio` to be installed there.
You can explicitly specify `nodeModulesPaths` if you need to take over, and `find . -name @temporalio -type d` will help identify what path to use (typically it will require going up the right number of directories: `path.join(__dirname, '../../../node_modules')`

**If you are custom bundling your own Workflows** you may get errors like these:

```bash
[ERROR] Failed to activate workflow {
  runId: 'aaf84a83-51ce-462a-9ab7-6a641a703bff',
  error: ReferenceError: exports is not defined,
  workflowExists: false
}
```

Temporal Workflow Bundles need to [export a set of methods that fit the compiled `worker-interface.ts` from `@temporalio/workflow`](https://github.com/temporalio/sdk-typescript/blob/eaa2d205c9bc5ff4a3b17c0b34f2dcf6b1e0264a/packages/worker/src/workflow/bundler.ts#L81) as an entry point.
We do offer a [bundleWorkflowCode](/docs/typescript/workers/#prebuilt-workflow-bundles) method to assist you with this, though it uses our Webpack settings.

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

This is invalid because reading from the filesystem is a non-deterministic operation: the file may change from the time of the original Workflow execution to when the Workflow is replayed.

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

To properly call your Activities from Workflow code use `proxyActivities` and make sure to only import the Activity types.

```ts
import { proxyActivities } from '@temporalio/workflow';

import type * as activities from './activities';
const { makeHTTPRequest } = proxyActivities<typeof activities>();

export async function myWorkflow(): Promise<string> {
  return await makeHTTPRequest('https://temporal.io');
}
```

</details>

## Works in Dev, but not in Prod
  
The two main sources of dev-prod discrepancies are in bundling and connecting.

### Production Bundling

If you are getting errors like this:

```
Error: 3 INVALID_ARGUMENT: WorkflowType is not set on request.
```

This is due to your bundler stripping out Workflow function names, which we rely on to set the "Workflow Type" in Temporal. Turn it off and it should work.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="webpackterser"
values={[
{label: 'Webpack with Terser', value: 'webpackterser'},
{label: 'ESbuild', value: 'esbuild'},
]
}>

<TabItem value="webpackterser">

```js
// webpack.config.js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true, // don't strip funciton names in production
        },
      }),
    ],
  },
};
```

</TabItem>
<TabItem value="esbuild">

```js
require('esbuild').buildSync({
  entryPoints: ['app.js'],
  minify: true,
  keepNames: true,
  outfile: 'out.js',
});
```

See esbuild docs: https://esbuild.github.io/api/#keep-names

</TabItem>
</Tabs>


### Connecting to Temporal Server

If you are trying to connect in production and getting this:

```bash
[TransportError: transport error]
```

It is a sign that something is wrong with your Cert/Key pair.
Log it out and make sure it is an exact match with what is expected (often, the issue can be whitespace when injecting from your production secrets management environment).

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

This is not your fault and likely indicative of an SDK bug. Please try to produce a minimal repro and we'll be glad to help.
