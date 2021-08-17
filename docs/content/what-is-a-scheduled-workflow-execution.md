---
id: what-is-a-scheduled-workflow-execution
title: What is a Scheduled Workflow Execution?
description: A Scheduled Workflow Execution is a Workflow Execution that spawns repeatedly, per a specified schedule.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Scheduled Workflow Execution is a Workflow Execution that spawns repeatedly, per a specified schedule.
A Scheduled Workflow Execution is very similar to a cron job.
A Schedule must be provided in the call to spawn a Workflow Execution.
If provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule.

Each execution within the series of scheduled executions is considered a Run.
A Scheduled Workflow Execution (and subsequent runs) will not stop spawning until the original has been terminated or cancelled.

Schedules are set in UTC time, and must follow the cron schedule specification.

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

For example, "15 8 \* \* \*" would cause a Workflow Execution to spawn daily at 8:15am UTC.
Use the [crontab guru site](https://crontab.guru/) to test your cron expressions.

The Temporal Server will only spawn the next execution **after** the current execution has Completed, Failed, or Timed Out.

This means that, if a Retry Policy has also been provided, and a scheduled Workflow Execution Fails or Times Out, the Workflow Execution will first be retried per the Retry Policy and the next execution will not spawn until the Retry Policy has been exhausted.
If the next execution is due to spawn while the current execution is still Open (including retries), then the Server will skip the next scheduled spawn.

Scheduled Workflow Executions must also have an "Allow Duplicate" Workflow ID Reuse Policy.

<RelatedReadList
readliststring="How to schedule a Workflow Execution in Go?/docs/content/how-to-schedule-a-workflow-execution-in-go?dg|
What is a Workflow ID Reuse Policy?/docs/content/what-is-a-workflow-id-reuse-policy?e"
/>
