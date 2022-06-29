---
id: how-to-get-the-result-of-an-activity-execution-in-java
title: How to get the result of an Activity Execution
sidebar_label: Activity Execution Result
description: To get the results of an asynchronously invoked Activity method, use the `Promise` `get` method to block until the Activity method result is available.
tags:
  - java
  - developer-guide
---

To get the results of an asynchronously invoked Activity method, use the `Promise` `get` method to block until the Activity method result is available.

Sometimes an Activity Execution lifecycle goes beyond a synchronous method invocation.
For example, a request can be put in a queue and later a reply comes and is picked up by a different Worker process.
The whole request-reply interaction can be modeled as a single Activity.

To indicate that an Activity should not be completed upon its method return, call `ActivityExecutionContext.doNotCompleteOnReturn()` from the original Activity thread.

Then later, when replies come, complete the Activity using the `ActivityCompletionClient`.
To correlate Activity invocation with completion use either a `TaskToken` or Workflow and Activity IDs.

Following is an example of using `ActivityExecutionContext.doNotCompleteOnReturn()`:

```java
public class FileProcessingActivitiesImpl implements FileProcessingActivities {

  public String download(String bucketName, String remoteName, String localName) {

    ActivityExecutionContext ctx = Activity.getExecutionContext();

    // Used to correlate reply
    byte[] taskToken = ctx.getInfo().getTaskToken();

    asyncDownloadFileFromS3(taskToken, bucketName, remoteName, localDirectory + localName);
    ctx.doNotCompleteOnReturn();

    // Return value is ignored when doNotCompleteOnReturn was called.
    return "ignored";
  }
  ...
}
```

When the download is complete, the download service potentially can complete the Activity, or fail it from a different process, for example:

```java
  public <R> void completeActivity(byte[] taskToken, R result) {
    completionClient.complete(taskToken, result);
  }

  public void failActivity(byte[] taskToken, Exception failure) {
    completionClient.completeExceptionally(taskToken, failure);
  }
```
