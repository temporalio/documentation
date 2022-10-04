---
id: how-to-continue-as-new-in-go
title: How to Continue-As-New-in-Go
sidebar_label: Continue-As-New
description: To cause a Workflow Execution to Continue-As-New, the Workflow function should return the result of the `NewContinueAsNewError()` API available from the `go.temporal.io/sdk/workflow` package.
tags:
  - go
  - developer-guide
---

To cause a Workflow Execution to [Continue-As-New](/concepts/what-is-continue-as-new), the Workflow function should return the result of the [`NewContinueAsNewError()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#NewContinueAsNewError) API available from the `go.temporal.io/sdk/workflow` package.

```go
func SimpleWorkflow(ctx workflow.Context, value string) error {
    ...
    return workflow.NewContinueAsNewError(ctx, SimpleWorkflow, value)
}
```

To check whether a Workflow Execution was spawned as a result of Continue-As-New, you can check if `workflow.GetInfo(ctx).ContinuedExecutionRunID` is not empty (i.e. `""`).

**Notes**

- To prevent Signal loss, be sure to perform an asynchronous drain on the Signal channel.
  Failure to do so can result in buffered Signals being ignored and lost.
- Make sure that the previous Workflow and the Continue-As-New Workflow are referenced by the same alias.
  Failure to do so can cause the Workflow to Continue-As-New on an entirely different Workflow.
