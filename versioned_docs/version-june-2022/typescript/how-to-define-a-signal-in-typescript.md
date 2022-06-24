---
id: how-to-define-a-signal-in-typescript
title: How to define a Signal in TypeScript
sidebar_label: Define Signal
description: Define Signal
tags:
  - developer-guide
  - sdk
  - typescript
---

[`defineSignal`](https://typescript.temporal.io/api/namespaces/workflow/#definesignal)

```ts
import {defineSignal} from "@temporalio/workflow";

interface JoinInput {
  userId: string;
  groupId: string;
}

const joinSignal = defineSignal<JoinInput>("join");
```
