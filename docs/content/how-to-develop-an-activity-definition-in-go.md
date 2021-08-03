---
id: how-to-develop-an-activity-definition-in-go
title: How to develop an Activity Definition in Go
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or `stuct` method.
tags:
  - guide
---

import RelatedReadList from '../components/RelatedReadList.js'

In the Temporal Go SDK programming model, an Activity Definition is an exportable function or `stuct` method.

**Function**:

```go
func YourActivityDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

**Struct method**:

```go
type YourActivityStruct struct {
  ActivityFieldOne string
  ActivityFieldTwo int
}

func(a *YourActivityStruct) YourActivityDefinition(ctx workflow.Context) error {

}
```

Activities written as struct methods can make use of shared struct variables.
The rest of this guide will show Activities written as struct methods.

<!--
<RelatedReadList
readliststring="What are Activities?/docs/concepts-new/introduction#workflow-definition?e"
/>
-->

**Activity parameters in Go**

The first parameter of an Activity Definition is `context.Context`.
This parameter is optional for an Activity Definition, though it is recommended especially if the Activity is expected to use other Go SDK APIs.

An Activity Definition can support as many other custom parameters as needed.
However, all parameters must be serializable (parameters can’t be channels, functions, variadic, or unsafe pointers), and it is recommended to pass a single struct that can be updated later.

```go
type YourActivityParam {
  ActivityParamFieldOne string
  ActivityParamFieldTwo int
}

type YourActivityStruct struct {
  // ...
}

func (a *YourActivityStruct) YourActivityDefinition(ctx context.Context, param YourActivityParam) error {
  // ...
}
```

There is no explicit limit to the amount of parameter data that can be passed to an Activity, however all parameters are recorded in the Workflow Execution History and a large Workflow Execution History can adversely impact the performance of your Workflow Execution.

<!--
<RelatedReadList
readliststring="What is a Workflow Execution History?#?e|
When to care about the size of your Workflow Execution History?#?g"
/>
-->

**Activity return values in Go**

A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination (same as a Workflow Definition).
Again, the best practice here is to use a `struct` type to hold all custom values.
Custom return values must be serializable.

```go
type YourActivityResult {
  ActivityResultFieldOne string
  ActivityResultFieldTwo int
}

func (a *YourActivityStruct) YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResult, error) {
  // ...
  result := YourActivityResult {
    ActivityResultFieldOne: a.ActivityFieldOne,
    ActivityResultFieldTwo: a.ActivityFieldTwo,
  }
  return result, nil
}
```

<!--
<RelatedReadList
readliststring="When to return an error from an Activity?#?g"
/>
-->

**Activity logic requirements in Go**

There are no other limitations to Activity Definition logic.
All native features of the Go programming language can be used within an Activity, and it is idiomatic to use an Activity to make calls to other services across a network.

<!--
<RelatedReadList
readliststring="What are some Activity implementation design patterns?#?g"
/>
-->
