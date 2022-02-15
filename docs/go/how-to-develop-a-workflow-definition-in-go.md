---
id: how-to-develop-a-workflow-definition-in-go
title: How to develop a Workflow Definition in Go
sidebar_label: Workflow Definition
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
tags:
  - developer-guide
  - go
---

In the Temporal Go SDK programming model, a [Workflow Definition](/docs/concepts/what-is-a-workflow-definition) is an exportable function.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

### Workflow parameters in Go

The first parameter of a Go-based Workflow Definition must be of the [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#Context) type, as it is used by the Temporal Go SDK to pass around Workflow Execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow) package.

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

All Workflow Definition parameters must be serializable, which means that parameters can’t be channels, functions, variadic, or unsafe pointers.

### Workflow return values in Go

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
Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be [Terminated](#) and any custom return values will be ignored by the system.

### Workflow logic requirements in Go

Workflow Definition code cannot directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized.
  Instead you can collect the keys of the map, sort them, and then iterate over the sorted keys to access the map.
  This technique provides deterministic results.
  You can also use a Side Effect or an Activity to process the map instead.
- Call an external API, conduct a file I/O operation, talk to another service, etc. (Use an Activity for these.)

Additionally the Temporal Go SDK offers APIs to handle equivalent Go constructs:

- `workflow.Now()` This is a replacement for `time.Now()`.
- `workflow.Sleep()` This is a replacement for `time.Sleep()`.
- `workflow.GetLogger()` This ensures that the provided logger does not duplicate logs during a replay.
- `workflow.Go()` This is a replacement for the `go` statement.
- `workflow.Channel` This is a replacement for the native `chan` type.
  Temporal provides support for both buffered and unbuffered channels.
- `workflow.Selector` This is a replacement for the `select` statement. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page
- `workflow.Context` This is a replacement for `context.Context`. Learn more on the [Go SDK Context Propagation](https://docs.temporal.io/docs/go/tracing) page.
