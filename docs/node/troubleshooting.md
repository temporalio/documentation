---
id: troubleshooting
title: Troubleshooting Errors
sidebar_label: Troubleshooting
---

## Webpack Errors

The Node.js SDK's [Worker](/docs/node/workers) bundles Workflows based on `workflowsPath` and their dependencies from `nodeModulesPaths` with [Webpack](https://webpack.js.org/) and run them inside v8 isolates.

If Webpack fails to create the bundle, the SDK will throw an error and emit webpack logs using the SDK's [logger](/docs/node/logging#logs-generated-by-sdk-components).

If you do not see Webpack output in your terminal make sure that you have not disabled SDK logging (see reference to `Core.install()` in the link above).

A common mistake for newcomers to the Node.js SDK is to try and use Node.js built-ins and modules in their Workflow code.

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
