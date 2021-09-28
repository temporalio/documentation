---
id: how-to-develop-a-workflow-definition-in-go
title: How to develop a Workflow Definition in Go
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
tags:
  - developer-guide
  - go
---

import RelatedReadList from '../components/RelatedReadList.js'

In the Temporal Go SDK programming model, a [Workflow Definition](/docs/temporal-explained/introduction#workflow-definition) is an exportable function.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

**Workflow parameters in Go**

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

**Workflow return values in Go**

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

<!--
<RelatedReadList
readlist={[
["When to return an error from a Workflow","#","og"],
}]
/>
-->

**Workflow logic requirements in Go**

In Go specifically, Workflow Definition code can not directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized. (Use a Side Effect or an Activity instead.)
- Use the native `go` statement, `select` statement, or `chan` type. (Use the [SDK Go API](#), [SDK Select API](#), or [SDK Channel API](#) instead.)
- Call an external API, conduct a file I/O operation, talk to another service, etc. (Use an Activity for these.)

<!--
<RelatedReadList
readlist={[
["General requirements for developing Workflow Definitions","/docs/application-operations/#what-are-general-requirements-for-writing-workflow-defintions","og"],
["How to develop a Side Effect in Go","#","dg"],
["How to develop an Activity Definition", "#how-to-write-an-activity-definition", "dg"],
]}
/>
-->
