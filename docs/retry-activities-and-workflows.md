---
id: retry-activities-and-workflows
title: How to retry Activities and Workflows
sidebar_label: Retry Activities and Workflows
---

Since Activities are used to encapsulate logic that is non-deterministic, an important Workflow feature is the ability to "automatically" retry an Activity execution in the event of its failure.

Currently, Temporal uses an exponential backoff for Activity retries.

Here we have a simple Workflow which executes a single Activity, `fetchRemoteData` :

```java
public static class RetryActivityWorkflowImpl implements RetryActivityWorkflow {
    private final RemoteDataActivities activities =
        Workflow.newActivityStub(
            RemoteDataActivity.class,
            ActivityOptions.newBuilder()
	            .setScheduleToCloseTimeout(Duration.ofSeconds(10))
				    .build());

        @Override
		public String getRemoteData(String key) {
		    return activities.fetchRemoteData(key);
		}
}
```

The `fetchRemoteData` Activity code consists of a single call to a potentially unreliable HTTP server:

```java
static class RemoteDataActivitiesImpl implements RemoteDataActivities {
    @Override
    public synchronized String fetchRemoteData(String key) {
        URL mysite = new URL("http://www.api.mysite.com/" + key);
        URLConnection ms = mysite.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(ms.getInputStream()));
            
        String aggregated;
        String inputLine;
        while ((inputLine = in.readLine()) != null)  {
            aggregated += inputLine;
        }
        in.close();
        return aggregated;
    }
}
```

In this Activity example we are not explicityly handling errors. This means that if there is any issue with the HTTP request (ie: [api.mysite.com](http://api.mysite.com) is down) the entire Activity will fail. If the `fetchRemoteData` Activity fails, Temporal will automatically retry it using the default retry configuration.

While you can handle exceptions and implement retries within the Activity code, Temporal's default Acivity retry protocol provides an automatic solution that enables you to stop writing the same error/retry boilerplat code around every piece of business logic.


With that said, there are many use cases that require custom retry behavior (such as calling a rate-limited external service). To serve this need, Temporal retries are completely configurable, allowing fine-grain control over the retry behavior without needing to implement it yourself.

### Configuring activity retries with Temporal

To configure retry behavior, call the `setRetryOptions` method with your desired values when building `AcitivityOptions` . Configuring retries at the `ActivityOptions` level means that you can share retry configuration between many activities, or keep each activity retry configuration unique:

```diff
    private final RemoteDataActivities activities =
        Workflow.newActivityStub(
            RemoteDataActivity.class,
            ActivityOptions.newBuilder()
			          .setScheduleToCloseTimeout(Duration.ofSeconds(10))
+               .setRetryOptions(
+                   RetryOptions.newBuilder()
+                       .setInitialInterval(Duration.ofSeconds(1))
+                       .setDoNotRetry(IllegalArgumentException.class)
+                   .build())
            .build());
```

While it's now clear how you specify retry configuration for an activity, there are numerous configuration parameters in the above code that are not self-explanatory. The list below outlines all of the available retry parameters along with the purpose they serve:

- `InitialInterval: Duration` -  amount of time to wait before retrying.
- `BackoffCoefficient: double` - rate at which the retry interval will grow (starting from `InitialInterval`). A coefficient of 1 means that the retry interval is always equal to the `InitialInterval`.
- `MaximumInterval: Duration` - maximum interval between retries. Useful for coefficients more than 1.
- `MaximumAttempts: int` - number of attempts that should be made to execute an activity in the presence of failures. If this limit is exceeded, the error is returned back to the workflow that invoked the activity.
- `NonRetryableErrorReasons: Exception[]` - errors that shouldn't be retried. For example if you receive an error for invalid arguments, there's a good chance retrying won't fix your problem.

I've provided two configurations below that should make things a bit more concrete:

**Default behavior**

```java
private final RemoteDataActivities activities =
    Workflow.newActivityStub(
        RemoteDataActivity.class,
        ActivityOptions.newBuilder()
			      .setScheduleToCloseTimeout(Duration.ofSeconds(10)) // scheduleToClose is required and therefore has no default
            .setRetryOptions(
                RetryOptions.newBuilder()
                    .setInitialInterval(Duration.ofSeconds(1))
                    .setBackoffCoefficient(2.0)
										.setMaximumInterval(Duration.ofSeconds(100))
                    .setMaximumAttempts(0) // 0 or no option is interpreted as infinite
                    .setDoNotRetry([])
                .build())
        .build());
```

**Half the default initial interval and double the coefficient**

```java
private final RemoteDataActivities activities =
    Workflow.newActivityStub(
        RemoteDataActivity.class,
        ActivityOptions.newBuilder()
			      .setScheduleToCloseTimeout(Duration.ofSeconds(10))
            .setRetryOptions(
                RetryOptions.newBuilder()
	                  .setInitialInterval(Duration.ofSeconds(2))
	                  .setBackoffCoefficient(4.0)
	              .build())
        .build());
```

## Retrying Workflows

While retrying activities is enough for the majority of use cases, Temporal also provides a mechanism for retrying an entire workflow. Workflow level retries can be very useful, such as when your workflow consists of multiple activities that rely on host-specific state. [The code below demonstrates workflow level retries in the context of downloading, processing and uploading a file.](https://github.com/temporalio/temporal-java-samples/tree/master/src/main/java/io/temporal/samples/fileprocessing)

```java
private void processFileImpl(URL source, URL destination) {
	  StoreActivities.TaskListFileNamePair downloaded = defaultTaskListStore.download(source);

	  ActivityOptions hostActivityOptions =
	      ActivityOptions.newBuilder()
	          .setTaskList(downloaded.getHostTaskList())
	          .setScheduleToCloseTimeout(Duration.ofSeconds(10))
	      .build();
	  StoreActivities hostSpecificStore =
	      Workflow.newActivityStub(StoreActivities.class, hostActivityOptions);

	  // Call processFile activity to zip the file.
	  // Call the activity to process the file using worker-specific task list.
	  String processed = hostSpecificStore.process(downloaded.getFileName());
	  // Call upload activity to upload the zipped file.
	  hostSpecificStore.upload(processed, destination);
}
```

In this workflow, downloading, processing and uploading are each handled by separate activities. Normally we could just rely on automatic activity retries and the code would work great if specific activities fail. But in this example, two of our workflows activities (`upload` and `process`) depend on a file which only resides on the host which ran our first activity (`download`). If the worker which ran our first activity (`download`) happens to crash, the other two activities will never succeed (as they depend on a file from a worker which is no longer with us). In this case it makes perfect sense to restart the entire workflow as opposed to a specific activity. To accomplish this we will wrap our workflow implementation and invoke it using `Workflow.retry` which accepts the same `RetryOptions` available to activities:

```java
@Override
public void processFile(URL source, URL destination) {
	  RetryOptions retryOptions =
	      RetryOptions.newBuilder()
		        .setInitialInterval(Duration.ofSeconds(1))
	      .build();
	  // Retries the whole sequence on any failure, potentially on a different host.
	  Workflow.retry(retryOptions, () -> processFileImpl(source, destination));
}
```

