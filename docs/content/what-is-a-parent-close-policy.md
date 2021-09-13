---
id: what-is-a-parent-close-policy
title: What is a Parent Close Policy?
description: If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution if its Parent Workflow Execution changes to a Closed status (Completed, Failed, Timed out).
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution if its Parent Workflow Execution changes to a Closed status (Completed, Failed, Timed out).

A Parent Close Policy has three possible values:

- **Abandon**: When the Parent Closes, the Child Workflow Execution is not affected.
- **Terminate**: **This is the default**.
  When the Parent Closes, the Child Workflow Execution is Terminated.
- **Request Cancel**: When the Parent Closes, a Cancellation request is sent to the Child Workflow Execution.

Consideration the following when implementing:

- If the Workflow Execution is not a Child Workflow Execution, a Parent Close Policy has no effect on the execution.
- A Parent Close Policy must be provided when the Child Workflow Execution is spawned.
- Each Child Workflow Execution may have its own Parent Close Policy.
- **The default Parent Close Policy is Terminate** if one is not set and the Workflow Execution is a Child Workflow Execution.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution", "/docs/content/what-is-a-child-workflow-execution", "explanation"],
["How to spawn a Child Workflow Execution in Go", "/docs/content/how-to-spawn-a-child-workflow-execution-in-go", "developer guide"],  
]}
/>
