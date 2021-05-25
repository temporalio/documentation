---
id: task-queues
title: Task Queues in Go
sidebar_label: Task Queues
---

## What is a Task Queue?

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/go/workflows"
workerLink="/docs/go/workers"
/>

## How to use Task Queues

In Go, a Task Queue is represented in code by name, as a `string`.
There are four places where the name of the Task Queue is supplied by the developer.

1. When starting a Workflow, a Task Queue name must be provided in the `StartWorkflowOptions`.

```go
func main() {
  // Create the client object
  // ...
  // Create Workflow options from the client
  options := client.StartWorkflowOptions{
      TaskQueue: "Workflow-Task-Queue-1",
  }
  // Prepare Workflow args
  // ...
  // Then, execute Workflow
  we, err := c.ExecuteWorkflow(context.Background(), options, WorkflowFunctionName, args)
  if err != nil {
      log.Fatalln("unable to complete Workflow", err)
  }
  // Handle error, result, or store Workflow ID somewhere
  // ...
}
```

2. A Task Queue name must be provided as a parameter when creating a Worker.

```go
func main() {
  // Create the client object
  // ...
  // Create a Worker, passing it the client, TaskQueue name, and any options
  w := worker.New(client, "Workflow-Task-Queue-1", worker.Options{})
  w.RegisterWorkflow(WorkflowFunctionName)
  // Start listening to the Task Queue
  err = w.Run(worker.InterruptCh())
  if err != nil {
      log.Fatalln("unable to start Worker", err)
  }
}
```

A single Worker can listen to only one Task Queue.
And, it is important to remember that the name of the Task Queue the Worker is listening to must match the name of the Task Queue provided in the options to any given Workflow or Activity.

import SharedWorkersTaskQueueRegistrationNote from '../shared/note-workers-task-queue-registration-match.md'

<SharedWorkersTaskQueueRegistrationNote />

3. Optionally, the name of a Task Queue can be provided in the `ActivityOptions` when calling an Activity from a Workflow.

```go
func Workflow(ctx workflow.Context) error {
	activityOptions := workflow.ActivityOptions{
    TaskQueue: "Activity-Task-Queue-1",
    // ...
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	err := workflow.ExecuteActivity(ctx, ActivityFunctionName).Get(ctx, nil)
	if err != nil {
		return err
	}
	return nil
}
```

If a Task Queue name is not provided in the `ActivityOptions`, then the Activity Tasks are placed in the same Task Queue as the Workflow Task Queue.

4. Optionally, the name of a Task Queue can be provided in the `ChildWorkflowOptions` when calling a Child Workflow.

```go
func SampleParentWorkflow(ctx workflow.Context) (string, error) {
	childWorkflowOptions := workflow.ChildWorkflowOptions{
    TaskQueue: "Child-Workflow-Task-Queue-1",
  }
	ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

	var result string
	err := workflow.ExecuteChildWorkflow(ctx, ChildWorkflowFunctionName).Get(ctx, &result)
	if err != nil {
		return "", err
	}
	return result, nil
}
```

If a Task Queue name is not provided in the `ChildWorkflowOptions`, then the Child Workflow Tasks are placed in the same Task Queue as the Parent Workflow Task Queue.
