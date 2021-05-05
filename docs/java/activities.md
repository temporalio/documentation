---
id: activities
title: Activities in Java
sidebar_label: Activities
---

Activities can be invoked during Workflow execution. Similar to Workflows, Activities in Temporal
Java SDK programming model are classes which implement an Activity Interface:

```java
@ActivityInterface
public interface GreetingActivities {
    String composeGreeting(String greeting, String name);
}
```

Activity interface must be annotated with the `@ActivityInterface`. You can annotate each method in the
Activity interface with the `@ActivityMethod` annotation, but this is completely optional.
Note that the `@ActivityMethod` annotation has a `name` parameter which can be used to define
the activity type. If not specified, the method name is used by default.

### Calling Activities inside Workflows

Similar to Workflows, Activities should only be instantiated via stubs.

`Workflow.newActivityStub` returns a client-side stub that implements an Activity interface.
It takes Activity type and Activity options as arguments.
Activity options allow you to specify different Activity timeout and retry options.

Calling a method on this interface invokes an Activity that implements this method.
An Activity invocation synchronously blocks until the Activity completes, fails, or times out. Even if Activity
execution takes a few months, the Workflow code still sees it as a single synchronous invocation.
It doesn't matter what happens to the processes that host the Workflow. The business logic code
just sees a single method call.

Let's take a look at an example Workflow that calls Activities:

```java
public class FileProcessingWorkflowImpl implements FileProcessingWorkflow {

    private final FileProcessingActivities activities;

    public FileProcessingWorkflowImpl() {
        this.activities = Workflow.newActivityStub(
                FileProcessingActivities.class,
                ActivityOptions.newBuilder()
                        .setStartToCloseTimeout(Duration.ofHours(1))
                        .build());
    }

    @Override
    public void processFile(Arguments args) {
        String localName = null;
        String processedName = null;
        try {
            localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());
            processedName = activities.processFile(localName);
            activities.upload(args.getTargetBucketName(), args.getTargetFilename(), processedName);
        } finally {
            if (localName != null) { 
                activities.deleteLocalFile(localName);
            }
            if (processedName != null) { 
                activities.deleteLocalFile(processedName);
            }
        }
    }
    // ...
}
```

In this example we use `Workflow.newActivityStub` to craete a client-side stuf of our file processing Activity.
We also define ActivityOptions and set the setStartToCloseTimeout timeout to one hour, meaning that
we set the total execution timeout for each of its method invocations to one hour (from when
the Activity execution is started to when it completes).

Workflow can create multiple Activity stubs. Each activity stub can have its own ActivityOptions defined, for example:

```java
public FileProcessingWorkflowImpl() {
    ActivityOptions options1 = ActivityOptions.newBuilder()
             .setTaskQueue("taskQueue1")
             .setStartToCloseTimeout(Duration.ofMinutes(10))
             .build();
    this.store1 = Workflow.newActivityStub(FileProcessingActivities.class, options1);

    ActivityOptions options2 = ActivityOptions.newBuilder()
             .setTaskQueue("taskQueue2")
             .setStartToCloseTimeout(Duration.ofMinutes(5))
             .build();
    this.store2 = Workflow.newActivityStub(FileProcessingActivities.class, options2);
}
```

### Calling Activities Asynchronously

Sometimes Workflows need to perform certain operations in parallel.
The Temporal Java SDK provides the `Async` class which includes static methods used to invoke any Activity asynchronously.
The calls return a result of type `Promise` which is similar to the Java `Future` and `CompletionStage`.

When you need to get the results of an async invoked Activity method, you can use the `Promise` `get`
method to block until the Activity method result is available.

To convert the following synchronous Activity method call:

```java
String localName = activities.download(sourceBucket, sourceFile);
```

To asynchronous style, the method reference is passed to `Async.function` or `Async.procedure`
followed by Activity arguments:

```java
Promise<String> localNamePromise = Async.function(activities::download, sourceBucket, sourceFile);
```

Then to wait synchronously for the result you can do the following:

```java
String localName = localNamePromise.get();
```

Here is the above example rewritten to call download and upload Activity methods in parallel, on multiple files:

```java
  public void processFile(Arguments args) {
    List<Promise<String>> localNamePromises = new ArrayList<>();
    List<String> processedNames = null;
    try {
      // Download all files in parallel.
      for (String sourceFilename : args.getSourceFilenames()) {
        Promise<String> localName =
            Async.function(activities::download, args.getSourceBucketName(), sourceFilename);
        localNamePromises.add(localName);
      }
      List<String> localNames = new ArrayList<>();
      for (Promise<String> localName : localNamePromises) {
        localNames.add(localName.get());
      }
      processedNames = activities.processFiles(localNames);

      // Upload all results in parallel.
      List<Promise<Void>> uploadedList = new ArrayList<>();
      for (String processedName : processedNames) {
        Promise<Void> uploaded =
            Async.procedure(
                activities::upload,
                args.getTargetBucketName(),
                args.getTargetFilename(),
                processedName);
        uploadedList.add(uploaded);
      }
      // Wait for all uploads to complete.
      Promise.allOf(uploadedList).get();
    } finally {
      for (Promise<String> localNamePromise : localNamePromises) {
        // Skip files that haven't completed downloading.
        if (localNamePromise.isCompleted()) {
          activities.deleteLocalFile(localNamePromise.get());
        }
      }
      if (processedNames != null) {
        for (String processedName : processedNames) {
          activities.deleteLocalFile(processedName);
        }
      }
    }
  }
```

## Activity Execution Context


`ActivityExecutionContext` is a context object passed to each Activity implementation by default.
You can access it in your Activity implementations via `Activity.getExecutionContext()`.

It provides static getters to access information about the Workflow that invoked the Activity.
Note that the Activity context information is stored in a thread-local variable.
Therefore, calls to `getExecutionContext()` succeed only within the thread that invoked the Activity function.

Following is an example of using the `ActivityExecutionContext`:

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
The whole request-reply interaction can be modeled as a single Activity.

To indicate that an Activity should not be completed upon its method return, 
call `ActivityExecutionContext.doNotCompleteOnReturn()` from the original Activity thread.

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

When the download is complete, the download service potentially can complete the Activity, or fail it 
from a different process, for example:

```java
  public <R> void completeActivity(byte[] taskToken, R result) {
    completionClient.complete(taskToken, result);
  }

  public void failActivity(byte[] taskToken, Exception failure) {
    completionClient.completeExceptionally(taskToken, failure);
  }
```

## Activity heartbeats

Activities can be long-running. In these cases the Activity execution timeouts should be set to be longer 
than the maximum predicted time of the Activity execution.
In those cases it can happen that an Activity execution is started and cannot proceed, or fails to continue its execution
for some reasons. With our long set execution timeout the calling Workflow will not be able to time out the Activity 
and retry it or fail it until this timeout is reached. 

In order to react quickly to crashes of long-running Activities you can use the Activity heartbeat mechanism.
You can set a short heartbeat timeout in order to detect Activity issues and react to them without having to wait
for the long Activity execution timeout to complete first.

`Activity.getExecutionContext().heartbeat()` lets the Temporal service know that the Activity is still alive.
The `Activity.getExecutionContext().heartbeat()` can take an argument which represents heartbeat 
`details`. If an Activity times out, the last heartbeat `details` will be included in the thrown `ActivityTimeoutException`
which can be caught by the calling Workflow. 
The Workflow then can use the `details` information to pass to the next Activity invocation if needed.

Following is an example of using Activity heartbeat:

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

## Throwing Activity errors

If there is a need to throw a checked Exception from an Activity, 
your should wrap it using the `Activity.wrap` method and re-throw it.
There is no need to wrap unchecked Exceptions, but it's safe to do so if you want to.

The reason for such a design is that re-throwing the originally caught Exception from a 
remote call (such as child Workflows and Activities) does not include failure context information.
Wrapping the Exception and re-throwing it will include this context which includes things
like Activity and child Workflow Ids for example.

In addition, when wrapping the checked Exception, the original exception is attached as a cause 
to the wrapped one, and is not lost.

Here is an example of catching a checked Exception and wrapping it:

```java
try {
  return someCall();
} catch (Exception e) {
  throw Activity.wrap(e);
}
```