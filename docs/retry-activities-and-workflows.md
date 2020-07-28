---
id: retry-activities-and-workflows
title: How to retry Activities and Workflows
sidebar_label: Retry Activities and Workflows
---

Temporal is built to expect failures from Activities and Workflows. Retrying Activity or Workflow executions is part of what makes the Temporal system fault tolerant.

In this guide we cover the difference between Activity and Workflow retries and how to use them.

## Activity retries

The nature of an [Activity](docs/activities) is to encapsulate logic that is non-deterministic. With Temporal, the paradigm is to not explicitly handle errors and retries within the Activity logic. Instead, the Activity should return the error directly to the Workflow which will trigger a retry per the Activity's retry policy. Each Activity can have its own retry policy, can use a shared one, or not specify one at all and use Temporal's default retry policy. Said another way, if `RetryOptions` are not specified within the `ActivityOptions` then the Activity will be retried per Temporal's default configuration.

It is possible to explicitly handle erorrs and retries within the Activity code. However, one of the benefits of using Temporal's retry feature is that it removes the need to repetitively write the same boilerplate error handling and retry code around every piece of business logic.

The following field values can be customized within the `RetryOptions` of any `ActivityOptions`:

| Field | Type | Description |
|-------|------|-------------|
| `InitialInterval`          | Duration    | Amount of time to wait before retrying. |
| `BackoffCoefficient`       | double      | Rate at which the retry interval will grow (starting from `InitialInterval`). A coefficient of 1 means that the retry interval is always equal to the `InitialInterval`. |
| `MaximumInterval`          | Duration    | Maximum interval between retries. Useful for coefficients greater than 1. |
| `MaximumAttempts`          | int         | Total number of attempts that should be made to execute an activity in the presence of failures. If this limit is exceeded, the error is returned back to the Workflow that invoked the Activity. |
| `NonRetryableErrorReasons` | Exception[] |  Errors that should not be retried. For example, if there is an error for invalid arguments, there's a good chance retrying won't fix the problem. |

The following code snippets provide an example implementation. These values are the same values used by the default retry policy, i.e. what would happen if no `RetryOptions` were specified at all.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Go', value: 'go', },
  ]
}>

<TabItem value="java">

```java
private final RemoteDataActivities activities =
    Workflow.newActivityStub(
        RemoteDataActivity.class,
        ActivityOptions.newBuilder()
        .setScheduleToCloseTimeout(Duration.ofSeconds(10)) // scheduleToClose is required and therefore has no default
        // Here we set the RetryOptions
        .setRetryOptions(
            RetryOptions.newBuilder()
            // Here we set the InitialInternal backoff to 1 second
            .setInitialInterval(Duration.ofSeconds(1))
            // Here we set the BackoffCoefficient (Temporal uses an exponential backoff)
            .setBackoffCoefficient(2.0)
            // Here we set the MaximumInterval backoff to 100 seconds
            .setMaximumInterval(Duration.ofSeconds(100))
            // Here we set the MaximumAttempts
            // 0 is interpreted as infinite
            // To disable Activity retries set maximumAttempts to 1
            .setMaximumAttempts(0)
            .build())
        .build());
```

</TabItem>
<TabItem value="go">

```go
ao := workflow.ActivityOptions{
    RetryPolicy: &temporal.RetryPolicy{
        // Here we set the InitialInternal backoff to 1 second
		InitialInterval:    time.Second,
        // Here we set the BackoffCoefficient (Temporal uses an exponential backoff)
		BackoffCoefficient: 2.0,
        // Here we set the MaximumInterval backoff to 100 seconds
		MaximumInterval:    time.Second * 100,
        // Here we set the MaximumAttempts
        // 0 is interpreted as infinite
        // To disable Activity retries set maximumAttempts to 1
        MaximumAttempts:    0,
	},
}
```

</TabItem>
</Tabs>

In this code snippet we are adjusting only the initial interval and doubling the coefficient:

<Tabs
    defaultValue="java"
    values={[
        { label: 'Java', value: 'java', },
        { label: 'Go', value: 'go', },
    ]
 }>

<TabItem value="java">

```java
private final RemoteDataActivities activities =
    Workflow.newActivityStub(
        RemoteDataActivity.class,
        ActivityOptions.newBuilder()
        .setScheduleToCloseTimeout(Duration.ofSeconds(10))
        .setRetryOptions(
            RetryOptions.newBuilder()
            // Here we specify a custom InitialInterval
            .setInitialInterval(Duration.ofSeconds(2))
            // Here we specify a custom BackoffCoefficient
            .setBackoffCoefficient(4.0)
            .build())
        .build());
```

</TabItem>
<TabItem value="go">

```go
ao := workflow.ActivityOptions{
    RetryPolicy: &temporal.RetryPolicy{
        // Here we specify a custom InitialInternal backoff
        InitialInterval:    time.Second * 2,
        // Here we specify a custom BackoffCoefficient
        BackoffCoefficient: 4.0,
    },
}
ctx = workflow.WithActivityOptions(ctx, ao)
```

</TabItem>
</Tabs>

## Workflow retries

While retrying Activities is enough for the majority of use cases, Temporal also provides a mechanism for retrying an entire Workflow. Workflow level retries can be very useful, such as when your Workflow consists of multiple Activities that rely on a host-specific state. Unlike Activities, Workflows are not retried by default, they must be explicitly configured to occur. 

The follow code snippets are taken from the [Java file processing](https://github.com/temporalio/java-samples/blob/master/src/main/java/io/temporal/samples/fileprocessing/FileProcessingWorkflowImpl.java) and [Go file processing](https://github.com/temporalio/go-samples/tree/master/fileprocessing) samples respectively, which demonstrate Workflow level retries in the context of downloading, processing and uploading a file.

<Tabs
   defaultValue="java"
   values={[
     { label: 'Java', value: 'java', },
     { label: 'Go', value: 'go', },
   ]
 }>

 <TabItem value="java">

```java
@Override
public void processFile(URL source, URL destination) {
    // Create RetryOptions to pass to Workflow.retry 
    // Workflow.retry accepts the same `RetryOptions` available to activities
    RetryOptions retryOptions =
        RetryOptions.newBuilder()
        .setInitialInterval(Duration.ofSeconds(1))
        .build();
    // Here we wrap our Workflow implementation and invoke it using `Workflow.retry`
    // This retries the whole sequence on any failure, potentially on a different host.
    Workflow.retry(
        retryOptions,
        Optional.of(Duration.ofSeconds(10)),
        () - > processFileImpl(source, destination));
}
```

</TabItem>
<TabItem value="go">

```go
sample := "test"
// TODO
```

</TabItem>
</Tabs>

