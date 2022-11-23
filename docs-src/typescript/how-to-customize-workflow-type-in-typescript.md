---
id: how-to-customize-workflow-type-in-typescript
title: How to customize Workflow Type in TypeScript
sidebar_label: Customize Workflow Type
description: Customize Workflow Type
tags:
  - developer-guide
  - typescript
---

In TypeScript, the Workflow Type is the Workflow function name and there isn't a mechanism to customize the Workflow Type.

In the following example, the Workflow Type is the name of the function, `helloWorld`.

<!--SNIPSTART typescript-workflow-type -->

[snippets/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/workflows.ts)

```ts
export async function helloWorld(): Promise<string> {
  return '👋 Hello World!';
}
```

<!--SNIPEND-->
