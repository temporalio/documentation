---
id: how-to-set-a-cron-schedule-in-go
title: How to set a cron schedule in Go
description: To set a cron schedule in Go, specify a value for the `CronSchedule` field within the instance of the `WorkflowOptions` that are passed to the `ExecuteWorkflow()` call.
tags:
  - developer-guide
  - go
---

import RelatedReadList from '../components/RelatedReadList.js'

To set a cron schedule in Go, specify a value for the `CronSchedule` field within the instance of the `WorkflowOptions` that are passed to the `ExecuteWorkflow()` call.

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  CronSchedule: "15 8 * * *",
}

we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
```

<RelatedReadList
readlist={[
["What is a Cron Workflow?","/docs/content/what-is-a-cron-workflow","explanation"],
]}
/>
