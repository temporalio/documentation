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

A Temporal Cron Job is similar to a classic unix cron job.
Just as a unix cron job accepts a command and a schedule on which to execute that command, a Cron Schedule can be provided with the call to spawn a Workflow Execution.
If a Cron Schedule is provided, the Temporal Server will spawn an execution for the associated Workflow Type per the schedule.

Each Workflow Execution within the series is considered a Run.

- Each Run receives the same input parameters as the initial Run.
- Each Run inherits the same Workflow Options as the initial Run.

The Temporal Server spawns the first Workflow Execution in the chain of Runs immediately.
However, it calculates and applies a backoff so that the first Workflow Task of the Workflow Execution does not get placed into a Task Queue until the scheduled time.
After each Run Completes, Fails, or Times Out, the same thing happens: the next run will be created immediately, but with a backoff.

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

Cron Schedules are interpreted in UTC time by default.

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

You can also pass any of the [predefined schedules](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-Predefined_schedules) or [intervals](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-Intervals) described in the [`robfig/cron` documentation](https://pkg.go.dev/github.com/robfig/cron/v3).

For example, "@weekly" causes a Workflow Execution to spawn once a week at midnight between Saturday and Sunday.

**Time zones** (in Temporal 1.15)

You can change the time zone that a Cron Schedule is interpreted in by prefixing the specification with `CRON_TZ=America/New_York ` (or your desired time zone).

:::warning

Using time zones in production introduces a surprising amount of complexity and failure modes! If at all possible, we recommend specifying Cron Schedules in UTC (the default). If you need to use time zones, here are a few edge cases to keep in mind:

- If a cron job is scheduled around the time when daylight saving time begins or ends, e.g. `30 2 * * *`, it may run zero, one, or two times in a day! The Cron library that we use does not do any special handling of DST transitions. Avoid schedules that include times in DST transitions.
- If you deploy the Temporal Server yourself, you are responsible for ensuring that it has access to current tzdata files. The official Docker images are built with tzdata installed (provided by Alpine Linux), but ultimately you should be aware of how tzdata is deployed and updated in your infrastucture.
- If you use the official Docker images, note that an upgrade of the Temporal Server may include an update to the tzdata files, which may change the meaning of your Cron Schedule. You should be aware of upcoming changes to the defintions of the time zones you use, particularly around daylight saving time start/end dates.
- The absolute start time of the next Run is computed and stored in the database when the previous Run completes, and is not recomputed. This means that if you have a Cron Schedule that runs very infrequently, and the definition of the time zone changes in between one Run and the next, the Run might happen at the wrong time. For example, `CRON_TZ=America/Los_Angeles 0 12 11 11 *` means "noon in Los Angeles on November 11" (normally not in DST). If one year the government of California decides to move the end of DST one week later, or stay on permanent DST year-round, the meaning of that specification will change, but that first year, the Run will happen at the wrong time, because it was computed using the older definition.

:::

### Stop Cron Job

A Temporal Cron Job does not stop spawning Runs until it has been Terminated or until the [Workflow Execution Timeout](/docs/content/what-is-a-workflow-execution-timeout) is reached.

A Cancellation Request affects only the current Run.

Use the Workflow Id in any requests to Cancel or Terminate.

<RelatedReadList
readlist={[
["How to set a Cron Schedule in Go","/docs/go/how-to-set-startworkflowoptions-in-go/#cronschedule","developer guide"],
["How to set a Cron Schedule in Java", "/docs/java/distributed-cron", "developer guide"],
["How to set a Cron Schedule in PHP", "/docs/php/distributed-cron", "developer guide"],
["How to set a Cron Schedule in Typescript", "/docs/typescript/clients", "developer guide"],
]}
/>
