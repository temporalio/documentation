---
id: how-to-spawn-an-activity-execution-in-java
title: How to spawn an Activity Execution in Java
sidebar_label: Activity Execution
description: Activities are remote procedure calls that must be invoked from within a Workflow using `ActivityStub`.
tags:
  - java
  - developer-guide
---

Activities are remote procedure calls that must be invoked from within a Workflow using `ActivityStub`.
Activities are not executable on their own. You cannot start an Activity Execution by itself.

Note that before an Activity Execution is invoked:

- Activity options (either [`setStartToCloseTimeout`](/concepts/what-is-a-start-to-close-timeout) or [`ScheduleToCloseTimeout`](/concepts/what-is-a-schedule-to-close-timeout) are required) must be set for the Activity.
  See [Activity Options](/java/how-to-set-activityoptions-in-java).
- The Activity must be registered with a Worker.
  See [Worker Program](/java/how-to-develop-a-worker-program-in-java)
- Activity code must be thread-safe.

Activities should only be instantiated using stubs from within a Workflow.
An `ActivityStub` returns a client-side stub that implements an Activity interface.
You can invoke Activities using `Workflow.newActivityStub`(type-safe) or `Workflow.newUntypedActivityStub` (untyped).

Calling a method on the Activity interface schedules the Activity invocation with the Temporal service, and generates an [`ActivityTaskScheduled` Event](/concepts/what-is-an-event#activitytaskscheduled).

Activities can be invoked synchronously or asynchronously.

#### Invoking Activities Synchronously

In the following example, we use the type-safe `Workflow.newActivityStub` within the "FileProcessingWorkflow" Workflow implementation to create a client-side stub of the `FileProcessingActivities` class. We also define `ActivityOptions` and set `setStartToCloseTimeout` option to one hour.

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

A Workflow can have multiple Activity stubs. Each Activity stub can have its own `ActivityOptions` defined.
The following example shows a Workflow implementation with two typed Activity stubs.

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

To invoke Activities inside Workflows without referencing the interface it implements, use an untyped Activity stub `Workflow.newUntypedActivityStub`.
This is useful when the Activity type is not known at compile time, or to invoke Activities implemented in different programming languages.

```java
   // Workflow code
    ActivityOptions activityOptions =
        ActivityOptions.newBuilder()
        .setStartToCloseTimeout(Duration.ofSeconds(3))
        .setTaskQueue("simple-queue-node")
        .build();

    ActivityStub activity = Workflow.newUntypedActivityStub(activityOptions);
    activity.execute("ComposeGreeting", String.class, "Hello World" , "Spanish");
```

#### Invoking Activities Asynchronously

Sometimes Workflows need to perform certain operations in parallel.
The Temporal Java SDK provides the `Async` class which includes static methods used to invoke any Activity asynchronously.
The calls return a result of type `Promise` which is similar to the Java `Future` and `CompletionStage`.
When invoking Activities, use `Async.function` for Activities that return a result, and `Async.procedure` for Activities that return void.

In the following asynchronous Activity invocation, the method reference is passed to `Async.function` followed by Activity arguments.

```java
Promise<String> localNamePromise = Async.function(activities::download, sourceBucket, sourceFile);
```

The following example shows how to call two Activity methods, "download" and "upload", in parallel on multiple files.

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

#### Activity Execution Context

`ActivityExecutionContext` is a context object passed to each Activity implementation by default.
You can access it in your Activity implementations via `Activity.getExecutionContext()`.

It provides getters to access information about the Workflow that invoked the Activity.
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

For details on getting the results of an Activity Execution, see [Activity Execution Result](/java/how-to-get-the-result-of-an-activity-execution-in-java).
