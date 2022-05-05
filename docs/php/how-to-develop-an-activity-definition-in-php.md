---
id: how-to-develop-an-activity-definition-in-php
title: Develop an Activity Definition in PHP
sidebar_label: Activity Definition
---

An Activity is a manifestation of a particular Task in the business logic.

Activities are defined as methods of a plain PHP interface annotated with `#[ActivityInterface]`.
(You can also use PHP 8 attributes in PHP 7.)
in PHP 7 as well).

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
