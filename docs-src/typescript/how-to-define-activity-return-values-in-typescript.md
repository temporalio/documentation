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

<<<<<<< HEAD

```typescript
import type * as activities from './activities';
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});
=======
In the following example, `Promise<string>` is the return value.
>>>>>>> master

<!--SNIPSTART typescript-activity-fn -->
<!--SNIPEND-->
```
