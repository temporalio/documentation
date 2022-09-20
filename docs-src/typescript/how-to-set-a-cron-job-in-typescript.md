---
id: how-to-set-a-cron-job-in-typescript
title: How to set a cron job in TypeScript
sidebar_label: Set a cron job
description: Set a cron job
tags:
  - developer-guide
  - sdk
  - typescript
---

You can set each Workflow to repeat on a schedule with the `cronSchedule` option:

```typescript
const handle = await client.start(scheduledWorkflow, {
  // ...
  cronSchedule: "* * * * *", // start every minute
});
```
