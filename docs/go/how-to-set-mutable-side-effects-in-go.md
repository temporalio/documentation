---
id: how-to-set-mutable-side-effects-in-go
title: How to set Mutable Side Effects in Go
sidebar_label: Set Mutable Side Effects
description: To use MutableSideEffect() in Go, provide the Workflow Id.
tags:
  - developer-guide
  - sdk
  - Go
---

To use [`MutableSideEffect()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#MutableSideEffect) in Go, provide a unique name within the scope of the workflow.

```go
if err := workflow.MutableSideEffect(ctx, "configureNumber", get, eq).Get(&number); err != nil {
    panic("can't decode number:" + err.Error())
  }
```
