---
id: how-to-get-the-result-of-an-activity-execution-in-go
title: How to get the result of an Activity Execution in Go
sidebar_label: Activity Execution result
description: Use the Future returned from the `ExecuteActivity` API call to retrieve the result.
tags:
  - developer-guide
  - go
---

<!--TODO
import RelatedReadList from '../components/RelatedReadList.js'
-->

The `ExecuteActivity` API call returns an instance of [`workflow.Future`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Futures) which has the following two methods:

- `Get()`: Takes an instance of the `workflow.Context`, that was passed to the Activity Execution, and a pointer as parameters.
  The variable associated with the pointer is populated with the Activity Execution result.
  This call blocks until the result is available.
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
Therefore it is also idiomatic to either block on the results of any of the Activity Executions or continue on to execute additional logic, checking for the Activity Execution results at a later time.

<!--
<RelatedRead
text="How to implement Selectors for complex wait conditions"
goTo="#"
tagChar="g"
/>
-->

## Asynchronous Activity Completion

There are certain scenarios when you want to defer completing an Activity until much later.
For example, you might have an application that requires user input in order to complete
the Activity.
You could do this with a polling mechanism, but a simpler and less
resource-intensive implementation is to _asynchronously_ complete a Temporal Activity.

There are two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies
   the Temporal service that it is waiting for that outside callback (with `activity.ErrResultPending`).
2. The external service calls the Temporal service to complete the Activity (with `client.CompleteActivity`).

The following example demonstrates the first part:

```go
// Retrieve the Activity information needed to asynchronously complete the Activity.
activityInfo := activity.GetInfo(ctx)
taskToken := activityInfo.TaskToken

// Send the taskToken to the external service that will complete the Activity.
...

// Return from the Activity a function indicating that Temporal should wait for an async completion
// message.
return "", activity.ErrResultPending
```

The following code demonstrates how to complete the Activity successfully:

```go
// Instantiate a Temporal service client.
// The same client can be used to complete or fail any number of Activities.
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{})

// Complete the Activity.
client.CompleteActivity(context.Background(), taskToken, result, nil)
```

To fail the Activity, you would do the following:

```go
// Fail the Activity.
client.CompleteActivity(context.Background(), taskToken, nil, err)
```

Following are the parameters of the `CompleteActivity` function:

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `result`: The return value to record for the Activity. The type of this value must match the type
  of the return value declared by the Activity function.
- `err`: The error code to return if the Activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.
