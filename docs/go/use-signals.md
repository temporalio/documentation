---
id: use-signals
title: How to use Signals in Go
sidebar_label: Signals
description: Use the `SignalWorkflow()` method on and instance of the Go SDK Temporal Client to send a Signal to a Workflow Execution.
tags:
  - go
  - developer-guide
---

To use Signals in Go, first define your Signal type and then add a Signal handler to your Workflow Definition.
Signals can then be sent via the Temporal Client or from within a Workflow.

### Define Signal type

Structs should be used to define Signals and carry data, as long as the struct is [serializable via the Data Converter](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
The `Receive()` method on the Data Converter decodes the data into the Struct within the Workflow.
Only public fields are serializable.

```go
MySignal struct {
	Message string // serializable
	message string // not serializable
}
```

### Handle Signal

---

id: how-to-handle-a-signal-in-go
title: How to handle a Signal in Go
sidebar_label: Handle Signal
description: Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.
tags:

- go
- how-to

---

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
We then use a [`workflow.Selector`](/go/selectors) and the `AddReceive()` to wait on a Signal from this channel.
The `more` bool in the callback function indicates that channel is not closed and more deliveries are possible.

Before completing the Workflow or using [Continue-As-New](/application-development/features#continue-as-new), make sure to do an asynchronous drain on the Signal channel.
Otherwise, the Signals will be lost.

### Send Signal from Temporal Client

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

### Send Signal from within a Workflow

A Signal can be sent from within a Workflow to a different Workflow Execution using the [`SignalExternalWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SignalExternalWorkflow) API from the `go.temporal.io/sdk/workflow` package.

```go
// ...
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  //...
  signal := MySignal {
    Message: "Some important data",
  }
  err :=  workflow.SignalExternalWorkflow(ctx, "some-workflow-id", "", "your-signal-name", signal).Get(ctx, nil)
  if err != nil {
    // ...
  }
// ...
}
```

### Signal-With-Start

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
