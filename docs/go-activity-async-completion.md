---
id: go-activity-async-completion
title: Asynchronous Activity Completion
---

There are certain scenarios when completing an Activity upon completion of its function is not possible
or desirable. For example, you might have an application that requires user input in order to complete
the Activity. You could implement the Activity with a polling mechanism, but a simpler and less
resource-intensive implementation is to asynchronously complete a Temporal Activity.

There two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies
the Temporal service that it is waiting for that outside callback.
2. The external service calls the Temporal service to complete the Activity.

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
client.CompleteActivity(taskToken, result, nil)
```

To fail the Activity, you would do the following:

```go
// Fail the Activity.
client.CompleteActivity(taskToken, nil, err)
```

Following are the parameters of the `CompleteActivity` function:

* `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
the Activity.
* `result`: The return value to record for the Activity. The type of this value must match the type
of the return value declared by the Activity function.
* `err`: The error code to return if the Activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.
