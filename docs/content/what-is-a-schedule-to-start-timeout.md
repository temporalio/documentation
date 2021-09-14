---
id: what-is-a-schedule-to-start-timeout
title: What is a Schedule To Start Timeout?
description: A Schedule To Start Timeout is the maximum amount of time that is allowed, from when an Activity Task is scheduled to when a Worker starts executing the Activity Task.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

A Schedule To Start Timeout is the maximum amount of time that is allowed, from when an [Activity Task](/docs/content/what-is-an-activity-task) is scheduled (placed in a Task Queue) to when a [Worker](/docs/content/what-is-a-worker) starts executing that Activity Task.

<CenteredImage
imagePath="/diagrams/schedule-to-start-timeout.svg"
imageSize="100"
title="Schedule To Start period"
/>

There are two primary uses case of this timeout:
1. Detect whether an individual Worker has crashed.
2. Detect whether the fleet of Workers polling the Task Queue is not able to keep up with the rate of Activity Tasks.

If this timeout is used, we recommend setting this timeout to the maximum time a Workflow Execution is willing to wait for an Activity Execution in the presence of all possible Worker outages, and have a concrete plan in place to reroute Activity Tasks to a different Task Queue.
This timeout **does not** trigger any retries regardless of the Retry Policy, as a retry would place the Activity Task back into the same Task Queue.
As a reminder, we do not recommend using this timeout unless you know what you are doing.

In most cases, we recommend monitoring the `temporal_activity_schedule_to_start_latency` metric to know when Workers are not picking up Activity Tasks, instead of setting this timeout.
