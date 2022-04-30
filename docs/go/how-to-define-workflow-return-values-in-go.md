---
id: how-to-define-workflow-return-values-in-go
title: How to define Workflow return values in Go
sidebar_label: Workflow return values
description: A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
tags:
  - go
  - how-to
---

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.

```go
type YourWorkflowResponse struct{
  WorkflowResultFieldOne string
  WorkflowResultFieldTwo int
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  if err != nil {
    return "", err
  }
  responseVar := YourWorkflowResponse {
    FieldOne: "super",
    FieldTwo: 1,
  }
  return responseVar, nil
}
```

A Workflow Definition written in Go can return both a custom value and an error.
However, it is not possible to receive both a custom value and an error in the calling process as is normal in Go.
The caller will receive either one or the other.
Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be Terminated and any custom return values will be ignored by the system.
