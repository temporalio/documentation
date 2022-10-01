---
id: how-to-define-activity-return-values-in-go
title: How to define Activity return values in Go
sidebar_label: Activity return values
description: A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination.
tags:
  - developer-guide
  - go
---

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
