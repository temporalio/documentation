---
id: how-to-set-activity-retry-options-in-php
title: How to set Activity Retry Options in PHP
sidebar_label: Activity Retry Options
---

To enable Activity Retry, set `{@link RetryOptions}` on `{@link ActivityOptions}`.
The follow example creates a new Activity with the given options.

```php
$this->greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()
        ->withScheduleToCloseTimeout(CarbonInterval::seconds(10))
        ->withRetryOptions(
            RetryOptions::new()
                ->withInitialInterval(CarbonInterval::seconds(1))
                ->withMaximumAttempts(5)
                ->withNonRetryableExceptions([\InvalidArgumentException::class])
        )
);
}
```

For an executable code sample, see [ActivityRetry sample](https://github.com/temporalio/samples-php/tree/master/app/src/ActivityRetry) in the PHP samples repository.
