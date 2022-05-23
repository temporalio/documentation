---
id: how-to-heartbeat-an-activity-in-go
title: How to Heartbeat an Activity in Go
sidebar_label: Activity Heartbeats
description: Use, the `RecordHeartbeat` API to report that the execution is alive and progressing.
tags:
  - go
  - developer-guide
---

To [Heartbeat](/concepts/what-is-an-activity-heartbeat) in an Activity, use the `RecordHeartbeat` API.

```go
progress := 0
for progress < 100 {
    // Send heartbeat message to the server.
    activity.RecordHeartbeat(ctx, progress)
    // Do some work.
    ...
    progress++
}
```

When an Activity Task Execution times out due to a missed Heartbeat, the last value of the details (`progress` in the
above sample) is returned from the `workflow.ExecuteActivity` function as the details field of `TimeoutError`
with `TimeoutType` set to `Heartbeat`.

You can also Heartbeat an Activity from an external source:

```go
// The client is a heavyweight object that should be created once per process.
temporalClient, err := client.NewClient(client.Options{})
// Record heartbeat.
err := temporalClient.RecordActivityHeartbeat(ctx, taskToken, details)
```

The parameters of the `RecordActivityHeartbeat` function are:

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `details`: The serializable payload containing progress information.

If an Activity Execution Heartbeats its progress before it failed, the retry attempt will have access to the progress information, so that the Activity Execution can resume from the failed state.
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
