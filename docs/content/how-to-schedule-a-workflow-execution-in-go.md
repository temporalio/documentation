---
id: how-to-schedule-a-workflow-execution-in-go
title: How to schedule a Workflow Execution in Go
description: To schedule a Workflow Execution, specify a value for the `CronSchedule` field within the instance of the `WorkflowOptions` that are passed to the `ExecuteWorkflow()` call.
tags:
  - developer-guide
  - go
---

import RelatedReadList from '../components/RelatedReadList.js'

To schedule a repeating Workflow Execution (similar to a cron job), specify a value for the `CronSchedule` field within the instance of the `WorkflowOptions` that are passed to the `ExecuteWorkflow()` call.

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  CronSchedule: "15 8 * * *",
}

we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
```

<RelatedReadList
readliststring="What is a Scheduled Workflow Execution?/docs/content/what-is-a-scheduled-workflow-execution?e"
/>
