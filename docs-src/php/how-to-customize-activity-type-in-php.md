---
id: how-to-customize-activity-type-in-php
title: How to customize Activity Type in PHP
sidebar_label: Customize Activity Type
description: Customize your Activity Type.
tags:
  - developer-guide
  - sdk
  - php
---

An optional `#[ActivityMethod]` attribute can be used to override a default Activity name.

You can define your own prefix for all Activity names by adding the `prefix` option to the `ActivityInterface` attribute.
(The default prefix is empty.)

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

The `#[ActivityInterface("file_activities.")]` is an attribute that tells the PHP SDK to generate a class to implement the `FileProcessingActivities` interface. The functions define Activities that are used in the Workflow.
