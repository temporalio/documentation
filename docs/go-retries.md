---
id: go-retries
title: Activity and Workflow Retries
---

Activities and Workflows can fail for a number of expected and unexpected reasons.
In most failure cases, we want to retry the failed Activity or child Workflow or even the parent Workflow.
By default, Temporal retries Activities, but not Workflows.
To change the default behavior, a custom retry policy can be provided.

A retry policy is defined as a `RetryPolicy` struct:

```go
// RetryPolicy defines the retry policy.
RetryPolicy struct {
    // Backoff interval for the first retry. If coefficient is 1.0 then it is used for all retries.
    // Required, no default value.
    InitialInterval time.Duration

    // Coefficient used to calculate the next retry backoff interval.
    // The next retry interval is previous interval multiplied by this coefficient.
    // Must be 1 or larger. Default is 2.0.
    BackoffCoefficient float64

    // Maximum backoff interval between retries. Exponential backoff leads to interval increase.
    // This value is the cap of the interval. Default is 100x of initial interval.
    MaximumInterval time.Duration

    // Maximum number of attempts. When exceeded the retries stop even if not expired yet.
    // If not set or set to 0, it means unlimited
    MaximumAttempts int32

    // Non-Retriable errors. This is optional. Temporal server will stop retry if error type matches this list.
    // Note:
    //  - cancellation is not a failure, so it won't be retried,
    //  - only StartToClose or Heartbeat timeouts are retryable.
    NonRetryableErrorTypes []string
}
```

To enable or customize retries, provide a custom retry policy as part of `ActivityOptions` or `ChildWorkflowOptions`.

```go
expiration := time.Minute * 10
retryPolicy := &temporal.RetryPolicy{
    InitialInterval:    time.Second,
    BackoffCoefficient: 2,
    MaximumInterval:    expiration,
    MaximumAttempts:    5,
}
ao := workflow.ActivityOptions{
    ScheduleToStartTimeout: expiration,
    StartToCloseTimeout:    expiration,
    HeartbeatTimeout:       time.Second * 30,
    RetryPolicy:            retryPolicy, // Enable retry.
}
ctx = workflow.WithActivityOptions(ctx, ao)
activityFuture := workflow.ExecuteActivity(ctx, SampleActivity, params)
```

If an Activity heartbeat its progress before it failed, the retry attempt will have access to the progress information, so that the Activity implementation could resume from the failed step.
Here's an example of how this can be implemented:

```go
func SampleActivity(ctx context.Context, inputArg InputParams) error {
    startIdx := inputArg.StartIndex
    if activity.HasHeartbeatDetails(ctx) {
        // Recover from finished progress.
        var finishedIndex int
        if err := activity.GetHeartbeatDetails(ctx, &finishedIndex); err == nil {
            startIdx = finishedIndex + 1 // Start from next one.
        }
    }

    // Normal activity logic...
    for i:=startIdx; i<inputArg.EndIdx; i++ {
        // Code for processing item i goes here...
        activity.RecordHeartbeat(ctx, i) // Report progress.
    }
}
```

To enable retries for a Workflow, you need to provide a retry policy via `ChildWorkflowOptions` for child Workflows or via `StartWorkflowOptions` for top-level Workflows.

There are some subtle nuances to how Workflow's history events are recorded when a `RetryPolicy` is used.
For an Activity with a `RetryPolicy`:

- The `ActivityTaskScheduledEvent` will have extended `ScheduleToStartTimeout` and `ScheduleToCloseTimeout`.
- The `ActivityTaskStartedEvent` will not show up in history until the Activity is completed or failed with no more retry.
  This is to avoid filling the history with noise records of intermittent failures and retries.
  For Activities being retried, `DescribeWorkflowExecution` will return a `PendingActivityInfo` that includes `attemptCount`.

For a Workflow with `RetryPolicy`:

- If a Workflow fails and a retry policy is configured for it, the Workflow execution will be closed with a `ContinueAsNew` event.
  This event will have the `ContinueAsNewInitiator` field set to `RetryPolicy` and the new `RunId` for the next retry attempt.
- The new attempt will be created immediately. But the first decision task won't be scheduled until the backoff duration. That duration is recorded as the `firstDecisionTaskBackoffSeconds` field of the new run's `WorkflowExecutionStartedEventAttributes` event.
