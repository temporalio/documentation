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

<CenteredImage
imagePath="/diagrams/reentrant-process-characteristics.svg"
imageSize="50"
title="Reentrant Process characteristics"
/>

<CenteredImage
imagePath="/diagrams/workflow-execution-progressing-and-suspended.svg"
imageSize="75"
title="Open Workflow Executions are either progressing or suspended"
/>

- A Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and can communicate with other Workflow Executions using Signals.
- With a Workflow Id, a 1:1 mapping can exist between a Workflow Execution and some other resource.

<RelatedReadList
readlist={[
["How to spawn a Workflow Execution in Go", "/docs/content/how-to-spawn-a-workflow-execution-in-go", "developer guide"],  
]}
/>
