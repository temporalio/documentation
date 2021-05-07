---
id: error-handling
title: Error handling in PHP
sidebar_label: Error handling
---

An Activity, or a child Workflow, might fail, and you could handle errors differently based on the different
error cases.

If the Activity returns throws an exception, that exception will
be converted to `Temporal\Exception\Failure\ApplicationFailure` and wrapped
inside `Temporal\Exception\Failure\ActivityFailure` or `Temporal\Exception\Failure\ChildWorkflowFailure`.

It is possible to throw `ApplicationFailure` manually with the ability to set `nonRetryable` flag.

There are other types of exceptions such as `TimeoutFailure`, `CanceledFailure` and
`ServerFailure`.

> All temporal related exceptions has suffix `Failure` for easier comprehension.

Here's an example of handling Activity errors within Workflow code that differentiates between different error types.

```php
use Temporal\Exception\Failure;
use Temporal\Api\Enums\V1\TimeoutType;

$myActivity = Workflow::newActivityStub(
    MyActivityInterface::class,
    ActivityOptions::new()->withScheduleToStartTimeout(60)
);

try {
    yield $myActivity->doSomething();
} catch(Failure\ActivityFailure $e) {
    $cause = $e->getPrevious();

    if ($cause instanceof Failure\ApplicationFailure) {
        // domain code error
        $originalError = $cause->getType();
        $originalMessage = $cause->getOriginalMessage();

        // optional: additional error details
        $value = $cause->getDetails()->getValue(0, Type::TYPE_STRING);
    }

     if ($cause instanceof Failure\TimeoutFailure) {
        switch ($cause->getTimeoutType()) {
            case TimeoutType::TIMEOUT_TYPE_START_TO_CLOSE:
                // handle start to close timeout
                break;
            case TimeoutType::TIMEOUT_TYPE_SCHEDULE_TO_CLOSE:
                // handle schedule to close timeout
                break;
            case TimeoutType::TIMEOUT_TYPE_SCHEDULE_TO_START:
                // handle schedule to start timeout
                break;
            case TimeoutType::TIMEOUT_TYPE_HEARTBEAT:
                // handle heartbeat timeout

                // last recorded heartbeat (optional)
                $heartbeatDetails = $cause->getLastHeartbeatDetails();
                break;
        }
    }

    if($cause instanceof Failure\CanceledFailure){
        // activity was canceled
    }

    if ($cause instanceof Failure\ServerFailure) {
        // handle server error
    }
}
```
