---
id: how-to-customize-workflow-type-in-go
title: How to customize Workflow Type in Go
sidebar_label: Customize Workflow Type
description: To customize the Workflow Type set the `Name` parameter with `RegisterOptions` when registering your Workflow with a Worker.
tags:
  - developer-guide
  - go
---

To customize the Workflow Type, set the `Name` parameter with `RegisterOptions` when registering your Workflow with a Worker.

- Type: `string`
- Default: function name

```go
// ...
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := workflow.RegisterOptions{
  Name: "CoolWorkflowTypeName",
  // ...
}
w.RegisterWorkflowWithOptions(YourWorkflowDefinition, registerOptions)
// ...
```
