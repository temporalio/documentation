---
id: how-to-develop-an-activity-definition-in-php
title: Develop an Activity Definition in PHP
sidebar_label: Activity Definition
description: Develop an Activity Definition in PHP
tags:
 - activity
 - activity definition
---

Activities are defined as methods of a plain PHP interface annotated with `#[ActivityInterface]`.

Following is an example of an interface that defines four Activities:

```php
#[ActivityInterface]
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
