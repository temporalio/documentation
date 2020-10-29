---
id: java-implementing-activities
title: Implementing activities
---

Activity implementation is an implementation of an Activity interface. A single instance of the Activities implementation
is shared across multiple simultaneous Activity invocations. Therefore, the Activity implementation code must be *thread safe*.

The values passed to Activities through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers when a Workflow state needs to recover.
A large execution history can thus adversely impact the performance of your Workflow. Therefore, be mindful of the amount of data you transfer via Activity invocation parameters or return values. Otherwise, no additional limitations exist on Activity implementations.

```java
public class FileProcessingActivitiesImpl implements FileProcessingActivities {

    private final AmazonS3 s3Client;

    private final String localDirectory;

    void upload(String bucketName, String localName, String targetName) {
        File f = new File(localName);
        s3Client.putObject(bucket, remoteName, f);
    }

    String download(String bucketName, String remoteName, String localName) {
        // Implementation omitted for brevity.
        return downloadFileFromS3(bucketName, remoteName, localDirectory + localName);
    }

    String processFile(String localName) {
        // Implementation omitted for brevity.
        return compressFile(localName);
    }

    void deleteLocalFile(String fileName) {
        File f = new File(localDirectory + fileName);
        f.delete();
    }
}
```

## Accessing Activity Info

The [Activity](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/Activity.html)
class provides static getters to access information about the Workflow that invoked it. Note that this information is stored in a thread local variable. Therefore, calls to Activity accessors succeed only in the thread that invoked the Activity function.

```java
public class FileProcessingActivitiesImpl implements FileProcessingActivities {

     @Override
     public String download(String bucketName, String remoteName, String localName) {
        log.info("namespace=" +  Activity.getNamespace());
        WorkflowExecution execution = Activity.getWorkflowExecution();
        log.info("workflowId=" + execution.getWorkflowId());
        log.info("runId=" + execution.getRunId());
        ActivityTask activityTask = Activity.getTask();
        log.info("activityId=" + activityTask.getActivityId());
        log.info("activityTimeout=" + activityTask.getStartToCloseTimeoutSeconds());
        return downloadFileFromS3(bucketName, remoteName, localDirectory + localName);
     }
     ...
 }
```

## Asynchronous Activity Completion

Sometimes an Activity lifecycle goes beyond a synchronous method invocation. For example, a request can be put in a queue
and later a reply comes and is picked up by a different worker process. The whole request-reply interaction can be modeled
as a single Temporal Activity.

To indicate that an Activity should not be completed upon its method return, call `Activity.doNotCompleteOnReturn()` from the
original Activity thread. Then later, when replies come, complete the Activity using [ActivityCompletionClient](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/ActivityCompletionClient.html).
To correlate Activity invocation with completion, use either `TaskToken` or Workflow and Activity Ids.

```java
public class FileProcessingActivitiesImpl implements FileProcessingActivities {

     public String download(String bucketName, String remoteName, String localName) {
         byte[] taskToken = Activity.getTaskToken(); // Used to correlate reply.
         asyncDownloadFileFromS3(taskToken, bucketName, remoteName, localDirectory + localName);
         Activity.doNotCompleteOnReturn();
         return "ignored"; // Return value is ignored when doNotCompleteOnReturn was called.
     }
     ...
}
```
When the download is complete, the download service potentially calls back from a different process:
```java
    public <R> void completeActivity(byte[] taskToken, R result) {
        completionClient.complete(taskToken, result);
    }

    public void failActivity(byte[] taskToken, Exception failure) {
        completionClient.completeExceptionally(taskToken, failure);
    }
```

## Activity Heart Beating

Some Activities are long running. To react to a crash quickly, use a heartbeat mechanism. `Activity.getExecutionContext().heartbeat()` lets the Temporal service know that the Activity is still alive. You can piggyback `details` on an Activity heartbeat. If an Activity times out, the last value of `details` is included in the `ActivityTimeoutException` delivered to a Workflow. Then the Workflow can pass the details to the next Activity invocation. This acts as a periodic checkpoint mechanism for the progress of an Activity.

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
                /*
                 * Let the service know about the download progress.
                 */
                 Activity.getExecutionContext().heartbeat(totalRead);
            }
        } finally {
            inputStream.close();
        }
     }
     ...
}
```
