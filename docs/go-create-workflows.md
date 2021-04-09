---
id: go-create-workflows
title: Creating Workflows
---

### Special Temporal SDK functions and types

The Temporal Go SDK provides a number of functions and types as alternatives to some native
Go functions and types. Usage of these replacement functions/types is necessary in order to ensure
that the Workflow code execution is deterministic and repeatable within an execution context.

Coroutine related constructs:

- **workflow.Go** : This is a replacement for the the **go** statement.
- **workflow.Channel** : This is a replacement for the native **chan** type. Temporal provides
  support for both buffered and unbuffered channels.
- **workflow.Selector** : This is a replacement for the **select** statement. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go-selectors) page.

Time related functions:

- **workflow.Now()** : This is a replacement for **time.Now()**.
- **workflow.Sleep()** : This is a replacement for **time.Sleep()**.

### Failing a Workflow

To mark a Workflow as failed, all that needs to happen is for the Workflow function to return an
error via the **err** return value.

## Registration

For some client code to be able to invoke a Workflow type, the Worker process needs to be aware of all the implementations it has access to.
A Workflow is registered with a Worker with the following call:

```go
w := worker.New(sdkClient, "your_task_queue", worker.Options{})
w.RegisterWorkflow(SimpleWorkflow)
```

This call essentially creates an in-memory mapping inside the Worker process between the fully qualified function name and the implementation.
If the Worker receives tasks for a Workflow type it does not know, it will fail that Task.
However, the failure of the Task will not cause the entire Workflow to fail.
