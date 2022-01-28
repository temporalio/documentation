---
id: how-to-handle-a-signal-in-a-workflow-in-go
title: How to handle a Signal in a Workflow in Go
sidebar_label: Handling Signals
description: Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.
tags:
  - go
  - developer-guide
---

Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.
Get a new [`Selector`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Selector) and pass it the Signal Channel and a callback function to handle the payload.

```go
var signalVal MySignal
signalChan := workflow.GetSignalChannel(ctx, "your-signal-name")
selector := workflow.NewSelector(ctx)
selector.AddReceive(signalChan, func(channel workflow.ReceiveChannel, more bool) {
    channel.Receive(ctx, &signalVal)
    // ...
})
s.Select(ctx)

if len(signalVal) > 0 && signalVal != "SOME_VALUE" {
    return errors.New("signalVal")
}
```

In the example above, the Workflow code uses `workflow.GetSignalChannel` to open a `workflow.Channel` for the Signal type (identified by the Signal name).
We then use a [`workflow.Selector`](https://docs.temporal.io/docs/go/selectors) and the `AddReceive()` to wait on a Signal from this channel.
The `more` bool in the callback function indicates that channel is not closed and more deliveries are possible.
