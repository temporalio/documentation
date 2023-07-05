---
id: how-to-customize-activity-type-in-typescript
title: How to customize Activity Type in TypeScript
sidebar_label: Customize Activity Type
description: Customize Activity Type
tags:
  - developer-guide
  - typescript
---

You can customize the name of the Activity when you register it with the Worker.
In the following example, the Activity Name is `activityFoo`.

<!--SNIPSTART typescript-custom-activity-type -->
[snippets/src/worker-activity-type-custom.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/worker-activity-type-custom.ts)
```ts
import { Worker } from '@temporalio/worker';
import { greet } from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'snippets',
    activities: {
      activityFoo: greet,
    },
  });

  await worker.run();
}
```
<!--SNIPEND-->
