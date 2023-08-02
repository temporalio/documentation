---
id: how-to-set-a-cron-schedule-in-go
title: How to set a Cron Schedule in Go
sidebar_label: Cron Schedule
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `CronSchedule` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `CronSchedule` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `string`
- Default: None

```go
workflowOptions := client.StartWorkflowOptions{
  CronSchedule: "15 8 * * *",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
