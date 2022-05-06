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

#### How to customize an Activity type

We recommend to use a single value type argument for Activity methods.
In this way, adding new arguments as fields to the value type is a backward-compatible change.

An optional `#[ActivityMethod]` annotation can be used to override a default Activity name.

You can define your own prefix for all Activity names by adding the `prefix` option to the `YourActivityInterface` annotation.
(The default prefix is empty.)

```php
#[YourActivityInterface("file_activities.")]
interface FileProcessingActivities
{
    public function upload(string $bucketName, string $localName, string $targetName);

    #[ActivityMethod("transcode_file")]
    public function download(string $bucketName, string $remoteName);

    public function processFile(): string;

    public function deleteLocalFile(string $fileName);
}
```

The `#[YourActivityInterface("file_activities.")]` is an annotation that tells the PHP SDK to generate a class to implement the `FileProcessingActivities` interface. The functions define Activites that are used in the Workflow.
