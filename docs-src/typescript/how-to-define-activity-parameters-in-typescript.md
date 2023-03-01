---
id: how-to-define-activity-parameters-in-typescript
title: How to define Activity Parameters in TypeScript
sidebar_label: Activity Parameters
description: Activity Parameters.
tags:
  - developer-guide
  - go
---

This Activity takes a single `name` parameter of type `string`.

<!--SNIPSTART typescript-activity-fn -->
[snippets/src/activities.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/activities.ts)
```ts
export async function greet(name: string): Promise<string> {
  return `👋 Hello, ${name}!`;
}
```
<!--SNIPEND-->
