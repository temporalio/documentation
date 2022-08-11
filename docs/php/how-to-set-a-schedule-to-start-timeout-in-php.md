---
id: how-to-set-a-schedule-to-start-timeout-in-php
title: How to set Schedule-to-Start Timeout in PHP
sidebar_label: Schedule-to-Start Timeout
---

Because Activities are reentrant, only a single stub can be used for multiple Activity invocations.
The following code creates an Activity with a `ScheduleToStartTimeout` set to 10 seconds.

```php
// Creating a stub for the activity.
        $this->greetingActivity = Workflow::newActivityStub(
            GreetingActivityInterface::class,
            ActivityOptions::new()
                ->withScheduleToStartTimeout(CarbonInterval::seconds(10))
        );
```
