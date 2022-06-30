---
id: how-to-spawn-an-activity-execution-in-php
title: How to spawn an Activity Execution in PHP
sidebar_label: Spawn an Activity Execution
---

Activity implementation is an implementation of an Activity interface.
The following code example, uses a constructor that takes an Amazon S3 client and a local directory, and uploads a file to the S3 bucket.
Then, the code uses a function to download a file from the S3 bucket passing a bucket name, remote name, and local name as arguments.
Finally, it uses a function that takes a local file name as an argument and returns a string.

```php
// An implementation of an Activity interface.
class FileProcessingActivitiesImpl implements FileProcessingActivities {

    private S3Client $s3Client;

    private string $localDirectory;

    public function __construct(S3Client $s3Client, string $localDirectory) {
        $this->s3Client = $s3Client;
        $this->localDirectory = $localDirectory;
    }

    // Uploading a file to S3.
    public function upload(string $bucketName, string $localName, string $targetName): void
    {
        $this->s3Client->putObject(
            $bucketName,
            $targetName,
            fopen($this->localDirectory . $localName, 'rb+')
        );
    }

// Downloading a file from S3.
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

// A function that takes a local file name as an argument and returns a string.
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
