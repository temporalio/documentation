---
id: go-activities
title: Activities
---

An Activity is the implementation of a particular task in the business logic.

Activities are implemented as functions. Data can be passed directly to an Activity via function
parameters. The parameters can be either basic types or structs, with the only requirement being that
the parameters must be serializable. Though it is not required, we recommend that the first parameter
of an Activity function is of type `context.Context`, in order to allow the Activity to interact with
other framework methods. The function must return an `error` value, and can optionally return a result
value. The result value can be either a basic type or a struct with the only requirement being that
it is serializable.

The values passed to Activities through invocation parameters or returned through the result value
are recorded in the execution history. The entire execution history is transferred from the Temporal
service to Workflow workers with every event that the Workflow logic needs to process. A large execution
history can thus adversely impact the performance of your Workflow. Therefore, be mindful of the amount
of data you transfer via Activity invocation parameters or return values. Otherwise, no additional
limitations exist on Activity implementations.

## Overview

The following example demonstrates a simple Activity that accepts a string parameter, appends a word
to it, and then returns a result.

```go
package sample

import (
	"context"

	"go.uber.org/zap"

	"go.temporal.io/sdk/activity"
)

// SimpleActivity is a sample Temporal Activity function that takes one parameter and
// returns a string containing the parameter value.
func SimpleActivity(ctx context.Context, value string) (string, error) {
	activity.GetLogger(ctx).Info("SimpleActivity called.", zap.String("Value", value))
	return "Processed: " + value, nil
}
```
Let's take a look at each component of this Activity.

### Declaration

In the Temporal programing model, an Activity is implemented with a function. The function declaration specifies the parameters the Activity accepts as well as any values it might return. An Activity function can take zero or many Activity specific parameters and can return one or two values. It must always at least return an error value. The Activity function can accept as parameters and return as results any serializable type.

`func SimpleActivity(ctx context.Context, value string) (string, error)`

The first parameter to the function is context.Context. This is an optional parameter and can be omitted. This parameter is the standard Go context.
The second string parameter is a custom Activity specific parameter that can be used to pass data into the Activity on start. An Activity can have one or more such parameters. All parameters to an Activity function must be serializable, which essentially means that params can’t be channels, functions, variadic, or unsafe pointers.
The Activity declares two return values: string and error. The string return value is used to return the result of the Activity. The error return value is used to indicate that an error was encountered during execution.

### Implementation

You can write Activity implementation code in the same way that you would any other Go service code.
Additionally, you can use the usual loggers and metrics controllers, and the standard Go concurrency
constructs.

#### Heart Beating

For long-running Activities, Temporal provides an API for the Activity code to report both liveness and
progress back to the Temporal managed service.

```go
progress := 0
for hasWork {
    // Send heartbeat message to the server.
    activity.RecordHeartbeat(ctx, progress)
    // Do some work.
    ...
    progress++
}
```
When an Activity times out due to a missed heartbeat, the last value of the details (`progress` in the
above sample) is returned from the `workflow.ExecuteActivity` function as the details field of `TimeoutError`
with `TimeoutType` set to `Heartbeat`.

You can also heartbeat an Activity from an external source:

```go
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{
    HostPort:     HostPort,
    Namespace:   Namespace,
    MetricsScope: scope,
})

// Record heartbeat.
err := serviceClient.RecordActivityHeartbeat(ctx, taskToken, details)
```
The parameters of the `RecordActivityHeartbeat` function are:

* `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
the Activity.
* `details`: The serializable payload containing progress information.

#### Cancellation

When an Activity is cancelled, or its Workflow execution has completed or failed, the context passed
into its function is cancelled, which sets its channel’s closed state to `Done`. An Activity can use that
to perform any necessary cleanup and abort its execution. Cancellation is only delivered to Activities
that call `RecordActivityHeartbeat`.

### Registration

To make the Activity visible to the Worker process hosting it, the Activity must be registered with the Worker.

```go
w := worker.New(temporalClient, "your_task_queue", worker.Options{})
w.RegisterActivity(YourActivity)
```

This call creates an in-memory mapping inside the Worker process between the function name and the function itself.
If a Worker receives a request to start an Activity execution for an Activity function it does not know, it will fail that request.

To register multiple Activities with the Worker, just make multiple Activity registration calls, but make sure each Activity function name is unique:

```
w.registerActivity(ActivityA)
w.registerActivity(ActivityB)
w.registerActivity(ActivityC)
```

## Failing an Activity

To mark an Activity as failed, the Activity function must return an error via the `error` return value.
