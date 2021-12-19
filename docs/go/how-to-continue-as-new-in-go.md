---
id: how-to-continue-as-new-in-go
title: How to Continue-As-New-in-Go
sidebar_label: Continue-As-New
description: TODO
tags:
  - go
  - developer-guide
---

To trigger this behavior, the Workflow function should
terminate by returning the special **ContinueAsNewError** error:

```go
func SimpleWorkflow(ctx workflow.Context, value string) error {
    ...
    return workflow.NewContinueAsNewError(ctx, SimpleWorkflow, value)
}
```

If you need to know whether a Workflow was started via `continueAsNew`, you can check if `workflow.GetInfo(ctx).ContinuedExecutionRunID` is not nil.
