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

Without Signals, you have only two options for passing data to the Workflow implementation:

- Via start parameters
- As return values from Activities

With start parameters, we can only pass in values before Workflow execution begins.

Return values from Activities allow us to pass information to a running Workflow, but this approach comes with its own complications.
One major drawback is **reliance on polling**.
This means that the data needs to be stored in a third-party location until it's ready to be picked up by the Activity.
Further, the lifecycle of this Activity requires management, and the Activity requires manual restart if it fails before acquiring the data.

**Signals**, on the other hand, provide a fully asynchronous and durable mechanism for providing data to a running Workflow.
When a signal is received for a running Workflow, Temporal persists the event and the payload in the Workflow history.
The Workflow can then process the signal at any time afterwards without the risk of losing the information.
The Workflow also has the option to stop execution by blocking on a **signal channel**.

## Example Signal Code

In Temporal, Signals are sent to and from Signal Channels:

```go
var signalVal string
signalChan := workflow.GetSignalChannel(ctx, signalName)

s := workflow.NewSelector(ctx)
s.AddReceive(signalChan, func(c workflow.Channel, more bool) {
    c.Receive(ctx, &signalVal)
    workflow.GetLogger(ctx).Info("Received signal!", zap.String("signal", signalName), zap.String("value", signalVal))
})
s.Select(ctx)

if len(signalVal) > 0 && signalVal != "SOME_VALUE" {
    return errors.New("signalVal")
}
```

In the example above, the Workflow code uses **workflow.GetSignalChannel** to open a **workflow.Channel** for the named signal.
We then use a [**workflow.Selector**](https://docs.temporal.io/docs/go/selectors) to wait on this channel and process the payload received with the signal.

We can send a Signal to this Workflow using the `SignalWorkflow()` function.
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

You can find more example Signals usage in our [Go Samples](https://github.com/temporalio/samples-go).

## Signalling with structs

You can also send structs in Signals, as long as the struct is [serializable](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
`Receive()` decodes data into a generic map, to decode the value into a struct you should use a library like [mapstructure](https://github.com/mitchellh/mapstructure).
Note that Temporal only serializes public fields.

```go
// Make sure all fields you want to serialize are public. Temporal
// serializes `Message`, not `message`.
MySignal struct {
	Message string
}

signalChan := workflow.GetSignalChannel(ctx, signalName)

s := workflow.NewSelector(ctx)
s.AddReceive(signalChan, func(c workflow.Channel, more bool) {
    var rawSignalVal interface{}
	c.Receive(ctx, &rawSignalVal)

    // Using github.com/mitchellh/mapstructure
    var signalVal MyStruct
	err := mapstructure.Decode(rawSignalVal, &signalVal)
    if err != nil {
        workflow.GetLogger(ctx).Error("Received err!", err.Message)
        return err
    }

    workflow.GetLogger(ctx).Info("Received message!", signalVal.Message)
})
s.Select(ctx)
```

## Signalling regardless of running status

You may not know if a Workflow is running and can accept a signal.
The [client.SignalWithStartWorkflow](https://pkg.go.dev/go.temporal.io/sdk/client#Client) API allows you to send a signal to the current Workflow instance if one exists or to create a new run and then send the signal.
`SignalWithStartWorkflow` therefore doesn't take a run Id as a parameter.

## Signalling external Workflows

Workflows can send signals to other workflows with `SignalExternalWorkflow`, including across namespace boundaries.

This is in contrast to how signals are normally used, for example, messages from the application layer (eg an API endpoint handler) to the workflow.

Sample code:

```go
workflow.SignalExternalWorkflow(ctx, "SimpleWorkflowJava", "", "receiveMessage", "Hello from Go")
```

See our [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.
