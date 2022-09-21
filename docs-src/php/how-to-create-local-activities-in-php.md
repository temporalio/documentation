---
id: how-to-execute-a-local-activity-in-php
title: How to execute a Local Activity in PHP
sidebar_label: Local Activity
---

To execute a Local Activity, use `#[LocalActivityInterface]`.

```php
use Temporal\Activity\LocalActivityInterface;

#[ActivityInterface]
interface YourActivityInterface
{
    #[ActivityMethod("youractivity")]
    public function youractivity(): string;
}
```

Local Activities requires `LocalActivityOptions`:

```php
$greetingActivity = Workflow::newActivityStub(
    YourActivityInterface::class,
    LocalActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 seconds'))
);
```

Local Activity Execution options include the following:

- `ScheduleToCloseTimeout`
- `StartToCloseTimeout`
- `RetryPolicy`.
