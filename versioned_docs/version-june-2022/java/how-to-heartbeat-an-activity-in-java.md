---
id: how-to-heartbeat-an-activity-in-java
title: How to Heartbeat an Activity in Java
sidebar_label: Activity Heartbeat
description: To inform the Temporal service that the Activity is still alive, use `Activity.getExecutionContext().heartbeat()` in the Activity implementation code.
tags:
  - java
  - developer-guide
---

To inform the Temporal service that the Activity is still alive, use `Activity.getExecutionContext().heartbeat()` in the Activity implementation code.

The `Activity.getExecutionContext().heartbeat()` can take an argument that represents Heartbeat `details`.
If an Activity times out, the last Heartbeat `details` are included in the thrown `ActivityTimeoutException`, which can be caught by the calling Workflow.
The Workflow can then use the `details` information to pass to the next Activity invocation if needed.

In the case of Activity retries, the last Heartbeat's `details` are available and can be extracted from the last failed attempt by using `Activity.getExecutionContext().getHeartbeatDetails(Class<V> detailsClass)`

The following example uses Activity Heartbeat to report the progress of the `download` Activity method.

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
        // Let the Temporal Server know about the download progress.
        Activity.getExecutionContext().heartbeat(totalRead);
      }
    } finally {
      inputStream.close();
    }
  }
  ...
}
```
