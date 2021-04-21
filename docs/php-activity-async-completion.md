---
id: php-activity-async-completion
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
<!--SNIPEND-->

The following code demonstrates how to complete the Activity successfully using `WorkflowClient`:

<!--SNIPSTART samples-php-async-activity-completion-completebytoken-->
<!--SNIPEND-->

To fail the Activity, you would do the following:

```php
// Fail the Activity.
$activityClient->completeExceptionallyByToken($taskToken, new \Error("activity failed"));
```
