---
id: retrying-timeouts
title: Retrying and timeouts
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

## Activity Timeouts

The default behavior of Temporal is to not impose any restrictions/limits on the duration of activities. This makes sense as there are many use cases which depend on long running or indefinitely running activities. Even though the default behavior is to let activities run indefinitely, you'll often want to limit the length that a certain activity can run. Piggybacking on the example we used for the []Retrying Activities section, let's make a new assumption that the call to our unreliable HTTP server has a potential to hang for minutes or even hours. Based on this new assumption, it makes a lot of sense to set an upper bound on the duration of our `fetchRemoteData` activity:

```diff
    private final RemoteDataActivities activities =
        Workflow.newActivityStub(
            RemoteDataActivity.class,
            ActivityOptions.newBuilder()
+                .setScheduleToStartTimeout(Duration.ofMinutes(1))
							   .setScheduleToCloseTimeout(Duration.ofMinutes(20))
+                .setStartToCloseTimeout(Duration.ofMinutes(10))
            .build());
```

Since it's not intuitive what effect each of those methods has on activity behavior, I've explained them below:

- `ScheduleToStart` - duration a workflow should wait for a worker to start executing a requested activity. A common use for this timeout is checking if all workers are down or not able to keep up at the current request rate.
- `StartToClose` - maximum time an activity can be executed after it was picked by a worker.
- `ScheduleToClose` - maximum time from the workflow requesting an activity execution to its completion including retries.

Let's apply these definitions to the code snippet above so we get a full picture of what's practically going to happen.

1. We set `ScheduleToStart` to a duration of 1 minute. This means that our workflow will wait 1 minute at most for a worker to pick up this activity. If that 1 minute is exceeded the activity will either be retried or an error will be surfaced to the worker. In the majority of cases it makes sense to set this to the expected run duration of the activity.
2. We then set `ScheduleToClose` to a duration of 1 minute. This means that our workflow will wait 1 minute at most for an activity execution to complete starting from the point it requested it, including retries. If that minute is exceed an error will be surfaced to the worker.
3. Finally we set `StartToCloseTimeout`  to a duration of 10 minutes. This means that our workflow will wait 10 minutes at most for a worker that has picked up the activity to finish executing it. As you probably suspect, if those 10 minutes are exceeded the activity will either be retried or an error will be surfaced to the worker.

Activity timeouts provide fine grain control over the way your workflows execute activities. Unless all your activities are designed to run indefinitely, I highly recommend taking the time to fully understand the available options.

## Workflow Timeouts

Activity timeouts are great when you need to impose time restrictions on a specific activity, but there's often a need to impose similar restrictions on a workflow execution. The code snippet below shows all the timeout properties that are available to workflows.

```java
WorkflowOptions workflowOpts =
		WorkflowOptions.newBuilder()
		    .setTaskList('FOO')
        .setWorkflowExecutionTimeout(Duration.ofHours(2))
        .setWorkflowTaskTimeout(Duration.ofSeconds(10))
				.setWorkflowRunTimeout(Duration.ofMinutes(20))
		.build();
```

Just as with the activity timeouts, these aren't super intuitive so I'll cover them in more depth below:

- `WorkflowExecutionTimeout` - The timeout for duration of workflow execution. It includes retries and continue as new. Use WorkflowRunTimeout to limit execution time of a single workflow run.
- `WorkflowTaskTimeout` - The timeout for processing workflow task from the time the worker pulled this task. If a decision task is lost, it is retried after this timeout.
- `WorkflowRunTimeout` - The timeout for duration of a single workflow run.

With these definitions in mind, let's take another look at the original snippet.

1. We set `WorkflowExecutionTimeout` to a duration of 1 minute. This means that the entire workflow execution (including retries and continue as new) will run for 1 minute at most.
2. We set `WorkflowTaskTimeout` to a duration of 10 seconds. This means that a worker has 10 seconds at most to finish processing the workflow task starting from the point it was pulled.
3. Finally we set `WorkflowRunTimeout` to a duration of 10 seconds. This means that a single workflow run (not including retries and continue as new) will run for 10 seconds at most.

In the event that any of these limits are exceeded, an error will be returned.

## Conclusion

While timeouts and retries may have a bit of a learning curve, they also bring an enormous amount of control and predictability to your workflows. I hope this post was able to shed some light on the options available and how they can be practically useful.

If you have questions or feedback about timeouts, retries or anything else please feel free to jump on our Slack or shoot me an email (ryland@temporal.io). Temporal cannot exist without it's amazing community, so we love when users tell us what they think about the system and its features.

