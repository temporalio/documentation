---
id: how-to-spawn-a-workflow-execution-in-go
title: How to spawn a Workflow Execution in Go
sidebar_label: Workflow Execution
description: Use the `ExecuteWorkflow()` method on the Go SDK `Client`, which is available via `NewClient()` in the `go.temporal.io/sdk/client` package.
tags:
  - developer-guide
  - go
---

To spawn a [Workflow Execution](/concepts/what-is-a-workflow-execution), use the `ExecuteWorkflow()` method on the Go SDK [`Client`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#Client).

The `ExecuteWorkflow()` API call requires an instance of [`context.Context`](https://pkg.go.dev/context#Context), an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#StartWorkflowOptions), a Workflow Type name, and all variables to be passed to the Workflow Execution.
The `ExecuteWorkflow()` call returns a Future, which can be used to get the result of the Workflow Execution.

```go
package main

import (
  // ...

  "go.temporal.io/sdk/client"
)

func main() {
  temporalClient, err := client.NewClient(client.Options{})
  if err != nil {
    // ...
  }
  defer temporalClient.Close()
  // ...
  workflowOptions := client.StartWorkflowOptions{
    // ...
  }
  workflowRun, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
}
```

If the invocation process has access to the function directly, then the Workflow Type name parameter can be passed as if the function name were a variable, without quotations.

```go
workflowRun, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
```

If the invocation process does not have direct access to the statically defined Workflow Definition, for example, if the Workflow Definition is in an un-importable package, or it is written in a completely different language, then the Workflow Type can be provided as a `string`.

```go
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "YourWorkflowDefinition", param)
```
