---
id: what-is-a-start-to-close-timeout
title: What is a Start-To-Close Timeout?
description: A Start-To-Close Timeout is the maximum time allowed for a single Activity Task Execution.
tags:
  - explanation
  - timeouts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CenteredImage from "../components/CenteredImage.js"
import RelatedReadList from '../components/RelatedReadList.js'

A Start-To-Close Timeout is the maximum time allowed for a single [Activity Task Execution](/docs/content/what-is-an-activity-task-execution).

### Details

**The default Start-To-Close Timeout is the same as the default [Schedule-To-Close Timeout](/docs/content/what-is-a-schedule-to-close-timeout).**

An Activity Execution must have either this timeout (Start-To-Close) or the [Schedule-To-Close Timeout](/docs/content/what-is-a-schedule-to-close-timeout) set.
We recommend always setting this timeout; however, make sure that it is always set to be longer than the maximum possible time for the Activity Execution to take place.
For long running Activity Executions, we recommend also using [Activity Heartbeats](/docs/content/what-is-an-activity-heartbeat) and [Heartbeat Timeouts](/docs/content/what-is-a-heartbeat-timeout).

### Use case

The main use case for the Start-To-Close timeout is to detect when a Worker crashes after it has started executing an Activity Task.

### Visualization

The following diagrams are representative of Events that would occur given the following Activity Definition:

<Tabs
defaultValue="go"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'PHP', value: 'php'},
{label: 'Typescript', value: 'ts'},
]
}>

<TabItem value="go">

```go
type YourActivityStruct struct {}

func(a *YourActivityStruct) YourActivityDefintion(ctx workflow.Context) error {
  if err := CallToExternalEndpoint(); err != nil {
    return err
  }
  return nil
}
```

</TabItem>
<TabItem value="java">

</TabItem>
<TabItem value="ts">

</TabItem>
<TabItem value="php">

</TabItem>
</Tabs>

<CenteredImage
imagePath="/diagrams/start-to-close-timeout.svg"
imageSize="100"
title="Start-To-Close Timeout period"
/>

A [Retry Policy](/docs/content/what-is-a-retry-policy) attached to an Activity Execution retries an Activity Task Execution.
Thus the Start-To-Close Timeout is applied to each Activity Task Execution within an Activity Execution.

If the first Activity Task Execution returns an error the first time, then the full Activity Execution might look like this:

<CenteredImage
imagePath="/diagrams/start-to-close-timeout-with-retry.svg"
imageSize="100"
title="Start-To-Close Timeout period with retries"
/>

### Consequences

If this timeout is reached, the following actions occur:

- An [ActivityTaskTimedOut](/docs/reference/events/#activitytasktimedout) Event is written to the Workflow Execution's mutable state.
- If a Retry Policy dictates a retry, the Temporal Cluster schedules another Activity Task.
  - The attempt count increments by 1 in the Workflow Execution's mutable state.
  - The Start-To-Close Timeout timer is reset.

### How to implement

<RelatedReadList
readlist={[
["How to set a Start-To-Close Timeout in Go","/docs/go/how-to-set-activityoptions-in-go/#starttoclosetimeout","developer guide"],
]}
/>
