---
id: how-to-send-a-signal-with-start-in-go
title: How to send a Signal-With-Start in Go
sidebar_label: Signal-With-Start
description: Use the `SignalWithStartWorkflow()` API on the Go SDK Temporal Client to start a Workflow Execution (if not already running) and pass it the Signal at the same time.
tags:
  - go
  - how-to
---

Use the `SignalWithStartWorkflow()` API on the Go SDK Temporal Client to start a Workflow Execution (if not already running) and pass it the Signal at the same time.

Because the Workflow Execution might not exist, this API does not take a Run ID as a parameter

```go
// ...
signal := MySignal {
  Message: "Some important data",
}
err = temporalClient.SignalWithStartWorkflow(context.Background(), "your-workflow-id", "your-signal-name", signal)
if err != nil {
	log.Fatalln("Error sending the Signal", err)
	return
}
```
