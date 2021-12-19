---
id: how-to-heartbeat-in-an-activity-in-go
title: How to Heartbeat in an Activity in Go
sidebar_label: Activity Heartbeat
description: TODO
tags:
  - go
  - developer-guide
---


#### Heart Beating

For long-running Activities, Temporal provides an API for the Activity code to report both liveness and
progress back to the Temporal managed service.

```go
progress := 0
for hasWork {
    // Send heartbeat message to the server.
    activity.RecordHeartbeat(ctx, progress)
    // Do some work.
    ...
    progress++
}
```

When an Activity times out due to a missed heartbeat, the last value of the details (`progress` in the
above sample) is returned from the `workflow.ExecuteActivity` function as the details field of `TimeoutError`
with `TimeoutType` set to `Heartbeat`.

You can also heartbeat an Activity from an external source:

```go
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{
    HostPort:     HostPort,
    Namespace:   Namespace,
    MetricsScope: scope,
})

// Record heartbeat.
err := serviceClient.RecordActivityHeartbeat(ctx, taskToken, details)
```

The parameters of the `RecordActivityHeartbeat` function are:

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `details`: The serializable payload containing progress information.

If an Activity heartbeat its progress before it failed, the retry attempt will have access to the progress information, so that the Activity implementation could resume from the failed step.
Here's an example of how this can be implemented:

```go
func SampleActivity(ctx context.Context, inputArg InputParams) error {
    startIdx := inputArg.StartIndex
    if activity.HasHeartbeatDetails(ctx) {
        // Recover from finished progress.
        var finishedIndex int
        if err := activity.GetHeartbeatDetails(ctx, &finishedIndex); err == nil {
            startIdx = finishedIndex + 1 // Start from next one.
        }
    }

    // Normal Activity logic...
    for i:=startIdx; i<inputArg.EndIdx; i++ {
        // Code for processing item i goes here...
        activity.RecordHeartbeat(ctx, i) // Report progress.
    }
}
```
