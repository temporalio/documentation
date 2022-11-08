---
id: what-is-a-failure
title: What is a Failure?
sidebar_label: Failure
description: A Failure is Temporal's representation of various types of errors that occur in the system.
tags:
  - term
  - explanation
---

A Failure is Temporal's representation of various types of errors that occur in the system. 

There are different types of Failures, and each has a different type in the SDKs and different information in the [protobuf messages](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114) (which are used to communicate with the Cluster and appear in [Event History](/concepts/what-is-an-event-history)).

## Temporal Failure

Most SDKs have a base class that the other Failures extend:

- TS: [`TemporalFailure`](https://typescript.temporal.io/api/classes/client.TemporalFailure)
- Java: [`TemporalFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/TemporalFailure.html)
- Python: [`TemporalError`](https://python.temporal.io/temporalio.exceptions.TemporalError.html)

The base [`Failure` proto message](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114) has these fields:

- `string message`
- `string stack_trace`
- `string source`: The SDK this Failure originated in (for example, `"TypeScriptSDK"`). In some SDKs, this field is used to rehydrate the stack trace into an exception object.
- `Failure cause`: The `Failure` message of the cause of this Failure (if applicable).

## Application Failure

Workflow and Activity code use Application Failures to communicate application-specific failures that happen.
This is the only type of Failure created and thrown by user code.

- TS: [`ApplicationFailure`](https://typescript.temporal.io/api/classes/client.ApplicationFailure)
- Java: [`ApplicationFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/ApplicationFailure.html)
- Go: [`ApplicationError`](https://pkg.go.dev/go.temporal.io/sdk/internal#ApplicationError)
- Python: [`ApplicationError`](https://python.temporal.io/temporalio.exceptions.ApplicationError.html)
- Proto: [`ApplicationFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L37-L41) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)

### Throw from Workflows

In Workflows, if you throw (or return in Go) an error that is not an Application Failure, the Workflow Task will fail and be retried. 
If you throw an Application Failure, the Workflow Execution will fail, and may be retried according to its Retry Policy.

### Throw from Activities

In Activities, you can either throw an Application Failure or another Error to fail the Activity Task. 
In the latter case, the error will be converted to an Application Failure. 
During conversion, the following Application Failure fields are set:

- `type` is set to the error's class name
- `message` is set to `error.message`
- `non_retryable` is set to false
- `details` are set to null
- stack trace is copied

When an [Activity Execution](/concepts/what-is-an-activity-execution) fails, the Application Failure from the last Activity Task will be the `cause` field of the  [ActivityFailure](#activity-failure) thrown in the Workflow.

### Non-retryable

When an Activity or Workflow throws an Application Failure, the Failure's `type` field is matched against a Retry Policy's list of [non-retryable errors](/concepts/what-is-a-retry-policy#non-retryable-errors) to determine whether to retry the Activity or Workflow. 
Activities and Workflow can also avoid retrying by setting an Application Failure's `non_retryable` flag to `true`.

## Cancelled Failure

A Cancelled Failure is thrown when [Cancellation](/concepts/what-is-an-activity-execution#cancellation) has been requested. 
<!-- TODO also link to Workflow Cancellation concept -->

When a Workflow or Activity has been successfully Cancelled, a Cancelled Failure will be the `cause` field of the Activity Failure or "Workflow failed" error.

- TS: [`CancelledFailure`](https://typescript.temporal.io/api/classes/client.CancelledFailure)
- Java: [`CanceledFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/CanceledFailure.html)
- Go: [`CanceledError`](https://pkg.go.dev/go.temporal.io/sdk/internal#CanceledError)
- Python: [`CancelledError`](https://python.temporal.io/temporalio.exceptions.CancelledError.html)
- Proto: [`CanceledFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L48-L50) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)

## Activity Failure

An Activity Failure is delivered to the Workflow Execution when an Activity fails. 
It contains information about the failure and the Activity Execution, for example the Activity Type and Id. 
The reason for the failure will be in the `cause` field. 
For example, if an Activity Execution times out, the `cause` will be a [Timeout Failure](#timeout-failure).

- TS: [`ActivityFailure`](https://typescript.temporal.io/api/classes/client.ActivityFailure)
- Java: [`ActivityFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/ActivityFailure.html)
- Go: [`ActivityError`](https://pkg.go.dev/go.temporal.io/sdk/internal#ActivityError)
- Python: [`ActivityError`](https://python.temporal.io/temporalio.exceptions.ActivityError.html)
- Proto: [`ActivityFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L63-L70) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)

## Child Workflow Failure

A Child Workflow Failure is delivered to the Workflow Execution when a Child Workflow Execution fails. 
It contains information about the failure and the Child Workflow Execution, for example the Workflow Type and Id. 
The reason for the failure will be in the `cause` field. 

- TS: [`ChildWorkflowFailure`](https://typescript.temporal.io/api/classes/client.ChildWorkflowFailure)
- Java: [`ChildWorkflowFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/ChildWorkflowFailure.html)
- Go: [`ChildWorkflowExecutionError`](https://pkg.go.dev/go.temporal.io/sdk/internal#ChildWorkflowExecutionError)
- Python: [`ChildWorkflowError`](https://python.temporal.io/temporalio.exceptions.ChildWorkflowError.html)
- Proto: [`ChildWorkflowExecutionFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L72-L79) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)

## Timeout Failure

Represents the timeout of an [Activity](/application-development/features#activity-timeouts) or [Workflow](/application-development/features#workflow-timeouts) Execution.

When an Activity times out, the last Heartbeat details it emitted is attached.

- TS: [`TimeoutFailure`](https://typescript.temporal.io/api/classes/client.TimeoutFailure)
- Java: [`TimeoutFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/TimeoutFailure.html)
- Go: [`TimeoutError`](https://pkg.go.dev/go.temporal.io/sdk/internal#TimeoutError)
- Python: [`TimeoutError`](https://python.temporal.io/temporalio.exceptions.TimeoutError.html)
- Proto: [`TimeoutFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L43-L46) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)

## Terminated Failure

Used as the `cause` when a Workflow has been Terminated.

- TS: [`TerminatedFailure`](https://typescript.temporal.io/api/classes/client.TerminatedFailure)
- Java: [`TerminatedFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/TerminatedFailure.html)
- Go: [`TerminatedError`](https://pkg.go.dev/go.temporal.io/sdk/internal#TerminatedError)
- Python: [`TerminatedError`](https://python.temporal.io/temporalio.exceptions.TerminatedError.html)
- Proto: [`TerminatedFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L52-L53) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)

## Server Failure

Used for errors that originated in the Cluster.

- TS: [`ServerFailure`](https://typescript.temporal.io/api/classes/client.ServerFailure)
- Java: [`ServerFailure`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/failure/ServerFailure.html)
- Go: [`ServerError`](https://pkg.go.dev/go.temporal.io/sdk/internal#ServerError)
- Python: [`ServerError`](https://python.temporal.io/temporalio.exceptions.ServerError.html)
- Proto: [`ServerFailureInfo`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L55-L57) and [`Failure`](https://github.com/temporalio/api/blob/e381e51864ec8f43a90750ef936705258b8f64b2/temporal/api/failure/v1/message.proto#L81-L114)
