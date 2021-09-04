---
id: what-is-a-child-workflow-execution
title: What is a Child Workflow Execution?
description: A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.

A Workflow Execution can be both a Parent and a Child Workflow Execution because any Workflow can spawn another Workflow.

<CenteredImage
imagePath="/diagrams/parent-child-workflow-execution-relationship.svg"
imageSize="100"
title="Parent & Child Workflow Execution entity relationship"
/>

A Parent Workflow Execution must await on the Child Workflow Execution to spawn.
The Parent can optionally await on the result of the Child Workflow Execution.
Consider the Child's [Parent Close Policy](/docs/content/what-is-a-parent-close-policy) if the Parent does not await on the result of the Child, which includes any use of Continue As New by the Parent.

When a Parent Workflow Execution reaches a Closed status, the Server will propagate Cancellation Requests or Terminations to Child Workflow Executions depending on the Child's [Parent Close Policy](/docs/content/what-is-a-parent-close-policy).

<CenteredImage
imagePath="/diagrams/parent-close-policy.svg"
imageSize="75"
title="Parent Close Policy entity relationship"
/>

If a Child Workflow Execution uses Continue As New, from the Parent Workflow Execution's perspective the entire chain of Runs is treated as a single execution.

<CenteredImage
imagePath="/diagrams/parent-child-workflow-execution-with-continue-as-new.svg"
imageSize="100"
title="Parent & Child Workflow Execution entity relationship with Continue As New"
legend={[
["*","Last Workflow Execution in the chain"]  
]}
/>

### When to use Child Workflows

**Consider Workflow Execution Event History size limits.**

An individual Workflow Execution has an Event History size limit, which imposes a couple of considerations for using Child Workflows.
On one hand, because a Child Workflow Executions have their own Event Histories, they are often used to partition large workloads into smaller chunks.
For example, a single Workflow Execution does not have enough space in its Event History to spawn 100,000 Activity Executions. But a Parent Workflow Execution can spawn 1000 Child Workflow Executions that each spawn 1000 Activity Executions to achieve a total of 1,000,000 Activity Executions.
On the other hand, since a Parent Workflow Execution Event History contains Events that correspond to the status of the Child Workflow Execution, a single Parent should not spawn more than 1000 Child Workflow Executions.
In general, however, Child Workflow Executions result in more overall Events recorded in Event Histories than Activities.
Because each entry in an Event History is a "cost" in terms of compute resources, this could become a factor in very large workloads.
Therefore, we recommend starting with a single Workflow implementation that use Activities until there is a clear need for Child Workflows.

**Consider Child Workflow Executions as a separate service.**

Because a Child Workflow Execution can be processed by a completely separate set of Workers than the Parent Workflow Execution, it can act as an entirely separate service.
However, this also means that a Parent Workflow Execution and a Child Workflow Execution do not share any local state.
As all Workflow Executions, they can communicate only via asynchronous Signals.

**Consider that a single Child Workflow Execution can represent a single resource.**

As all Workflow Executions, a Child Workflow Execution can create a 1:1 mapping with a resource.
For example, a Workflow that manages host upgrades could spawn a Child Workflow Execution per host.

<!-- TODO convert Java & PHP docs to "how to spawn Child Workflow Executions in *" content and add links here-->

<RelatedReadList
readlist={[
["How to spawn a Child Workflow Execution in Go","/docs/content/how-to-spawn-a-child-workflow-execution-in-go","developer guide"],
]}
/>
