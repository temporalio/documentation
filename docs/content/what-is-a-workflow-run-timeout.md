---
id: what-is-a-workflow-run-timeout
title: What is a Workflow Run Timeout?
description: This is the maximum amount of time that a single Workflow Run is restricted to.
tags:
  - explanation
  - timeouts
---

import CenteredImage from "../components/CenteredImage.js"

A Workflow Run Timeout is the maximum amount of time that a single Workflow Run is restricted to.

<CenteredImage
imagePath="/diagrams/workflow-run-timeout.svg"
imageSize="100"
title="Workflow Run Timeout period"
/>

**The default is set to the same value as the [Workflow Execution Timeout](/docs/content/what-is-a-workflow-execution-timeout).**
This timeout is most commonly used to limit the execution time of a single [Temporal Cron Job Execution](/docs/content/what-is-a-temporal-cron-job).

If the Workflow Run Timeout is reached, the Temporal Server automatically Terminates the Workflow Execution.
