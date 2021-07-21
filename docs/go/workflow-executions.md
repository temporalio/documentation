---
id: workflow-executions
title: How to invoke a Workflow Execution in Go?
sidebar_label: Workflow Executions
---

import RelatedRead from '../shared/RelatedRead.js'

A Workflow Execution can be invoked using the `ExecuteWorkflow()` method on the Go SDK [`Client`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#Client), which is available via [`NewClient()`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#NewClient) in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client) package.

<RelatedRead
text="How to invoke a Child Workflow Execution"
goTo="#"
tagChar="g"
/>

The `ExecuteWorkflow()` API call requires an instance of [`context.Context`](https://pkg.go.dev/context#Context), an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#StartWorkflowOptions), a Workflow Type name, and all variables to be passed to the Workflow Execution.

```go
package main

import (
  // ...

  "go.temporal.io/sdk/client"
)

func main() {
  c, err := client.NewClient(client.Options{})
  if err != nil {
    // ...
  }
  defer c.Close()
  // ...
  workflowOptions := client.StartWorkflowOptions{
    TaskQueue: "your-task-queue",
  }
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
}
```

Notice that that the Task Queue name is the same as the name provided [when a new Worker is created](#).

<RelatedRead
text="What is a Workflow Execution"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="How to customize the name of the Workflow Type"
goTo="#"
tagChar="g"
/>

## Required Workflow Options in Go

The only field, of the `StartWorkflowOptions` instance, that requires a value is the `TaskQueue`.
  A Task Queue name is also provided to the Worker that is registered to execute that particular Workflow Type.
  The Task Queue name must be the same for both.

<RelatedRead
text="What are Workflow Execution Options"
goTo="#"
tagChar="e"
/>

<RelatedRead
text="How to start a Worker"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="When to care about Task Queues"
goTo="#"
tagChar="g"
/>

## Workflow Type name in Go

By default, the Workflow Type name is the same as the function name.
If the invocation process has access to the function directly, then the Workflow Type name parameter can be passed as if the function name were a variable, without quotations.

If the invocation process does not have direct access to the statically defined Workflow Definition, for example, if the Workflow Definition is in an un-importable package, or it is written in a completely different language, then the Workflow Type can be provided as a `string`.

```go
we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "YourWorkflowDefinition", param)
```

In Go, the name of the Workflow Type can be customized when the Workflow Definition is registered with a Worker.

<RelatedRead
text="How to start a Worker"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="What is a Workflow Type"
goTo="#"
tagChar="e"
/>

<RelatedRead
text="How to build a polyglot application"
goTo="#"
tagChar="t"
/>

## How to get the result of a Workflow Execution in Go

The `ExecuteWorkflow` call returns an instance of [`WorkflowRun`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#WorkflowRun), which is the `we` variable below.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, app.YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}
```

The instance of `WorkflowRun` has the following three methods:

- `GetWorkflowID()`: Returns the Workflow Id of the invoked Workflow Execution.
- `GetRunID()`: Always returns the Run Id of the initial Run (See [Continue As New](#)) in the series of Runs that make up the full Workflow Execution.
- `Get`: Takes a pointer as a parameter and populates the associated variable with the Workflow Execution result.

To wait on the result of Workflow Execution in the same process that invoked it, call `Get()` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  var result YourWorkflowResponse
  err = we.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```

However, the result of a Workflow Execution can be obtained from a completely different process, all that is needed is the [Workflow Id](#) and [Run Id](#).
The result of the Workflow Execution is available for as long as it's Execution History remains in the system (See [How long do Workflow Execution Histories persist](#)).

To get the Workflow Id and Run Id, call the `GetWorkflowID` and `GetRunId` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call and store the results.
These values can then be used to get an instance of `WorkflowRun` again by calling `GetWorkflow()` on an instance of the Go SDK Client.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  workflowID := we.GetID()
  WorkflowRunID := we.GetRunID()
  // ...
  we := c.GetWorkflow(context.Background, workflowID, workflowRunID)

  var result YourWorkflowResponse
  err = we.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```
