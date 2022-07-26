---
id: how-to-develop-a-workflow-definition-in-go
title: How to develop a Workflow Definition in Go
sidebar_label: Workflow Definition
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
tags:
  - developer-guide
  - go
---

Use the [`Dial()`](https://pkg.go.dev/go.temporal.io/sdk/client#Dial) API available in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk/client) package to create a new [`Client`](https://pkg.go.dev/go.temporal.io/sdk/client#Client)

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

In Go, by default, the Workflow Type name is the same as the function name.
