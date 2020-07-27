---
id: timeout-activities-and-workflows
title: Timeout Activities and Workflows
---

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
