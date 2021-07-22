---
id: how-to-get-the-result-of-a-workflow-execution-in-go
title: How to get the result of a Workflow Execution in Go
tags:
  - guide
---

import DetermineHeader from '../components/DetermineHeader.js'

export const headingText = 'How to get the result of a Workflow Execution in Go'

<DetermineHeader
hLevel={props.heading}
hText={headingText}
/>

The `ExecuteWorkflow` call returns an instance of [`WorkflowRun`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#WorkflowRun), which is the `we` variable below.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, app.YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}
```

The instance of `WorkflowRun` has the following three methods:

- `GetWorkflowID()`: Returns the Workflow Id of the invoked Workflow Execution.
- `GetRunID()`: Always returns the Run Id of the initial Run (See [Continue As New](#)) in the series of Runs that make up the full Workflow Execution.
- `Get`: Takes a pointer as a parameter and populates the associated variable with the Workflow Execution result.

To wait on the result of Workflow Execution in the same process that invoked it, call `Get()` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  var result YourWorkflowResponse
  err = we.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```

However, the result of a Workflow Execution can be obtained from a completely different process, all that is needed is the [Workflow Id](#) and [Run Id](#).
The result of the Workflow Execution is available for as long as it's Execution History remains in the system (See [How long do Workflow Execution Histories persist](#)).

To get the Workflow Id and Run Id, call the `GetWorkflowID` and `GetRunId` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call and store the results.
These values can then be used to get an instance of `WorkflowRun` again by calling `GetWorkflow()` on an instance of the Go SDK Client.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  workflowID := we.GetID()
  WorkflowRunID := we.GetRunID()
  // ...
  we := c.GetWorkflow(context.Background, workflowID, workflowRunID)

  var result YourWorkflowResponse
  err = we.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```
