---
id: java-activities
title: Activities in Java
sidebar_label: Activities
---

## Activity Interface

In Java, Activities are methods of a plain Java interface that are annotated with `@ActivityInterface`.
Each method defines a single Activity type.
A single Workflow can use more than one Activity interface and call more than one Activity method from the same interface.
The only requirement is that Activity method arguments and return values are serializable to a byte array using the provided `io.temporal.common.converter.DataConverter` implementation.
The default implementation uses a JSON serializer, but an alternative implementation can be configured through `io.temporal.client.WorkflowClientOptions.Builder.setDataConverter()`.

Example of an interface that defines four Activities for interacting with S3:

```java
@ActivityInterface
public interface FileProcessingActivities {

  void upload(String bucketName, String localName, String targetName);

  String download(String bucketName, String remoteName);

  // An optional @ActivityMethod annotation can be used to specify the Activity name.
  // By default the method name with the first letter capitalized is used as the Activity name.
  // This interface defines the following Activities: "Upload", "Download", "Transcode" and "DeleteLocalFile".
  @ActivityMethod(name = "Transcode")
  String processFile(String localName);

  void deleteLocalFile(String fileName);
}
```

We recommend using a single value type argument for Activity methods.
In this way, adding new arguments to the value type, as fields, is a backwards-compatible change.

## Activity Implementation

An Activity is the implementation of an Activity interface.
A single instance of the Activity's implementation is shared across multiple simultaneous Activity invocations.
Therefore, the Activity implementation code must be thread safe.

The values passed to Activities through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow Workers when a Workflow state needs to recover.
A large execution history can thus adversely impact the performance of your Workflow.
Therefore, be mindful of the amount of data you transfer via Activity invocation parameters or return values.
Other than that no additional limitations exist on Activity implementations.

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

## Accessing Activity info

The `getExecutionContext()` method returns an `ActivityExecutionContext` which provides static getters to access information about the Workflow that invoked it.
Note that the Activity context information is stored in a thread-local variable.
Therefore, calls to `getExecutionContext()` succeed only within the thread that invoked the Activity function.

```java
public class FileProcessingActivitiesImpl implements FileProcessingActivities {

  @Override
  public String download(String bucketName, String remoteName, String localName) {

    ActivityExecutionContext ctx = Activity.getExecutionContext();
    ActivityInfo info = ctx.getInfo();

    log.info("namespace=" +  info.getActivityNamespace());
    log.info("workflowId=" + info.getWorkflowId());
    log.info("runId=" + info.getRunId());
    log.info("activityId=" + info.getActivityId());
    log.info("activityTimeout=" + info.getStartToCloseTimeoutSeconds());

    return downloadFileFromS3(bucketName, remoteName, localDirectory + localName);
  }
    ...
}
```

## Asynchronous Activity Completion

Sometimes an Activity lifecycle goes beyond a synchronous method invocation.
For example, a request can be put in a queue and later a reply comes and is picked up by a different Worker process.
The whole request-reply interaction can be modeled as a single Temporal Activity.

To indicate that an Activity should not be completed upon its method return, call `ActivityExecutionContext.doNotCompleteOnReturn()` from the original Activity thread.

Then later, when replies come, complete the Activity using `io.temporal.client.ActivityCompletionClient`.
To correlate Activity invocation with completion use either `TaskToken` or Workflow and Activity IDs.

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

When the download is complete, the download service potentially calls back from a different process:

```java
  public <R> void completeActivity(byte[] taskToken, R result) {
    completionClient.complete(taskToken, result);
  }

  public void failActivity(byte[] taskToken, Exception failure) {
    completionClient.completeExceptionally(taskToken, failure);
  }
```

## Activity heartbeats

Some Activities are long running.
To react to a crash quickly, use the heartbeat mechanism.
`Activity.getExecutionContext().heartbeat()` lets the Temporal service know that the Activity is still alive.
You can piggyback `details` on an Activity heartbeat.
If an Activity times out, the last value of `details` is included in the `ActivityTimeoutException` delivered to a Workflow.
Then the Workflow can pass the details to the next Activity invocation.
This acts as a periodic checkpoint mechanism for the progress of an Activity.

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
    }finally{
      inputStream.close();
    }
  }
  ...
}
```

## Throwing Activity errors

If there is a need to return a checked exception from an Activity, do not add the exception to a method signature but instead re-throw it using the `wrap` method.
The library code will unwrap it automatically when propagating the exception to the caller.
There is no need to wrap unchecked exceptions, but it is safe to call this method on them.

The reason for such a design is that returning the originally thrown exception from a remote call (which child Workflow and Activity invocations are) does not allow adding context information regarding a failure, such as Activity and child Workflow Id.

So a stub always throws a subclass of `ActivityFailure` from calls to an Activity and a subclass of `ChildWorkflowFailure` from calls to a child Workflow.
The original exception is attached as a cause to these wrapper exceptions.
So as exceptions are always wrapped adding checked ones to method signature causes more pain than benefit.

Throws original exception if e is `RuntimeException` or `Error`, it never returns.
But return type is not empty to be able to use it as:

```java
try {
  return someCall();
} catch (Exception e) {
  throw Activity.wrap(e);
}
```

If `wrap` returned void it wouldn't be possible to write `throw Activity.wrap` and compiler would complain about missing return.

## Registering Activities

To make the Activity visible to the Worker process hosting it, the Activity must be registered with the Worker.

```java
worker.registerActivitiesImplementations(new YourActivityImpl());
```

This call creates an in-memory mapping inside the Worker process between the fully qualified function name and the implementation.
If a Worker receives a request to start an Activity execution for an Activity type it does not know, it will fail that request.

To register multiple Activities with the Worker, each Activity implementation name must be unique, and you must provide all Activity function names in the registration call like so:

```java
worker.registerActivitiesImplementations(new ActivityA(), new ActivityB(), new ActivityC());
```
