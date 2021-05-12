---
id: task-queues
title: Task Queues in Go
sidebar_label: Task Queues
---




Start a Workflow:

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

Worker:

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
