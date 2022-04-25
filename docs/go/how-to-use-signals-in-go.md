---
id: how-to-use-signals-in-go
title: How to use Signals in Go
sidebar_label: Signals
description: Use the `SignalWorkflow()` method on and instance of the Go SDK Temporal Client to send a Signal to a Workflow Execution.
tags:
  - go
  - developer-guide
---

To use Signals in Go, first define your Signal type and then add a Signal handler to your Workflow Definition.
Signals can then be sent via the Temporal Client or from within a Workflow.

#### Define Signal type

**How to define a Signal Type in Go**

Structs can be used as Signal data, as long as the struct is [serializable via the Data Converter](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
The `Receive()` method on the Data Converter decodes the data into the Struct within the Workflow ([Handling Signals](#handling-signals)).
Only public fields are serializable.

```go
MySignal struct {
	Message string // serializable
	message string // not serializable
}
```

#### Handle Signal

**How to handle a Signal in Go**

Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.
Get a new [`Selector`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Selector) and pass it the Signal Channel and a callback function to handle the payload.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  // ...
  var signal MySignal
  signalChan := workflow.GetSignalChannel(ctx, "your-signal-name")
  selector := workflow.NewSelector(ctx)
  selector.AddReceive(signalChan, func(channel workflow.ReceiveChannel, more bool) {
      channel.Receive(ctx, &signal)
      // ...
  })
  selector.Select(ctx)
  if len(signal.Message) > 0 && signal.Message != "SOME_VALUE" {
      return errors.New("signal")
  }
  // ...
}
```

In the example above, the Workflow code uses `workflow.GetSignalChannel` to open a `workflow.Channel` for the Signal type (identified by the Signal name).
We then use a [`workflow.Selector`](https://docs.temporal.io/docs/go/selectors) and the `AddReceive()` to wait on a Signal from this channel.
The `more` bool in the callback function indicates that channel is not closed and more deliveries are possible.

#### Send Signal from Temporal Client

**How to send a Signal from a Temporal Client in Go**

Use the `SignalWorkflow()` method on an instance of the [Go SDK Temporal Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) to send a [Signal](/docs/concepts/what-is-a-signal) to a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

Pass in both the [Workflow Id](/docs/concepts/what-is-a-workflow-id) and [Run Id](/docs/concepts/what-is-a-run-id) to uniquely identify the Workflow Execution.
If just the Workflow Id is supplied (provide an empty string as the Run Id param), then the Workflow Execution that is Running will receive the Signal.

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

#### Send Signal from within a Workflow

**How to send a Signal from within a Workflow in Go**

A Signal can be sent from within a Workflow to a different Workflow Execution using the [`SignalExternalWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SignalExternalWorkflow) API from the `go.temporal.io/sdk/workflow` package.

```go
// ...
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  //...
  signal := MySignal {
    Message: "Some important data",
  }
  err :=  workflow.SignalExternalWorkflow(ctx, "some-workflow-id", "", "your-signal-name", signalData).Get(ctx, nil)
  if err != nil {
    // ...
  }
// ...
}
```

#### Signal-With-Start

**How to send a Signal-With-Start in Go**

Use the `SignalWithStartWorkflow()` API on the Go SDK Temporal Client to start a Workflow Execution (if not already running) and pass it the Signal at the same time.

Because the Workflow Execution may not exist, this API does not take a Run ID as a parameter

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
