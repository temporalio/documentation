---
id: how-to-send-a-signal-from-a-workflow-in-go
title: How to send a Signal from a Workflow in Go
sidebar_label: Send Signal from Workflow
description: A Signal can be sent from within a Workflow to a different Workflow Execution using the `SignalExternalWorkflow` API from the `go.temporal.io/sdk/workflow` package.
tags:
  - go
  - how-to
---

A Signal can be sent from within a Workflow to a different Workflow Execution using the [`SignalExternalWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SignalExternalWorkflow) API from the `go.temporal.io/sdk/workflow` package.

```go
// ...
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  //...
  signal := MySignal {
    Message: "Some important data",
  }
  err :=  workflow.SignalExternalWorkflow(ctx, "some-workflow-id", "", "your-signal-name", signalData).Get(ctx, nil)
  if err != nil {
    // ...
  }
// ...
}
```
