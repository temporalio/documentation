---
id: how-to-create-local-activities-in-php
title: Create local Activities in PHP
sidebar_label: Local Activity
---

To create a local Activity, use `#[LocalActivityInterface]`.

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

Local Activities have a limited set of options, including: `ScheduleToCloseTimeout`, `StartToCloseTimeout`, `RetryPolicy`.
