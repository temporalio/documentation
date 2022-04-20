---
id: how-to-send-a-signal-to-a-workflow-execution-in-go
title: How to send a Signal to a Workflow Execution in Go
sidebar_label: Sending Signals
description: Use the `SignalWorkflow()` method on and instance of the Go SDK Temporal Client to send a Signal to a Workflow Execution.
tags:
  - go
  - developer-guide
---

Use the `SignalWorkflow()` method on an instance of the [Go SDK Temporal Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) to send a [Signal](/docs/concepts/what-is-a-signal) to a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

Pass in both the [Workflow Id](/docs/concepts/what-is-a-workflow-id) and [Run Id](/docs/concepts/what-is-a-run-id) to uniquely identify the Workflow Execution.
If just the Workflow Id is supplied (provide an empty string as the Run Id param), then the Workflow Execution that is Running will receive the Signal.

```go
temporalClient, err := client.NewClient(client.Options{})
if err != nil {
    log.Fatalln("Unable to create Temporal client", err)
    return
}
err = temporalClient.SignalWorkflow(context.Background(), workflowID, runID, signalName, signalVal)
if err != nil {
	log.Fatalln("Error signaling client", err)
	return
}
```

Possible errors:

- `serviceerror.NotFound`
- `serviceerror.Internal`
- `serviceerror.Unavailable`

#### Signal as a struct

Structs can be used as Signal data, as long as the struct is [serializable via the Data Converter](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
The `Receive()` method on the Data Converter decodes the data into the Struct within the Workflow ([How to handle a Signal in a Workflow in Go](https://docs.temporal.io/docs/go/how-to-handle-a-signal-in-a-workflow-in-go)).
Only public fields are serializable.

```go
MySignal struct {
	Message string // serializable
	message string // not serializable
}
// ...
signal := MySignal {
  Message: "Some important data",
}
err = temporalClient.SignalWorkflow(context.Background(), "your-workflow-id", runID, "your-signal-name", signal)
if err != nil {
	log.Fatalln("Error sending the Signal", err)
	return
}
```

#### Signal-With-Start

If you are unsure of the status of the Workflow Execution that you are sending the Signal to, you can use the `SignalWithStartWorkflow()` method on the Go SDK Temporal Client to start the Workflow Execution and give it the Signal it at the same time.

Because the Workflow Execution may not exist, this method does not take a Run Id as a parameter

```go
// ...
err = temporalClient.SignalWithStartWorkflow(context.Background(), "your-workflow-id", "your-signal-name", signal)
if err != nil {
	log.Fatalln("Error sending the Signal", err)
	return
}
```

#### How to send a Signal from within a Workflow

A Signal can be sent from within a Workflow to a different Workflow Execution using the [`SignalExternalWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SignalExternalWorkflow) API from the `go.temporal.io/sdk/workflow` package.

```go
// ...
signalData := "your message"
err :=  workflow.SignalExternalWorkflow(ctx, "some-workflow-id", "", "your-signal-name", signalData).Get(ctx, nil)
if err != nil {
  // ..
}
```
