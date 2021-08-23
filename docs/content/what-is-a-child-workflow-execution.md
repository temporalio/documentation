---
id: what-is-a-child-workflow-execution
title: What is a Child Workflow Execution?
description: A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

Any Workflow Execution that is spawned from within another Workflow is a Child Workflow Execution.

- A Workflow Execution can be both a Parent and a Child Workflow Execution.
- A single Parent can spawn as many Child Workflow Executions as needed.
- A Parent Workflow Execution can wait on a Child Workflow Execution to spawn, wait on the result of a Child Workflow Execution, and propagate Cancellation Requests and Terminations to Child Workflow Executions.

<RelatedReadList
readlist={[
["What is a Parent Close Policy?","/docs/content/what-is-a-parent-close-policy","explanation"],
]}
/>

- A Parent Workflow Execution Event History contains Events that correspond to the status of the Child Workflow Execution.

<CenteredImage
imagePath="/diagrams/parent-child-workflow-execution.svg"
imageSize="75"
title="Parent & Child Workflow Execution relationship"
legend={[
["π","Workflow Execution"],
["p","Parent"],
["c","Child"],
]}
/>

**Use cases**

- An individual Workflow Execution has an Event History size limit.
Child Workflow Executions maintain their own Event History and are thus often used to partition large workloads into smaller chunks.
For example, a single Workflow Execution does not have enough space in its Event History to spawn 100,000 Activity Executions. But a Parent Workflow Execution can spawn 1000 Child Workflow Executions that each spawn 1000 Activity Executions to achieve a total of 1,000,000 Activity Executions.
<!-- <RelatedReadList
readlist={[
["What is a Workflow Execution Event History?","#","explanation"],
]}
/> -->
- Since a Child Workflow Execution can be processed by a completely separate set of Workers than the Parent Workflow Execution, it can act as a separate service entirely.

<RelatedReadList
readlist={[
["What is a Worker?","/docs/content/what-is-a-worker","explanation"],
]}
/>

- As all Workflow Executions, a Child Workflow Execution can create a 1:1 mapping with a resource.
For example, if there is a Parent Workflow that manages host upgrades, it could spawn a Child Workflow Execution per host.

**Things to remember**

- A Parent Workflow Execution and a Child Workflow Execution do not share any local state.
Workflow Executions can only communicate via asynchronous Signals.
- Child Workflow Executions overall incur more records in Event Histories than Activities.
Since each entry in an Event History is a "cost" in terms of compute resources, this could become a factor in very large workloads.
- In general it is recommended to to start with a single Workflow implementation that uses Activities until there is a clear need for Child Workflow Executions.

<!-- TODO convert Java & PHP docs to "how to spawn Child Workflow Executions in *" content and add links here-->
<RelatedReadList
readlist={[
["How to spawn a Child Workflow Execution in Go?","/docs/content/how-to-spawn-a-child-workflow-execution-in-go","developer guide"],
]}
/>
