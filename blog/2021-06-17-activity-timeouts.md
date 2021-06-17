---
tags:
  - Temporal
  - architecture
  - timeouts
posted_on_: 2021-06-17T00:00:09Z
slug: activity-timeouts
title: 'The 4 Types of Activity timeouts'
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.10.2
---


<!--truncate-->

Part of the benefit of moving business logic to Temporal is how it implements retries and timeouts for Activities in a standardized way. This has the effect of adding a reliability layer atop unreliable Activities and Workers, in a durable and scalable fashion. However, understanding the terminology can be a bit intimidating at first glance. 

This post (together with the embedded talk) aims to give you a solid mental model on what each Activity timeout does and when to use it.

> Note: You can also set [Workflow timeouts](https://docs.temporal.io/docs/concepts/workflows#timeout-settings) and [retry policies](https://docs.temporal.io/docs/concepts/activities#retries) you can set. This post deals only with *Activity* timeouts.

## Talk version: whiteboard session

You can watch this 18 minute talk where our CEO Maxim Fateev explains the 4 Types of Activity timeouts you see in Temporal.

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=JK7WLK3ZSu8' />

The rest of this post summarizes the main points covered in this whiteboard session, for those who prefer a written version.

## Written version: TL;DR

![image](https://user-images.githubusercontent.com/6764957/122424123-0ab1e300-cfc1-11eb-82c5-cf8856a87242.png)

Activities go through three main states in Temporal: 

- Scheduled
- Started
- Closed

Temporal has four timeouts—two that are commonly used, and two that are useful only in specific cases:

- Schedule-To-Close: Limits the maximum execution time including retries.
- Start-To-Close: Limits the maximum execution time of a single execution. **We recommend ALWAYS setting this!**
- Heartbeat: Limits the maximum time between Heartbeats. *For long running Activities*, enables a quicker response when s Heartbeat fails to be recorded.
- Schedule-To-Start: Limits the maximum time that an Activity Task can sit in a Task Queue. Mainly to identify whether a Worker is down or for Task routing. **This is rarely needed!**

You can find the precise APIs in the reference documentation for each SDK: [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html) and [Go](https://pkg.go.dev/go.temporal.io/sdk@v1.7.0/internal#ActivityOptions).

## Lifecycle of an Activity

To really understand how timeouts work, we should understand the typical lifecycle of an Activity as it journeys through the various parts of the system.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Step 1 - Workflow Worker

An activity `Foo` is first invoked inside of a Workflow Worker on Task Queue `Bar`. The precise method of invocation differs by SDK, and timeouts are also specified up front as part of activity options:

<Tabs
  defaultValue="go"
  values={[
    {label: 'Go', value: 'go'},
    {label: 'Java', value: 'java'},
  ]
}>

<TabItem value="go">

```go
ao := workflow.ActivityOptions{
        TaskQueue:               "sampleTaskQueue",
        ScheduleToCloseTimeout: time.Second * 500,
        // ScheduleToStartTimeout: time.Second * 60, // usually not needed! see below
        StartToCloseTimeout:    time.Second * 60,
        HeartbeatTimeout:       time.Second * 10,
        WaitForCancellation:    false,
}
ctx = workflow.WithActivityOptions(ctx, ao)

var result string
err := workflow.ExecuteActivity(ctx, SimpleActivity, value).Get(ctx, &result)
if err != nil {
        return err
}
```

</TabItem>
<TabItem value="java">

```java
@WorkflowInterface
public interface SimpleWorkflow {
    @WorkflowMethod
    String simpleWorkflowMethod(String someArg);
}

public static class SimpleWorkflowImpl implements SimpleWorkflow {
    private final SimpleActivities activities =
        Workflow.newActivityStub(
            SimpleActivities.class,
            ActivityOptions.newBuilder()
              .setScheduleToCloseTimeout(Duration.ofSeconds(500))
              .setStartToCloseTimeout(Duration.ofSeconds(60))
              .setHeartbeatTimeout(Duration.ofSeconds(10))
              .build());

    @Override
    public String simpleWorkflowMethod(String name) {
      return activities.simpleActivity("Hello", name);
    }
}
```

</TabItem>
</Tabs>

Behind the scenes, the SDK transforms this to a `ScheduleActivity` Command, which is sent to the Temporal Server. This Command includes various metadata, including the activity type (`Foo`), activity task queue (`Bar`), activity ID, and `RetryPolicy` (if not specified, Temporal uses a default policy).

### Step 2 - Temporal Server

Receiving the Command, Temporal Server then sets up the mutable state for that workflow and activity ID, and also adds an `ActivityTask` to the `Bar` Activity Queue.
There is an atomic guarantee that these both happen together, to prevent race conditions. 
We explained why this is important and how Temporal accomplishes this in [Designing A Workflow Engine](https://docs.temporal.io/blog/workflow-engine-principles/).

> The activity is now in `SCHEDULED` state.

### Step 3 - Activity Worker 

An Activity Worker that has been polling for the `Bar` activity queue picks up the `ActivityTask` and begins execution.

> The activity is now in `STARTED` state.

### Step 4 - Temporal Server

Once the activity finishes successfully, the Activity Worker sends a `CompleteActivityTask` message (together with the result of the activity) to Temporal Server, which now gives control back to the Workflow Worker to continue to the next line of code and repeat the process.

> The activity is now in `CLOSED` state.

We have just described the "Happy Path" of an activity. However, what happens when a worker crashes midway through an execution?

## StartToClose Timeout

We use the `StartToCloseTimeout` to control the maximum amount of time **a single activity invocation** can take. We recommend **always** setting this timeout.

![image](https://user-images.githubusercontent.com/6764957/122290108-fff64000-cf25-11eb-92b3-0533e41c3fee.png)

The classical example for how `StartToClose` becomes relevant is when an activity has been picked up from the activity queue (`STARTED` state) but crashes midway (so it never reaches `CLOSED` state). 

- Without a timeout configured, Temporal would never proactively timeout this activity to initiate a retry. The activity becomes "stuck" and the end user experiences an indefinite delay of their work with no feedback.
- With a timeout, Temporal registers an `ActivityTaskTimedOut` event internally which triggers the Server to attempt a retry based on the `RetryPolicy:`
    - It adds the activity back to its Activity Task Queue
    - Increments the attempt count in the workflow's mutable state
    - The activity is picked up again by an Activity Worker
    - The `StartToClose` timer is reset and will fire again if this second attempt fails.

The tricky part of setting `StartToClose` is that it needs to be set longer than the maximum *possible* activity execution, since you want to avoid premature timeouts for activities that genuinely take that long. Concretely - if an activity can take anywhere from 5 minutes to 5 hours, you need to set `StartToClose` to over 5 hours. If you have a long running activity like this, see below for `Heartbeat` timeouts.

## ScheduleToClose Timeout

We use the `ScheduleToCloseTimeout` to control the overall maximum amount of time allowed for an activity execution, including all retries. This timeout only makes sense if the activity has a `RetryPolicy` with `MaximumAttempts > 1`.

![image](https://user-images.githubusercontent.com/6764957/122290183-0dabc580-cf26-11eb-913d-3dc74d5eb55f.png)

If you let it, Temporal will retry a failing activity for up to 10 years! (with exponential backoff up to a defined maximum interval)
Most Temporal developers will want to finetune how their system retries to balance user experience against the unreliability of the activity.

While you can control intervals between retries and maximum number of retries in the `RetryPolicy`, `ScheduleToClose` is the best way to control retries based on *time elapsed*. We recommend using `ScheduleToClose` to limit retries rather than tweaking the number of `MaximumAttempts`, because that more closely matches desired user experience in the majority of cases.

## Heartbeat Timeout

For long running activities, we recommend recording heartbeats to create more frequent pingbacks from the Activity Worker to Temporal Server. 
Then, set a `HeartbeatTimeout` to create a failure when Temporal fails to receive a heartbeat from your activity at the expected frequency.

![image](https://user-images.githubusercontent.com/6764957/122424268-287f4800-cfc1-11eb-8417-f52743347afc.png)

By their nature, Heartbeats must be recorded from Activity code using SDK APIs:

<Tabs
  defaultValue="go"
  values={[
    {label: 'Go', value: 'go'},
    {label: 'Java', value: 'java'},
  ]
}>

<TabItem value="go">

```go
progress := 0
for hasWork {
    // Send heartbeat message to the server.
    activity.RecordHeartbeat(ctx, progress)
    // Do some work.
    ...
    progress++
}
```

</TabItem>
<TabItem value="java">

```java
while ((read = inputStream.read(bytes)) != -1) {
  totalRead += read;
  f.write(bytes, 0, read);
  // Let the Server know about the download progress.
  Activity.getExecutionContext().heartbeat(totalRead);
}
```

</TabItem>
</Tabs>

Setting a `HeartbeatTimeout` allows us to retry activities more quickly (e.g. the next minute after a heartbeat is missed) than the `StartToCloseTimeout`, which is necessarily set to as long as the longest possible activity (e.g. five hours later when we are sure the activity should have been completed).

There are some minor nuances to heartbeats that may be of interest:

- You can freely record heartbeats as often as you want - once a minute, or everytime a loop iterates - the SDKs throttle the heartbeats that get sent back anyway.
- If a `HeartbeatTimeout` isn't set and the activity tries to record one, nothing will be recorded since that information will never be used.

## Schedule-To-Start Timeout

We use the `ScheduleToStartTimeout`  to set a maximum limit that an activity should sit in a queue. We recommend that most users monitor the `ScheduleToStart` latency metric and set alerts for them as a [production scaling](https://docs.temporal.io/docs/server/production-deployment/#faq-autoscaling-workers-based-on-task-queue-load) metric, rather than setting an explicit timeout for it.

![image](https://user-images.githubusercontent.com/6764957/122290279-287e3a00-cf26-11eb-8dd6-3133016a0bd9.png)

As a queue timeout, `ScheduleToStart` is unique in that it **cannot be retried** — all a retry would do is pop the activity right back on to the same queue!

The Schedule-To-Start Timeout is most useful when you have a concrete plan to reroute an Activity Task to a different Task Queue, if a given Task Queue is not draining in adequate time.
You can also reschedule a whole set of other Activity Executions or do other compensation logic based on this timeout.
This is a powerful feature for building ultra-reliable systems, however most users will not need this since you can horizontally scale the number of Workers easily.

Generally, issues with Schedule-To-Start` are better addressed by scaling Activity Workers accordingly, rather than by adding timeouts.

## Putting it all together - a recruiting example

We've recently found the terminology of timeouts useful even internally for our recruiting and realized that this could be a relatable analogy for most people.

As [we are hiring heavily at Temporal](https://temporal.io/careers), there is a lot of interview scheduling going on intermixed with our regular day jobs. You could model the end-to-end hiring process for a candidate as a single "Workflow" with multiple "Activities": sourcing, interviewing, making a decision, and then the offer process. 

Specifically for the "Activity" of interviewing we've encountered some pain points:

- Some interviews were scheduled for 90 minutes, which we found to be way too long
- Some interviews had no-shows for any number of reasons ranging from miscommunication to Life™ getting in the way, and we were unclear on when to call an end to the interview and try to reschedule
- Sometimes a process would just drag out for weeks and weeks, leaving other candidates waiting.

To resolve this, we could think about setting some timeout policies (for clarity, none of these are real numbers):

- A Start-To-Close Timeout of 45 minutes so we don't spend too long per interview.
- A Heartbeat Timeout of 10 minutes to see if we should cancel on no-shows.
- A Schedule-To-Close Timeout of 4 weeks to limit the length of time we spend accommodating other people's schedules vs our own.

![image](https://user-images.githubusercontent.com/6764957/122290324-359b2900-cf26-11eb-93a6-5027fc98593b.png)

Should we set a Schedule-To-Start timeout? You could imagine candidates sitting a queue waiting to be interviewed, with not enough interviewer "Workers" to process them. A timeout here wouldn't help much, because there's no other queue to put them on. Better to set up monitoring and alerting on Schedule-To-Start latency, and scale up workers accordingly as needed (autoscaling is [currently not possible](https://docs.temporal.io/docs/server/production-deployment/#faq-autoscaling-workers-based-on-task-queue-load)).
