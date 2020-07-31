---
id: go-create-workflows
title: Creating Workflows
---

The workflow is the implementation of the coordination logic. The Temporal programming framework
(aka client library) allows you to write the workflow coordination logic as simple procedural code
that uses standard Go data modeling. The client library takes care of the communication between
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

The sample code below shows a simple implementation of a workflow that executes one activity. The
workflow also passes the sole parameter it receives as part of its initialization as a parameter
to the activity.

```go
package sample

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"go.uber.org/zap"
)

// SimpleWorkflow is a sample Temporal workflow function that takes one
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

In the Temporal programing model, a workflow is implemented with a function. The function declaration
specifies the parameters the workflow accepts as well as any values it might return.

```go
    func SimpleWorkflow(ctx workflow.Context, value string) error
```

Let’s deconstruct the declaration above:

- The first parameter to the function is **ctx workflow.Context**. This is a required parameter for
  all workflow functions and is used by the Temporal client library to pass execution context.
  Virtually all the client library functions that are callable from the workflow functions require
  this **ctx** parameter. This **context** parameter is the same concept as the standard
  **context.Context** provided by Go. The only difference between **workflow.Context** and
  **context.Context** is that the **Done()** function in **workflow.Context** returns
  **workflow.Channel** instead the standard go **chan**.
- The second parameter, **string**, is a custom workflow parameter that can be used to pass data
  into the workflow on start. A workflow can have one or more such parameters. All parameters to a
  workflow function must be serializable, which essentially means that params can’t be channels,
  functions, variadic, or unsafe pointers.
- Since it only declares error as the return value, this means that the workflow does not return a
  value. The **error** return value is used to indicate an error was encountered during execution
  and the workflow should be terminated.

## Implementation

In order to support the synchronous and sequential programming model for the workflow
implementation, there are certain restrictions and requirements on how the workflow implementation
must behave in order to guarantee correctness. The requirements are that:

- Execution must be deterministic
- Execution must be idempotent

A straightforward way to think about these requirements is that the workflow code is as follows:

- Workflow code can only read and manipulate local state or state received as return values from
  Temporal client library functions.
- Workflow code should not affect changes in external systems other than through invocation
  of activities.
- Workflow code should interact with **time** only through the functions provided by the Temporal
  client library (i.e. **workflow.Now()**, **workflow.Sleep()**).
- Workflow code should not create and interact with goroutines directly, it should instead use the
  functions provided by the Temporal client library (i.e., **workflow.Go()** instead of **go**,
  **workflow.Channel** instead of **chan**, **workflow.Selector** instead of **select**).
- Workflow code should do all logging via the logger provided by the Temporal client library
  (i.e., **workflow.GetLogger()**).
- Workflow code should not iterate over maps using range because the order of map iteration is randomized.

Now that we have laid the ground rules, we can take a look at some of the special functions and types
used for writing Temporal workflows and how to implement some common patterns.

### Special Temporal SDK functions and types

The Temporal client library provides a number of functions and types as alternatives to some native
Go functions and types. Usage of these replacement functions/types is necessary in order to ensure
that the workflow code execution is deterministic and repeatable within an execution context.

Coroutine related constructs:

- **workflow.Go** : This is a replacement for the the **go** statement.
- **workflow.Channel** : This is a replacement for the native **chan** type. Temporal provides
  support for both buffered and unbuffered channels.
- **workflow.Selector** : This is a replacement for the **select** statement.

Time related functions:

- **workflow.Now()** : This is a replacement for **time.Now()**.
- **workflow.Sleep()** : This is a replacement for **time.Sleep()**.

### Failing a workflow

To mark a workflow as failed, all that needs to happen is for the workflow function to return an
error via the **err** return value.

## Registration

For some client code to be able to invoke a workflow type, the worker process needs to be aware of
all the implementations it has access to. A workflow is registered with the following call:

```go
workflow.Register(SimpleWorkflow)
```

This call essentially creates an in-memory mapping inside the worker process between the fully
qualified function name and the implementation. It is safe to call this registration method from
an **init()** function. If the worker receives tasks for a workflow type it does not know, it will
fail that task. However, the failure of the task will not cause the entire workflow to fail.
