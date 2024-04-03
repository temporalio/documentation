---
id: how-to-use-a-prebuilt-workflow-bundle-in-typescript
title: How to use a prebuilt Workflow bundle in TypeScript
description: Pass a prebuilt bundle instead of `workflowsPath`. or use the `bundleWorkflowCode` helper.
sidebar_label: Prebuilt workflow bundles
tags:
  - guide-context
---

If you're an advanced user, you can pass a prebuilt bundle instead of `workflowsPath`, or you can use the `bundleWorkflowCode` helper:

```ts
import { bundleWorkflowCode, Worker } from '@temporalio/worker';

// Option 1: passing path to prebuilt bundle
const worker = await Worker.create({
  taskQueue,
  workflowBundle: {
    codePath: './path-to-bundle.js',
  },
});

// Option 2: bundling code using Temporal's bundler settings
const workflowBundle = await bundleWorkflowCode({
  workflowsPath: require.resolve('./path-to-your-workflows'),
});
const worker = await Worker.create({
  taskQueue,
  workflowBundle,
});
```
