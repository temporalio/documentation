---
id: what-is-a-workflow-run-timeout
title: What is a Workflow Run Timeout?
description: This is the maximum amount of time that a single Workflow Run is restricted to.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

This is the maximum amount of time that a single Workflow Run is restricted to.

- **The default is set to the same value as the [Workflow Execution Timeout](/docs/content/what-is-a-workflow-execution-timeout).**
- This timeout is most commonly used to limit the execution time of a single [Temporal Cron Job Execution](/docs/content/what-is-a-temporal-cron-job).

<RelatedReadList
readlist={[
["How to set a Workflow Run Timeout in Go", "#", "developer guide"],
]}
/>
