---
id: how-to-write-a-workflow-definition-in-go
title: How to write a Workflow Definition in Go
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
tags:
  - guide
---

import RelatedRead from '../components/RelatedRead.js'
import DetermineHeader from '../components/DetermineHeader.js'

export const headingText = 'How to write a Workflow Definition in Go'

<DetermineHeader
hLevel={props.heading}
hText={headingText}
/>

In the Temporal Go SDK programming model, a [Workflow Definition](/docs/temporal-explained/introduction#workflow-definition) is an exportable function.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

## Workflow parameters in Go

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

## Workflow return values in Go

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.

```go
type YourWorkflowResponse {
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

Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be [Terminated](#).

<!--
<RelatedRead
text="When to return an error from a Workflow"
goTo="#"
tagChar="g"
/>
-->

## Workflow logic requirements in Go

In Go specifically, Workflow Definition code can not directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized (Use a Side Effect or an Activity.
- Use the native `go` statement, `select` statement, or `chan` type (Use the [SDK Go API](#), [SDK Select API](#), and [SDK Channel API](#))

<!--
<RelatedRead
text="General requirements for writing Workflow Definitions"
goTo="/docs/application-operations/#what-are-general-requirements-for-writing-workflow-defintions"
tagChar="g"
/>

<RelatedRead
text="How to implement a Side Effect in Go"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="How to write an Activity Definition"
goTo="#how-to-write-an-activity-definition"
tagChar="g"
/>
-->
