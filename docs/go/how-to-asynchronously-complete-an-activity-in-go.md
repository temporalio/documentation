---
id: how-to-asynchronously-complete-an-activity-in-go
title: How to asynchronously complete an Activity in Go
sidebar_label: Asynchronous Activity Completion
description: todo
tags:
  - how-to
  - go
---

1. Provide the external system with the a Task Token to complete the Activity Execution.
   To do this, use the `GetInfo()` API from the `go.temporal.io/sdk/activity` package.

```go
// Retrieve the Activity information needed to asynchronously complete the Activity.
activityInfo := activity.GetInfo(ctx)
taskToken := activityInfo.TaskToken
// Send the taskToken to the external service that will complete the Activity.
```

2. Return an `activity.ErrResultPending` error to indicate that the Activity is completing asynchronously.

```go
return "", activity.ErrResultPending
```

3. Use the Temporal Client to complete the Activity using the Task Token.

```go
// Instantiate a Temporal service client.
// The same client can be used to complete or fail any number of Activities.
// The client is a heavyweight object that should be created once per process.
temporalClient, err := client.NewClient(client.Options{})

// Complete the Activity.
temporalClient.CompleteActivity(context.Background(), taskToken, result, nil)
```

Following are the parameters of the `CompleteActivity` function:

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `result`: The return value to record for the Activity. The type of this value must match the type
  of the return value declared by the Activity function.
- `err`: The error code to return if the Activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.

To fail the Activity, you would do the following:

```go
// Fail the Activity.
client.CompleteActivity(context.Background(), taskToken, nil, err)
```
