---
id: what-is-a-parent-close-policy
title: What is a Parent Close Policy?
description: If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution if its Parent Workflow Execution changes to a Closed status (Completed, Failed, Timed out).
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Parent Close Policy determines what happens to a Child Workflow Execution if its Parent changes to a Closed status (Completed, Failed, or Timed out).
There are three possible values:

- **Abandon**: the Child Workflow Execution is not affected.
- **Terminate** (default): the Child Workflow Execution is forcefully Terminated.
- **Request Cancel**: a Cancellation request is sent to the Child Workflow Execution.

Each Child Workflow Execution may have its own Parent Close Policy. This policy only applies to Child Workflow Executions and has no effect otherwise.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution", "/docs/content/what-is-a-child-workflow-execution", "explanation"],  
]}
/>
