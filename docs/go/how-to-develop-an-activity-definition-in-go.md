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

```go
// basic function signature
func YourActivityDefinition(ctx context.Context) error {
  // ...
  return nil
}

// with parameters and return values
func SimpleActivity(ctx context.Context, value string) (string, error)
```

**Struct method**

```go
type YourActivityStruct struct {
  ActivityFieldOne string
  ActivityFieldTwo int
}

func(a *YourActivityStruct) YourActivityDefinition(ctx context.Context) error {
  // ...
}

func(a *YourActivityStruct) YourActivityDefinitionTwo(ctx context.Context) error {
  // ...
}
```

An "Activity struct" can have more than one method, with each method acting as a separate Activity Type.
Activities written as struct methods can use shared struct variables such as:

- an application level DB pool
- client connection to another service
- reusable utilities
- any other expensive resources you only want to initialize once per process

Because this is such a common need, the rest of this guide shows Activities written as `struct` methods.
