---
id: signals
title: Signals in Go
sidebar_label: Signals
---

**Signals** provide a mechanism to send data directly **in** to a running Workflow.
This is the conceptual opposite of [**Queries**](https://docs.temporal.io/docs/go/queries), which help you get data **out** of a running Workflow.

- If you are unsure of the run state, you can send a `SignalWithStart` to start the Workflow and signal it at the same time.
- Workflows can signal other workflows with `SignalExternalWorkflow`.

## When to use Signals

import WhenToSignals from '../content/when-to-use-signals.md'

<WhenToSignals />

## Example Signal Code

You can find more example Signals usage in our [Go Samples](https://github.com/temporalio/samples-go).

### How to send a Signal

We can send a Signal using the `SignalWorkflow()` function.
To uniquely identify the Workflow, we need to pass in the `workflowID` and `runID`.
Typically, we signal a Workflow from a different process, like a [starter](/docs/go/hello-world-tutorial/#workflow-starter).

```go
temporal, err := client.NewClient(client.Options{})
if err != nil {
    log.Fatalln("Unable to create Temporal client", err)
    return
}

err = temporal.SignalWorkflow(context.Background(), workflowID, runID, signalName, signalVal)
if err != nil {
	log.Fatalln("Error signaling client", err)
	return
}
```

### Signalling regardless of running status

You may not know if a Workflow is running and can accept a signal.
The [client.SignalWithStartWorkflow](https://pkg.go.dev/go.temporal.io/sdk/client#Client) API allows you to send a Signal to the current Workflow Execution if one exists or to create a new Execution and send a Signal to it.
`SignalWithStartWorkflow` therefore doesn't take a run Id as a parameter.

### How to receive a Signal

You have to get a Signal Channel first:

```go
var signalVal string
signalChan := workflow.GetSignalChannel(ctx, signalName)

s := workflow.NewSelector(ctx)
s.AddReceive(signalChan, func(c workflow.ReceiveChannel, more bool) {
    c.Receive(ctx, &signalVal)
    workflow.GetLogger(ctx).Info("Received signal!", "Signal", signalName, "value", signalVal)
})
s.Select(ctx)

if len(signalVal) > 0 && signalVal != "SOME_VALUE" {
    return errors.New("signalVal")
}
```

In the example above, the Workflow code uses **workflow.GetSignalChannel** to open a **workflow.Channel** for the named signal.
We then use a [**workflow.Selector**](https://docs.temporal.io/docs/go/selectors) and `AddReceive` to wait on this channel and process the payload received with the signal. A callback function is passed to `AddReceive` and is called to handle the payload once it's received. The `more` bool in the callback function indicates that channel is not closed and more deliveries are possible.

### Signal with structs

You can also send structs in Signals, as long as the struct is [serializable](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
`Receive()` decodes data into the struct within the Workflow.
Note that Temporal only serializes public fields.

```go
// Make sure all fields you want to serialize are public. Temporal
// serializes `Message`, not `message` because fields that start with lowercase
// letters are private in Go.
MySignal struct {
	Message string
}

signalChan := workflow.GetSignalChannel(ctx, signalName)

s := workflow.NewSelector(ctx)
s.AddReceive(signalChan, func(c workflow.ReceiveChannel, more bool) {
    var signalVal MySignal
	c.Receive(ctx, &signalVal)

    if err != nil {
        workflow.GetLogger(ctx).Error("Received err!", err.Message)
    }

    workflow.GetLogger(ctx).Info("Received message!", signalVal.Message)
})
s.Select(ctx)
```

## Signalling external Workflows

Workflows can send signals to other workflows with `SignalExternalWorkflow`, including across namespace boundaries.

This is in contrast to how signals are normally used, for example, messages from the application layer (eg an API endpoint handler) to the workflow.

Sample code:

```go
workflow.SignalExternalWorkflow(ctx, "SimpleWorkflowJava", "", "receiveMessage", "Hello from Go")
```

See our [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.
