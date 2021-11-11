---
id: workflows
title: Workflows in Go
sidebar_label: Workflows
description: In the Temporal Go SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

### External Workflows

You can execute Workflows (including those from other language SDKs) by their type name:

```go
workflowID := "myworkflow_" + uuid.New()
workflowOptions := client.StartWorkflowOptions{
  ID:        workflowID,
  TaskQueue: "mytaskqueue",
}

we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "MySimpleWorkflow")
if err != nil {
  log.Fatalln("Unable to execute workflow", err)
}
log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
```

Here we execute a workflow by its type name, namely `MySimpleWorkflow`. By default, the
Workflow type is the name of the Workflow function, for example:

```go
func MySimpleWorkflow(ctx workflow.Context) error {
 // Workflow code here...
}
```

Note that you can also set the Workflow type via `RegisterWorkflowOptions` when registering your Workflow
with the Worker, for example:

```go
rwo := workflow.RegisterOptions {
   Name: "MyWorkflow", // Set "MyWorkflow" as the Workflow type
}
w.RegisterWorkflowWithOptions(dynamic.SampleGreetingsWorkflow, rwo)
```

Inside Workflow code you can also signal other workflows using their workflow type using `SignalExternalWorkflow`:

```go
// Send 10 signals to PHP workflow
for i := 0; i < 10; i++ {
    err :=  workflow.SignalExternalWorkflow(ctx, "simple-workflow-php", "", "goMessage", "Hello from Go workflow: "+strconv.Itoa(i)).Get(ctx, nil)
}
```

Here we are sending a signal to a Workflow with type "simple-workflow-php" and signal name "goMessage".

See our [Signals docs](https://docs.temporal.io/docs/go/signals) and [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.

### Querying Workflow State

When you start a Workflow with `ExecuteWorkflow`, a `WorkflowExecution` is returned (which is the `we` variable above).
The `WorkflowExecution` can be used to get the result or capture the WorkflowId.
You can retrieve the result of the Workflow **from a completely different process**, as long as you have the WorkflowId, by using `client.GetWorkflow`.

```go
we = client.GetWorkflow(workflowID)
var result string
we.Get(ctx, &result)
```

## How to cancel a Workflow Execution

Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.

<!--SNIPSTART samples-go-cancellation-cancel-workflow-execution-trigger-->
<!--SNIPEND-->

### How to clean up after a Workflow is cancelled

Workflow Definitions can be written to handle execution cancellation requests with Go's `defer` and the `workflow.NewDisconnectedContext` API.
In the Workflow Definition below, there is a special Activity that handles clean up should the execution be cancelled.

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
<!--SNIPEND-->

## How to get data in or out of a running Workflow

[Signals](/docs/go/signals) are the mechanism by which you can get data into an already running Workflow.

[Queries](/docs/go/queries) are the mechanism by which you can get data out of a currently running Workflow.

## Custom Serialization and Workflow Security

import DataConverter from '../shared/dataconverter.md'

<DataConverter href="https://pkg.go.dev/go.temporal.io/sdk@v1.6.0/converter#DataConverter" continueAsNewURL="#large-event-histories"/>

## Large Event Histories

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

To trigger this behavior, the Workflow function should
terminate by returning the special **ContinueAsNewError** error:

```go
func SimpleWorkflow(ctx workflow.Context, value string) error {
    ...
    return workflow.NewContinueAsNewError(ctx, SimpleWorkflow, value)
}
```

If you need to know whether a Workflow was started via `continueAsNew`, you can check if `workflow.GetInfo(ctx).ContinuedExecutionRunID` is not nil.
