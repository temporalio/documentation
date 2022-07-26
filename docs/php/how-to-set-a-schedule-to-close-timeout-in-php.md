---
id: how-to-set-a-schedule-to-close-timeout-in-php
title: How to set Schedule-to-Close Timeout in PHP
sidebar_label: Schedule-to-Start Timeout
---

Because Activities are reentrant, only a single stub can be used for multiple Activity invocations.
The following code creates an Activity with a `ScheduleToCloseTimeout` set to 2 seconds.

```php
$this->greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()
        ->withScheduleToCloseTimeout(CarbonInterval::seconds(2))
);
```
