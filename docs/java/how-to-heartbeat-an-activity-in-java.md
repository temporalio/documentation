---
id: how-to-heartbeat-an-activity-in-java
title: How to Heartbeat an Activity in Java
sidebar_label: Activity Heartbeat
description: Use `Activity.getExecutionContext().heartbeat()` in the Activity implementation code to send updates to the Temporal service that the Activity is still alive.
tags:
  - java
  - developer-guide
---

Use `Activity.getExecutionContext().heartbeat()` in the Activity implementation code to send updates to the Temporal service that the Activity is still alive.

The `Activity.getExecutionContext().heartbeat()` can take an argument which represents Heartbeat `details`.
If an Activity times out, the last Heartbeat `details` will be included in the thrown `ActivityTimeoutException` which can be caught by the calling Workflow.
The Workflow can then use the `details` information to pass to the next Activity invocation if needed.

In the case of Activity retries, the last Heartbeat's `details` are available and can be extracted from the last fail attempt using `Activity.getExecutionContext().getHeartbeatDetails(Class<V> detailsClass)`

Following is an example of using Activity Heartbeat:

```java
public class FileProcessingActivitiesImpl implements FileProcessingActivities {

  @Override
  public String download(String bucketName, String remoteName, String localName) {
    InputStream inputStream = openInputStream(file);
    try {
      byte[] bytes = new byte[MAX_BUFFER_SIZE];
      while ((read = inputStream.read(bytes)) != -1) {
        totalRead += read;
        f.write(bytes, 0, read);
        // Let the Server know about the download progress.
        Activity.getExecutionContext().heartbeat(totalRead);
      }
    } finally{
      inputStream.close();
    }
  }
  ...
}
```
