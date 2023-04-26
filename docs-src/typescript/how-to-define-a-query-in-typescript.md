---
id: how-to-define-a-query-in-typescript
title: How to define a Query in TypeScript
sidebar_label: Define Query
description: Use `defineQuery` to define a Query method for a Workflow.
tags:
  - developer-guide
  - sdk
  - typescript
---

Use [`defineQuery`](https://typescript.temporal.io/api/namespaces/workflow/#definequery) to define the name, parameters, and return value of a Query.

<!--SNIPSTART typescript-define-query -->
[state/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/state/src/workflows.ts)
```ts
import { defineQuery } from '@temporalio/workflow';

export const getValueQuery = defineQuery<number | undefined, [string]>('getValue');
```
<!--SNIPEND-->
