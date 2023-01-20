---
id: how-to-define-activity-parameters-in-go
title: How to define Activity Parameters in Go
sidebar_label: Activity Parameters
description: The only required parameter is `context.Context`, but Activities can support many custom parameters.
tags:
  - developer-guide
  - go
---

The first parameter of an Activity Definition is `context.Context`.
This parameter is optional for an Activity Definition, though it is recommended, especially if the Activity is expected to use other Go SDK APIs.

An Activity Definition can support as many other custom parameters as needed.
However, all parameters must be serializable (parameters can’t be channels, functions, variadic, or unsafe pointers), and it is recommended to pass a single struct that can be updated later.

<!--SNIPSTART go-samples-yourapp-your-activity-definition { "selectedLines": ["9-14","33","60"] } -->

[yourapp/your_activity_definition.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/your_activity_definition.go)

```go
// ...
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

<!--SNIPEND-->
