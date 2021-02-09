---
id: php-activity-async-completion
title: Asynchronous Activity Completion
---

There are certain scenarios when completing an Activity upon completion of its function is not possible
or desirable. For example, you might have an application that requires user input in order to complete
the Activity. You could implement the Activity with a polling mechanism, but a simpler and less
resource-intensive implementation is to asynchronously complete a Temporal Activity.

There are two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies
the Temporal service that it is waiting for that outside callback.
2. The external service calls the Temporal service to complete the Activity.

The following example demonstrates the first part:

```php
use Temporal\Activity;

#[Activity\ActivityInterface('MyActivity.')]
class MyActivity 
{
    public function asyncActivity(): string
    {
        $taskToken = Activity::getInfo()->taskToken; 
    
        // Send the taskToken to the external service that will complete the Activity.
    
        // Return from the Activity a function indicating that Temporal should wait
        // for an async completion message.
        Activity::doNotCompleteOnReturn();
    
        // When doNotCompleteOnReturn() is invoked the return value is ignored.
    
        return 'ignored';
    }
}
```

The following code demonstrates how to complete the Activity successfully using `WorkflowClient`:

```php
$activityClient = $workflowClient->newActivityCompletionClient();

// Complete the Activity.
$activityClient->completeByToken($taskToken, $result);
```

To fail the Activity, you would do the following:

```php
// Fail the Activity.
$activityClient->completeExceptionallyByToken($taskToken, new \Error("activity failed"));
```