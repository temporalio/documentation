---
id: how-to-define-workflow-parameters-in-go
title: How to define Workflow parameters in Go
sidebar_label: Workflow parameters
description: A Go-based Workflow Definition must accept `workflow.Context` and may support multiple custom parameters.
tags:
  - go
  - how-to
---

The first parameter of a Go-based Workflow Definition must be of the [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Context) type, as it is used by the Temporal Go SDK to pass around Workflow Execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow) package.

```go
import (
    "go.temporal.io/sdk/workflow"
)

func YourWorkflowDefinition(ctx workflow.Context, param string) error {
  // ...
}
```

The `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference between `workflow.Context` and `context.Context` is that the `Done()` function, provided by `workflow.Context`, returns `workflow.Channel` instead of the standard Go `chan`.

The second parameter, `string`, is a custom parameter that is passed to the Workflow when it is invoked.
A Workflow Definition may support multiple custom parameters, or none.
These parameters can be regular type variables or safe pointers.
However, the best practice is to pass a single parameter that is of a `struct` type so there can be some backward compatibility if new parameters are added.

```go
type YourWorkflowParam struct {
  WorkflowParamFieldOne string
  WorkflowParamFieldTwo int
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  // ...
}
```

All Workflow Definition parameters must be serializable, regardless of whether pointers or regular type values are used.
Parameters can’t be channels, functions, variadic, or unsafe pointers.
