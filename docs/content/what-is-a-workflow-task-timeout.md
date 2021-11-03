---
id: what-is-a-workflow-task-timeout
title: What is a Workflow Task Timeout?
description: A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a Workflow Task after the Task has been pulled from the Task Queue.
tags:
  - explanation
  - timeouts
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Task Timeout is the maximum amount of time allowed for a [Worker](/docs/content/what-is-a-worker) to execute a [Workflow Task](/docs/content/what-is-a-workflow-task) after the Worker has pulled that Workflow Task from the [Task Queue](/docs/content/what-is-a-task-queue).

<CenteredImage
imagePath="/diagrams/workflow-task-timeout.svg"
imageSize="100"
title="Workflow Task Timeout period"
/>

**The default value is 10 seconds.**
This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value would be to accommodate a Workflow Execution that has a very long Workflow Execution History that could take longer than 10 seconds for the Worker to load.

<RelatedReadList
readlist={[
["How to set a Workflow Task Timeout in Go", "/docs/go/how-to-set-startworkflowoptions-in-go/#workflowtasktimeout", "developer guide"],
]}
/>
