---
id: implementing-activities
title: Implementing activities
---

Activity implementation is an implementation of an Activity interface. A single instance of the Activities implementation
is shared across multiple simultaneous Activity invocations. Therefore, the Activity implementation code must be *stateless*.

The values passed to Activities through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers when a Workflow state needs to recover.
A large execution history can thus adversely impact the performance of your Workflow. Therefore, be mindful of the amount
of data you transfer via Activity invocation parameters or return values.

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

## Accessing Activity Info

The [Activity](https://github.com/temporalio/sdk-php/blob/master/src/Activity.php) class provides static getters to access
information about the Workflow that invoked it. Note that this information is stored in a thread local variable. Therefore,
calls to Activity accessors succeed only in the process that invoked the Activity function.

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

## Activity Heart Beating

Some Activities are long-running. To react to a crash quickly, use a heartbeat mechanism.
`Activity::heartbeat()` lets the Temporal service know that the Activity is still alive.
You can piggyback `details` on an Activity heartbeat. If an Activity times out, the last value of `details` is included
in the `TimeoutFailure` delivered to a Workflow. Then the Workflow can pass the details to the next Activity
invocation. This acts as a periodic checkpoint mechanism for the progress of an Activity.

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
