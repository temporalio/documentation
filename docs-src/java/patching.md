---
id: patching
title: How to patch Workflows in Java
sidebar_label: Patching
description: Use Patching APIs to update Workflow code in Java
tags:
  - java
  - workflow code
  - versioning
  - patching
---

Use the `Workflow.getVersion` function to return a version of the code that should be executed and then use the returned value to pick a correct branch.
Let's look at an example.

```java
public void processFile(Arguments args) {
    String localName = null;
    String processedName = null;
    try {
        localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());
        processedName = activities.processFile(localName);
        activities.upload(args.getTargetBucketName(), args.getTargetFilename(), processedName);
    } finally {
        if (localName != null) { // File was downloaded.
            activities.deleteLocalFile(localName);
        }
        if (processedName != null) { // File was processed.
            activities.deleteLocalFile(processedName);
        }
    }
}
```

Now we decide to calculate the processed file checksum and pass it to upload.
The correct way to implement this change is:

```java
public void processFile(Arguments args) {
    String localName = null;
    String processedName = null;
    try {
        localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());
        processedName = activities.processFile(localName);
        int version = Workflow.getVersion("checksumAdded", Workflow.DEFAULT_VERSION, 1);
        if (version == Workflow.DEFAULT_VERSION) {
            activities.upload(args.getTargetBucketName(), args.getTargetFilename(), processedName);
        } else {
            long checksum = activities.calculateChecksum(processedName);
            activities.uploadWithChecksum(
                args.getTargetBucketName(), args.getTargetFilename(), processedName, checksum);
        }
    } finally {
        if (localName != null) { // File was downloaded.
            activities.deleteLocalFile(localName);
        }
        if (processedName != null) { // File was processed.
            activities.deleteLocalFile(processedName);
        }
    }
}
```

Later, when all Workflows that use the old version are completed, the old branch can be removed.

```java
public void processFile(Arguments args) {
    String localName = null;
    String processedName = null;
    try {
        localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());
        processedName = activities.processFile(localName);
        // getVersion call is left here to ensure that any attempt to replay history
        // for a different version fails. It can be removed later when there is no possibility
        // of this happening.
        Workflow.getVersion("checksumAdded", 1, 1);
        long checksum = activities.calculateChecksum(processedName);
        activities.uploadWithChecksum(
            args.getTargetBucketName(), args.getTargetFilename(), processedName, checksum);
    } finally {
        if (localName != null) { // File was downloaded.
            activities.deleteLocalFile(localName);
        }
        if (processedName != null) { // File was processed.
            activities.deleteLocalFile(processedName);
        }
    }
}
```

The Id that is passed to the `getVersion` call identifies the change. Each change is expected to have its own Id. But if
a change spawns multiple places in the Workflow code and the new code should be either executed in all of them or
in none of them, then they have to share the Id.