---
id: what-is-a-workflow-task-timeout
title: What is a Workflow Task Timeout?
description: A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a Workflow Task after the Task has been pulled from the Task Queue.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

A Workflow Task Timeout is the maximum amount of time allowed, from the time a [Workflow Task](#workflow-task) is scheduled (placed in the Task Queue) to when a Worker to starts executing that Workflow Task.

<CenteredImage
imagePath="/diagrams/workflow-task-timeout.svg"
imageSize="100"
title="Workflow Task Timeout period"
/>

**The default value is 10 seconds.**
This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value would be to accommodate a Workflow Execution that has a very long Workflow Execution History that could take longer than 10 seconds for the Worker to load.

<!-- TODO
<RelatedReadList
readlist={[
["How to set a Workflow Task Timeout in Go", "#", "developer guide"],
]}
/> -->
