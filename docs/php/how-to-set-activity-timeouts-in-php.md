---
id: how-to-set-activity-timeouts-in-php
title: How to set Activity Timeouts in PHP
sidebar_label: Activity Timeouts
---

Because Activities are reentrant, only a single stub can be used for multiple Activity invocations.

Available timeouts are:

- withScheduleToCloseTimeout()
- withStartToCloseTimeout()
- withScheduleToStartTimeout()

```php
$this->greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    // Set Activity Timeout duration
    ActivityOptions::new()
        ->withScheduleToCloseTimeout(CarbonInterval::seconds(2))
        // ->withStartToCloseTimeout(CarbonInterval::seconds(2))
        // ->withScheduleToStartTimeout(CarbonInterval::seconds(10))
);
```
