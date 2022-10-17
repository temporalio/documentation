---
id: retries
title: Activity and Workflow Retries
---

:::info Try the Developer's guide

The majority of this information has moved into the [Developer's guide](/application-development/?lang=php).

However, if you can't find what you are looking for there, we recommend checking this doc set as well.

:::

Activities and Workflows can fail for a number of expected and unexpected reasons.
In most failure cases, we want to retry the failed Activity or child Workflow or even the parent Workflow.
By default, Temporal retries Activities, but not Workflows.
To change the default behavior, a custom retry policy can be provided.

To change the default behavior, a custom retry policy can be provided.

A retry policy is defined as a `Temporal\Common\RetryOptions` object:

```php
use Temporal\Common\RetryOptions;

$retry = RetryOptions::new()

    // Backoff interval for the first retry. If coefficient is 1.0
    // then it is used for all retries. Required, no default value.
    ->withInitialInterval(120) // seconds or DateInterval

    // Coefficient used to calculate the next retry backoff interval.
    // The next retry interval is previous interval multiplied
    // by this coefficient.
    // Must be 1 or larger. Default is 2.0.
    ->withBackoffCoefficient(1)

    // Maximum backoff interval between retries. Exponential backoff
    // leads to interval increase. This value is the cap of the interval.
    // Default is 100x of initial interval.
    ->withMaximumInterval(600) // seconds or DateInterval

    // Maximum number of attempts. When exceeded the retries stop even
    // if not expired yet. If not set or set to 0, it means unlimited
    ->withMaximumAttempts(10)

    // Non-Retriable errors. This is optional. Temporal server will stop
    // retry if error type matches this list.
    //
    // Note:
    //  - cancellation is not a failure, so it won't be retried,
    //  - only StartToClose or Heartbeat timeouts are retryable.
    ->withNonRetryableExceptions([\App\DatabaseException::class]);
```

To enable or customize retries, provide a custom retry policy as part of `ActivityOptions` or `ChildWorkflowOptions`.

```php
$greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()
        ->withScheduleToCloseTimeout(CarbonInterval::seconds(10))
        ->withRetryOptions(
            RetryOptions::new()->withMaximumAttempts(10)
        )
);
```

If an Activity heartbeat its progress before it failed, the retry attempt will have access to the progress information,
so that the Activity implementation could resume from the failed step. Here's an example of how this can be implemented:

```php
use Temporal\Activity;
use Temporal\DataConverter\Type;
// ...

#[Activity\ActivityInterface('YourActivity_')]
class YourActivity
{
  public function sampleActivity(int $startIndex, int $lastIndex)
  {
      if (Activity::hasHeartbeatDetails()) {
          // Recover from finished progress.
          $lastIndex = Activity::getHeartbeatDetails(Type::TYPE_INT);
          $startIndex = $lastIndex + 1;// Start from next one.
      }

      // Normal Activity logic...
      for ($i = $startIndex; $i < $lastIndex; $i++) {
          // Code for processing item i goes here...
          Activity::recordHeartbeat($i); // Report progress.
      }
  }
}
```

To enable retries for a Workflow, you need to provide a retry policy via `ChildWorkflowOptions` for child Workflows or
via `WorkflowOptions` for top-level Workflows.

There are some subtle nuances to how Workflow's history events are recorded when a `RetryOptions` is used.
For an Activity with a `RetryOptions`:

- The `ActivityTaskScheduledEvent` will have extended `ScheduleToStartTimeout` and `ScheduleToCloseTimeout`.
- The `ActivityTaskStartedEvent` will not show up in history until the Activity is completed or failed with no more retry.
  This is to avoid filling the history with noise records of intermittent failures and retries.
  For Activities being retried, `DescribeWorkflowExecution` will return a `PendingActivityInfo` that includes `attemptCount`.

For a Workflow with `RetryOptions`:

- If a Workflow fails and a retry policy is configured for it, the Workflow execution will be closed with a `ContinueAsNew` event.
  This event will have the `ContinueAsNewInitiator` field set to `RetryOptions` and the new `RunId` for the next retry attempt.
- The new attempt will be created immediately. But the first workflow task won't be scheduled until the backoff duration.
  That duration is recorded as the `firstWorkflowTaskBackoff` field of the new run's `WorkflowExecutionStartedEventAttributes` event.
