---
id: how-to-develop-an-activity-definition-in-php
title: Develop an Activity Definition in PHP
sidebar_label: Activity Definition
---

Activities are defined as methods of a plain PHP interface annotated with `#[YourActivityInterface]`.
(You can also use PHP 8 attributes in PHP 7.)

Following is an example of an interface that defines four Activities:

```php
#[YourActivityInterface]
// Defining an interface for the activities.
interface FileProcessingActivities
{
    public function upload(string $bucketName, string $localName, string $targetName): void;

    #[ActivityMethod("transcode_file")]
    public function download(string $bucketName, string $remoteName): void;

    public function processFile(): string;

    public function deleteLocalFile(string $fileName): void;
}
```
