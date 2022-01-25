---
id: workflows
title: Workflows in Go
sidebar_label: Workflows
description: In the Temporal Go SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
---

### External Workflows

You can execute Workflows (including those from other language SDKs) by their type name:

```go

workflowID := "myworkflow_" + uuid.New()
workflowOptions := client.StartWorkflowOptions{
  ID:        workflowID,
  TaskQueue: "mytaskqueue",
}

we, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, "MySimpleWorkflow")
if err != nil {
  log.Fatalln("Unable to execute workflow", err)
}
log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
```

In the above example, `client` is imported from the "go.temporal.io/sdk/client" package. And `temporalClient` is an instance of the Temporal Client instantiated outside of the snippet.
Here we spawn a Workflow Execution by its Workflow Type name `MySimpleWorkflow`. By default, the
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
