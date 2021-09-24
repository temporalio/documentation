---
id: what-is-a-start-to-close-timeout
title: What is a Start-To-Close Timeout?
description: A Start-To-Close Timeout is the maximum time allowed for a single Activity Task Execution.
tags:
  - explanation
  - timeouts
---

import CenteredImage from "../components/CenteredImage.js"

A Start-To-Close Timeout is the maximum time allowed for a single [Activity Task Execution](/docs/content/what-is-an-activity-task-execution).

<CenteredImage
imagePath="/diagrams/start-to-close-timeout.svg"
imageSize="50"
title="Start To Close period"
/>

<CenteredImage
imagePath="/diagrams/start-to-close-timeout-with-retry.svg"
imageSize="100"
title="Start-To-Close period with retries"
/>

An Activity Execution must have either this timeout (Start-To-Close) or the [Schedule-To-Close Timeout](/docs/content/what-is-a-schedule-to-close-timeout) set.
We recommend always setting this timeout, however make sure that it is always set to be longer than the possible maximum time for the Activity Execution to take place.
For long running Activity Executions, we recommend also using [Activity Heartbeats](/docs/content/what-is-an-activity-heartbeat) and [Heartbeat Timeouts](/docs/content/what-is-a-heartbeat-timeout).

The main use case for the Start-To-Close timeout is to detect when a Worker crashes after it has started executing an Activity Task.

If this timeout is reached the following takes place:

- An [ActivityTaskTimedOut](/docs/reference/events/#activitytasktimedout) event is written to the Workflow Execution's mutable state.
- If there is a Retry Policy that dictates a retry, then the Temporal Server schedules another Activity Task.
  - The attempt count increments by 1 in the Workflow Execution's mutable state.
  - The Start-To-Close Timeout timer is reset.
