---
id: what-is-a-workflow-execution
title: What is a Workflow Execution?
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Execution is a Reentrant Process; that is, a resumable, recoverable, and reactive process:

- Resumable: Ability of a process to continue execution after execution was suspended on an await-able.
- Recoverable: Ability of a process to continue execution after execution was suspended on a failure.
- Reactive: Ability of a process to react to external events.

A Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and can communicate with other Workflow Executions using Signals.

A Workflow Execution is either Running or Closed.
When a Workflow Execution is Running, it is either actively progressing or suspended, awaiting on something.

A Closed status means that the Workflow Execution has finished progressing, and has either Completed successfully, Continued As New, Failed, Timed Out, been Cancelled, or Terminated.

<CenteredImage
imagePath="/diagrams/workflow-execution-status.svg"
imageSize="75"
title="Workflow Execution Status"
/>

A Workflow Execution is uniquely identified by its [Namespace](/docs/server/namespaces), [Workflow Id](/docs/content/what-is-a-workflow-id), and [Run Id](/docs/content/what-is-a-run-id).

The Workflow Id can be used to create a 1:1 mapping between a Workflow Execution and some other resource, such as a customer Id, order Id, or host Id.

<RelatedReadList
readlist={[
["How to spawn a Workflow Execution in Go", "/docs/content/how-to-spawn-a-workflow-execution-in-go", "developer guide"],  
]}
/>
