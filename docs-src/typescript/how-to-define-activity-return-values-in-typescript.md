---
id: how-to-define-activity-return-values-in-typescript
title: How to define Activity Return Values in TypeScript
sidebar_label: Define Activity Return Values
description: Define Activity Return Values
tags:
  - developer-guide
  - sdk
  - typescript
---

In TypeScript, the return value is always a Promise.

In the following example, `Promise<string>` is the return value.

```typescript
export async function greet(name: string): Promise<string> {
  return `👋 Hello, ${name}!`;
}
```
