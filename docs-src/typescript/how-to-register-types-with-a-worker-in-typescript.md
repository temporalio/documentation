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

We recommend, resolving on a directory to automatically register each function within the directory.

- Use [`workflowsPath`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#workflowspath) for non-production build images.
- Use [`workflowBundle`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#workflowbundle) for production build images.

<!--SNIPSTART typescript-worker-create -->
<!--SNIPEND-->
