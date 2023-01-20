---
id: how-to-develop-an-activity-definition-in-go
title: How to develop an Activity Definition in Go
sidebar_label: Activity Definition
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or `stuct` method.
tags:
  - developer-guide
  - go
---

In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.

**Function**

<!--SNIPSTART go-samples-yourapp-your-activity-definition { "selectedLines": ["57-60"] } -->

[yourapp/your_activity_definition.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/your_activity_definition.go)

```go
// ...
// YourSimpleActivityDefinition is a basic Activity Definiton.
func YourSimpleActivityDefinition(ctx context.Context) error {
	return nil
}
```

<!--SNIPEND-->

```go
// with parameters and return values
func SimpleActivity(ctx context.Context, value string) (string, error)
```

**Struct method**

<!--SNIPSTART go-samples-yourapp-your-activity-definition { "selectedLines": ["24-29","31-33","47","49-50","55"] } -->

[yourapp/your_activity_definition.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/your_activity_definition.go)

```go
// ...
// YourActivityObject is the struct that maintains shared state across Activities.
// If the Worker crashes this Activity object loses its state.
type YourActivityObject struct {
	SharedMessageState *string
	SharedCounterState *int
}
// ...
// YourActivityDefinition is your custom Activity Definition.
// An Activity Definiton is an exportable function.
func (a *YourActivityObject) YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResultObject, error) {
// ...
}
// ...
// PrintSharedState is another custom Activity Definition.
func (a *YourActivityObject) PrintSharedSate(ctx context.Context) error {
// ...
}
```

<!--SNIPEND-->

An _Activity struct_ can have more than one method, with each method acting as a separate Activity Type.
Activities written as struct methods can use shared struct variables, such as:

- an application level DB pool
- client connection to another service
- reusable utilities
- any other expensive resources that you only want to initialize once per process

Because this is such a common need, the rest of this guide shows Activities written as `struct` methods.
