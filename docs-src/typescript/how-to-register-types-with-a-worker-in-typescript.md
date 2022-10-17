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
<!--SNIPEND-->

In this snippet, the Worker bundles the Workflow code at runtime.

In production, you can improve your Worker's startup time by bundling in advance: as part of your production build, call [`bundleWorkflowCode`](/typescript/workers#prebuilt-workflow-bundles):

<!--SNIPSTART typescript-bundle-workflow -->
<!--SNIPEND-->

Then the bundle can be passed to the Worker:

<!--SNIPSTART typescript-production-worker-->
<!--SNIPEND-->
