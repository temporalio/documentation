---
tags:
  - Temporal
  - architecture
  - timeouts
posted_on_: 2021-06-17T00:00:09Z
slug: activity-timeouts
title: 'The 4 Types of Activity Timeouts in Temporal'
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.10.2
---


<!--truncate-->

Part of the benefit of moving business logic to Temporal is how it implements retries and timeouts for activities in a standardized way. However, understanding the terminology can be a bit intimidating at first glance. 

This post (together with the embedded talk) aims to give you a solid mental model on what each activity timeout does and when to use it.

> Note: There are also workflow timeouts and retry policies you can set. This post only deals with *activity* timeouts.

## 18 Minute Whiteboard Session

CEO Maxim Fateev explains the 4 Types of Timeouts you see in Temporal.

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=JK7WLK3ZSu8' />

## TL;DR

![image](https://user-images.githubusercontent.com/6764957/122289903-cde4de00-cf25-11eb-9d8e-2b5acfe94a9f.png)

Activities go through 3 main states in Temporal: 

- Scheduled
- Started
- Closed

There are 4 Timeouts in Temporal — 2 that are commonly used, and 2 that are only useful in specific cases:

- ScheduleToClose: to limit maximum execution time including retries
- StartToClose: to limit maximum execution time of a single invocation. We recommend ALWAYS setting this!
- Heartbeat: For long running activities, to register more frequent health checks
- ScheduleToStart: For queue timeouts and task routing, to limit maximum time that an activity waits in a task queue. This is rarely needed!

## Lifecycle of an Activity

To really understand how timeouts work, we should understand the typical lifecycle of an activity as it journeys through the various parts of the system.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Step 1 - Workflow Worker

An activity `Foo` is first invoked inside of a Workflow Worker on Task Queue `Bar`. The precise method of invocation differs by SDK:

<Tabs
  defaultValue="go"
  values={[
    {label: 'Go', value: 'go'},
    {label: 'Java', value: 'java'},
  ]
}>

<TabItem value="go">

```go
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
            ActivityOptions.newBuilder().setStartToCloseTimeout(Duration.ofSeconds(2)).build());

    @Override
    public String simpleWorkflowMethod(String name) {
      // This is a blocking call that returns only after the activity has completed.
      return activities.simpleActivity("Hello", name);
    }
}
```

</TabItem>
</Tabs>

Behind the scenes, the SDK transforms this to a `ScheduleActivity` Command, which is sent to the Temporal Server. This Command includes various metadata, including the activity type (`Foo`), activity task queue (`Bar`), activity ID, and `RetryPolicy` (if not specified, Temporal uses a default policy).

### Step 2 - Temporal Server

Receiving the Command, Temporal Server then sets up the mutable state for that workflow and activity ID, and also adds an `ActivityTask` to the `Bar` Activity Queue.
There is an atomic guarantee that these both happen together, to prevent race conditions. We explained why this is important and how Temporal accomplishes this in [Designing A Workflow Engine](https://docs.temporal.io/blog/workflow-engine-principles/).

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

While you can control intervals between retries and maximum number of retries in the `RetryPolicy`, `ScheduleToClose` is the best way to control retries based on *time elapsed*. We recommend using `ScheduleToClose` to limit retries rather than tweaking the number of `MaximumAttempts`, because that more closely matches desired user experience in the majority of cases.

## Heartbeat Timeout

For long running activities, we use the `HeartbeatTimeout` to create more frequent pingbacks from the Activity Worker to Temporal Server. This allows us to retry failures more quickly than the `StartToCloseTimeout` which is necessarily set to as long as the longest possible activity.

![image](https://user-images.githubusercontent.com/6764957/122290237-1ac8b480-cf26-11eb-9eb9-0e35d56e281f.png)

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

There are some minor nuances to heartbeats that may be of interest:

- You can freely record heartbeats as often as you want - once a minute, or everytime a loop iterates - the SDKs throttle the heartbeats that get sent back anyway.
- If a `HeartbeatTimeout` isn't set and the activity tries to record one, nothing will be recorded since that information will never be used.

## ScheduleToStart Timeout

We use the `ScheduleToStartTimeout`  to set a maximum limit that an activity should sit in a queue. We recommend that most users monitor the `ScheduleToStart` latency metric and set alerts for them as a [production scaling](https://docs.temporal.io/docs/server/production-deployment/#faq-autoscaling-workers-based-on-task-queue-load) metric, rather than setting an explicit timeout for it.

![image](https://user-images.githubusercontent.com/6764957/122290279-287e3a00-cf26-11eb-8dd6-3133016a0bd9.png)

As a queue timeout, `ScheduleToStart` is unique in that it **cannot be retried** — all a retry would do is pop the activity right back on to the same queue!

The `ScheduleToStartTimeout` is most useful when you have a concrete plan to reroute activity to a different queue, if a given task queue is not draining in adequate time. You can also reschedule a whole set of other activities or do other compensation logic based on this timeout. This is a powerful feature for building ultra-reliable systems, however most users will not need this since you can horizontally scale the number of workers easily.

Generally, issues with `ScheduleToStart` are better addressed by scaling activity workers accordingly, than by adding timeouts.

## Putting It All Together - A Recruiting Example

We've recently found the terminology of timeouts useful even internally for our recruiting and realized that this could be a relatable analogy for most people.

As [we are hiring heavily at Temporal](https://temporal.io/careers), there is a lot of interview scheduling going on intermixed with our regular day jobs. You could model the end-to-end hiring process for a candidate as a single workflow with multiple activities: sourcing, interviewing, making a decision, and then the offer process. 

Specifically for the activity of interviewing we've encountered some pain points:

- Some interviews were scheduled for 90 minutes, which we found to be way too long
- Some interviews had no-shows for any number of reasons ranging from miscommunication to Life™ getting in the way, and we were unclear on when to call an end to the interview and try to reschedule
- Sometimes a process would just drag out for weeks and weeks, leaving other candidates waiting.

To resolve this, we could think about setting some timeout policies (for clarity, none of these are real numbers):

- A `StartToCloseTimeout` of 45 minutes so we don't spend too long per interview
- A `HeartbeatTimeout` of 10 minutes to see if we should cancel on no-shows
- A `ScheduleToCloseTimeout` of 4 weeks to limit the length of time we spend accommodating other people's schedules vs our own.

![image](https://user-images.githubusercontent.com/6764957/122290324-359b2900-cf26-11eb-93a6-5027fc98593b.png)

I've even started jokingly referring to these timeouts internally and I've found some joy in correctly applying the each to a real life situation! 

All that said, we've probably reached StartToClose timeout on this blogpost. Let us know if you have any other questions on how timeouts work in Temporal!
