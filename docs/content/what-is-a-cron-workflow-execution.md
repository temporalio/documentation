---
id: what-is-a-cron-workflow-execution
title: What is a Cron Workflow Execution?
description: A Cron Workflow Execution is a Workflow Execution that spawns repeatedly, per a specified Cron Schedule.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Cron Workflow Execution is a Workflow Execution that spawns repeatedly, per a specified Cron Schedule.
A Cron Workflow Execution is very similar to a cron job.
A Cron Schedule must be provided in the call to spawn a Workflow Execution.
If provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule.

Each execution within the series of scheduled executions is considered a Run.
Currently Cron Workflow Executions utilize the Continue As New feature.
A Cron Workflow Execution (and all subsequent Runs) will not stop spawning until it has been terminated or cancelled.

Schedules are set in UTC time, and must follow the Cron Schedule specification.

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

The Temporal Server will only spawn the next Run **after** the current Run has Completed, Failed, or Timed Out.

This means that, if a Retry Policy has also been provided, and a Run of the Cron Workflow Execution Fails or Times Out, the Run will first be retried per the Retry Policy and the next Run will not spawn until the Retry Policy has been exhausted.
If the next Run is due to spawn while the current Run is still Open (including retries), then the Server will skip the next scheduled Run.

<RelatedReadList
readlist={[
["How to set a Cron Schedule in Go","/docs/content/how-to-set-a-cron-schedule-in-go","developer guide"],
]}
/>
