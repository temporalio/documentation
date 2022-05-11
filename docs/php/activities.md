---
id: activities
title: Activities in PHP
sidebar_label: Activities
---

## Activity interface

An Activity is a manifestation of a particular Task in the business logic.

Activities are defined as methods of a plain PHP interface annotated with `#[ActivityInterface]` (you can use PHP 8 attributes
in PHP7 as well).

Each method defines a single Activity type.
A single Workflow can use more than one Activity interface and call more that one Activity method from the same interface.

The only requirement is that Activity method arguments and return values are serializable to a byte array using the provided [DataConverter](https://github.com/temporalio/sdk-php/blob/master/src/DataConverter/DataConverterInterface.php) interface.
The default implementation uses a JSON serializer, but an alternative implementation can be easily configured.

Following is an example of an interface that defines four Activities:

```php
#[ActivityInterface]
interface FileProcessingActivities
{
    public function upload(string $bucketName, string $localName, string $targetName): void;

    #[ActivityMethod("transcode_file")]
    public function download(string $bucketName, string $remoteName): void;

    public function processFile(): string;

    public function deleteLocalFile(string $fileName): void;
}
```

We recommend to use a single value type argument for Activity methods.
In this way, adding new arguments as fields to the value type is a backwards-compatible change.

An optional `#[ActivityMethod]` annotation can be used to override a default Activity name.

Option `prefix` of `ActivityInterface` annotation will allow you to define your own prefix for all activity names (by
default it's empty).

```php
#[ActivityInterface("file_activities.")]
interface FileProcessingActivities
{
    public function upload(string $bucketName, string $localName, string $targetName);

    #[ActivityMethod("transcode_file")]
    public function download(string $bucketName, string $remoteName);

    public function processFile(): string;

    public function deleteLocalFile(string $fileName);
}
```

## Implementing Activities

Activity implementation is an implementation of an Activity interface.
A single instance of the Activities implementation is shared across multiple simultaneous Activity invocations.
Therefore, the Activity implementation code must be _stateless_.

The values passed to Activities through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers when a Workflow state needs to recover.
A large execution history can thus adversely impact the performance of your Workflow.
Therefore, be mindful of the amount of data you transfer via Activity invocation parameters or return values.

Otherwise, no additional limitations exist on Activity implementations.

```php
class FileProcessingActivitiesImpl implements FileProcessingActivities {

    private S3Client $s3Client;

    private string $localDirectory;

    public function __construct(S3Client $s3Client, string $localDirectory) {
        $this->s3Client = $s3Client;
        $this->localDirectory = $localDirectory;
    }

    public function upload(string $bucketName, string $localName, string $targetName): void
    {
        $this->s3Client->putObject(
            $bucketName,
            $targetName,
            fopen($this->localDirectory . $localName, 'rb+')
        );
    }

    public function download(
        string $bucketName,
        string $remoteName,
        string $localName
    ): void
    {
        $this->s3Client->downloadObject(
            $bucketName,
            $remoteName,
            fopen($this->localDirectory .$localName, 'wb+')
        );
    }

    public function processFile(string $localName): string
    {
        // Implementation omitted for brevity.
        return compressFile($this->localDirectory . $localName);
    }

    public function deleteLocalFile(string $fileName): void
    {
        unlink($this->localDirectory . $fileName);
    }
}
```

### Accessing Activity Info

The [Activity](https://github.com/temporalio/sdk-php/blob/master/src/Activity.php) class provides static getters to access information about the Workflow that invoked it.
Note that this information is stored in a thread local variable.
Therefore, calls to Activity accessors succeed only in the process that invoked the Activity function.

```php
use Temporal\Activity;

class FileProcessingActivitiesImpl implements FileProcessingActivities
{
    // ...

    public function download(
        string $bucketName,
        string $remoteName,
        string $localName
    ): void
    {
        $this->logger->info("namespace=" +  Activity.getNamespace());

        $info = Activity::getInfo();

        $this->logger->info("workflowId=" + $info->workflowExecution->getID());
        $this->logger->info("runId=" + $info->workflowExecution->getRunID());
        $this->logger->info("activityId=" + $info->id);
        $this->logger->info("activityDeadline=" + $info->deadline);

        // ...
    }

    // ...
}
```

### Activity Heart Beating

Some Activities are long-running.
To react to a crash quickly, use the Heartbeat mechanism, `Activity::heartbeat()`, which lets the Temporal Server know that the Activity is still alive.
This acts as a periodic checkpoint mechanism for the progress of an Activity.

You can piggyback `details` on an Activity Heartbeat.
If an Activity times out, the last value of `details` is included in the `TimeoutFailure` delivered to a Workflow.
Then the Workflow can pass the details to the next Activity invocation.
Additionally, you can access the details from within an Activity via `Activity::getHeartbeatDetails`.
When an Activity is retried after a failure `getHeartbeatDetails` enables you to get the value from the last successful Heartbeat.

```php
use Temporal\Activity;

class FileProcessingActivitiesImpl implements FileProcessingActivities
{
    // ...
    public function download(
        string $bucketName,
        string $remoteName,
        string $localName
    ): void
    {
        $this->dowloader->downloadWithProgress(
            $bucketName,
            $remoteName,
            $localName,
            // on progress
            function ($progress) {
                Activity::heartbeat($progress);
            }
        );

        Activity::heartbeat(100); // download complete

        // ...
    }

    // ...
}
```

## Calling Activities

`Workflow::newActivityStub` returns a client-side stub an implements an Activity interface.
The client-side stub can be used within the Workflow code.
It takes the Activity's type and `ActivityOptions` as arguments.

Calling (via `yield`) a method on this interface invokes an Activity that implements this method.
An Activity invocation synchronously blocks until the Activity completes, fails, or times out.
Even if Activity execution takes a few months, the Workflow code still sees it as a single synchronous invocation.
It doesn't matter what happens to the processes that host the Workflow.
The business logic code just sees a single method call.

```php
class GreetingWorkflow implements GreetingWorkflowInterface
{
    private $greetingActivity;

    public function __construct()
    {
        $this->greetingActivity = Workflow::newActivityStub(
            GreetingActivityInterface::class,
            ActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 seconds'))
        );
    }

    public function greet(string $name): \Generator
    {
        // This is a blocking call that returns only after the activity has completed.
        return yield $this->greetingActivity->composeGreeting('Hello', $name);
    }
}
```

If different Activities need different options, like timeouts or a task queue, multiple client-side stubs can be created with different options.

```php
$greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 seconds'))
);

$greetingActivity = Workflow::newActivityStub(
    GreetingActivityInterface::class,
    ActivityOptions::new()->withStartToCloseTimeout(\DateInterval::createFromDateString('30 minutes'))
);
```

## Calling Activities Asynchronously

Sometimes Workflows need to perform certain operations in parallel.

Invoking activity stub without the use of `yield` will return the activity result promise which can be resolved at later moment.
Calling `yield` on promise blocks until a result is available.

> Activity promise also exposes `then` method to construct promise chains.
> Read more about Promises [here](https://github.com/reactphp/promise).

Alternatively you can explicitly wrap your code (including `yield` constucts) using `Workflow::async` which will execute nested code in parallel with main workflow code.
Call `yeild` on Promise returned by `Workflow::async` to merge execution result back to primary workflow method.

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

## Async completion

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
