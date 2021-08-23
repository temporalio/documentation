---
id: what-is-a-workflow-execution-timeout
title: What is a Workflow Execution Timeout?
description: A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

**The default value is 10 years**

If this timeout is reached then the Workflow Execution will change to a Timed Out status.

This timeout is different from the [Workflow Run timeout](/docs/content/what-is-a-workflow-run-timeout).

This timeout is most commonly used for stopping the execution of a Scheduled Workflow Execution after a certain amount of time has passed.

<RelatedReadList
readlist={[
["How to set a Workflow Execution Timeout in Go", "#", "developer guide"],
]}
/>
