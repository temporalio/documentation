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

**A Temporal Cron Job is very similar to a cron job**: Just as a Linux based cron job accepts a command and a schedule on which to execute that command, Temporal supports a Cron Schedule with the call to spawn a Workflow Execution.
If a Cron Schedule is provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule. Each Workflow Execution receives the same input parameters as the Initial Run.

**Each Workflow Execution within the series is considered a Run.**:
The Temporal Server spawns the next Run only after the current Run has Completed, Failed, or Timed Out.
This means that, if a Retry Policy has also been provided, and a Run Fails or Times Out, the Run will first be retried per the Retry Policy until the Run Completes or the Retry Policy has been exhausted.
If the next Run, per the Cron Schedule, is due to spawn while the current Run is still Open (including retries), the Server skips the next scheduled Run.
A [Workflow Run Timeout](/docs/content/what-is-a-workflow-run-timeout) is used to limit the maximum amount of time of individual Runs.
Again, if the Workflow Run Timeout is reached and there is an associated Retry Policy, the Workflow is retried before the next Cron Scheduled spawn occurs.

<CenteredImage
imagePath="/diagrams/temporal-cron-job-flow.svg"
imageSize="100"
title="Temporal Cron Job timeline"
/>

**Schedules are in UTC**: Schedules are set in UTC time, and must follow the Cron Schedule specification.
For example, "15 8 \* \* \*" causes a Workflow Execution to spawn daily at 8:15 AM UTC.
Use the [crontab guru site](https://crontab.guru/) to test your cron expressions.

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

**There are two ways to stop a Temporal Cron Job**: A Temporal Cron Job will not stop spawning Runs until it has been Terminated, or the [Workflow Execution Timeout](/docs/content/what-is-a-workflow-execution-timeout) is reached.

<RelatedReadList
readlist={[
["How to set a Cron Schedule in Go","/docs/content/how-to-set-a-cron-schedule-in-go","developer guide"],
]}
/>
