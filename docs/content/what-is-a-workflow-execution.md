---
id: what-is-a-workflow-execution
title: What is a Workflow Execution?
tags:
  - explanation
---

import RowOfImages from "../components/RowOfImages.js"

A Workflow Execution is a Reentrant Process; that is, a resumable, recoverable, and reactive process:

- Resumable: Ability of a process to continue execution after execution was suspended on an await-able.
- Recoverable: Ability of a process to continue execution after execution was suspended on a failure.
- Reactive: Ability of a process to react to external events.

<RowOfImages
imagePath1="/diagrams/reentrant-process-characteristics.svg"
imageSize1="75"
imageTitle1="Reentrant Process characteristics"
imagePath2="/diagrams/workflow-execution-progressing-and-suspended.svg"
imageTitle2="Open Workflow Executions are suspended or progressing"
imageSize2="100"
/>

Each Workflow Execution has a set of properties that define its behavior.
Many of these properties can be a set in Workflow Execution Options.
