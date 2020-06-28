---
id: go-activity-async-completion
title: Asynchronous Activity Completion
---

There are certain scenarios when completing an activity upon completion of its function is not possible
or desirable. For example, you might have an application that requires user input in order to complete
the activity. You could implement the activity with a polling mechanism, but a simpler and less
resource-intensive implementation is to asynchronously complete a Temporal activity.

There two parts to implementing an asynchronously completed activity:

1. The activity provides the information necessary for completion from an external system and notifies
the Temporal service that it is waiting for that outside callback.
2. The external service calls the Temporal service to complete the activity.

The following example demonstrates the first part:

```go
// Retrieve the activity information needed to asynchronously complete the activity.
activityInfo := activity.GetInfo(ctx)
taskToken := activityInfo.TaskToken

// Send the taskToken to the external service that will complete the activity.
...

// Return from the activity a function indicating that Temporal should wait for an async completion
// message.
return "", activity.ErrResultPending
```

The following code demonstrates how to complete the activity successfully:

```go
// Instantiate a Temporal service client.
// The same client can be used to complete or fail any number of activities.
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{})

// Complete the activity.
client.CompleteActivity(taskToken, result, nil)
```

To fail the activity, you would do the following:

```go
// Fail the activity.
client.CompleteActivity(taskToken, nil, err)
```

Following are the parameters of the `CompleteActivity` function:

* `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
the activity.
* `result`: The return value to record for the activity. The type of this value must match the type
of the return value declared by the activity function.
* `err`: The error code to return if the activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.
