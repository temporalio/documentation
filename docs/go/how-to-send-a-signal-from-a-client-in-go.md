---
id: how-to-send-a-signal-from-a-client-in-go
title: How to send a Signal from a Temporal Client in Go
sidebar_label: Send Signal from Client
description: Use the `SignalWorkflow()` method on an instance of the Go SDK Temporal Client to send a Signal to a Workflow Execution.
tags:
  - go
  - how-to
---

Use the `SignalWorkflow()` method on an instance of the [Go SDK Temporal Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) to send a [Signal](/concepts/what-is-a-signal) to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Pass in both the [Workflow Id](/concepts/what-is-a-workflow-id) and [Run Id](/concepts/what-is-a-run-id) to uniquely identify the Workflow Execution.
If only the Workflow Id is supplied (provide an empty string as the Run Id param), the Workflow Execution that is Running receives the Signal.

```go
// ...
signal := MySignal {
  Message: "Some important data",
}
err = temporalClient.SignalWorkflow(context.Background(), "your-workflow-id", runID, "your-signal-name", signal)
if err != nil {
	log.Fatalln("Error sending the Signal", err)
	return
}
// ...
```

Possible errors:

- `serviceerror.NotFound`
- `serviceerror.Internal`
- `serviceerror.Unavailable`
