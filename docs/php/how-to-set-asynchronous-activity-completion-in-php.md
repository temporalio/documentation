---
id: how-to-set-asynchronous-activity-completion-in-php
title: How to set asynchronous Activity completion
sidebar_label: Async Activity completion
---

Sometimes Workflows need to perform certain operations in parallel.

Invoking activity stub without the use of `yield` will return the Activity result promise which can be resolved at later moment.
Calling `yield` on promise blocks until a result is available.

> Activity promise also exposes `then` method to construct promise chains.
> Read more about Promises [here](https://github.com/reactphp/promise).

Alternatively you can explicitly wrap your code (including `yield` constucts) using `Workflow::async` which will execute nested code in parallel with main Workflow code.
Call `yeild` on Promise returned by `Workflow::async` to merge execution result back to primary Workflow method.

```php
public function greet(string $name): \Generator
{
    // Workflow::async runs it's activities and child workflows in a separate coroutine. Use keyword yield to merge
    // it back to parent process.

    $first = Workflow::async(
        function () use ($name) {
            $hello = yield $this->greetingActivity->composeGreeting('Hello', $name);
            $bye = yield $this->greetingActivity->composeGreeting('Bye', $name);

            return $hello . '; ' . $bye;
        }
    );

    $second = Workflow::async(
        function () use ($name) {
            $hello = yield $this->greetingActivity->composeGreeting('Hola', $name);
            $bye = yield $this->greetingActivity->composeGreeting('Chao', $name);

            return $hello . '; ' . $bye;
        }
    );

    // blocks until $first and $second complete
    return (yield $first) . "\n" . (yield $second);
}
```

**Async completion**

There are certain scenarios when moving on from an Activity upon completion of its function is not possible or desirable.
For example, you might have an application that requires user input to complete the Activity.
You could implement the Activity with a polling mechanism, but a simpler and less resource-intensive implementation is to asynchronously complete a Temporal Activity.

There are two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies the Temporal service that it is waiting for that outside callback.
2. The external service calls the Temporal service to complete the Activity.

The following example demonstrates the first part:

<!--SNIPSTART samples-php-async-activity-completion-activity-class-->
<!--SNIPEND-->

The following code demonstrates how to complete the Activity successfully using `WorkflowClient`:

<!--SNIPSTART samples-php-async-activity-completion-completebytoken-->
<!--SNIPEND-->

To fail the Activity, you would do the following:

```php
// Fail the Activity.
$activityClient->completeExceptionallyByToken($taskToken, new \Error("activity failed"));
```
