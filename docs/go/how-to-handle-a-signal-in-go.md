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
We then use a [`workflow.Selector`](https://docs.temporal.io/go/selectors) and the `AddReceive()` to wait on a Signal from this channel.
The `more` bool in the callback function indicates that channel is not closed and more deliveries are possible.
