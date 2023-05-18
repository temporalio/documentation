---
id: how-to-develop-an-activity-definition-in-go
title: How to develop an Activity Definition in Go
sidebar_label: Activity Definition
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
---

One of the primary things that Workflows do is orchestrate the execution of Activities.
An Activity is a normal function or method execution that's intended to execute a single, well-defined action (either short or long-running), such as querying a database, calling a third-party API, or transcoding a media file.
An Activity can interact with world outside the Temporal Platform or use a Temporal Client to interact with a Cluster.
For the Workflow to be able to execute the Activity, we must define the [Activity Definition](/concepts/what-is-an-activity-definition).

In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
Below is an example of both a basic Activity Definition and of an Activity defined as a Struct method.
An _Activity struct_ can have more than one method, with each method acting as a separate Activity Type.
Activities written as struct methods can use shared struct variables, such as:

- an application level DB pool
- client connection to another service
- reusable utilities
- any other expensive resources that you only want to initialize once per process

Because this is such a common need, the rest of this guide shows Activities written as `struct` methods.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/yourapp/your_activity_definition_dacx.go">View source code</a>

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
