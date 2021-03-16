---
id: go-create-workflows
title: Creating Workflows
---

The Workflow is the implementation of the coordination logic. The Temporal programming framework
(aka Go SDK) allows you to write the Workflow coordination logic as simple procedural code
that uses standard Go data modeling. The Go SDK takes care of the communication between
the worker service and the Temporal service, and ensures state persistence between events even in
case of worker failures. Furthermore, any particular execution is not tied to a particular worker
machine. Different steps of the coordination logic can end up executing on different worker
instances, with the framework ensuring that the necessary state is recreated on the worker executing
the step.

However, in order to facilitate this operational model, both the Temporal programming framework and
the managed service impose some requirements and restrictions on the implementation of the
coordination logic. The details of these requirements and restrictions are described in the
**Implementation** section below.

## Overview

The sample code below shows a simple implementation of a Workflow that executes one Activity. The
Workflow also passes the sole parameter it receives as part of its initialization as a parameter
to the Activity.

```go
package sample

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"go.uber.org/zap"
)

// SimpleWorkflow is a sample Temporal Workflow function that takes one
// string parameter 'value' and returns an error.
func SimpleWorkflow(ctx workflow.Context, value string) error {
	ao := workflow.ActivityOptions{
		TaskQueue:               "sampleTaskQueue",
		ScheduleToCloseTimeout: time.Second * 60,
		ScheduleToStartTimeout: time.Second * 60,
		StartToCloseTimeout:    time.Second * 60,
		HeartbeatTimeout:       time.Second * 10,
		WaitForCancellation:    false,
	}
	ctx = workflow.WithActivityOptions(ctx, ao)

	var result string
	err := workflow.ExecuteActivity(ctx, SimpleActivity, value).Get(ctx, &result)
	if err != nil {
		return err
	}

	workflow.GetLogger(ctx).Info("Done", zap.String("result", result))
	return nil
}
```

## Declaration

In the Temporal programing model, a Workflow is implemented with a function. The function declaration
specifies the parameters the Workflow accepts as well as any values it might return.

```go
    func SimpleWorkflow(ctx workflow.Context, value string) error
```

Let’s deconstruct the declaration above:

- The first parameter to the function is **ctx workflow.Context**. This is a required parameter for
  all Workflow functions and is used by the Temporal Go SDK to pass execution context.
  Virtually all the Go SDK functions that are callable from the Workflow functions require
  this **ctx** parameter. This **context** parameter is the same concept as the standard
  **context.Context** provided by Go. The only difference between **workflow.Context** and
  **context.Context** is that the **Done()** function in **workflow.Context** returns
  **workflow.Channel** instead the standard go **chan**.
- The second parameter, **string**, is a custom Workflow parameter that can be used to pass data
  into the Workflow on start. A Workflow can have one or more such parameters. All parameters to a
  Workflow function must be serializable, which essentially means that params can’t be channels,
  functions, variadic, or unsafe pointers.
- Since it only declares error as the return value, this means that the Workflow does not return a
  value. The **error** return value is used to indicate an error was encountered during execution
  and the Workflow should be terminated.

## Implementation

In order to support the synchronous and sequential programming model for the Workflow
implementation, there are certain restrictions and requirements on how the Workflow implementation
must behave in order to guarantee correctness. The requirements are that:

- Execution must be deterministic
- Execution must be idempotent

A straightforward way to think about these requirements is that the Workflow code is as follows:

- Workflow code can only read and manipulate local state or state received as return values from
  Temporal Go SDK functions.
- Workflow code should not affect changes in external systems other than through invocation
  of Activities.
- Workflow code should interact with **time** only through the functions provided by the Temporal
  Go SDK (i.e. **workflow.Now()**, **workflow.Sleep()**).
- Workflow code should not create and interact with goroutines directly, it should instead use the
  functions provided by the Temporal Go SDK (i.e., **workflow.Go()** instead of **go**,
  **workflow.Channel** instead of **chan**, **workflow.Selector** instead of **select**).
- Workflow code should do all logging via the logger provided by the Temporal Go SDK
  (i.e., **workflow.GetLogger()**).
- Workflow code should not iterate over maps using range because the order of map iteration is randomized.

Now that we have laid the ground rules, we can take a look at some of the special functions and types
used for writing Temporal Workflows and how to implement some common patterns.

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
