---
id: timeout-activities-and-workflows
title: How to timeout Activities and Workflows
sidebar_label: Timeout Activities and Workflows
---

Temporal does not impose limits on the duration of Activities or Workflows by default, it is designed to enable these to run idefinitely if desired. Instead, timeout options are available to set limits on the time allowed for certain actions to occur.

## Activity timeouts

Activity timeouts provide additional control over the way your Workflows execute Activities.

### Timeout policy options

The following fields values can be customized within the `ActivityOptions`:

| Field | Java Type | Go Type | Description | Default |
|-------|-----------|---------|-------------|---------|
| `ScheduleToStart` | Duration | time.Time | Maximum time a Workflow should wait for a Worker to start executing the Activity. This is commonly used for checking if all workers are down or are not able to keep up with current request rate. | TODO |
| `StartToClose`    | Duration | time.Time | Maximum time an Activity can take to  execute after it was picked by a Worker. | TODO |
| `ScheduleToClose` | Duration | time.Time | Maximum time from when the Workflow requests an Activity execution to its completion including retries | TODO |

### Example usage

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="java"
    values={[
        { label: 'Java', value: 'java', },
        { label: 'Go', value: 'go', },
    ]
}>

<TabItem value="java">

```java
private final RemoteDataActivities activities = Workflow.newActivityStub(
    RemoteDataActivity.class,
    ActivityOptions.newBuilder()
    .setScheduleToStartTimeout(Duration.ofMinutes(1))
    .setScheduleToCloseTimeout(Duration.ofMinutes(20))
    .setStartToCloseTimeout(Duration.ofMinutes(10))
    .build()
);
```

</TabItem>
<TabItem value="go">

```go
sample := "TODO"
//Go Activity timeout sample
```

</TabItem>
</Tabs>

In the above code snippets:

1. We set `ScheduleToStart` to a duration of 1 minute. This means that our Workflow will wait a maximum of 1 minute for a Worker to pick up this Activity. If it is exceeded the Activity will either be retried or an error will be surfaced to the Worker. In the majority of cases it makes sense to set this to the expected run duration of the Activity.
2. We set `ScheduleToClose` to a duration of 1 minute. This means that our Workflow will wait a maximum of 1 minute for an Activity execution to complete starting from when the Task was requested to completion, including retries. If it is exceeded an error will be surfaced to the Worker.
3. We set `StartToCloseTimeout` to a duration of 10 minutes. This means that our Workflow will wait a maximum of 10 minutes for a Worker that has picked up the Activity to finish executing it. If it is exceeded the Activity will either be retried or an error will be surfaced to the Worker.

## Workflow timeouts

Activity timeouts are great when you need to impose time restrictions on a specific Activity, but there's often a need to impose similar restrictions on a workflow execution. The code snippet below shows all the timeout properties that are available to workflows.

### Timeout policy options

The following field values can be customized within the `WorkflowOptions`:

| Field | Java Type | Go Type | Description | Default |
|-------|-----------|---------|-------------|---------|
| `WorkflowExecutionTimeout` | Duration | time.Time | Maximum time for the Workflow Execution including retries and "ContinueAsNew"". Use WorkflowRunTimeout to limit execution time of a single workflow run. | TODO |
| `WorkflowTaskTimeout`      | Duration | time.Time | Maximum time from when a Worker pulls the task. If a Workflow Task is lost, it is retried after this timeout. | TODO |
| `WorkflowRunTimeout`       | Duration | time.Time | Maximum time of a single Workflow run. | TODO |

<Tabs
    defaultValue="java"
    values={[
        {label: 'Java', value: 'java', },
        {label: 'Go', value: 'go', },
    ]
}>

### Example usage

<TabItem value="java">

```java
WorkflowOptions workflowOpts = WorkflowOptions.newBuilder()
    .setTaskList('FOO')
    .setWorkflowExecutionTimeout(Duration.ofHours(2))
    .setWorkflowTaskTimeout(Duration.ofSeconds(10))
    .setWorkflowRunTimeout(Duration.ofMinutes(20))
    .build();
```

</TabItem>
<TabItem value="go">

```go
sample := "TODO"
//Go Workflow timeout sample
```

</TabItem>
</Tabs>

In the above code snippets:

1. We set `WorkflowExecutionTimeout` to a duration of 1 minute. This means that the entire Workflow execution (including retries and `ContinueAsNew` will run for a maximum of 1 minute.
2. We set `WorkflowTaskTimeout` to a duration of 10 seconds. This means that a Worker has a maximum of 10 seconds to finish processing the Workflow Task starting from when it was pulled.
3. We set `WorkflowRunTimeout` to a duration of 10 seconds. This means that a single Workflow run (not including retries and `ContinueAsNew`) will run for a maximum of 10 seconds.

If any of these limits are exceeded, an error will be returned.

