---
id: what-is-a-schedule-to-close-timeout
title: What is a Schedule-To-Close Timeout?
description: todo
---

import CenteredImage from "../components/CenteredImage.js"

A Schedule-To-Close Timeout is the maximum amount of time allowed for the overall [Activity Execution](/docs/content/what-is-an-activity-execution), from when the first [Activity Task](/docs/content/what-is-an-activity-task) is scheduled to when the last Activity Task, in the chain of Activity Tasks that make up the Activity Execution, reaches a closed status.

<CenteredImage
imagePath="/diagrams/schedule-to-close-timeout.svg"
imageSize="100"
title="Schedule-To-Close period"
/>

<CenteredImage
imagePath="/diagrams/schedule-to-close-timeout-with-retry.svg"
imageSize="100"
title="Schedule-To-Close period with a retry"
/>

An Activity Execution must have either this timeout (Schedule-To-Close) or [Start-To-Close](/docs/what-is-a-start-to-close-timeout) set.
By default an Activity Execution Retry Policy dictates that retries will occur for up to 10 years.
This timeout can be used to reduce the overall time that has elapsed, without altering the default Retry Policy.
