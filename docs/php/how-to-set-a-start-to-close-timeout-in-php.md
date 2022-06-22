---
id: how-to-set-a-start-to-close-timeout-in-php
title: How to set Start-to-Close Timeout in PHP
sidebar_label: Start-to-Close Timeout
---

Because Activities are reentrant, only a single stub can be used for multiple Activity invocations.
The following code creates an Activity with a `StartToCloseTimeout` set to 2 seconds.

```php
$this->greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()->withStartToCloseTimeout(CarbonInterval::seconds(2))
);
```
