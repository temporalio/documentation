---
id: how-to-spawn-an-activity-execution-in-php
title: How to spawn an Activity Execution in PHP
sidebar_label: Spawn an Activity Execution
---

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
