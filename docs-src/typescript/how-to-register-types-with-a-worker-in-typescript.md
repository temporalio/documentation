---
id: how-to-register-types-with-a-worker-in-typescript
title: How to register types with a Worker in TypeScript
sidebar_label: Register Types
description: Register types.
tags:
  - developer-guide
  - typescript
  - workers
---

In development, use [`workflowsPath`](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions/#workflowspath):

<!--SNIPSTART typescript-worker-create -->
[snippets/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/worker.ts)
```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'snippets',
    activities,
  });

  await worker.run();
}
```
<!--SNIPEND-->

In this snippet, the Worker bundles the Workflow code at runtime.

In production, you can improve your Worker's startup time by bundling in advance: as part of your production build, call [`bundleWorkflowCode`](https://legacy-documentation-sdks.temporal.io/typescript/workers#prebuilt-workflow-bundles):

<!--SNIPSTART typescript-bundle-workflow -->
[production/src/scripts/build-workflow-bundle.ts](https://github.com/temporalio/samples-typescript/blob/master/production/src/scripts/build-workflow-bundle.ts)
```ts
import { bundleWorkflowCode } from '@temporalio/worker';
import { writeFile } from 'fs/promises';
import path from 'path';

async function bundle() {
  const { code } = await bundleWorkflowCode({
    workflowsPath: require.resolve('../workflows'),
  });
  const codePath = path.join(__dirname, '../../workflow-bundle.js');

  await writeFile(codePath, code);
  console.log(`Bundle written to ${codePath}`);
}
```
<!--SNIPEND-->

Then the bundle can be passed to the Worker:

<!--SNIPSTART typescript-production-worker-->
[production/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/production/src/worker.ts)
```ts
const workflowOption = () =>
  process.env.NODE_ENV === 'production'
    ? {
        workflowBundle: {
          codePath: require.resolve('../workflow-bundle.js'),
        },
      }
    : { workflowsPath: require.resolve('./workflows') };

async function run() {
  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'production-sample',
  });

  await worker.run();
}
```
<!--SNIPEND-->
