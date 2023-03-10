---
id: how-to-define-activity-parameters-in-go
title: How to do define Activity parameters in Go
sidebar_label: Activity parameters
description: The only required parameter is `context.Context`, but Activities can support many custom parameters.
---

The first parameter of an Activity Definition is `context.Context`.
This parameter is optional for an Activity Definition, though it is recommended, especially if the Activity is expected to use other Go SDK APIs.

An Activity Definition can support as many other custom parameters as needed.
However, all parameters must be serializable (parameters can’t be channels, functions, variadic, or unsafe pointers), and it is recommended to pass a single struct that can be updated later.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/yourapp/your_activity_definition_dacx.go">View source code</a>

```go
// YourActivityParam is the struct passed to your Activity.
// Use a struct so that your function signature remains compatible if fields change.
type YourActivityParam struct {
	ActivityParamX string
	ActivityParamY int
}
// ...
func (a *YourActivityObject) YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResultObject, error) {
// ...
}
```
