---
id: activity-async-completion
title: Asynchronous Activity Completion
---

There are certain scenarios when moving on from an Activity upon completion of its function is not possible or desirable.
For example, you might have an application that requires user input in order to complete the Activity.
You could implement the Activity with a polling mechanism, but a simpler and less resource-intensive implementation is to asynchronously complete a Temporal Activity.

There are two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies the Temporal service that it is waiting for that outside callback.
2. The external service calls the Temporal service to complete the Activity.

The following example demonstrates the first part:

<!--SNIPSTART samples-php-async-activity-completion-activity-class-->
[app/src/AsyncActivityCompletion/GreetingActivity.php](https://github.com/temporalio/samples-php/blob/master/app/src/AsyncActivityCompletion/GreetingActivity.php)
```php
class GreetingActivity implements GreetingActivityInterface
{
    private LoggerInterface $logger;

    public function __construct()
    {
        $this->logger = new Logger();
    }
    /**
     * Demonstrates how to implement an Activity asynchronously.
     * When {@link Activity::doNotCompleteOnReturn()} is called,
     * the Activity implementation function that returns doesn't complete the Activity.
     */
    public function composeGreeting(string $greeting, string $name): string
    {
        // In real life this request can be executed anywhere. By a separate service for example.
        $this->logger->info(sprintf('GreetingActivity token: %s', base64_encode(Activity::getInfo()->taskToken)));
        // Send the taskToken to the external service that will complete the Activity.
        // Return from the Activity a function indicating that Temporal should wait
        // for an async completion message.
        Activity::doNotCompleteOnReturn();
        // When doNotCompleteOnReturn() is invoked the return value is ignored.
        return 'ignored';
    }
}
```
<!--SNIPEND-->

The following code demonstrates how to complete the Activity successfully using `WorkflowClient`:

<!--SNIPSTART samples-php-async-activity-completion-completebytoken-->
[app/src/AsyncActivityCompletion/CompleteCommand.php](https://github.com/temporalio/samples-php/blob/master/app/src/AsyncActivityCompletion/CompleteCommand.php)
```php
        $client = $this->workflowClient->newActivityCompletionClient();
        // Complete the Activity.
        $client->completeByToken(
            base64_decode($input->getArgument('token')),
            $input->getArgument('message')
        );
```
<!--SNIPEND-->

To fail the Activity, you would do the following:

```php
// Fail the Activity.
$activityClient->completeExceptionallyByToken($taskToken, new \Error("activity failed"));
```
