---
id: how-to-develop-an-activity-definition-in-go
title: How to develop an Activity Definition in Go
sidebar_label: Activity Definition
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
  - go-sdk
---

In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
Below is an example of both a basic Activity Definition and of an Activity defined as a Struct method.
An _Activity struct_ can have more than one method, with each method acting as a separate Activity Type.
Activities written as struct methods can use shared struct variables, such as:

- an application level DB pool
- client connection to another service
- reusable utilities
- any other expensive resources that you only want to initialize once per process

Because this is such a common need, the rest of this guide shows Activities written as `struct` methods.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/yourapp/your_activity_definition_dacx.go">View source code</a>

```go
package yourapp

import (
	"context"

	"go.temporal.io/sdk/activity"
)
// ...

// YourSimpleActivityDefinition is a basic Activity Definiton.
func YourSimpleActivityDefinition(ctx context.Context) error {
	return nil
}

// YourActivityObject is the struct that maintains shared state across Activities.
// If the Worker crashes this Activity object loses its state.
type YourActivityObject struct {
	Message *string
	Number *int
}

// YourActivityDefinition is your custom Activity Definition.
// An Activity Definiton is an exportable function.
func (a *YourActivityObject) YourActivityDefinition(ctx context.Context, param YourActivityParam) (*YourActivityResultObject, error) {
// ...
}
```
