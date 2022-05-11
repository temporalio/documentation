---
id: how-to-develop-an-activity-definition-in-typescript
title: How to develop an Activity Definition in Typescript
sidebar_label: Develop an Activity Definition
description: Develop an Activity Definition
tags:
  - developer-guide
  - sdk
  - typescript
---

- Activities execute in the standard Node.js environment.
- Activities cannot be in the same file as Workflows and must be separately registered.
- Activities may be retried repeatedly, so you may need to use idempotency keys for critical side effects.

Activities are _just functions_. The following is an Activity that accepts a string parameter and returns a string.

```typescript
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```
