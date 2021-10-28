---
id: what-is-a-workflow-execution-timeout
title: What is a Workflow Execution Timeout?
description: A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.
tags:
  - explanation
  - timeouts
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

<CenteredImage
imagePath="/diagrams/workflow-execution-timeout.svg"
imageSize="100"
title="Workflow Execution Timeout period"
/>

**The default value is ∞ (infinite).**
If this timeout is reached, the Workflow Execution changes to a Timed Out status.
This timeout is different from the [Workflow Run Timeout](/docs/content/what-is-a-workflow-run-timeout).
This timeout is most commonly used for stopping the execution of a [Temporal Cron Job](/docs/content/what-is-a-temporal-cron-job) after a certain amount of time has passed.

<RelatedReadList
readlist={[
["How to set a Workflow Execution Timeout in Go", "/docs/go/how-to-set-startworkflowoptions-in-go/#workflowexecutiontimeout", "developer guide"],
]}
/>
