---
id: how-to-set-a-schedule-in-typescript
title: How to set a Schedule in TypeScript
sidebar_label: Schedule
description: Set a Schedule in TypeScript for scheduling Workflows to be run at specific times in the future.
tags:
  - typescript
  - developer-guide
  - how-to
---

Use the [client.schedule.create()](https://typescript.temporal.io/api/classes/client.ScheduleClient#create) method to schedule a Workflow Execution.

```typescript
async function run() {
  const client = new Client({
    connection: await Connection.connect(),
  });

  // https://typescript.temporal.io/api/classes/client.ScheduleClient#create
  const schedule = await client.schedule.create({
    action: {
      type: 'startWorkflow',
      workflowType: reminder,
      args: ['♻️ Dear future self, please take out the recycling tonight. Sincerely, past you ❤️'],
      taskQueue: 'schedules',
    },
    scheduleId: 'sample-schedule',
    policies: {
      catchupWindow: '1 day',
      overlap: ScheduleOverlapPolicy.ALLOW_ALL,
    },
    spec: {
      intervals: [{ every: '10s' }],
      // or periodic calendar times:
      // calendars: [
      //   {
      //     comment: 'every wednesday at 8:30pm',
      //     dayOfWeek: 'WEDNESDAY',
      //     hour: 20,
      //     minute: 30,
      //   },
      // ],
      // or a single datetime:
      // calendars: [
      //   {
      //     comment: '1/1/23 at 9am',
      //     year: 2023,
      //     month: 1,
      //     dayOfMonth: 1,
      //     hour: 9,
      //   },
      // ],
    },
  });
```
