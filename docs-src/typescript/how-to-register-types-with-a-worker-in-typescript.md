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

We recommend resolving on a directory to register each function within the directory.

- Use [`workflowsPath`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#workflowspath) for non-production build images.
- Use [`workflowBundle`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#workflowbundle) for production build images.

<!--SNIPSTART typescript-worker-create -->
<!--SNIPEND-->

For example, in most of our samples:

- We use `ts-node`, which compiles TypeScript on the fly.
- Our Workers bundle Workflow code at runtime.

We can improve our Worker's startup time by building code in advance.

**Worker code**

The Worker code can be built and run with:

```sh
npm run build
node lib/worker.js
```

**Workflow code**

You can programmatically bundle Workflow code on your own with [`bundleWorkflowCode`](/typescript/workers#prebuilt-workflow-bundles):

```ts
const {code} = await bundleWorkflowCode({
  workflowsPath: require.resolve("src/workflows"),
});

await writeFile(path.join(__dirname, "workflow-bundle.js"), code);
```

And then the bundle can be passed to the Worker:

```ts
const worker = await Worker.create({
  workflowBundle: {path: require.resolve("workflow-bundle.js")},
  activities,
  taskQueue,
});
```

You can also bundle code on your own and pass it to the `workflowBundle`.

We can see this process working in the [production sample](https://github.com/temporalio/samples-typescript/tree/main/production):

<!--SNIPSTART typescript-production-worker-->
<!--SNIPEND-->
