---
id: how-to-schedule-a-workflow-execution-in-go
title: How to schedule a Workflow Execution in Go
description: To schedule a Workflow Execution, specify a value for the `CronSchedule` field within the instance of the `WorkflowOptions` that are passed to the `ExecuteWorkflow()` call.
tags:
  - developer-guide
  - go
---

To schedule a Workflow Execution, specify a value for the `CronSchedule` field within the instance of the `WorkflowOptions` that are passed to the `ExecuteWorkflow()` call.

You can also start a Workflow Execution on a regular schedule with the `CronSchedule` option.

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  CronSchedule: "* * * * *",
}

we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
```
