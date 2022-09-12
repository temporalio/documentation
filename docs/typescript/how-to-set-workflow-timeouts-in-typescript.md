---
id: how-to-set-workflow-timeouts-in-typescript
title: How to set Workflow Timeouts in TypeScript
sidebar_label: Set Workflow Timeouts
description: Set Workflow Timeouts
tags:
  - developer-guide
  - sdk
  - typescript
---

Create an instance of `WorkflowOptions` from the Client and set your Workflow Timeout.

Available timeouts are:

- [`scheduletoclosetimeout`](https://typescript.temporal.io/api/interfaces/common.activityoptions/#scheduletoclosetimeout)
- [`startToCloseTimeout`](https://typescript.temporal.io/api/interfaces/common.activityoptions/#starttoclosetimeout)
- [`scheduletoStartTimeout`](https://typescript.temporal.io/api/interfaces/common.activityoptions/#scheduletostarttimeout)

```typescript
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  // translates to 300000 ms
  scheduleToCloseTimeout: '5m',
  // translates to 30000 ms
  // startToCloseTimeout: '30s'
  // translates to 30000 ms
  // startToCloseTimeout: '30s'
});
```
