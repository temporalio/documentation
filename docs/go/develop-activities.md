---
id: develop-activities
title: How to develop an Activity in Go
sidebar_label: Activity Development
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

An _Activity struct_ can have more than one method, with each method acting as a separate Activity Type.
Activities written as struct methods can use shared struct variables, such as:

- an application level DB pool
- client connection to another service
- reusable utilities
- any other expensive resources that you only want to initialize once per process

Because this is such a common need, the rest of this guide shows Activities written as `struct` methods.

### Parameters

The first parameter of an Activity Definition is `context.Context`.
This parameter is optional for an Activity Definition, though it is recommended, especially if the Activity is expected to use other Go SDK APIs.

An Activity Definition can support as many other custom parameters as needed.
However, all parameters must be serializable (parameters can’t be channels, functions, variadic, or unsafe pointers), and it is recommended to pass a single struct that can be updated later.

```go
type YourActivityParam struct {
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

### Return values

A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination (same as a Workflow Definition).
You may wish to use a `struct` type to hold all custom values, just keep in mind they must all be serializable.

```go
type YourActivityResult struct{
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
