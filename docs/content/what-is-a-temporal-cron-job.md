---
id: what-is-a-temporal-cron-job
title: What is a Temporal Cron Job?
description: A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

<CenteredImage
imagePath="/diagrams/temporal-cron-job.svg"
imageSize="100"
title="Temporal Cron Job timeline"
/>

A Temporal Cron Job is very similar to a cron job.
Just as a Linux-based cron job accepts a command and a schedule on which to execute that command, a Cron Schedule can be provided with the call to spawn a Workflow Execution.
If a Cron Schedule is provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule.

Each Workflow Execution within the series is considered a Run.

- Each Run receives the same input parameters as the initial Run.
- Each Run inherits the same Workflow Options as the initial Run.

The Temporal Server spawns the first Workflow Execution in the chain of Runs immediately.
However, it calculates and applies a backoff so that the first Workflow Task of the Workflow Execution does not get placed into a Task Queue until it is time.

The Temporal Server spawns the next Run only after the current Run has Completed, Failed, or Timed Out.
This means that, if a Retry Policy has also been provided, and a Run Fails or Times Out, the Run will first be retried per the Retry Policy until the Run Completes or the Retry Policy has been exhausted.
If the next Run, per the Cron Schedule, is due to spawn while the current Run is still Open (including retries), the Server skips the next scheduled Run.
A [Workflow Run Timeout](/docs/content/what-is-a-workflow-run-timeout) is used to limit the maximum amount of time of individual Runs.
Again, if the Workflow Run Timeout is reached and there is an associated Retry Policy, the Workflow is retried before the next Cron Scheduled spawn occurs.

<CenteredImage
imagePath="/diagrams/temporal-cron-job-failure-with-retry.svg"
imageSize="100"
title="Temporal Cron Job Run Failure with a Retry Policy"
/>

### Cron Schedules

Cron Schedules are applied in UTC time.

The Cron Schedule is provided as a string and must follow one of two specifications:

**Classic specification**

This is what the "classic" specification looks like:

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

For example, "15 8 \* \* \*" causes a Workflow Execution to spawn daily at 8:15 AM UTC.
Use the [crontab guru site](https://crontab.guru/) to test your cron expressions.

**`robfig` predefined schedules**

You can also pass any of the [predefined schedules](https://pkg.go.dev/github.com/robfig/cron#hdr-Predefined_schedules) or [intervals](https://pkg.go.dev/github.com/robfig/cron#hdr-Intervals) described in the [`robfig/cron` documentation](https://pkg.go.dev/github.com/robfig/cron).

For example, "@weekly" causes a Workflow Execution to spawn once a week at midnight between Saturday and Sunday.

### Stop Cron Job

A Temporal Cron Job does not stop spawning Runs until it has been Terminated or until the [Workflow Execution Timeout](/docs/content/what-is-a-workflow-execution-timeout) is reached.

A Cancellation Request affects only the current Run.

Use the Workflow Id in any requests to Cancel or Terminate.

<RelatedReadList
readlist={[
["How to set a Cron Schedule in Go","/docs/content/how-to-set-startworkflowoptions-in-go/#cronschedule","developer guide"],
]}
/>
