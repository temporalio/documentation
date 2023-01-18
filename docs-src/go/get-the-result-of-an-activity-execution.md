---
id: get-the-result-of-an-activity-execution
title: How to get the result of an Activity Execution in Go
sidebar_label: Activity Execution result
description: Use the Future returned from the `ExecuteActivity` API call to retrieve the result.
tags:
  - developer-guide
  - go
---

The `ExecuteActivity` API call returns an instance of [`workflow.Future`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Futures) which has the following two methods:

- `Get()`: Takes an instance of the `workflow.Context`, that was passed to the Activity Execution, and a pointer as parameters.
  The variable associated with the pointer is populated with the Activity Execution result.
  This call blocks until the results are available.
- `IsReady()`: Returns `true` when the result of the Activity Execution is ready.

Call the `Get()` method on the instance of `workflow.Future` to get the result of the Activity Execution.
The type of the result parameter must match the type of the return value declared by the Activity function.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
 // ...
 future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
 var yourActivityResult YourActivityResult
 if err := future.Get(ctx, &yourActivityResult); err != nil {
   // ...
 }
 // ...
}
```

Use the `IsReady()` method first to make sure the `Get()` call doesn't cause the Workflow Execution to wait on the result.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
 // ...
 future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
 // ...
 if(future.IsReady()) {
   var yourActivityResult YourActivityResult
   if err := future.Get(ctx, &yourActivityResult); err != nil {
     // ...
   }
 }
 // ...
}
```

It is idiomatic to invoke multiple Activity Executions from within a Workflow.
Therefore, it is also idiomatic to either block on the results of the Activity Executions or continue on to execute additional logic, checking for the Activity Execution results at a later time.
